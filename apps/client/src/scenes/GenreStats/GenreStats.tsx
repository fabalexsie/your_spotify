import { CircularProgress, Grid } from "@mui/material";
import Header from "../../components/Header";
import { GenreStatsResponse } from "../../services/apis/api";
import s from "./index.module.css";
import InlineArtist from "../../components/InlineArtist";
import GenreImage from "../../components/GenreImage";
import IdealImage from "../../components/IdealImage";
import { GridRowWrapper, GridWrapper } from "../../components/Grid";
import Text from "../../components/Text";
import TitleCard from "../../components/TitleCard";

interface GenreStatsProps {
  genreName: string;
  stats: GenreStatsResponse;
}

export default function GenreStats({ genreName, stats }: GenreStatsProps) {
  if (!stats) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Header
        left={
          <GenreImage
            genreName={genreName}
            size={60}
            className={s.headerimage}
          />
        }
        right={<></>}
        title={stats.genre.name}
        subtitle={<></>}
        hideInterval
      />
      <div className={s.content}>
        {/* <div className={s.header}>
          <ArtistRank artistId={artistId} />
        </div> */}
        <Grid
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
          style={{ marginTop: 0 }}>
          <Grid
            container
            size={{ xs: 12, lg: 6 }}
            spacing={2}
            justifyContent="flex-start"
            alignItems="flex-start">
            {/* <Grid item xs={12}>
              <TitleCard title="Songs listened">
                <Text element="strong" className={s.songslistened}>
                  {stats.total.count}
                </Text>
              </TitleCard>
            </Grid> */}
            <Grid size={{ xs: 12 }}>
              <TitleCard title="Artists belonging to this genre">
                <GridWrapper>
                  {stats.genre.artists.map(artist => (
                    <GridRowWrapper
                      key={artist.id}
                      columns={[
                        {
                          unit: "48px",
                          key: "cover",
                          node: (
                            <IdealImage
                              images={artist.images}
                              size={48}
                              alt="Artist cover"
                              className={s.cover}
                              width={48}
                              height={48}
                            />
                          ),
                        },
                        {
                          unit: "3fr",
                          key: "title",
                          node: (
                            <Text className="otext" size="normal">
                              <InlineArtist artist={artist} size="normal" />
                            </Text>
                          ),
                        },
                      ]}></GridRowWrapper>
                  ))}
                </GridWrapper>
              </TitleCard>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
