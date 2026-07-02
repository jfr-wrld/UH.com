import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { FormField } from '../../../components/inputs/FormField';
import { Input } from '../../../components/inputs/Input';
import { Select } from '../../../components/inputs/Select';
import { Button } from '../../../components/actions/Button';
import { Save, DollarSign, FileText, CreditCard, Percent, Bell } from 'lucide-react';

export const TAFinanceSettings: React.FC<{ navigate: (path: string, state?: any) => void; showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast }) => {
  const [activeSection, setActiveSection] = useState('payment');
  const [loading, setLoading] = useState(false);

  const sections = [
    { id: 'payment', label: 'Payment Settings', icon: <CreditCard size={16} /> },
    { id: 'invoice', label: 'Invoice Settings', icon: <FileText size={16} /> },
    { id: 'tax', label: 'Tax & Currency', icon: <Percent size={16} /> },
    { id: 'notification', label: 'Notification Settings', icon: <Bell size={16} /> },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast?.('Settings Saved', 'Finance settings have been updated successfully.', 'success');
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Finance Settings"
        subtitle="Configure your agency's invoice defaults and finance rules."
        actions={
          <Button variant="primary" leftIcon={<Save size={16} />} onClick={handleSave} isLoading={loading}>Save Settings</Button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--space-6)' }}>
        {/* Settings Navigation */}
        <nav style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--space-1)',
          backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', 
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
          backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', 
          borderRadius: 'var(--radius-md)', 
          border: 'none',
          padding: 'var(--space-6)'
        }}>
          {/* Payment Settings */}
          {activeSection === 'payment' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <h3 className="text-h4" style={{ marginBottom: 'var(--space-1)' }}>Payment Configuration</h3>
                <p className="text-body text-muted">Configure accepted payment methods and default terms.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Default Payment Terms">
                  <Select>
                    <option value="7">Net 7 days</option>
                    <option value="14">Net 14 days</option>
                    <option value="30">Net 30 days</option>
                    <option value="due-on-receipt">Due on Receipt</option>
                  </Select>
                </FormField>
                <FormField label="Default Deposit Type">
                  <Select>
                    <option value="percentage">Percentage (%)</option>
                    <option value="amount">Fixed Amount</option>
                  </Select>
                </FormField>
              </div>
              <FormField label="Default Deposit Amount">
                <Input type="number" defaultValue="20" />
              </FormField>
              <FormField label="Accepted Payment Methods">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                  {['Bank Transfer', 'FPX', 'Credit Card', 'Debit Card', 'E-Wallet', 'Cash'].map((method) => (
                    <label key={method} style={{ 
                      display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                      padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--surface-sunken)', border: '1px solid var(--border-default)', cursor: 'pointer',
                      fontSize: 'var(--text-sm)'
                    }}>
                      <input type="checkbox" defaultChecked={['Bank Transfer', 'FPX', 'Credit Card'].includes(method)} />
                      {method}
                    </label>
                  ))}
                </div>
              </FormField>
            </div>
          )}

          {/* Invoice Settings */}
          {activeSection === 'invoice' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <h3 className="text-h4" style={{ marginBottom: 'var(--space-1)' }}>Invoice Configuration</h3>
                <p className="text-body text-muted">Configure invoice numbering and default templates.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Invoice Prefix">
                  <Input defaultValue="INV-" />
                </FormField>
                <FormField label="Next Invoice Number">
                  <Input defaultValue="2026-0201" />
                </FormField>
              </div>
              <FormField label="Show Item Codes on Invoice">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <input type="checkbox" id="showItemCodes" defaultChecked />
                  <label htmlFor="showItemCodes" className="text-body">Include item codes for accounting purposes</label>
                </div>
              </FormField>
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
              <FormField label="Default Terms & Conditions">
                <textarea 
                  defaultValue="1. All payments are strictly non-refundable.\n2. Please refer to our main cancellation policy." 
                  style={{
                    width: '100%', minHeight: '80px', padding: 'var(--space-3)',
                    border: 'none', borderRadius: 'var(--radius-sm)',
                    fontFamily: 'inherit', fontSize: 'var(--text-sm)', resize: 'vertical',
                    backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)'
                  }}
                />
              </FormField>
              <FormField label="Invoice Footer">
                <Input defaultValue="UmrahHaji.com Travel Agency Partner" />
              </FormField>
            </div>
          )}

          {/* Tax & Currency Settings */}
          {activeSection === 'tax' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <h3 className="text-h4" style={{ marginBottom: 'var(--space-1)' }}>Tax and Currency</h3>
                <p className="text-body text-muted">Configure default currency and tax rules.</p>
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
                <FormField label="Tax / SST Rate (%)">
                  <Input type="number" defaultValue="6" />
                </FormField>
              </div>
              <FormField label="Tax Registration Number">
                <Input defaultValue="C-12345678-09" />
              </FormField>
              <FormField label="Pricing Display">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <input type="checkbox" id="includeTax" defaultChecked />
                  <label htmlFor="includeTax" className="text-body">Include Tax in Displayed Prices</label>
                </div>
              </FormField>
            </div>
          )}

          {/* Notification Settings */}
          {activeSection === 'notification' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <h3 className="text-h4" style={{ marginBottom: 'var(--space-1)' }}>Notification Settings</h3>
                <p className="text-body text-muted">Configure automated finance notifications for customers and staff.</p>
              </div>
              <FormField label="Finance CC Emails (comma separated)">
                <Input defaultValue="finance@travelagency.com, admin@travelagency.com" />
              </FormField>
              <FormField label="Automated Actions">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked />
                    <span className="text-body">Auto-send invoice emails to customers upon generation</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked />
                    <span className="text-body">Send automated payment reminders</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked />
                    <span className="text-body">Auto-send receipt emails upon verified payment</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                    <input type="checkbox" />
                    <span className="text-body">Send WhatsApp reminders (requires active WhatsApp integration)</span>
                  </label>
                </div>
              </FormField>
              <FormField label="Reminder Schedule">
                <Select>
                  <option value="7-3-1">7, 3, and 1 days before due date</option>
                  <option value="3-1">3 and 1 days before due date</option>
                  <option value="1">1 day before due date</option>
                  <option value="custom">Custom Schedule</option>
                </Select>
              </FormField>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
