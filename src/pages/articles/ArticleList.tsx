import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Plus, FileText, CheckCircle, Clock, Eye, Star, Edit, Trash2, ChevronRight } from 'lucide-react';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';

export const ArticleList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

  // Mock Data
  const articleList = [
  {
    "id": "art_1",
    "title": "Visa Application Process (Vol 1)",
    "author": "Fatimah Zahra",
    "category": "Visa Guide",
    "status": "Published",
    "views": 155,
    "publishedDate": "11 Jun 2026"
  },
  {
    "id": "art_2",
    "title": "Top Places in Madinah (Vol 2)",
    "author": "Zulkifli Harun",
    "category": "Local Ziyarah",
    "status": "Published",
    "views": 210,
    "publishedDate": "12 Jun 2026"
  },
  {
    "id": "art_3",
    "title": "Staying Healthy in Makkah (Vol 3)",
    "author": "Nurul Aini",
    "category": "Health Tips",
    "status": "Published",
    "views": 265,
    "publishedDate": "13 Jun 2026"
  },
  {
    "id": "art_4",
    "title": "First Time Mutawwif Tips (Vol 4)",
    "author": "Ahmad Syakir",
    "category": "Umrah Prep",
    "status": "Published",
    "views": 320,
    "publishedDate": "14 Jun 2026"
  },
  {
    "id": "art_5",
    "title": "Understanding Ihram Rules (Vol 5)",
    "author": "Fatimah Zahra",
    "category": "Visa Guide",
    "status": "Draft",
    "views": 375,
    "publishedDate": "15 Jun 2026"
  },
  {
    "id": "art_6",
    "title": "Essential Packing Guide (Vol 6)",
    "author": "Zulkifli Harun",
    "category": "Local Ziyarah",
    "status": "Published",
    "views": 430,
    "publishedDate": "16 Jun 2026"
  },
  {
    "id": "art_7",
    "title": "Visa Application Process (Vol 7)",
    "author": "Nurul Aini",
    "category": "Health Tips",
    "status": "Published",
    "views": 485,
    "publishedDate": "17 Jun 2026"
  },
  {
    "id": "art_8",
    "title": "Top Places in Madinah (Vol 8)",
    "author": "Ahmad Syakir",
    "category": "Umrah Prep",
    "status": "Published",
    "views": 540,
    "publishedDate": "18 Jun 2026"
  },
  {
    "id": "art_9",
    "title": "Staying Healthy in Makkah (Vol 9)",
    "author": "Fatimah Zahra",
    "category": "Visa Guide",
    "status": "Published",
    "views": 595,
    "publishedDate": "19 Jun 2026"
  },
  {
    "id": "art_10",
    "title": "First Time Mutawwif Tips (Vol 10)",
    "author": "Zulkifli Harun",
    "category": "Local Ziyarah",
    "status": "Draft",
    "views": 650,
    "publishedDate": "20 Jun 2026"
  },
  {
    "id": "art_11",
    "title": "Understanding Ihram Rules (Vol 11)",
    "author": "Nurul Aini",
    "category": "Health Tips",
    "status": "Published",
    "views": 705,
    "publishedDate": "21 Jun 2026"
  },
  {
    "id": "art_12",
    "title": "Essential Packing Guide (Vol 12)",
    "author": "Ahmad Syakir",
    "category": "Umrah Prep",
    "status": "Published",
    "views": 760,
    "publishedDate": "22 Jun 2026"
  },
  {
    "id": "art_13",
    "title": "Visa Application Process (Vol 13)",
    "author": "Fatimah Zahra",
    "category": "Visa Guide",
    "status": "Published",
    "views": 815,
    "publishedDate": "23 Jun 2026"
  },
  {
    "id": "art_14",
    "title": "Top Places in Madinah (Vol 14)",
    "author": "Zulkifli Harun",
    "category": "Local Ziyarah",
    "status": "Published",
    "views": 870,
    "publishedDate": "24 Jun 2026"
  },
  {
    "id": "art_15",
    "title": "Staying Healthy in Makkah (Vol 15)",
    "author": "Nurul Aini",
    "category": "Health Tips",
    "status": "Draft",
    "views": 925,
    "publishedDate": "25 Jun 2026"
  },
  {
    "id": "art_16",
    "title": "First Time Mutawwif Tips (Vol 16)",
    "author": "Ahmad Syakir",
    "category": "Umrah Prep",
    "status": "Published",
    "views": 980,
    "publishedDate": "26 Jun 2026"
  },
  {
    "id": "art_17",
    "title": "Understanding Ihram Rules (Vol 17)",
    "author": "Fatimah Zahra",
    "category": "Visa Guide",
    "status": "Published",
    "views": 1035,
    "publishedDate": "27 Jun 2026"
  },
  {
    "id": "art_18",
    "title": "Essential Packing Guide (Vol 18)",
    "author": "Zulkifli Harun",
    "category": "Local Ziyarah",
    "status": "Published",
    "views": 1090,
    "publishedDate": "28 Jun 2026"
  }
];

  const columns = [
    { header: 'Article ID', accessor: 'id' as const, sortable: true },
    { header: 'Title', accessor: 'title' as const, sortable: true },
    { header: 'Author', accessor: 'author' as const, sortable: true },
    { header: 'Category', accessor: 'category' as const, sortable: true },
    { 
      header: 'Views', 
      accessor: (row: typeof articleList[0]) => (
        <span>{row.views.toLocaleString()}</span>
      ),
      sortable: true
    },
    { 
      header: 'Status', 
      accessor: (row: typeof articleList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Published') variant = 'success';
        if (row.status === 'Draft') variant = 'neutral';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    { header: 'Published Date', accessor: 'publishedDate' as const, sortable: true },
    {
      header: 'Actions',
      accessor: (row: typeof articleList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('article-details', { id: row.id }) },
            { id: 'edit', label: 'Edit', icon: <Edit size={16} />, onClick: () => console.log('Edit', row.id) },
            { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, danger: true, onClick: () => console.log('Delete', row.id) }
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'archived', label: 'Archived' },
      ]
    },
    {
      id: 'category',
      label: 'Category',
      options: [
        { value: 'fiqh', label: 'Umrah Fiqh' },
        { value: 'tips', label: 'Practical Tips' },
        { value: 'news', label: 'News & Updates' },
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
  } = useDataFilter(articleList, {
    defaultSort: { key: 'lastUpdated', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Articles Management"
        breadcrumbs={[{ label: 'Communications' }, { label: 'Articles' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('article-create')}>Create New Article</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Articles" value="142" icon={<FileText size={18} className="text-primary" />} iconBg="var(--color-primary-light)" trend="up" trendValue="+12 this month" />
        <MetricCard title="Published" value="118" icon={<CheckCircle size={18} className="text-success" />} iconBg="var(--color-success-light)" trend="neutral" trendValue="83% of total" />
        <MetricCard title="Drafts & Scheduled" value="24" icon={<Clock size={18} className="text-warning" />} iconBg="var(--color-warning-light)" trend="down" trendValue="-3 vs last month" />
        <MetricCard title="Total Views" value="458.2K" icon={<Eye size={18} className="text-info" />} iconBg="var(--surface-info)" trend="up" trendValue="+24.5% vs last month" />
      </div>

      <FilterBar 
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search by title, excerpt, or author..."
      />

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
        selectedKeys={selectedItems}
        onSelectionChange={setSelectedItems}
        emptyStateTitle="No articles found"
      />
    </div>
  );
};
