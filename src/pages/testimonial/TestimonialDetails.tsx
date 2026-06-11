import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { ApprovalDecisionBar } from '../../components/domain/ApprovalDecisionBar';
import { Select } from '../../components/inputs/Select';
import { Star, CheckCircle, EyeOff, Archive, AlertTriangle, Image as ImageIcon } from 'lucide-react';

export const TestimonialDetails: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: any, testimonialId?: string }> = ({ navigate, showToast, testimonialId = 't_1' }) => {
  const [status, setStatus] = useState('Pending Review');
  const [visibility, setVisibility] = useState('Hidden');

  // Mock Data
  const testimonial = {
    id: testimonialId,
    submitter: 'Ahmad Hassan (Family of 4)',
    trip: 'TRP-1001 (Premium Umrah)',
    agency: 'Zamzam Travels',
    mutawwif: 'Ustaz Azhar Idrus',
    consent: 'Consent Given',
    status: status,
    visibility: visibility,
    date: '10 Nov 2026',
    recommend: 'Yes',
    ratings: {
      overall: 5,
      agency: 4,
      mutawwif: 5
    },
    comments: {
      overall: 'Alhamdulillah, an incredibly smooth and spiritually fulfilling journey. Everything was well taken care of.',
      agency: 'Communication before the trip was good, though visa processing was slightly delayed. Overall very reliable.',
      mutawwif: 'Ustaz Azhar was exceptional. His lectures were deep and he was extremely patient with the elderly in our group.',
      general: 'I highly recommend this package to anyone taking their family for the first time. Truly a blessing.'
    },
    media: [
      { id: 'm1', type: 'image', url: 'https://images.unsplash.com/photo-1565552643952-b13c8f8cd83b?w=150&h=150&fit=crop' },
      { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?w=150&h=150&fit=crop' }
    ]
  };

  const renderStars = (rating: number) => {
    return (
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star key={star} size={20} fill={star <= rating ? 'var(--color-warning)' : 'none'} className={star <= rating ? "text-warning" : "text-muted"} />
        ))}
        <span className="text-body-bold" style={{ marginLeft: '8px' }}>{rating}/5</span>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Review Testimonial"
        breadcrumbs={[{ label: 'Operations' }, { label: 'Testimonials', onClick: () => navigate('testimonial-list') }, { label: 'Review' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('testimonial-list')}>Back</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        
        {/* Left Column: Testimonial Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)' }}>
              <div>
                <h2 className="text-h3" style={{ marginBottom: 'var(--space-2)' }}>{testimonial.submitter}</h2>
                <span className="text-body text-muted">{testimonial.trip} • {testimonial.date}</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <Badge variant={status === 'Approved' ? 'success' : status === 'Pending Review' ? 'warning' : 'danger'}>{status}</Badge>
                {status === 'Approved' && (
                  <Badge variant={visibility === 'Public' ? 'primary' : 'neutral'}>{visibility}</Badge>
                )}
              </div>
            </div>

            {/* Overall Rating Section */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <h3 className="text-subsection-title">Overall Trip Experience</h3>
                {renderStars(testimonial.ratings.overall)}
              </div>
              <p className="text-body" style={{ fontStyle: 'italic', backgroundColor: 'var(--surface-sunken)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
                "{testimonial.comments.overall}"
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-6) 0' }} />

            {/* Travel Agency Section */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <div>
                  <h3 className="text-subsection-title">Travel Agency Experience</h3>
                  <span className="text-caption text-muted">{testimonial.agency}</span>
                </div>
                {renderStars(testimonial.ratings.agency)}
              </div>
              <p className="text-body text-muted">
                "{testimonial.comments.agency}"
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-6) 0' }} />

            {/* Mutawwif Section */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <div>
                  <h3 className="text-subsection-title">Mutawwif Service</h3>
                  <span className="text-caption text-muted">{testimonial.mutawwif}</span>
                </div>
                {renderStars(testimonial.ratings.mutawwif)}
              </div>
              <p className="text-body text-muted">
                "{testimonial.comments.mutawwif}"
              </p>
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-6) 0' }} />

            {/* Public General Testimonial */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
               <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>General Testimonial (For Public Display)</h3>
               <p className="text-body-bold" style={{ fontSize: '16px', lineHeight: '1.5' }}>
                "{testimonial.comments.general}"
               </p>
            </div>

            {/* Media Section */}
            {testimonial.media.length > 0 && (
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Attached Media</h3>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  {testimonial.media.map(m => (
                    <div key={m.id} style={{ width: '150px', height: '150px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden', backgroundImage: `url(${m.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Moderation panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-primary)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Moderation & Visibility</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-caption text-muted">Recommendation</span>
                <Badge variant="success">Recommends Trip</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-caption text-muted">User Consent</span>
                <span className="text-body-bold text-success">{testimonial.consent}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <span className="text-caption text-muted">Visibility Settings</span>
              <Select 
                options={[
                  { value: 'Public', label: 'Public Display' },
                  { value: 'Hidden', label: 'Hidden (Internal Only)' }
                ]}
                value={visibility}
                onChange={(val) => {
                  setVisibility(val);
                  if (showToast) showToast('Visibility Updated', `Testimonial is now ${val}`, 'success');
                }}
              />
              <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }} leftIcon={<Archive size={16} />}>Archive Feedback</Button>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-4) 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
               <p className="text-caption text-muted">If the user raised a serious issue or complaint in their feedback, you can escalate it.</p>
               <Button variant="danger" style={{ width: '100%', justifyContent: 'center' }} leftIcon={<AlertTriangle size={16} />}>Escalate to Support</Button>
            </div>

          </div>

          <div>
            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: '2 hours ago', actor: 'Operations Admin', action: 'Status Changed', module: 'Testimonial', details: 'Marked as Pending Review' },
                { id: '2', timestamp: '1 day ago', actor: 'System', action: 'Testimonial Submitted', module: 'Testimonial', details: 'Ahmad Hassan submitted End-of-Trip testimonial' }
              ]}
            />
          </div>

        </div>

      </div>

      {status === 'Pending Review' && (
        <ApprovalDecisionBar 
          onApprove={() => { setStatus('Approved'); setVisibility('Public'); if(showToast) showToast('Approved', 'Testimonial is now approved for public display.', 'success'); }}
          onReject={() => { setStatus('Rejected'); if(showToast) showToast('Rejected', 'Testimonial has been rejected.', 'error'); }}
          onRevise={() => { setStatus('Draft'); if(showToast) showToast('Revision Requested', 'Sent revision request to user.', 'warning'); }}
        />
      )}
    </div>
  );
};
