import React from 'react';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { Upload, FileText, AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';

const mockDocuments = [
  { id: 1, type: 'Company Registration Certificate', status: 'Approved', expiry: null },
  { id: 2, type: 'Travel Agency License', status: 'Need Revision', expiry: '2026-12-31' },
  { id: 3, type: 'PIC Identity Document', status: 'Pending Review', expiry: null },
  { id: 4, type: 'Bank Account Proof', status: 'Not Uploaded', expiry: null },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Approved': return <CheckCircle2 size={18} />;
    case 'Need Revision': return <XCircle size={18} />;
    case 'Pending Review': return <Clock size={18} />;
    default: return <Upload size={18} />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved': return { bg: 'var(--color-success-light)', color: 'var(--color-success-dark)' };
    case 'Need Revision': return { bg: 'var(--color-danger-light)', color: 'var(--color-danger)' };
    case 'Pending Review': return { bg: 'var(--color-warning-light)', color: 'var(--color-warning-dark)' };
    default: return { bg: 'var(--gray-100)', color: 'var(--gray-500)' };
  }
};

export function TALegalDocumentsForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-subsection-title" style={{ margin: 0 }}>Legal Documents</h3>
            <p className="text-caption text-muted" style={{ margin: 0 }}>Manage and upload required verification documents.</p>
          </div>
        </div>
        <Button variant="primary" leftIcon={<Upload size={16} />}>Upload Document</Button>
      </div>

      {/* Document Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
        {mockDocuments.map((doc) => {
          const statusStyle = getStatusColor(doc.status);
          return (
            <div key={doc.id} style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--surface-sunken)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'var(--space-3)',
              transition: 'box-shadow 0.2s ease',
              border: '1px solid var(--border-subtle)',
              minHeight: '160px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: 'var(--radius-md)',
                    backgroundColor: statusStyle.bg, color: statusStyle.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    {getStatusIcon(doc.status)}
                  </div>
                  <Badge
                    variant={
                      doc.status === 'Approved' ? 'success' :
                      doc.status === 'Need Revision' ? 'danger' :
                      doc.status === 'Pending Review' ? 'warning' : 'neutral'
                    }
                  >
                    {doc.status}
                  </Badge>
                </div>
                <div>
                  <span className="text-body-bold" style={{ display: 'block', lineHeight: '1.3', fontSize: '14px' }}>{doc.type}</span>
                  {doc.expiry && <span className="text-caption text-muted" style={{ display: 'block', marginTop: '2px' }}>Expires: {doc.expiry}</span>}
                </div>
              </div>

              {doc.status === 'Need Revision' && (
                <div style={{
                  padding: 'var(--space-2) var(--space-3)',
                  backgroundColor: 'var(--color-danger-light)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  gap: 'var(--space-2)',
                  fontSize: '12px',
                  color: 'var(--color-danger)',
                  border: '1px solid var(--color-danger-light)',
                  lineHeight: '1.3'
                }}>
                  <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span><strong>Revision:</strong> Scan is blurry. Re-upload colored scan.</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)', marginTop: 'auto' }}>
                {doc.status !== 'Not Uploaded' && (
                  <Button variant="secondary" size="sm">View File</Button>
                )}
                {(doc.status === 'Need Revision' || doc.status === 'Not Uploaded') && (
                  <Button variant="primary" size="sm">
                    {doc.status === 'Not Uploaded' ? 'Upload' : 'Replace'}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
