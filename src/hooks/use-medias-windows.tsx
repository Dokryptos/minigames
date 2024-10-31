import * as React from 'react';
import { PortalContext } from '@/context/portal-context';
import { calculateImageDimensions } from '@/utils/portals';
import MediaWindow from '@/components/media-window';

type OpenProps = {
  children?: React.ReactNode;
  medias: { id: string; url: string }[];
  slots?: React.ComponentProps<typeof MediaWindow>['slots'];
  subtitle?: string;
  title?: string;
};
type UseMediaWindowProps = {
  closeOnUnmount?: boolean;
};
const useMediasWindows = ({ closeOnUnmount }: UseMediaWindowProps = {}) => {
  const portalContext = React.useContext(PortalContext);
  const mediasRef = React.useRef<{ id: string; url: string }[]>([]);

  const open = async ({ children, slots, medias, subtitle, title }: OpenProps) => {
    const promises = await Promise.all(
      medias.map((media) => {
        mediasRef.current.push(media);

        return calculateImageDimensions(media);
      })
    );

    /**
     * We reverse and add delay to display the first image on top of the others in the right reading order
     */
    promises.reverse().forEach(({ media, key, width, height }, index) => {
      const child = () => (
        <MediaWindow
          id={media.id}
          url={media.url}
          title={title || ''}
          subtitle={subtitle || ''}
          height={height}
          width={width}
          slots={slots}
        />
      );

      setTimeout(() => {
        portalContext.add({ key, child: children || child() });
      }, 10 * index);
    });
  };

  React.useEffect(() => {
    return () => {
      if (!closeOnUnmount) {
        return;
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      mediasRef.current.forEach((media) => {
        portalContext.remove(media.id);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { open, close: portalContext.remove, medias: mediasRef.current };
};

export default useMediasWindows;
