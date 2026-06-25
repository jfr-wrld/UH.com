import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { SensitiveDataReveal } from '../../components/domain/SensitiveDataReveal';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { CheckCircle, XCircle, CreditCard, UploadCloud, FileText } from 'lucide-react';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const AllowanceDetails: React.FC<{ navigate: (route: string, data?: any) => void, allowanceId?: string }> = ({ navigate, allowanceId = 'alw_1' }) => {
  const { getById } = useLocalStorageCrud('allowance');

  const alwData = getById(allowanceId) || {
    id: allowanceId,
    mutawwif: 'Unknown',
    trip: 'Unknown',
    role: 'Unknown',
    allowance: 0,
    payout: 'Unknown',
    status: 'Pending'
  };

  // Mock Data representing a "Pending Approval" state
  const allowance = {
    ...alwData,
    allowanceId: alwData.id,
    title: `Budget for ${alwData.trip}`,
    amount: alwData.allowance,
    currency: 'MYR',
    relatedType: 'Group Trip',
    relatedRecord: alwData.trip,
    type: 'Allowance',
    requester: 'Ops Team',
    neededDate: '10 Dec 2026',
    description: `Requested funds for ${alwData.mutawwif} (${alwData.role})`,
    paymentMethod: alwData.payout,
    bankRef: 'Maybank 1234567890',
    financeRemark: ''
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Allowance Request Details"
        breadcrumbs={[{ label: 'Finance' }, { label: 'Allowances', onClick: () => navigate('fin-allowance') }, { label: allowance.allowanceId }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('fin-allowance')}>Back</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        
        {/* Left Column: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
              <div>
                <h2 className="text-h3" style={{ marginBottom: 'var(--space-2)' }}>{allowance.title}</h2>
                <span className="text-body text-muted">Requested by {allowance.requester}</span>
              </div>
              <Badge variant={getStatusBadgeVariant(allowance.status)}>{allowance.status}</Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div><span className="text-caption text-muted" style={{ display: 'block' }}>Allowance Type</span><span className="text-body-bold">{allowance.type}</span></div>
                <div><span className="text-caption text-muted" style={{ display: 'block' }}>Related To</span><span className="text-body">{allowance.relatedType}: {allowance.relatedRecord}</span></div>
                <div><span className="text-caption text-muted" style={{ display: 'block' }}>Needed By</span><span className="text-body">{allowance.neededDate}</span></div>
              </div>
              
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Requested Amount</span>
                <span className="text-h2" style={{ color: 'var(--color-primary-dark)' }}>{allowance.currency} {allowance.amount.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-default)' }}>
              <span className="text-caption-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Description / Justification</span>
              <p className="text-body">{allowance.description}</p>
            </div>

            <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-default)' }}>
              <span className="text-caption-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Payment Instructions</span>
              <p className="text-body text-muted">Method: {allowance.paymentMethod}</p>
              <div style={{ marginTop: 'var(--space-2)' }}>
                <SensitiveDataReveal
                  label="Bank Reference"
                  realValue={allowance.bankRef}
                  maskedValue={allowance.bankRef.replace(/(\d{4})\d+(\d{4})/, '$1••••$2')}
                />
              </div>
            </div>
          </div>

          <AuditLogPanel 
            logs={[
              { id: '1', timestamp: '01 Nov 2026 09:00 AM', actor: 'Ops Team', action: 'Allowance Requested', module: 'Finance', details: 'Meal budget requested for TRP-1001.' }
            ]}
          />
        </div>

        {/* Right Column: Workflow Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-primary)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Finance Actions</h3>
            
            {/* Action State: Pending Approval */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <p className="text-caption text-muted">Review this request. Once approved, it can be paid out.</p>
              
              <div style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span className="text-caption-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Finance Remark</span>
                <textarea 
                  className="text-body" 
                  rows={2} 
                  placeholder="Reason for rejection or internal note..."
                  style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-input)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}
                />
              </div>

              <Button style={{ width: '100%', justifyContent: 'center' }} leftIcon={<CheckCircle size={16} />}>Approve Request</Button>
              <Button variant="danger" style={{ width: '100%', justifyContent: 'center' }} leftIcon={<XCircle size={16} />}>Reject Request</Button>
            </div>

            {/* Note: In a real app, these states would be conditionally rendered based on status. Shown here for design illustration. */}
            <hr style={{ border: 'none', borderTop: '1px dashed var(--border-default)', margin: 'var(--space-4) 0' }} />
            
            {/* Action State: Approved, waiting for payment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', opacity: 0.5 }}>
              <p className="text-caption text-muted">Mark as paid once external transfer is completed.</p>
              <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }} leftIcon={<CreditCard size={16} />} disabled>Mark as Paid</Button>
            </div>

            <hr style={{ border: 'none', borderTop: '1px dashed var(--border-default)', margin: 'var(--space-4) 0' }} />

            {/* Action State: Paid, waiting for settlement (receipt upload) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', opacity: 0.5 }}>
              <p className="text-caption text-muted">Upload expense receipts to settle this allowance.</p>
              <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }} leftIcon={<UploadCloud size={16} />} disabled>Upload Receipts & Settle</Button>
            </div>

          </div>

          {/* Attachments Panel */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Supporting Documents</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-2)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><FileText size={16} className="text-muted" /><span className="text-body text-muted">Trip_Budget_Estimation.pdf</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
