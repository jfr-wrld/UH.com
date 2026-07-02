import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { FilterBar, FilterGroup } from '../../../components/inputs/FilterBar';
import { DataTable } from '../../../components/data-display/DataTable';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';
import { Eye, Bookmark, ExternalLink } from 'lucide-react';
import { useDataFilter } from '../../../hooks/useDataFilter';

export const TAArticleList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const mockArticles = [
    {
      id: "ART-001",
      title: "New Visa Regulations for 2027 Season",
      category: "Visas & Documents",
      tags: ["Policy", "Visa", "Important"],
      readTime: "5 min",
      lastUpdated: "10 Nov 2026",
    },
    {
      id: "ART-002",
      title: "Managing Group Trip Changes Effectively",
      category: "Platform Guide",
      tags: ["Tutorial", "Group Trip"],
      readTime: "8 min",
      lastUpdated: "05 Nov 2026",
    },
    {
      id: "ART-003",
      title: "Umrah Etiquette for First-timers",
      category: "Umrah Fiqh & Rituals",
      tags: ["Reference", "Jamaah"],
      readTime: "12 min",
      lastUpdated: "01 Nov 2026",
    },
    {
      id: "ART-004",
      title: "How to process Refund Requests",
      category: "Platform Guide",
      tags: ["Finance", "Tutorial"],
      readTime: "4 min",
      lastUpdated: "25 Oct 2026",
    }
  ];

  const {
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData,
    searchQuery,
    setSearchQuery,
    sortKey,
    sortOrder,
    onSort,
    currentPage,
    totalPages,
    rowsPerPage,
    totalItems,
    onPageChange,
    onRowsPerPageChange
  } = useDataFilter(mockArticles, {
    defaultSort: { key: 'lastUpdated', order: 'desc' },
    defaultPerPage: 10,
  });

  const columns = [
    {
      header: 'Article Title',
      accessor: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.title}</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
            <span className="text-caption text-primary">{row.category}</span>
            <span className="text-caption text-muted">• {row.readTime}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Tags',
      accessor: (row: any) => (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {row.tags.map((t: string) => <Badge key={t} variant="neutral">{t}</Badge>)}
        </div>
      )
    },
    {
      header: 'Last Updated',
      accessor: (row: any) => <span className="text-body text-muted">{row.lastUpdated}</span>
    },
    {
      header: 'Action',
      accessor: (row: any) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'read', label: 'Read Article', icon: <Eye size={16} />, onClick: () => navigate('ta-article-details', { id: row.id }) },
            { id: 'bookmark', label: 'Bookmark', icon: <Bookmark size={16} />, onClick: () => console.log('Bookmarked') },
            { id: 'copy', label: 'Copy Share Link', icon: <ExternalLink size={16} />, onClick: () => alert('Link copied to clipboard') },
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
        { value: 'Umrah Fiqh & Rituals', label: 'Umrah Fiqh & Rituals' },
        { value: 'Hajj Guidelines', label: 'Hajj Guidelines' },
        { value: 'Visas & Documents', label: 'Visas & Documents' },
        { value: 'Platform Guide', label: 'Platform Guide' },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Browse Articles" 
        breadcrumbs={[
          { label: 'Knowledge Base', onClick: () => navigate('ta-knowledge-base') },
          { label: 'Browse' }
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <FilterBar 
          hasActiveFilters={hasActiveFilters} 
          onClearFilters={clearFilters}
          groups={filterGroups}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          searchPlaceholder="Search by title or keyword..."
          searchValue={searchQuery}
          onSearch={setSearchQuery}
        />

        <DataTable 
          data={filteredData} 
          columns={columns} 
          keyExtractor={(row) => row.id}
          isLoading={isLoading}
          onRowClick={(row: any) => navigate('ta-article-details', { id: row.id })}
          sort={{ key: sortKey, order: sortOrder, onSort }}
          pagination={{ currentPage, totalPages, rowsPerPage, totalItems, onPageChange, onRowsPerPageChange }}
          emptyStateTitle="No articles found"
        />
      </div>
    </div>
  );
};
