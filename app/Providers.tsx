'use client';

import { FC, ReactNode } from 'react';
import NotificationProvider from '@/components/ui/Notification/NotificationProvider';
import NotificationContainer from '@/components/ui/Notification/NotificationContainer';
import ModalProvider from '@/components/ui/Modal/ModalProvider';
import ModalContainer from '@/components/ui/Modal/ModalContainer';
import ClientAuthProvider from './ClientAuthProvider';
import { User } from '@/types/auth';
import { useModalManager } from '@/components/ui/Modal/hooks/useModalManager';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const modalManager = useModalManager();

  return (
    <ClientAuthProvider>
      <NotificationProvider>
        <ModalProvider modalManager={modalManager}>
            {children}
            <NotificationContainer />
            <ModalContainer />
            <div id="modal-root" />
            <div id="notification-root" />
            <Toaster/>
        </ModalProvider>
      </NotificationProvider>
  </ClientAuthProvider>
  );
};

export default Providers;
