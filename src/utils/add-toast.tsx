import { toastQueue } from '@/components/toast-provider';
import Toast from '@/components/toast';

// eslint-disable-next-line react-refresh/only-export-components
const TIMEOUT = 3000;

function addToast(args: React.ComponentProps<typeof Toast>) {
  const { content, type } = args;

  const options = {
    timeout: TIMEOUT,
  };

  return toastQueue.add(<Toast content={content} type={type} timeout={TIMEOUT} />, options);
}

export default addToast;
