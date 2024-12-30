import { Router } from "express";
import { z } from "zod";
import { logger } from "../tools/logger";
import { isLoggedOrGuest, validating } from "../tools/middleware";
import { TypedPayload } from "../tools/types";
import { getGenre } from "../database";

export const router = Router();

const getGenreSchema = z.object({
  genreName: z.string(),
});

router.get(
  "/:genreName",
  validating(getGenreSchema, "params"),
  isLoggedOrGuest,
  async (req, res) => {
    try {
      const { genreName } = req.params as TypedPayload<typeof getGenreSchema>;
      const genre = await getGenre(genreName);
      if (!genre) {
        res.status(404).end();
        return;
      }
      res.status(200).send({
        ...genre,
      });
    } catch (e) {
      logger.error(e);
      res.status(500).end();
    }
  },
);

const getGenreStats = z.object({
  genreName: z.string(),
});

router.get(
  "/:genreName/stats",
  validating(getGenreStats, "params"),
  isLoggedOrGuest,
  async (req, res) => {
    try {
      const { genreName } = req.params as TypedPayload<typeof getGenreStats>;
      const [genre] = await getGenre(genreName);
      if (!genre) {
        res.status(404).end();
        return;
      }
      res.status(200).send({
        genre,
      });
    } catch (e) {
      logger.error(e);
      res.status(500).end();
    }
  },
);

// router.get(
//   "/:id/rank",
//   validating(getAlbumStats, "params"),
//   isLoggedOrGuest,
//   async (req, res) => {
//     try {
//       const { user } = req as LoggedRequest;
//       const { id } = req.params as TypedPayload<typeof getAlbumStats>;
//       const [album] = await getAlbums([id]);
//       if (!album) {
//         res.status(404).end();
//         return;
//       }
//       const rank = await getRankOf(ItemType.album, user, id);
//       res.status(200).send(rank);
//     } catch (e) {
//       logger.error(e);
//       res.status(500).end();
//     }
//   },
// );
