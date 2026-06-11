import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Button } from '../../components/actions/Button';
import { Tabs } from '../../components/navigation/Tabs';
import { Badge } from '../../components/data-display/Badge';
import { UserCircle, Mail, Phone, MapPin, Building, Shield, Key, Bell, Camera, Lock, CheckCircle2, AlertTriangle, Smartphone, ChevronRight } from 'lucide-react';

export const MyProfile: React.FC<{ navigate: (route: string, data?: any) => void; showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    showToast?.('Profile Updated', 'Your profile information has been successfully updated.', 'success');
  };

  const handlePasswordChange = () => {
    showToast?.('Password Updated', 'Your password has been changed successfully. Please use your new password on the next login.', 'success');
  };

  const renderPersonalInfo = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'var(--space-6)' }}>
      {/* Sidebar / Avatar Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ 
          backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', 
          borderRadius: 'var(--radius-card)', 
          border: 'none', 
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div style={{ position: 'relative', marginBottom: 'var(--space-4)' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px solid var(--surface-page)'
            }}>
              <UserCircle size={64} color="var(--color-primary-dark)" />
            </div>
            {isEditing && (
              <button style={{ 
                position: 'absolute', 
                bottom: 0, 
                right: 0, 
                backgroundColor: 'var(--surface-inverse)', 
                color: 'var(--surface-base)', 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                border: '2px solid var(--surface-base)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <Camera size={16} />
              </button>
            )}
          </div>
          
          <h2 className="text-h3" style={{ marginBottom: 'var(--space-1)' }}>Admin User</h2>
          <p className="text-body text-muted" style={{ marginBottom: 'var(--space-3)' }}>Super Administrator</p>
          
          <Badge variant="primary" style={{ marginBottom: 'var(--space-6)' }}>Active Account</Badge>
          
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Mail size={16} className="text-muted" />
              <span className="text-body">admin@umrahhaji.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Phone size={16} className="text-muted" />
              <span className="text-body">+60 12-345 6789</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Building size={16} className="text-muted" />
              <span className="text-body">HQ Kuala Lumpur</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Info Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
            <h3 className="text-h4">Personal Details</h3>
            {!isEditing && (
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>Edit Details</Button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="First Name">
              <Input defaultValue="Admin" disabled={!isEditing} />
            </FormField>
            <FormField label="Last Name">
              <Input defaultValue="User" disabled={!isEditing} />
            </FormField>
            <FormField label="Email Address" required>
              <Input defaultValue="admin@umrahhaji.com" type="email" disabled={!isEditing} />
            </FormField>
            <FormField label="Phone Number">
              <Input defaultValue="+60 12-345 6789" type="tel" disabled={!isEditing} />
            </FormField>
            <FormField label="Department">
              <Input defaultValue="Technology & Operations" disabled={true} />
            </FormField>
            <FormField label="Job Title">
              <Input defaultValue="Super Administrator" disabled={true} />
            </FormField>
          </div>

          {isEditing && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </div>
        
        <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)' }}>
          <h3 className="text-h4" style={{ marginBottom: 'var(--space-6)' }}>Session Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Last Login</span>
              <span className="text-body-bold">Today, 08:24 AM</span>
            </div>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Current IP Address</span>
              <span className="text-body-bold">192.168.1.104</span>
            </div>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Account Created</span>
              <span className="text-body-bold">10 Jan 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Key size={20} color="var(--color-primary-dark)" />
          </div>
          <div>
            <h3 className="text-h4">Change Password</h3>
            <p className="text-body text-muted">Ensure your account is using a long, random password to stay secure.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <FormField label="Current Password" required>
            <Input type="password" placeholder="Enter current password" />
          </FormField>
          <FormField label="New Password" required helpText="Password must be at least 8 characters long and contain numbers and symbols.">
            <Input type="password" placeholder="Enter new password" />
          </FormField>
          <FormField label="Confirm New Password" required>
            <Input type="password" placeholder="Confirm new password" />
          </FormField>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
            <Button onClick={handlePasswordChange}>Update Password</Button>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smartphone size={20} className="text-default" />
            </div>
            <div>
              <h3 className="text-h4">Two-Factor Authentication</h3>
              <p className="text-body text-muted">Add additional security to your account using two-factor authentication.</p>
            </div>
          </div>
          <Badge variant="neutral">Not Configured</Badge>
        </div>

        <div style={{ backgroundColor: 'var(--surface-sunken)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          <AlertTriangle size={20} className="text-warning" style={{ flexShrink: 0 }} />
          <div>
            <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Two-factor authentication is not enabled yet.</span>
            <span className="text-body text-muted">When two-factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.</span>
          </div>
        </div>

        <Button variant="secondary">Enable 2FA</Button>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={20} color="var(--color-primary-dark)" />
          </div>
          <div>
            <h3 className="text-h4">Notification Preferences</h3>
            <p className="text-body text-muted">Choose what notifications you receive and how they are delivered.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {[
            { id: 'notif-1', title: 'New Registration', desc: 'Notify me when a new user registers on the platform.' },
            { id: 'notif-2', title: 'System Alerts', desc: 'Get alerts for critical system events and maintenance.' },
            { id: 'notif-3', title: 'Payment Approvals', desc: 'Receive notifications when a high-value payment needs approval.' },
            { id: 'notif-4', title: 'Weekly Digest', desc: 'Receive a weekly summary of system activities via email.' }
          ].map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <span className="text-body-bold" style={{ display: 'block' }}>{item.title}</span>
                <span className="text-body text-muted">{item.desc}</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <Badge variant="primary">Email</Badge>
                <Badge variant="neutral">Push</Badge>
              </div>
            </div>
          ))}
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
            <Button variant="secondary" onClick={() => showToast?.('Preferences Saved', 'Your notification preferences have been saved.', 'success')}>Save Preferences</Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="My Profile"
        breadcrumbs={[{ label: 'Settings' }, { label: 'My Profile' }]}
        actions={
          activeTab === 'personal' && !isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )
        }
      />

      <Tabs 
        tabs={[
          { id: 'personal', label: 'Personal Information' },
          { id: 'security', label: 'Security & Login' },
          { id: 'preferences', label: 'Preferences' }
        ]} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
      />

      {activeTab === 'personal' && renderPersonalInfo()}
      {activeTab === 'security' && renderSecurity()}
      {activeTab === 'preferences' && renderPreferences()}
    </div>
  );
};
