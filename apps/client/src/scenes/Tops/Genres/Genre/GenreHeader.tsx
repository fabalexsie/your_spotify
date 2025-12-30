import Text from "../../../../components/Text";
import { useMobile } from "../../../../services/hooks/hooks";
import { GridRowWrapper } from "../../../../components/Grid";
import s from "./index.module.css";
import { useGenreGrid } from "./GenreGrid";

export default function GenreHeader() {
  const [, isTablet] = useMobile();
  const genreGrid = useGenreGrid();

  const columns = [
    { ...genreGrid.cover, node: <div /> },
    {
      ...genreGrid.title,
      node: <Text size="normal">Genre name</Text>,
    },
    {
      ...genreGrid.artists,
      node: !isTablet && <Text size="normal">Artists</Text>,
    },
    {
      ...genreGrid.count,
      node: <Text size="normal">Count</Text>,
    },
    {
      ...genreGrid.total,
      node: (
        <Text className="center" size="normal">
          Total duration
        </Text>
      ),
    },
  ];

  return <GridRowWrapper columns={columns} className={s.header} />;
}
