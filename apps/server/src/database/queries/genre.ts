import { ArtistModel } from "../Models";

export const getGenre = (genreName: string) =>
  ArtistModel.aggregate([
    { $match: { genres: { $in: [genreName] } } },
    { $group: { _id: null, artists: { $push: "$$ROOT" } } },
    { $addFields: { name: genreName } },
  ]);
