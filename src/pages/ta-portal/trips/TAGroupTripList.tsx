import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { DataTable } from '../../../components/data-display/DataTable';
import { Badge } from '../../../components/data-display/Badge';
import { MetricCard } from '../../../components/data-display/MetricCard';
import { UserProfileCell } from '../../../components/data-display/UserProfileCell';
import { FilterBar, FilterGroup } from '../../../components/inputs/FilterBar';
import { SearchInput } from '../../../components/inputs/SearchInput';
import { Briefcase, PlaneTakeoff, ShieldCheck, FileWarning, Eye, Edit2, Archive, Link as LinkIcon, Calendar, Users, Package } from 'lucide-react';
import { getStatusBadgeVariant } from '../../../utils/badge';
import { Button } from '../../../components/actions/Button';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';

// Force HMR update
export const TAGroupTripList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Mock data based on PRD TA_PRD_07
  const mockTrips = [
    {
      id: 'TRP-1001',
      name: 'Premium Umrah Safwa',
      package: 'Umrah Premium 12D/10N',
      mutawwif: 'Ustaz Ahmad',
      schedule: '15 Dec 2026 - 27 Dec 2026',
      status: 'active',
      readiness: 'Complete',
      members: 45,
      capacity: 45,
      dateCreated: '10 Nov 2026',
      imageUrl: 'https://ui-avatars.com/api/?name=PU&background=0D9488&color=fff&size=100'
    },
    {
      id: 'TRP-1002',
      name: 'Umrah Ziyarah Plus',
      package: 'Umrah Ziyarah 14D',
      mutawwif: 'Pending Assignment',
      schedule: '20 Jan 2027 - 03 Feb 2027',
      status: 'upcoming',
      readiness: 'Pending Documents',
      members: 30,
      capacity: 45,
      dateCreated: '12 Nov 2026',
      imageUrl: 'https://ui-avatars.com/api/?name=UZ&background=0284C7&color=fff&size=100'
    },
    {
      id: 'TRP-1003',
      name: 'Hajj Package 1448H',
      package: 'Hajj Standard',
      mutawwif: 'Ustaz Karim',
      schedule: '01 Jun 2027 - 15 Jul 2027',
      status: 'planning',
      readiness: 'Incomplete',
      members: 120,
      capacity: 150,
      dateCreated: '01 Dec 2026',
      imageUrl: 'https://ui-avatars.com/api/?name=HP&background=D97706&color=fff&size=100'
    }
  ];

  const filteredTrips = mockTrips.filter(trip => 
    trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.package.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterOptions: FilterGroup[] = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { label: 'All Statuses', value: 'all' },
        { label: 'Planning', value: 'planning' },
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' }
      ]
    },
    {
      id: 'date',
      label: 'Departure Month',
      options: [
        { label: 'All Time', value: 'all' },
        { label: 'December 2026', value: 'dec26' },
        { label: 'January 2027', value: 'jan27' }
      ]
    }
  ];

  const columns = [
    {
      header: 'Group Trip',
      accessor: (row: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', overflow: 'hidden', backgroundColor: 'var(--color-primary-50)', flexShrink: 0 }}>
            {row.imageUrl ? (
              <img src={row.imageUrl} alt={row.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={20} className="text-primary-600" />
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
            <span className="text-body-bold">{row.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span className="text-caption text-muted">{row.id}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                <Users size={12} />
                <span>{row.members} / {row.capacity || 45} pax</span>
              </div>
            </div>
            
            {/* Progress Bar for Seats */}
            <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--color-primary-100)', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${Math.min(100, Math.round((row.members / (row.capacity || 45)) * 100))}%`, 
                  backgroundColor: row.members >= (row.capacity || 45) ? 'var(--color-success)' : 'var(--color-primary)',
                  transition: 'width 0.5s ease-in-out'
                }} 
              />
            </div>
          </div>
        </div>
      )
    },
    { 
      header: 'Package', 
      accessor: (row: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Package size={14} className="text-muted" />
          <span className="text-body">{row.package}</span>
        </div>
      )
    },
    { 
      header: 'Mutawwif', 
      accessor: (row: any) => row.mutawwif && row.mutawwif !== 'Pending Assignment' ? (
        <UserProfileCell 
          name={row.mutawwif} 
          email={`${row.mutawwif.toLowerCase().replace(/[^a-z0-9]/g, '')}@alhijrah.com`} 
          isVerified={true} 
        />
      ) : (
        <span className="text-body text-muted">{row.mutawwif}</span>
      )
    },
    { 
      header: 'Schedule', 
      accessor: (row: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={14} className="text-primary" />
          <span className="text-body" style={{ whiteSpace: 'nowrap' }}>{row.schedule}</span>
        </div>
      )
    },
    {
      header: 'Readiness',
      accessor: (row: any) => (
        <Badge variant={row.readiness === 'Complete' ? 'success' : row.readiness === 'Pending Documents' ? 'warning' : 'danger'}>
          {row.readiness}
        </Badge>
      )
    },
    {
      header: 'Status',
      accessor: (row: any) => <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge>
    },
    {
      header: 'Actions',
      accessor: (row: any) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('ta-trip-details', { id: row.id }) },
            { id: 'edit', label: 'Edit', icon: <Edit2 size={16} />, onClick: () => console.log('Edit', row.id) },
            { id: 'copy', label: 'Copy Link', icon: <LinkIcon size={16} />, onClick: () => alert('Link copied') },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader
        title="Group Trip Management"
        actions={
          <Button onClick={() => navigate('ta-trip-create')}>Create Group Trip</Button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Group Trips" value="24" icon={<Briefcase />} />
        <MetricCard title="Upcoming Departures" value="8" icon={<PlaneTakeoff />} trend="up" trendValue="+2 this month" />
        <MetricCard title="Ready Trips" value="5" icon={<ShieldCheck />} />
        <MetricCard title="Pending Documents" value="3" icon={<FileWarning />} />
      </div>

      <FilterBar
        filters={filterOptions}
        searchValue={searchQuery}
        onSearch={setSearchQuery}
        searchPlaceholder="Search group trips, packages..."
        onFilterChange={(id, value) => {}}
        onClearFilters={() => {}}
      />
      
      {selectedRows.size > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
          <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{selectedRows.size} trips selected</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="sm" onClick={() => console.log('Export')}>Export Selected</Button>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={filteredTrips}
        keyExtractor={(row) => row.id}
        selectedKeys={selectedRows}
        onSelectionChange={setSelectedRows}
        onRowClick={(row) => navigate('ta-trip-details', { id: row.id })}
      />
    </div>
  );
};
