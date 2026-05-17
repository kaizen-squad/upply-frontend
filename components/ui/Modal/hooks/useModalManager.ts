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
  modals: ModalConfig[];
  open: (config: Omit<ModalConfig, 'id'> & { id?: string }) => string;
  close: (id: string) => void;
  closeAll: () => void;
}

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
