import s from "./index.module.css";
import { msToDuration } from "../../../../services/stats";
import { Genre as GenreType } from "../../../../services/types";
import Text from "../../../../components/Text";
import InlineArtist from "../../../../components/InlineArtist";
import { useMobile } from "../../../../services/hooks/hooks";
import { useGenreGrid } from "./GenreGrid";
import { GridRowWrapper } from "../../../../components/Grid";
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

  const columns = [
    {
      ...genreGrid.cover,
      node: <GenreImage genreName={genre.name} className={s.cover} size={48} />,
    },
    {
      ...genreGrid.title,
      node: (
        <Text className="otext" size="normal">
          <InlineGenre size="normal" genreName={genre.name} />
        </Text>
      ), // custom page for each genre
    },
    {
      ...genreGrid.artists,
      node: !isTablet && (
        <Text
          className="otext"
          title={genre.artists.map(a => a.name).join(", ")}
          size="normal">
          {genre.artists.map((artist, i) => (
            <span key={artist.name}>
              <InlineArtist artist={artist} size="normal" />
              {i + 1 < genre.artists.length && ", "}
            </span>
          ))}
        </Text>
      ),
    },
    {
      ...genreGrid.count,
      node: (
        <Text size="normal">
          {count.toFixed(1)}
          {!isMobile && (
            <>
              {" "}
              <Text size="normal">
                ({Math.floor((count / totalCount) * 10000) / 100})%
              </Text>
            </>
          )}
        </Text>
      ),
    },
    {
      ...genreGrid.total,
      node: (
        <Text className="center" size="normal">
          {msToDuration(duration)}
          {!isMobile && (
            <>
              {" "}
              <Text size="normal">
                ({Math.floor((duration / totalDuration) * 10000) / 100}%)
              </Text>
            </>
          )}
        </Text>
      ),
    },
  ];

  return <GridRowWrapper className={s.row} columns={columns} />;
}
