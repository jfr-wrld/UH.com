import React, { useState, useEffect } from 'react';
import { classNames } from '../../lib/utils';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { IconButton } from '../actions/IconButton';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastProps {
  message: ToastMessage;
  onClose: (id: string) => void;
}

const variantIcons = {
  success: <CheckCircle2 className="text-success" color="var(--color-success)" size={24} />,
  error: <XCircle className="text-danger" color="var(--color-danger)" size={24} />,
  warning: <AlertCircle className="text-warning" color="var(--color-warning)" size={24} />,
  info: <Info className="text-info" color="var(--color-info)" size={24} />
};

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message.duration !== 0) {
      const timer = setTimeout(() => {
        onClose(message.id);
      }, message.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <div className="toast" role="alert">
      <div className="toast-icon">
        {variantIcons[message.variant || 'info']}
      </div>
      <div style={{ flex: 1 }}>
        <h4 className="text-label" style={{ color: 'var(--color-text-neutral)' }}>{message.title}</h4>
        {message.description && (
          <p className="text-caption" style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>
            {message.description}
          </p>
        )}
      </div>
      <IconButton size="sm" onClick={() => onClose(message.id)} aria-label="Close toast">
        <X size={16} />
      </IconButton>
    </div>
  );
};

// Simplified Provider pattern for showcase (a real app would use a Context)
export const ToastContainer: React.FC<{ toasts: ToastMessage[], onClose: (id: string) => void }> = ({ toasts, onClose }) => {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} message={toast} onClose={onClose} />
      ))}
    </div>
  );
};
