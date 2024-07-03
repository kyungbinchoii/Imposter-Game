import './DemoRoom.css';

type Image = {
  src: string;
  alt: string;
};

export function ImageCard({ src, alt }: Image) {
  return (
    <div className="image-wrapper">
      <img className="current-image" src={src} alt={alt} />
    </div>
  );
}

export default ImageCard;
