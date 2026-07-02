import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { HeroHeader } from '../../../components/layout/HeroHeader';
import { Input } from '../../../components/inputs/Input';
import { Select } from '../../../components/inputs/Select';
import { Button } from '../../../components/actions/Button';
import { FileUploader } from '../../../components/inputs/FileUploader';
import { Save, AlertCircle } from 'lucide-react';

export const TAReportCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: any }> = ({ navigate, showToast }) => {
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Operations',
    priority: 'Normal',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showToast) showToast('Ticket Created', 'Your support ticket has been submitted successfully.', 'success');
    navigate('ta-report-list');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Create Support Ticket"
        subtitle="Submit a new issue, request, or escalation to the platform admin."
        breadcrumbs={[{ label: 'Support & Tickets', onClick: () => navigate('ta-report-list') }, { label: 'Create Ticket' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('ta-report-list')}>Cancel</Button>
            <Button onClick={handleSubmit} leftIcon={<Save size={16} />}>Submit Ticket</Button>
          </div>
        }
      />

      <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        
        <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--glass-shadow)', border: 'none' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            
            <Input 
              label="Subject"
              placeholder="E.g., Issue with visa processing for Jamaah Ali"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <Select 
                label="Category"
                value={formData.category}
                onChange={(val) => setFormData({ ...formData, category: val })}
                options={[
                  { value: 'Operations', label: 'Operations & Logistics' },
                  { value: 'Visas & Documents', label: 'Visas & Documents' },
                  { value: 'Finance & Payments', label: 'Finance & Payments' },
                  { value: 'Technical', label: 'System / Technical Issue' },
                  { value: 'Other', label: 'Other' },
                ]}
              />
              <Select 
                label="Priority"
                value={formData.priority}
                onChange={(val) => setFormData({ ...formData, priority: val })}
                options={[
                  { value: 'Normal', label: 'Normal' },
                  { value: 'Important', label: 'Important' },
                  { value: 'Urgent', label: 'Urgent (SLA < 4 Hours)' },
                ]}
              />
            </div>

            {formData.priority === 'Urgent' && (
              <div style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-3)', backgroundColor: 'var(--color-danger-light)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)' }}>
                <AlertCircle size={20} />
                <span className="text-body-bold">Please only use Urgent priority for emergencies affecting active trips.</span>
              </div>
            )}

            <div>
              <Input 
                label="Description"
                type="textarea"
                placeholder="Provide detailed context and any relevant IDs (Package ID, Booking ID, etc)..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <span className="text-caption text-muted" style={{ marginTop: 'var(--space-1)', display: 'block' }}>
                Note: In future phases, you will be able to directly link this ticket to specific bookings or packages.
              </span>
            </div>

            <div>
              <label className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Attachments (Optional)</label>
              <FileUploader 
                onFileSelect={(f) => console.log(f)}
                maxSizeMB={5}
                accept=".jpg,.png,.pdf"
              />
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-2) 0' }} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-4)' }}>
              <Button variant="outline" type="button" onClick={() => navigate('ta-report-list')}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
