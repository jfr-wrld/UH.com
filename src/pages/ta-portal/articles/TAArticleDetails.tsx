import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { Bookmark, ExternalLink, Share2, ArrowLeft, Tag } from 'lucide-react';

export const TAArticleDetails: React.FC<{ navigate: (route: string, data?: any) => void, id?: string }> = ({ navigate, id = 'ART-001' }) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div style={{ paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Article Reader" 
        breadcrumbs={[
          { label: 'Knowledge Base', onClick: () => navigate('ta-knowledge-base') },
          { label: 'Browse', onClick: () => navigate('ta-article-list') },
          { label: id }
        ]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" leftIcon={<Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />} onClick={() => setBookmarked(!bookmarked)}>
              {bookmarked ? 'Bookmarked' : 'Save Bookmark'}
            </Button>
            <Button variant="secondary" leftIcon={<Share2 size={16} />}>Copy Share Link</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: 'var(--space-6)', alignItems: 'start', marginTop: 'var(--space-6)' }}>
        
        {/* Article Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ padding: 'var(--space-8)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <Badge variant="info">Visas & Documents</Badge>
              <span className="text-caption text-muted" style={{ display: 'flex', alignItems: 'center' }}>5 min read • Updated 10 Nov 2026</span>
            </div>

            <h1 className="text-h1" style={{ marginBottom: 'var(--space-6)', color: 'var(--color-primary-dark)' }}>
              New Visa Regulations for 2027 Season
            </h1>

            <div className="text-body" style={{ lineHeight: 1.6, color: 'var(--color-text-neutral)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <p>
                The Ministry of Hajj and Umrah has announced new visa regulations effective starting the upcoming 2027 season (1 Muharram 1448H). Travel Agencies must strictly adhere to the updated biometric and documentation guidelines to prevent delays in visa processing for their Jamaah.
              </p>
              
              <h3 className="text-h3" style={{ marginTop: 'var(--space-4)' }}>1. Mandatory Biometric Verification via Saudi Visa Bio App</h3>
              <p>
                All applicants must complete their fingerprint and facial biometrics via the official Saudi Visa Bio application before submitting their visa requests through the portal. The biometric validity is now restricted to 6 months from the date of capture.
              </p>

              <h3 className="text-h3" style={{ marginTop: 'var(--space-4)' }}>2. Digital Passport Requirements</h3>
              <p>
                Passports must be scanned in high resolution (minimum 300 DPI) and must be completely legible. The MRZ (Machine Readable Zone) at the bottom of the passport data page must not have any glare or shadows.
              </p>
              
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-warning)' }}>
                <strong>Important Note:</strong> Applications with blurred passport uploads will be automatically rejected by the automated screening system, incurring a 24-hour penalty period before a resubmission is allowed.
              </div>

              <h3 className="text-h3" style={{ marginTop: 'var(--space-4)' }}>3. Group Submissions</h3>
              <p>
                When submitting group visas, Travel Agencies must ensure that the designated Mahram is clearly linked within the system before initiating the payment batch. 
              </p>
            </div>
            
          </div>
        </div>

        {/* Article Metadata Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ padding: 'var(--space-5)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>About this Article</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Author</span>
                <span className="text-body-bold">Platform Ops</span>
              </div>
              
              <div>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Tags</span>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  <Badge variant="neutral"><Tag size={12} style={{ marginRight: '4px' }} />Policy</Badge>
                  <Badge variant="neutral"><Tag size={12} style={{ marginRight: '4px' }} />Visa</Badge>
                  <Badge variant="warning"><Tag size={12} style={{ marginRight: '4px' }} />Important</Badge>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Did you find this helpful?</span>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <Button variant="outline" size="sm" style={{ flex: 1 }}>Yes</Button>
                  <Button variant="outline" size="sm" style={{ flex: 1 }}>No</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
