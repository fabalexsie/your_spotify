import { useMemo } from "react";
import s from "./index.module.css";
import { msToDuration } from "../../../../services/stats";
import { Genre as GenreType } from "../../../../services/types";
import Text from "../../../../components/Text";
import InlineArtist from "../../../../components/InlineArtist";
import { useMobile } from "../../../../services/hooks/hooks";
import { useGenreGrid } from "./GenreGrid";
import { ColumnDescription, GridRowWrapper } from "../../../../components/Grid";
import InlineGenre from "../../../../components/InlineGenre";
import GenreImage from "../../../../components/GenreImage";

interface GenreProps {
  genre: GenreType;
  count: number;
  totalCount: number;
  duration: number;
  totalDuration: number;
}

export default function Genre({
  genre,
  duration,
  totalDuration,
  count,
  totalCount,
}: GenreProps) {
  const [isMobile, isTablet] = useMobile();
  const genreGrid = useGenreGrid();

  const columns = useMemo<ColumnDescription[]>(
    () => [
      {
        ...genreGrid.cover,
        node: (
          <GenreImage genreName={genre.name} className={s.cover} size={48} />
        ),
      },
      {
        ...genreGrid.title,
        node: (
          <Text className="otext">
            <InlineGenre genreName={genre.name} />
          </Text>
        ), // custom page for each genre
      },
      {
        ...genreGrid.artists,
        node: !isTablet && (
          <Text
            className="otext"
            title={genre.artists.map(a => a.name).join(", ")}>
            {genre.artists.map((artist, i) => (
              <span key={artist.name}>
                <InlineArtist artist={artist} />
                {i + 1 < genre.artists.length && ", "}
              </span>
            ))}
          </Text>
        ),
      },
      {
        ...genreGrid.count,
        node: (
          <Text>
            {count.toFixed(1)}
            {!isMobile && (
              <>
                {" "}
                <Text>({Math.floor((count / totalCount) * 10000) / 100})%</Text>
              </>
            )}
          </Text>
        ),
      },
      {
        ...genreGrid.total,
        node: (
          <Text className="center">
            {msToDuration(duration)}
            {!isMobile && (
              <>
                {" "}
                <Text>
                  ({Math.floor((duration / totalDuration) * 10000) / 100}%)
                </Text>
              </>
            )}
          </Text>
        ),
      },
    ],
    [
      genre,
      genreGrid.cover,
      genreGrid.title,
      genreGrid.artists,
      genreGrid.count,
      genreGrid.total,
      count,
      duration,
      isMobile,
      isTablet,
      totalCount,
      totalDuration,
    ],
  );

  return <GridRowWrapper className={s.row} columns={columns} />;
}
