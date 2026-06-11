import React from 'react';
import { Badge } from '../data-display/Badge';
import { Button } from '../actions/Button';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export type ChecklistStatus = 'pending' | 'pass' | 'fail' | 'remark';

export interface ChecklistItem {
  id: string;
  label: string;
  required?: boolean;
  status: ChecklistStatus;
  remark?: string;
}

export interface VerificationChecklistProps {
  title?: string;
  items: ChecklistItem[];
  onStatusChange?: (id: string, status: ChecklistStatus) => void;
  readOnly?: boolean;
}

export const VerificationChecklist: React.FC<VerificationChecklistProps> = ({
  title = 'Verification Checklist',
  items,
  onStatusChange,
  readOnly = false
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <h3 className="text-section-title">{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {items.map(item => (
          <div key={item.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: 'var(--space-3)',
            backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)',
            border: 'none',
            borderRadius: 'var(--radius-md)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="text-body-medium">{item.label}</span>
                {item.required && <Badge variant="warning">Required</Badge>}
              </div>
              {item.remark && <div className="text-caption text-muted" style={{ marginTop: 'var(--space-1)' }}>{item.remark}</div>}
            </div>
            
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              {readOnly ? (
                <Badge variant={
                  item.status === 'pass' ? 'success' :
                  item.status === 'fail' ? 'danger' :
                  item.status === 'remark' ? 'warning' : 'neutral'
                }>
                  {item.status.toUpperCase()}
                </Badge>
              ) : (
                <>
                  <Button 
                    size="sm" 
                    variant={item.status === 'pass' ? 'primary' : 'ghost'}
                    onClick={() => onStatusChange?.(item.id, 'pass')}
                  >
                    <CheckCircle size={16} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant={item.status === 'fail' ? 'danger' : 'ghost'}
                    onClick={() => onStatusChange?.(item.id, 'fail')}
                  >
                    <XCircle size={16} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant={item.status === 'remark' ? 'warning' : 'ghost'}
                    onClick={() => onStatusChange?.(item.id, 'remark')}
                  >
                    <AlertCircle size={16} />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
