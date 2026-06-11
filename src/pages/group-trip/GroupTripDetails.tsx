import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { TripMembersPanel } from './TripMembersPanel';
import { Users, Map, Calendar, BedDouble, Plane, FileText, Bus, Eye, ChevronRight } from 'lucide-react';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { useDataFilter } from '../../hooks/useDataFilter';

export const GroupTripDetails: React.FC<{ navigate: (route: string, data?: any) => void, tripId?: string }> = ({ navigate, tripId = 'gt_1' }) => {
  const [status, setStatus] = useState('Upcoming');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data
  const trip = {
    id: tripId,
    code: 'TRP-1001',
    name: 'Premium Umrah Safar (Dec 26)',
    agency: 'Zamzam Travels',
    type: 'Umrah',
    status: status,
    creationSource: 'Spawned From Package',
    pkgRef: 'Premium Umrah 2026',
    mutawwif: 'Ustaz Ahmad',
    schedule: '15 Dec 2026 - 26 Dec 2026',
    members: 3,
    capacity: 45,
    hotel: 'Swissotel Makkah',
    flight: 'Saudi Airlines (SV)',
    docProgress: 75,
    svcProgress: 60
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
    { id: 'members', label: 'Members & Readiness' },
    { id: 'flight', label: 'Flight Snapshot' },
    { id: 'hotel', label: 'Hotel Snapshot' },
    { id: 'itinerary', label: 'Itinerary Snapshot' },
    { id: 'transport', label: 'Transport Information' },
    { id: 'notes', label: 'Notes & Remarks' },
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
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <h1 className="text-page-title">{trip.name}</h1>
              <StatusTransitionMenu currentStatus={status} onTransition={setStatus} allowedTransitions={['Draft', 'Active', 'Archived', 'Pending', 'Confirmed', 'Completed', 'Cancelled', 'Scheduled', 'Upcoming', 'Under Review', 'Published']} />
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', color: 'var(--text-muted)' }}>
              <span className="text-body-bold">{trip.code}</span>
              <span>•</span>
              <span className="text-body">{trip.agency}</span>
              <span>•</span>
              <span className="text-body">{trip.type}</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="secondary" onClick={() => navigate('group-trip-list')}>Back to List</Button>
          <Button>Edit Trip Details</Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)', minHeight: '400px' }}>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Departure Schedule</span>
                  <span className="text-body-bold">{trip.schedule}</span>
                </div>
                <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Assigned Mutawwif</span>
                  <span className="text-body-bold">{trip.mutawwif}</span>
                </div>
              </div>

              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Trip Logistics</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                    <Plane size={16} className="text-primary" /> <span className="text-body-bold">Flight:</span> <span>{trip.flight}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                    <BedDouble size={16} className="text-primary" /> <span className="text-body-bold">Hotel:</span> <span>{trip.hotel}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <h3 className="text-subsection-title">Operational Status</h3>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Members / Capacity</span>
                <span className="text-body-bold">{trip.members} / {trip.capacity} Pax</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Creation Source</span>
                <span className="text-body">{trip.creationSource}</span>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Ref: {trip.pkgRef}</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />
              <div>
                <span className="text-caption text-muted" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Document Readiness</span> <span>{trip.docProgress}%</span></span>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-subtle)', borderRadius: 'var(--radius-pill)', marginTop: '4px' }}>
                  <div style={{ width: `${trip.docProgress}%`, height: '100%', backgroundColor: 'var(--color-warning)', borderRadius: 'var(--radius-pill)' }}></div>
                </div>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Service Readiness</span> <span>{trip.svcProgress}%</span></span>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-subtle)', borderRadius: 'var(--radius-pill)', marginTop: '4px' }}>
                  <div style={{ width: `${trip.svcProgress}%`, height: '100%', backgroundColor: 'var(--color-warning)', borderRadius: 'var(--radius-pill)' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <TripMembersPanel />
        )}

        {activeTab === 'flight' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Plane className="text-primary" size={20} />
              <h3 className="text-subsection-title">Flight Assignment Snapshot</h3>
            </div>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Saudi Airlines (SV)</span>
              <span className="text-body" style={{ display: 'block' }}>Departure: KUL ➔ JED (SV 821)</span>
              <span className="text-body" style={{ display: 'block' }}>Return: MED ➔ KUL (SV 822)</span>
              <Badge variant="success" style={{ marginTop: 'var(--space-3)' }}>Confirmed</Badge>
            </div>
            <p className="text-caption text-muted">This snapshot is preserved from the original package and flight catalog. Individual e-tickets are managed in the Members &gt; Services tab.</p>
          </div>
        )}

        {activeTab === 'hotel' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <BedDouble className="text-primary" size={20} />
              <h3 className="text-subsection-title">Hotel Assignment Snapshot</h3>
            </div>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Makkah Hotel</span>
                <span className="text-body-bold">Swissotel Makkah (Full Board)</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Madinah Hotel</span>
                <span className="text-body-bold">Pullman Zamzam Madinah (Full Board)</span>
              </div>
              <Badge variant="success" style={{ width: 'fit-content', marginTop: 'var(--space-2)' }}>Confirmed</Badge>
            </div>
            <p className="text-caption text-muted">This snapshot defines the contracted hotels. Specific room allocations for Jamaah are managed in the Members &gt; Services tab.</p>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Map className="text-primary" size={20} />
              <h3 className="text-subsection-title">Daily Trip Itinerary Snapshot</h3>
            </div>
            <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
              <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Day 1: 15 Dec 2026 - Departure to Jeddah</span>
              <span className="text-body text-muted">Flight SV 821. Arrive at King Abdulaziz International Airport. Transfer to Makkah.</span>
            </div>
            <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
              <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Day 2: 16 Dec 2026 - Perform Umrah</span>
              <span className="text-body text-muted">Gather at hotel lobby. Mutawwif will guide the group for the first Umrah.</span>
            </div>
          </div>
        )}

        {activeTab === 'transport' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Bus className="text-primary" size={20} />
              <h3 className="text-subsection-title">Ground Transportation</h3>
            </div>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Makkah Transport</span>
                  <span className="text-body-bold">Private Coach</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Madinah Transport</span>
                  <span className="text-body-bold">Private Coach</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Inter-city Transport</span>
                  <span className="text-body-bold">Haramain Train</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Airport Transfer</span>
                  <span className="text-body-bold">Included</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <FileText className="text-primary" size={20} />
              <h3 className="text-subsection-title">Internal Notes & Remarks</h3>
            </div>
            <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
              <p className="text-body">Trip was created to fulfill overflow from Ramadhan package. Need to ensure special assistance for 2 elderly members.</p>
              <span className="text-caption text-muted" style={{ display: 'block', marginTop: 'var(--space-2)' }}>Added by Admin on 01 Nov 2026</span>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: '1 day ago', actor: 'Agency Admin', action: 'Added Member', module: 'Group Trip', details: 'Added Ahmad Hassan (PIC)' },
                { id: '2', timestamp: '1 day ago', actor: 'Agency Admin', action: 'Uploaded Document', module: 'Group Trip', details: 'Uploaded Passport for Ahmad Hassan' },
                { id: '3', timestamp: '2 days ago', actor: 'System', action: 'Created Trip Snapshot', module: 'Group Trip', details: 'Trip spawned from Premium Umrah Package' }
              ]}
            />
          </div>
        )}

      </div>
    </div>
  );
};
