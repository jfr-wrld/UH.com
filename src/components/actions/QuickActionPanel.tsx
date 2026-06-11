import React from 'react';
import { classNames } from '../../lib/utils';
import { Button } from './Button';

export interface QuickAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  permissionRequired?: string;
}

export interface QuickActionPanelProps {
  title?: string;
  actions: QuickAction[];
  userPermissions?: string[];
  className?: string;
}

export const QuickActionPanel: React.FC<QuickActionPanelProps> = ({
  title = 'Quick Actions',
  actions,
  userPermissions = [],
  className
}) => {
  // Filter actions based on permissions if required
  const visibleActions = actions.filter(action => {
    if (!action.permissionRequired) return true;
    return userPermissions.includes(action.permissionRequired);
  });

  if (visibleActions.length === 0) return null;

  return (
    <div className={classNames('quick-action-panel', className)}>
      <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>{title}</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: 'var(--space-3)'
      }}>
        {visibleActions.map(action => (
          <button
            key={action.id}
            onClick={action.onClick}
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-4) var(--space-2)',
              backgroundColor: 'var(--surface-sunken)',
              border: '1px solid transparent',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              color: 'var(--color-text-neutral)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.color = 'var(--color-primary-dark)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface-sunken)';
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-neutral)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-1)' }}>
              {action.icon}
            </div>
            <span className="text-caption" style={{ fontWeight: 600, textAlign: 'center' }}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
