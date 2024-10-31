import * as React from 'react';
import { Modal } from '@/components/modal';

type ModalProps = React.ComponentProps<typeof Modal>;

type ModalContextType = {
  open: (modalProps: Omit<ModalProps, 'open'>) => void;
  close: () => void;
  isOpen: boolean;
};

const initialValue: ModalContextType = {
  isOpen: false,
  open: () => {},
  close: () => {},
};

const ModalContext = React.createContext<ModalContextType>(
  initialValue
) as React.Context<ModalContextType> & { initialValue: typeof initialValue };

const useModalContext = () => {
  const [state, setState] = React.useState<ModalProps | null>(null);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const close = () => {
    setState((prev) => prev && { ...prev, open: false });

    /**
     * Delay the state reset to avoid breaking the transition visually
     */
    closeTimeoutRef.current = setTimeout(() => {
      setState((prev) => (!prev?.open ? null : prev));

      closeTimeoutRef.current = null;
    }, 1500);
  };

  const open = (modalProps: Omit<ModalProps, 'open'>) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);

    setState((prev) => ({
      ...prev,
      title: undefined,
      backgroundVariant: undefined,
      closeIcon: undefined,
      size: undefined,
      onClose: close,
      ...modalProps,
      open: true,
    }));
  };

  return {
    state,
    open,
    close,
    isOpen: Boolean(state?.open),
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export { useModalContext, ModalContext };
