import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { DataTable } from '../../../components/data-display/DataTable';
import { Button } from '../../../components/actions/Button';
import { Badge } from '../../../components/data-display/Badge';
import { FilterBar, FilterGroup } from '../../../components/inputs/FilterBar';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';
import { MetricCard } from '../../../components/data-display/MetricCard';
import { UserProfileCell } from '../../../components/data-display/UserProfileCell';
import { UserCheck, Eye, Download, UserPlus, Star, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface TAMutawwifListProps {
  navigate: (path: string, state?: any) => void;
}

export const TAMutawwifList: React.FC<TAMutawwifListProps> = ({ navigate }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchMutawwifs();
  }, []);

  const fetchMutawwifs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/ta/mutawwif');
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.languages.some((l: string) => l.toLowerCase().includes(searchTerm.toLowerCase())) ||
           item.specializations.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesStatus = true;
    if (activeFilters.status) {
      if (activeFilters.status === 'conflict') matchesStatus = item.availability === 'conflict';
      if (activeFilters.status === 'available') matchesStatus = item.availability !== 'conflict';
    }

    let matchesJobType = true;
    if (activeFilters.jobType) {
      matchesJobType = item.jobType === activeFilters.jobType;
    }

    return matchesSearch && matchesStatus && matchesJobType;
  });

  const filterGroups: FilterGroup[] = [
    {
      id: 'status', label: 'Availability',
      options: [
        { value: 'available', label: 'Available' },
        { value: 'conflict', label: 'Schedule Conflict' }
      ]
    },
    {
      id: 'jobType', label: 'Job Type',
      options: [
        { value: 'freelance', label: 'Freelance' },
        { value: 'fulltime', label: 'Full Time' }
      ]
    }
  ];

  const columns = [
    {
      header: 'Mutawwif',
      accessor: (row: any) => (
        <UserProfileCell 
          name={row.name} 
          email={`${row.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@example.com`} 
          isVerified={true}
          subtitleNode={<span className="text-caption text-muted capitalize">{row.jobType}</span>}
        />
      )
    },
    {
      header: 'Languages',
      accessor: (row: any) => {
        const langMap: Record<string, string> = {
          'ar': 'Arabic',
          'ms': 'Malay',
          'en': 'English',
          'id': 'Indonesian'
        };
        return (
          <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
            {row.languages.map((l: string) => (
              <Badge key={l} variant="neutral">{langMap[l.toLowerCase()] || l.toUpperCase()}</Badge>
            ))}
          </div>
        );
      }
    },
    {
      header: 'Specializations',
      accessor: (row: any) => (
        <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
          {row.specializations.map((s: string) => (
            <Badge key={s} variant="info">
              {s.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Badge>
          ))}
        </div>
      )
    },
    {
      header: 'Rating',
      accessor: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span className="text-body-bold" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={14} style={{ color: 'var(--color-warning)', fill: 'var(--color-warning)' }} /> 
            {row.rating}
          </span>
          <span className="text-caption text-muted">{row.reviewCount} reviews</span>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (row: any) => {
        if (row.availability === 'conflict') {
          return <Badge variant="warning">Schedule Conflict</Badge>;
        }
        return <Badge variant="success">Available</Badge>;
      }
    },
    {
      header: 'Actions',
      accessor: (row: any) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Profile', icon: <Eye size={16} />, onClick: () => navigate('ta-mutawwif-details', { id: row.id }) }
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Mutawwif Assignment" 
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export</Button>
            <Button variant="primary" leftIcon={<UserPlus size={16} />}>Onboard Mutawwif</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Mutawwif" value={data.length.toString()} icon={<UserCheck size={20} />} />
        <MetricCard title="Available Now" value={data.filter(d => d.availability === 'available').length.toString()} icon={<CheckCircle2 size={20} />} />
        <MetricCard title="On Trips" value={data.filter(d => d.availability === 'conflict').length.toString()} icon={<AlertTriangle size={20} />} />
        <MetricCard title="Avg Rating" value="4.8" icon={<Star size={20} />} />
      </div>

      <FilterBar
        groups={filterGroups}
        activeFilters={activeFilters}
        searchValue={searchTerm}
        onSearch={setSearchTerm}
        searchPlaceholder="Search by name, language or specialization..."
        onFilterChange={(groupId, value) => {
          setActiveFilters(prev => ({ ...prev, [groupId]: value }));
        }}
        onClearFilters={() => {
          setActiveFilters({});
          setSearchTerm('');
        }}
        hasActiveFilters={Object.keys(activeFilters).length > 0}
      />

      <div className="data-table-container">
        <DataTable 
          columns={columns}
          data={filteredData}
          isLoading={loading}
          keyExtractor={(row) => row.id}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          onRowClick={(row) => navigate('ta-mutawwif-details', { id: row.id })}
          emptyStateTitle="No mutawwif found"
          emptyStateDescription="Try adjusting your search criteria."
        />
      </div>
    </div>
  );
};
