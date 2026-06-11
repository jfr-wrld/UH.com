import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { FileText, CreditCard, DollarSign, RefreshCcw, Download, Link, Plus, Eye, ChevronRight } from 'lucide-react';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { useDataFilter } from '../../hooks/useDataFilter';

export const InvoiceDetails: React.FC<{ navigate: (route: string, data?: any) => void, invoiceId?: string }> = ({ navigate, invoiceId = 'inv_1' }) => {
  const [status, setStatus] = useState('Pending');
  const [activeTab, setActiveTab] = useState('preview');

  // Mock Data
  const invoice = {
    id: invoiceId,
    invoiceNumber: 'INV-2026-001',
    agency: 'Zamzam Travels',
    customer: 'Ahmad Hassan',
    bookingRef: 'BKG-2026-001',
    issueDate: '12 Oct 2026',
    dueDate: '20 Oct 2026',
    status: status,
    subtotal: 48000,
    discount: 0,
    tax: 0,
    total: 48000,
    paid: 10000,
    balance: 38000,
    items: [
      { desc: 'Premium Umrah Safar (Adult)', qty: 4, unitPrice: 12000, total: 48000 }
    ]
  };

  const tabs = [
    { id: 'preview', label: 'Invoice Preview', icon: <Eye size={16} /> },
    { id: 'payments', label: 'Payment Records' },
    { id: 'commission', label: 'Platform Commission' },
    { id: 'refunds', label: 'Refund Requests', icon: <RefreshCcw size={16} /> }
  ];
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(tabs);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <h1 className="text-page-title">{invoice.invoiceNumber}</h1>
              <StatusTransitionMenu currentStatus={status} onTransition={setStatus} allowedTransitions={['Draft', 'Active', 'Archived', 'Pending', 'Confirmed', 'Completed', 'Cancelled', 'Scheduled', 'Upcoming', 'Under Review', 'Published']} />
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', color: 'var(--text-muted)' }}>
              <span className="text-body-bold">{invoice.customer}</span>
              <span>•</span>
              <span className="text-body">{invoice.agency}</span>
              <span>•</span>
              <span className="text-body">Ref: {invoice.bookingRef}</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="secondary" leftIcon={<Link size={16} />}>Copy Payment Link</Button>
          <Button variant="secondary" leftIcon={<Download size={16} />}>Download PDF</Button>
          <Button>Record Payment</Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)', minHeight: '500px' }}>
        
        {activeTab === 'preview' && (
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-8)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)' }}>
              <div>
                <h2 className="text-h2" style={{ color: 'var(--color-primary-dark)' }}>INVOICE</h2>
                <div style={{ marginTop: 'var(--space-4)', color: 'var(--text-muted)' }}>
                  <p className="text-body-bold">{invoice.agency}</p>
                  <p className="text-body">Kuala Lumpur, Malaysia</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="text-body text-muted">Invoice No: <span className="text-body-bold text-default">{invoice.invoiceNumber}</span></p>
                <p className="text-body text-muted">Issue Date: <span className="text-body-bold text-default">{invoice.issueDate}</span></p>
                <p className="text-body text-muted">Due Date: <span className="text-body-bold text-default">{invoice.dueDate}</span></p>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h3 className="text-subsection-title text-muted" style={{ marginBottom: 'var(--space-2)' }}>Bill To:</h3>
              <p className="text-body-bold">{invoice.customer}</p>
              <p className="text-body text-muted">ahmad.h@example.com</p>
              <p className="text-body text-muted">Booking Ref: {invoice.bookingRef}</p>
            </div>

            <div className="data-table-container" style={{ marginBottom: 'var(--space-8)' }}>
              <table className="data-table text-body">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th style={{ textAlign: 'right' }}>Qty</th>
                    <th style={{ textAlign: 'right' }}>Unit Price</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-body-bold">{item.desc}</td>
                      <td style={{ textAlign: 'right' }}>{item.qty}</td>
                      <td style={{ textAlign: 'right' }}>RM {item.unitPrice.toLocaleString()}</td>
                      <td style={{ textAlign: 'right' }} className="text-body-bold">RM {item.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0' }}>
                  <span className="text-body text-muted">Subtotal</span>
                  <span className="text-body">RM {invoice.subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-default)' }}>
                  <span className="text-body text-muted">Tax</span>
                  <span className="text-body">RM {invoice.tax.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3) 0' }}>
                  <span className="text-body-bold" style={{ fontSize: '18px' }}>Total</span>
                  <span className="text-body-bold" style={{ fontSize: '18px' }}>RM {invoice.total.toLocaleString()}</span>
                </div>
                
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 'var(--space-2)' }}>
                    <span className="text-body text-success">Paid Amount</span>
                    <span className="text-body-bold text-success">RM {invoice.paid.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-default)' }}>
                    <span className="text-body-bold text-danger">Balance Due</span>
                    <span className="text-body-bold text-danger">RM {invoice.balance.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'payments' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <CreditCard className="text-primary" size={20} />
                <h3 className="text-subsection-title">Payment Ledger</h3>
              </div>
              <Button size="sm" leftIcon={<Plus size={16} />}>Record Manual Payment</Button>
            </div>
            
            <div className="data-table-container">
              <table className="data-table text-body">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Payment Reference</th>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>14 Oct 2026</td>
                    <td><span className="text-body-bold">TRX-998822</span><br/><span className="text-caption text-muted">Maybank Transfer</span></td>
                    <td>Manual Bank Transfer</td>
                    <td><span className="text-body-bold">RM 10,000</span></td>
                    <td><Badge variant="success">Verified</Badge></td>
                    <td style={{ textAlign: 'right' }}><Button variant="ghost" size="sm" leftIcon={<FileText size={14} />}>RCP-001</Button></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: '14 Oct 2026 10:30 AM', actor: 'Finance Admin', action: 'Payment Verified', module: 'Billing', details: 'Manual bank transfer TRX-998822 verified. Balance updated.' }
              ]}
            />
          </div>
        )}

        {activeTab === 'commission' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <DollarSign className="text-primary" size={20} />
              <h3 className="text-subsection-title">Platform Commission Breakdown</h3>
            </div>
            <p className="text-body text-muted">This tab is hidden from Travel Agencies and Customers. It breaks down the UmrahHaji.com revenue generated from this invoice's payments.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                <h4 className="text-body-bold" style={{ marginBottom: 'var(--space-4)' }}>Commission Rules Snapshot</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-body text-muted">Rule Applied</span>
                  <span className="text-body-bold">Premium Tier (Fixed + %)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-body text-muted">Platform Fee</span>
                  <span className="text-body">RM 50 per Pax</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body text-muted">Commission Rate</span>
                  <span className="text-body">2% of Gross Payment</span>
                </div>
              </div>

              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
                <h4 className="text-body-bold" style={{ color: 'var(--color-primary-dark)', marginBottom: 'var(--space-4)' }}>Earned Commission (from Verified Payments)</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-body text-muted">From Pax Fee (4 Pax)</span>
                  <span className="text-body">RM 200</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-body text-muted">From 2% Rate (on RM 10,000 paid)</span>
                  <span className="text-body">RM 200</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                  <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>Total Earned</span>
                  <span className="text-h3" style={{ color: 'var(--color-primary-dark)' }}>RM 400</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'refunds' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <RefreshCcw className="text-primary" size={20} />
              <h3 className="text-subsection-title">Refund Requests</h3>
            </div>
            <p className="text-body text-muted">Manage refunds against payments received. Refunds will adjust the platform commission and the invoice balance.</p>
            
            <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px dashed var(--border-default)' }}>
              <p className="text-body-bold" style={{ marginBottom: 'var(--space-2)' }}>No active refund requests.</p>
              <Button variant="secondary" size="sm">Create Refund Request</Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
