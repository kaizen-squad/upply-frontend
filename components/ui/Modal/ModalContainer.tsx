'use client';

import type { FC } from 'react';
import ModalPortal from './ModalPortal';
import useModal from '@/components/ui/Modal/hooks/useModal';
import { Modale } from './Modale';
import { Overlay } from '../Overlay/Overlay';

const ModalContainer: FC = () => {
  const { modals, close } = useModal();

  return (
    <ModalPortal>
      {modals.map((modal) => {
        const handleCancel = async () => {
          try {
            await modal.onCancel?.();
          } finally {
            close(modal.id);
          }
        };

        const handleClose = () => {
          close(modal.id);
        };

        return (
          <div key={modal.id}>
            <Overlay
              isOpen={true}
              onClose={handleCancel}
              opacity="medium"
              blur={true}
            />
            <Modale
              isOpen={true}
              onClose={handleCancel}
              title={modal.title}
              size={modal.size || 'md'}
              showCloseButton={modal.showCloseButton !== false}
              closeOnOverlayClick={true}
              closeOnEscape={true}
            >
              {modal.children}
            </Modale>
          </div>
        );

      })}
    </ModalPortal>
  );
};

export default ModalContainer;
