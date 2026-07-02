import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { HeroHeader } from '../../../components/layout/HeroHeader';
import { Tabs } from '../../../components/navigation/Tabs';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { DataTable } from '../../../components/data-display/DataTable';
import { FileText, Download, Share2, CreditCard, Activity, ArrowLeft } from 'lucide-react';
import { RecordPaymentModal } from '../../../components/finance/RecordPaymentModal';

export const TAInvoiceDetails: React.FC<{ navigate: (path: string, state?: any) => void; invoiceId?: string }> = ({ navigate, invoiceId }) => {
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('items');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (invoiceId) {
      fetchInvoice();
    }
  }, [invoiceId]);

  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/api/ta/finance/invoices/${invoiceId}`);
      if (res.ok) {
        setInvoice(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-muted">Loading invoice...</div>;
  if (!invoice) return <div className="p-8 text-center text-danger">Invoice not found.</div>;

  const tabs = [
    { id: 'items', label: 'Invoice Items' },
    { id: 'payments', label: 'Payment History' },
    { id: 'refunds', label: 'Refunds & Adjustments' },
    { id: 'logs', label: 'Activity Logs' }
  ];

  const getStatusBadgeVariant = (val: string) => {
    if (val === 'paid') return 'success';
    if (val === 'partial') return 'info';
    if (val === 'overdue') return 'danger';
    if (val === 'sent') return 'warning';
    return 'neutral';
  };

  const renderItemsTab = () => {
    const columns = [
      { accessor: (row: any) => row.description, header: 'Description' },
      { accessor: (row: any) => row.quantity, header: 'Qty' },
      { accessor: (row: any) => `RM ${row.unitAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, header: 'Unit Price' },
      { accessor: (row: any) => `RM ${row.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, header: 'Total' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
          <h3 className="text-subsection-title mb-4">Invoice Items</h3>
          <DataTable 
            columns={columns}
            data={invoice.InvoiceItems_Invoices_invoiceId || []}
            keyExtractor={(row) => row.id}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-6)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted text-body">Subtotal</span>
                <span className="text-body font-medium">RM {invoice.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted text-body">Total Amount</span>
                <span className="text-body-bold text-primary">RM {invoice.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted text-body">Paid Amount</span>
                <span className="text-body font-medium text-success">RM {invoice.paidAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)' }}>
                <span className="text-muted text-body-bold">Outstanding</span>
                <span className="text-body-bold text-danger">RM {invoice.outstandingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        <RecordPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          invoiceId={invoiceId || ''}
          defaultAmount={invoice.outstandingAmount}
          onSuccess={() => {
            fetchInvoice();
          }}
        />
      </div>
    );
  };

  const renderPaymentsTab = () => {
    const paymentColumns = [
      { accessor: (row: any) => row.paymentReference, header: 'Reference' },
      { accessor: (row: any) => `RM ${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, header: 'Amount' },
      { accessor: (row: any) => <span className="capitalize">{row.paymentMethod?.replace('_', ' ')}</span>, header: 'Method' },
      { accessor: (row: any) => row.paidAt ? new Date(row.paidAt).toLocaleDateString() : '-', header: 'Payment Date' },
      { accessor: (row: any) => <Badge variant={row.status === 'verified' ? 'success' : 'warning'} className="capitalize">{row.status}</Badge>, header: 'Status' }
    ];

    return (
      <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h3 className="text-subsection-title m-0">Payment History</h3>
          {invoice.status !== 'paid' && invoice.status !== 'void' && (
            <Button variant="primary" leftIcon={<CreditCard size={16} />} onClick={() => setIsPaymentModalOpen(true)}>Record Payment</Button>
          )}
        </div>
        <DataTable 
          columns={paymentColumns}
          data={invoice.Payments_Invoices_invoiceId || []}
          keyExtractor={(row) => row.id}
          emptyStateTitle="No payments yet"
          emptyStateDescription="Record a payment to update the outstanding balance."
        />
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <HeroHeader
        title={<span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Invoice {invoice.invoiceNumber}</span>}
        onBack={() => navigate('ta-finance-invoices')}
        backLabel="Back to Invoices"
        theme="simple"
        avatarUrl={`https://ui-avatars.com/api/?name=${encodeURIComponent(invoice.invoiceNumber)}&background=random&color=fff&size=80`}
        badges={[
          <Badge key="status" variant={getStatusBadgeVariant(invoice.status)} className="capitalize" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
            {invoice.status}
          </Badge>,
          <Badge key="type" variant="neutral" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
            {invoice.invoiceType.replace('_', ' ')}
          </Badge>
        ]}
        subtitle={
          <span style={{ opacity: 0.9 }}>
            Issued: {new Date(invoice.createdAt).toLocaleDateString()} • Due: {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}
          </span>
        }
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} leftIcon={<Download size={16} />}>Download PDF</Button>
            <Button variant="secondary" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} leftIcon={<Share2 size={16} />}>Send Link</Button>
          </div>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ marginTop: 'var(--space-2)' }}>
        {activeTab === 'items' && renderItemsTab()}
        {activeTab === 'payments' && renderPaymentsTab()}
        
        {['refunds', 'logs'].includes(activeTab) && (
          <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-8)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', textAlign: 'center' }}>
            <Activity size={40} style={{ color: 'var(--gray-300)', marginBottom: 'var(--space-3)' }} />
            <h3 className="text-subsection-title">{tabs.find(t => t.id === activeTab)?.label}</h3>
            <p className="text-body text-muted" style={{ marginTop: 'var(--space-2)' }}>This section contains {activeTab} data.</p>
          </div>
        )}
      </div>
    </div>
  );
};
