import React from 'react';
import { classNames } from '../../lib/utils';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  actions: React.ReactNode;
  className?: string;
}

export const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedCount,
  onClearSelection,
  actions,
  className
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className={classNames('bulk-action-bar', className)} role="toolbar" aria-label="Bulk actions">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span className="text-body-medium">{selectedCount} selected</span>
        <IconButton 
          size="sm" 
          onClick={onClearSelection} 
          style={{ color: 'var(--surface-base)' }}
          aria-label="Clear selection"
        >
          <X size={16} />
        </IconButton>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        {actions}
      </div>
    </div>
  );
};
