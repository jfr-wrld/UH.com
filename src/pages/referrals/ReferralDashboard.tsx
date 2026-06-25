import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';
import { 
  Users, UserCheck, Map, Wallet, CheckCircle, Clock, AlertTriangle, RefreshCcw
} from 'lucide-react';

export const ReferralDashboard: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const [metrics, setMetrics] = useState({
    totalEvents: 4250,
    convertedRegistrations: 1200,
    bookingsAttributed: 850,
    eligibleRewards: 600,
    pendingReview: 145,
    approvedAmount: 120000,
    releasedAmount: 450000,
    reversedAmount: 15000,
    totalCampaigns: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:3001/api/referrals/dashboard');
        if (res.ok) {
          const data = await res.json();
          setMetrics(prev => ({
            ...prev,
            totalEvents: data.totalReferrals,
            bookingsAttributed: data.bookingsAttributed,
            pendingReview: data.pendingReviews,
            totalCampaigns: data.totalCampaigns,
            releasedAmount: data.amountPaid,
            reversedAmount: data.amountReversed
          }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  // Mock pending review data
  const pendingReviews = [
    { id: 'REF-9921', program: 'Jamaah Refer Jamaah', referrer: 'Ahmad M.', role: 'jamaah', status: 'pending_review', estimatedReward: 'RM 100', date: '2 hours ago' },
    { id: 'REF-9922', program: 'Mutawwif Campaign 2026', referrer: 'Ustaz Ali', role: 'mutawwif', status: 'pending_review', estimatedReward: 'RM 500', date: '5 hours ago' },
    { id: 'REF-9923', program: 'Ramadan Special', referrer: 'Siti Nurhaliza', role: 'jamaah', status: 'under_review', estimatedReward: 'RM 150', date: '1 day ago' }
  ];

  const columns = [
    { header: 'Referral ID', accessor: 'id' as const },
    { header: 'Program', accessor: 'program' as const },
    { header: 'Referrer', accessor: (row: any) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: 500 }}>{row.referrer}</span>
        <span className="text-caption text-muted">{row.role}</span>
      </div>
    ) },
    { header: 'Reward', accessor: 'estimatedReward' as const },
    { header: 'Submitted', accessor: 'date' as const },
    { header: 'Status', accessor: (row: any) => (
      <Badge variant={row.status === 'under_review' ? 'danger' : 'warning'}>
        {row.status === 'under_review' ? 'Fraud Review' : 'Pending Review'}
      </Badge>
    ) },
    { header: 'Action', accessor: () => <Button variant="secondary" size="sm">Review</Button>, align: 'right' as const }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Referral & Reward Management" 
        subtitle="Manage referral programs, attribution, reward approvals, and finance handoffs."
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="outline" onClick={() => navigate('ref-finance')}>Finance Handoff</Button>
            <Button onClick={() => navigate('ref-programs')}>Manage Programs</Button>
          </div>
        }
      />

      {/* KPI Dashboard */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Referral Events" value={metrics.totalEvents.toLocaleString()} icon={<Users size={20} className="text-primary" />} iconBg="var(--color-primary-light)" />
        <MetricCard title="Converted Registrations" value={metrics.convertedRegistrations.toLocaleString()} icon={<UserCheck size={20} className="text-success" />} iconBg="var(--surface-success)" />
        <MetricCard title="Bookings Attributed" value={metrics.bookingsAttributed.toLocaleString()} icon={<Map size={20} className="text-primary" />} iconBg="var(--color-primary-light)" />
        <MetricCard title="Pending Review" value={metrics.pendingReview.toString()} icon={<Clock size={20} color="#D97706" />} iconBg="var(--surface-warning)" accentColor="#F59E0B" />
        
        <MetricCard title="Eligible Rewards" value={metrics.eligibleRewards.toString()} icon={<CheckCircle size={20} className="text-success" />} iconBg="var(--surface-success)" />
        <MetricCard title="Approved Amount (Unreleased)" value={`RM ${(metrics.approvedAmount).toLocaleString()}`} icon={<Wallet size={20} className="text-primary" />} iconBg="var(--color-primary-light)" />
        <MetricCard title="Released Amount" value={`RM ${(metrics.releasedAmount).toLocaleString()}`} icon={<Wallet size={20} className="text-success" />} iconBg="var(--surface-success)" />
        <MetricCard title="Reversed Amount" value={`RM ${(metrics.reversedAmount).toLocaleString()}`} icon={<RefreshCcw size={20} color="#DC2626" />} iconBg="var(--surface-danger)" />
      </section>

      {/* Main Content Area */}
      <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
        
        {/* Pending Reviews Table */}
        <div style={{ flex: '2', backgroundColor: 'var(--surface-base)', borderRadius: '16px', border: '1px solid var(--gray-200)', padding: 'var(--space-6)', boxShadow: '0 1px 2px rgba(16,24,40,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h2 className="text-section-title">Review Queue</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('ref-attributions')}>View All Attributions</Button>
          </div>
          <DataTable data={pendingReviews} columns={columns} />
        </div>

        {/* Quick Actions & Alerts */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: '16px', border: '1px solid var(--gray-200)', padding: 'var(--space-6)', boxShadow: '0 1px 2px rgba(16,24,40,0.05)' }}>
            <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Pending Operations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Badge variant={getStatusBadgeVariant("45")}>45</Badge>
                <span className="text-body text-neutral">Rewards waiting for approval</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Badge variant={getStatusBadgeVariant("12")}>12</Badge>
                <span className="text-body text-neutral">Fraud review holds</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Badge variant={getStatusBadgeVariant("18")}>18</Badge>
                <span className="text-body text-neutral">Approved ready for finance handoff</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
