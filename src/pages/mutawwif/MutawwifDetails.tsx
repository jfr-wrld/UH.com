import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { VerificationChecklist } from '../../components/domain/VerificationChecklist';
import type { ChecklistStatus } from '../../components/domain/VerificationChecklist';
import { DocumentStatusControl } from '../../components/domain/DocumentStatusControl';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { AuditActionModal } from '../../components/actions/AuditActionModal';
import { SensitiveDataReveal } from '../../components/domain/SensitiveDataReveal';
import { Star, MapPin, Calendar, Briefcase, Award, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const MutawwifDetails: React.FC<{ navigate: (route: string, data?: any) => void, mutawwifId?: string }> = ({ navigate, mutawwifId = 'mut_1' }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [modalState, setModalState] = useState<{isOpen: boolean, targetStatus: string}>({isOpen: false, targetStatus: ''});
  const [mutawwifStatus, setMutawwifStatus] = useState('Active');
  
  const handleConfirmStatusChange = (reason: string) => {
    setMutawwifStatus(modalState.targetStatus);
    setModalState({isOpen: false, targetStatus: ''});
  };

  const { getById } = useLocalStorageCrud('mutawwif');
  
  const [certChecklist, setCertChecklist] = useState<{id: string, label: string, required: boolean, status: ChecklistStatus}[]>([
    { id: 'hajj', label: 'Ministry of Hajj Guide License', required: true, status: 'pass' },
    { id: 'manasik', label: 'Advanced Manasik Training', required: true, status: 'pass' },
    { id: 'firstaid', label: 'Basic First Aid Certificate', required: false, status: 'pending' },
    { id: 'iqama', label: 'Iqama / National ID', required: true, status: 'pass' }
  ]);

  const handleCertStatusChange = (id: string, status: ChecklistStatus) => {
    setCertChecklist(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  // Mock Mutawwif Data
  const mutawwif = getById(mutawwifId) || {
    id: mutawwifId,
    name: 'Unknown Mutawwif',
    email: '-',
    phone: '-',
    jobType: '-',
    location: '-',
    verification: 'Unverified',
    availability: 'Unavailable',
    rating: 0,
    reviews: 0,
    languages: [],
    specializations: [],
    gender: '-',
    dob: '-',
    nationality: '-',
    identityType: '-',
    identityNumber: '-',
    bankName: '-',
    bankAccount: '-'
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'certifications', label: 'Certifications & Documents' },
    { id: 'professional', label: 'Professional Info' },
    { id: 'availability', label: 'Availability & Trips' },
    { id: 'reports', label: 'Trip Reports' },
    { id: 'ratings', label: 'Ratings & Reviews', icon: <Eye size={16} /> },
    { id: 'logs', label: 'Activity Logs' },
  ];
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(tabs);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
            {mutawwif.name.charAt(0)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <h1 className="text-page-title">{mutawwif.name}</h1>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <StatusTransitionMenu 
                currentStatus={mutawwifStatus}
                allowedTransitions={['active', 'on leave', 'inactive']}
                onTransition={(newStatus) => setModalState({isOpen: true, targetStatus: newStatus})}
              />
              <Badge variant={getStatusBadgeVariant(mutawwif.verification)}>{mutawwif.verification}</Badge>
              <Badge variant={getStatusBadgeVariant(mutawwif.availability)}>{mutawwif.availability}</Badge>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--text-secondary)' }}>
                <Star size={14} className="text-warning" fill="currentColor" />
                <span className="text-caption-bold">{mutawwif.rating}</span>
                <span className="text-caption">({mutawwif.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="secondary" onClick={() => navigate('mutawwif-list')}>Back to List</Button>
          <Button>Edit Profile</Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)', minHeight: '400px' }}>
        
        {activeTab === 'profile' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Identity</h3>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Full Name</span>
                <span className="text-body">{mutawwif.name}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Email Address</span>
                <span className="text-body">{mutawwif.email}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Phone Number</span>
                <span className="text-body">{mutawwif.phone}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Operating Location</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                  <MapPin size={16} className="text-muted" />
                  <span className="text-body">{mutawwif.location}</span>
                </div>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Gender & Date of Birth</span>
                <span className="text-body">{mutawwif.gender}, {mutawwif.dob}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Account Details</h3>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Nationality</span>
                <span className="text-body">{mutawwif.nationality}</span>
              </div>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <SensitiveDataReveal
                  label={`Identity Document (${mutawwif.identityType})`}
                  realValue={mutawwif.identityNumber}
                  maskedValue={`C••••••${mutawwif.identityNumber.slice(-2)}`}
                />
              </div>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <SensitiveDataReveal
                  label={`Bank Account (${mutawwif.bankName})`}
                  realValue={mutawwif.bankAccount}
                  maskedValue={`••••••${mutawwif.bankAccount.slice(-4)}`}
                />
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Job Type</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                  <Briefcase size={16} className="text-muted" />
                  <span className="text-body">{mutawwif.jobType}</span>
                </div>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Date Joined</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                  <Calendar size={16} className="text-muted" />
                  <span className="text-body">15 Jan 2025</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <VerificationChecklist 
              title="Professional Certifications & Identity"
              items={certChecklist}
              onStatusChange={handleCertStatusChange}
            />
          </div>
        )}

        {activeTab === 'professional' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Skills & Specializations</h3>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Languages Spoken</span>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {mutawwif.languages.map(l => <Badge key={l} variant="neutral">{l}</Badge>)}
                </div>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Specializations</span>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {mutawwif.specializations.map(s => <Badge key={s} variant="info">{s}</Badge>)}
                </div>
              </div>
              <div style={{ marginTop: 'var(--space-2)' }}>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Total Experience</span>
                <span className="text-body">8 Years as Mutawwif</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Biography</h3>
              <p className="text-body text-muted" style={{ lineHeight: '1.6' }}>
                Ustaz Ahmad Rizal is an experienced Umrah and Hajj guide based in Makkah. He has deep knowledge of Islamic history and Manasik, providing excellent guidance to pilgrims from Indonesia and Malaysia for over 8 years.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'availability' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="text-subsection-title">Current & Upcoming Assignments</h3>
              <Button variant="secondary" size="sm">Manage Schedule</Button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-primary-light)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-body-bold">Umrah Premium Plus (TRP-1001)</span>
                  <Badge variant={getStatusBadgeVariant("Active Trip")}>Active Trip</Badge>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)', color: 'var(--text-muted)' }}>
                  <span className="text-caption">Agency: Zamzam Travels</span>
                  <span className="text-caption">Dates: 10 Dec - 22 Dec 2026</span>
                  <span className="text-caption">Jamaah: 45 pax</span>
                </div>
              </div>
              
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-body-bold">Hajj Packages 2027 (TRP-1005)</span>
                  <Badge variant={getStatusBadgeVariant("Upcoming")}>Upcoming</Badge>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)', color: 'var(--text-muted)' }}>
                  <span className="text-caption">Agency: Makkah Tours</span>
                  <span className="text-caption">Dates: 15 May - 15 Jun 2027</span>
                  <span className="text-caption">Jamaah: 120 pax</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Service History & Payout Data</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: 'none' }}>
                  <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Total Completed Trips</span>
                  <span className="text-heading-3">42</span>
                </div>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: 'none' }}>
                  <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Total Jamaah Guided</span>
                  <span className="text-heading-3">1,840</span>
                </div>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: 'none' }}>
                  <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Pending Payout Status</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                    <CheckCircle2 className="text-success" size={20} />
                    <span className="text-body-bold text-success">Cleared</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-4)' }}>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Leave / Unavailable Dates</h3>
              <p className="text-body text-muted">No upcoming leave scheduled.</p>
            </div>
          </div>
        )}

        {activeTab === 'ratings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 'var(--space-6)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '48px', fontWeight: 'bold' }}>{mutawwif.rating}</span>
                <div style={{ display: 'flex', color: 'var(--color-warning)' }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={20} fill={i <= 4 ? "currentColor" : "none"} />)}
                </div>
                <span className="text-caption text-muted" style={{ marginTop: 'var(--space-2)' }}>Based on {mutawwif.reviews} reviews</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Top Feedback Themes</span>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  <Badge variant={getStatusBadgeVariant("Excellent Knowledge (85%)")}>Excellent Knowledge (85%)</Badge>
                  <Badge variant={getStatusBadgeVariant("Very Patient (72%)")}>Very Patient (72%)</Badge>
                  <Badge variant={getStatusBadgeVariant("Clear Communication (68%)")}>Clear Communication (68%)</Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Recent Reviews</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <span className="text-body-bold">Siti Fatima (Jamaah)</span>
                    <div style={{ display: 'flex', color: 'var(--color-warning)' }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                  <p className="text-body">Ustaz Ahmad was very helpful and patient during our Sai. He explained everything clearly and made sure the elderly in our group were comfortable.</p>
                  <span className="text-caption text-muted" style={{ display: 'block', marginTop: 'var(--space-2)' }}>Trip: TRP-1001 • 12 Dec 2026</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <h3 className="text-subsection-title">Internal Trip Reports</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-body-bold">Umrah Premium Plus (TRP-1001)</span>
                  <Badge variant={getStatusBadgeVariant("Incident Reported")}>Incident Reported</Badge>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                  <span className="text-caption">Type: Incident Report</span>
                  <span className="text-caption">Submitted: 15 Dec 2026</span>
                </div>
                <p className="text-body text-muted" style={{ borderLeft: '3px solid var(--color-warning)', paddingLeft: 'var(--space-3)' }}>
                  Jamaah member required minor medical assistance at hotel. Issue was resolved successfully with agency coordination.
                </p>
                <div style={{ marginTop: 'var(--space-3)' }}>
                  <Button variant="secondary" size="sm">View Full Report</Button>
                </div>
              </div>

              <div style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-body-bold">Hajj Special (TRP-0992)</span>
                  <Badge variant={getStatusBadgeVariant("End Trip Report")}>End Trip Report</Badge>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)', color: 'var(--text-muted)' }}>
                  <span className="text-caption">Type: End Trip Report</span>
                  <span className="text-caption">Submitted: 25 Jul 2026</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: '2 days ago', actor: 'Compliance Officer', action: 'Verified Document', module: 'Verification', details: 'Manasik Training Certificate' },
                { id: '2', timestamp: '1 week ago', actor: 'Operations Admin', action: 'Assigned to Group Trip', module: 'Group Trip Management', details: 'TRP-1001' },
                { id: '3', timestamp: '1 month ago', actor: 'Ustaz Ahmad Rizal', action: 'Updated Profile', module: 'Mutawwif Portal', details: 'Changed phone number' }
              ]}
            />
          </div>
        )}

      </div>
      <AuditActionModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({isOpen: false, targetStatus: ''})}
        onConfirm={handleConfirmStatusChange}
        title={`Change Status to ${modalState.targetStatus}`}
        message="Please provide a reason for this status change."
        actionLabel="Update Status"
        entityName={mutawwif.name}
      />
    </div>
  );
};
