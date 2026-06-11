import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Plus, Package, FileText, CheckCircle, Archive, Download, Link as LinkIcon, Star, Eye, Edit, ChevronRight, Trash2, FileEdit } from 'lucide-react';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';

export const PackageList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

  // Mock Data
  const packageList = [
  {
    "id": "pkg_1",
    "code": "PKG-UMR-26-001",
    "name": "Standard Safar Package (v1)",
    "agency": "Global Travel Agency",
    "category": "Umrah",
    "type": "Standard",
    "hotel": "Olayan Ajyad",
    "flight": "Malaysia Airlines (MH)",
    "price": "RM 7200",
    "schedule": "11 Dec 2026",
    "commission": "RM 400",
    "status": "Published",
    "labels": [],
    "dateCreated": "2 Jun 2026"
  },
  {
    "id": "pkg_2",
    "code": "PKG-UMR-26-002",
    "name": "Standard Safar Package (v2)",
    "agency": "Zamzam Travels",
    "category": "Umrah",
    "type": "Standard",
    "hotel": "Swissotel Makkah",
    "flight": "Saudi Airlines (SV)",
    "price": "RM 8400",
    "schedule": "12 Dec 2026",
    "commission": "RM 500",
    "status": "Published",
    "labels": [],
    "dateCreated": "3 Jun 2026"
  },
  {
    "id": "pkg_3",
    "code": "PKG-UMR-26-003",
    "name": "VIP Hajj Package",
    "agency": "Global Travel Agency",
    "category": "Hajj",
    "type": "VIP",
    "hotel": "Olayan Ajyad",
    "flight": "Malaysia Airlines (MH)",
    "price": "RM 9600",
    "schedule": "13 Dec 2026",
    "commission": "RM 600",
    "status": "Published",
    "labels": [
      "Best Seller"
    ],
    "dateCreated": "4 Jun 2026"
  },
  {
    "id": "pkg_4",
    "code": "PKG-UMR-26-004",
    "name": "Standard Safar Package (v4)",
    "agency": "Zamzam Travels",
    "category": "Umrah",
    "type": "Premium",
    "hotel": "Swissotel Makkah",
    "flight": "Saudi Airlines (SV)",
    "price": "RM 10800",
    "schedule": "14 Dec 2026",
    "commission": "RM 700",
    "status": "Draft",
    "labels": [],
    "dateCreated": "5 Jun 2026"
  },
  {
    "id": "pkg_5",
    "code": "PKG-UMR-26-005",
    "name": "Standard Safar Package (v5)",
    "agency": "Global Travel Agency",
    "category": "Umrah",
    "type": "Standard",
    "hotel": "Olayan Ajyad",
    "flight": "Malaysia Airlines (MH)",
    "price": "RM 12000",
    "schedule": "15 Dec 2026",
    "commission": "RM 800",
    "status": "Pending Approval",
    "labels": [],
    "dateCreated": "6 Jun 2026"
  },
  {
    "id": "pkg_6",
    "code": "PKG-UMR-26-006",
    "name": "VIP Gold Umrah 2026 (v6)",
    "agency": "Zamzam Travels",
    "category": "Hajj",
    "type": "VIP",
    "hotel": "Swissotel Makkah",
    "flight": "Saudi Airlines (SV)",
    "price": "RM 13200",
    "schedule": "16 Dec 2026",
    "commission": "RM 900",
    "status": "Published",
    "labels": [
      "Best Seller"
    ],
    "dateCreated": "7 Jun 2026"
  },
  {
    "id": "pkg_7",
    "code": "PKG-UMR-26-007",
    "name": "Standard Safar Package (v7)",
    "agency": "Global Travel Agency",
    "category": "Umrah",
    "type": "Standard",
    "hotel": "Olayan Ajyad",
    "flight": "Malaysia Airlines (MH)",
    "price": "RM 14400",
    "schedule": "17 Dec 2026",
    "commission": "RM 1000",
    "status": "Published",
    "labels": [],
    "dateCreated": "8 Jun 2026"
  },
  {
    "id": "pkg_8",
    "code": "PKG-UMR-26-008",
    "name": "Standard Safar Package (v8)",
    "agency": "Zamzam Travels",
    "category": "Umrah",
    "type": "Premium",
    "hotel": "Swissotel Makkah",
    "flight": "Saudi Airlines (SV)",
    "price": "RM 15600",
    "schedule": "18 Dec 2026",
    "commission": "RM 1100",
    "status": "Draft",
    "labels": [],
    "dateCreated": "9 Jun 2026"
  },
  {
    "id": "pkg_9",
    "code": "PKG-UMR-26-009",
    "name": "VIP Gold Umrah 2026 (v9)",
    "agency": "Global Travel Agency",
    "category": "Hajj",
    "type": "VIP",
    "hotel": "Olayan Ajyad",
    "flight": "Malaysia Airlines (MH)",
    "price": "RM 16800",
    "schedule": "19 Dec 2026",
    "commission": "RM 1200",
    "status": "Published",
    "labels": [
      "Best Seller"
    ],
    "dateCreated": "10 Jun 2026"
  },
  {
    "id": "pkg_10",
    "code": "PKG-UMR-26-010",
    "name": "Standard Safar Package (v10)",
    "agency": "Zamzam Travels",
    "category": "Umrah",
    "type": "Standard",
    "hotel": "Swissotel Makkah",
    "flight": "Saudi Airlines (SV)",
    "price": "RM 18000",
    "schedule": "20 Dec 2026",
    "commission": "RM 1300",
    "status": "Pending Approval",
    "labels": [],
    "dateCreated": "11 Jun 2026"
  },
  {
    "id": "pkg_11",
    "code": "PKG-UMR-26-011",
    "name": "Standard Safar Package (v11)",
    "agency": "Global Travel Agency",
    "category": "Umrah",
    "type": "Standard",
    "hotel": "Olayan Ajyad",
    "flight": "Malaysia Airlines (MH)",
    "price": "RM 19200",
    "schedule": "21 Dec 2026",
    "commission": "RM 1400",
    "status": "Published",
    "labels": [],
    "dateCreated": "12 Jun 2026"
  },
  {
    "id": "pkg_12",
    "code": "PKG-UMR-26-012",
    "name": "VIP Gold Umrah 2026 (v12)",
    "agency": "Zamzam Travels",
    "category": "Hajj",
    "type": "VIP",
    "hotel": "Swissotel Makkah",
    "flight": "Saudi Airlines (SV)",
    "price": "RM 20400",
    "schedule": "22 Dec 2026",
    "commission": "RM 1500",
    "status": "Draft",
    "labels": [
      "Best Seller"
    ],
    "dateCreated": "13 Jun 2026"
  },
  {
    "id": "pkg_13",
    "code": "PKG-UMR-26-013",
    "name": "Standard Safar Package (v13)",
    "agency": "Global Travel Agency",
    "category": "Umrah",
    "type": "Standard",
    "hotel": "Olayan Ajyad",
    "flight": "Malaysia Airlines (MH)",
    "price": "RM 21600",
    "schedule": "23 Dec 2026",
    "commission": "RM 1600",
    "status": "Published",
    "labels": [],
    "dateCreated": "14 Jun 2026"
  },
  {
    "id": "pkg_14",
    "code": "PKG-UMR-26-014",
    "name": "Standard Safar Package (v14)",
    "agency": "Zamzam Travels",
    "category": "Umrah",
    "type": "Standard",
    "hotel": "Swissotel Makkah",
    "flight": "Saudi Airlines (SV)",
    "price": "RM 22800",
    "schedule": "24 Dec 2026",
    "commission": "RM 1700",
    "status": "Published",
    "labels": [],
    "dateCreated": "15 Jun 2026"
  },
  {
    "id": "pkg_15",
    "code": "PKG-UMR-26-015",
    "name": "VIP Gold Umrah 2026 (v15)",
    "agency": "Global Travel Agency",
    "category": "Hajj",
    "type": "VIP",
    "hotel": "Olayan Ajyad",
    "flight": "Malaysia Airlines (MH)",
    "price": "RM 24000",
    "schedule": "25 Dec 2026",
    "commission": "RM 1800",
    "status": "Pending Approval",
    "labels": [
      "Best Seller"
    ],
    "dateCreated": "16 Jun 2026"
  },
  {
    "id": "pkg_16",
    "code": "PKG-UMR-26-016",
    "name": "Standard Safar Package (v16)",
    "agency": "Zamzam Travels",
    "category": "Umrah",
    "type": "Premium",
    "hotel": "Swissotel Makkah",
    "flight": "Saudi Airlines (SV)",
    "price": "RM 25200",
    "schedule": "26 Dec 2026",
    "commission": "RM 1900",
    "status": "Draft",
    "labels": [],
    "dateCreated": "17 Jun 2026"
  },
  {
    "id": "pkg_17",
    "code": "PKG-UMR-26-017",
    "name": "Standard Safar Package (v17)",
    "agency": "Global Travel Agency",
    "category": "Umrah",
    "type": "Standard",
    "hotel": "Olayan Ajyad",
    "flight": "Malaysia Airlines (MH)",
    "price": "RM 26400",
    "schedule": "27 Dec 2026",
    "commission": "RM 2000",
    "status": "Published",
    "labels": [],
    "dateCreated": "18 Jun 2026"
  },
  {
    "id": "pkg_18",
    "code": "PKG-UMR-26-018",
    "name": "VIP Gold Umrah 2026 (v18)",
    "agency": "Zamzam Travels",
    "category": "Hajj",
    "type": "VIP",
    "hotel": "Swissotel Makkah",
    "flight": "Saudi Airlines (SV)",
    "price": "RM 27600",
    "schedule": "28 Dec 2026",
    "commission": "RM 2100",
    "status": "Published",
    "labels": [
      "Best Seller"
    ],
    "dateCreated": "19 Jun 2026"
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
  } = useDataFilter(packageList, {
    defaultSort: { key: 'id', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

  const columns = [
    {
      header: 'Package',
      accessor: (row: typeof packageList[0]) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.name}</span>
          <span className="text-caption text-muted">{row.code}</span>
          {row.labels.length > 0 && (
            <div style={{ display: 'flex', gap: 'var(--space-1)', marginTop: 'var(--space-1)' }}>
              {row.labels.map(label => (
                <Badge key={label} variant="primary" style={{ fontSize: '0.6rem', padding: '2px 4px' }}>{label}</Badge>
              ))}
            </div>
          )}
        </div>
      )
    },
    {
      header: 'Agency & Type',
      accessor: (row: typeof packageList[0]) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.agency}</span>
          <span className="text-caption text-muted">{row.category} • {row.type}</span>
        </div>
      )
    },
    {
      header: 'Logistics',
      accessor: (row: typeof packageList[0]) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} className="text-warning" /> {row.hotel}</span>
          <span className="text-caption text-muted">{row.flight}</span>
        </div>
      )
    },
    {
      header: 'Pricing & Comm',
      accessor: (row: typeof packageList[0]) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.price}</span>
          <span className="text-caption text-success">Comm: {row.commission}</span>
        </div>
      )
    },
    {
      header: 'Next Schedule',
      accessor: (row: typeof packageList[0]) => (
        <span className="text-body">{row.schedule}</span>
      )
    },
    {
      header: 'Status & Date',
      accessor: (row: typeof packageList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Published') variant = 'success';
        if (row.status === 'Pending Approval') variant = 'warning';
        if (row.status === 'Draft') variant = 'neutral';
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <Badge variant={variant} style={{ width: 'fit-content' }}>{row.status}</Badge>
            <span className="text-caption text-muted">{row.dateCreated}</span>
          </div>
        );
      }
    },
    {
      header: 'Action',
      accessor: (row: typeof packageList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('package-details', { id: row.id }) },
            { id: 'edit', label: 'Edit Package', icon: <Edit size={16} />, onClick: () => console.log('Edit', row.id) },
            { id: 'share', label: 'Copy Share Link', icon: <LinkIcon size={16} />, onClick: () => console.log('Share', row.id) },
            { id: 'draft', label: 'Set as Draft', icon: <FileEdit size={16} />, onClick: () => console.log('Set Draft', row.id) },
            { id: 'archive', label: 'Archive', icon: <Archive size={16} />, onClick: () => console.log('Archive', row.id) },
            { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, danger: true, onClick: () => console.log('Delete', row.id) },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'category',
      label: 'Category',
      options: [
        { value: 'umrah', label: 'Umrah' },
        { value: 'hajj', label: 'Hajj' },
        { value: 'custom', label: 'Custom' },
        { value: 'ziyarah', label: 'Ziyarah' }
      ]
    },
    {
      id: 'type',
      label: 'Type',
      options: [
        { value: 'economy', label: 'Economy' },
        { value: 'standard', label: 'Standard' },
        { value: 'premium', label: 'Premium' },
        { value: 'vip', label: 'VIP' }
      ]
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
        { value: 'pending', label: 'Pending Approval' },
        { value: 'archived', label: 'Archived' }
      ]
    },
    {
      id: 'agency',
      label: 'Agency',
      options: [
        { value: 'zamzam', label: 'Zamzam Travels' },
        { value: 'global', label: 'Global Travel Agency' }
      ]
    },
    {
      id: 'hotel',
      label: 'Hotel',
      options: [
        { value: 'swiss', label: 'Swissotel Makkah' },
        { value: 'pullman', label: 'Pullman Zamzam' }
      ]
    },
    {
      id: 'flight',
      label: 'Flight',
      options: [
        { value: 'sv', label: 'Saudi Airlines' },
        { value: 'mh', label: 'Malaysia Airlines' }
      ]
    },
    {
      id: 'availability',
      label: 'Availability',
      options: [
        { value: 'open', label: 'Open' },
        { value: 'closed', label: 'Closed' },
        { value: 'soldout', label: 'Sold Out' },
        { value: 'request', label: 'On Request' }
      ]
    }
  ];
return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Package Management"
        breadcrumbs={[{ label: 'Home' }, { label: 'Packages' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export</Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('package-create')}>Create Package</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Packages" value="124" icon={<Package size={20} className="text-primary" />} iconBg="var(--color-primary-light)" />
        <MetricCard title="Published" value="89" icon={<CheckCircle size={20} className="text-success" />} iconBg="var(--color-success-light)" />
        <MetricCard title="Draft / Pending" value="15" icon={<FileText size={20} className="text-warning" />} iconBg="var(--color-warning-light)" />
        <MetricCard title="Archived" value="20" icon={<Archive size={20} className="text-muted" />} iconBg="var(--gray-100)" />
      </div>

      <FilterBar 
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search packages by name, code, agency, hotel..."
      />

      {selectedPackages.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
          <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{selectedPackages.length} packages selected</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="sm" onClick={() => console.log('Export')}>Export Selected</Button>
            <Button variant="secondary" size="sm" onClick={() => console.log('Archive')}>Archive Selected</Button>
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
        selectedKeys={selectedPackages}
        onSelectionChange={setSelectedPackages}
        emptyStateTitle="No packages found"
      />
    </div>
  );
};
