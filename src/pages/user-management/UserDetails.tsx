import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { ReviewHistoryPanel } from '../../components/domain/ReviewHistoryPanel';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { AuditActionModal } from '../../components/actions/AuditActionModal';
import { Key, ShieldOff, LogOut, CheckCircle2, ShieldAlert, ChevronRight } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const UserDetails: React.FC<{ navigate: (route: string, data?: any) => void, userId?: string }> = ({ navigate, userId = 'usr_1' }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userStatus, setUserStatus] = useState('Active');
  const [modalState, setModalState] = useState<{isOpen: boolean, action: string, targetStatus?: string}>({isOpen: false, action: ''});
  const { getById } = useLocalStorageCrud<any>('users');
  
  const handleConfirmAction = (reason: string) => {
    if (modalState.action === 'status' && modalState.targetStatus) {
      setUserStatus(modalState.targetStatus);
    }
    setModalState({isOpen: false, action: ''});
  };


  // Mock User Data
  const user = getById(userId) || {
    id: userId,
    name: 'Unknown User',
    email: 'N/A',
    phone: 'N/A',
    type: 'User',
    status: 'Inactive',
    created: 'N/A',
    lastLogin: 'N/A',
    portals: [],
    roles: [],
    linkedProfiles: []
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'access', label: 'Portal Access' },
    { id: 'roles', label: 'Roles & Permissions' },
    { id: 'linked', label: 'Linked Profiles' },
    { id: 'security', label: 'Login & Security' },
    { id: 'logs', label: 'Activity Logs' },
  ];
  


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      {/* Header Profile Section */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
            {user.name.charAt(0)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <h1 className="text-page-title">{user.name}</h1>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <span className="text-body text-muted">{user.email}</span>
              <StatusTransitionMenu 
                currentStatus={userStatus}
                allowedTransitions={['active', 'suspended', 'inactive', 'locked']}
                onTransition={(newStatus) => setModalState({isOpen: true, action: 'status', targetStatus: newStatus})}
              />
              <Badge variant={getCategoryBadgeVariant(user.type)}>{user.type}</Badge>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="secondary" onClick={() => navigate('um-users')}>Back to List</Button>
          <Button>Edit User</Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'none', padding: 'var(--space-6)', minHeight: '400px' }}>
        
        {activeTab === 'profile' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Identity</h3>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Full Name</span>
                <span className="text-body">{user.name}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Email Address</span>
                <span className="text-body">{user.email}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Phone Number</span>
                <span className="text-body">{user.phone}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Account Details</h3>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>User ID</span>
                <span className="text-body">{user.id}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Date Created</span>
                <span className="text-body">{user.created}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'access' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h3 className="text-subsection-title">Authorized Portals</h3>
            {user.portals.map(p => (
              <div key={p} style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <CheckCircle2 className="text-success" size={24} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="text-body-bold">{p}</span>
                  <span className="text-caption text-muted">Full access to internal operational tools.</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'roles' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Assigned Roles</h3>
              {user.roles.map(r => (
                <Badge key={r} variant="info">{r}</Badge>
              ))}
            </div>
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Effective Permissions Matrix</h3>
              <p className="text-body text-muted">This user possesses Super Admin privileges. Module-level permission rules are bypassed, granting full read, write, update, delete, and verification access across the entire platform.</p>
            </div>
          </div>
        )}

        {activeTab === 'linked' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h3 className="text-subsection-title">Operational Profiles</h3>
            <p className="text-body text-muted">This user account is not currently linked to any Travel Agency, Jamaah, or Mutawwif operational profiles.</p>
            <Button variant="secondary" style={{ width: 'fit-content' }}>Link Profile</Button>
          </div>
        )}

        {activeTab === 'security' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Authentication</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Last Login</span>
                    <span className="text-body">{user.lastLogin}</span>
                  </div>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Failed Login Attempts</span>
                    <span className="text-body text-muted">0</span>
                  </div>
                  <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <ShieldAlert size={20} className="text-warning" />
                    <div>
                      <span className="text-body-bold" style={{ display: 'block' }}>MFA Not Configured</span>
                      <span className="text-caption text-muted">Multi-factor authentication is disabled for this user.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Security Actions</h3>
                <Button variant="secondary" leftIcon={<Key size={16} />} onClick={() => alert('Password reset email sent.')}>Send Password Reset Email</Button>
                <Button variant="secondary" leftIcon={<LogOut size={16} />} onClick={() => setModalState({isOpen: true, action: 'revoke'})}>Revoke Active Sessions</Button>
                <Button variant="danger" leftIcon={<ShieldOff size={16} />} onClick={() => setModalState({isOpen: true, action: 'deactivate'})}>Deactivate Account</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Activity Logs</h3>
              <AuditLogPanel 
                logs={[
                  { id: '1', timestamp: '2 hours ago', actor: 'System', action: 'Failed Login Attempt', module: 'Auth', details: 'Invalid password from IP 192.168.1.1' },
                  { id: '2', timestamp: '1 week ago', actor: 'Super Admin', action: 'Role Updated', module: 'User Management', details: 'Changed from User to Admin' }
                ]}
              />
            </div>
            
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Review & Approval History</h3>
              <ReviewHistoryPanel history={[
                { id: '1', reviewer: 'System Auto-verification', date: '01 Jan 2024', status: 'approved', notes: 'User email verified.' },
                { id: '2', reviewer: 'Admin Jane', date: '05 Jan 2024', status: 'revision', notes: 'ID document was blurry. User re-uploaded.' }
              ]} />
            </div>
          </div>
        )}

      </div>
      <AuditActionModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({isOpen: false, action: ''})}
        onConfirm={handleConfirmAction}
        title={modalState.action === 'status' ? `Change Status to ${modalState.targetStatus}` : 'Security Action'}
        message="Please provide a reason for this sensitive action."
        actionLabel="Confirm"
        entityName={user.name}
      />
    </div>
  );
};
