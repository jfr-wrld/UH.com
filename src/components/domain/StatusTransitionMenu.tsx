import React from 'react';
import { DropdownMenu } from '../actions/DropdownMenu';
import type { DropdownMenuItem } from '../actions/DropdownMenu';
import { Badge } from '../data-display/Badge';
import { ChevronDown, CheckCircle, Clock, XCircle, Circle, Archive } from 'lucide-react';

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
    if (s === 'active' || s.includes('approved') || s.includes('success')) return 'success';
    if (s.includes('pending') || s.includes('revision') || s.includes('draft')) return 'warning';
    if (s.includes('reject') || s.includes('suspend') || s.includes('fail') || s.includes('cancel') || s.includes('inactive')) return 'danger';
    if (s.includes('archived')) return 'info';
    return 'neutral';
  };

  const getIcon = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'active' || s.includes('approved') || s.includes('success') || s.includes('completed') || s.includes('confirmed') || s.includes('published')) return <CheckCircle size={16} color="var(--color-success)" />;
    if (s.includes('pending') || s.includes('revision') || s.includes('draft') || s.includes('review') || s.includes('scheduled') || s.includes('upcoming')) return <Clock size={16} color="var(--color-warning)" />;
    if (s.includes('reject') || s.includes('suspend') || s.includes('fail') || s.includes('cancel') || s.includes('inactive')) return <XCircle size={16} color="var(--color-danger)" />;
    if (s.includes('archived')) return <Archive size={16} color="var(--color-info)" />;
    return <Circle size={16} color="var(--color-primary)" />;
  };

  const dropdownItems: DropdownMenuItem[] = allowedTransitions.map(status => ({
    id: status,
    label: status,
    icon: getIcon(status),
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
