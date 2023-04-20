import {ResponseImage} from "../../types";

export default function ImageCard({
  id,
  author,
  download_url,
  onClick,
}: ResponseImage & {onClick: () => void}) {
  return (
    <div className="card shadow-md h-64 rounded-lg hover:scale-105 transition-all duration-300">
      <img
        src={download_url}
        alt={author + "image"}
        loading="lazy"
        className="h-full w-full object-cover rounded-lg cursor-pointer "
        onClick={() => onClick()}
      />
    </div>
  );
}
