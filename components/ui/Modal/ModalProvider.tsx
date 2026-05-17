'use client';

import { createContext, type FC, type ReactNode } from 'react';
import type { ModalManager } from './hooks/useModalManager';

export const ModalContext = createContext<ModalManager | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
  modalManager: ModalManager;
}

const ModalProvider: FC<ModalProviderProps> = ({ children, modalManager }) => {
  return (
    <ModalContext.Provider value={modalManager}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
