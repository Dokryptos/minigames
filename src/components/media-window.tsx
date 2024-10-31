import * as React from 'react';
import { Rnd } from './rnd';
import { PortalContext } from '@/context/portal-context';
import ButtonIcon from './button-icon';

type Media = {
  id: string;
  title: string;
  subtitle: string;
  height: number;
  url: string;
  width: number;
};
type MediaWindowProps = Media & {
  slots?: {
    children?: (media: Media) => React.ReactNode;
    title?: (media: Media) => React.ReactNode;
  };
};
const MediaWindow = (props: MediaWindowProps) => {
  const { slots, ...media } = props;
  const { id, title, subtitle, height, url, width } = media;

  const portalContext = React.useContext(PortalContext);

  const index = React.useMemo(() => React.Children.toArray(portalContext.children).length, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Rnd
      default={{
        x: window.innerWidth / 2 - width / 2 + (portalContext.count + index) * 32,
        y: window.innerHeight / 2 - height / 2 + (portalContext.count + index) * 32,
        width: width,
        height: height,
      }}
      lockAspectRatio
      minHeight={128}
      maxWidth={window.innerWidth - 16}
      bounds="window"
      className="z-50 overflow-hidden"
    >
      <div className="relative h-full items-start bg-black/50 text-left">
        <ButtonIcon
          className="absolute right-12 top-2 z-50"
          icon="lucide:external-link"
          onPress={() => window.open(url, '_blank')}
          title="Ouvrir dans une nouvelle fenêtre"
        />

        <ButtonIcon
          className="absolute right-2 top-2 z-50"
          icon="lucide:x"
          onPress={() => portalContext.remove(id)}
          title="Fermer"
        />

        {slots?.children?.(media) || (
          <img
            key={id}
            className="pointer-events-none h-auto w-full object-cover object-center"
            src={url}
            alt="document"
          />
        )}

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/75 to-transparent p-2 transition hover:opacity-0">
          {slots?.title?.(media) || (
            <div>
              <p className="font-fixture mb-1 text-2xl uppercase text-zinc-400">{title}</p>
              <p className="font-fixture text-5xl uppercase text-white">{subtitle}</p>
            </div>
          )}
        </div>
      </div>
    </Rnd>
  );
};

export default MediaWindow;
