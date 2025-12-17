import { Queue } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import clsx from "clsx";
import { addToQueue } from "../../services/redux/modules/user/thunk";
import { useAppDispatch } from "../../services/redux/tools";
import { SpotifyImage } from "../../services/types";
import IdealImage from "../IdealImage";
import s from "./index.module.css";

interface PlayButtonProps {
  id: string;
  covers: SpotifyImage[];
  className?: string;
}

export default function PlayButton({ id, covers, className }: PlayButtonProps) {
  const dispatch = useAppDispatch();

  const play = () => {
    dispatch(addToQueue(id));
  };

  return (
    <div className={clsx(s.root, className)}>
      <IdealImage
        images={covers}
        size={48}
        className={clsx("play-image", s.image)}
      />
      <IconButton onClick={play} className="play-button">
        <Queue className={s.icon} />
      </IconButton>
    </div>
  );
}
