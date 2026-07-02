import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Button } from '../../../components/actions/Button';
import { Badge } from '../../../components/data-display/Badge';
import { ArrowLeft, Download, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { DataTable } from '../../../components/data-display/DataTable';

export const TASettlementDetails: React.FC<{ settlementId?: string, navigate: (path: string, state?: any) => void }> = ({ settlementId = 'STL-2026-06-001', navigate }) => {
  const [settlement, setSettlement] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch
    setTimeout(() => {
      setSettlement({
        id: settlementId,
        period: 'June 2026',
        grossCollected: 155000,
        refunds: 0,
        platformCommission: 7750,
        adjustments: 0,
        netSettlement: 147250,
        status: 'completed',
        createdAt: '2026-07-01T09:00:00Z',
        completedAt: '2026-07-03T10:15:00Z',
        bankAccount: 'Maybank Islamic Berhad (**** 1234)',
        transactions: [
          { id: 'PAY-001', date: '2026-06-15', amount: 50000, commission: 2500, type: 'payment', reference: 'INV-001' },
          { id: 'PAY-002', date: '2026-06-18', amount: 45000, commission: 2250, type: 'payment', reference: 'INV-002' },
          { id: 'PAY-003', date: '2026-06-25', amount: 60000, commission: 3000, type: 'payment', reference: 'INV-003' }
        ]
      });
      setLoading(false);
    }, 500);
  }, [settlementId]);

  if (loading || !settlement) {
    return <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>Loading settlement details...</div>;
  }

  const transactionColumns = [
    { accessor: (row: any) => row.date, header: 'Date' },
    { accessor: (row: any) => row.id, header: 'Transaction ID' },
    { accessor: (row: any) => row.reference, header: 'Reference' },
    { accessor: (row: any) => <span className="capitalize">{row.type}</span>, header: 'Type' },
    { accessor: (row: any) => `RM ${row.amount.toLocaleString()}`, header: 'Gross Amount' },
    { accessor: (row: any) => `RM ${row.commission.toLocaleString()}`, header: 'Commission Deducted' }
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'completed' || status === 'prepared') return <Badge variant="success" className="capitalize">{status}</Badge>;
    if (status === 'ready' || status === 'processing') return <Badge variant="warning" className="capitalize">{status}</Badge>;
    return <Badge variant="danger" className="capitalize">{status}</Badge>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader 
        title={`Settlement ${settlement.id}`}
        breadcrumbs={[
          { label: 'Finance', onClick: () => navigate('ta-finance') }, 
          { label: 'Settlements', onClick: () => navigate('ta-finance-settlements') }, 
          { label: settlement.id }
        ]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate('ta-finance-settlements')}>Back</Button>
            <Button variant="secondary" leftIcon={<Download size={16} />} disabled={settlement.status !== 'completed'}>Download Statement</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 'var(--space-6)', alignItems: 'start' }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
            <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-5)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
              <div className="text-caption text-muted mb-2">Gross Collected</div>
              <div className="text-h3">RM {settlement.grossCollected.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-5)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
              <div className="text-caption text-muted mb-2">Platform Fee</div>
              <div className="text-h3 text-danger">- RM {settlement.platformCommission.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-5)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
              <div className="text-caption text-muted mb-2">Refunds & Adj.</div>
              <div className="text-h3 text-warning">- RM {settlement.refunds.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: 'var(--surface-primary-subtle)', padding: 'var(--space-5)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-primary)' }}>
              <div className="text-caption text-primary mb-2">Net Settlement</div>
              <div className="text-h3 text-primary">RM {settlement.netSettlement.toLocaleString()}</div>
            </div>
          </div>

          {/* Transaction List */}
          <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Settlement Transactions</h3>
            <DataTable 
              columns={transactionColumns}
              data={settlement.transactions}
            />
          </div>
        </div>

        {/* Sidebar Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-5)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Settlement Info</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <div className="text-caption text-muted mb-1">Status</div>
                {getStatusBadge(settlement.status)}
              </div>
              
              <div>
                <div className="text-caption text-muted mb-1">Period</div>
                <div className="text-body-bold">{settlement.period}</div>
              </div>
              
              <div>
                <div className="text-caption text-muted mb-1">Prepared At</div>
                <div className="text-body" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Clock size={14} className="text-muted" />
                  {new Date(settlement.createdAt).toLocaleString()}
                </div>
              </div>

              {settlement.completedAt && (
                <div>
                  <div className="text-caption text-muted mb-1">Completed At</div>
                  <div className="text-body" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <CheckCircle size={14} className="text-success" />
                    {new Date(settlement.completedAt).toLocaleString()}
                  </div>
                </div>
              )}

              <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)' }} />

              <div>
                <div className="text-caption text-muted mb-1">Receiving Bank Account</div>
                <div className="text-body">{settlement.bankAccount}</div>
                <div className="text-caption text-muted mt-1">If this account is incorrect, please update it in Agency Settings.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
