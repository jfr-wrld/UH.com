import React, { forwardRef } from 'react';
import { classNames } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={classNames(
          'input-base',
          error && 'input-error',
          className
        )}
        style={{ minHeight: '100px', resize: 'vertical', ...props.style }}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
