import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { ShieldAlert, Star, AlertTriangle, EyeOff, Archive } from 'lucide-react';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const MutawwifReportDetails: React.FC<{ navigate: (route: string, data?: any) => void, reportId?: string }> = ({ navigate, reportId = 'mr_2' }) => {
  
  // Mock Data
  const report = {
    id: reportId,
    submitter: 'Ustaz Don Daniyal',
    trip: 'TRP-1005 (Custom VIP)',
    agency: 'Zamzam Travels',
    type: 'Incident Report',
    incident: true,
    date: '14 Nov 2026',
    visibility: 'Admin Only',
    ratings: {
      agencyCoordination: 2,
      groupReadiness: 4
    },
    observations: {
      agencyCoordination: 'The transport arranged from Jeddah airport was delayed by 3 hours. Local PIC was unresponsive during the delay.',
      jamaahReadiness: 'Alhamdulillah the family was patient, but the elderly grandfather required emergency wheelchair assistance which was not prepared by the agency.'
    },
    specialAssistance: ['Wheelchair', 'Medical Device'],
    incidentDetails: {
      category: 'Medical & Logistics',
      description: 'Jamaah (Haji Sulaiman) felt faint due to the heat and 3-hour airport delay. We had to source a private medical wheelchair on the spot.',
      followUp: 'Agency needs to reimburse the wheelchair cost (SAR 250) to the Jamaah. Please review local transport provider.'
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star key={star} size={20} fill={star <= rating ? 'var(--color-primary)' : 'none'} className={star <= rating ? "text-primary" : "text-muted"} />
        ))}
        <span className="text-body-bold" style={{ marginLeft: '8px' }}>{rating}/5</span>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Mutawwif Trip Report"
        breadcrumbs={[{ label: 'Operations' }, { label: 'Testimonials', onClick: () => navigate('testimonial-list') }, { label: 'Trip Report' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('testimonial-list')}>Back</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        
        {/* Left Column: Report Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* Warning Banner */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-warning)' }}>
            <EyeOff size={20} className="text-warning" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <span className="text-body-bold text-warning" style={{ display: 'block', marginBottom: '4px' }}>Internal Confidential Report</span>
              <span className="text-caption text-muted">This is an operational report submitted by the Mutawwif. It is not a public testimonial and contains sensitive operational and medical observations.</span>
            </div>
          </div>

          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)' }}>
              <div>
                <h2 className="text-h3" style={{ marginBottom: 'var(--space-2)' }}>{report.submitter}</h2>
                <span className="text-body text-muted">{report.trip} • {report.agency} • {report.date}</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <Badge variant={getStatusBadgeVariant(report.visibility)}>{report.visibility}</Badge>
                <Badge variant={getStatusBadgeVariant(report.type)}>{report.type}</Badge>
              </div>
            </div>

            {report.incident && (
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-danger)', marginBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                  <ShieldAlert size={20} className="text-danger" />
                  <h3 className="text-body-bold text-danger">Incident Flagged: {report.incidentDetails.category}</h3>
                </div>
                <p className="text-body" style={{ marginBottom: 'var(--space-4)' }}>{report.incidentDetails.description}</p>
                <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-3)' }}>
                  <span className="text-caption-bold text-muted" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Follow Up Required:</span>
                  <p className="text-body-bold">{report.incidentDetails.followUp}</p>
                </div>
              </div>
            )}

            {/* Travel Agency Coordination */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <h3 className="text-subsection-title">Travel Agency Coordination</h3>
                {renderStars(report.ratings.agencyCoordination)}
              </div>
              <p className="text-body text-muted">
                "{report.observations.agencyCoordination}"
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-6) 0' }} />

            {/* Jamaah Readiness */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <h3 className="text-subsection-title">Jamaah / Group Observation</h3>
                {renderStars(report.ratings.groupReadiness)}
              </div>
              <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>
                "{report.observations.jamaahReadiness}"
              </p>
              <div>
                <span className="text-caption-bold text-muted" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Special Assistance Needed:</span>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {report.specialAssistance.map(sa => (
                    <Badge key={sa} variant="primary">{sa}</Badge>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-danger)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Incident Escalation</h3>
            
            <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-4)' }}>
              This report contains an active incident flag. Please review the details and escalate to the Support/Operations team if a formal resolution is required.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
               <Button variant="danger" style={{ width: '100%', justifyContent: 'center' }} leftIcon={<AlertTriangle size={16} />}>Escalate to Report/Issue Queue</Button>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-4) 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }} leftIcon={<Archive size={16} />}>Archive & Close Report</Button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
