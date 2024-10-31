import { ImageMeta } from '@/types/image-meta';
import Image from './image';

type AvatarProps = { alt?: string } & (
  | {
      src?: undefined;
      meta: ImageMeta;
    }
  | {
      src: string;
      meta?: undefined;
    }
);

const className = 'size-full object-cover object-center';

const Avatar = (props: AvatarProps) => {
  const { alt = 'avatar', meta, src } = props;

  return (
    <div className="size-16 border-2 border-solid border-white">
      {src && <img className={className} src={src} alt={alt} />}
      {meta && <Image className={className} {...meta} alt={alt} />}
    </div>
  );
};

export default Avatar;
