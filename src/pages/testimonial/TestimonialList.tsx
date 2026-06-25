import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Tabs } from '../../components/navigation/Tabs';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Star, ShieldAlert, Eye, ChevronRight, MessageSquare, ThumbsUp } from 'lucide-react';
import { MetricCard } from '../../components/data-display/MetricCard';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const TestimonialList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('end-trip');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Mock Data
  const endTripData = [
  {
    "id": "t_1",
    "submitter": "Siti Aminah (Family of 2)",
    "trip": "TRP-1001 (Premium Umrah)",
    "agency": "Global Travel",
    "mutawwif": "Ustaz Don Daniyal",
    "ratingOverall": 4,
    "recommend": "Yes",
    "mediaCount": 1,
    "consent": "Consent Given",
    "status": "Approved Public",
    "date": "11 Nov 2026"
  },
  {
    "id": "t_2",
    "submitter": "Zahid Kamaruddin (Family of 3)",
    "trip": "TRP-1002 (Premium Umrah)",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Kazim Elias",
    "ratingOverall": 5,
    "recommend": "Yes",
    "mediaCount": 2,
    "consent": "Consent Given",
    "status": "Approved Public",
    "date": "12 Nov 2026"
  },
  {
    "id": "t_3",
    "submitter": "Fatimah Zahra (Family of 4)",
    "trip": "TRP-1003 (Premium Umrah)",
    "agency": "Global Travel",
    "mutawwif": "Ustaz Azhar Idrus",
    "ratingOverall": 3,
    "recommend": "No",
    "mediaCount": 3,
    "consent": "Internal Only",
    "status": "Pending Review",
    "date": "13 Nov 2026"
  },
  {
    "id": "t_4",
    "submitter": "Zulkifli Harun (Family of 1)",
    "trip": "TRP-1004 (Premium Umrah)",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Don Daniyal",
    "ratingOverall": 4,
    "recommend": "Yes",
    "mediaCount": 0,
    "consent": "Consent Given",
    "status": "Approved Public",
    "date": "14 Nov 2026"
  },
  {
    "id": "t_5",
    "submitter": "Ahmad Hassan (Family of 2)",
    "trip": "TRP-1005 (Premium Umrah)",
    "agency": "Global Travel",
    "mutawwif": "Ustaz Kazim Elias",
    "ratingOverall": 5,
    "recommend": "Yes",
    "mediaCount": 1,
    "consent": "Consent Given",
    "status": "Approved Public",
    "date": "15 Nov 2026"
  },
  {
    "id": "t_6",
    "submitter": "Siti Aminah (Family of 3)",
    "trip": "TRP-1006 (Premium Umrah)",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Azhar Idrus",
    "ratingOverall": 3,
    "recommend": "No",
    "mediaCount": 2,
    "consent": "Internal Only",
    "status": "Pending Review",
    "date": "16 Nov 2026"
  },
  {
    "id": "t_7",
    "submitter": "Zahid Kamaruddin (Family of 4)",
    "trip": "TRP-1007 (Premium Umrah)",
    "agency": "Global Travel",
    "mutawwif": "Ustaz Don Daniyal",
    "ratingOverall": 4,
    "recommend": "Yes",
    "mediaCount": 3,
    "consent": "Consent Given",
    "status": "Approved Public",
    "date": "17 Nov 2026"
  },
  {
    "id": "t_8",
    "submitter": "Fatimah Zahra (Family of 1)",
    "trip": "TRP-1008 (Premium Umrah)",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Kazim Elias",
    "ratingOverall": 5,
    "recommend": "Yes",
    "mediaCount": 0,
    "consent": "Consent Given",
    "status": "Approved Public",
    "date": "18 Nov 2026"
  },
  {
    "id": "t_9",
    "submitter": "Zulkifli Harun (Family of 2)",
    "trip": "TRP-1009 (Premium Umrah)",
    "agency": "Global Travel",
    "mutawwif": "Ustaz Azhar Idrus",
    "ratingOverall": 3,
    "recommend": "No",
    "mediaCount": 1,
    "consent": "Internal Only",
    "status": "Pending Review",
    "date": "19 Nov 2026"
  },
  {
    "id": "t_10",
    "submitter": "Ahmad Hassan (Family of 3)",
    "trip": "TRP-1010 (Premium Umrah)",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Don Daniyal",
    "ratingOverall": 4,
    "recommend": "Yes",
    "mediaCount": 2,
    "consent": "Consent Given",
    "status": "Approved Public",
    "date": "20 Nov 2026"
  },
  {
    "id": "t_11",
    "submitter": "Siti Aminah (Family of 4)",
    "trip": "TRP-1011 (Premium Umrah)",
    "agency": "Global Travel",
    "mutawwif": "Ustaz Kazim Elias",
    "ratingOverall": 5,
    "recommend": "Yes",
    "mediaCount": 3,
    "consent": "Consent Given",
    "status": "Approved Public",
    "date": "21 Nov 2026"
  },
  {
    "id": "t_12",
    "submitter": "Zahid Kamaruddin (Family of 1)",
    "trip": "TRP-1012 (Premium Umrah)",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Azhar Idrus",
    "ratingOverall": 3,
    "recommend": "No",
    "mediaCount": 0,
    "consent": "Internal Only",
    "status": "Pending Review",
    "date": "22 Nov 2026"
  },
  {
    "id": "t_13",
    "submitter": "Fatimah Zahra (Family of 2)",
    "trip": "TRP-1013 (Premium Umrah)",
    "agency": "Global Travel",
    "mutawwif": "Ustaz Don Daniyal",
    "ratingOverall": 4,
    "recommend": "Yes",
    "mediaCount": 1,
    "consent": "Consent Given",
    "status": "Approved Public",
    "date": "23 Nov 2026"
  },
  {
    "id": "t_14",
    "submitter": "Zulkifli Harun (Family of 3)",
    "trip": "TRP-1014 (Premium Umrah)",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Kazim Elias",
    "ratingOverall": 5,
    "recommend": "Yes",
    "mediaCount": 2,
    "consent": "Consent Given",
    "status": "Approved Public",
    "date": "24 Nov 2026"
  },
  {
    "id": "t_15",
    "submitter": "Ahmad Hassan (Family of 4)",
    "trip": "TRP-1015 (Premium Umrah)",
    "agency": "Global Travel",
    "mutawwif": "Ustaz Azhar Idrus",
    "ratingOverall": 3,
    "recommend": "No",
    "mediaCount": 3,
    "consent": "Internal Only",
    "status": "Pending Review",
    "date": "25 Nov 2026"
  },
  {
    "id": "t_16",
    "submitter": "Siti Aminah (Family of 1)",
    "trip": "TRP-1016 (Premium Umrah)",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Don Daniyal",
    "ratingOverall": 4,
    "recommend": "Yes",
    "mediaCount": 0,
    "consent": "Consent Given",
    "status": "Approved Public",
    "date": "26 Nov 2026"
  },
  {
    "id": "t_17",
    "submitter": "Zahid Kamaruddin (Family of 2)",
    "trip": "TRP-1017 (Premium Umrah)",
    "agency": "Global Travel",
    "mutawwif": "Ustaz Kazim Elias",
    "ratingOverall": 5,
    "recommend": "Yes",
    "mediaCount": 1,
    "consent": "Consent Given",
    "status": "Approved Public",
    "date": "27 Nov 2026"
  },
  {
    "id": "t_18",
    "submitter": "Fatimah Zahra (Family of 3)",
    "trip": "TRP-1018 (Premium Umrah)",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Azhar Idrus",
    "ratingOverall": 3,
    "recommend": "No",
    "mediaCount": 2,
    "consent": "Internal Only",
    "status": "Pending Review",
    "date": "28 Nov 2026"
  }
];

  const dailyFeedbackData = [
  {
    "id": "d_1",
    "submitter": "Fatimah Zahra",
    "activity": "Day 4 - Makkah Arrival",
    "rating": 4,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 0,
    "mediaCount": 1,
    "date": "11 Nov 2026"
  },
  {
    "id": "d_2",
    "submitter": "Zulkifli Harun",
    "activity": "Day 5 - Tawaf & Sayi",
    "rating": 5,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 50,
    "mediaCount": 2,
    "date": "12 Nov 2026"
  },
  {
    "id": "d_3",
    "submitter": "Nurul Aini",
    "activity": "Day 6 - Ziyarah Taif",
    "rating": 3,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 0,
    "mediaCount": 0,
    "date": "13 Nov 2026"
  },
  {
    "id": "d_4",
    "submitter": "Zahid Kamaruddin",
    "activity": "Day 3 - Madinah Ziyarah",
    "rating": 4,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 50,
    "mediaCount": 1,
    "date": "14 Nov 2026"
  },
  {
    "id": "d_5",
    "submitter": "Fatimah Zahra",
    "activity": "Day 4 - Makkah Arrival",
    "rating": 5,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 0,
    "mediaCount": 2,
    "date": "15 Nov 2026"
  },
  {
    "id": "d_6",
    "submitter": "Zulkifli Harun",
    "activity": "Day 5 - Tawaf & Sayi",
    "rating": 3,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 50,
    "mediaCount": 0,
    "date": "16 Nov 2026"
  },
  {
    "id": "d_7",
    "submitter": "Nurul Aini",
    "activity": "Day 6 - Ziyarah Taif",
    "rating": 4,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 0,
    "mediaCount": 1,
    "date": "17 Nov 2026"
  },
  {
    "id": "d_8",
    "submitter": "Zahid Kamaruddin",
    "activity": "Day 3 - Madinah Ziyarah",
    "rating": 5,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 50,
    "mediaCount": 2,
    "date": "18 Nov 2026"
  },
  {
    "id": "d_9",
    "submitter": "Fatimah Zahra",
    "activity": "Day 4 - Makkah Arrival",
    "rating": 3,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 0,
    "mediaCount": 0,
    "date": "19 Nov 2026"
  },
  {
    "id": "d_10",
    "submitter": "Zulkifli Harun",
    "activity": "Day 5 - Tawaf & Sayi",
    "rating": 4,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 50,
    "mediaCount": 1,
    "date": "20 Nov 2026"
  },
  {
    "id": "d_11",
    "submitter": "Nurul Aini",
    "activity": "Day 6 - Ziyarah Taif",
    "rating": 5,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 0,
    "mediaCount": 2,
    "date": "21 Nov 2026"
  },
  {
    "id": "d_12",
    "submitter": "Zahid Kamaruddin",
    "activity": "Day 3 - Madinah Ziyarah",
    "rating": 3,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 50,
    "mediaCount": 0,
    "date": "22 Nov 2026"
  },
  {
    "id": "d_13",
    "submitter": "Fatimah Zahra",
    "activity": "Day 4 - Makkah Arrival",
    "rating": 4,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 0,
    "mediaCount": 1,
    "date": "23 Nov 2026"
  },
  {
    "id": "d_14",
    "submitter": "Zulkifli Harun",
    "activity": "Day 5 - Tawaf & Sayi",
    "rating": 5,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 50,
    "mediaCount": 2,
    "date": "24 Nov 2026"
  },
  {
    "id": "d_15",
    "submitter": "Nurul Aini",
    "activity": "Day 6 - Ziyarah Taif",
    "rating": 3,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 0,
    "mediaCount": 0,
    "date": "25 Nov 2026"
  },
  {
    "id": "d_16",
    "submitter": "Zahid Kamaruddin",
    "activity": "Day 3 - Madinah Ziyarah",
    "rating": 4,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 50,
    "mediaCount": 1,
    "date": "26 Nov 2026"
  },
  {
    "id": "d_17",
    "submitter": "Fatimah Zahra",
    "activity": "Day 4 - Makkah Arrival",
    "rating": 5,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 0,
    "mediaCount": 2,
    "date": "27 Nov 2026"
  },
  {
    "id": "d_18",
    "submitter": "Zulkifli Harun",
    "activity": "Day 5 - Tawaf & Sayi",
    "rating": 3,
    "feedback": "Everything went well. Highly recommended.",
    "tip": 50,
    "mediaCount": 0,
    "date": "28 Nov 2026"
  }
];

  const mutawwifReports = [
  {
    "id": "mr_1",
    "submitter": "Ustaz Don Daniyal",
    "trip": "TRP-1001 (Premium Umrah)",
    "type": "End Trip Report",
    "incident": false,
    "date": "11 Nov 2026"
  },
  {
    "id": "mr_2",
    "submitter": "Ustaz Kazim Elias",
    "trip": "TRP-1002 (Premium Umrah)",
    "type": "End Trip Report",
    "incident": false,
    "date": "12 Nov 2026"
  },
  {
    "id": "mr_3",
    "submitter": "Ustaz Azhar Idrus",
    "trip": "TRP-1003 (Premium Umrah)",
    "type": "Incident Report",
    "incident": true,
    "date": "13 Nov 2026"
  },
  {
    "id": "mr_4",
    "submitter": "Ustaz Don Daniyal",
    "trip": "TRP-1004 (Premium Umrah)",
    "type": "End Trip Report",
    "incident": false,
    "date": "14 Nov 2026"
  },
  {
    "id": "mr_5",
    "submitter": "Ustaz Kazim Elias",
    "trip": "TRP-1005 (Premium Umrah)",
    "type": "End Trip Report",
    "incident": false,
    "date": "15 Nov 2026"
  },
  {
    "id": "mr_6",
    "submitter": "Ustaz Azhar Idrus",
    "trip": "TRP-1006 (Premium Umrah)",
    "type": "Incident Report",
    "incident": true,
    "date": "16 Nov 2026"
  },
  {
    "id": "mr_7",
    "submitter": "Ustaz Don Daniyal",
    "trip": "TRP-1007 (Premium Umrah)",
    "type": "End Trip Report",
    "incident": false,
    "date": "17 Nov 2026"
  },
  {
    "id": "mr_8",
    "submitter": "Ustaz Kazim Elias",
    "trip": "TRP-1008 (Premium Umrah)",
    "type": "End Trip Report",
    "incident": false,
    "date": "18 Nov 2026"
  },
  {
    "id": "mr_9",
    "submitter": "Ustaz Azhar Idrus",
    "trip": "TRP-1009 (Premium Umrah)",
    "type": "Incident Report",
    "incident": true,
    "date": "19 Nov 2026"
  },
  {
    "id": "mr_10",
    "submitter": "Ustaz Don Daniyal",
    "trip": "TRP-1010 (Premium Umrah)",
    "type": "End Trip Report",
    "incident": false,
    "date": "20 Nov 2026"
  },
  {
    "id": "mr_11",
    "submitter": "Ustaz Kazim Elias",
    "trip": "TRP-1011 (Premium Umrah)",
    "type": "End Trip Report",
    "incident": false,
    "date": "21 Nov 2026"
  },
  {
    "id": "mr_12",
    "submitter": "Ustaz Azhar Idrus",
    "trip": "TRP-1012 (Premium Umrah)",
    "type": "Incident Report",
    "incident": true,
    "date": "22 Nov 2026"
  },
  {
    "id": "mr_13",
    "submitter": "Ustaz Don Daniyal",
    "trip": "TRP-1013 (Premium Umrah)",
    "type": "End Trip Report",
    "incident": false,
    "date": "23 Nov 2026"
  },
  {
    "id": "mr_14",
    "submitter": "Ustaz Kazim Elias",
    "trip": "TRP-1014 (Premium Umrah)",
    "type": "End Trip Report",
    "incident": false,
    "date": "24 Nov 2026"
  },
  {
    "id": "mr_15",
    "submitter": "Ustaz Azhar Idrus",
    "trip": "TRP-1015 (Premium Umrah)",
    "type": "Incident Report",
    "incident": true,
    "date": "25 Nov 2026"
  },
  {
    "id": "mr_16",
    "submitter": "Ustaz Don Daniyal",
    "trip": "TRP-1016 (Premium Umrah)",
    "type": "End Trip Report",
    "incident": false,
    "date": "26 Nov 2026"
  },
  {
    "id": "mr_17",
    "submitter": "Ustaz Kazim Elias",
    "trip": "TRP-1017 (Premium Umrah)",
    "type": "End Trip Report",
    "incident": false,
    "date": "27 Nov 2026"
  },
  {
    "id": "mr_18",
    "submitter": "Ustaz Azhar Idrus",
    "trip": "TRP-1018 (Premium Umrah)",
    "type": "Incident Report",
    "incident": true,
    "date": "28 Nov 2026"
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
  } = useDataFilter(endTripData, {
    defaultSort: { key: 'id', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

  const renderStars = (rating: number) => {
  

return (
      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        <Star size={14} fill={rating >= 4 ? 'var(--color-warning)' : 'none'} className="text-warning" />
        <span className="text-body-bold" style={{ marginLeft: '4px' }}>{rating}/5</span>
      </div>
    );
  };

  const endTripColumns = [
    {
      header: 'Submitter',
      accessor: (row: any) => (
        <span className="text-body-bold">{row.submitter}</span>
      )
    },
    {
      header: 'Trip / Agency',
      accessor: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body">{row.trip}</span>
          <span className="text-caption text-muted">{row.agency}</span>
        </div>
      )
    },
    {
      header: 'Mutawwif',
      accessor: (row: any) => <span className="text-body">{row.mutawwif}</span>
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
      header: 'Status',
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
            { id: 'view', label: 'Review & Moderate', icon: <Eye size={16} />, onClick: () => navigate('testimonial-details', { id: row.id }) },
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
      header: 'Tip',
      accessor: (row: any) => <span className="text-body-bold text-success">RM {row.tip}</span>
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

  const mutawwifColumns = [
    {
      header: 'Mutawwif',
      accessor: (row: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {row.incident && <ShieldAlert size={16} className="text-danger" />}
          <span className={row.incident ? "text-body-bold text-danger" : "text-body-bold"}>{row.submitter}</span>
        </div>
      )
    },
    {
      header: 'Trip',
      accessor: (row: any) => <span className="text-body">{row.trip}</span>
    },
    {
      header: 'Report Type',
      accessor: (row: any) => {
        return <Badge variant={getStatusBadgeVariant(row.type)}>{row.type}</Badge>;
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
            { id: 'view', label: 'View Internal Report', icon: <Eye size={16} />, onClick: () => navigate('mutawwif-report-details', { id: row.id }) },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const tabs = [
    { id: 'end-trip', label: 'End-of-Trip Testimonials' },
    { id: 'daily', label: 'Daily Feedback' },
    { id: 'mutawwif', label: 'Mutawwif Trip Reports' },
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'pending', label: 'Pending Review' },
        { value: 'approved', label: 'Approved Public' },
        { value: 'internal', label: 'Internal Only' },
      ]
    }
  ];
return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Testimonial & Feedback Management"
        breadcrumbs={[{ label: 'Operations' }, { label: 'Testimonials' }]}
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={(t) => { setActiveTab(t); setSelectedItems(new Set()); }} />

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Total Feedback" 
          value="452" 
          trend="up" 
          trendValue="+12" 
          icon={<MessageSquare />} 
          iconBg="var(--color-primary-light)" 
          accentColor="var(--color-primary)" 
        />
        <MetricCard 
          title="Average Rating" 
          value="4.8" 
          trend="up" 
          trendValue="+0.1" 
          icon={<Star />} 
          iconBg="var(--color-warning-light)" 
          accentColor="var(--color-warning)" 
        />
        <MetricCard 
          title="Published Testimonials" 
          value="128" 
          trend="up" 
          trendValue="+5" 
          icon={<ThumbsUp />} 
          iconBg="var(--color-success-light)" 
          accentColor="var(--color-success)" 
        />
        <MetricCard 
          title="Reported Issues" 
          value="3" 
          trend="down" 
          trendValue="-2" 
          icon={<ShieldAlert />} 
          iconBg="var(--color-danger-light)" 
          accentColor="var(--color-danger)" 
        />
      </div>

      <FilterBar 
        groups={activeTab !== 'mutawwif' ? filterGroups : []}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder={activeTab === 'mutawwif' ? "Search reports..." : "Search by Jamaah, Trip, or Agency..."}
      />

      {activeTab === 'end-trip' && (
        <DataTable
        onRowClick={(row: any) => navigate('testimonial-details', { id: row.id })} 
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
          columns={endTripColumns}
          isLoading={isLoading}
          selectedKeys={selectedItems}
          onSelectionChange={setSelectedItems}
          emptyStateTitle="No testimonials found"
        />
      )}

      {activeTab === 'daily' && (
        <DataTable
        onRowClick={(row: any) => navigate('testimonial-details', { id: row.id })} 
          data={dailyFeedbackData}
          columns={dailyColumns}
          isLoading={isLoading}
          selectedKeys={selectedItems}
          onSelectionChange={setSelectedItems}
          emptyStateTitle="No daily feedback found"
        />
      )}

      {activeTab === 'mutawwif' && (
        <DataTable
        onRowClick={(row: any) => navigate('testimonial-details', { id: row.id })} 
          data={mutawwifReports}
          columns={mutawwifColumns}
          isLoading={isLoading}
          selectedKeys={selectedItems}
          onSelectionChange={setSelectedItems}
          emptyStateTitle="No mutawwif reports found"
        />
      )}

    </div>
  );
};
