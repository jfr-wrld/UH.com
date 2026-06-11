// @ts-nocheck
import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { FormField } from '../../components/inputs/FormField';
import { Select } from '../../components/inputs/Select';
import { Input } from '../../components/inputs/Input';
import { Textarea } from '../../components/inputs/Textarea';
import { Tabs } from '../../components/navigation/Tabs';
import { Modal } from '../../components/feedback/Modal';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { RemarkPanel } from '../../components/domain/RemarkPanel';
import type { Remark } from '../../components/domain/RemarkPanel';
import { UserPlus, Activity, CheckCircle, MessageSquare, Paperclip, Download, Eye, ChevronRight } from 'lucide-react';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';

export const ReportDetails: React.FC<{ navigate: (route: string, data?: any) => void, reportId?: string }> = ({ navigate, reportId = 'rpt_2' }) => {
  const [status, setStatus] = useState('Under Review');
  const [activeTab, setActiveTab] = useState('overview');
  const [showResolutionModal, setShowResolutionModal] = useState(false);

  const [remarks, setRemarks] = useState<Remark[]>([
    { id: '1', author: 'Support Agent 1', timestamp: '11 Nov, 10:30 AM', content: 'Checked with the Visa processing vendor. They are missing the biometric verification for 2 Jamaah. Following up now.', priority: 'high', category: 'operations' },
    { id: '2', author: 'System', timestamp: '11 Nov, 09:15 AM', content: 'Status changed from Open to In Progress. Assigned to Support Agent 1.', priority: 'normal', category: 'general' }
  ]);

  const handleAddRemark = (content: string, priority: string, category: string) => {
    setRemarks(prev => [{
      id: String(Date.now()),
      author: 'Admin User',
      timestamp: 'Just now',
      content,
      priority: priority as any,
      category
    }, ...prev]);
  };

  // Mock Data (Urgent Document Issue)
  const report = {
    id: reportId,
    reportId: 'RPT-26-1002',
    subject: 'Passport Visa Delay for Trip TRP-1008',
    category: 'Document',
    priority: 'Urgent',
    status: status,
    date: '11 Nov 2026',
    assignee: 'Support Agent 1',
    sender: { name: 'Zamzam Travels', role: 'Travel Agency' },
    reportedParty: { name: 'Operations Team', role: 'Platform' },
    context: {
      trip: 'TRP-1008 (Premium Umrah)',
      agency: 'Zamzam Travels'
    },
    description: 'We submitted the passports for 15 Jamaah two weeks ago. The visa processing is stalled and the flight departs in 3 days. We need immediate operational intervention or the group will miss the flight.',
    attachments: [
      { id: 'a1', name: 'Zamzam_Visa_Applications.pdf', size: '2.4 MB', type: 'PDF' },
      { id: 'a2', name: 'Flight_Manifest.pdf', size: '1.1 MB', type: 'PDF' }
    ],
    updates: [
      { id: 'u1', author: 'Support Agent 1', time: '11 Nov, 10:30 AM', type: 'internal', text: 'Checked with the Visa processing vendor. They are missing the biometric verification for 2 Jamaah. Following up now.' },
      { id: 'u2', author: 'System', time: '11 Nov, 09:15 AM', type: 'system', text: 'Status changed from Open to In Progress. Assigned to Support Agent 1.' }
    ],
    auditLogs: [
      { id: '1', timestamp: '11 Nov, 10:30 AM', actor: 'Support Agent 1', action: 'Note Added', module: 'Report', details: 'Added an internal note regarding biometric verification' },
      { id: '2', timestamp: '11 Nov, 09:15 AM', actor: 'Admin', action: 'Report Assigned', module: 'Report', details: 'Assigned to Support Agent 1' },
      { id: '3', timestamp: '11 Nov, 09:00 AM', actor: 'Zamzam Travels', action: 'Report Created', module: 'Report', details: 'Submitted via Travel Agency portal' }
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title={report.reportId}
        breadcrumbs={[{ label: 'Support & Ops' }, { label: 'Reports', onClick: () => navigate('report-list') }, { label: 'Details' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('report-list')}>Back to List</Button>
          </div>
        }
      />

      <div style={{ marginBottom: 'var(--space-4)' }}>
        <Tabs 
          tabs={[
            { id: 'overview', label: 'Overview & Updates', icon: <Eye size={16} /> },
            { id: 'audit', label: 'Audit Log' }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
          
          {/* Left Column: Report Thread */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            
            {/* Main Issue Box */}
            <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                <div>
                  <h2 className="text-h2" style={{ marginBottom: 'var(--space-2)' }}>{report.subject}</h2>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <Badge variant="danger">{report.priority}</Badge>
                    <span className="text-body text-muted">•</span>
                    <span className="text-body text-muted">{report.category}</span>
                    <span className="text-body text-muted">•</span>
                    <span className="text-body text-muted">{report.date}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Sender</span>
                  <span className="text-body-bold">{report.sender.name} ({report.sender.role})</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Reported Party</span>
                  <span className="text-body-bold">{report.reportedParty.name}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Related Trip</span>
                  <span className="text-body-bold">{report.context.trip}</span>
                </div>
              </div>

              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Description</h3>
              <p className="text-body" style={{ lineHeight: '1.6', marginBottom: 'var(--space-6)' }}>{report.description}</p>

              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Evidence Attachments</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {report.attachments.map(att => (
                  <div key={att.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                      <Paperclip size={16} className="text-muted" />
                      <span className="text-body-bold">{att.name}</span>
                      <span className="text-caption text-muted">{att.size}</span>
                    </div>
                    <Button variant="ghost" size="sm" leftIcon={<Download size={14} />}>Download</Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline / Updates */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <RemarkPanel remarks={remarks} onAddRemark={handleAddRemark} />
            </div>

          </div>

          {/* Right Column: Workflow Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            
            {/* Status & Assignment */}
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Management</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <FormField label="Current Status">
                  <Select 
                    options={[
                      {value: 'open', label: 'Open'},
                      {value: 'progress', label: 'In Progress'},
                      {value: 'waiting', label: 'Waiting on Response'},
                      {value: 'resolved', label: 'Resolved'}
                    ]} 
                    value="progress" 
                    onChange={() => {}} 
                  />
                </FormField>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Assigned PIC</span>
                    <span className="text-body-bold">{report.assignee}</span>
                  </div>
                  <Button variant="ghost" size="sm" leftIcon={<UserPlus size={16} />}>Reassign</Button>
                </div>
              </div>
            </div>

            {/* Resolution Panel */}
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-success)' }}>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Resolution</h3>
              <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-4)' }}>Once the issue is fixed, write a formal resolution note to close the ticket.</p>
              <Button onClick={() => setShowResolutionModal(true)} style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--color-success)', color: 'white' }} leftIcon={<CheckCircle size={16} />}>Mark as Resolved</Button>
            </div>

          </div>

        </div>
      )}

      {activeTab === 'audit' && (
        <div style={{ width: '100%' }}>
          <AuditLogPanel logs={report.auditLogs} />
        </div>
      )}

      {/* Resolution Modal */}
      <Modal isOpen={showResolutionModal} onClose={() => setShowResolutionModal(false)} title="Resolve Report">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-4)' }}>
          <FormField label="Resolution Type" required>
            <Select 
              options={[
                {value: 'resolved', label: 'Resolved (Action Taken)'},
                {value: 'no_action', label: 'No Action Needed'},
                {value: 'duplicate', label: 'Duplicate Report'},
                {value: 'invalid', label: 'Invalid / Spam'}
              ]}
              defaultValue="resolved"
            />
          </FormField>
          
          <FormField label="Resolution Note" required>
            <Textarea 
              style={{ minHeight: '120px' }} 
              placeholder="Detail the actions taken to resolve this issue..." 
            />
          </FormField>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <input type="checkbox" id="follow-up" />
            <label htmlFor="follow-up" className="text-body">Follow-up Required?</label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <input type="checkbox" id="notify-sender" defaultChecked />
            <label htmlFor="notify-sender" className="text-body">Notify Sender of Resolution</label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
            <Button variant="ghost" onClick={() => setShowResolutionModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setShowResolutionModal(false)}>Submit Resolution</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
