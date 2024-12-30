import { HTMLProps } from "../../services/types";

interface GenreImageProps extends HTMLProps<"img"> {
  genreName: string;
  size: number;
}

export default function GenreImage({
  genreName,
  size,
  ...other
}: GenreImageProps) {
  return (
    <img
      alt={genreName[0] || ""}
      src={genreToImageAsBase64(genreName)}
      height={size}
      width={size}
      {...other}
    />
  );
}

function genreToImageAsBase64(genre: string) {
  // Calc hash from genre name
  let hash = 0;
  for (let i = 0; i < genre.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = genre.charCodeAt(i) + (hash << 5) - hash;
  }

  // Generate RGB color components from the hash value
  // eslint-disable-next-line no-bitwise
  const r = (hash & 0xff0000) >> 16;
  // eslint-disable-next-line no-bitwise
  const g = (hash & 0x00ff00) >> 8;
  // eslint-disable-next-line no-bitwise
  const b = hash & 0x0000ff;
  const color = `rgb(${r},${g},${b})`;

  // Create canvas with genre letter on top of a colored rectangle
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    // Set canvas dimensions
    const width = 48; // commonUnits.cover
    const height = 48;
    canvas.width = width;
    canvas.height = height;

    // Draw colored rectangle
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);

    // Draw letter on top of the rectangle
    context.font = "30px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText((genre[0] || "").toUpperCase(), width / 2, height / 2);

    // Convert canvas to image data URL
    const imageDataURL = canvas.toDataURL();

    return imageDataURL;
  }
  return "/no_data_faded.png"; // from tools.ts
}
