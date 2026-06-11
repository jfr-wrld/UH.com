import React from 'react';
import { classNames } from '../../lib/utils';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <div className={classNames('timeline', className)}>
      {items.map((item) => (
        <div key={item.id} className="timeline-item">
          <div className={classNames('timeline-dot', item.variant || 'primary')}>
            {item.icon && <span style={{ width: 14, height: 14, display: 'flex' }}>{item.icon}</span>}
          </div>
          <div style={{ flex: 1, paddingBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h4 className="text-body-medium">{item.title}</h4>
              <span className="text-caption" style={{ color: 'var(--color-text-muted)' }}>{item.timestamp}</span>
            </div>
            {item.description && (
              <p className="text-body" style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
