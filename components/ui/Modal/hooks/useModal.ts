'use client';

import { useContext } from 'react';
import { ModalContext } from '@/components/ui/Modal/ModalProvider';

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal doit être utilisé dans un ModalProvider');
  }
  return context;
};

export default useModal;
