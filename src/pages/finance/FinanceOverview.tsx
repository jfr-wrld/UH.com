import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { ExportControl } from '../../components/domain/ExportControl';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Skeleton } from '../../components/data-display/Skeleton';
import { TrendingUp, CheckCircle, Clock, AlertTriangle, Percent, RotateCcw, Wallet, ArrowUpRight, Download, Eye, ChevronRight } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const FinanceOverview: React.FC<{ navigate: (route: string, data?: any) => void; showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [overviewMetrics, setOverviewMetrics] = useState({
    totalRevenue: 0,
    overdueAmount: 0,
    pendingVerifications: 0,
    earnedCommission: 0
  });
  const [recentPayments, setRecentPayments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [overviewRes, paymentsRes] = await Promise.all([
          fetch('http://localhost:3001/api/billing/overview'),
          fetch('http://localhost:3001/api/billing/payments')
        ]);
        
        if (overviewRes.ok) {
          setOverviewMetrics(await overviewRes.json());
        }
        if (paymentsRes.ok) {
          const payments = await paymentsRes.json();
          // Map to match table expectations
          setRecentPayments(payments.slice(0, 5).map((p: any) => ({
            id: p.id,
            invoiceId: p.invoice.invoiceNumber,
            agency: p.invoice.travelAgencyId || 'Direct Customer',
            customer: p.invoice.jamaahId || '-',
            amount: p.amount,
            method: p.paymentMethod,
            status: p.status,
            commission: p.amount * 0.05, // Approximation for UI display
            paidAt: new Date(p.createdAt).toLocaleDateString()
          })));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
        const v: Record<string, 'success' | 'warning' | 'danger' | 'neutral' | 'primary'> = { VERIFIED: 'success', PENDING: 'warning', PROCESSING: 'primary', FAILED: 'danger', REFUNDED: 'neutral', Verified: 'success', Pending: 'warning' };
        return <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge>;
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
            <ExportControl data={filteredData} filename="finance-overview" />
          </div>
        }
      />

      {/* PRD Section 8: Summary Cards — 8 cards as defined in IA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Revenue" value={`RM ${overviewMetrics.totalRevenue.toLocaleString()}`} icon={<TrendingUp size={18} className="text-success" />} iconBg="var(--color-success-light)" trend="up" trendValue="Total Paid Invoices" />
        <MetricCard title="Overdue" value={`RM ${overviewMetrics.overdueAmount.toLocaleString()}`} icon={<AlertTriangle size={18} className="text-danger" />} iconBg="var(--color-danger-light)" trend="down" trendValue="Unpaid Past Due" />
        <MetricCard title="Pending Verifications" value={overviewMetrics.pendingVerifications.toString()} icon={<Clock size={18} className="text-warning" />} iconBg="var(--color-warning-light)" trend="neutral" trendValue="Payments awaiting review" />
        <MetricCard title="Platform Commission" value={`RM ${overviewMetrics.earnedCommission.toLocaleString()}`} icon={<Percent size={18} style={{ color: 'var(--color-primary-dark)' }} />} iconBg="var(--color-primary-light)" trend="up" trendValue="Earned from payments" />
      </div>

      {/* Recent Payments Table - PRD Section 9 */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-section-title">Recent Payments</h2>
          <Button variant="ghost" size="sm" rightIcon={<Eye size={14} />} onClick={() => navigate('billing-list')}>View All Payments</Button>
        </div>
        <DataTable
        onRowClick={(row: any) => navigate('billing-list')} 
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
