import React, { useState } from 'react';
import { ConfirmationDialog } from '../feedback/ConfirmationDialog';
import { FormField } from '../inputs/FormField';
import { Input } from '../inputs/Input';

export interface AuditActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  title: string;
  message?: string;
  actionLabel: string;
  entityName?: string;
  isDestructive?: boolean;
  requireReason?: boolean;
}

export const AuditActionModal: React.FC<AuditActionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  actionLabel,
  entityName,
  isDestructive = false,
  requireReason = true
}) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (requireReason && !reason.trim()) {
      setError('Reason is required for this action.');
      return;
    }
    setError('');
    onConfirm(reason);
    setReason('');
  };

  const handleClose = () => {
    setError('');
    setReason('');
    onClose();
  };

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title={title}
      confirmLabel={actionLabel}
      isDestructive={isDestructive}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {message && <p className="text-body">{message}</p>}
        {entityName && (
          <p className="text-body">
            Target: <span className="text-body-bold">{entityName}</span>
          </p>
        )}
        
        {requireReason && (
          <FormField label="Reason for Action" required error={error}>
            <Input 
              placeholder="E.g., Verified documents against guidelines" 
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError('');
              }}
            />
          </FormField>
        )}
      </div>
    </ConfirmationDialog>
  );
};
