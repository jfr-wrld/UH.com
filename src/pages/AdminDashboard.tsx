import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { MetricCard } from '../components/data-display/MetricCard';
import { AlertBanner } from '../components/feedback/AlertBanner';
import { DataTable } from '../components/data-display/DataTable';
import { Badge } from '../components/data-display/Badge';
import { QuickActionPanel } from '../components/actions/QuickActionPanel';
import { Timeline } from '../components/data-display/Timeline';
import { Skeleton } from '../components/data-display/Skeleton';
import { Button } from '../components/actions/Button';
import { 
  Building, Users, Package, Wallet, FileText, CreditCard, UserCheck, AlertTriangle, Briefcase, FileSignature, Map, ClipboardCheck, MessageSquareWarning, ArrowRight, TrendingUp, ChevronLeft, ChevronRight, CircleDot
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDataFilter } from '../hooks/useDataFilter';

const bookingTrendsData: Record<string, any[]> = {
  '1W': [
    { name: 'Mon', bookings: 45 }, { name: 'Tue', bookings: 52 }, { name: 'Wed', bookings: 38 },
    { name: 'Thu', bookings: 65 }, { name: 'Fri', bookings: 80 }, { name: 'Sat', bookings: 120 }, { name: 'Sun', bookings: 95 }
  ],
  '1M': [
    { name: 'Week 1', bookings: 210 }, { name: 'Week 2', bookings: 340 },
    { name: 'Week 3', bookings: 420 }, { name: 'Week 4', bookings: 480 }
  ],
  '6M': [
    { name: 'Jan', bookings: 420 }, { name: 'Feb', bookings: 530 }, { name: 'Mar', bookings: 850 },
    { name: 'Apr', bookings: 750 }, { name: 'May', bookings: 1200 }, { name: 'Jun', bookings: 1450 }
  ],
  '1Y': [
    { name: 'Q1', bookings: 1800 }, { name: 'Q2', bookings: 3400 },
    { name: 'Q3', bookings: 2100 }, { name: 'Q4', bookings: 4200 }
  ]
};

export const AdminDashboard: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'1W' | '1M' | '6M' | '1Y'>('6M');
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [realtimeData, setRealtimeData] = useState({ jamaah: 12450, revenue: 4200000, revenueStr: '4.20M' });
  
  // Mock permission
  const userPermissions = ['finance.view', 'agency.manage', 'package.create', 'trip.create', 'report.view'];
  const hasFinanceAccess = userPermissions.includes('finance.view');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAlertIndex(prev => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => {
        // Randomly add 0-2 jamaah
        const addedJamaah = Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0;
        const newJamaah = prev.jamaah + addedJamaah;
        
        // If jamaah was added, also add some revenue (avg 5000 per jamaah)
        const addedRevenue = addedJamaah > 0 ? (addedJamaah * 5000) + Math.floor(Math.random() * 1000) : 0;
        const newRevenue = prev.revenue + addedRevenue;
        
        return {
          jamaah: newJamaah,
          revenue: newRevenue,
          revenueStr: (newRevenue / 1000000).toFixed(2) + 'M'
        };
      });
    }, 3000); // Tick every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    { id: 'qa-agency-app', label: 'Review Applications', icon: <FileSignature size={16} />, onClick: () => navigate('ta-applications'), permissionRequired: 'agency.manage' },
    { id: 'qa-agency', label: 'Add Travel Agency', icon: <Building size={16} />, onClick: () => navigate('ta-add'), permissionRequired: 'agency.manage' },
    { id: 'qa-jamaah', label: 'Add Jamaah', icon: <Users size={16} />, onClick: () => navigate('jamaah-add') },
    { id: 'qa-package', label: 'Create Package', icon: <Package size={16} />, onClick: () => navigate('pkg-create'), permissionRequired: 'package.create' },
    { id: 'qa-trip', label: 'Create Group Trip', icon: <Map size={16} />, onClick: () => navigate('trp-create'), permissionRequired: 'trip.create' },
    { id: 'qa-invoice', label: 'Create Invoice', icon: <FileText size={16} />, onClick: () => navigate('fin-invoice-create'), permissionRequired: 'finance.manage' },
  ];

  // Mock Data
  const pendingApprovalsData = [
    { id: 'APP-2026-001', type: 'Travel Agency App', target: 'Zamzam Travels', status: 'Pending Verification', date: '2 hours ago', action: () => navigate('ta-review') },
    { id: 'DOC-551', type: 'Jamaah Document', target: 'Passport: Ahmad Ali', status: 'Pending Verification', date: '5 hours ago', action: () => console.log('Review Doc') },
    { id: 'PAY-9092', type: 'Payment Proof', target: 'Invoice INV-1002', status: 'Pending Verification', date: '1 day ago', action: () => console.log('Review Payment') },
  ];

  const departuresData = [
    { id: 'TRP-1001', name: 'Umrah Premium Dec', agency: 'Al-Barakah Travel', date: '2026-12-10', readiness: 'Ready' },
    { id: 'TRP-1002', name: 'Hajj Plus 2027', agency: 'Makkah Tours', date: '2026-06-20', readiness: 'Critical' },
    { id: 'TRP-1003', name: 'Umrah Reguler Nov', agency: 'Safir Travel', date: '2026-11-20', readiness: 'Attention Needed' },
  ];

  const operationalAlerts = [
    { id: 'oa-1', variant: 'danger' as const, title: 'Departure Readiness', message: '3 trips departing within 14 days with missing items.', actionLabel: 'View Trips' },
    { id: 'oa-2', variant: 'warning' as const, title: 'Payment Verification', message: '8 payment proofs pending verification.', actionLabel: 'Verify Payments' },
    { id: 'oa-3', variant: 'warning' as const, title: 'Agency Applications', message: '5 agency applications waiting review.', actionLabel: 'Review Apps' },
    { id: 'oa-4', variant: 'danger' as const, title: 'Urgent Reports', message: '4 urgent support reports remain unresolved past SLA.', actionLabel: 'View Reports' }
  ];

  const approvalColumns = [
    { header: 'Type', accessor: 'type' as const },
    { header: 'Target', accessor: 'target' as const },
    { header: 'Submitted', accessor: 'date' as const },
    { header: 'Status', accessor: (row: typeof pendingApprovalsData[0]) => <Badge variant="warning">{row.status}</Badge> },
    { header: 'Action', accessor: (row: typeof pendingApprovalsData[0]) => <Button variant="secondary" size="sm" onClick={row.action}>Review</Button>, align: 'right' as const }
  ];

  const departureColumns = [
    { header: 'Trip Code', accessor: 'id' as const },
    { header: 'Trip Name', accessor: 'name' as const },
    { header: 'Agency', accessor: 'agency' as const },
    { header: 'Departure', accessor: 'date' as const },
    { 
      header: 'Readiness', 
      accessor: (row: typeof departuresData[0]) => (
        <Badge variant={row.readiness === 'Ready' ? 'success' : row.readiness === 'Critical' ? 'danger' : 'warning'}>
          {row.readiness}
        </Badge>
      )
    },
    { header: 'Action', accessor: () => <Button variant="ghost" size="sm">View</Button>, align: 'right' as const }
  ];

  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(userPermissions);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <Skeleton style={{ width: '300px', height: '40px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Skeleton style={{ height: '80px' }} />
          <Skeleton style={{ height: '80px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
          {[1, 2, 3, 4].map(i => <Skeleton key={i} style={{ height: '120px' }} />)}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      {/* 1. Header */}
      <PageHeader 
        title="Admin Dashboard" 
        subtitle="Overview of platform activity, payments, agencies, and bookings."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <span className="text-body text-muted">Today, 10 Jun 2026</span>
            <Badge variant="success">System Operational</Badge>
          </div>
        }
      />

      {/* 2. Operational Alerts (Slider) */}
      <section style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={{ flex: 1 }}>
          <AlertBanner 
            variant={operationalAlerts[activeAlertIndex].variant} 
            title={operationalAlerts[activeAlertIndex].title} 
            message={operationalAlerts[activeAlertIndex].message}
            action={
              <Button variant="secondary" size="sm" onClick={() => console.log(operationalAlerts[activeAlertIndex].actionLabel)}>
                {operationalAlerts[activeAlertIndex].actionLabel}
              </Button>
            }
          />
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button 
            onClick={() => setActiveAlertIndex(prev => prev === 0 ? operationalAlerts.length - 1 : prev - 1)}
            style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--gray-200)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-neutral)' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => setActiveAlertIndex(prev => (prev + 1) % operationalAlerts.length)}
            style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--gray-200)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-neutral)' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* 3. TOP ROW: KPI Summary Cards */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
          <MetricCard title="Total Jamaah" value={realtimeData.jamaah.toLocaleString()} trend="up" trendValue="14%" trendLabel="vs last month" icon={<Users size={20} color="var(--color-primary)" />} iconBg="var(--color-primary-light)" />
          <MetricCard title="Active Agencies" value="45" trend="up" trendValue="2" trendLabel="new this month" icon={<Building size={20} color="var(--color-primary)" />} iconBg="var(--color-primary-light)" />
          <MetricCard title="Active Packages" value="128" trendLabel="across all agencies" icon={<Package size={20} className="text-primary" />} iconBg="var(--color-primary-light)" />
          <MetricCard title="Total Revenue (YTD)" value={`RM${realtimeData.revenueStr}`} trend="up" trendValue="18%" trendLabel="vs last year" icon={<Wallet size={20} color="#059669" />} iconBg="var(--surface-success)" />
          <MetricCard title="Pending Applications" value="12" trend="neutral" trendValue="12" trendLabel="awaiting review" icon={<FileSignature size={20} color="#D97706" />} iconBg="var(--surface-warning)" accentColor="#F59E0B" />
          <MetricCard title="Total Mutawwif" value="230" trend="up" trendValue="5%" trendLabel="vs last month" icon={<UserCheck size={20} color="var(--color-primary)" />} iconBg="var(--color-primary-light)" />
          <MetricCard title="Pending Payments" value="45" trend="down" trendValue="45" trendLabel="needs verification" icon={<CreditCard size={20} color="#DC2626" />} iconBg="var(--surface-danger)" accentColor="#EF4444" />
          <MetricCard title="Support Tickets" value="18" trend="neutral" trendValue="18" trendLabel="open tickets" icon={<MessageSquareWarning size={20} color="#D97706" />} iconBg="var(--surface-warning)" />
        </div>
      </section>

      {/* 4. MIDDLE ROW: Main Graph & Quick Actions */}
      <section style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        {/* Graph (2/3 width on large screens) */}
        <div style={{ flex: '2 1 600px', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--surface-base)', borderRadius: '16px', border: '1px solid var(--gray-200)', padding: 'var(--space-6)', boxShadow: '0 1px 2px rgba(16,24,40,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
            <div>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-1)' }}>Booking Trends</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-neutral)' }}>1,420</span>
                <span className="text-caption text-muted">bookings this month</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '2px' }}><TrendingUp size={14} /> 18%</span>
              </div>
            </div>
            <div style={{ display: 'flex', borderRadius: '8px', border: '1px solid var(--gray-200)', overflow: 'hidden' }}>
              {['1W', '1M', '6M', '1Y'].map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeFilter(tf as any)}
                  style={{
                    padding: '6px 14px',
                    border: 'none',
                    borderRight: '1px solid var(--gray-200)',
                    backgroundColor: timeFilter === tf ? 'var(--color-primary-light)' : 'var(--surface-base)',
                    color: timeFilter === tf ? 'var(--color-primary-dark)' : 'var(--gray-500)',
                    fontSize: '13px',
                    fontWeight: timeFilter === tf ? 600 : 400,
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ flex: 1, minHeight: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingTrendsData[timeFilter]} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--gray-100)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--gray-500)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--gray-500)' }} />
                <Tooltip 
                  cursor={{ stroke: 'var(--gray-300)', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ backgroundColor: 'var(--surface-base)', borderRadius: '8px', border: '1px solid var(--gray-200)', boxShadow: '0 4px 6px -1px rgba(16, 24, 40, 0.05), 0 12px 16px -4px rgba(16, 24, 40, 0.1)', padding: '12px' }}
                  itemStyle={{ color: 'var(--color-text-neutral)', fontWeight: 600, fontSize: '14px' }}
                  labelStyle={{ color: 'var(--gray-500)', fontSize: '12px', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="bookings" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorBookings)" activeDot={{ r: 6, strokeWidth: 2, stroke: 'var(--surface-base)', fill: 'var(--color-primary)' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions + Pending Tasks (1/3 width) */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Quick Actions - Compact List */}
          <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: '16px', border: '1px solid var(--gray-200)', padding: 'var(--space-6)', boxShadow: '0 1px 2px rgba(16,24,40,0.05)' }}>
            <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {[
                { icon: <FileSignature size={18} />, label: 'Review Applications', desc: '12 pending agency applications', onClick: () => navigate('ta-applications') },
                { icon: <Building size={18} />, label: 'Add Travel Agency', desc: 'Create and verify a new agency', onClick: () => navigate('ta-add') },
                { icon: <Package size={18} />, label: 'Create Package', desc: 'Set itinerary, hotel, and flight', onClick: () => navigate('pkg-create') },
              ].map((a, i) => (
                <button key={i} onClick={a.onClick} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', borderRadius: '10px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease' }}
                  onMouseOver={e => { e.currentTarget.style.backgroundColor = 'var(--gray-50)'; }}
                  onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{a.icon}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-neutral)' }}>{a.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{a.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: '16px', border: '1px solid var(--gray-200)', padding: 'var(--space-6)', boxShadow: '0 1px 2px rgba(16,24,40,0.05)' }}>
            <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Pending Tasks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                { label: '8 payments need verification', color: '#EF4444' },
                { label: '12 agency applications pending', color: '#F59E0B' },
                { label: '18 support tickets open', color: '#F59E0B' },
                { label: '3 refund requests waiting', color: '#EF4444' },
                { label: '5 document verifications pending', color: 'var(--color-primary)' },
              ].map((task, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2) 0' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: task.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: 'var(--color-text-neutral)' }}>{task.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM ROW: Actionable Data Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: 'var(--space-6)' }}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', backgroundColor: 'var(--surface-base)', borderRadius: '16px', border: '1px solid var(--gray-200)', padding: 'var(--space-6)', boxShadow: '0 1px 2px rgba(16,24,40,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="text-section-title">Pending Approvals</h2>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={16} />}>View All</Button>
          </div>
          <DataTable data={pendingApprovalsData} columns={approvalColumns} />
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', backgroundColor: 'var(--surface-base)', borderRadius: '16px', border: '1px solid var(--gray-200)', padding: 'var(--space-6)', boxShadow: '0 1px 2px rgba(16,24,40,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="text-section-title">Upcoming Departures</h2>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={16} />}>View All</Button>
          </div>
          <DataTable data={departuresData} columns={departureColumns} />
        </section>
      </div>

    </div>
  );
};
