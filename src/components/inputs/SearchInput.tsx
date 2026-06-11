import React, { forwardRef } from 'react';
import { classNames } from '../../lib/utils';
import { Search, X } from 'lucide-react';
import { Input } from './Input';
import type { InputProps } from './Input';
import { IconButton } from '../actions/IconButton';

export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'rightIcon'> {
  onClear?: () => void;
  value?: string | number | readonly string[];
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, value, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={classNames('search-input', className)}
        leftIcon={<Search size={20} />}
        rightIcon={
          value && onClear ? (
            <IconButton 
              size="sm" 
              onClick={onClear} 
              aria-label="Clear search"
              style={{ width: 24, height: 24, marginRight: '-8px' }}
            >
              <X size={14} />
            </IconButton>
          ) : undefined
        }
        value={value}
        {...props}
      />
    );
  }
);
SearchInput.displayName = 'SearchInput';
