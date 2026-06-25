import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Tabs } from '../../components/navigation/Tabs';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { MetricCard } from '../../components/data-display/MetricCard';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { ApprovalDecisionBar } from '../../components/domain/ApprovalDecisionBar';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Plus, Plane, Eye, Edit, ChevronRight, Archive, Trash2, Copy, UploadCloud, CheckCircle2, Ticket, Clock } from 'lucide-react';
import { ExportControl } from '../../components/domain/ExportControl';
import { Package } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';
import { CountryFlag } from '../../components/data-display/CountryFlag';
import { AirlineLogo } from '../../components/data-display/AirlineLogo';

export const FlightList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedFlights, setSelectedFlights] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

const initialAirlineList = [
  {
    "id": "al_1",
    "logo": "MH",
    "name": "Malaysia Airlines (Flight Branch 1)",
    "iata": "MH",
    "icao": "MAS",
    "country": "Malaysia",
    "flights": 12,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_2",
    "logo": "GA",
    "name": "Garuda Indonesia (Flight Branch 1)",
    "iata": "GA",
    "icao": "GIA",
    "country": "Indonesia",
    "flights": 14,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_3",
    "logo": "EK",
    "name": "Emirates (Flight Branch 1)",
    "iata": "EK",
    "icao": "UAE",
    "country": "UAE",
    "flights": 16,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_4",
    "logo": "QR",
    "name": "Qatar Airways (Flight Branch 1)",
    "iata": "QR",
    "icao": "QTR",
    "country": "Qatar",
    "flights": 18,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_5",
    "logo": "SV",
    "name": "Saudi Airlines (Flight Branch 2)",
    "iata": "SV",
    "icao": "SVA",
    "country": "Saudi Arabia",
    "flights": 20,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_6",
    "logo": "MH",
    "name": "Malaysia Airlines (Flight Branch 2)",
    "iata": "MH",
    "icao": "MAS",
    "country": "Malaysia",
    "flights": 22,
    "available": false,
    "status": "Draft"
  },
  {
    "id": "al_7",
    "logo": "GA",
    "name": "Garuda Indonesia (Flight Branch 2)",
    "iata": "GA",
    "icao": "GIA",
    "country": "Indonesia",
    "flights": 24,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_8",
    "logo": "EK",
    "name": "Emirates (Flight Branch 2)",
    "iata": "EK",
    "icao": "UAE",
    "country": "UAE",
    "flights": 26,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_9",
    "logo": "QR",
    "name": "Qatar Airways (Flight Branch 2)",
    "iata": "QR",
    "icao": "QTR",
    "country": "Qatar",
    "flights": 28,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_10",
    "logo": "SV",
    "name": "Saudi Airlines (Flight Branch 3)",
    "iata": "SV",
    "icao": "SVA",
    "country": "Saudi Arabia",
    "flights": 30,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_11",
    "logo": "MH",
    "name": "Malaysia Airlines (Flight Branch 3)",
    "iata": "MH",
    "icao": "MAS",
    "country": "Malaysia",
    "flights": 32,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_12",
    "logo": "GA",
    "name": "Garuda Indonesia (Flight Branch 3)",
    "iata": "GA",
    "icao": "GIA",
    "country": "Indonesia",
    "flights": 34,
    "available": false,
    "status": "Draft"
  },
  {
    "id": "al_13",
    "logo": "EK",
    "name": "Emirates (Flight Branch 3)",
    "iata": "EK",
    "icao": "UAE",
    "country": "UAE",
    "flights": 36,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_14",
    "logo": "QR",
    "name": "Qatar Airways (Flight Branch 3)",
    "iata": "QR",
    "icao": "QTR",
    "country": "Qatar",
    "flights": 38,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_15",
    "logo": "SV",
    "name": "Saudi Airlines (Flight Branch 4)",
    "iata": "SV",
    "icao": "SVA",
    "country": "Saudi Arabia",
    "flights": 40,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_16",
    "logo": "MH",
    "name": "Malaysia Airlines (Flight Branch 4)",
    "iata": "MH",
    "icao": "MAS",
    "country": "Malaysia",
    "flights": 42,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_17",
    "logo": "GA",
    "name": "Garuda Indonesia (Flight Branch 4)",
    "iata": "GA",
    "icao": "GIA",
    "country": "Indonesia",
    "flights": 44,
    "available": true,
    "status": "Active"
  },
  {
    "id": "al_18",
    "logo": "EK",
    "name": "Emirates (Flight Branch 4)",
    "iata": "EK",
    "icao": "UAE",
    "country": "UAE",
    "flights": 46,
    "available": false,
    "status": "Draft"
  }
];

  const initialFlightList = [
  {
    "id": "fl_1",
    "airline": "Malaysia Airlines",
    "logo": "MH",
    "number": "MH801",
    "route": "KUL → MED",
    "type": "Direct",
    "departure": "02:30",
    "arrival": "11:45",
    "duration": "8h 25m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_2",
    "airline": "Garuda Indonesia",
    "logo": "GA",
    "number": "GA802",
    "route": "KUL → JED",
    "type": "Direct",
    "departure": "03:30",
    "arrival": "12:45",
    "duration": "8h 35m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_3",
    "airline": "Emirates",
    "logo": "EK",
    "number": "EK803",
    "route": "KUL → MED",
    "type": "Transit",
    "departure": "04:30",
    "arrival": "13:45",
    "duration": "8h 45m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_4",
    "airline": "Qatar Airways",
    "logo": "QR",
    "number": "QR804",
    "route": "KUL → JED",
    "type": "Direct",
    "departure": "05:30",
    "arrival": "14:45",
    "duration": "8h 55m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_5",
    "airline": "Saudi Airlines",
    "logo": "SV",
    "number": "SV805",
    "route": "KUL → MED",
    "type": "Direct",
    "departure": "06:30",
    "arrival": "15:45",
    "duration": "8h 15m",
    "available": false,
    "status": "Draft"
  },
  {
    "id": "fl_6",
    "airline": "Malaysia Airlines",
    "logo": "MH",
    "number": "MH806",
    "route": "KUL → JED",
    "type": "Transit",
    "departure": "07:30",
    "arrival": "16:45",
    "duration": "8h 25m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_7",
    "airline": "Garuda Indonesia",
    "logo": "GA",
    "number": "GA807",
    "route": "KUL → MED",
    "type": "Direct",
    "departure": "08:30",
    "arrival": "17:45",
    "duration": "8h 35m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_8",
    "airline": "Emirates",
    "logo": "EK",
    "number": "EK808",
    "route": "KUL → JED",
    "type": "Direct",
    "departure": "09:30",
    "arrival": "18:45",
    "duration": "8h 45m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_9",
    "airline": "Qatar Airways",
    "logo": "QR",
    "number": "QR809",
    "route": "KUL → MED",
    "type": "Transit",
    "departure": "01:30",
    "arrival": "19:45",
    "duration": "8h 55m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_10",
    "airline": "Saudi Airlines",
    "logo": "SV",
    "number": "SV810",
    "route": "KUL → JED",
    "type": "Direct",
    "departure": "02:30",
    "arrival": "20:45",
    "duration": "8h 15m",
    "available": false,
    "status": "Draft"
  },
  {
    "id": "fl_11",
    "airline": "Malaysia Airlines",
    "logo": "MH",
    "number": "MH811",
    "route": "KUL → MED",
    "type": "Direct",
    "departure": "03:30",
    "arrival": "21:45",
    "duration": "8h 25m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_12",
    "airline": "Garuda Indonesia",
    "logo": "GA",
    "number": "GA812",
    "route": "KUL → JED",
    "type": "Transit",
    "departure": "04:30",
    "arrival": "10:45",
    "duration": "8h 35m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_13",
    "airline": "Emirates",
    "logo": "EK",
    "number": "EK813",
    "route": "KUL → MED",
    "type": "Direct",
    "departure": "05:30",
    "arrival": "11:45",
    "duration": "8h 45m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_14",
    "airline": "Qatar Airways",
    "logo": "QR",
    "number": "QR814",
    "route": "KUL → JED",
    "type": "Direct",
    "departure": "06:30",
    "arrival": "12:45",
    "duration": "8h 55m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_15",
    "airline": "Saudi Airlines",
    "logo": "SV",
    "number": "SV815",
    "route": "KUL → MED",
    "type": "Transit",
    "departure": "07:30",
    "arrival": "13:45",
    "duration": "8h 15m",
    "available": false,
    "status": "Draft"
  },
  {
    "id": "fl_16",
    "airline": "Malaysia Airlines",
    "logo": "MH",
    "number": "MH816",
    "route": "KUL → JED",
    "type": "Direct",
    "departure": "08:30",
    "arrival": "14:45",
    "duration": "8h 25m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_17",
    "airline": "Garuda Indonesia",
    "logo": "GA",
    "number": "GA817",
    "route": "KUL → MED",
    "type": "Direct",
    "departure": "09:30",
    "arrival": "15:45",
    "duration": "8h 35m",
    "available": true,
    "status": "Active"
  },
  {
    "id": "fl_18",
    "airline": "Emirates",
    "logo": "EK",
    "number": "EK818",
    "route": "KUL → JED",
    "type": "Transit",
    "departure": "01:30",
    "arrival": "16:45",
    "duration": "8h 45m",
    "available": true,
    "status": "Active"
  }
];

  const { data: airlineList, remove: removeAirline } = useLocalStorageCrud('airline', initialAirlineList);
  const { data: flightList, remove: removeFlight } = useLocalStorageCrud('flight', initialFlightList);

  const airlineColumns = [
    { 
      header: 'Airline', 
      accessor: (row: typeof airlineList[0]) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <AirlineLogo iata={row.iata} name={row.name} size={32} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="text-body-bold">{row.name}</span>
            <span className="text-caption text-muted">{row.iata} / {row.icao}</span>
          </div>
        </div>
      )
    },
    { 
      header: 'Country', 
      accessor: (row: typeof airlineList[0]) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <CountryFlag country={row.country} />
          <span>{row.country}</span>
        </div>
      )
    },
    { header: 'Total Flights', accessor: 'flights' as const },
    { 
      header: 'Available for Package', 
      accessor: (row: typeof airlineList[0]) => row.available ? <Badge variant={getStatusBadgeVariant("Yes")}>Yes</Badge> : <Badge variant={getStatusBadgeVariant("No")}>No</Badge>
    },
    { 
      header: 'Status', 
      accessor: (row: typeof airlineList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        switch (row.status) {
          case 'Active': variant = 'success'; break;
          case 'Draft': variant = 'warning'; break;
          case 'Inactive': variant = 'neutral'; break;
          case 'Archived': variant = 'neutral'; break;
        }
        return <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge>;
      }
    },
    {
      header: 'Action',
      accessor: (row: typeof airlineList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('airline-details', { id: row.id }) },
            { id: 'edit', label: 'Edit Airline', icon: <Edit size={16} />, onClick: () => console.log('Edit', row.id) },
            { id: 'add_flight', label: 'Add Flight', onClick: () => navigate('flight-add', { airlineId: row.id }) },
            { id: 'archive', label: 'Archive', icon: <Archive size={16} />, danger: true, onClick: () => console.log('Archive', row.id), disabled: row.status === 'Archived' },
            { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, danger: true, onClick: () => { if(window.confirm('Are you sure?')) removeAirline(row.id) } },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const flightColumns = [
    { 
      header: 'Flight', 
      accessor: (row: typeof flightList[0]) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.number}</span>
          <span className="text-caption text-muted">{row.airline}</span>
        </div>
      )
    },
    { 
      header: 'Route & Schedule', 
      accessor: (row: typeof flightList[0]) => {
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
    { 
      header: 'Available for Package', 
      accessor: (row: typeof flightList[0]) => row.available ? <Badge variant={getStatusBadgeVariant("Yes")}>Yes</Badge> : <Badge variant={getStatusBadgeVariant("No")}>No</Badge>
    },
    { 
      header: 'Status', 
      accessor: (row: typeof flightList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        switch (row.status) {
          case 'Active': variant = 'success'; break;
          case 'Draft': variant = 'warning'; break;
          case 'Inactive': variant = 'neutral'; break;
          case 'Archived': variant = 'neutral'; break;
        }
        return <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge>;
      }
    },
    {
      header: 'Action',
      accessor: (row: typeof flightList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('flight-details', { id: row.id }) },
            { id: 'preview', label: 'Preview Package Display', icon: <Eye size={16} />, onClick: () => console.log('Preview', row.id) },
            { id: 'edit', label: 'Edit Flight', icon: <Edit size={16} />, onClick: () => console.log('Edit', row.id) },
            { id: 'duplicate', label: 'Duplicate as Draft', icon: <Copy size={16} />, onClick: () => console.log('Duplicate', row.id) },
            { id: 'publish', label: 'Publish', icon: <UploadCloud size={16} />, onClick: () => console.log('Publish', row.id), disabled: row.status === 'Active' },
            { id: 'archive', label: 'Archive', icon: <Archive size={16} />, danger: true, onClick: () => console.log('Archive', row.id), disabled: row.status === 'Archived' },
            { id: 'restore', label: 'Restore', onClick: () => console.log('Restore', row.id), disabled: row.status !== 'Archived' },
            { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, danger: true, onClick: () => { if(window.confirm('Are you sure?')) removeFlight(row.id) } },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const airlineFilters: FilterGroup[] = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'draft', label: 'Draft' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'archived', label: 'Archived' },
      ]
    },
    {
      id: 'country',
      label: 'Country',
      options: [
        { value: 'sa', label: 'Saudi Arabia' },
        { value: 'my', label: 'Malaysia' },
        { value: 'id', label: 'Indonesia' },
      ]
    },
    {
      id: 'available',
      label: 'Available for Package',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]
    },
    {
      id: 'has_active',
      label: 'Has Active Flights',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]
    }
  ];

  const flightFilters: FilterGroup[] = [
    {
      id: 'airline',
      label: 'Airline',
      options: [
        { value: 'sv', label: 'Saudia Airlines' },
        { value: 'mh', label: 'Malaysia Airlines' },
        { value: 'ga', label: 'Garuda Indonesia' },
      ]
    },
    {
      id: 'origin',
      label: 'Origin Airport',
      options: [
        { value: 'kul', label: 'KUL' },
        { value: 'cgk', label: 'CGK' },
      ]
    },
    {
      id: 'destination',
      label: 'Destination Airport',
      options: [
        { value: 'jed', label: 'JED' },
        { value: 'med', label: 'MED' },
      ]
    },
    {
      id: 'direction',
      label: 'Direction',
      options: [
        { value: 'outbound', label: 'Outbound' },
        { value: 'return', label: 'Return' },
        { value: 'transit', label: 'Transit' },
      ]
    },
    {
      id: 'type',
      label: 'Service Type',
      options: [
        { value: 'direct', label: 'Direct' },
        { value: 'transit', label: 'Transit' },
      ]
    },
    {
      id: 'cabin',
      label: 'Cabin Class',
      options: [
        { value: 'economy', label: 'Economy' },
        { value: 'business', label: 'Business' },
      ]
    },
    {
      id: 'available',
      label: 'Available for Package',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'draft', label: 'Draft' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'archived', label: 'Archived' },
      ]
    }
  ];
  const mergedAirlineList = React.useMemo(() => {
    return airlineList.map(airline => {
      const flights = flightList.filter(f => f.logo === airline.logo || f.airline.startsWith(airline.name.split(' ')[0]));
      const searchString = flights.map(f => `${f.number} ${f.route} ${f.type} ${f.departure} ${f.arrival}`).join(' ').toLowerCase();
      
      return {
        ...airline,
        flights,
        searchString
      };
    });
  }, [airlineList, flightList]);

  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData,
    totalItems,
    currentPage,
    totalPages,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    sortKey,
    sortOrder,
    onSort
  } = useDataFilter(mergedAirlineList, {
    searchKeys: ['name', 'iata', 'icao', 'country', 'searchString'],
    defaultSort: { key: 'status', order: 'asc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Flight / Airline Management"
        breadcrumbs={[{ label: 'Home' }, { label: 'Flight Catalog' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Plane size={16} />} onClick={() => navigate('airline-add')}>
              Add Airline
            </Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('flight-add')}>
              Add Flight Route
            </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Total Flights" 
          value={flightList.length.toString()} 
          trend="up" 
          trendValue="+15%" 
          icon={<Plane />} 
          iconBg="var(--color-primary-light)" 
          accentColor="var(--color-primary)" 
        />
        <MetricCard 
          title="Active Airlines" 
          value={airlineList.filter(a => a.status === 'Active').length.toString()} 
          trend="up" 
          trendValue="+2" 
          icon={<CheckCircle2 />} 
          iconBg="var(--color-success-light)" 
          accentColor="var(--color-success)" 
        />
        <MetricCard 
          title="Available for Package" 
          value={flightList.filter(f => f.available).length.toString()} 
          trend="up" 
          trendValue="+12%" 
          icon={<Package />} 
          iconBg="var(--color-info-light)" 
          accentColor="var(--color-info)" 
        />
      </div>

      <FilterBar 
        groups={airlineFilters}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search airline name, IATA code, or flight number..."
      />
      <DataTable
        onRowClick={(row: any) => navigate('airline-details', { id: row.id })} 
        data={filteredData}
        sort={{
          key: sortKey,
          order: sortOrder,
          onSort
        }}
        pagination={{
          currentPage,
          totalPages,
          rowsPerPage,
          totalItems,
          onPageChange,
          onRowsPerPageChange
        }}
        expandable={true}
        renderExpandedRow={(row: any) => {
          if (row.flights.length === 0) {
            return <div className="text-muted text-body" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>No flights currently assigned to this airline.</div>;
          }

          return (
            <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <DataTable 
                data={row.flights}
                columns={flightColumns.filter(c => c.header !== 'Action')}
                keyExtractor={(r) => r.id}
                onRowClick={(flightRow: any) => navigate('flight-details', { id: flightRow.id })}
              />
            </div>
          );
        }}
        columns={airlineColumns.map(col => col.header === 'Total Flights' ? { ...col, accessor: (r: any) => r.flights.length } : col)}
        keyExtractor={(r) => r.id}
        isLoading={isLoading}
        selectedKeys={selectedAirlines}
        onSelectionChange={setSelectedAirlines}
        emptyStateTitle="No airlines found"
        emptyStateDescription="Try adjusting your filters or add a new airline."
      />
    </div>
  );
};
