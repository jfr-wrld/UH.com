import React from 'react';
import { DropdownMenu } from '../actions/DropdownMenu';
import type { DropdownMenuItem } from '../actions/DropdownMenu';
import { Badge } from '../data-display/Badge';
import { ChevronDown } from 'lucide-react';

export interface StatusTransitionMenuProps {
  currentStatus: string;
  allowedTransitions: string[];
  onTransition: (newStatus: string) => void;
  disabled?: boolean;
}

export const StatusTransitionMenu: React.FC<StatusTransitionMenuProps> = ({
  currentStatus,
  allowedTransitions,
  onTransition,
  disabled = false
}) => {
  const getVariant = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('active') || s.includes('approved') || s.includes('success')) return 'success';
    if (s.includes('pending') || s.includes('revision') || s.includes('draft')) return 'warning';
    if (s.includes('reject') || s.includes('suspend') || s.includes('fail') || s.includes('cancel')) return 'danger';
    return 'neutral';
  };

  const dropdownItems: DropdownItem[] = allowedTransitions.map(status => ({
    id: status,
    label: `Change to ${status}`,
    onClick: () => onTransition(status)
  }));

  const trigger = (
    <div style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: 'var(--space-2)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1
    }}>
      <Badge variant={getVariant(currentStatus)}>{currentStatus}</Badge>
      {!disabled && allowedTransitions.length > 0 && <ChevronDown size={14} color="var(--text-muted)" />}
    </div>
  );

  if (disabled || allowedTransitions.length === 0) {
    return trigger;
  }

  return (
    <DropdownMenu 
      triggerLabel={trigger}
      items={dropdownItems}
    />
  );
};
