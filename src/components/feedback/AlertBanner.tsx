import React from 'react';
import { classNames } from '../../lib/utils';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface AlertBannerProps {
  title?: string;
  message: string;
  variant?: 'success' | 'warning' | 'danger' | 'info';
  action?: React.ReactNode;
  className?: string;
}

const icons = {
  success: <CheckCircle2 size={20} />,
  warning: <AlertTriangle size={20} />,
  danger: <AlertCircle size={20} />,
  info: <Info size={20} />
};

export const AlertBanner: React.FC<AlertBannerProps> = ({
  title,
  message,
  variant = 'info',
  action,
  className
}) => {
  return (
    <div className={classNames('alert-banner', `alert-${variant}`, className)} role="alert" style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flexShrink: 0, marginTop: title ? '2px' : '0' }}>
        {icons[variant]}
      </div>
      <div className="alert-content" style={{ flex: 1 }}>
        {title && <h4 className="text-body-medium" style={{ marginBottom: 'var(--space-1)', color: 'inherit', fontWeight: 600 }}>{title}</h4>}
        <p className="text-body" style={{ color: title ? 'var(--color-text-neutral)' : 'inherit' }}>
          {message}
        </p>
      </div>
      {action && <div style={{ flexShrink: 0, marginLeft: 'var(--space-4)' }}>{action}</div>}
    </div>
  );
};
