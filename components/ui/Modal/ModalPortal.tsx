'use client';

import { useSyncExternalStore, type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

const subscribe = () => () => {};
const getModalRoot = () => document.getElementById('modal-root');
const getServerSnapshot = () => null;

interface ModalPortalProps {
  children: ReactNode;
}

const ModalPortal: FC<ModalPortalProps> = ({ children }) => {
  const modalRoot = useSyncExternalStore(subscribe, getModalRoot, getServerSnapshot);

  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
};

export default ModalPortal;
