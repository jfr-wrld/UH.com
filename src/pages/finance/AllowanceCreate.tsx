import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';

export const AllowanceCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [recipientType, setRecipientType] = useState('mutawwif');
  const [settlementRequired, setSettlementRequired] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Request Allowance"
        breadcrumbs={[{ label: 'Finance' }, { label: 'Allowances', onClick: () => navigate('fin-allowance') }, { label: 'Request' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success'); navigate('fin-allowance'); }}>Cancel</Button>
            <Button variant="secondary">Save Draft</Button>
            <Button onClick={() => navigate('fin-allowance')}>Submit Request</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        
        {/* Main Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* Basic Information */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Basic Information</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Allowance Type" required>
                <Select 
                  options={[
                    {value: 'trip_advance', label: 'Trip Operational Advance'},
                    {value: 'meal', label: 'Meal Allowance'},
                    {value: 'transport', label: 'Transport Allowance'},
                    {value: 'emergency', label: 'Emergency Fund'}
                  ]} 
                  value="meal" 
                  onChange={() => {}} 
                />
              </FormField>
              <FormField label="Expense Category" required>
                <Select 
                  options={[
                    {value: 'meal', label: 'Meal'},
                    {value: 'transport', label: 'Transport'},
                    {value: 'accommodation', label: 'Accommodation'}
                  ]} 
                  value="meal" 
                  onChange={() => {}} 
                />
              </FormField>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <FormField label="Request Title" required>
                <Input placeholder="e.g., Meal Budget for TRP-1001" />
              </FormField>
              <FormField label="Description">
                <textarea 
                  className="text-body" 
                  style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: 'none', minHeight: '80px', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)' }} 
                  placeholder="Provide operational context..." 
                />
              </FormField>
            </div>
          </div>

          {/* Recipient Details */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Recipient Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Recipient Type" required>
                <Select 
                  options={[
                    {value: 'agency', label: 'Travel Agency'},
                    {value: 'mutawwif', label: 'Mutawwif'},
                    {value: 'staff', label: 'Platform Staff'},
                    {value: 'vendor', label: 'Vendor / Other'}
                  ]} 
                  value={recipientType} 
                  onChange={setRecipientType} 
                />
              </FormField>
              
              <FormField label="Select Recipient" required>
                <Input placeholder={`Search ${recipientType}...`} />
              </FormField>
            </div>
            
            <div style={{ marginTop: 'var(--space-4)' }}>
              <FormField label="Bank Account Details (Read-only Snapshot)">
                 <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                   <span className="text-body text-muted">Maybank - 114400552233 (Ustaz Azhar Idrus)</span>
                 </div>
              </FormField>
            </div>
          </div>

        </div>

        {/* Right Column: Amounts & Logistics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* Amount & Settlement */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Amount & Settlement</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <div style={{ flex: 1 }}>
                  <FormField label="Currency" required>
                    <Select options={[{value: 'MYR', label: 'MYR'}, {value: 'SAR', label: 'SAR'}]} value="MYR" onChange={() => {}} />
                  </FormField>
                </div>
                <div style={{ flex: 2 }}>
                  <FormField label="Requested Amount" required>
                    <Input type="number" placeholder="0.00" />
                  </FormField>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <div style={{ flex: 1 }}>
                  <FormField label="Needed Date">
                    <Input type="date" />
                  </FormField>
                </div>
                <div style={{ flex: 1 }}>
                  <FormField label="Payment Method">
                    <Select options={[
                      {value: 'bank_transfer', label: 'Bank Transfer'}, 
                      {value: 'cash', label: 'Cash'},
                      {value: 'ewallet', label: 'E-wallet'},
                      {value: 'other', label: 'Other'}
                    ]} value="bank_transfer" onChange={() => {}} />
                  </FormField>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" id="settlement" checked={settlementRequired} onChange={(e) => setSettlementRequired(e.target.checked)} />
                <label htmlFor="settlement" className="text-body">Settlement / Receipts Required</label>
              </div>

              {settlementRequired && (
                <FormField label="Settlement Due Date" required>
                  <Input type="date" />
                </FormField>
              )}
            </div>
          </div>

          {/* Related Record */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Related Record</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <FormField label="Group Trip">
                <Input placeholder="Search Group Trip ID..." />
              </FormField>
              <FormField label="Travel Agency">
                <Input placeholder="Search Travel Agency..." />
              </FormField>
            </div>
          </div>

          {/* Attachments */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Supporting Documents</h3>
            <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-3)' }}>Upload quotes, trip budget estimations, or prior approvals.</p>
            <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }}>Upload PDF/Image (Max 5MB)</Button>
          </div>

          {/* Finance Administration */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Finance Administration</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Priority">
                <Select options={[
                  {value: 'normal', label: 'Normal'},
                  {value: 'important', label: 'Important'},
                  {value: 'urgent', label: 'Urgent'}
                ]} value="normal" onChange={() => {}} />
              </FormField>
              <FormField label="Status" required>
                <Select options={[
                  {value: 'draft', label: 'Draft'},
                  {value: 'pending', label: 'Pending Approval'}
                ]} value="draft" onChange={() => {}} />
              </FormField>
            </div>
            
            <div style={{ marginTop: 'var(--space-4)' }}>
              <FormField label="Finance Remark">
                <textarea 
                  className="text-body" 
                  rows={2} 
                  placeholder="Internal finance note..."
                  style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-input)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}
                />
              </FormField>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
