import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { classNames } from '../../lib/utils';
import { ChevronDown, Check, X } from 'lucide-react';

export interface MultiSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
  options?: { value: string; label: string }[];
  error?: boolean;
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ className, error, options = [], value, defaultValue = [], onChange, placeholder = "Select options", disabled }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOptions = options.filter(opt => currentValue.includes(opt.value));

    const toggleSelect = (val: string, e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }
      if (disabled) return;
      
      let newValues;
      if (currentValue.includes(val)) {
        newValues = currentValue.filter(v => v !== val);
      } else {
        newValues = [...currentValue, val];
      }
      
      if (!isControlled) {
        setInternalValue(newValues);
      }
      
      if (onChange) {
        onChange(newValues);
      }
    };

    return (
      <div className="custom-select-container" ref={containerRef}>
        <div 
          ref={ref}
          className={classNames(
            'input-base custom-select-trigger',
            error && 'input-error',
            disabled && 'input-disabled',
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className={classNames('trigger-content', currentValue.length > 0 && 'trigger-content-multi')} style={{ color: currentValue.length > 0 ? 'inherit' : 'var(--color-text-muted)' }}>
            {currentValue.length === 0 ? (
              <span>{placeholder}</span>
            ) : (
              selectedOptions.map(opt => (
                <div key={opt.value} className="custom-select-badge" onClick={(e) => e.stopPropagation()}>
                  <span>{opt.label}</span>
                  <button type="button" onClick={(e) => toggleSelect(opt.value, e)}>
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
          <ChevronDown size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
        </div>

        {isOpen && !disabled && (
          <div className="custom-select-dropdown">
            {options.map(opt => {
              const isSelected = currentValue.includes(opt.value);
              return (
                <div 
                  key={opt.value}
                  className={classNames(
                    'custom-select-option',
                    isSelected && 'selected'
                  )}
                  onClick={() => toggleSelect(opt.value)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      width: '16px', 
                      height: '16px', 
                      border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--gray-300)', 
                      backgroundColor: isSelected ? 'var(--color-primary-light)' : 'transparent',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isSelected && <Check size={12} style={{ color: 'var(--color-primary-dark)' }} />}
                    </div>
                    <span>{opt.label}</span>
                  </div>
                </div>
              );
            })}
            {options.length === 0 && (
              <div style={{ padding: '12px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '14px' }}>No options available</div>
            )}
          </div>
        )}
      </div>
    );
  }
);
MultiSelect.displayName = 'MultiSelect';
