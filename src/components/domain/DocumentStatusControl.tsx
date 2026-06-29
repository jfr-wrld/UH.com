import React from 'react';
import { Select } from '../inputs/Select';
import { Badge } from '../data-display/Badge';

export type DocumentStatus = 'Pending' | 'Submitted' | 'Confirmed' | 'Rejected' | 'Expired';

export interface DocumentStatusControlProps {
  documentName: string;
  status: DocumentStatus;
  onStatusChange: (status: DocumentStatus) => void;
  required?: boolean;
}

export const DocumentStatusControl: React.FC<DocumentStatusControlProps> = ({
  documentName,
  status,
  onStatusChange,
  required = false
}) => {
  const getStatusVariant = (s: DocumentStatus) => {
    switch (s) {
      case 'Confirmed': return 'success';
      case 'Rejected':
      case 'Expired': return 'danger';
      case 'Submitted': return 'info';
      case 'Pending': default: return 'warning';
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: 'var(--space-3)',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', boxShadow: 'var(--glass-shadow)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span className="text-body-medium">{documentName}</span>
        {required && <Badge variant="warning">Required</Badge>}
        <Badge variant={getStatusVariant(status)}>{status}</Badge>
      </div>

      <div style={{ width: '150px' }}>
        <Select 
          value={status} 
          onChange={(e) => onStatusChange(e.target.value as DocumentStatus)}
          options={[
            { value: 'Pending', label: 'Pending' },
            { value: 'Submitted', label: 'Submitted' },
            { value: 'Confirmed', label: 'Confirmed' },
            { value: 'Rejected', label: 'Rejected' },
            { value: 'Expired', label: 'Expired' }
          ]}
        />
      </div>
    </div>
  );
};
