import React, { useState, useRef, useEffect } from 'react';
import { classNames } from '../../lib/utils';
import { ChevronDown, MoreVertical } from 'lucide-react';
import { Button } from './Button';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export interface DropdownMenuProps {
  triggerLabel?: React.ReactNode;
  items: DropdownMenuItem[];
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  iconOnly?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  triggerLabel,
  items,
  className,
  variant = 'secondary',
  iconOnly = false,
  disabled = false,
  leftIcon
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className={classNames('dropdown-container', className)} ref={containerRef}>
      <Button 
        variant={variant} 
        onClick={() => setIsOpen(!isOpen)}
        leftIcon={leftIcon}
        rightIcon={iconOnly ? undefined : (!triggerLabel ? <MoreVertical size={16} /> : <ChevronDown size={16} />)}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="true"
        style={!triggerLabel || iconOnly ? { padding: '0 var(--space-2)' } : undefined}
      >
        {triggerLabel}
      </Button>

      {isOpen && (
        <div className="dropdown-content" role="menu">
          {items.map((item) => (
            <button
              key={item.id}
              className={classNames('dropdown-item', item.danger && 'danger')}
              role="menuitem"
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.icon && <span style={{ width: 16, display: 'flex' }}>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
