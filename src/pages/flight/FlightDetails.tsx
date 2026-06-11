import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { useDataFilter } from '../../hooks/useDataFilter';
import { Eye, ChevronRight } from 'lucide-react';

export const FlightDetails: React.FC<{ navigate: (route: string, data?: any) => void, flightId?: string }> = ({ navigate, flightId = 'fl_1' }) => {
  const [status, setStatus] = useState('Scheduled');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data
  const flight = {
    id: flightId,
    airline: 'Saudia Airlines',
    logo: 'SV',
    number: 'SV841',
    route: 'KUL → JED',
    direction: 'Outbound',
    type: 'Direct',
    status: status,
    available: true,
    aircraft: 'Boeing 777',
    
    origin: 'KUL - Kuala Lumpur International Airport',
    originTerminal: 'Terminal 1',
    departureTime: '14:30',
    departureTz: 'Asia/Kuala_Lumpur',
    
    destination: 'JED - King Abdulaziz International Airport',
    destinationTerminal: 'Terminal 1',
    arrivalTime: '18:45',
    arrivalTz: 'Asia/Riyadh',
    
    duration: '8h 15m',
    
    cabinClass: 'Economy',
    checkedBaggage: '30 kg',
    cabinBaggage: '7 kg',
    baggageNotes: 'Subject to final fare class verification.'
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
    { id: 'route', label: 'Route & Schedule' },
    { id: 'transit', label: 'Transit' },
    { id: 'baggage', label: 'Baggage & Cabin' },
    { id: 'usage', label: 'Usage' },
    { id: 'logs', label: 'Activity Logs' }
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)', fontSize: '32px', fontWeight: 'bold' }}>
            {flight.logo}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <h1 className="text-page-title">{flight.number}</h1>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <span className="text-body text-muted">{flight.airline}</span>
              <span className="text-body text-muted">{flight.route}</span>
              <StatusTransitionMenu currentStatus={status} onTransition={setStatus} allowedTransitions={['Draft', 'Active', 'Archived', 'Pending', 'Confirmed', 'Completed', 'Cancelled', 'Scheduled', 'Upcoming', 'Under Review', 'Published']} />
              {flight.available && <Badge variant="info">Available for Package</Badge>}
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="secondary" onClick={() => navigate('flight-list')}>Back to List</Button>
          <Button>Edit Flight</Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)', minHeight: '400px' }}>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Flight Profile</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Airline</span>
                  <span className="text-body-bold">{flight.airline}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Flight Number</span>
                  <span className="text-body">{flight.number}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Direction</span>
                  <span className="text-body">{flight.direction}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Service Type</span>
                  <span className="text-body">{flight.type}</span>
                </div>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Aircraft Type</span>
                <span className="text-body">{flight.aircraft}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Route Summary</h3>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-body-bold">KUL</span>
                  <span className="text-caption text-muted">{flight.duration}</span>
                  <span className="text-body-bold">JED</span>
                </div>
                <div style={{ position: 'relative', height: '2px', backgroundColor: 'var(--border-default)', marginBottom: 'var(--space-2)' }}>
                  <div style={{ position: 'absolute', left: 0, top: '-4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
                  <div style={{ position: 'absolute', right: 0, top: '-4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-caption">{flight.departureTime}</span>
                  <span className="text-caption">{flight.arrivalTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'route' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Origin</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Airport</span>
                    <span className="text-body">{flight.origin}</span>
                  </div>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Terminal</span>
                    <span className="text-body">{flight.originTerminal}</span>
                  </div>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Departure Time (Local)</span>
                    <span className="text-body-bold">{flight.departureTime}</span>
                  </div>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Timezone</span>
                    <span className="text-body text-muted">{flight.departureTz}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Destination</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Airport</span>
                    <span className="text-body">{flight.destination}</span>
                  </div>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Terminal</span>
                    <span className="text-body">{flight.destinationTerminal}</span>
                  </div>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Arrival Time (Local)</span>
                    <span className="text-body-bold">{flight.arrivalTime}</span>
                  </div>
                  <div>
                    <span className="text-caption text-muted" style={{ display: 'block' }}>Timezone</span>
                    <span className="text-body text-muted">{flight.arrivalTz}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transit' && (
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Direct Flight</span>
            <span className="text-body text-muted">This flight does not have any transit or layover stops.</span>
          </div>
        )}

        {activeTab === 'baggage' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h3 className="text-subsection-title">Cabin & Baggage Reference</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Cabin Class</span>
                <span className="text-body">{flight.cabinClass}</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Checked Baggage</span>
                <span className="text-body-bold" style={{ fontSize: '18px' }}>{flight.checkedBaggage}</span>
              </div>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Cabin Baggage</span>
                <span className="text-body-bold" style={{ fontSize: '18px' }}>{flight.cabinBaggage}</span>
              </div>
            </div>
            <div style={{ marginTop: 'var(--space-2)' }}>
              <span className="text-caption text-muted" style={{ display: 'block' }}>Baggage Notes</span>
              <span className="text-body text-muted">{flight.baggageNotes}</span>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Usage in Packages & Group Trips</h3>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <span className="text-body text-muted">Showing aggregate usage. This flight is used in 12 Packages and 4 Group Trips.</span>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: 'Today, 10:45 AM', actor: 'System Admin', action: 'Created Flight', module: 'Flight Management', details: 'Published SV841' }
              ]}
            />
          </div>
        )}

      </div>
    </div>
  );
};
