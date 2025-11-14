import { ArtistModel } from "../Models";

export const getGenre = (genreName: string) =>
  ArtistModel.aggregate([
    { $match: { genres: { $in: [genreName] } } },
    { $sort: { name: 1, popularity: -1, _id: 1 } },
    { $group: { _id: null, artists: { $push: "$$ROOT" } } },
    { $addFields: { name: genreName } },
  ]);
