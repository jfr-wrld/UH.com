import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Badge } from '../../../components/data-display/Badge';
import { DataTable } from '../../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../../components/inputs/FilterBar';
import { Tabs } from '../../../components/navigation/Tabs';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';
import { Star, Eye, MessageSquare, ThumbsUp } from 'lucide-react';
import { MetricCard } from '../../../components/data-display/MetricCard';
import { ExportControl } from '../../../components/domain/ExportControl';
import { useDataFilter } from '../../../hooks/useDataFilter';
import { getStatusBadgeVariant } from '../../../utils/badge';

export const TATestimonialList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('end-trip');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Mock Data
  const endTripData = [
    {
      id: "t_1",
      submitter: "Siti Aminah (Family of 2)",
      trip: "TRP-1001 (Premium Umrah)",
      mutawwif: "Ustaz Don Daniyal",
      ratingOverall: 4,
      ratingTA: 5,
      ratingMutawwif: 4,
      recommend: "Yes",
      mediaCount: 1,
      consent: "Consent Given",
      status: "Approved Public",
      date: "11 Nov 2026"
    },
    {
      id: "t_2",
      submitter: "Zahid Kamaruddin",
      trip: "TRP-1002 (Premium Umrah)",
      mutawwif: "Ustaz Kazim Elias",
      ratingOverall: 5,
      ratingTA: 5,
      ratingMutawwif: 5,
      recommend: "Yes",
      mediaCount: 2,
      consent: "Consent Given",
      status: "Approved Public",
      date: "12 Nov 2026"
    },
    {
      id: "t_3",
      submitter: "Fatimah Zahra",
      trip: "TRP-1003 (Premium Umrah)",
      mutawwif: "Ustaz Azhar Idrus",
      ratingOverall: 3,
      ratingTA: 4,
      ratingMutawwif: 3,
      recommend: "No",
      mediaCount: 3,
      consent: "Internal Only",
      status: "Pending Review",
      date: "13 Nov 2026"
    }
  ];

  const dailyData = [
    {
      id: "d_1",
      submitter: "Siti Aminah",
      activity: "Day 2 - Makkah Ziyarah",
      rating: 4,
      feedback: "The bus was on time. Good sharing by Ustaz.",
      mediaCount: 0,
      date: "10 Nov 2026"
    },
    {
      id: "d_2",
      submitter: "Zahid Kamaruddin",
      activity: "Day 4 - Taif Trip",
      rating: 5,
      feedback: "Excellent scenery and food.",
      mediaCount: 2,
      date: "11 Nov 2026"
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
  } = useDataFilter(activeTab === 'end-trip' ? endTripData : dailyData, {
    defaultSort: { key: 'id', order: 'desc' },
    defaultPerPage: 10,
  });

  // Reset pagination/filters on tab change if needed
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    clearFilters();
    setSearchQuery('');
  };

  const renderStars = (rating: number) => {
    return (
      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        <Star size={14} fill={rating >= 4 ? 'var(--color-warning)' : 'none'} className={rating >= 4 ? "text-warning" : "text-muted"} />
        <span className="text-body-bold" style={{ marginLeft: '4px' }}>{rating}/5</span>
      </div>
    );
  };

  const endTripColumns = [
    {
      header: 'Jamaah / Family',
      accessor: (row: any) => (
        <span className="text-body-bold">{row.submitter}</span>
      )
    },
    {
      header: 'Group Trip',
      accessor: (row: any) => (
        <span className="text-body">{row.trip}</span>
      )
    },
    {
      header: 'Mutawwif',
      accessor: (row: any) => row.mutawwif ? (
        <span className="text-body">{row.mutawwif}</span>
      ) : '-'
    },
    {
      header: 'Overall Rating',
      accessor: (row: any) => renderStars(row.ratingOverall)
    },
    {
      header: 'Recommend',
      accessor: (row: any) => (
        <Badge variant={getStatusBadgeVariant(row.recommend)}>{row.recommend}</Badge>
      )
    },
    {
      header: 'Media',
      accessor: (row: any) => (
        <span className="text-body">{row.mediaCount} Files</span>
      )
    },
    {
      header: 'Consent',
      accessor: (row: any) => (
        <span className="text-body text-muted">{row.consent}</span>
      )
    },
    {
      header: 'Moderation Status',
      accessor: (row: any) => {
        let variant: 'success' | 'warning' | 'neutral' = 'neutral';
        if (row.status === 'Approved Public') variant = 'success';
        if (row.status === 'Pending Review') variant = 'warning';
        return <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge>;
      }
    },
    {
      header: 'Date',
      accessor: (row: any) => <span className="text-body">{row.date}</span>
    },
    {
      header: 'Action',
      accessor: (row: any) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Feedback', icon: <Eye size={16} />, onClick: () => navigate('ta-testimonial-details', { id: row.id }) },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const dailyColumns = [
    {
      header: 'Jamaah / Family',
      accessor: (row: any) => <span className="text-body-bold">{row.submitter}</span>
    },
    {
      header: 'Activity',
      accessor: (row: any) => <span className="text-body">{row.activity}</span>
    },
    {
      header: 'Rating & Feedback',
      accessor: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {renderStars(row.rating)}
          <span className="text-caption text-muted" style={{ marginTop: 'var(--space-1)' }}>{row.feedback}</span>
        </div>
      )
    },
    {
      header: 'Media',
      accessor: (row: any) => <span className="text-body">{row.mediaCount} Files</span>
    },
    {
      header: 'Date',
      accessor: (row: any) => <span className="text-body">{row.date}</span>
    },
    {
      header: 'Action',
      accessor: (row: any) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => console.log('View', row.id) },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const tabs = [
    { id: 'end-trip', label: 'End-of-Trip Testimonials' },
    { id: 'daily', label: 'Daily Feedback' },
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'rating',
      label: 'Rating',
      options: [
        { value: '5', label: '5 Stars' },
        { value: '4', label: '4 Stars' },
        { value: '3', label: '3 Stars' },
        { value: 'low', label: '1-2 Stars (Action Needed)' },
      ]
    },
    {
      id: 'status',
      label: 'Moderation Status',
      options: [
        { value: 'pending', label: 'Pending Review' },
        { value: 'approved', label: 'Approved Public' },
        { value: 'internal', label: 'Internal Only' },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader 
        title="Testimonials & Feedback"
        subtitle="Monitor customer satisfaction, ratings, and feedback."
        actions={
          <ExportControl data={filteredData} />
        }
      />

      {/* Overview Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Avg. Overall Rating" 
          value="4.6 / 5" 
          icon={<Star size={20} className="text-warning" />} 
          iconBg="var(--color-warning-light)" 
        />
        <MetricCard 
          title="Avg. TA Rating" 
          value="4.7 / 5" 
          icon={<ThumbsUp size={20} className="text-primary" />} 
          iconBg="var(--color-primary-light)" 
        />
        <MetricCard 
          title="Recommendation Rate" 
          value="94%" 
          icon={<MessageSquare size={20} className="text-success" />} 
          iconBg="var(--color-success-light)" 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />
        
        <FilterBar 
          hasActiveFilters={hasActiveFilters} 
          onClearFilters={clearFilters}
          filterGroups={filterGroups}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          searchPlaceholder="Search feedback or submitter..."
          searchValue={searchQuery}
          onSearch={setSearchQuery}
        />

        <DataTable 
          data={filteredData} 
          columns={activeTab === 'end-trip' ? endTripColumns : dailyColumns} 
          keyExtractor={(row) => row.id}
          isLoading={isLoading}
          onRowClick={(row: any) => navigate('ta-testimonial-details', { id: row.id })}
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
          emptyStateTitle="No feedback found"
        />
      </div>
    </div>
  );
};
