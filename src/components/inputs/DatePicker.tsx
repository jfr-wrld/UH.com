import React, { forwardRef } from 'react';
import { classNames } from '../../lib/utils';
import { Calendar } from 'lucide-react';

export interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="input-icon-wrapper">
        <span className="input-icon-left">
          <Calendar size={20} />
        </span>
        <input
          type="date"
          ref={ref}
          className={classNames(
            'input-base',
            'input-with-icon-left',
            error && 'input-error',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
DatePicker.displayName = 'DatePicker';
