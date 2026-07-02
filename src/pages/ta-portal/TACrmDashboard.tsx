import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { DataTable } from '../../components/data-display/DataTable';
import { UserProfileCell } from '../../components/data-display/UserProfileCell';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { Timeline } from '../../components/data-display/Timeline';
import { 
  Users, Ticket, AlertTriangle, CheckCircle, 
  FileText, Briefcase, Plus, Package, Wallet, MessageSquare, Bell, Calendar 
} from 'lucide-react';

interface TACrmDashboardProps {
  navigate: (path: string, state?: any) => void;
}

// Dummy Data
const mockUpcomingDepartures = [
  { id: 't1', name: 'Umrah Reguler 9 Hari', package: 'UMR-REG-01', departure: '2026-07-10', jamaah: '45/45', mutawwif: 'Ustadz Ali', readiness: 'Ready' },
  { id: 't2', name: 'Umrah Plus Turki', package: 'UMR-TRK-02', departure: '2026-07-15', jamaah: '30/40', mutawwif: 'Pending', readiness: 'Critical' },
  { id: 't3', name: 'Haji Furoda 2026', package: 'HAJ-FUR-01', departure: '2026-08-01', jamaah: '15/20', mutawwif: 'Ustadz Usman', readiness: 'Attention Needed' },
];

const mockUrgentActions = [
  { id: 'u1', type: 'Payment Overdue', message: '3 invoices are overdue for Umrah Plus Turki.', priority: 'High', action: 'View Invoices' },
  { id: 'u2', type: 'Departure Soon', message: 'Umrah Plus Turki departs in 15 days. Mutawwif missing.', priority: 'Critical', action: 'Assign Mutawwif' },
  { id: 'u3', type: 'Document Pending', message: '12 passports pending for upcoming trips.', priority: 'Medium', action: 'Review Documents' },
];

const mockRecentActivities = [
  { id: 'a1', title: 'Document Verified', description: 'Passport for Ahmad Fauzi verified.', timestamp: '10 mins ago', variant: 'success' as const },
  { id: 'a2', title: 'Payment Received', description: 'Rp 35,000,000 received from Siti Aminah.', timestamp: '1 hour ago', variant: 'primary' as const },
  { id: 'a3', title: 'Trip Activated', description: 'Umrah Reguler 9 Hari has been activated.', timestamp: '2 hours ago', variant: 'success' as const },
  { id: 'a4', title: 'Support Ticket Raised', description: 'Budi Santoso reported payment issue.', timestamp: '3 hours ago', variant: 'warning' as const },
];

const mockAnnouncements = [
  { id: 'n1', title: 'New Visa Regulation 2026', sender: 'UmrahHaji Platform', date: '2026-06-29', type: 'Platform' },
  { id: 'n2', title: 'Pre-Departure Briefing Schedule', sender: 'Agency Admin', date: '2026-06-28', type: 'Agency' },
];

export const TACrmDashboard: React.FC<TACrmDashboardProps> = ({ navigate }) => {
  const getReadinessBadge = (status: string) => {
    switch (status) {
      case 'Ready': return <Badge variant="success">Ready</Badge>;
      case 'Attention Needed': return <Badge variant="warning">Attention Needed</Badge>;
      case 'Critical': return <Badge variant="danger">Critical</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical': return <Badge variant="danger">Critical</Badge>;
      case 'High': return <Badge variant="warning">High</Badge>;
      case 'Medium': return <Badge variant="info">Medium</Badge>;
      default: return <Badge variant="neutral">{priority}</Badge>;
    }
  };

  const departureColumns = [
    { header: 'Group Trip Name', accessor: 'name' as const },
    { header: 'Departure Date', accessor: 'departure' as const },
    { header: 'Jamaah', accessor: 'jamaah' as const },
    { 
      header: 'Mutawwif', 
      accessor: (row: any) => row.mutawwif && row.mutawwif !== 'Pending' ? (
        <UserProfileCell 
          name={row.mutawwif} 
          email={`${row.mutawwif.toLowerCase().replace(/[^a-z0-9]/g, '')}@alhijrah.com`} 
          isVerified={true} 
        />
      ) : (
        <span className="text-body text-muted">{row.mutawwif}</span>
      )
    },
    { header: 'Readiness', accessor: (row: any) => getReadinessBadge(row.readiness) },
    {
      header: 'Actions',
      accessor: (row: any) => (
        <Button variant="ghost" size="sm" onClick={() => {}}>View Trip</Button>
      ),
      align: 'right' as const
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '20px' }}>
      
      {/* 1. Header & Context */}
      <PageHeader 
        title="Agency Dashboard" 
        actions={
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="outline" leftIcon={<Calendar size={18} />}>Today + 30 Days</Button>
            <Button variant="primary" leftIcon={<Plus size={18} />}>Create Booking</Button>
          </div>
        }
      />

      {/* Welcome Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', margin: '0 0 4px 0' }}>Welcome back, Al-Hijrah Travel</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Here's what's happening with your agency today.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 500 }}>
            <CheckCircle size={14} />
            <span>Verified Agency</span>
          </div>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>Last updated: 10:45 AM</span>
        </div>
      </div>

      {/* 2. KPI Summary Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <MetricCard title="Active Packages" value="12" icon={<Package size={20} style={{color:'var(--color-primary)'}} />} iconBg="var(--color-primary-light)" />
        <MetricCard title="New Bookings" value="45" icon={<Ticket size={20} style={{color:'var(--color-primary)'}} />} iconBg="var(--color-primary-light)" trend="up" trendValue="+5 this week" />
        <MetricCard title="Upcoming Departures" value="3" icon={<Briefcase size={20} style={{color:'var(--color-info)'}} />} iconBg="var(--color-info-light)" />
        <MetricCard title="Total Jamaah" value="320" icon={<Users size={20} style={{color:'var(--color-info)'}} />} iconBg="var(--color-info-light)" />
        
        <MetricCard title="Pending Documents" value="38" icon={<FileText size={20} style={{color:'var(--color-warning)'}} />} iconBg="var(--color-warning-light)" trend="up" trendValue="Requires Action" />
        <MetricCard title="Outstanding Payments" value="Rp 125M" icon={<Wallet size={20} style={{color:'var(--color-danger)'}} />} iconBg="var(--color-danger-light)" trend="down" trendValue="-Rp 10M from yesterday" />
        <MetricCard title="Open Reports" value="4" icon={<MessageSquare size={20} style={{color:'var(--color-warning)'}} />} iconBg="var(--color-warning-light)" />
        <MetricCard title="Pending Tasks" value="9" icon={<AlertTriangle size={20} style={{color:'var(--color-danger)'}} />} iconBg="var(--color-danger-light)" />
      </div>

      {/* Main Layout: 2 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 3. Urgent Actions Panel */}
          <div style={{ backgroundColor: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <AlertTriangle style={{ color: '#dc2626' }} size={20} />
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#991b1b', margin: 0 }}>Urgent Actions Required</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mockUrgentActions.map(action => (
                <div key={action.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '8px', border: '1px solid #fee2e2', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{action.type}</span>
                    <span style={{ fontSize: '13px', color: '#4b5563' }}>{action.message}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {getPriorityBadge(action.priority)}
                    <Button variant="outline" size="sm">{action.action}</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Upcoming Departures */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: 0 }}>Upcoming Departures</h2>
              <Button variant="ghost" size="sm">View All Trips</Button>
            </div>
            <DataTable 
              data={mockUpcomingDepartures}
              columns={departureColumns}
              keyExtractor={(row) => row.id}
            />
          </div>

          {/* 5 & 6. Booking & Payment Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', margin: '0 0 16px 0' }}>Sales Pipeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '14px', color: '#4b5563' }}>Draft Packages</span><Badge variant="neutral">4</Badge></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '14px', color: '#4b5563' }}>Pending Bookings</span><Badge variant="warning">12</Badge></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '14px', color: '#4b5563' }}>Confirmed Bookings</span><Badge variant="success">85</Badge></div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Button variant="outline" size="sm" style={{ width: '100%' }}>Go to Bookings</Button>
              </div>
            </div>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', margin: '0 0 16px 0' }}>Payment Overview</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '14px', color: '#4b5563' }}>Total Invoiced</span><span style={{ fontSize: '14px', fontWeight: 600 }}>Rp 850M</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '14px', color: '#4b5563' }}>Collected</span><span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-success)' }}>Rp 725M</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '14px', color: '#4b5563' }}>Outstanding</span><span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-danger)' }}>Rp 125M</span></div>
                <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '999px', height: '8px', marginTop: '8px' }}>
                  <div style={{ backgroundColor: 'var(--color-success)', height: '8px', borderRadius: '999px', width: '85%' }}></div>
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280', textAlign: 'right' }}>85% Collection Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 7. Document Readiness */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', margin: '0 0 16px 0' }}>Document Readiness</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}><span style={{ color: '#374151' }}>Passports</span><span style={{ fontWeight: 600 }}>85%</span></div>
                <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '999px', height: '6px' }}><div style={{ backgroundColor: 'var(--color-primary)', height: '6px', borderRadius: '999px', width: '85%' }}></div></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}><span style={{ color: '#374151' }}>Visas</span><span style={{ fontWeight: 600, color: 'var(--color-warning)' }}>40%</span></div>
                <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '999px', height: '6px' }}><div style={{ backgroundColor: 'var(--color-warning)', height: '6px', borderRadius: '999px', width: '40%' }}></div></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}><span style={{ color: '#374151' }}>Flight Tickets</span><span style={{ fontWeight: 600, color: 'var(--color-danger)' }}>10%</span></div>
                <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '999px', height: '6px' }}><div style={{ backgroundColor: 'var(--color-danger)', height: '6px', borderRadius: '999px', width: '10%' }}></div></div>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Button variant="outline" size="sm" style={{ width: '100%' }}>Manage Documents</Button>
            </div>
          </div>

          {/* 9. Announcements */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Bell style={{ color: '#6b7280' }} size={18} />
              <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', margin: 0 }}>Announcements</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {mockAnnouncements.map(ann => (
                <div key={ann.id} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>{ann.date} • {ann.type}</span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#111827', lineHeight: '1.4' }}>{ann.title}</span>
                  <span style={{ fontSize: '12px', color: '#4b5563', marginTop: '4px' }}>From: {ann.sender}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 10. Recent Activities */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', margin: '0 0 16px 0' }}>Recent Activities</h2>
            <Timeline items={mockRecentActivities} />
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
              <Button variant="ghost" size="sm">View Audit Logs</Button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
