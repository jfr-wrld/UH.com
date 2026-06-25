import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const ReferralFinanceHandoff: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const handoffs = [
    { id: 'FH-8801', refId: 'REF-9901', referrer: 'Mohd Faiz', amount: 'RM 100', currency: 'MYR', payoutDest: 'Bank Transfer', status: 'pending_handoff', date: '10 Jun 2026' },
    { id: 'FH-8802', refId: 'REF-9905', referrer: 'Ustaz Budi', amount: 'RM 500', currency: 'MYR', payoutDest: 'Pending Setup', status: 'pending_handoff', date: '11 Jun 2026' },
    { id: 'FH-8803', refId: 'REF-9910', referrer: 'Aminah Y.', amount: 'RM 150', currency: 'MYR', payoutDest: 'Wallet', status: 'handed_off', date: '08 Jun 2026' },
  ];

  const columns = [
    { header: 'Handoff ID', accessor: 'id' as const },
    { header: 'Ref ID', accessor: 'refId' as const },
    { header: 'Referrer', accessor: 'referrer' as const },
    { header: 'Amount', accessor: 'amount' as const },
    { header: 'Payout Dest', accessor: 'payoutDest' as const },
    { header: 'Handoff Date', accessor: 'date' as const },
    { header: 'Status', accessor: (row: any) => (
      <Badge variant={row.status === 'handed_off' ? 'success' : 'warning'}>
        {row.status === 'handed_off' ? 'Sent to Finance' : 'Pending Handoff'}
      </Badge>
    ) },
    { header: 'Action', accessor: () => <Button variant="secondary" size="sm">Handoff</Button>, align: 'right' as const }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader 
        title="Finance Handoff Queue" 
        subtitle="Approve and send validated referral rewards to the Finance module for payout processing."
        actions={
          <Button>Bulk Handoff</Button>
        }
      />

      <section style={{ backgroundColor: 'var(--surface-base)', borderRadius: '16px', border: '1px solid var(--gray-200)', padding: 'var(--space-6)' }}>
        <DataTable data={handoffs} columns={columns} />
      </section>
    </div>
  );
};
