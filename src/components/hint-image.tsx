import { Icon } from '@iconify-icon/react';

const HintImage = ({ alt, src }: { alt?: string; src: string }) => {
  return (
    <a className="group relative h-full cursor-pointer overflow-hidden" target="_blank" href={src}>
      <img
        alt={alt}
        className="size-full object-contain transition group-hover:blur-sm"
        src={src}
      />

      <p className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-white opacity-0 transition group-hover:opacity-100">
        <Icon height="unset" icon="lucide:external-link" className="size-12" />
      </p>
    </a>
  );
};

export default HintImage;
