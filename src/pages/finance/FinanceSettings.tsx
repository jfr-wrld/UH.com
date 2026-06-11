import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Badge } from '../../components/data-display/Badge';
import { Save, Settings, DollarSign, FileText, CreditCard, Percent, Wallet, ArrowUpRight, Bell } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';

// PRD Section 16: Finance Settings
// Groups: Currency, Invoice, Payment, Tax, Commission, Allowance, Payout, Notification

export const FinanceSettings: React.FC<{ navigate: (route: string, data?: any) => void; showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast }) => {
  const [activeSection, setActiveSection] = useState('currency');

  const sections = [
    { id: 'currency', label: 'Currency Settings', icon: <DollarSign size={16} /> },
    { id: 'invoice', label: 'Invoice Settings', icon: <FileText size={16} /> },
    { id: 'payment', label: 'Payment Settings', icon: <CreditCard size={16} /> },
    { id: 'tax', label: 'Tax Settings', icon: <Percent size={16} /> },
    { id: 'commission', label: 'Commission Settings', icon: <Percent size={16} /> },
    { id: 'allowance', label: 'Allowance Settings', icon: <Wallet size={16} /> },
    { id: 'payout', label: 'Payout Settings', icon: <ArrowUpRight size={16} /> },
    { id: 'notification', label: 'Notification Settings', icon: <Bell size={16} /> },
  ];

  const handleSave = () => {
    showToast?.('Settings Saved', 'Finance settings have been updated successfully.', 'success');
  };
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(sections);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Finance Settings"
        breadcrumbs={[{ label: 'Finance Management' }, { label: 'Settings' }]}
        actions={
          <Button leftIcon={<Save size={16} />} onClick={handleSave}>Save Changes</Button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--space-6)' }}>
        {/* Settings Navigation */}
        <nav style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--space-1)',
          backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', 
          borderRadius: 'var(--radius-md)', 
          border: 'none',
          padding: 'var(--space-3)',
          alignSelf: 'flex-start',
          position: 'sticky',
          top: 'var(--space-4)'
        }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeSection === section.id ? 'var(--color-primary-light)' : 'transparent',
                color: activeSection === section.id ? 'var(--color-primary-dark)' : 'var(--color-text-default)',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 'var(--text-sm)',
                fontWeight: activeSection === section.id ? '600' : '400',
                transition: 'all var(--motion-fast) var(--ease-standard)'
              }}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </nav>

        {/* Settings Content */}
        <div style={{ 
          backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', 
          borderRadius: 'var(--radius-md)', 
          border: 'none',
          padding: 'var(--space-6)'
        }}>
          {/* Currency Settings */}
          {activeSection === 'currency' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <h3 className="text-h4" style={{ marginBottom: 'var(--space-1)' }}>Currency Settings</h3>
                <p className="text-body text-muted">Configure default currency and exchange display rules.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Default Currency">
                  <Select>
                    <option value="MYR">MYR - Malaysian Ringgit</option>
                    <option value="SAR">SAR - Saudi Riyal</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="IDR">IDR - Indonesian Rupiah</option>
                  </Select>
                </FormField>
                <FormField label="Currency Display Format">
                  <Select>
                    <option value="symbol-before">Symbol Before (RM 1,000)</option>
                    <option value="code-before">Code Before (MYR 1,000)</option>
                    <option value="symbol-after">Symbol After (1,000 RM)</option>
                  </Select>
                </FormField>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Decimal Places">
                  <Select>
                    <option value="0">0 (RM 1,000)</option>
                    <option value="2">2 (RM 1,000.00)</option>
                  </Select>
                </FormField>
                <FormField label="Exchange Rate Display">
                  <Select>
                    <option value="hide">Hide exchange rate</option>
                    <option value="show-sar">Show SAR equivalent</option>
                    <option value="show-usd">Show USD equivalent</option>
                  </Select>
                </FormField>
              </div>
            </div>
          )}

          {/* Invoice Settings */}
          {activeSection === 'invoice' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <h3 className="text-h4" style={{ marginBottom: 'var(--space-1)' }}>Invoice Settings</h3>
                <p className="text-body text-muted">Configure invoice numbering, prefix, and default terms.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Invoice Prefix">
                  <Input defaultValue="INV-" />
                </FormField>
                <FormField label="Next Invoice Number">
                  <Input defaultValue="2026-0201" />
                </FormField>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Numbering Format">
                  <Select>
                    <option value="year-seq">Year-Sequential (INV-2026-0001)</option>
                    <option value="sequential">Sequential (INV-0001)</option>
                    <option value="date-seq">Date-Sequential (INV-20261101-001)</option>
                  </Select>
                </FormField>
                <FormField label="Default Payment Terms">
                  <Select>
                    <option value="7">Net 7 days</option>
                    <option value="14">Net 14 days</option>
                    <option value="30">Net 30 days</option>
                    <option value="due-on-receipt">Due on Receipt</option>
                  </Select>
                </FormField>
              </div>
              <FormField label="Default Invoice Notes">
                <textarea 
                  defaultValue="Thank you for choosing UmrahHaji.com. Please make payment before the due date." 
                  style={{
                    width: '100%', minHeight: '80px', padding: 'var(--space-3)',
                    border: 'none', borderRadius: 'var(--radius-sm)',
                    fontFamily: 'inherit', fontSize: 'var(--text-sm)', resize: 'vertical',
                    backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)'
                  }}
                />
              </FormField>
            </div>
          )}

          {/* Payment Settings */}
          {activeSection === 'payment' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <h3 className="text-h4" style={{ marginBottom: 'var(--space-1)' }}>Payment Settings</h3>
                <p className="text-body text-muted">Configure accepted payment methods, default terms, and proof requirements.</p>
              </div>
              <FormField label="Accepted Payment Methods">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                  {['Bank Transfer', 'FPX', 'Credit Card', 'Debit Card', 'E-Wallet', 'Cash', 'Manual'].map((method) => (
                    <label key={method} style={{ 
                      display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                      padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)',
                      border: 'none', cursor: 'pointer',
                      backgroundColor: 'var(--surface-sunken)', fontSize: 'var(--text-sm)'
                    }}>
                      <input type="checkbox" defaultChecked={['Bank Transfer', 'FPX', 'Cash', 'Manual'].includes(method)} />
                      {method}
                    </label>
                  ))}
                </div>
              </FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Payment Proof Required">
                  <Select>
                    <option value="always">Always Required</option>
                    <option value="manual-only">Only for Manual Payment</option>
                    <option value="optional">Optional</option>
                  </Select>
                </FormField>
                <FormField label="Default Payment Terms (Days)">
                  <Input type="number" defaultValue="14" />
                </FormField>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Overdue Grace Period (Days)">
                  <Input type="number" defaultValue="3" />
                </FormField>
                <FormField label="Auto-Reminder Before Due Date">
                  <Select>
                    <option value="3">3 days before</option>
                    <option value="7">7 days before</option>
                    <option value="14">14 days before</option>
                    <option value="disabled">Disabled</option>
                  </Select>
                </FormField>
              </div>
            </div>
          )}

          {/* Tax Settings */}
          {activeSection === 'tax' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <h3 className="text-h4" style={{ marginBottom: 'var(--space-1)' }}>Tax Settings</h3>
                <p className="text-body text-muted">Configure tax percentage, display rules, and registration details.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Tax Percentage (%)">
                  <Input type="number" defaultValue="0" />
                </FormField>
                <FormField label="Tax Registration Number">
                  <Input defaultValue="" placeholder="e.g. SST-12345678" />
                </FormField>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Tax Display on Invoice">
                  <Select>
                    <option value="inclusive">Tax Inclusive (included in price)</option>
                    <option value="exclusive">Tax Exclusive (added on top)</option>
                    <option value="hidden">Hidden (no tax display)</option>
                  </Select>
                </FormField>
                <FormField label="Tax Label">
                  <Input defaultValue="SST" placeholder="e.g. SST, VAT, GST" />
                </FormField>
              </div>
            </div>
          )}

          {/* Commission Settings */}
          {activeSection === 'commission' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <h3 className="text-h4" style={{ marginBottom: 'var(--space-1)' }}>Commission Settings</h3>
                <p className="text-body text-muted">Configure platform commission defaults and agent commission rules.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Platform Commission Default (%)">
                  <Input type="number" defaultValue="5" />
                </FormField>
                <FormField label="Agent Commission Default (%)">
                  <Input type="number" defaultValue="3" />
                </FormField>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Commission Calculation Basis">
                  <Select>
                    <option value="package-price">Package Price</option>
                    <option value="payment-amount">Payment Amount</option>
                    <option value="net-after-tax">Net After Tax</option>
                  </Select>
                </FormField>
                <FormField label="Commission Recognition">
                  <Select>
                    <option value="on-verification">On Payment Verification</option>
                    <option value="on-trip-complete">On Trip Completion</option>
                    <option value="manual">Manual</option>
                  </Select>
                </FormField>
              </div>
              <FormField label="Public Referral Commission (%)">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <Input type="number" defaultValue="1.5" />
                  <Select>
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </Select>
                </div>
              </FormField>
            </div>
          )}

          {/* Allowance Settings */}
          {activeSection === 'allowance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <h3 className="text-h4" style={{ marginBottom: 'var(--space-1)' }}>Allowance Settings</h3>
                <p className="text-body text-muted">Configure allowance types, approval requirements, and proof requirements.</p>
              </div>
              <FormField label="Active Allowance Types">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                  {['Meal', 'Transport', 'Mutawwif', 'Accommodation Support', 'Emergency', 'Staff Advance', 'Travel Agency Support', 'Other'].map((type) => (
                    <label key={type} style={{ 
                      display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                      padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)',
                      border: 'none', cursor: 'pointer',
                      backgroundColor: 'var(--surface-sunken)', fontSize: 'var(--text-sm)'
                    }}>
                      <input type="checkbox" defaultChecked />
                      {type}
                    </label>
                  ))}
                </div>
              </FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Approval Requirement">
                  <Select>
                    <option value="always">Always Require Approval</option>
                    <option value="above-threshold">Above Threshold Only</option>
                    <option value="none">No Approval Required</option>
                  </Select>
                </FormField>
                <FormField label="Approval Threshold (RM)">
                  <Input type="number" defaultValue="500" />
                </FormField>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Proof/Receipt Required">
                  <Select>
                    <option value="always">Always Required</option>
                    <option value="on-settlement">On Settlement Only</option>
                    <option value="optional">Optional</option>
                  </Select>
                </FormField>
                <FormField label="Max Attachment Size (MB)">
                  <Input type="number" defaultValue="5" />
                </FormField>
              </div>
            </div>
          )}

          {/* Payout Settings */}
          {activeSection === 'payout' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <h3 className="text-h4" style={{ marginBottom: 'var(--space-1)' }}>Payout Settings</h3>
                <p className="text-body text-muted">Configure payout batch rules, required bank fields, and proof requirements.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Payout Processing Mode">
                  <Select>
                    <option value="manual">Manual (Phase 1)</option>
                    <option value="semi-auto">Semi-Automated (Phase 2)</option>
                  </Select>
                </FormField>
                <FormField label="Minimum Payout Amount (RM)">
                  <Input type="number" defaultValue="100" />
                </FormField>
              </div>
              <FormField label="Required Bank Fields for Payout">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                  {['Bank Name', 'Account Number', 'Account Holder Name', 'Swift Code', 'Branch'].map((field) => (
                    <label key={field} style={{ 
                      display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                      padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)',
                      border: 'none', cursor: 'pointer',
                      backgroundColor: 'var(--surface-sunken)', fontSize: 'var(--text-sm)'
                    }}>
                      <input type="checkbox" defaultChecked={['Bank Name', 'Account Number', 'Account Holder Name'].includes(field)} />
                      {field}
                    </label>
                  ))}
                </div>
              </FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Payout Proof Required">
                  <Select>
                    <option value="always">Always Required</option>
                    <option value="optional">Optional</option>
                  </Select>
                </FormField>
                <FormField label="Batch Payout Limit">
                  <Input type="number" defaultValue="50" placeholder="Max records per batch" />
                </FormField>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeSection === 'notification' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <h3 className="text-h4" style={{ marginBottom: 'var(--space-1)' }}>Notification Settings</h3>
                <p className="text-body text-muted">Configure notifications for reminders, receipts, refund, allowance approval, and payout status.</p>
              </div>
              <div style={{ 
                display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
                borderRadius: 'var(--radius-md)', overflow: 'hidden'
              }}>
                {[
                  { event: 'Invoice Sent', email: true, inApp: true, desc: 'When invoice is sent to customer' },
                  { event: 'Payment Verified', email: true, inApp: true, desc: 'When payment proof is verified' },
                  { event: 'Payment Rejected', email: true, inApp: true, desc: 'When payment proof is rejected' },
                  { event: 'Overdue Payment Reminder', email: true, inApp: true, desc: 'When payment passes due date' },
                  { event: 'Refund Status Updated', email: true, inApp: true, desc: 'When refund status changes' },
                  { event: 'Allowance Submitted', email: false, inApp: true, desc: 'When allowance request is submitted' },
                  { event: 'Allowance Approved/Rejected', email: true, inApp: true, desc: 'When allowance is approved or rejected' },
                  { event: 'Payout Marked Paid', email: true, inApp: true, desc: 'When payout is marked as paid' },
                ].map((item) => (
                  <div key={item.event} style={{ 
                    display: 'grid', gridTemplateColumns: '1fr 100px 100px', gap: 'var(--space-4)',
                    alignItems: 'center', padding: 'var(--space-3) var(--space-4)',
                    backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-sm)'
                  }}>
                    <div>
                      <span className="text-body-bold">{item.event}</span>
                      <p className="text-caption text-muted">{item.desc}</p>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked={item.email} />
                      Email
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked={item.inApp} />
                      In-App
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button at bottom */}
          <div style={{ 
            display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)',
            marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--border-default)'
          }}>
            <Button variant="secondary">Reset to Defaults</Button>
            <Button leftIcon={<Save size={16} />} onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
