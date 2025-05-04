import { Router } from "express";
import { z } from "zod";
import { isLoggedOrGuest, validate } from "../tools/middleware";
import { getGenre } from "../database";

export const router = Router();

const getGenreSchema = z.object({
  genreName: z.string(),
});

router.get("/:genreName", isLoggedOrGuest, async (req, res) => {
  const { genreName } = validate(req.params, getGenreSchema);
  const genre = await getGenre(genreName);
  if (!genre) {
    res.status(404).end();
    return;
  }
  res.status(200).send({
    ...genre,
  });
});

const getGenreStats = z.object({
  genreName: z.string(),
});

router.get("/:genreName/stats", isLoggedOrGuest, async (req, res) => {
  const { genreName } = validate(req.params, getGenreStats);
  const [genre] = await getGenre(genreName);
  if (!genre) {
    res.status(404).end();
    return;
  }
  res.status(200).send({
    genre,
  });
});

// router.get(
//   "/:id/rank",
//   isLoggedOrGuest,
//   async (req, res) => {
//      const { user } = req as LoggedRequest;
//      const { id } = validate(req.params, getAlbumStats);
//      const [album] = await getAlbums([id]);
//      if (!album) {
//        res.status(404).end();
//        return;
//      }
//      const rank = await getRankOf(ItemType.album, user, id);
//      res.status(200).send(rank);
//   },
// );
