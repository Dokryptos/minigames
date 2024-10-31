import * as React from 'react';
import { cn } from '@/utils/cn';
import { Transition } from '@headlessui/react';
import { Icon } from '@iconify-icon/react';

const bgColorByType = {
  success: 'bg-green-600',
  error: 'bg-red-500',
  warning: 'bg-yellow-700',
  info: 'bg-zinc-500',
};
const iconByType = {
  success: 'lucide:check',
  error: 'lucide:x',
  warning: null,
  info: 'lucide:info',
};

interface ToastProps {
  content: React.ReactNode;
  timeout?: number;
  icon?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}
const Toast = (props: ToastProps) => {
  const { content, type = 'success', timeout } = props;
  const icon = props.icon || iconByType[type];

  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    if (!timeout) return;

    const timer = setTimeout(() => {
      setShow(false);
    }, timeout - 300);

    return () => clearTimeout(timer);
  }, [timeout]);

  return (
    <Transition
      appear
      show={show}
      as={React.Fragment}
      enter="transition-all duration-300 transform"
      enterFrom="transform opacity-0 scale-95 translate-x-1/2"
      enterTo="transform opacity-100 scale-100 translate-x-0"
      leave="transition-all ease-in duration-200 transform translate-x-full"
      leaveFrom="transform opacity-100 scale-100 translate-x-0"
      leaveTo="transform opacity-0 scale-95 translate-x-full"
    >
      <div className="mx-auto mt-4 flex w-full max-w-sm overflow-hidden rounded bg-zinc-700 shadow-md">
        <div
          className={cn('flex w-14 flex-shrink-0 items-center justify-center', bgColorByType[type])}
        >
          {icon && <Icon icon={icon} className="size-6 text-white" height="auto" />}
        </div>

        <div className="px-6 py-4">
          <p className="font-fixture text-nowrap text-xl uppercase tracking-wide text-white">
            {content}
          </p>
        </div>
      </div>
    </Transition>
  );
};

export default Toast;
