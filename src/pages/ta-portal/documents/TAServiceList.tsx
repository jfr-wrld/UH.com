import React, { useState, useEffect } from 'react';
import { DataTable } from '../../../components/data-display/DataTable';
import { Badge } from '../../../components/data-display/Badge';
import { FilterBar } from '../../../components/inputs/FilterBar';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';
import { Edit2, MessageSquare, AlertTriangle } from 'lucide-react';

export const TAServiceList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load services:', err);
        setIsLoading(false);
      });
  }, []);

  const getServiceBadgeVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Blocked': return 'error';
      case 'In Progress': return 'info';
      case 'Pending Confirmation': return 'warning';
      case 'Not Started': return 'neutral';
      default: return 'info';
    }
  };

  const columns = [
    {
      key: 'member',
      header: 'Member',
      accessor: (row: any) => (
        <div>
          <div className="text-body-bold">{row.name}</div>
          <div className="text-sm text-neutral-500">{row.bookingRef} | {row.groupTrip}</div>
        </div>
      )
    },
    {
      key: 'visa',
      header: 'Visa Processing',
      accessor: (row: any) => (
        <div>
          <Badge variant={getServiceBadgeVariant(row.services.visaProcessing.status)}>{row.services.visaProcessing.status}</Badge>
          {row.services.visaProcessing.note && <div className="text-xs text-error mt-1">{row.services.visaProcessing.note}</div>}
        </div>
      )
    },
    {
      key: 'flight',
      header: 'Flight E-Ticket',
      accessor: (row: any) => (
        <div>
          <Badge variant={getServiceBadgeVariant(row.services.flightEticket.status)}>{row.services.flightEticket.status}</Badge>
          {row.services.flightEticket.note && <div className="text-xs text-neutral-500 mt-1">{row.services.flightEticket.note}</div>}
        </div>
      )
    },
    {
      key: 'room',
      header: 'Room Config',
      accessor: (row: any) => (
        <div>
          <Badge variant={getServiceBadgeVariant(row.services.roomAllocation.status)}>{row.services.roomAllocation.status}</Badge>
          {row.services.roomAllocation.note && <div className="text-xs text-neutral-500 mt-1">{row.services.roomAllocation.note}</div>}
        </div>
      )
    },
    {
      key: 'readiness',
      header: 'Readiness',
      accessor: (row: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--color-neutral-200)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${row.readiness}%`, height: '100%', backgroundColor: row.readiness === 100 ? 'var(--color-success)' : 'var(--color-warning)' }} />
          </div>
          <span className="text-sm font-medium">{row.readiness}%</span>
        </div>
      )
    },
    {
      key: 'actions',
      header: '',
      accessor: (row: any) => (
        <DropdownMenu
          trigger={<span>•••</span>}
          items={[
            { id: 'update', label: 'Update Status', icon: <Edit2 size={16} /> },
            { id: 'remind', label: 'Send Reminder', icon: <MessageSquare size={16} /> },
            { id: 'block', label: 'Mark Blocked', icon: <AlertTriangle size={16} />, danger: true }
          ]}
          onSelect={(id) => console.log(id, row.id)}
        />
      )
    }
  ];

  const filterOptions = [
    {
      id: 'serviceStatus',
      label: 'Service Status',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'blocked', label: 'Blocked' },
        { value: 'pending', label: 'Pending Confirmation' },
        { value: 'completed', label: 'Completed' }
      ]
    }
  ];

  const filteredData = services.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.bookingRef.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <FilterBar
        filters={filterOptions}
        searchValue={searchQuery}
        onSearch={setSearchQuery}
        searchPlaceholder="Search jamaah, booking ref..."
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />

      {isLoading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-neutral-500)' }}>Loading services...</div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredData}
          keyExtractor={(row) => row.id}
          selectedKeys={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      )}
    </div>
  );
};
