import { Link } from "react-router-dom";
import { Genre, HTMLTag } from "../../services/types";
import Text from "../Text";
import { TextProps } from "../Text/Text";
import s from "./index.module.css";

type InlineGenreProps<T extends HTMLTag> = Omit<TextProps<T>, "children"> & {
  genreName: Genre["name"];
};

export default function InlineGenre<T extends HTMLTag = "div">({
  genreName,
  ...other
}: InlineGenreProps<T>) {
  return (
    <Text title={genreName} {...other}>
      <Link to={`/genre/${encodeURI(genreName)}`} className={s.root}>
        {genreName}
      </Link>
    </Text>
  );
}
