import * as React from 'react';
import Button from './button';
import { Dialog, Transition } from '@headlessui/react';
import { cn } from '@/utils/cn';
import modalBackground from '@/assets/img/modal-background-concrete-min.jpg?lqip';
import rorschach from '@/assets/img/rorsch.jpg?lqip';
import Image from './image';
import ButtonIconClose from './button-icon';

const classBySize = {
  full: 'max-w-full',
  xl: 'max-w-4xl',
  lg: 'max-w-3xl',
  md: 'max-w-xl',
  sm: 'max-w-md',
};

interface ModalProps {
  backgroundVariant?: 'default' | 'rorschach';
  children: React.ReactNode;
  closeIcon?: boolean;
  onClose?: () => void;
  open?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title?: React.ReactNode;
}
const Modal = (props: ModalProps) => {
  const {
    title,
    backgroundVariant = 'default',
    children,
    onClose,
    open = true,
    closeIcon,
    size = 'lg',
  } = props;

  return (
    <Transition show={open} as={React.Fragment}>
      <Dialog onClose={onClose || (() => {})}>
        {/* Backdrop */}
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        {/* Position Container */}
        <div
          className={cn(
            'fixed top-0 left-0 w-full h-full flex items-center justify-center z-30',
            onClose && 'cursor-pointer'
          )}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={cn(
                'flex flex-col z-0 max-h-[calc(100vh-4rem)] mx-4 overflow-hidden relative cursor-default rounded w-full bg-black',
                classBySize[size]
              )}
            >
              {backgroundVariant === 'default' && (
                <Image
                  className="absolute left-0 top-0 -z-10 size-full object-cover opacity-30"
                  {...modalBackground}
                  alt="modal background"
                />
              )}
              {backgroundVariant === 'rorschach' && (
                <div className="absolute left-0 top-0 -z-10 size-full brightness-[25%]">
                  <div className="absolute left-0 top-0 -z-10 size-full bg-white" />
                  <Image
                    className="absolute -right-1/2 top-1/2 -z-10 size-full rotate-[100deg] scale-[250%] object-cover opacity-30"
                    {...rorschach}
                    alt="rorschach"
                  />
                  <div className="absolute left-0 top-0 -z-10 size-full bg-blue-900 opacity-20" />
                </div>
              )}
              {closeIcon && onClose && (
                <ButtonIconClose
                  className="absolute right-4 top-4 z-10 sm:right-16 sm:top-16"
                  icon="lucide:x"
                  onPress={onClose}
                />
              )}

              <div className="flex max-h-full w-full flex-col items-start gap-8 overflow-auto p-8 text-white sm:p-16">
                {title && <h2 className="font-fixture text-5xl">{title}</h2>}

                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const ButtonValidate = ({ children = 'Valider', ...rest }: React.ComponentProps<typeof Button>) => {
  return (
    <Button variant="primary" {...rest}>
      {children}
    </Button>
  );
};

const ButtonReset = ({ children = 'Recommence', ...rest }: React.ComponentProps<typeof Button>) => {
  return (
    <Button {...rest} variant="secondary">
      {children}
    </Button>
  );
};

export { Modal, ButtonValidate, ButtonReset };
