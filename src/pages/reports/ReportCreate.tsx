// @ts-nocheck
import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Textarea } from '../../components/inputs/Textarea';
import { FileUploader } from '../../components/inputs/FileUploader';
import { Button } from '../../components/actions/Button';

export const ReportCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [senderRole, setSenderRole] = useState('jamaah');
  const [reportedRole, setReportedRole] = useState('agency');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Create / Escalate Report"
        breadcrumbs={[{ label: 'Support & Ops' }, { label: 'Reports', onClick: () => navigate('report-list') }, { label: 'Create' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success'); navigate('report-list'); }}>Cancel</Button>
            <Button onClick={() => navigate('report-list')}>Submit Report</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Section: Roles & Identities */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Roles & Identities</h3>
            
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <FormField label="Creation Source" required>
                <Select 
                  options={[
                    {value: 'manual', label: 'Manual Admin Entry'},
                    {value: 'jamaah_app', label: 'Jamaah Submission'},
                    {value: 'ta_portal', label: 'Travel Agency Submission'},
                    {value: 'mutawwif_app', label: 'Mutawwif Submission'},
                    {value: 'escalation', label: 'Testimonial/Trip Report Escalation'}
                  ]} 
                  value="manual" 
                  onChange={() => {}} 
                />
              </FormField>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>Reporter / Sender</span>
                <FormField label="Sender Role">
                  <Select 
                    options={[
                      {value: 'jamaah', label: 'Jamaah'},
                      {value: 'agency', label: 'Travel Agency'},
                      {value: 'mutawwif', label: 'Mutawwif'},
                      {value: 'admin', label: 'Platform Admin'}
                    ]} 
                    value={senderRole} 
                    onChange={setSenderRole} 
                  />
                </FormField>
                <FormField label="Search Identity" required>
                  <Input placeholder="Enter name or ID..." />
                </FormField>
              </div>

              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>Reported Party</span>
                <FormField label="Target Role">
                  <Select 
                    options={[
                      {value: 'agency', label: 'Travel Agency'},
                      {value: 'mutawwif', label: 'Mutawwif'},
                      {value: 'jamaah', label: 'Jamaah'},
                      {value: 'platform', label: 'Platform Operations'}
                    ]} 
                    value={reportedRole} 
                    onChange={setReportedRole} 
                  />
                </FormField>
                {reportedRole !== 'platform' && (
                  <FormField label="Search Identity" required>
                    <Input placeholder="Enter name or ID..." />
                  </FormField>
                )}
              </div>
            </div>
          </div>

          {/* Section: Issue Details */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Issue Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Category" required>
                  <Select 
                    options={[
                      {value: 'service', label: 'Service & Logistics'},
                      {value: 'document', label: 'Visa & Documents'},
                      {value: 'payment', label: 'Payment & Billing'},
                      {value: 'safety', label: 'Health & Safety'},
                      {value: 'compliance', label: 'Policy Violation'}
                    ]} 
                    value="service" 
                    onChange={() => {}} 
                  />
                </FormField>
                <FormField label="Priority" required>
                  <Select 
                    options={[
                      {value: 'normal', label: 'Normal'},
                      {value: 'important', label: 'Important'},
                      {value: 'urgent', label: 'Urgent'}
                    ]} 
                    value="normal" 
                    onChange={() => {}} 
                  />
                </FormField>
              </div>

              <FormField label="Report Subject" required>
                <Input placeholder="Brief summary of the issue..." />
              </FormField>
              
              <FormField label="Detailed Description" required>
                <Textarea style={{ minHeight: '120px', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)' }} placeholder="Provide a full account of the incident or issue..." />
              </FormField>

              <FormField label="Evidence Attachments">
                <FileUploader 
                  onUpload={async () => { console.log('Uploading'); }} 
                  maxSize={5} 
                  acceptedFormats={['.pdf', '.jpg', '.png', '.mp4']} 
                />
              </FormField>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Section: Links & Context */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Related Context</h3>
            <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-4)' }}>Link this report to an existing record to help the assigned PIC investigate faster.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <FormField label="Related Travel Agency">
                <Input placeholder="Search active agencies..." />
              </FormField>
              <FormField label="Related Group Trip">
                <Input placeholder="TRP-..." />
              </FormField>
              <FormField label="Related Package">
                <Input placeholder="PKG-..." />
              </FormField>
              <FormField label="Related Booking">
                <Input placeholder="BKG-..." />
              </FormField>
              <FormField label="Related Invoice/Payment">
                <Input placeholder="INV-..." />
              </FormField>
            </div>
          </div>
          
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
             <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Visibility</h3>
             <FormField label="Access Control">
                <Select 
                  options={[
                    {value: 'internal', label: 'Internal Only (Admin View)'},
                    {value: 'sender', label: 'Sender Visible'},
                    {value: 'both', label: 'Sender + Reported Party Visible'}
                  ]} 
                  value="internal" 
                  onChange={() => {}} 
                />
             </FormField>
          </div>
        </div>

      </div>
    </div>
  );
};
