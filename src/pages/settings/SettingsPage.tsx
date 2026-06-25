// @ts-nocheck
import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Tabs } from '../../components/navigation/Tabs';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { AlertBanner } from '../../components/feedback/AlertBanner';
import { Save, Shield, Bell, CreditCard, Globe, Users, ChevronRight, ToggleLeft, History } from 'lucide-react';
import { useFeatureFlags } from '../../contexts/FeatureFlagContext';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const SettingsPage: React.FC<{ navigate, showToast: (route: string) => void  }> = ({ navigate, showToast  }) => {
  const [activeTab, setActiveTab] = useState('general');
  const { flags, refreshFlags } = useFeatureFlags();

  const toggleFlag = async (moduleName: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/settings/features/${moduleName}/toggle`, {
        method: 'POST'
      });
      if (res.ok) {
        await refreshFlags();
        showToast('Feature Flag Updated', `${moduleName} has been updated.`, 'success');
      }
    } catch (err) {
      showToast('Update Failed', 'Could not reach backend.', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Settings"
        breadcrumbs={[{ label: 'Dashboard', onClick: () => navigate('dashboard') }, { label: 'Settings' }]}
      />

      <Tabs 
        tabs={[
          { id: 'general', label: 'General' },
          { id: 'notifications', label: 'Notifications' },
          { id: 'payment', label: 'Payment' },
          { id: 'security', label: 'Security & Policy' },
          { id: 'features', label: 'Feature Flags' },
          { id: 'audit', label: 'Audit Logs' },
          { id: 'integrations', label: 'Integrations' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'general' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <Globe size={20} className="text-muted" />
              <h2 className="text-section-title">Platform Information</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '800px' }}>
              <FormField label="Platform Name">
                <Input defaultValue="UmrahHaji.com" />
              </FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Default Language">
                  <Select defaultValue="ms">
                    <option value="ms">Bahasa Melayu</option>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                  </Select>
                </FormField>
                <FormField label="Default Timezone">
                  <Select defaultValue="utc8">
                    <option value="utc8">Asia/Kuala_Lumpur (UTC+8)</option>
                    <option value="utc3">Asia/Riyadh (UTC+3)</option>
                  </Select>
                </FormField>
              </div>
              <FormField label="Default Currency">
                <Select defaultValue="myr">
                  <option value="myr">MYR — Malaysian Ringgit</option>
                  <option value="sar">SAR — Saudi Riyal</option>
                </Select>
              </FormField>
            </div>
          </div>

          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <Users size={20} className="text-muted" />
              <h2 className="text-section-title">Operational Defaults</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '800px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Default Departure Lead Time (days)">
                  <Input type="number" defaultValue="14" />
                </FormField>
                <FormField label="Queue Lock Duration (hours)">
                  <Input type="number" defaultValue="2" />
                </FormField>
              </div>
              <FormField label="Max File Upload Size (MB)">
                <Input type="number" defaultValue="5" />
              </FormField>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" leftIcon={<Save size={16} />}>Save General Settings</Button>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <Bell size={20} className="text-muted" />
              <h2 className="text-section-title">Notification Channels</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '800px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>In-App Notifications</span>
                  <span className="text-caption text-muted">Always enabled as default channel</span>
                </div>
                <Badge variant={getStatusBadgeVariant("Active")}>Active</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>Email Delivery</span>
                  <span className="text-caption text-muted">Via SMTP / Transactional Email Provider</span>
                </div>
                <Badge variant={getStatusBadgeVariant("Active")}>Active</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>WhatsApp Delivery</span>
                  <span className="text-caption text-muted">Via WhatsApp Business API Provider</span>
                </div>
                <Badge variant={getStatusBadgeVariant("Limited")}>Limited</Badge>
              </div>
            </div>
          </div>

          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Quiet Hours</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', maxWidth: '800px' }}>
              <FormField label="Start Time">
                <Input type="time" defaultValue="22:00" />
              </FormField>
              <FormField label="End Time">
                <Input type="time" defaultValue="07:00" />
              </FormField>
            </div>
            <p className="text-caption text-muted" style={{ marginTop: 'var(--space-3)' }}>Scheduled announcements will not be delivered during quiet hours unless marked as Urgent.</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" leftIcon={<Save size={16} />}>Save Notification Settings</Button>
          </div>
        </div>
      )}

      {activeTab === 'payment' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <CreditCard size={20} className="text-muted" />
              <h2 className="text-section-title">Payment Configuration</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '800px' }}>
              <FormField label="Platform Commission Rate (%)">
                <Input type="number" defaultValue="5" />
              </FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Invoice Due Period (days)">
                  <Input type="number" defaultValue="30" />
                </FormField>
                <FormField label="Overdue Grace Period (days)">
                  <Input type="number" defaultValue="7" />
                </FormField>
              </div>
              <FormField label="Accepted Payment Methods">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <input type="checkbox" defaultChecked /> <span className="text-body">Bank Transfer</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <input type="checkbox" defaultChecked /> <span className="text-body">Online Payment Gateway</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <input type="checkbox" /> <span className="text-body">Cash / Counter</span>
                  </label>
                </div>
              </FormField>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" leftIcon={<Save size={16} />}>Save Payment Settings</Button>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <AlertBanner 
            variant="info" 
            title="Role Management"
            message="To manage admin roles and permissions, visit the User Management > Roles section."
            action={{ label: 'Go to Roles', onClick: () => navigate('role-list') }}
          />
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <Shield size={20} className="text-muted" />
              <h2 className="text-section-title">Security Settings</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '800px' }}>
              <FormField label="Session Timeout (minutes)">
                <Input type="number" defaultValue="30" />
              </FormField>
              <FormField label="Password Policy">
                <Select defaultValue="strong">
                  <option value="basic">Basic (8+ characters)</option>
                  <option value="strong">Strong (8+ chars, uppercase, number, symbol)</option>
                </Select>
              </FormField>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" id="require-2fa" defaultChecked />
                <label htmlFor="require-2fa" className="text-body">Require 2FA for Super Admin and Finance roles</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" id="audit-sensitive" defaultChecked />
                <label htmlFor="audit-sensitive" className="text-body">Log all sensitive data reveal actions</label>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" leftIcon={<Save size={16} />}>Save Security Settings</Button>
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <ToggleLeft size={20} className="text-muted" />
              <h2 className="text-section-title">Feature Flags</h2>
            </div>
            <p className="text-body text-muted" style={{ marginBottom: 'var(--space-6)' }}>Enable or disable core modules across the entire platform.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '800px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>Referral Rewards Module</span>
                  <span className="text-caption text-muted">Allow agencies and platform to run referral campaigns.</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Badge variant={flags.REFERRAL_MODULE ? "success" : "neutral"}>
                    {flags.REFERRAL_MODULE ? "Enabled" : "Disabled"}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => toggleFlag('REFERRAL_MODULE')}>
                    {flags.REFERRAL_MODULE ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>E-Wallet Integration</span>
                  <span className="text-caption text-muted">Allow Mutawwif to hold wallet balances.</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Badge variant={flags.E_WALLET ? "success" : "neutral"}>
                    {flags.E_WALLET ? "Enabled" : "Disabled"}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => toggleFlag('E_WALLET')}>
                    {flags.E_WALLET ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>Auto-Visa Application</span>
                  <span className="text-caption text-muted">Direct API integration with Saudi MOFA.</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Badge variant={flags.AUTO_VISA ? "success" : "neutral"}>
                    {flags.AUTO_VISA ? "Enabled" : "Disabled"}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => toggleFlag('AUTO_VISA')}>
                    {flags.AUTO_VISA ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <History size={20} className="text-muted" />
              <h2 className="text-section-title">Audit Logs (Settings & Policy)</h2>
            </div>
            
            <DataTable 
              columns={[
                { header: 'Date', accessor: 'date' as const },
                { header: 'User', accessor: 'user' as const },
                { header: 'Action', accessor: 'action' as const },
                { header: 'Target Setting', accessor: 'target' as const },
                { header: 'Old Value', accessor: 'old' as const },
                { header: 'New Value', accessor: 'new' as const }
              ]}
              data={[
                { id: '1', date: '10 Jun 2026, 14:00', user: 'Admin (Faiz)', action: 'Updated', target: 'MFA Required', old: 'False', new: 'True' },
                { id: '2', date: '09 Jun 2026, 09:30', user: 'Admin (Siti)', action: 'Updated', target: 'Platform Commission', old: '4.5%', new: '5.0%' },
                { id: '3', date: '08 Jun 2026, 16:45', user: 'System', action: 'Enabled', target: 'Referral Rewards Module', old: 'Disabled', new: 'Enabled' }
              ]}
            />
          </div>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>External Services</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '800px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>Visa Processing API</span>
                  <span className="text-caption text-muted">Saudi Arabia e-Visa integration</span>
                </div>
                <Badge variant={getStatusBadgeVariant("Connected")}>Connected</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>Payment Gateway</span>
                  <span className="text-caption text-muted">Online payment processing</span>
                </div>
                <Badge variant={getStatusBadgeVariant("Connected")}>Connected</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>WhatsApp Business API</span>
                  <span className="text-caption text-muted">Message delivery provider</span>
                </div>
                <Badge variant={getStatusBadgeVariant("Rate Limited")}>Rate Limited</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>Flight Data Provider</span>
                  <span className="text-caption text-muted">Real-time flight status</span>
                </div>
                <Badge variant={getStatusBadgeVariant("Not Configured")}>Not Configured</Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
