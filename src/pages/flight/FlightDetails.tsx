import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { useDataFilter } from '../../hooks/useDataFilter';
import { Eye, ChevronRight, PlaneTakeoff, PlaneLanding, MapPin, Clock, Calendar } from 'lucide-react';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';
import { AirlineLogo } from '../../components/data-display/AirlineLogo';

export const FlightDetails: React.FC<{ navigate: (route: string, data?: any) => void, flightId?: string }> = ({ navigate, flightId = 'fl_1' }) => {
  const [status, setStatus] = useState('Active');
  const [activeTab, setActiveTab] = useState('overview');
  const { getById } = useLocalStorageCrud('flight');

  const flData: any = getById(flightId) || {
    id: flightId,
    airline: 'Unknown Airline',
    logo: 'NA',
    number: 'NA',
    route: 'NA',
    type: 'Direct',
    departure: '-',
    arrival: '-',
    duration: '-',
    status: status,
    available: false
  };

  // Mock Data
  const flight = {
    ...flData,
    direction: 'Outbound',
    aircraft: 'Boeing 777',
    
    origin: 'KUL - Kuala Lumpur International Airport',
    originTerminal: 'Terminal 1',
    departureTime: flData.departure,
    departureTz: 'Asia/Kuala_Lumpur',
    
    destination: 'JED - King Abdulaziz International Airport',
    destinationTerminal: 'Terminal 1',
    arrivalTime: flData.arrival,
    arrivalTz: 'Asia/Riyadh',
    
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
      {/* Back Button */}
      <div style={{ marginBottom: '-16px' }}>
        <button 
          onClick={() => navigate('flight-list')}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'none', border: 'none', color: 'var(--color-text-neutral)', cursor: 'pointer', padding: 0, fontWeight: 500 }}
          className="text-body"
        >
          <ChevronRight style={{ transform: 'rotate(180deg)' }} size={16} /> Back to Flights
        </button>
      </div>

      {/* Hero Header Section */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '280px', 
        borderRadius: 'var(--radius-lg)', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'var(--space-6)',
        boxShadow: 'var(--glass-shadow)',
        marginTop: 'var(--space-2)'
      }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <img src={`https://picsum.photos/seed/${flight.id}/800/400`} alt={flight.number} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        {/* Dark Gradient Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, borderRadius: 'var(--radius-lg)', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)' }} />
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', color: 'white' }}>
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              {flight.available && <Badge variant={getStatusBadgeVariant("Available for Package")}>Available for Package</Badge>}
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <AirlineLogo iata={flight.logo} name={flight.airline} size={60} />
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>{flight.number}</h1>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', opacity: 0.9, marginTop: 'var(--space-1)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>{flight.airline}</span>
              <span style={{ opacity: 0.5 }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>{flight.route}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <StatusTransitionMenu currentStatus={status} onTransition={setStatus} allowedTransitions={['Draft', 'Active', 'Inactive', 'Archived']} />
            <Button>Edit Flight</Button>
          </div>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
              
              {/* Origin Card */}
              <div style={{ padding: 'var(--space-5)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
                    <PlaneTakeoff size={20} />
                  </div>
                  <h3 className="text-subsection-title">Origin</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <MapPin size={16} className="text-muted" style={{ marginTop: '2px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="text-caption text-muted">Airport</span>
                      <span className="text-body-bold">{flight.origin}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <MapPin size={16} className="text-muted" style={{ marginTop: '2px', visibility: 'hidden' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="text-caption text-muted">Terminal</span>
                      <span className="text-body">{flight.originTerminal}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <Clock size={16} className="text-muted" style={{ marginTop: '2px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="text-caption text-muted">Departure Time (Local)</span>
                      <span className="text-body-bold" style={{ color: 'var(--color-primary)', fontSize: '18px' }}>{flight.departureTime}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <Clock size={16} className="text-muted" style={{ marginTop: '2px', visibility: 'hidden' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="text-caption text-muted">Timezone</span>
                      <span className="text-body text-muted">{flight.departureTz}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Destination Card */}
              <div style={{ padding: 'var(--space-5)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
                    <PlaneLanding size={20} />
                  </div>
                  <h3 className="text-subsection-title">Destination</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <MapPin size={16} className="text-muted" style={{ marginTop: '2px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="text-caption text-muted">Airport</span>
                      <span className="text-body-bold">{flight.destination}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <MapPin size={16} className="text-muted" style={{ marginTop: '2px', visibility: 'hidden' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="text-caption text-muted">Terminal</span>
                      <span className="text-body">{flight.destinationTerminal}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <Clock size={16} className="text-muted" style={{ marginTop: '2px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="text-caption text-muted">Arrival Time (Local)</span>
                      <span className="text-body-bold" style={{ color: 'var(--color-primary)', fontSize: '18px' }}>{flight.arrivalTime}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <Clock size={16} className="text-muted" style={{ marginTop: '2px', visibility: 'hidden' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="text-caption text-muted">Timezone</span>
                      <span className="text-body text-muted">{flight.arrivalTz}</span>
                    </div>
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
