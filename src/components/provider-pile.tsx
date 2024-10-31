import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/query-client';
import { ModalContext, useModalContext } from '@/context/modal-context';
import { Modal } from './modal';

const ProviderPile = ({ children }: { children: React.ReactNode }) => {
  const modalContext = useModalContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={modalContext}>
        {children}
        <Modal open={false} {...modalContext.state}>
          {modalContext.state?.children}
        </Modal>
      </ModalContext.Provider>
    </QueryClientProvider>
  );
};

export default ProviderPile;
