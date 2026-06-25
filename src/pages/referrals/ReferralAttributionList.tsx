import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const ReferralAttributionList: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const attributions = [
    { id: 'REF-9921', program: 'Jamaah Refer Jamaah', referrer: 'Ahmad M.', bookingStatus: 'Confirmed', paymentStatus: 'Paid', attrStatus: 'eligible', rewardStatus: 'pending_review' },
    { id: 'REF-9922', program: 'Mutawwif Network', referrer: 'Ustaz Ali', bookingStatus: 'Confirmed', paymentStatus: 'Paid', attrStatus: 'eligible', rewardStatus: 'pending_review' },
    { id: 'REF-9924', program: 'Jamaah Refer Jamaah', referrer: 'Siti Nurhaliza', bookingStatus: 'Cancelled', paymentStatus: 'Refunded', attrStatus: 'rejected', rewardStatus: 'rejected' },
  ];

  const columns = [
    { header: 'Ref ID', accessor: 'id' as const },
    { header: 'Program', accessor: 'program' as const },
    { header: 'Referrer', accessor: 'referrer' as const },
    { header: 'Booking Status', accessor: 'bookingStatus' as const },
    { header: 'Payment Status', accessor: 'paymentStatus' as const },
    { header: 'Attribution', accessor: (row: any) => (
      <Badge variant={getStatusBadgeVariant(row.attrStatus)}>{row.attrStatus}</Badge>
    ) },
    { header: 'Reward Status', accessor: (row: any) => (
      <Badge variant={getStatusBadgeVariant(row.rewardStatus)}>{row.rewardStatus}</Badge>
    ) },
    { header: 'Action', accessor: () => <Button variant="secondary" size="sm">Review</Button>, align: 'right' as const }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader 
        title="Attribution & Review Queue" 
        subtitle="Review referral eligibility, handle fraud checks, and approve rewards."
      />

      <section style={{ backgroundColor: 'var(--surface-base)', borderRadius: '16px', border: '1px solid var(--gray-200)', padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <Button variant="outline">Pending Review (145)</Button>
          <Button variant="ghost">Under Fraud Hold (12)</Button>
          <Button variant="ghost">All Attributions</Button>
        </div>
        <DataTable data={attributions} columns={columns} />
      </section>
    </div>
  );
};
