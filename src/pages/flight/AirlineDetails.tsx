import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { useDataFilter } from '../../hooks/useDataFilter';
import { Eye, ChevronRight } from 'lucide-react';

export const AirlineDetails: React.FC<{ navigate: (route: string, data?: any) => void, airlineId?: string }> = ({ navigate, airlineId = 'al_1' }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data
  const airline = {
    id: airlineId,
    name: 'Saudia Airlines',
    iata: 'SV',
    icao: 'SVA',
    country: 'Saudi Arabia',
    logo: 'SV',
    flights: 42,
    activeFlights: 38,
    status: 'Active',
    createdBy: 'System Admin',
    lastUpdated: 'Today, 10:30 AM'
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
    { id: 'flights', label: 'Flights' },
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
            {airline.logo}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <h1 className="text-page-title">{airline.name}</h1>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <span className="text-body text-muted">{airline.iata} / {airline.icao}</span>
              <span className="text-body text-muted">{airline.country}</span>
              <Badge variant="success">{airline.status}</Badge>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="secondary" onClick={() => navigate('flight-list')}>Back to List</Button>
          <Button>Edit Airline</Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)', minHeight: '400px' }}>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Airline Profile</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>IATA Code</span>
                  <span className="text-body-bold">{airline.iata}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>ICAO Code</span>
                  <span className="text-body">{airline.icao}</span>
                </div>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Country of Origin</span>
                <span className="text-body">{airline.country}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Catalog Statistics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <span className="text-caption text-muted">Total Flights</span>
                  <span className="text-body-bold" style={{ display: 'block', fontSize: '20px' }}>{airline.flights}</span>
                </div>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <span className="text-caption text-muted">Active Flights</span>
                  <span className="text-body-bold text-success" style={{ display: 'block', fontSize: '20px' }}>{airline.activeFlights}</span>
                </div>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Last Updated</span>
                <span className="text-body text-muted">{airline.lastUpdated} by {airline.createdBy}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'flights' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Flights under {airline.name}</h3>
              <Button size="sm" onClick={() => navigate('flight-add')}>Add Flight</Button>
            </div>
            <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ flex: 1 }}>
                <span className="text-body-bold" style={{ display: 'block' }}>SV841 (Direct)</span>
                <span className="text-caption text-muted">KUL → JED • 14:30 - 18:45 (8h 15m)</span>
              </div>
              <Badge variant="success">Active</Badge>
              <Button variant="ghost" size="sm" onClick={() => navigate('flight-details')}>View</Button>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Package & Group Trip Usage</h3>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <span className="text-body text-muted">Showing aggregate usage. This airline's flights are used in 24 Packages and 12 Group Trips.</span>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: 'Today, 10:30 AM', actor: 'System Admin', action: 'Created Airline', module: 'Flight Management', details: 'Added Saudia Airlines' }
              ]}
            />
          </div>
        )}

      </div>
    </div>
  );
};
