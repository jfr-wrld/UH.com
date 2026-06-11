import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Textarea } from '../../components/inputs/Textarea';
import { DatePicker } from '../../components/inputs/DatePicker';
import { FileUploader } from '../../components/inputs/FileUploader';
import { Button } from '../../components/actions/Button';
import { AlertBanner } from '../../components/feedback/AlertBanner';
import { Eye, Send, Calendar } from 'lucide-react';

export const AnnouncementCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [scheduleMode, setScheduleMode] = useState('now');
  const [audienceType, setAudienceType] = useState('all-agencies');
  const [showBroadWarning, setShowBroadWarning] = useState(true);

  return (
    <div>
      <PageHeader 
        title="Create Announcement" 
        breadcrumbs={[
          { label: 'Dashboard', onClick: () => navigate('dashboard') },
          { label: 'Announcements', onClick: () => navigate('announcement-list') },
          { label: 'Create' }
        ]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success');  navigate('announcement-list'); }}>Save Draft</Button>
            <Button variant="secondary" leftIcon={<Eye size={16} />}>Preview</Button>
            {showBroadWarning && (
              <Button variant="secondary" onClick={() => alert('Approval request submitted')}>Request Approval</Button>
            )}
            <Button variant="primary" leftIcon={scheduleMode === 'now' ? <Send size={16} /> : <Calendar size={16} />}>
              {scheduleMode === 'now' ? 'Send Now' : 'Schedule'}
            </Button>
          </div>
        }
      />

      {showBroadWarning && (
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <AlertBanner 
            variant="warning" 
            title="Broad Audience Warning" 
            message="You have selected a broad audience (All Agencies). This announcement may require Super Admin approval depending on platform settings." 
          />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
        {/* Main Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Basic Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <FormField label="Announcement Title" required>
                <Input placeholder="Enter a concise title..." />
              </FormField>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Category" required>
                  <Select defaultValue="platform">
                    <option value="platform">Platform Notice</option>
                    <option value="trip">Group Trip Update</option>
                    <option value="finance">Finance Reminder</option>
                    <option value="compliance">Compliance Notice</option>
                  </Select>
                </FormField>
                <FormField label="Priority" required>
                  <Select defaultValue="normal">
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </Select>
                </FormField>
              </div>

              <FormField label="Short Summary">
                <Input placeholder="A brief 1-2 sentence summary for lists..." />
              </FormField>

              <FormField label="Content" required>
                <Textarea 
                  style={{ minHeight: '300px', backgroundColor: 'var(--surface-sunken)' }} 
                  placeholder="Write your announcement content here. Avoid placing sensitive personal data directly in the body." 
                />
              </FormField>
            </div>
          </div>

          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Attachments</h2>
            <FileUploader onUpload={async () => console.log('uploading')} maxSize={5} acceptedFormats={['.pdf', '.jpg', '.png']} />
            <div style={{ marginTop: 'var(--space-4)' }}>
              <FormField label="Link Article">
                <Select defaultValue="">
                  <option value="">Select an Article (Optional)</option>
                  <option value="art1">Essential Guide to Ihram</option>
                  <option value="art2">Saudi Visa Requirements</option>
                </Select>
              </FormField>
            </div>
          </div>

        </div>

        {/* Side Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Audience Targeting</h3>
            
            <FormField label="Audience Type" required>
              <Select value={audienceType} onChange={(e) => {
                setAudienceType(e.target.value);
                setShowBroadWarning(['all-agencies', 'all-jamaah', 'all-mutawwif'].includes(e.target.value));
              }}>
                <option value="all-agencies">All Travel Agencies</option>
                <option value="specific-agency">Specific Travel Agency</option>
                <option value="group-trip">Group Trip Members</option>
                <option value="all-jamaah">All Jamaah</option>
                <option value="specific-jamaah">Specific Jamaah</option>
                <option value="all-mutawwif">All Mutawwif</option>
                <option value="specific-mutawwif">Specific Mutawwif</option>
                <option value="mutawwif-assignment">Mutawwif by Assignment</option>
              </Select>
            </FormField>

            {audienceType === 'group-trip' && (
              <div style={{ marginTop: 'var(--space-4)' }}>
                <FormField label="Select Group Trip" required>
                  <Select>
                    <option>Trip TRP-2026-001 (45 pax)</option>
                    <option>Trip TRP-2026-002 (30 pax)</option>
                  </Select>
                </FormField>
              </div>
            )}

            <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <span className="text-caption text-muted" style={{ display: 'block' }}>Estimated Reach</span>
              <span className="text-body-bold">~150 Recipients</span>
            </div>
          </div>

          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Delivery Channels</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" id="inapp" checked disabled />
                <label htmlFor="inapp" className="text-body">In-App Notification (Required)</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" id="email" defaultChecked />
                <label htmlFor="email" className="text-body">Email</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" id="whatsapp" />
                <label htmlFor="whatsapp" className="text-body">WhatsApp</label>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" id="ack" />
                <label htmlFor="ack" className="text-body">Require Acknowledgement</label>
              </div>
            </div>
          </div>

          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Schedule</h3>
            
            <FormField label="Delivery Time">
              <Select value={scheduleMode} onChange={(e) => setScheduleMode(e.target.value)}>
                <option value="now">Send Now</option>
                <option value="schedule">Schedule for Later</option>
              </Select>
            </FormField>

            {scheduleMode === 'schedule' && (
              <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <FormField label="Date">
                  <DatePicker />
                </FormField>
                <FormField label="Time">
                  <Input type="time" defaultValue="09:00" />
                </FormField>
                <FormField label="Timezone">
                  <Select defaultValue="utc8">
                    <option value="utc8">Asia/Kuala_Lumpur (UTC+8)</option>
                    <option value="utc3">Asia/Riyadh (UTC+3)</option>
                  </Select>
                </FormField>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
