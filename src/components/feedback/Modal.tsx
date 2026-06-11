import React, { useEffect } from 'react';
import { classNames } from '../../lib/utils';
import { X } from 'lucide-react';
import { IconButton } from '../actions/IconButton';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
  size = 'md'
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

  const maxWidths = {
    sm: '400px',
    md: '500px',
    lg: '800px'
  };

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div 
        className={classNames('modal-content', className)} 
        style={{ maxWidth: maxWidths[size] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="text-section-title">{title}</h2>
          <IconButton size="sm" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </IconButton>
        </div>
        <div className="modal-body text-body">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
