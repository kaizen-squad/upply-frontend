'use client';

import { useCallback } from 'react';
import type { ReactNode } from 'react';
import useModal from './useModal';

interface ModalifyOptions {
  id?: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

/**
 * Provides a convenience function for opening a modal with optional callbacks.
 *
 * @returns A modal opener that returns its id, plus operations to close one or all modals.
 *
 * @example
 * const { modalify } = useModalify();
 *
 * const handleDelete = async () => {
 *   modalify(
 *     <p>Êtes-vous sûr de vouloir supprimer?</p>,
 *     {
 *       title: 'Confirmation',
 *       onConfirm: async () => { await api.delete(...) }
 *     }
 *   );
 * };
 */
export function useModalify() {
  const { open, close, closeAll } = useModal();

  /** Opens a modal and returns the id assigned by the modal manager. */
  const modalify = useCallback(
    (children: ReactNode, options: ModalifyOptions = {}) => {
      const { id, title, size = 'md', onConfirm, onCancel } = options;

      const handleConfirm = async () => {
        await onConfirm?.();
      };

      const handleCancel = async () => {
        await onCancel?.();
      };

      return open({
        id,
        children,
        title,
        size,
        onConfirm: handleConfirm,
        onCancel: handleCancel,
        showCloseButton: true,
      });
    },
    [open]
  );


  return { modalify, close, closeAll };
}
