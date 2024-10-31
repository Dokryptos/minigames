import * as React from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import * as analytics from '@/utils/analytics';
import { AudioContext } from '@/context/audio-context';
import { Icon } from '@iconify-icon/react';
import { useParams } from 'react-router-dom';

const buttonClassname = 'p-2 bg-black/60 hover:bg-black/50 shadow text-white rounded-sm';

interface AudioPlayerProps {
  autoplay?: boolean;
  children?: (renderProps: { ended: boolean }) => React.ReactNode;
  controls?: boolean;
  documentId: string;
  onEnded?: () => void;
  src: string;
}

// A React component that will render wavesurfer
const AudioPlayer = (props: AudioPlayerProps) => {
  const { autoplay, children, controls, documentId, onEnded, src } = props;

  const { backgroundMusic } = React.useContext(AudioContext);

  const containerRef = React.useRef(null);
  const [ended, setEnded] = React.useState(false);
  const progress = React.useRef(0);
  const { boxId = '' } = useParams<{ boxId: string }>();

  const title = src.split('/').pop() || '';

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    backend: window.AudioContext ? 'MediaElement' : 'WebAudio',
    height: 24,
    waveColor: '#52525b',
    progressColor: '#fff',
    url: src,
    barWidth: 3,
    dragToSeek: true,
    interact: true,
  });

  const onPlayPause = React.useCallback(() => {
    analytics.track({
      event: 'audio',
      action: wavesurfer?.isPlaying() ? 'pause' : 'start',
      title: title,
      percent: Math.floor(
        ((wavesurfer?.getCurrentTime() || 0) / (wavesurfer?.getDuration() || 0)) * 100
      ),
      box_number: boxId,
      document_id: documentId,
    });

    wavesurfer?.playPause();
  }, [wavesurfer]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleVolume = React.useCallback(() => {
    wavesurfer?.setVolume(wavesurfer.getVolume() ? 0 : 1);
  }, [wavesurfer]);

  React.useEffect(() => {
    wavesurfer?.on('finish', () => {
      analytics.track({
        event: 'audio',
        action: 'complete',
        title: title,
        percent: 100,
        box_number: boxId,
        document_id: documentId,
      });

      onEnded?.();

      setEnded(true);
    });
  }, [wavesurfer]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    wavesurfer?.once('error', () => {
      wavesurfer.load(src);

      /**
       * Dispatch on end event when the audio is not found or on error to avoid blocking the user
       */
      setEnded(true);
      onEnded?.();
    });

    wavesurfer?.on('interaction', () => {
      if (!controls && !wavesurfer.isPlaying()) {
        wavesurfer.play();
      }
    });

    wavesurfer?.on('timeupdate', (currentTime) => {
      const percent = Math.floor((currentTime / wavesurfer?.getDuration()) * 100);

      /**
       * Track progress at :
       * - 10%
       * - 25%
       * - 50%
       * - 75%
       * - 90%
       * - 100%
       */
      if (
        (percent === 10 ||
          (percent > 10 && percent % 25 === 0 && percent < 100) ||
          percent === 90) &&
        percent !== progress.current
      ) {
        analytics.track({
          event: 'audio',
          action: 'progress',
          title: title,
          percent: percent,
          box_number: boxId,
          document_id: documentId,
        });

        progress.current = percent;
      }
    });

    return () => {
      try {
        wavesurfer?.destroy();
      } catch (err) {
        // do nothing
      }
    };
  }, [wavesurfer]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Start playing the audio when the component is mounted
   */
  React.useEffect(() => {
    if (autoplay) {
      wavesurfer?.once('ready', onPlayPause);
    }
  }, [wavesurfer]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Pause background music when the audio player is mounted
   */
  React.useEffect(() => {
    backgroundMusic.pause();

    return () => backgroundMusic.resume();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="w-full rounded-sm bg-black/20 px-4 py-5">
        <div ref={containerRef} />
      </div>

      {controls && (
        <div className="my-4 flex gap-2">
          <button className={buttonClassname} type="button" onClick={onPlayPause}>
            {isPlaying ? <Icon icon="grommet-icons:pause" /> : <Icon icon="grommet-icons:play" />}
          </button>

          <button className={buttonClassname} type="button" onClick={toggleVolume}>
            {wavesurfer?.getVolume() ? (
              <Icon icon="grommet-icons:volume" />
            ) : (
              <Icon icon="grommet-icons:volume-mute" />
            )}
          </button>
        </div>
      )}

      {children?.({ ended })}
    </>
  );
};

export default AudioPlayer;
