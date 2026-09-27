'use client';

import { useState, useCallback } from 'react';

export interface ModalConfig {
  id: string;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  showCloseButton?: boolean;
}

export interface ModalManager {
  /** Modals currently open in the interface. */
  modals: ModalConfig[];
  /** Adds a modal and returns its identifier. */
  open: (config: Omit<ModalConfig, 'id'> & { id?: string }) => string;
  /** Removes the modal with the supplied identifier. */
  close: (id: string) => void;
  /** Removes all open modals. */
  closeAll: () => void;
}

/**
 * Creates the state manager used to open and dismiss one or more modals.
 *
 * @returns The current modal list and operations to open, close, or clear it.
 */
export function useModalManager(): ModalManager {
  const [modals, setModals] = useState<ModalConfig[]>([]);

  const open = useCallback((config: Omit<ModalConfig, 'id'> & { id?: string }) => {
    const id = config.id ?? `modal-${Date.now()}-${Math.random()}`;
    setModals((prevModals) => [...prevModals, { ...config, id }]);
    return id;
  }, []);

  const close = useCallback((id: string) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.id !== id));
  }, []);

  const closeAll = useCallback(() => {
    setModals([]);
  }, []);

  return { modals, open, close, closeAll };
}
