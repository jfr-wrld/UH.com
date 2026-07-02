import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { FormField } from '../../../components/inputs/FormField';
import { Input } from '../../../components/inputs/Input';
import { Select } from '../../../components/inputs/Select';
import { Textarea } from '../../../components/inputs/Textarea';
import { DatePicker } from '../../../components/inputs/DatePicker';
import { FileUploader } from '../../../components/inputs/FileUploader';
import { Button } from '../../../components/actions/Button';
import { Eye, Send, Calendar } from 'lucide-react';

export const TAAnnouncementCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: any }> = ({ navigate, showToast }) => {
  const [scheduleMode, setScheduleMode] = useState('now');
  const [audienceType, setAudienceType] = useState('group-trip');

  const handleSave = (status: string) => {
    if (showToast) {
      if (status === 'draft') showToast('Draft Saved', 'Your announcement draft has been saved.', 'success');
      if (status === 'schedule') showToast('Scheduled', 'Your announcement has been scheduled.', 'success');
      if (status === 'sent') showToast('Sent', 'Your announcement is being broadcasted.', 'success');
    }
    navigate('ta-announcement-list');
  };

  return (
    <div style={{ paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Create Announcement" 
        breadcrumbs={[
          { label: 'Announcements', onClick: () => navigate('ta-announcement-list') },
          { label: 'Create' }
        ]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => handleSave('draft')}>Save Draft</Button>
            <Button variant="secondary" leftIcon={<Eye size={16} />}>Preview</Button>
            <Button variant="primary" leftIcon={scheduleMode === 'now' ? <Send size={16} /> : <Calendar size={16} />} onClick={() => handleSave(scheduleMode === 'now' ? 'sent' : 'schedule')}>
              {scheduleMode === 'now' ? 'Send Now' : 'Schedule'}
            </Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', alignItems: 'start', marginTop: 'var(--space-6)' }}>
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
                  <Select defaultValue="general">
                    <option value="general">General Info</option>
                    <option value="trip">Trip Update</option>
                    <option value="document">Document Reminder</option>
                    <option value="finance">Payment Reminder</option>
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
            <FileUploader onFileSelect={(f) => console.log('file:', f)} maxSizeMB={5} accept=".pdf,.jpg,.png" />
            <div style={{ marginTop: 'var(--space-4)' }}>
              <FormField label="Link Article">
                <Select defaultValue="">
                  <option value="">Select an Article (Optional)</option>
                  <option value="art1">Essential Guide to Ihram</option>
                  <option value="art2">Makkah Transport Options</option>
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
              <Select value={audienceType} onChange={(e) => setAudienceType(e.target.value)}>
                <option value="group-trip">Group Trip Members</option>
                <option value="all-jamaah">All Jamaah</option>
                <option value="specific-jamaah">Specific Jamaah</option>
                <option value="agency-staff">Agency Staff</option>
              </Select>
            </FormField>

            {audienceType === 'group-trip' && (
              <div style={{ marginTop: 'var(--space-4)' }}>
                <FormField label="Select Group Trip" required>
                  <Select>
                    <option>Trip TRP-1001 (45 pax)</option>
                    <option>Trip TRP-1002 (30 pax)</option>
                  </Select>
                </FormField>
              </div>
            )}
            
            {audienceType === 'specific-jamaah' && (
              <div style={{ marginTop: 'var(--space-4)' }}>
                <FormField label="Search Jamaah" required>
                  <Input placeholder="Enter Jamaah name or ID..." />
                </FormField>
              </div>
            )}

            <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <span className="text-caption text-muted" style={{ display: 'block' }}>Estimated Reach</span>
              <span className="text-body-bold">~45 Recipients</span>
            </div>
          </div>

          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Delivery Channels</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <label style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                <span className="text-body">In-App Notification (Free)</span>
              </label>
              <label style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                <span className="text-body">Email Notification (Free)</span>
              </label>
              <label style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" />
                <span className="text-body">WhatsApp Push (Requires quota)</span>
              </label>
            </div>
          </div>

          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Schedule</h3>
            
            <FormField label="Delivery Time">
              <Select value={scheduleMode} onChange={(e) => setScheduleMode(e.target.value)}>
                <option value="now">Send Immediately</option>
                <option value="schedule">Schedule for Later</option>
              </Select>
            </FormField>

            {scheduleMode === 'schedule' && (
              <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <FormField label="Date">
                  <DatePicker />
                </FormField>
                <FormField label="Time">
                  <Input type="time" defaultValue="10:00" />
                </FormField>
                <span className="text-caption text-muted">Timezone: Asia/Kuala_Lumpur</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
