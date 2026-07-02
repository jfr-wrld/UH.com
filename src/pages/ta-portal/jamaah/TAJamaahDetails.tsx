import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { HeroHeader } from '../../../components/layout/HeroHeader';
import { Tabs } from '../../../components/navigation/Tabs';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { DataTable } from '../../../components/data-display/DataTable';
import { FormField } from '../../../components/inputs/FormField';
import { Input } from '../../../components/inputs/Input';
import { Select } from '../../../components/inputs/Select';
import { Timeline } from '../../../components/data-display/Timeline';
import { AttachmentList } from '../../../components/data-display/AttachmentList';
import { 
  User, MapPin, Phone, Mail, FileText, CheckCircle, Clock, AlertTriangle, 
  MessageSquare, Briefcase, CreditCard, Save, Calendar, Users, Activity,
  FileDigit, Send, ChevronLeft, BadgeCheck
} from 'lucide-react';
import { useLocalStorageCrud } from '../../../hooks/useLocalStorageCrud';

export const TAJamaahDetails: React.FC<{ navigate: (route: string, data?: any) => void, jamaahId?: string }> = ({ navigate, jamaahId }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Dummy jamaah data based on id
  const { data } = useLocalStorageCrud('ta-jamaah');
  const jamaah = data.find((j: any) => j.id === jamaahId) || {
    id: jamaahId || '1',
    name: 'Ahmad Fauzi',
    phone: '+60 12-345-6789',
    email: 'ahmad.fauzi@example.com',
    status: 'Ready for Departure',
    docStatus: 'Verified',
    paymentStatus: 'Paid',
    joinDate: '2026-06-15',
    gender: 'Male',
    country: 'Malaysia'
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'personal', label: 'Personal Info' },
    { id: 'identity', label: 'Identity & Passport' },
    { id: 'emergency', label: 'Emergency Contact' },
    { id: 'documents', label: 'Documents' },
    { id: 'family', label: 'Family / Group' },
    { id: 'history', label: 'Booking & Trip History' },
    { id: 'finance', label: 'Payment Summary' },
    { id: 'logs', label: 'Activity Logs' }
  ];

  const renderOverview = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
            <h4 className="text-body-bold" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}><Briefcase size={16} className="text-primary" /> Active Booking</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div><span className="text-caption text-muted" style={{ display: 'block' }}>Package</span><span className="text-body-bold">{jamaah.package || '-'}</span></div>
              <div><span className="text-caption text-muted" style={{ display: 'block' }}>Booking ID</span><span className="text-body">{jamaah.booking || '-'}</span></div>
              <div><span className="text-caption text-muted" style={{ display: 'block' }}>Payment</span><Badge variant={jamaah.paymentStatus === 'Paid' ? 'success' : 'warning'} size="sm">{jamaah.paymentStatus}</Badge></div>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
            <h4 className="text-body-bold" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}><Calendar size={16} className="text-primary" /> Active Group Trip</h4>
            {jamaah.groupTrip !== 'Unassigned' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div><span className="text-caption text-muted" style={{ display: 'block' }}>Trip Code</span><span className="text-body-bold">{jamaah.groupTrip}</span></div>
                <div><span className="text-caption text-muted" style={{ display: 'block' }}>Departure</span><span className="text-body">15 Dec 2026</span></div>
                <div><span className="text-caption text-muted" style={{ display: 'block' }}>Mutawwif</span><span className="text-body">Ustaz Don</span></div>
              </div>
            ) : (
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <span className="text-body text-muted">Not assigned to any trip yet.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h3 className="text-subsection-title">Personal Information</h3>
        <Button variant="secondary" leftIcon={<Save size={16} />}>Save Changes</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Full Name">
            <Input defaultValue={jamaah.name} />
          </FormField>
          <FormField label="Surname (Optional)">
            <Input placeholder="Surname" />
          </FormField>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Email Address">
            <Input type="email" defaultValue={jamaah.email} />
          </FormField>
          <FormField label="Phone Number">
            <Input type="tel" defaultValue={jamaah.phone} />
          </FormField>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Date of Birth">
            <Input type="date" defaultValue="1985-10-15" />
          </FormField>
          <FormField label="Gender">
            <Select options={[{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}]} value={jamaah.gender} />
          </FormField>
          <FormField label="Nationality">
            <Select options={[{value: 'Malaysia', label: 'Malaysia'}, {value: 'Singapore', label: 'Singapore'}, {value: 'Indonesia', label: 'Indonesia'}]} value={jamaah.country} />
          </FormField>
        </div>

        <FormField label="Address">
          <textarea className="input-base" rows={3} defaultValue="No 12, Jalan Utama, Taman Bunga, 50000 Kuala Lumpur" style={{ width: '100%', minWidth: '100%' }}></textarea>
        </FormField>
      </div>
    </div>
  );

  const renderIdentity = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h3 className="text-subsection-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><FileDigit size={20} /> Identity Card</h3>
          <Badge variant="success">Verified</Badge>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="ID Type">
            <Select options={[{value: 'NRIC', label: 'NRIC (MyKad)'}]} value="NRIC" />
          </FormField>
          <FormField label="ID Number">
            <div style={{ position: 'relative' }}>
              <Input type="password" defaultValue="851015-14-5555" />
              <button style={{ position: 'absolute', right: '12px', top: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }} className="text-caption-bold">Reveal</button>
            </div>
          </FormField>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h3 className="text-subsection-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><Briefcase size={20} /> Passport Details</h3>
          <Badge variant="success">Verified</Badge>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Passport Number">
            <div style={{ position: 'relative' }}>
              <Input type="password" defaultValue="A12345678" />
              <button style={{ position: 'absolute', right: '12px', top: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }} className="text-caption-bold">Reveal</button>
            </div>
          </FormField>
          <FormField label="Passport Country">
            <Select options={[{value: 'Malaysia', label: 'Malaysia'}]} value="Malaysia" />
          </FormField>
          <FormField label="Issue Date">
            <Input type="date" defaultValue="2024-01-15" />
          </FormField>
          <FormField label="Expiry Date">
            <Input type="date" defaultValue="2029-01-14" />
          </FormField>
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
        <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Booking History</h3>
        <div className="data-table-container">
          <table className="data-table text-body">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Package</th>
                <th>Schedule</th>
                <th>Room Type</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="text-body-bold" style={{ color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => navigate('ta-booking-details', { id: jamaah.booking })}>{jamaah.booking}</span></td>
                <td>{jamaah.package}</td>
                <td>15 Dec 2026</td>
                <td>Double</td>
                <td><Badge variant="success">Confirmed</Badge></td>
                <td><Badge variant="success">Paid</Badge></td>
              </tr>
              <tr>
                <td><span className="text-body-bold" style={{ color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => navigate('ta-booking-details', { id: 'BK-AH-OLD' })}>BK-AH-OLD</span></td>
                <td>Umrah Reguler 2024</td>
                <td>10 Oct 2024</td>
                <td>Quad</td>
                <td><Badge variant="neutral">Completed</Badge></td>
                <td><Badge variant="neutral">Paid</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
        <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Group Trip History</h3>
        <div className="data-table-container">
          <table className="data-table text-body">
            <thead>
              <tr>
                <th>Group Trip Code</th>
                <th>Package</th>
                <th>Departure</th>
                <th>Mutawwif</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jamaah.groupTrip !== 'Unassigned' && (
                <tr>
                  <td><span className="text-body-bold" style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>{jamaah.groupTrip}</span></td>
                  <td>{jamaah.package}</td>
                  <td>15 Dec 2026</td>
                  <td>Ustaz Don</td>
                  <td><Badge variant="info">Active</Badge></td>
                </tr>
              )}
              <tr>
                <td><span className="text-body-bold" style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>GRP-UMR-2024</span></td>
                <td>Umrah Reguler 2024</td>
                <td>10 Oct 2024</td>
                <td>Ustaz Azhar</td>
                <td><Badge variant="neutral">Completed</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <HeroHeader
        title={<span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{jamaah.name} {jamaah.docStatus === 'Verified' && <BadgeCheck className="text-primary" size={24} style={{ color: 'var(--color-primary)' }} />}</span>}
        onBack={() => navigate('ta-jamaah-list')}
        backLabel="Back to Jamaah List"
        coverImageUrl="https://images.unsplash.com/photo-1590418606746-018840f988f0?q=80&w=1200&auto=format&fit=crop"
        avatarUrl={`https://ui-avatars.com/api/?name=${encodeURIComponent(jamaah.name)}&background=random&color=fff&size=80`}
        badges={[
          <Badge key="1" variant={jamaah.status === 'Ready for Departure' || jamaah.status === 'In Trip' ? 'success' : 'warning'} style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>{jamaah.status}</Badge>,
          <Badge key="2" variant="info" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>Docs: {jamaah.docStatus}</Badge>
        ]}
        subtitle={
          <span style={{ opacity: 0.9 }}>{jamaah.email} • {jamaah.phone}</span>
        }
        actions={
          <>
            <Button variant="secondary" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} leftIcon={<MessageSquare size={16} />}>Message</Button>
            <Button variant="primary" leftIcon={<FileText size={16} />}>Edit Profile</Button>
          </>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ marginTop: 'var(--space-2)' }}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'personal' && renderPersonalInfo()}
        {activeTab === 'identity' && renderIdentity()}
        {activeTab === 'history' && renderHistory()}
        
        {/* Placeholders for other tabs to show they exist */}
        {['emergency', 'documents', 'family', 'finance', 'logs'].includes(activeTab) && (
          <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-8)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', textAlign: 'center' }}>
            <Activity size={40} style={{ color: 'var(--gray-300)', marginBottom: 'var(--space-3)' }} />
            <h3 className="text-subsection-title">{tabs.find(t => t.id === activeTab)?.label}</h3>
            <p className="text-body text-muted" style={{ marginTop: 'var(--space-2)' }}>This section contains {activeTab} data mapped from the PRD.</p>
          </div>
        )}
      </div>
    </div>
  );
};
