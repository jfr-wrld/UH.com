import React, { useEffect } from 'react';
import { classNames } from '../../lib/utils';
import { X } from 'lucide-react';
import { IconButton } from '../actions/IconButton';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
  width = '400px'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div 
        className={classNames('drawer-content', className)} 
        style={{ width, maxWidth: '90%' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="modal-header">
          <h2 id="drawer-title" className="text-section-title">{title}</h2>
          <IconButton size="sm" onClick={onClose} aria-label="Close drawer">
            <X size={20} />
          </IconButton>
        </div>
        <div className="modal-body text-body" style={{ flex: 1 }}>
          {children}
        </div>
        {footer && (
          <div className="modal-footer" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
