import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { useDataFilter } from '../../hooks/useDataFilter';
import { DataTable } from '../../components/data-display/DataTable';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Eye, ChevronRight, Plane, Package, Users, Clock, Edit, Trash2, Archive, Plus } from 'lucide-react';
import { CountryFlag } from '../../components/data-display/CountryFlag';
import { AirlineLogo } from '../../components/data-display/AirlineLogo';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const AirlineDetails: React.FC<{ navigate: (route: string, data?: any) => void, airlineId?: string }> = ({ navigate, airlineId = 'al_1' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { getById } = useLocalStorageCrud('airline');

  const alData: any = getById(airlineId) || {
    id: airlineId,
    name: 'Unknown Airline',
    iata: 'NA',
    icao: 'NAA',
    country: 'Unknown',
    logo: 'NA',
    flights: 0,
    status: 'Draft'
  };

  // Mock Data
  const airline = {
    ...alData,
    activeFlights: alData.flights || 0,
    createdBy: 'System Admin',
    lastUpdated: 'Today, 10:30 AM'
  };

  // Flights Mock & Columns
  const mockFlights = [
    { id: 'f1', number: airline.iata + '801', route: 'KUL → MED', type: 'Direct', departure: '02:30', arrival: '11:45', duration: '8h 25m', available: true, status: 'Active' },
    { id: 'f2', number: airline.iata + '802', route: 'KUL → JED', type: 'Direct', departure: '03:30', arrival: '12:45', duration: '8h 35m', available: true, status: 'Active' },
    { id: 'f3', number: airline.iata + '803', route: 'KUL → MED', type: 'Transit', departure: '04:30', arrival: '13:45', duration: '8h 45m', available: true, status: 'Active' },
    { id: 'f4', number: airline.iata + '804', route: 'KUL → JED', type: 'Direct', departure: '05:30', arrival: '14:45', duration: '8h 55m', available: false, status: 'Draft' }
  ];

  const flightColumns = [
    { 
      header: 'Flight', 
      accessor: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.number}</span>
          <span className="text-caption text-muted">{airline.name}</span>
        </div>
      )
    },
    { 
      header: 'Route & Schedule', 
      accessor: (row: any) => {
        const [origin, dest] = (row.route || '').split(' → ');
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="text-body-bold">{origin || row.route}</span>
                {dest && <Plane size={14} style={{ color: 'var(--color-primary)' }} />}
                {dest && <span className="text-body-bold">{dest}</span>}
              </div>
              <Badge variant={row.type === 'Direct' ? 'success' : 'warning'} style={{ padding: '2px 6px', fontSize: '10px' }}>{row.type}</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} className="text-muted" />
              <span className="text-caption text-muted">{row.departure} - {row.arrival}</span>
              <span className="text-caption" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>({row.duration})</span>
            </div>
          </div>
        );
      }
    },
    { header: 'Available', accessor: (row: any) => row.available ? <Badge variant={getStatusBadgeVariant("Yes")}>Yes</Badge> : <Badge variant={getStatusBadgeVariant("No")}>No</Badge> },
    { header: 'Status', accessor: (row: any) => <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge> },
    {
      header: 'Action',
      accessor: (row: any) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('flight-details', { id: row.id }) },
            { id: 'edit', label: 'Edit Flight', icon: <Edit size={16} />, onClick: () => console.log('Edit', row.id) },
            { id: 'archive', label: 'Archive', icon: <Archive size={16} />, danger: true, onClick: () => console.log('Archive', row.id), disabled: row.status === 'Archived' }
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  // Usage Mock & Columns
  const mockUsage = [
    { id: 'u1', name: 'Premium Umrah Ramadhan', type: 'Package', date: '2026-05-10', status: 'Active' },
    { id: 'u2', name: 'Standard VIP Plus', type: 'Package', date: '2026-05-12', status: 'Active' },
    { id: 'u3', name: 'Group Trip Keluarga Bapak Budi', type: 'Group Trip', date: '2026-06-01', status: 'Active' },
    { id: 'u4', name: 'Group Trip Corporate PT ABC', type: 'Group Trip', date: '2026-06-05', status: 'Draft' }
  ];

  const usageColumns = [
    { 
      header: 'Related Item', 
      accessor: (row: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', backgroundColor: row.type === 'Package' ? 'var(--color-primary-light)' : 'var(--color-success-light)', color: row.type === 'Package' ? 'var(--color-primary)' : 'var(--color-success)' }}>
            {row.type === 'Package' ? <Package size={16} /> : <Users size={16} />}
          </div>
          <span className="text-body-bold">{row.name}</span>
        </div>
      )
    },
    { header: 'Module', accessor: 'type' },
    { header: 'Assigned Date', accessor: 'date' },
    { header: 'Status', accessor: (row: any) => <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge> },
    {
      header: 'Action',
      accessor: (row: any) => (
        <Button variant="ghost" size="sm" onClick={() => row.type === 'Package' ? navigate('package-details') : navigate('group-trip-details')}>View {row.type}</Button>
      ),
      align: 'right' as const
    }
  ];

  // Logs Mock
  const mockLogs = [
    { id: '1', timestamp: 'Today, 10:30 AM', actor: 'System Admin', action: 'Created Airline', module: 'Flight Management', details: `Added ${airline.name}` },
    { id: '2', timestamp: 'Today, 11:15 AM', actor: 'Flight Manager', action: 'Added Flight', module: 'Flight Management', details: `Added flight ${airline.iata}801` },
    { id: '3', timestamp: 'Today, 11:20 AM', actor: 'Flight Manager', action: 'Added Flight', module: 'Flight Management', details: `Added flight ${airline.iata}802` },
    { id: '4', timestamp: 'Yesterday, 14:00 PM', actor: 'Travel Agent B', action: 'Package Assignment', module: 'Package Management', details: `Assigned ${airline.iata}801 to Premium Umrah Ramadhan` }
  ];

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
      {/* Back Button */}
      <div style={{ marginBottom: '-16px' }}>
        <button 
          onClick={() => navigate('flight-list')}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'none', border: 'none', color: 'var(--color-text-neutral)', cursor: 'pointer', padding: 0, fontWeight: 500 }}
          className="text-body"
        >
          <ChevronRight style={{ transform: 'rotate(180deg)' }} size={16} /> Back to Airlines
        </button>
      </div>

      {/* Hero Header Section */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '280px', 
        borderRadius: 'var(--radius-lg)', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'var(--space-6)',
        boxShadow: 'var(--glass-shadow)',
        marginTop: 'var(--space-2)'
      }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={`https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop`} alt={airline.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        {/* Dark Gradient Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%)' }} />
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <AirlineLogo iata={airline.iata} name={airline.name} size={80} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', color: 'white' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>{airline.name}</h1>
              <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', opacity: 0.9, marginTop: 'var(--space-1)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>{airline.iata} / {airline.icao}</span>
                <span style={{ opacity: 0.5 }}>|</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                  <CountryFlag country={airline.country} size={14} />
                  {airline.country}
                </span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <Badge variant={getStatusBadgeVariant(airline.status)} style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)' }}>
              {airline.status}
            </Badge>
            <Button>Edit Airline</Button>
          </div>
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
                <span className="text-body" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CountryFlag country={airline.country} />
                  {airline.country}
                </span>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="text-subsection-title">Flights under {airline.name}</h3>
              <Button size="sm" leftIcon={<Plus size={16} />} onClick={() => navigate('flight-add')}>Add Flight</Button>
            </div>
            <DataTable 
              data={mockFlights}
              columns={flightColumns}
              keyExtractor={(r) => r.id}
            />
          </div>
        )}

        {activeTab === 'usage' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h3 className="text-subsection-title">Package & Group Trip Usage</h3>
            <DataTable 
              data={mockUsage}
              columns={usageColumns}
              keyExtractor={(r) => r.id}
            />
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Activity Logs</h3>
            <AuditLogPanel logs={mockLogs} />
          </div>
        )}

      </div>
    </div>
  );
};
