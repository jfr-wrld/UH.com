import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Plus, Star, MapPin, Image as ImageIcon, Eye, Edit, Trash2, ChevronRight } from 'lucide-react';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const HotelList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

const initialHotelList = [
  {
    "id": "ht_1",
    "name": "Fairmont Clock Tower (Tower 1)",
    "city": "Madinah",
    "rating": 4,
    "distance": 140,
    "rooms": 60,
    "status": "Active",
    "lastUpdated": "2026-06-11"
  },
  {
    "id": "ht_2",
    "name": "Pullman Zamzam (Tower 1)",
    "city": "Makkah",
    "rating": 5,
    "distance": 180,
    "rooms": 70,
    "status": "Active",
    "lastUpdated": "2026-06-12"
  },
  {
    "id": "ht_3",
    "name": "Hilton Suites Makkah (Tower 1)",
    "city": "Madinah",
    "rating": 3,
    "distance": 220,
    "rooms": 80,
    "status": "Active",
    "lastUpdated": "2026-06-13"
  },
  {
    "id": "ht_4",
    "name": "Movenpick Anwar Al Madinah (Tower 1)",
    "city": "Makkah",
    "rating": 4,
    "distance": 260,
    "rooms": 90,
    "status": "Active",
    "lastUpdated": "2026-06-14"
  },
  {
    "id": "ht_5",
    "name": "Oberoi Madinah (Tower 2)",
    "city": "Madinah",
    "rating": 5,
    "distance": 300,
    "rooms": 100,
    "status": "Inactive",
    "lastUpdated": "2026-06-15"
  },
  {
    "id": "ht_6",
    "name": "Dar Al Iman InterContinental (Tower 2)",
    "city": "Makkah",
    "rating": 3,
    "distance": 340,
    "rooms": 110,
    "status": "Active",
    "lastUpdated": "2026-06-16"
  },
  {
    "id": "ht_7",
    "name": "Elaf Kinda Hotel (Tower 2)",
    "city": "Madinah",
    "rating": 4,
    "distance": 380,
    "rooms": 120,
    "status": "Active",
    "lastUpdated": "2026-06-17"
  },
  {
    "id": "ht_8",
    "name": "Olayan Ajyad (Tower 2)",
    "city": "Makkah",
    "rating": 5,
    "distance": 420,
    "rooms": 130,
    "status": "Active",
    "lastUpdated": "2026-06-18"
  },
  {
    "id": "ht_9",
    "name": "Anjum Makkah (Tower 2)",
    "city": "Madinah",
    "rating": 3,
    "distance": 460,
    "rooms": 140,
    "status": "Active",
    "lastUpdated": "2026-06-19"
  },
  {
    "id": "ht_10",
    "name": "Swissotel Makkah (Tower 3)",
    "city": "Makkah",
    "rating": 4,
    "distance": 500,
    "rooms": 150,
    "status": "Inactive",
    "lastUpdated": "2026-06-20"
  },
  {
    "id": "ht_11",
    "name": "Fairmont Clock Tower (Tower 3)",
    "city": "Madinah",
    "rating": 5,
    "distance": 540,
    "rooms": 160,
    "status": "Active",
    "lastUpdated": "2026-06-21"
  },
  {
    "id": "ht_12",
    "name": "Pullman Zamzam (Tower 3)",
    "city": "Makkah",
    "rating": 3,
    "distance": 580,
    "rooms": 170,
    "status": "Active",
    "lastUpdated": "2026-06-22"
  },
  {
    "id": "ht_13",
    "name": "Hilton Suites Makkah (Tower 3)",
    "city": "Madinah",
    "rating": 4,
    "distance": 620,
    "rooms": 180,
    "status": "Active",
    "lastUpdated": "2026-06-23"
  },
  {
    "id": "ht_14",
    "name": "Movenpick Anwar Al Madinah (Tower 3)",
    "city": "Makkah",
    "rating": 5,
    "distance": 660,
    "rooms": 190,
    "status": "Active",
    "lastUpdated": "2026-06-24"
  },
  {
    "id": "ht_15",
    "name": "Oberoi Madinah (Tower 4)",
    "city": "Madinah",
    "rating": 3,
    "distance": 700,
    "rooms": 200,
    "status": "Inactive",
    "lastUpdated": "2026-06-25"
  },
  {
    "id": "ht_16",
    "name": "Dar Al Iman InterContinental (Tower 4)",
    "city": "Makkah",
    "rating": 4,
    "distance": 740,
    "rooms": 210,
    "status": "Active",
    "lastUpdated": "2026-06-26"
  },
  {
    "id": "ht_17",
    "name": "Elaf Kinda Hotel (Tower 4)",
    "city": "Madinah",
    "rating": 5,
    "distance": 780,
    "rooms": 220,
    "status": "Active",
    "lastUpdated": "2026-06-27"
  },
  {
    "id": "ht_18",
    "name": "Olayan Ajyad (Tower 4)",
    "city": "Makkah",
    "rating": 3,
    "distance": 820,
    "rooms": 230,
    "status": "Active",
    "lastUpdated": "2026-06-28"
  }
];

  const { data: hotelList, remove } = useLocalStorageCrud('hotel', initialHotelList);
  const columns = [
    { header: 'Hotel ID', accessor: 'id' as const, sortable: true },
    { 
      header: 'Hotel Name', 
      accessor: (row: typeof hotelList[0]) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.name}</span>
          <span className="text-caption text-muted">Rooms: {row.rooms}</span>
        </div>
      )
    },
    { header: 'City', accessor: 'city' as const, sortable: true },
    { 
      header: 'Star Rating', 
      accessor: (row: typeof hotelList[0]) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {Array.from({ length: row.rating }).map((_, i) => (
            <Star key={i} size={12} fill="var(--color-warning)" stroke="var(--color-warning)" />
          ))}
        </span>
      ),
      sortable: true
    },
    { 
      header: 'Distance to Haram', 
      accessor: (row: typeof hotelList[0]) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={12} className="text-muted" />
          {row.distance} m
        </span>
      ),
      sortable: true
    },
    { 
      header: 'Status', 
      accessor: (row: typeof hotelList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Active') variant = 'success';
        if (row.status === 'Inactive') variant = 'neutral';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    { header: 'Last Updated', accessor: 'lastUpdated' as const, sortable: true },
    {
      header: 'Actions',
      accessor: (row: typeof hotelList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('hotel-details', { id: row.id }) },
            { id: 'edit', label: 'Edit', icon: <Edit size={16} />, onClick: () => console.log('Edit', row.id) },
            { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, danger: true, onClick: () => { if(window.confirm('Are you sure?')) remove(row.id) } }
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'city',
      label: 'City',
      options: [
        { value: 'makkah', label: 'Makkah' },
        { value: 'madinah', label: 'Madinah' },
        { value: 'jeddah', label: 'Jeddah' },
      ]
    },
    {
      id: 'rating',
      label: 'Star Rating',
      options: [
        { value: '5', label: '5 Star' },
        { value: '4', label: '4 Star' },
        { value: '3', label: '3 Star' },
        { value: 'unrated', label: 'Unrated' }
      ]
    },
    {
      id: 'distance',
      label: 'Distance',
      options: [
        { value: '0-250', label: '0-250 m' },
        { value: '251-500', label: '251-500 m' },
        { value: '501-1000', label: '501 m - 1 km' },
        { value: '1km-plus', label: '1 km+' }
      ]
    },
    {
      id: 'distanceMode',
      label: 'Distance Mode',
      options: [
        { value: 'walking', label: 'Walking' },
        { value: 'shuttle', label: 'Shuttle' },
        { value: 'driving', label: 'Driving' }
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
      id: 'roomType',
      label: 'Room Type',
      options: [
        { value: 'single', label: 'Single' },
        { value: 'double', label: 'Double' },
        { value: 'twin', label: 'Twin' },
        { value: 'triple', label: 'Triple' },
        { value: 'quad', label: 'Quad' },
        { value: 'family', label: 'Family' },
        { value: 'suite', label: 'Suite' }
      ]
    },
    {
      id: 'amenities',
      label: 'Amenities',
      options: [
        { value: 'wifi', label: 'Wi-Fi' },
        { value: 'elevator', label: 'Elevator' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'shuttle', label: 'Shuttle' },
        { value: 'accessible', label: 'Accessible Room' },
        { value: 'haram_view', label: 'Haram View' }
      ]
    },
    {
      id: 'usedIn',
      label: 'Used In',
      options: [
        { value: 'not_used', label: 'Not Used' },
        { value: 'package', label: 'Used in Package' },
        { value: 'group_trip', label: 'Used in Group Trip' }
      ]
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'draft', label: 'Draft' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'archived', label: 'Archived' }
      ]
    },
    {
      id: 'date',
      label: 'Date Created',
      options: [
        { value: 'today', label: 'Today' },
        { value: 'this_week', label: 'This Week' },
        { value: 'this_month', label: 'This Month' }
      ]
    }
  ];
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
  } = useDataFilter(hotelList, {
    defaultSort: { key: 'lastUpdated', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Hotel Catalog"
        breadcrumbs={[{ label: 'Home' }, { label: 'Hotels' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <ExportControl onExport={(f) => console.log(f)} />
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('hotel-add')}>
            Add Hotel
          </Button>
          </div>
        }
      />

      <FilterBar 
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search by hotel name, city, or location..."
      />

      {selectedHotels.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
          <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{selectedHotels.length} hotels selected</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="sm" onClick={() => console.log('Set Available')}>Set Available for Package</Button>
            <Button variant="secondary" size="sm" onClick={() => console.log('Change Status')}>Change Status</Button>
          </div>
        </div>
      )}

      <DataTable 
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
        columns={columns}
        keyExtractor={(r) => r.id}
        isLoading={isLoading}
        selectedKeys={selectedHotels}
        onSelectionChange={setSelectedHotels}
        emptyStateTitle="No hotel catalog found"
        emptyStateDescription="Try adjusting your search or filters."
      />
    </div>
  );
};
