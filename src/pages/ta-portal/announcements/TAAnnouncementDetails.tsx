import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Tabs } from '../../../components/navigation/Tabs';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { DataTable } from '../../../components/data-display/DataTable';
import { AuditLogPanel } from '../../../components/domain/AuditLogPanel';
import { FileText, Eye, Users, AlertTriangle } from 'lucide-react';

export const TAAnnouncementDetails: React.FC<{ navigate: (route: string, data?: any) => void, id?: string, type?: 'inbox' | 'agency' }> = ({ navigate, id = 'PLT-001', type = 'inbox' }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const deliveryData = [
    { id: '1', recipient: 'Ahmad bin Ali', role: 'Jamaah', channel: 'In-App', status: 'Read' },
    { id: '2', recipient: 'Ahmad bin Ali', role: 'Jamaah', channel: 'Email', status: 'Failed' },
    { id: '3', recipient: 'Siti Nurhaliza', role: 'Jamaah', channel: 'WhatsApp', status: 'Delivered' }
  ];

  const deliveryColumns = [
    {
      header: 'Recipient',
      accessor: (row: any) => (
        <div>
          <div className="text-body-bold">{row.recipient}</div>
          <div className="text-caption text-muted">{row.role}</div>
        </div>
      )
    },
    {
      header: 'Channel',
      accessor: (row: any) => <Badge variant="neutral">{row.channel}</Badge>
    },
    {
      header: 'Status',
      accessor: (row: any) => {
        let variant: any = 'neutral';
        if (row.status === 'Read') variant = 'success';
        if (row.status === 'Delivered') variant = 'info';
        if (row.status === 'Failed') variant = 'danger';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    }
  ];

  const tabs = type === 'agency' ? [
    { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
    { id: 'delivery', label: 'Delivery Tracking' },
    { id: 'audit', label: 'Audit Log' }
  ] : [
    { id: 'overview', label: 'Overview', icon: <Eye size={16} /> }
  ];

  return (
    <div style={{ paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title={`Announcement: ${id}`} 
        breadcrumbs={[
          { label: 'Announcements', onClick: () => navigate('ta-announcement-list') },
          { label: id }
        ]}
        actions={
          type === 'agency' ? (
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <Button variant="ghost">Archive</Button>
            </div>
          ) : undefined
        }
      />
      <div style={{ marginBottom: 'var(--space-4)' }}>
        {type === 'agency' ? <Badge variant="success">Sent</Badge> : <Badge variant="info">Platform Notice</Badge>}
      </div>

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <Tabs activeTab={activeTab} onChange={setActiveTab} tabs={tabs} />
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: type === 'agency' ? '2fr 1fr' : '1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Message Content</h2>
              
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Subject / Title</span>
                <span className="text-body-bold">
                  {type === 'agency' ? "Reminder: Submit Passport Documents" : "New Visa Regulations for 2027 Season"}
                </span>
              </div>
              
              <div>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Content</span>
                <div className="text-body" style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  {type === 'agency' ? (
                    <>
                      Dear Jamaah, <br/><br/>
                      Please be reminded to submit your passport copies by Friday this week. <br/>
                      Failure to do so may delay your visa processing.<br/><br/>
                      Thank you.
                    </>
                  ) : (
                    <>
                      Attention all Travel Agencies, <br/><br/>
                      The Ministry has announced new visa regulations effective 1 Muharram. <br/>
                      Please refer to the attached document for full details on the bio-metric requirements.
                    </>
                  )}
                </div>
              </div>

              {/* Attachments Section */}
              <div style={{ marginTop: 'var(--space-6)' }}>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>Attachments</span>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <FileText size={16} className="text-muted" />
                    <span className="text-body-bold">Document.pdf</span>
                    <Button variant="ghost" size="sm" style={{ marginLeft: 'var(--space-2)' }}>Download</Button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {type === 'agency' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Audience Snapshot</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Target Audience</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <Users size={16} className="text-muted" />
                      <span className="text-body-bold">TRP-1001 (45 Jamaah)</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Channels</span>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Badge variant="neutral">In-App</Badge>
                      <Badge variant="neutral">WhatsApp</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'delivery' && type === 'agency' && (
        <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Delivery Tracking</h3>
          <DataTable 
            data={deliveryData} 
            columns={deliveryColumns} 
            keyExtractor={(row) => row.id} 
          />
        </div>
      )}

      {activeTab === 'audit' && type === 'agency' && (
        <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <AuditLogPanel 
            logs={[
              { id: '1', action: 'Announcement Created', actor: 'Admin Agency', timestamp: '11 Nov 2026, 09:00 AM', module: 'Announcements', details: '-' },
              { id: '2', action: 'Announcement Sent', actor: 'Admin Agency', timestamp: '12 Nov 2026, 10:00 AM', module: 'Announcements', details: '-' }
            ]} 
          />
        </div>
      )}

    </div>
  );
};
