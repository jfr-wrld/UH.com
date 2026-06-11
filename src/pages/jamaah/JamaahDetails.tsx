import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { DocumentStatusControl } from '../../components/domain/DocumentStatusControl';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { SensitiveDataReveal } from '../../components/domain/SensitiveDataReveal';
import { CheckCircle2, UserPlus, ChevronRight } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';

export const JamaahDetails: React.FC<{ navigate: (route: string, data?: any) => void, jamaahId?: string }> = ({ navigate, jamaahId = 'jm_1' }) => {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock Jamaah Data
  const jamaah = {
    id: jamaahId,
    name: 'Muhammad Ali',
    email: 'm.ali@example.com',
    phone: '+62 812 3456 7890',
    gender: 'Male',
    dob: '12 Aug 1985',
    country: 'Indonesia',
    nationality: 'Indonesian',
    identityType: 'Passport',
    passport: 'A1234567',
    status: 'Ready for Departure',
    agency: 'Zamzam Travels',
    trip: 'Umrah Premium Dec (TRP-1001)',
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'documents', label: 'Documents' },
    { id: 'travel', label: 'Travel & Booking' },
    { id: 'payment', label: 'Payment Tracking' },
    { id: 'family', label: 'Family / Emergency Contact' },
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
            {jamaah.name.charAt(0)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <h1 className="text-page-title">{jamaah.name}</h1>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <span className="text-body text-muted">{jamaah.email}</span>
              <span className="text-body text-muted">{jamaah.phone}</span>
              <Badge variant="success">{jamaah.status}</Badge>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="secondary" onClick={() => navigate('jamaah-list')}>Back to List</Button>
          <Button>Edit Jamaah</Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)', minHeight: '400px' }}>
        
        {activeTab === 'profile' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Personal Information</h3>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Full Name</span>
                <span className="text-body">{jamaah.name}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Gender</span>
                  <span className="text-body">{jamaah.gender}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Date of Birth</span>
                  <span className="text-body">{jamaah.dob}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Nationality</span>
                  <span className="text-body">{jamaah.nationality}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Country</span>
                  <span className="text-body">{jamaah.country}</span>
                </div>
              </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Identity Document ({jamaah.identityType})</span>
                  <SensitiveDataReveal label="Identity Number" realValue={jamaah.passport} onReveal={() => console.log('Revealed identity')} />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <h3 className="text-subsection-title">Additional Information</h3>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Marital Status</span>
                  <span className="text-body">Married</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Address Details</span>
                  <span className="text-body" style={{ display: 'block' }}>Jl. Sudirman No. 123</span>
                  <span className="text-body" style={{ display: 'block' }}>Jakarta Selatan, DKI Jakarta 12190</span>
                  <span className="text-body" style={{ display: 'block' }}>Indonesia</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', gridColumn: '1 / -1', marginTop: 'var(--space-4)' }}>
                <h3 className="text-subsection-title">Internal Notes</h3>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <span className="text-body-bold">Requires early visa processing</span>
                    <Badge variant="warning">High Priority</Badge>
                  </div>
                  <p className="text-body text-muted">Jamaah requested early visa processing due to previous travel history issues. Assigned to Operations Team.</p>
                  <span className="text-caption text-muted" style={{ display: 'block', marginTop: 'var(--space-2)' }}>Added by Operations Admin on 01 Nov 2026</span>
                </div>
              </div>
            </div>
          )}

        {activeTab === 'documents' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
            <DocumentStatusControl documentName="Passport (Scanned Copy)" required status="Verified" onStatusChange={(s) => console.log(s)} />
            <DocumentStatusControl documentName="Umrah Visa" required status="Pending" onStatusChange={(s) => console.log(s)} />
            <DocumentStatusControl documentName="Meningitis Vaccine Certificate" required status="Submitted" onStatusChange={(s) => console.log(s)} />
          </div>
        )}

        {activeTab === 'travel' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Current Assignments</h3>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Travel Agency</span>
                <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{jamaah.agency}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Group Trip</span>
                <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{jamaah.trip}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Preferences & Special Needs</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Room Preference</span>
                  <span className="text-body">Quad Room (with Family)</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Seating Preference</span>
                  <span className="text-body">Aisle</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Language Preference</span>
                  <span className="text-body">Indonesian, Basic English</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Dietary Requirements</span>
                  <span className="text-body">None</span>
                </div>
              </div>
              <div style={{ marginTop: 'var(--space-2)' }}>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Medical Notes / Special Needs</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                  <Badge variant="warning" style={{ width: 'fit-content' }}>Wheelchair Assistance</Badge>
                  <span className="text-body text-muted">Requires wheelchair assistance at airport.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <h3 className="text-subsection-title">Payment Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-caption text-muted">Total Package Price</span>
                <span className="text-body-bold" style={{ display: 'block', fontSize: '20px' }}>$2,500</span>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-caption text-muted">Amount Paid</span>
                <span className="text-body-bold text-success" style={{ display: 'block', fontSize: '20px' }}>$2,500</span>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-caption text-muted">Remaining Balance</span>
                <span className="text-body-bold" style={{ display: 'block', fontSize: '20px' }}>$0</span>
              </div>
            </div>
            <div>
              <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>Invoices</span>
              <p className="text-body text-muted">Invoice INV-9021 fully paid. Verification completed by Finance Admin.</p>
            </div>
          </div>
        )}

        {activeTab === 'family' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="text-subsection-title">Emergency Contact</h3>
                <Button variant="ghost" size="sm" leftIcon={<UserPlus size={16} />}>Add Contact</Button>
              </div>
              <div style={{ padding: 'var(--space-4)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-body-bold" style={{ display: 'block' }}>Aisha Fatima (Wife)</span>
                <span className="text-body text-muted">+62 812 9876 5432</span>
                <Badge variant="info" style={{ marginTop: 'var(--space-2)' }}>Primary Contact</Badge>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="text-subsection-title">Linked Family / Mahram</h3>
                <Button variant="secondary" size="sm" leftIcon={<UserPlus size={16} />}>Link Jamaah</Button>
              </div>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-info)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>S</div>
                <div style={{ flex: 1 }}>
                  <span className="text-body-bold" style={{ display: 'block' }}>Siti Fatima</span>
                  <span className="text-caption text-muted">Relationship: Wife • Purpose: Rooming, Mahram • jm_2</span>
                </div>
                <Badge variant="success">Ready for Departure</Badge>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: '2 hours ago', actor: 'Finance Admin', action: 'Verified Payment', module: 'Finance & Billing', details: 'INV-9021' },
                { id: '2', timestamp: '1 day ago', actor: 'Operations Admin', action: 'Assigned to Group Trip', module: 'Group Trip Management', details: 'TRP-1001' },
                { id: '3', timestamp: '1 week ago', actor: 'Muhammad Ali', action: 'Uploaded Passport', module: 'Jamaah Portal', details: 'File: passport_scan.pdf' }
              ]}
            />
          </div>
        )}

      </div>
    </div>
  );
};
