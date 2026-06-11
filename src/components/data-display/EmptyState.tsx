import React from 'react';
import { classNames } from '../../lib/utils';
import { Inbox } from 'lucide-react';
import { Button } from '../actions/Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div className={classNames('empty-state', className)}>
      <div className="empty-state-icon">
        {icon || <Inbox size={24} />}
      </div>
      <h3 className="text-section-title">{title}</h3>
      {description && (
        <p className="text-body text-muted" style={{ marginTop: 'var(--space-2)', color: 'var(--color-text-muted)' }}>
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <div style={{ marginTop: 'var(--space-6)' }}>
          <Button onClick={onAction} variant="secondary">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
