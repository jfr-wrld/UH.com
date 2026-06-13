import React from 'react';
import { classNames } from '../../lib/utils';

export interface FormFieldProps {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  id?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required,
  className,
  style,
  children,
  id
}) => {
  return (
    <div className={classNames('form-field', className)} style={style}>
      <label htmlFor={id} className="form-label text-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      {children}
      {error && <span className="form-error text-caption">{error}</span>}
      {!error && helperText && <span className="form-helper text-caption">{helperText}</span>}
    </div>
  );
};
