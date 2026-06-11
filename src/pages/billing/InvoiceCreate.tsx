import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Plus, Link, Calendar, Check, Search, Calculator } from 'lucide-react';

export const InvoiceCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Create Invoice"
        breadcrumbs={[{ label: 'Finance' }, { label: 'Billing', onClick: () => navigate('billing-list') }, { label: 'Create Invoice' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success'); navigate('billing-list'); }}>Cancel</Button>
            <Button variant="secondary" onClick={() => navigate('billing-list')}>Save as Draft</Button>
            <Button onClick={() => navigate('billing-list')}>Issue Invoice</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 'var(--space-6)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* Section 1: Creation Source */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Creation Source</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', alignItems: 'end' }}>
              <FormField label="Generate From">
                <Select options={[{value: 'booking', label: 'Existing Booking'}, {value: 'manual', label: 'Manual Entry'}]} value="booking" onChange={() => {}} />
              </FormField>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <div style={{ flex: 1 }}>
                  <FormField label="Search Booking Reference">
                    <div style={{ position: 'relative' }}>
                      <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <Input placeholder="Enter BKG- ID..." style={{ paddingLeft: '36px' }} defaultValue="BKG-2026-001" />
                    </div>
                  </FormField>
                </div>
                <Button variant="secondary" leftIcon={<Link size={16} />}>Load Data</Button>
              </div>
            </div>
          </div>

          {/* Section 2: Bill To */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Bill To Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Customer / Jamaah Name" required><Input defaultValue="Ahmad Hassan" /></FormField>
              <FormField label="Email Address" required><Input defaultValue="ahmad.h@example.com" /></FormField>
              <FormField label="Phone Number"><Input defaultValue="+60123456789" /></FormField>
              <FormField label="Travel Agency context" required><Select options={[{value: 'zamzam', label: 'Zamzam Travels'}]} value="zamzam" onChange={() => {}} /></FormField>
              <div style={{ gridColumn: 'span 2' }}>
                <FormField label="Billing Address"><textarea className="text-body" style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: 'none', minHeight: '80px', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)' }} defaultValue="123 Jalan Ampang, Kuala Lumpur, 50450, Malaysia" /></FormField>
              </div>
            </div>
          </div>

          {/* Section 3: Line Items */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Invoice Items</h3>
            <div className="data-table-container">
              <table className="data-table text-body">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th style={{ width: '100px' }}>Type</th>
                    <th style={{ width: '80px', textAlign: 'right' }}>Qty</th>
                    <th style={{ width: '120px', textAlign: 'right' }}>Unit Price</th>
                    <th style={{ width: '120px', textAlign: 'right' }}>Total (RM)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Input defaultValue="Premium Umrah Safar (Adult)" /></td>
                    <td><Select options={[{value: 'pkg', label: 'Package'}]} value="pkg" onChange={() => {}} /></td>
                    <td><Input type="number" defaultValue="4" style={{ textAlign: 'right' }} /></td>
                    <td><Input type="number" defaultValue="12000" style={{ textAlign: 'right' }} /></td>
                    <td style={{ textAlign: 'right' }}><span className="text-body-bold">48,000</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button variant="ghost" leftIcon={<Plus size={16} />} style={{ marginTop: 'var(--space-3)' }}>Add Item</Button>
          </div>

          {/* Section 4: Terms & Notes */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Terms & Notes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
              <FormField label="Customer Notes">
                <textarea className="text-body" style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: 'none', minHeight: '80px', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)' }} placeholder="Notes visible on the invoice..." />
              </FormField>
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <Calendar size={16} className="text-muted" />
              <h3 className="text-subsection-title">Invoice Dates</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <FormField label="Issue Date"><Input type="date" defaultValue="2026-10-12" /></FormField>
              <FormField label="Payment Terms"><Select options={[{value: 'deposit', label: 'Deposit First'}, {value: 'due14', label: 'Net 14'}, {value: 'due30', label: 'Net 30'}]} value="deposit" onChange={() => {}} /></FormField>
              <FormField label="Due Date"><Input type="date" defaultValue="2026-10-20" /></FormField>
            </div>
          </div>

          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <Calculator size={16} style={{ color: 'var(--color-primary-dark)' }} />
              <h3 className="text-subsection-title" style={{ color: 'var(--color-primary-dark)' }}>Summary</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-body text-muted">Subtotal</span>
                <span className="text-body">RM 48,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-body text-muted">Discount</span>
                <span className="text-body">- RM 0</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-body text-muted">Tax (0%)</span>
                <span className="text-body">RM 0</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-2) 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>Total</span>
                <span className="text-h3" style={{ color: 'var(--color-primary-dark)' }}>RM 48,000</span>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-4)' }}>
               <FormField label="Amount Due Now (Deposit)">
                 <Input type="number" defaultValue="10000" />
               </FormField>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
