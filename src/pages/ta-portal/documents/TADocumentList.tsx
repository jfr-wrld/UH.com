import React, { useState, useEffect } from 'react';
import { DataTable } from '../../../components/data-display/DataTable';
import { Badge } from '../../../components/data-display/Badge';
import { FilterBar } from '../../../components/inputs/FilterBar';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';
import { Upload, Eye, RefreshCw } from 'lucide-react';

export const TADocumentList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/documents')
      .then(res => res.json())
      .then(data => {
        setDocuments(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load documents:', err);
        setIsLoading(false);
      });
  }, []);

  const getDocBadgeVariant = (status: string) => {
    switch (status) {
      case 'Verified': return 'success';
      case 'Expiring Soon': return 'warning';
      case 'Missing': return 'error';
      case 'Pending Review': return 'warning';
      case 'Need Revision': return 'error';
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
      key: 'ic',
      header: 'IC / ID',
      accessor: (row: any) => (
        <Badge variant={getDocBadgeVariant(row.documents.ic.status)}>{row.documents.ic.status}</Badge>
      )
    },
    {
      key: 'passport',
      header: 'Passport',
      accessor: (row: any) => (
        <div>
          <Badge variant={getDocBadgeVariant(row.documents.passport.status)}>{row.documents.passport.status}</Badge>
          {row.documents.passport.expiry && <div className="text-xs text-neutral-500 mt-1">Exp: {row.documents.passport.expiry}</div>}
        </div>
      )
    },
    {
      key: 'visa',
      header: 'Visa',
      accessor: (row: any) => (
        <Badge variant={getDocBadgeVariant(row.documents.visa.status)}>{row.documents.visa.status}</Badge>
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
            { id: 'upload', label: 'Upload Document', icon: <Upload size={16} /> },
            { id: 'preview', label: 'Preview Verified Docs', icon: <Eye size={16} /> },
            { id: 'request-revision', label: 'Request Revision', icon: <RefreshCw size={16} /> }
          ]}
          onSelect={(id) => console.log(id, row.id)}
        />
      )
    }
  ];

  const filterOptions = [
    {
      id: 'docStatus',
      label: 'Document Status',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'missing', label: 'Missing' },
        { value: 'pending', label: 'Pending Review' },
        { value: 'verified', label: 'Verified' },
        { value: 'expiring', label: 'Expiring Soon' }
      ]
    }
  ];

  const filteredData = documents.filter(item => 
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
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-neutral-500)' }}>Loading documents...</div>
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
