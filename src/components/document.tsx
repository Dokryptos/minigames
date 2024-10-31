import i18n from '@/utils/i18n';
import { ButtonReset, ButtonValidate, Modal } from './modal';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

interface DocumentProps {
  title: string;
  srcElement: string;
  onClose: () => void;
  message?: string[];
}

const Content = (props: DocumentProps) => {
  const { title, srcElement, onClose, message } = props;

  const openInNewTab = () => {
    window.open(srcElement, '_blank');
  };

  return (
    <>
      <div>
        <p className="font-fixture mb-1 text-2xl uppercase text-zinc-400">document</p>
        <p className="font-fixture text-5xl uppercase">{title}</p>
      </div>

      {message && message.map((el, i) => <p key={i}>{el}</p>)}

      {(() => {
        const extension = srcElement.slice(((srcElement.lastIndexOf('.') - 1) >>> 0) + 2);

        if (extension === 'pdf') {
          return (
            <iframe
              title="document"
              className="h-screen max-h-[50vh] w-full object-contain"
              src={srcElement}
              allowFullScreen={true}
            />
          );
        }

        return (
          <OverlayScrollbarsComponent className="size-full max-h-[50vh]" defer>
            <img className="h-auto w-full object-cover" src={srcElement} alt="document" />
          </OverlayScrollbarsComponent>
        );
      })()}

      <div className="flex w-full gap-6 max-sm:flex-col">
        <ButtonValidate onClick={onClose}>
          {i18n.t('actions.continue_investigation')}
        </ButtonValidate>
        <ButtonReset onClick={openInNewTab}>Ouvrir</ButtonReset>
      </div>
    </>
  );
};

const Document = ({ title, srcElement, onClose, message }: DocumentProps) => {
  return (
    <Modal onClose={onClose} size="xl" closeIcon>
      <Content title={title} srcElement={srcElement} onClose={onClose} message={message} />
    </Modal>
  );
};

Document.Content = Content;

export default Document;
