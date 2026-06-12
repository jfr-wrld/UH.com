import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { classNames } from '../../lib/utils';
import { ChevronDown, Check, X } from 'lucide-react';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options?: { value: string; label: string; icon?: React.ReactNode }[];
  error?: boolean;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ className, error, children, options, value, defaultValue, onChange, placeholder = "Select an option", disabled, style, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
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

    // Extract options from children if not provided as props
    const parsedOptions = options || [];
    if (!options && children) {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === 'option') {
          parsedOptions.push({
            value: (child.props as any).value || '',
            label: (child.props as any).children as string
          });
        }
      });
    }

    const selectedOption = parsedOptions.find(opt => opt.value === currentValue);

    const handleSelect = (val: string) => {
      if (!isControlled) {
        setInternalValue(val);
      }
      if (onChange) {
        // Mock event object for backward compatibility
        onChange({ target: { value: val, name: props.name } });
      }
      setIsOpen(false);
    };

    return (
      <div className="custom-select-container" ref={containerRef} style={style}>
        {/* Hidden select for standard form submissions if needed */}
        <select 
          style={{ display: 'none' }} 
          value={currentValue} 
          name={props.name} 
          disabled={disabled}
          onChange={(e) => onChange && onChange(e)}
        >
          <option value="" disabled>{placeholder}</option>
          {parsedOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        
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
          <div 
            className="trigger-content" 
            style={{ 
              color: selectedOption ? 'inherit' : 'var(--color-text-muted)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              minWidth: 0
            }}
          >
            {selectedOption ? (
              <>
                {selectedOption.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{selectedOption.icon}</span>}
                {selectedOption.label}
              </>
            ) : placeholder}
          </div>
          {currentValue && (
            <span
              role="button"
              tabIndex={0}
              className="custom-select-clear"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  e.preventDefault();
                  handleSelect('');
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px',
                borderRadius: '50%',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                marginRight: '2px',
                zIndex: 10,
                flexShrink: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              <X size={14} />
            </span>
          )}
          <ChevronDown size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
        </div>

        {isOpen && !disabled && (
          <div className="custom-select-dropdown">
            {currentValue && (
              <div 
                className="custom-select-option"
                style={{ 
                  color: 'var(--color-text-muted)', 
                  borderBottom: '1px solid var(--color-border)',
                  fontWeight: 500,
                  fontSize: '13px'
                }}
                onClick={() => handleSelect('')}
              >
                <span>Clear Selection</span>
              </div>
            )}
            {parsedOptions.map(opt => (
              <div 
                key={opt.value}
                className={classNames(
                  'custom-select-option',
                  opt.value === currentValue && 'selected'
                )}
                onClick={() => handleSelect(opt.value)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {opt.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{opt.icon}</span>}
                  <span>{opt.label}</span>
                </div>
                {opt.value === currentValue && <Check size={16} style={{ color: 'var(--color-primary)' }} />}
              </div>
            ))}
            {parsedOptions.length === 0 && (
              <div style={{ padding: '12px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '14px' }}>No options available</div>
            )}
          </div>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
