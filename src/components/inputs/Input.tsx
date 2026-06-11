import React, { forwardRef } from 'react';
import { classNames } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, ...props }, ref) => {
    const hasIcon = leftIcon || rightIcon;

    const inputElement = (
      <input
        ref={ref}
        className={classNames(
          'input-base',
          error && 'input-error',
          leftIcon && 'input-with-icon-left',
          rightIcon && 'input-with-icon-right',
          className
        )}
        {...props}
      />
    );

    if (hasIcon) {
      return (
        <div className="input-icon-wrapper">
          {leftIcon && <span className="input-icon-left">{leftIcon}</span>}
          {inputElement}
          {rightIcon && <span className="input-icon-right">{rightIcon}</span>}
        </div>
      );
    }

    return inputElement;
  }
);
Input.displayName = 'Input';
