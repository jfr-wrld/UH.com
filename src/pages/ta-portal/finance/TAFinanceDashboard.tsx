import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { MetricCard } from '../../../components/data-display/MetricCard';
import { DataTable } from '../../../components/data-display/DataTable';
import { Button } from '../../../components/actions/Button';
import { Badge } from '../../../components/data-display/Badge';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, RefreshCw, Download, Plus, FileText, Settings } from 'lucide-react';

export const TAFinanceDashboard: React.FC<{ navigate: (path: string, state?: any) => void }> = ({ navigate }) => {
  const [summary, setSummary] = useState<any>({
    revenue: 0,
    invoiced: 0,
    collected: 0,
    outstanding: 0,
    overdue: 0
  });
  const [invoices, setInvoices] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [summaryRes, invoicesRes, paymentsRes] = await Promise.all([
        fetch('http://localhost:3001/api/ta/finance/summary'),
        fetch('http://localhost:3001/api/ta/finance/invoices'),
        fetch('http://localhost:3001/api/ta/finance/payments')
      ]);
      
      setSummary(await summaryRes.json());
      const allInvoices = await invoicesRes.json();
      const allPayments = await paymentsRes.json();
      
      setInvoices(allInvoices.slice(0, 5)); // Recent 5
      setPayments(allPayments.slice(0, 5)); // Recent 5
    } catch (err) {
      console.error('Error fetching finance data:', err);
    } finally {
      setLoading(false);
    }
  };

  const invoiceColumns = [
    { accessor: (row: any) => row.invoiceNumber, header: 'Invoice #', sortable: true },
    { accessor: (row: any) => row.customerName, header: 'Customer', sortable: true },
    { 
      accessor: (row: any) => `RM ${row.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 
      header: 'Total'
    },
    { 
      accessor: (row: any) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' | 'info' = 'neutral';
        if (row.status === 'paid') variant = 'success';
        if (row.status === 'partial') variant = 'info';
        if (row.status === 'overdue') variant = 'danger';
        if (row.status === 'sent') variant = 'warning';
        return <Badge variant={variant} className="capitalize">{row.status}</Badge>;
      },
      header: 'Status'
    }
  ];

  const paymentColumns = [
    { accessor: (row: any) => row.paymentReference, header: 'Reference' },
    { 
      accessor: (row: any) => row.invoice?.invoiceNumber || '-', 
      header: 'Invoice'
    },
    { 
      accessor: (row: any) => `RM ${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 
      header: 'Amount'
    },
    { 
      accessor: (row: any) => <span className="capitalize">{row.paymentMethod?.replace('_', ' ')}</span>, 
      header: 'Method'
    },
    { 
      accessor: (row: any) => (
        <Badge variant={row.status === 'verified' ? 'success' : 'warning'} className="capitalize">
          {row.status}
        </Badge>
      ),
      header: 'Status'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Finance Dashboard" 
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<RefreshCw size={16} />}>Sync</Button>
            <Button variant="secondary" leftIcon={<FileText size={16} />} onClick={() => navigate('ta-finance-settlements')}>Settlements</Button>
            <Button variant="secondary" leftIcon={<Settings size={16} />} onClick={() => navigate('ta-finance-settings')}>Settings</Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('ta-finance-invoice-create')}>Create Invoice</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-6)' }}>
        <MetricCard 
          title="Total Revenue" 
          value={`RM ${summary.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          trend="up"
          trendValue="+12.5%"
          icon={<DollarSign size={20} />}
        />
        <MetricCard 
          title="Outstanding Balance" 
          value={`RM ${summary.outstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          icon={<TrendingDown size={20} className="text-warning" />}
        />
        <MetricCard 
          title="Overdue Invoices" 
          value={`RM ${summary.overdue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          icon={<AlertCircle size={20} className="text-danger" />}
        />
        <MetricCard 
          title="Settlement Ready" 
          value={`RM ${(summary.revenue - 1000).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          trend="up"
          trendValue="+5.2%"
          icon={<TrendingUp size={20} />}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 className="text-subsection-title" style={{ margin: 0 }}>Recent Invoices</h3>
              <p className="text-caption text-muted" style={{ margin: 0 }}>Latest invoices generated.</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => navigate('ta-finance-invoices')}>View All</Button>
          </div>
          <DataTable 
            data={invoices}
            columns={invoiceColumns}
            keyExtractor={(row) => row.id}
            isLoading={loading}
            onRowClick={(row) => navigate('ta-finance-invoice-details', { id: row.id })}
          />
        </div>

        <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 className="text-subsection-title" style={{ margin: 0 }}>Recent Payments</h3>
              <p className="text-caption text-muted" style={{ margin: 0 }}>Latest payment records.</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => navigate('ta-finance-payments')}>View All</Button>
          </div>
          <DataTable 
            data={payments}
            columns={paymentColumns}
            keyExtractor={(row) => row.id}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};
