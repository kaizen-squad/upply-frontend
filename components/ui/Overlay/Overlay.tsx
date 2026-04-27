// components/ui/Overlay.tsx
'use client';

import { useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  blur?: boolean;
  opacity?: 'light' | 'medium' | 'dark' | 'custom';
  zIndex?: number;
  closeOnClick?: boolean;
  closeOnEscape?: boolean;
  preventBodyScroll?: boolean;
  className?: string;
  transitionDuration?: number;
}

const opacityClasses = {
  light: 'bg-black/30',
  medium: 'bg-black/50',
  dark: 'bg-black/70',
  custom: '',
};

export function Overlay({
  isOpen,
  onClose,
  children,
  blur = true,
  opacity = 'medium',
  zIndex = 40,
  closeOnClick = true,
  closeOnEscape = true,
  preventBodyScroll = true,
  className,
  transitionDuration = 200,
}: OverlayProps) {
  
  // Gestion de la touche Echap
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Empêcher le scroll du body
  useEffect(() => {
    if (!preventBodyScroll) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, preventBodyScroll]);

  // Gestion du clic sur l'overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 transition-all duration-200',
        blur && 'backdrop-blur-sm',
        opacityClasses[opacity],
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        className
      )}
      style={{ 
        zIndex,
        transitionDuration: `${transitionDuration}ms`,
        backgroundColor: opacity === 'custom' ? 'rgba(0, 0, 0, 0.5)' : undefined
      }}
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
}