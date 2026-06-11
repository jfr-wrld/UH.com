import React from 'react';
import { Button } from '../actions/Button';
import { Check, X, AlertTriangle, UserPlus } from 'lucide-react';

export interface ApprovalDecisionBarProps {
  onApprove: () => void;
  onReject: () => void;
  onRevise: () => void;
  onAssignReviewer?: () => void;
  disabled?: boolean;
}

export const ApprovalDecisionBar: React.FC<ApprovalDecisionBarProps> = ({
  onApprove,
  onReject,
  onRevise,
  onAssignReviewer,
  disabled = false
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap',
      gap: 'var(--space-3)', 
      padding: 'var(--space-4)', 
      backgroundColor: 'var(--surface-sunken)', 
      borderRadius: 'var(--radius-lg)',
      border: 'none',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <Button 
          variant="primary" 
          leftIcon={<Check size={16} />} 
          onClick={onApprove}
          disabled={disabled}
        >
          Approve
        </Button>
        <Button 
          variant="secondary" 
          leftIcon={<AlertTriangle size={16} />} 
          onClick={onRevise}
          disabled={disabled}
        >
          Request Revision
        </Button>
        <Button 
          variant="danger" 
          leftIcon={<X size={16} />} 
          onClick={onReject}
          disabled={disabled}
        >
          Reject
        </Button>
      </div>

      {onAssignReviewer && (
        <Button 
          variant="ghost" 
          leftIcon={<UserPlus size={16} />} 
          onClick={onAssignReviewer}
          disabled={disabled}
        >
          Assign Reviewer
        </Button>
      )}
    </div>
  );
};
