'use client';

import { useEffect, useState, type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

const ModalPortal: FC<ModalPortalProps> = ({ children }) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById('modal-root');
    setModalRoot(root);
    if (!root) {
      console.warn('Modal root manquant pour l\'affichage!');
      return;
    }
  }, []);

  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
};

export default ModalPortal;
