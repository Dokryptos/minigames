import * as React from 'react';
import { cdnUrl } from '@/utils/env';
import { AudioContext } from '@/context/audio-context';

interface AudioAutoplayProps {
  children?: (renderProps: { ended: boolean }) => React.ReactNode;
  ignoreContext?: boolean;
  onEnded?: () => void;
  src: string;
  type?: string;
  autoPlay?: boolean;
}
const AudioAutoplay = (props: AudioAutoplayProps) => {
  const { children, ignoreContext, onEnded, src, type = 'audio/mpeg', autoPlay } = props;
  const { backgroundMusic } = React.useContext(AudioContext);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [ended, setEnded] = React.useState(false);

  React.useEffect(() => {
    if (ignoreContext) {
      return () => {};
    }

    backgroundMusic.pause();

    return () => backgroundMusic.resume();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (audioRef.current && audioRef.current.paused) {
      const audioEl = audioRef.current;

      const play = () => !audioEl?.autoplay && audioEl?.paused && audioEl?.play();

      audioEl?.addEventListener('loadstart', play);

      return () => audioEl?.removeEventListener('loadstart', play);
    }
  }, []);

  return (
    <>
      <audio
        className="absolute size-0"
        onEnded={() => {
          setEnded(true);
          onEnded?.();
        }}
        ref={audioRef}
        /**
         * Performance optimization
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#attr-preload
         */
        preload="none"
        autoPlay={autoPlay}
      >
        <source src={`${cdnUrl}${src}`} type={type} />
        Votre navigateur ne prend pas en charge ce format
      </audio>
      {children?.({ ended })}
    </>
  );
};

export default AudioAutoplay;
