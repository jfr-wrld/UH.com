import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Tabs } from '../../../components/navigation/Tabs';
import { FormField } from '../../../components/inputs/FormField';
import { Input } from '../../../components/inputs/Input';
import { Select } from '../../../components/inputs/Select';
import { Button } from '../../../components/actions/Button';
import { Badge } from '../../../components/data-display/Badge';
import { AuditLogPanel } from '../../../components/domain/AuditLogPanel';
import { Save, Lock, ExternalLink, ShieldAlert, Bell, Settings as SettingsIcon } from 'lucide-react';

export const TASettings: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: any }> = ({ navigate, showToast }) => {
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    if (showToast) showToast('Settings Saved', 'Your agency preferences have been updated successfully.', 'success');
  };

  const tabs = [
    { id: 'general', label: 'General & Operations', icon: <SettingsIcon size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'security', label: 'Security & Access', icon: <Lock size={16} /> },
    { id: 'audit', label: 'Activity Logs' }
  ];

  return (
    <div style={{ paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Agency Settings" 
        subtitle="Manage your agency preferences, notification rules, and workspace configurations."
        actions={
          activeTab !== 'audit' ? (
            <Button variant="primary" leftIcon={<Save size={16} />} onClick={handleSave}>Save Changes</Button>
          ) : undefined
        }
      />

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        
        {activeTab === 'general' && (
          <>
            {/* Platform-Controlled Settings */}
            <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                <h3 className="text-section-title">Agency Verification Profile</h3>
                <Badge variant="info"><Lock size={12} style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }} />Platform Controlled</Badge>
              </div>
              <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>
                These details are tied to your official platform verification. To change these details, you must submit a re-verification request to the platform admin.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Legal Agency Name">
                  <Input value="Al-Falah Tours & Travel Sdn Bhd" disabled />
                </FormField>
                <FormField label="MOTAC License Number">
                  <Input value="KPK/LN 1234" disabled />
                </FormField>
              </div>
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Button variant="outline" size="sm" onClick={() => navigate('ta-profile')}>View Full Verification Profile</Button>
              </div>
            </div>

            {/* Editable Agency Settings */}
            <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Workspace Preferences</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Default Timezone" required>
                  <Select defaultValue="kl">
                    <option value="kl">Asia/Kuala_Lumpur (MYT)</option>
                    <option value="makkah">Asia/Riyadh (AST)</option>
                  </Select>
                </FormField>
                <FormField label="Default Currency" required>
                  <Select defaultValue="myr">
                    <option value="myr">MYR - Malaysian Ringgit</option>
                  </Select>
                </FormField>
              </div>
            </div>

            {/* Links to Module Settings */}
            <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Module Settings</h3>
              <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>
                Settings for specific modules are managed within their respective dashboards.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <span className="text-body-bold" style={{ display: 'block' }}>Finance & Invoicing Defaults</span>
                    <span className="text-caption text-muted">Manage bank accounts, tax details, and invoice terms.</span>
                  </div>
                  <Button variant="ghost" size="sm" rightIcon={<ExternalLink size={16} />}>Go to Finance</Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <span className="text-body-bold" style={{ display: 'block' }}>Package & Booking Rules</span>
                    <span className="text-caption text-muted">Manage default cancellation policies and payment milestones.</span>
                  </div>
                  <Button variant="ghost" size="sm" rightIcon={<ExternalLink size={16} />}>Go to Packages</Button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'notifications' && (
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Internal Notification Rules</h3>
            <p className="text-body text-muted" style={{ marginBottom: 'var(--space-6)' }}>
              Configure when and how your agency staff receives operational alerts.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>New Booking Received</span>
                  <span className="text-caption text-muted">When a Jamaah completes a new booking online</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <label style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> In-App</label>
                  <label style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Email</label>
                </div>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>Payment Overdue Alert</span>
                  <span className="text-caption text-muted">When an invoice crosses its due date</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <label style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> In-App</label>
                  <label style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Email</label>
                </div>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>New Support Ticket / Escalation</span>
                  <span className="text-caption text-muted">When Jamaah submits a high-priority ticket</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <label style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> In-App</label>
                  <label style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Email</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <>
            <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                <h3 className="text-section-title">Platform Security Policies</h3>
                <Badge variant="info"><Lock size={12} style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }} />Platform Enforced</Badge>
              </div>
              
              <div style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
                <ShieldAlert size={20} />
                <span className="text-body">Multi-Factor Authentication (MFA) is globally enforced for all Travel Agency Staff accounts. This setting cannot be disabled.</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Session Timeout</span>
                  <span className="text-body-bold">4 Hours of inactivity</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Password Expiry</span>
                  <span className="text-body-bold">Every 90 Days</span>
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Team & Access Control</h3>
              <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>
                Manage your agency's internal staff, assign roles, and revoke access.
              </p>
              <Button onClick={() => navigate('ta-team-roles')} rightIcon={<ExternalLink size={16} />}>Manage Team Members</Button>
            </div>
          </>
        )}

        {activeTab === 'audit' && (
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 className="text-section-title">Agency Activity Logs</h3>
              <Button variant="outline" size="sm">Export CSV</Button>
            </div>
            <AuditLogPanel 
              logs={[
                { id: '1', action: 'Modified Package P-1002 pricing', actor: 'Admin Agency', timestamp: '11 Nov 2026, 09:12 AM', module: 'Settings', details: '-' },
                { id: '2', action: 'Approved Refund Request R-992', actor: 'Finance Staff', timestamp: '10 Nov 2026, 14:30 PM', module: 'Settings', details: '-' },
                { id: '3', action: 'Exported Jamaah List for TRP-1001', actor: 'Ops Staff', timestamp: '09 Nov 2026, 11:20 AM', module: 'Settings', details: '-' },
                { id: '4', action: 'Added new Team Member (Sales)', actor: 'Admin Agency', timestamp: '08 Nov 2026, 10:05 AM', module: 'Settings', details: '-' },
                { id: '5', action: 'Updated Agency Notification Preferences', actor: 'Admin Agency', timestamp: '07 Nov 2026, 16:45 PM', module: 'Settings', details: '-' },
              ]} 
            />
          </div>
        )}
      </div>
    </div>
  );
};
