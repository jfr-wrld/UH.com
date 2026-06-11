import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/actions/Button';
import { Badge } from '../../components/data-display/Badge';
import { FormField } from '../../components/inputs/FormField';
import { Select } from '../../components/inputs/Select';
import { Input } from '../../components/inputs/Input';
import { ConfirmationDialog } from '../../components/feedback/ConfirmationDialog';
import { VerificationChecklist } from '../../components/domain/VerificationChecklist';
import type { ChecklistStatus } from '../../components/domain/VerificationChecklist';
import { ApprovalDecisionBar } from '../../components/domain/ApprovalDecisionBar';
import type { ToastMessage } from '../../components/feedback/Toast';
import { ChevronRight } from 'lucide-react';

export const ApplicationReview: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void, applicationId?: string }> = ({ navigate, showToast, applicationId  }) => {
  const [checklist, setChecklist] = useState<{id: string, label: string, status: ChecklistStatus}[]>([
    { id: 'ssm', label: 'SSM Certificate', status: 'pending' },
    { id: 'motac', label: 'MOTAC License', status: 'pending' },
    { id: 'bank', label: 'Bank Statement', status: 'pending' }
  ]);

  const [dialogConfig, setDialogConfig] = useState<{isOpen: boolean, type: 'approve' | 'revise' | 'reject' | null}>({ isOpen: false, type: null });
  const [reason, setReason] = useState('');

  const handleStatusChange = (id: string, status: ChecklistStatus) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const handleDecisionSubmit = () => {
    // In a real app, this would submit the decision via API and show a toast
    setDialogConfig({ isOpen: false, type: null });
    if (showToast) showToast('Success', 'Action completed successfully.', 'success');
    navigate('ta-applications');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader 
        title={`Review Application: ${applicationId || 'APP-2026-001'}`} 
        breadcrumbs={[
          { label: 'Travel Agency Management' }, 
          { label: 'Applications', onClick: () => navigate('ta-applications') },
          { label: 'Review' }
        ]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Left Column: Submitted Data */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <section>
            <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Agency Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <div className="text-caption text-muted">Agency Name</div>
                <div className="text-body-medium">Zamzam Travels</div>
              </div>
              <div>
                <div className="text-caption text-muted">Agency Type</div>
                <div className="text-body-medium">Travel Agency</div>
              </div>
              <div>
                <div className="text-caption text-muted">SSM Number</div>
                <div className="text-body-medium">202301004567</div>
              </div>
              <div>
                <div className="text-caption text-muted">MOTAC License</div>
                <div className="text-body-medium">KPK/LN: 12345</div>
              </div>
            </div>
          </section>

            <VerificationChecklist 
              title="Legal Documents"
              items={checklist}
              onStatusChange={handleStatusChange}
            />
        </div>

        {/* Right Column: Review Panel */}
        <div>
          <div style={{ 
            backgroundColor: 'var(--surface-sunken)', 
            padding: 'var(--space-6)', 
            borderRadius: 'var(--radius-lg)',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)'
          }}>
            <h2 className="text-section-title">Admin Review Panel</h2>
            
            <ApprovalDecisionBar 
              onApprove={() => setDialogConfig({ isOpen: true, type: 'approve' })}
              onReject={() => setDialogConfig({ isOpen: true, type: 'reject' })}
              onRevise={() => setDialogConfig({ isOpen: true, type: 'revise' })}
            />
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={dialogConfig.isOpen}
        title={dialogConfig.type === 'approve' ? 'Approve Application' : dialogConfig.type === 'revise' ? 'Request Revision' : 'Reject Application'}
        message={dialogConfig.type === 'approve' ? 'Are you sure you want to approve this application?' : ''}
        confirmLabel={dialogConfig.type === 'approve' ? 'Approve' : dialogConfig.type === 'revise' ? 'Send Revision Request' : 'Reject'}
        cancelLabel="Cancel"
        isDestructive={dialogConfig.type === 'reject'}
        onConfirm={handleDecisionSubmit}
        onCancel={() => setDialogConfig({ isOpen: false, type: null })}
      >
        {dialogConfig.type !== 'approve' && (
          <FormField label={dialogConfig.type === 'revise' ? 'Revision Details' : 'Rejection Reason'} required>
            <textarea
              className="text-body"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide details..."
              rows={4}
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-input)',
                backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)',
                resize: 'vertical'
              }}
            />
          </FormField>
        )}
      </ConfirmationDialog>
    </div>
  );
};
