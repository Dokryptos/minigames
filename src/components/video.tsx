import * as React from 'react';
import * as analytics from '@/utils/analytics';
import { AudioContext } from '@/context/audio-context';
import i18n from '@/utils/i18n';
import { useParams } from 'react-router-dom';
import Button from './button';

interface VideoProps {
  autoplay?: boolean;
  documentId: string;
  onClose?: () => void;
  onEnded?: () => void;
  srcVideo: string;
  srcVideoFallback?: string;
  title: string;
}

const Video = (props: VideoProps) => {
  const { autoplay, documentId, title, srcVideo, srcVideoFallback, onClose, onEnded } = props;

  const { backgroundMusic } = React.useContext(AudioContext);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hasStarted = React.useRef(false);
  const watchPoints = React.useRef<number[]>([]);
  const { boxNumber = '' } = useParams<{ boxNumber: string }>();

  React.useEffect(() => {
    backgroundMusic.pause();

    return () => backgroundMusic.resume();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // EXPLICATION : Attention, le bouton peut s'afficher une fois la vidéo finie (forcer les joueurs à la regarder jusqu'au bout) ou dès le départ (utile dans l'historique par exemple)
  return (
    <>
      <div>
        <p className="font-fixture mb-1 text-2xl uppercase text-zinc-400">video</p>
        <p className="font-fixture text-5xl uppercase">{title}</p>
      </div>
      <video
        className="rounded shadow"
        autoPlay={autoplay}
        controls
        ref={videoRef}
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        onPlay={() => {
          analytics.track({
            event: 'video',
            action: 'start',
            title: title,
            percent: Math.floor(
              ((videoRef.current?.currentTime || 0) / (videoRef.current?.duration || 0)) * 100
            ),
            box_number: boxNumber,
            document_id: documentId,
          });
        }}
        onPause={() => {
          analytics.track({
            event: 'video',
            action: 'pause',
            title: title,
            percent: Math.floor(
              ((videoRef.current?.currentTime || 0) / (videoRef.current?.duration || 0)) * 100
            ),
            box_number: boxNumber,
            document_id: documentId,
          });
        }}
        onTimeUpdate={() => {
          if (videoRef.current) {
            const percent = Math.floor(
              (videoRef.current.currentTime / videoRef.current.duration) * 100
            );

            if (!watchPoints.current.length && percent === 10 && !hasStarted.current) {
              analytics.track({
                event: 'video',
                action: 'start',
                title: title,
                percent: 10,
                box_number: boxNumber,
                document_id: documentId,
              });

              hasStarted.current = true;
            }

            if (
              percent > 10 &&
              (percent % 25 === 0 || percent === 90) &&
              percent < 100 &&
              !watchPoints.current.includes(percent)
            ) {
              watchPoints.current.push(percent);
              analytics.track({
                event: 'video',
                action: 'progress',
                title: title,
                percent: percent,
                box_number: boxNumber,
                document_id: documentId,
              });
            }
          }
        }}
        onEnded={() => {
          analytics.track({
            event: 'video',
            action: 'complete',
            title: title,
            percent: 100,
            box_number: boxNumber,
            document_id: documentId,
          });

          onEnded?.();
        }}
      >
        <source src={srcVideo} type="video/mp4" />
        {srcVideoFallback && <source src={srcVideoFallback} type="video/mp4" />}
      </video>
      {onClose && <Button onClick={onClose}>{i18n.t('actions.continue_investigation')}</Button>}
    </>
  );
};

export default Video;
