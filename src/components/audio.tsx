import * as React from 'react';
import { useContext } from 'react';
import { ButtonReset, ButtonValidate, Modal } from './modal';
import AudioPlayer from './audio-player';
import * as analytics from '@/utils/analytics';
import { AudioContext } from '@/context/audio-context';
import Avatar from './avatar';
import i18n from '@/utils/i18n';
import getBoxIdFromPathname from '@/utils/get-box-id-from-pathname';

interface AudioContentProps {
  children?: React.ReactNode;
  id: string;
  title: string;
  srcImg1?: string;
  srcImg2?: string;
  srcTranscription?: string;
  onClose: () => void;
  srcAudio: string;
}
const Content = (props: AudioContentProps) => {
  const { children, id, title, srcImg1, srcImg2, srcTranscription, onClose, srcAudio } = props;

  const { backgroundMusic } = useContext(AudioContext);

  // EXPLICATION : Cette fonction permet d'ouvrir le document de transcription de l'audio dans un nouvel onglet
  const openInNewTab = () => {
    analytics.track({
      event: 'click_transcription',
      file_name: title,
      document_id: id,
      box_number: getBoxIdFromPathname(window.location.pathname),
    });

    window.open(srcTranscription, '_blank');
  };

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    backgroundMusic.pause();

    return () => backgroundMusic.resume();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div>
        <p className="font-fixture mb-1 text-2xl uppercase text-zinc-400">audio</p>
        <p className="font-fixture text-5xl uppercase">{title}</p>
      </div>

      <div className="flex w-full gap-4">
        <div className="grow">
          <AudioPlayer documentId={id} src={srcAudio} controls />
        </div>

        {(srcImg1 || srcImg2) && (
          <div className="flex gap-4">
            {srcImg1 && <Avatar src={srcImg1} />}

            {srcImg2 && <Avatar src={srcImg2} />}
          </div>
        )}
      </div>

      {children}

      <div className="flex w-full gap-4 max-sm:flex-col">
        <ButtonValidate onClick={handleClose}>
          {i18n.t('actions.continue_investigation')}
        </ButtonValidate>
        {srcTranscription && <ButtonReset onClick={openInNewTab}>Transcription</ButtonReset>}
      </div>
    </>
  );
};

interface AudioProps {
  id: string;
  title: string;
  srcImg1?: string;
  srcImg2?: string;
  srcTranscription: string;
  onClose: () => void;
  srcAudio: string;
  open?: boolean;
}
const Audio = (props: AudioProps) => {
  const { id, open, title, srcImg1, srcImg2, srcTranscription, onClose, srcAudio } = props;

  const { backgroundMusic } = useContext(AudioContext);

  const handleEndAudioModal = () => {
    onClose();
    backgroundMusic.resume();
  };

  return (
    <Modal open={open} onClose={handleEndAudioModal} closeIcon>
      <Content
        id={id}
        title={title}
        srcImg1={srcImg1}
        srcImg2={srcImg2}
        srcTranscription={srcTranscription}
        onClose={onClose}
        srcAudio={srcAudio}
      />
    </Modal>
  );
};

Audio.Content = Content;

export default Audio;
