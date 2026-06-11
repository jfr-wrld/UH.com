import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Tabs } from '../../components/navigation/Tabs';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { DataTable } from '../../components/data-display/DataTable';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { Users, FileText, Send, Calendar, AlertTriangle, Play, Pause, RefreshCw, Eye, ChevronRight } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';

export const AnnouncementDetails: React.FC<{ navigate: (route: string, data?: any) => void, id?: string }> = ({ navigate, id = 'ANN-004' }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const deliveryData = [
    { id: '1', recipient: 'Ahmad bin Ali', role: 'Jamaah', channel: 'In-App', status: 'Read', error: '-' },
    { id: '2', recipient: 'Ahmad bin Ali', role: 'Jamaah', channel: 'Email', status: 'Failed', error: 'Bounce: Invalid Address' },
    { id: '3', recipient: 'Ahmad bin Ali', role: 'Jamaah', channel: 'WhatsApp', status: 'Delivered', error: '-' },
    { id: '4', recipient: 'Siti Nurhaliza', role: 'Jamaah', channel: 'In-App', status: 'Delivered', error: '-' },
    { id: '5', recipient: 'Siti Nurhaliza', role: 'Jamaah', channel: 'WhatsApp', status: 'Failed', error: 'Provider Error: Timeout' },
  ];

  const deliveryColumns = [
    {
      header: 'Recipient',
      accessor: (row: typeof deliveryData[0]) => (
        <div>
          <div className="text-body-bold">{row.recipient}</div>
          <div className="text-caption text-muted">{row.role}</div>
        </div>
      )
    },
    {
      header: 'Channel',
      accessor: (row: typeof deliveryData[0]) => <Badge variant="neutral">{row.channel}</Badge>
    },
    {
      header: 'Status',
      accessor: (row: typeof deliveryData[0]) => {
        let variant: any = 'neutral';
        if (row.status === 'Read') variant = 'success';
        if (row.status === 'Delivered') variant = 'info';
        if (row.status === 'Failed') variant = 'danger';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    {
      header: 'Error Detail',
      accessor: (row: typeof deliveryData[0]) => (
        row.status === 'Failed' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--color-danger)' }}>
            <AlertTriangle size={14} />
            <span className="text-caption">{row.error}</span>
          </div>
        ) : <span className="text-caption text-muted">-</span>
      )
    },
    {
      header: '',
      accessor: (row: typeof deliveryData[0]) => (
        row.status === 'Failed' && row.channel !== 'In-App' ? (
          <Button size="sm" variant="ghost" leftIcon={<RefreshCw size={14} />} onClick={() => alert('Retrying ' + row.channel + ' delivery for ' + row.recipient)}>Retry</Button>
        ) : null
      ),
      align: 'right' as const
    }
  ];
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(deliveryData);


  return (
    <div>
      <PageHeader 
        title={`Announcement: ${id}`} 
        breadcrumbs={[
          { label: 'Dashboard', onClick: () => navigate('dashboard') },
          { label: 'Announcements', onClick: () => navigate('announcement-list') },
          { label: id }
        ]}
        badges={<Badge variant="warning">Partially Sent</Badge>}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Pause size={16} />}>Archive</Button>
          </div>
        }
      />

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <Tabs 
          activeTab={activeTab} 
          onChange={setActiveTab}
          tabs={[
            { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
            { id: 'delivery', label: 'Delivery Tracking (5)' },
            { id: 'audit', label: 'Audit Log' }
          ]} 
        />
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Message Preview</h2>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Subject / Title</span>
                <span className="text-body-bold">Urgent: Flight Change SV801</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Content</span>
                <div className="text-body" style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  Dear Jamaah, <br/><br/>
                  Please be informed that your flight SV801 scheduled for 12 Nov 2026 has been delayed by 2 hours. <br/>
                  New Departure Time: 14:00 (2:00 PM) <br/><br/>
                  Please gather at KLIA Level 5, Counter H at 10:00 AM instead. <br/><br/>
                  Thank you,<br/>
                  UmrahHaji Operations Team
                </div>
                </div>
              </div>

              {/* Attachments Section (AN5) */}
              <div style={{ marginTop: 'var(--space-6)' }}>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>Attachments</span>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <FileText size={16} className="text-muted" />
                    <span className="text-body-bold">Flight_Itinerary_SV801_Updated.pdf</span>
                    <Button variant="ghost" size="sm" style={{ marginLeft: 'var(--space-2)' }}>Download</Button>
                  </div>
                </div>
              </div>

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Audience Snapshot</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Target Source</span>
                  <span className="text-body">Group Trip Members (TRP-2026-001)</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Recipient Count</span>
                  <span className="text-body-bold">45 Jamaah</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Channels</span>
                  <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap', marginTop: 'var(--space-1)' }}>
                    <Badge variant="neutral">In-App</Badge>
                    <Badge variant="neutral">Email</Badge>
                    <Badge variant="neutral">WhatsApp</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Schedule & Author</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Created By</span>
                  <span className="text-body">Ops Admin (ops@umrahhaji.com)</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Sent At</span>
                  <span className="text-body">08 Nov 2026, 02:00 PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'delivery' && (
        <div>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <DataTable 
              data={deliveryData}
              columns={deliveryColumns}
            />
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div style={{ width: '100%' }}>
          <AuditLogPanel 
            logs={[
              { id: '1', timestamp: '08 Nov 2026, 02:00 PM', actor: 'System', action: 'Announcement Sent', module: 'Announcement', details: 'Delivery triggered to 45 recipients' },
              { id: '2', timestamp: '08 Nov 2026, 01:55 PM', actor: 'Ops Admin', action: 'Queue Locked', module: 'Announcement', details: 'Audience snapshot created' },
              { id: '3', timestamp: '06 Nov 2026, 10:30 AM', actor: 'Ops Admin', action: 'Announcement Scheduled', module: 'Announcement', details: 'Scheduled for 08 Nov 2026, 02:00 PM' },
              { id: '4', timestamp: '06 Nov 2026, 10:15 AM', actor: 'Ops Admin', action: 'Announcement Draft Created', module: 'Announcement', details: 'Draft saved' }
            ]}
          />
        </div>
      )}

    </div>
  );
};
