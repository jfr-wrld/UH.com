import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Skeleton } from '../../components/data-display/Skeleton';
import { TrendingUp, CheckCircle, Clock, AlertTriangle, Percent, RotateCcw, Wallet, ArrowUpRight, Download, Eye, ChevronRight } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';

export const FinanceOverview: React.FC<{ navigate: (route: string, data?: any) => void; showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Recent payments mock data (PRD Section 9)
  const recentPayments = [
    { id: 'PAY-20261101', invoiceId: 'INV-2026-0145', agency: 'Zamzam Travels', customer: 'Ahmad Hassan', amount: 12500, method: 'Bank Transfer', status: 'Verified', commission: 625, paidAt: '10 Nov 2026' },
    { id: 'PAY-20261102', invoiceId: 'INV-2026-0146', agency: 'Al-Barakah Travel', customer: 'Siti Aminah', amount: 8900, method: 'FPX', status: 'Pending', commission: 445, paidAt: '10 Nov 2026' },
    { id: 'PAY-20261103', invoiceId: 'INV-2026-0147', agency: 'Safir Travel', customer: 'Zahid Kamal', amount: 24000, method: 'Bank Transfer', status: 'Verified', commission: 1200, paidAt: '09 Nov 2026' },
    { id: 'PAY-20261104', invoiceId: 'INV-2026-0148', agency: 'Makkah Tours', customer: 'Nur Aisyah', amount: 6200, method: 'E-wallet', status: 'Processing', commission: 310, paidAt: '09 Nov 2026' },
    { id: 'PAY-20261105', invoiceId: 'INV-2026-0149', agency: 'Global Travel', customer: 'Irfan Mohd', amount: 15800, method: 'Cash', status: 'Rejected', commission: 0, paidAt: '08 Nov 2026' },
  ];

  const paymentColumns = [
    {
      header: 'Payment / Invoice',
      accessor: (row: typeof recentPayments[0]) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.id}</span>
          <span className="text-caption text-muted">{row.invoiceId}</span>
        </div>
      )
    },
    {
      header: 'Agency & Customer',
      accessor: (row: typeof recentPayments[0]) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.agency}</span>
          <span className="text-caption text-muted">{row.customer}</span>
        </div>
      )
    },
    {
      header: 'Amount',
      accessor: (row: typeof recentPayments[0]) => (
        <span className="text-body-bold">RM {row.amount.toLocaleString()}</span>
      ),
      align: 'right' as const
    },
    {
      header: 'Method',
      accessor: (row: typeof recentPayments[0]) => <span className="text-body">{row.method}</span>
    },
    {
      header: 'Status',
      accessor: (row: typeof recentPayments[0]) => {
        const v: Record<string, 'success' | 'warning' | 'danger' | 'neutral' | 'primary'> = { Verified: 'success', Pending: 'warning', Processing: 'primary', Rejected: 'danger', Refunded: 'neutral' };
        return <Badge variant={v[row.status] || 'neutral'}>{row.status}</Badge>;
      }
    },
    {
      header: 'Commission',
      accessor: (row: typeof recentPayments[0]) => (
        <span className="text-body" style={{ color: row.commission > 0 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
          {row.commission > 0 ? `RM ${row.commission.toLocaleString()}` : '-'}
        </span>
      ),
      align: 'right' as const
    },
    {
      header: 'Paid At',
      accessor: (row: typeof recentPayments[0]) => <span className="text-caption text-muted">{row.paidAt}</span>
    },
    {
      header: 'Action',
      accessor: (row: typeof recentPayments[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('billing-list') },
            { id: 'verify', label: 'Verify Payment', onClick: () => console.log('Verify', row.id) },
            { id: 'receipt', label: 'Download Receipt', icon: <Download size={16} />, onClick: () => console.log('Receipt', row.id) },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(recentPayments);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <Skeleton style={{ width: '300px', height: '40px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <Skeleton key={i} style={{ height: '100px' }} />)}
        </div>
        <Skeleton style={{ height: '300px' }} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Finance Overview"
        breadcrumbs={[{ label: 'Finance Management' }, { label: 'Overview' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export Summary</Button>
          </div>
        }
      />

      {/* PRD Section 8: Summary Cards — 8 cards as defined in IA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Revenue" value="RM 2.45M" icon={<TrendingUp size={18} className="text-success" />} iconBg="var(--color-success-light)" trend="up" trendValue="+12.5% vs last month" />
        <MetricCard title="Collected" value="RM 1.82M" icon={<CheckCircle size={18} className="text-primary" />} iconBg="var(--color-primary-light)" trend="up" trendValue="74.3% collection rate" />
        <MetricCard title="Outstanding" value="RM 480K" icon={<Clock size={18} className="text-warning" />} iconBg="var(--color-warning-light)" trend="down" trendValue="38 open invoices" />
        <MetricCard title="Overdue" value="RM 128K" icon={<AlertTriangle size={18} className="text-danger" />} iconBg="var(--color-danger-light)" trend="down" trendValue="12 overdue invoices" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <MetricCard title="Platform Commission" value="RM 185K" icon={<Percent size={18} style={{ color: 'var(--color-primary-dark)' }} />} iconBg="var(--color-primary-light)" trend="up" trendValue="RM 42K earned this month" />
        <MetricCard title="Pending Refunds" value="7" icon={<RotateCcw size={18} className="text-warning" />} iconBg="var(--color-warning-light)" trend="neutral" trendValue="RM 18.5K total amount" />
        <MetricCard title="Pending Allowances" value="5" icon={<Wallet size={18} className="text-warning" />} iconBg="var(--color-warning-light)" trend="neutral" trendValue="RM 12.8K requested" />
        <MetricCard title="Payout Ready" value="14" icon={<ArrowUpRight size={18} className="text-success" />} iconBg="var(--color-success-light)" trend="up" trendValue="RM 67K ready for processing" />
      </div>

      {/* Recent Payments Table - PRD Section 9 */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-section-title">Recent Payments</h2>
          <Button variant="ghost" size="sm" rightIcon={<Eye size={14} />} onClick={() => navigate('billing-list')}>View All Payments</Button>
        </div>
        <DataTable 
          data={recentPayments}
          columns={paymentColumns}
          keyExtractor={(r) => r.id}
          isLoading={false}
          emptyStateTitle="No recent payments"
        />
      </section>
    </div>
  );
};
