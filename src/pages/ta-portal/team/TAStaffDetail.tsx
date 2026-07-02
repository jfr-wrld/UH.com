import React from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { HeroHeader } from '../../../components/layout/HeroHeader';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { BadgeCheck } from 'lucide-react';

export function TAStaffDetail({ navigate, staffId }: { navigate: (path: string) => void, staffId?: string }) {
  return (
    <div>
      <HeroHeader
        title={<span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Ahmad Abdullah <BadgeCheck className="text-primary" size={24} style={{ color: 'var(--color-primary)' }} /></span>}
        onBack={() => navigate('ta-team')}
        backLabel="Back to Team"
        avatarUrl={`https://ui-avatars.com/api/?name=Ahmad+Abdullah&background=0D8ABC&color=fff&size=150`}
        badges={[
          <Badge key="1" variant="success">Active</Badge>
        ]}
        subtitle="ahmad@alhijrah.com"
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <Button variant="danger">Deactivate Account</Button>
          </div>
        }
      />
      
      <div style={{ display: 'flex', gap: 'var(--space-6)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', boxShadow: 'var(--glass-shadow)' }}>
            <h4 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Account & Security</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }} className="text-sm">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Invitation Status</span>
                <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>Accepted</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Last Login</span>
                <span>Today, 10:45 AM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">MFA Status</span>
                <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>Enabled</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Failed Logins</span>
                <span>0 attempts</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: '2', minWidth: '400px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', boxShadow: 'var(--glass-shadow)' }}>
            <div style={{ marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 className="text-section-title" style={{ margin: 0 }}>Access Summary</h3>
              <p className="text-caption text-muted" style={{ marginTop: 'var(--space-1)' }}>Current roles and permissions assigned to this staff.</p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
              <div style={{ flex: 1 }}>
                <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-2)', fontWeight: 500 }}>Assigned Role</p>
                <p className="text-body-bold">Agency Owner</p>
              </div>
              <div style={{ flex: 1 }}>
                <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-2)', fontWeight: 500 }}>Department</p>
                <p className="text-body-bold">Management</p>
              </div>
              <div style={{ flex: 1 }}>
                <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-2)', fontWeight: 500 }}>Effective Permissions</p>
                <p className="text-body-bold">Full Access</p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', boxShadow: 'var(--glass-shadow)' }}>
            <div style={{ marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 className="text-section-title" style={{ margin: 0 }}>Activity History & Audit Trail</h3>
              <p className="text-caption text-muted" style={{ marginTop: 'var(--space-1)' }}>Recent actions and permission changes.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', marginTop: '6px' }} />
                <div>
                  <p className="text-body-bold" style={{ margin: 0 }}>Role Changed</p>
                  <p className="text-caption text-muted" style={{ margin: '4px 0 0 0' }}>Promoted to Agency Owner by System Admin</p>
                  <p className="text-caption" style={{ margin: '4px 0 0 0', opacity: 0.6 }}>Oct 15, 2026 - 09:00 AM</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-success)', marginTop: '6px' }} />
                <div>
                  <p className="text-body-bold" style={{ margin: 0 }}>Account Activated</p>
                  <p className="text-caption text-muted" style={{ margin: '4px 0 0 0' }}>Accepted invitation and set up MFA</p>
                  <p className="text-caption" style={{ margin: '4px 0 0 0', opacity: 0.6 }}>Oct 14, 2026 - 11:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
