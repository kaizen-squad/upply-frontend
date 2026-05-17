'use client';

import { FC, ReactNode, useMemo } from 'react';
import NotificationProvider from '@/components/ui/Notification/NotificationProvider';
import NotificationContainer from '@/components/ui/Notification/NotificationContainer';
import ModalProvider from '@/components/ui/Modal/ModalProvider';
import ModalContainer from '@/components/ui/Modal/ModalContainer';
import ClientAuthProvider from './ClientAuthProvider';
import { User } from '@/types/auth';
import { useModalManager } from '@/components/ui/Modal/hooks/useModalManager';

interface ProvidersProps {
  children: ReactNode;
  initialUser: User | undefined;
}

const Providers: FC<ProvidersProps> = ({ children, initialUser }) => {
  const modalManager = useModalManager();

  return (
    <NotificationProvider>
      <ModalProvider modalManager={modalManager}>
        <ClientAuthProvider initialUser={initialUser}>
          {children}
          <NotificationContainer />
          <ModalContainer />
          <div id="modal-root" />
          <div id="notification-root" />
        </ClientAuthProvider>
      </ModalProvider>
    </NotificationProvider>
  );
};

export default Providers;
