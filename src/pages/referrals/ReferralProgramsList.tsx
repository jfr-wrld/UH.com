import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const ReferralProgramsList: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const programs = [
    { id: 'PRG-1001', name: 'Jamaah Refer Jamaah', scope: 'Platform', type: 'Jamaah', status: 'active', reward: 'RM 100 / booking', startDate: '2026-01-01' },
    { id: 'PRG-1002', name: 'Mutawwif Network 2026', scope: 'Platform', type: 'Mutawwif', status: 'active', reward: 'RM 500 / booking', startDate: '2026-01-01' },
    { id: 'PRG-1003', name: 'Zamzam Agency VIP', scope: 'Agency', type: 'Mixed', status: 'paused', reward: 'RM 150 / booking', startDate: '2026-03-01' },
  ];

  const columns = [
    { header: 'Program ID', accessor: 'id' as const },
    { header: 'Program Name', accessor: 'name' as const },
    { header: 'Scope', accessor: (row: any) => (
      <Badge variant={getStatusBadgeVariant(row.scope)}>{row.scope}</Badge>
    ) },
    { header: 'Type', accessor: 'type' as const },
    { header: 'Reward Rule', accessor: 'reward' as const },
    { header: 'Status', accessor: (row: any) => (
      <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge>
    ) },
    { header: 'Action', accessor: () => <Button variant="ghost" size="sm">Edit</Button>, align: 'right' as const }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader 
        title="Referral Programs & Campaigns" 
        subtitle="Manage active programs, reward rules, and campaign eligibility."
        actions={
          <Button onClick={() => console.log('Create Program')}>Create Program</Button>
        }
      />

      <section style={{ backgroundColor: 'var(--surface-base)', borderRadius: '16px', border: '1px solid var(--gray-200)', padding: 'var(--space-6)' }}>
        <DataTable data={programs} columns={columns} />
      </section>
    </div>
  );
};
