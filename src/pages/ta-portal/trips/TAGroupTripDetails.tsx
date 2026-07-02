import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { HeroHeader } from '../../../components/layout/HeroHeader';
import { Tabs } from '../../../components/navigation/Tabs';
import { Button } from '../../../components/actions/Button';
import { Badge } from '../../../components/data-display/Badge';
import { DataTable } from '../../../components/data-display/DataTable';
import { getStatusBadgeVariant } from '../../../utils/badge';
import { Input } from '../../../components/inputs/Input';
import { UserProfileCell } from '../../../components/data-display/UserProfileCell';
import { TAAssignMutawwifModal } from '../mutawwif/TAAssignMutawwifModal';
import { AlertTriangle, Users, Map, Calendar, Plane, Building2, UserCheck, CheckCircle2, MoreVertical, FileText, Upload, Briefcase, Activity, MessageCircle } from 'lucide-react';

export const TAGroupTripDetails: React.FC<{ navigate: (route: string, data?: any) => void, tripId?: string, showToast: (title: string, description?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, tripId = 'TRP-1001', showToast }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Shared status taxonomy across roles: planning, scheduled, upcoming, active, completed
  const trip = {
    id: tripId,
    name: 'Premium Umrah Safwa',
    category: 'Umrah',
    status: 'scheduled', 
    package: 'Umrah Premium 12D/10N',
    departureDate: '15 Dec 2026',
    returnDate: '27 Dec 2026',
    members: 45,
    readiness: 'Warning', // Due to pending documents
    mutawwif: {
      name: 'Ustaz Ahmad',
      status: 'active',
      handoverInfo: 'Scheduled handover to Ustaz Karim on Day 7' // Mutawwif handover sync
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Briefcase size={16} /> },
    { id: 'members', label: 'Members', icon: <Users size={16} /> },
    { id: 'itinerary', label: 'Itinerary', icon: <Map size={16} /> },
    { id: 'mutawwif', label: 'Mutawwif', icon: <UserCheck size={16} /> },
    { id: 'hotel', label: 'Hotel', icon: <Building2 size={16} /> },
    { id: 'flight', label: 'Flight', icon: <Plane size={16} /> }
  ];

  const handleAction = () => {
    showToast('Info', 'Action triggered', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <HeroHeader
        title={trip.name}
        subtitle={`${trip.package} • ${trip.departureDate} - ${trip.returnDate}`}
        theme="simple"
        onBack={() => navigate('ta-trip-list')}
        backLabel="Back to Trips"
        badges={[
          <Badge key="status" variant={getStatusBadgeVariant(trip.status)}>{trip.status}</Badge>,
          <Badge key="readiness" variant={trip.readiness === 'Complete' ? 'success' : 'warning'}>Readiness: {trip.readiness}</Badge>
        ]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" onClick={handleAction}>Sync Updates</Button>
            <Button variant="primary" onClick={handleAction}>Edit Trip</Button>
          </div>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)' }}>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
            
            {/* Left Column: Stats & Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <span className="text-caption text-muted">Members</span>
                  <div className="text-h3">{trip.members}</div>
                </div>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <span className="text-caption text-muted">Days to Departure</span>
                  <div className="text-h3">45</div>
                </div>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <span className="text-caption text-muted">Readiness Score</span>
                  <div className="text-h3">85%</div>
                </div>
              </div>

              <div>
                <h3 className="text-h5" style={{ marginBottom: 'var(--space-4)' }}>Operational Readiness Checklist</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><CheckCircle2 size={16} className="text-success-600" /> <span>Mutawwif Assigned</span></div>
                    <Badge variant="success">Complete</Badge>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><CheckCircle2 size={16} className="text-success-600" /> <span>Hotels & Flights Assigned</span></div>
                    <Badge variant="success">Complete</Badge>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><Activity size={16} className="text-warning-600" /> <span>Jamaah Documents (Passports/Visas)</span></div>
                    <Badge variant="warning">Missing 3 Passports</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Alerts & Mutawwif */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              
              {/* Emergency & Reports Widget (Cross-role sync) */}
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-danger-50)', border: '1px solid var(--color-danger-200)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', color: 'var(--color-danger-700)' }}>
                  <AlertTriangle size={18} />
                  <h4 className="text-h6" style={{ margin: 0 }}>Safety & Emergency Reports</h4>
                </div>
                <p className="text-body text-danger-700" style={{ margin: 0, marginBottom: 'var(--space-3)' }}>No active emergency reports for this trip.</p>
                <Button variant="outline" size="sm" onClick={() => navigate('ta-reports')}>View Support Logs</Button>
              </div>

              {/* Mutawwif Assignment Info */}
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <h4 className="text-h6" style={{ marginBottom: 'var(--space-4)' }}>Assigned Mutawwif</h4>
                <div style={{ marginBottom: 'var(--space-3)' }}>
                  <UserProfileCell 
                    name={trip.mutawwif.name} 
                    email={`${trip.mutawwif.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@alhijrah.com`} 
                    isVerified={trip.mutawwif.status === 'active'} 
                    subtitleNode={<span className="text-caption text-success-600">Active</span>}
                  />
                </div>
                {trip.mutawwif.handoverInfo && (
                  <div style={{ padding: 'var(--space-2)', backgroundColor: 'var(--color-warning-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-warning-200)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <AlertTriangle size={14} className="text-warning-700" />
                    <span className="text-caption text-warning-700">{trip.mutawwif.handoverInfo}</span>
                  </div>
                )}
              </div>
              
              {/* WhatsApp Group Link */}
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  <MessageCircle size={18} className="text-primary-600" />
                  <h4 className="text-h6" style={{ margin: 0 }}>WhatsApp Group</h4>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <Input placeholder="Enter WAG Link" defaultValue="https://chat.whatsapp.com/invite..." />
                  <Button variant="secondary" onClick={handleAction}>Save</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 className="text-h5">Trip Members</h3>
              <Button size="sm" onClick={handleAction}>Add Jamaah</Button>
            </div>
            <DataTable
              columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Booking Ref', accessor: 'booking' },
                { header: 'Documents', accessor: (r: any) => <Badge variant={r.docs === 'Complete' ? 'success' : 'warning'}>{r.docs}</Badge> },
                { header: 'Visa', accessor: (r: any) => <Badge variant={r.visa === 'Approved' ? 'success' : 'warning'}>{r.visa}</Badge> },
                { header: 'Actions', accessor: () => <Button variant="ghost" size="sm">Manage</Button> }
              ]}
              data={[
                { id: '1', name: 'Ahmad Abdullah', booking: 'BKG-001', docs: 'Complete', visa: 'Approved' },
                { id: '2', name: 'Siti Aminah', booking: 'BKG-001', docs: 'Complete', visa: 'Approved' },
                { id: '3', name: 'Mohd Ali', booking: 'BKG-002', docs: 'Missing Passport', visa: 'Pending' }
              ]}
              keyField="id"
            />
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 className="text-h5">Trip Itinerary (Execution Tracking)</h3>
              <Button size="sm" variant="outline" onClick={handleAction}>Edit Schedule</Button>
            </div>
            <DataTable
              columns={[
                { header: 'Day', accessor: 'day' },
                { header: 'Date', accessor: 'date' },
                { header: 'Activity', accessor: 'activity' },
                { header: 'Execution Status', accessor: (r: any) => <Badge variant={r.status === 'completed' ? 'success' : r.status === 'acknowledged' ? 'primary' : 'default'}>{r.status}</Badge> }
              ]}
              data={[
                { id: '1', day: 'Day 1', date: '15 Dec 2026', activity: 'KUL Departure & Arrival in JED', status: 'completed' },
                { id: '2', day: 'Day 2', date: '16 Dec 2026', activity: 'First Umrah Completion', status: 'acknowledged' },
                { id: '3', day: 'Day 3', date: '17 Dec 2026', activity: 'Rest & Free Time in Makkah', status: 'scheduled' }
              ]}
              keyField="id"
            />
          </div>
        )}

        {activeTab === 'mutawwif' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 className="text-h5">Assigned Mutawwif</h3>
              <Button size="sm" onClick={() => setIsAssignModalOpen(true)}>Assign Mutawwif</Button>
            </div>
            <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', textAlign: 'center' }}>
               <UserCheck size={32} className="text-muted" style={{ margin: '0 auto var(--space-3)' }} />
               <h4 className="text-h6" style={{ marginBottom: 'var(--space-2)' }}>No Mutawwif Assigned</h4>
               <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>Assign a mutawwif to guide this group trip.</p>
               <Button variant="outline" onClick={() => setIsAssignModalOpen(true)}>Find & Assign Mutawwif</Button>
            </div>
          </div>
        )}

        {['hotel', 'flight'].includes(activeTab) && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--text-muted)' }}>
            <h3 className="text-h5" style={{ marginBottom: 'var(--space-2)' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Details</h3>
            <p>Operational snapshot view for {activeTab} will be implemented in subsequent phases.</p>
          </div>
        )}

      </div>

      <TAAssignMutawwifModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        groupTrip={trip}
        onSuccess={() => {
          showToast('Success', 'Mutawwif assigned successfully!', 'success');
          setIsAssignModalOpen(false);
          // In a real app we would re-fetch trip data here
        }}
      />
    </div>
  );
};
