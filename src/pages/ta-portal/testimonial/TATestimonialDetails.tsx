import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { HeroHeader } from '../../../components/layout/HeroHeader';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { AuditLogPanel } from '../../../components/domain/AuditLogPanel';
import { Select } from '../../../components/inputs/Select';
import { Input } from '../../../components/inputs/Input';
import { Star, AlertTriangle, MessageSquare } from 'lucide-react';
import { getStatusBadgeVariant } from '../../../utils/badge';

export const TATestimonialDetails: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: any, testimonialId?: string }> = ({ navigate, showToast, testimonialId = 't_1' }) => {
  const [internalNote, setInternalNote] = useState('');
  const [agencyResponse, setAgencyResponse] = useState('');
  
  // Mock Data
  const testimonial = {
    id: testimonialId,
    submitter: 'Ahmad Hassan (Family of 4)',
    trip: 'TRP-1001 (Premium Umrah)',
    mutawwif: 'Ustaz Azhar Idrus',
    consent: 'Consent Given',
    status: 'Approved Public',
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
      { id: 'm1', type: 'image', url: 'https://picsum.photos/seed/701/150/150' },
      { id: 'm2', type: 'image', url: 'https://picsum.photos/seed/680/150/150' }
    ],
    agencyResponse: '', // To be filled by agency
    internalNotes: 'User was upgraded to premium bus.'
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

  const handleSubmitResponse = () => {
    if (showToast) showToast('Response Submitted', 'Your response has been sent to Admin for moderation.', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <HeroHeader
        title="Review Testimonial"
        onBack={() => navigate('ta-testimonial-list')}
        backLabel="Back to Testimonials"
        theme="simple"
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
                <Badge variant={getStatusBadgeVariant(testimonial.status)}>{testimonial.status}</Badge>
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
                <h3 className="text-subsection-title">Travel Agency Experience</h3>
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

        {/* Right Column: TA Notes & Moderation view */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-primary)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Feedback Info</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-caption text-muted">Recommendation</span>
                <Badge variant={getStatusBadgeVariant("Recommends Trip")}>Recommends Trip</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-caption text-muted">Moderation Status</span>
                <span className="text-body-bold text-success">{testimonial.status}</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-4) 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
               <h3 className="text-subsection-title">Agency Internal Notes</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <Input 
                    type="textarea"
                    placeholder="Add an internal note... (Hidden from Jamaah and Platform)"
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                  />
                  <Button variant="outline" size="sm" style={{ alignSelf: 'flex-end' }}>Save Note</Button>
               </div>
               
               {testimonial.internalNotes && (
                 <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                   <span className="text-caption text-muted">Previous Note:</span>
                   <p className="text-body">{testimonial.internalNotes}</p>
                 </div>
               )}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-4) 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
               <h3 className="text-subsection-title">Agency Response</h3>
               <p className="text-caption text-muted">Respond publicly to this testimonial. Your response will be reviewed by the platform admin before it goes live.</p>
               <Input 
                 type="textarea"
                 placeholder="Thank you for your feedback..."
                 value={agencyResponse}
                 onChange={(e) => setAgencyResponse(e.target.value)}
               />
               <Button onClick={handleSubmitResponse} leftIcon={<MessageSquare size={16} />}>Submit Response</Button>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-4) 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
               <p className="text-caption text-muted">If this feedback contains a serious complaint or an issue that needs platform attention, escalate it to support.</p>
               <Button variant="danger" style={{ width: '100%', justifyContent: 'center' }} leftIcon={<AlertTriangle size={16} />} onClick={() => navigate('ta-report-create')}>Escalate to Support</Button>
            </div>

          </div>

          <div>
            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: '1 day ago', actor: 'System', action: 'Testimonial Received', module: 'Testimonial', details: 'Ahmad Hassan submitted End-of-Trip testimonial' }
              ]}
            />
          </div>

        </div>

      </div>

    </div>
  );
};
