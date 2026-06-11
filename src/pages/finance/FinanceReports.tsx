import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Button } from '../../components/actions/Button';
import { Select } from '../../components/inputs/Select';
import { Download, TrendingUp, DollarSign, Activity } from 'lucide-react';

export const FinanceReports: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Finance Reports & Analytics"
        breadcrumbs={[{ label: 'Finance' }, { label: 'Reports' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <Select 
              options={[{value: 'ytd', label: 'Year to Date'}, {value: 'q3', label: 'Q3 2026'}]} 
              value="ytd" 
              onChange={() => {}} 
            />
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export PDF</Button>
          </div>
        }
      />

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-6)' }}>
        <MetricCard title="Total Revenue (Invoiced)" value="RM 2.4M" trend="up" trendValue="+12% vs last month" icon={<TrendingUp size={24} className="text-primary" />} iconBg="var(--color-primary-light)" />
        <MetricCard title="Collected Revenue" value="RM 1.8M" trend="up" trendValue="+8% vs last month" icon={<DollarSign size={24} className="text-success" />} iconBg="var(--color-success-light)" />
        <MetricCard title="Outstanding Balance" value="RM 600K" trend="down" trendValue="-2% vs last month" icon={<Activity size={24} className="text-warning" />} iconBg="var(--color-warning-light)" />
        <MetricCard title="Platform Commission Earned" value="RM 85K" trend="up" trendValue="+15% vs last month" icon={<DollarSign size={24} className="text-primary-dark" />} iconBg="var(--color-primary-light)" />
      </div>

      {/* Charts / Data Blocks Simulation */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        
        {/* Main Chart Area */}
        <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-6)' }}>Revenue vs Collection Trend</h3>
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 var(--space-4)' }}>
            {/* Mock Bar Chart */}
            {[60, 80, 50, 90, 70, 100].map((h, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '250px' }}>
                  <div style={{ width: '30px', height: `${h}%`, backgroundColor: 'var(--color-primary-light)', borderRadius: '4px 4px 0 0' }} title="Invoiced" />
                  <div style={{ width: '30px', height: `${h * 0.75}%`, backgroundColor: 'var(--color-primary)', borderRadius: '4px 4px 0 0' }} title="Collected" />
                </div>
                <span className="text-caption text-muted">Month {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Info Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Collection Rate</h3>
            <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto', borderRadius: '50%', background: 'conic-gradient(var(--color-success) 75%, var(--surface-sunken) 0)' }}>
              <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', bottom: '20px', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="text-h2">75%</span>
              </div>
            </div>
          </div>

          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Top Revenue Packages</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-body">Premium Umrah Safar</span>
                <span className="text-body-bold">RM 1.2M</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-body">Standard Ramadhan</span>
                <span className="text-body-bold">RM 800K</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-body">Custom VIP Family</span>
                <span className="text-body-bold">RM 400K</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
