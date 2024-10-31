type ImageProps = {
  className?: string;
  src: string;
  alt: string;
  height: number;
  width: number;
  lqip: string;
};
const Image = ({ className, src, alt, height, width, lqip }: ImageProps) => {
  return (
    <img
      className={className}
      src={src}
      loading="lazy"
      alt={alt}
      height={height}
      width={width}
      style={{ backgroundImage: `url("${lqip}")`, backgroundSize: 'cover' }}
      onLoad={(e) => {
        e.currentTarget.style.backgroundImage = 'none';
      }}
    />
  );
};

export default Image;
