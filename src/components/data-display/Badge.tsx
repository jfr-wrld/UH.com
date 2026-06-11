import React from 'react';
import { classNames } from '../../lib/utils';

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'primary';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  children,
  ...props
}) => {
  return (
    <span
      className={classNames(
        'badge',
        `badge-${variant}`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
