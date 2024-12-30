import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { api } from "../../services/apis/api";
import { useAPI } from "../../services/hooks/hooks";
import FullscreenCentered from "../../components/FullscreenCentered";
import Text from "../../components/Text";
import GenreStats from "./GenreStats";

export default function GenreStatsWrapper() {
  const params = useParams();
  const stats = useAPI(api.getGenreStats, params.genrename || "");

  if (stats === null) {
    return (
      <FullscreenCentered>
        <CircularProgress />
        <div>
          <Text element="h3">Loading your stats</Text>
        </div>
      </FullscreenCentered>
    );
  }

  if ("code" in stats || !params.genrename) {
    return (
      <FullscreenCentered>
        <Text element="h3">
          You never listened to this genre, might be someone else registered
        </Text>
      </FullscreenCentered>
    );
  }

  return <GenreStats genreName={params.genrename} stats={stats} />;
}
