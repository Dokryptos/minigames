import { toastQueue } from '@/components/toast-provider';
import Toast from '@/components/toast';
import i18n from './i18n';
import { ClueType } from '@/types/progress';

const iconByType = {
  lieu: 'lucide:file',
  archive: 'lucide:monitor-play',
  audio: 'lucide:cassette-tape',
  video: 'lucide:map',
  document: 'lucide:folder',
};

const options = {
  timeout: 4000,
};

function addHistoryToast(clueType: ClueType) {
  return toastQueue.add(
    <Toast
      content={
        <>
          <span className="text-red-500">{i18n.t(`toasts.history.type.${clueType}`)}</span>{' '}
          {i18n.t('toasts.history.has_been_added')}
        </>
      }
      type="info"
      timeout={options.timeout}
      icon={iconByType[clueType]}
    />,
    options
  );
}

export default addHistoryToast;
