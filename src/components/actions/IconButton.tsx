import React, { forwardRef } from 'react';
import { classNames } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          'icon-btn',
          `icon-btn-${size}`,
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? <Loader2 className="animate-spin" size={size === 'sm' ? 16 : 20} /> : children}
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';
