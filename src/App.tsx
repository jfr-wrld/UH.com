import React, { useState, useEffect } from 'react';
import { AdminDashboard } from './pages/AdminDashboard';
import { TravelAgencyList } from './pages/travel-agency/TravelAgencyList';
import { TravelAgencyApplications } from './pages/travel-agency/TravelAgencyApplications';
import { ApplicationReview } from './pages/travel-agency/ApplicationReview';
import { TravelAgencyDetails } from './pages/travel-agency/TravelAgencyDetails';
import { TravelAgencyForm } from './pages/travel-agency/TravelAgencyForm';
import { UserList } from './pages/user-management/UserList';
import { UserInvite } from './pages/user-management/UserInvite';
import { UserDetails } from './pages/user-management/UserDetails';
import { RoleList } from './pages/user-management/RoleList';
import { RoleForm } from './pages/user-management/RoleForm';
import { JamaahList } from './pages/jamaah/JamaahList';
import { JamaahAdd } from './pages/jamaah/JamaahAdd';
import { JamaahDetails } from './pages/jamaah/JamaahDetails';
import { MutawwifList } from './pages/mutawwif/MutawwifList';
import { MutawwifAdd } from './pages/mutawwif/MutawwifAdd';
import { MutawwifDetails } from './pages/mutawwif/MutawwifDetails';
import { ItineraryList } from './pages/itinerary/ItineraryList';
import { ItineraryAdd } from './pages/itinerary/ItineraryAdd';
import { ItineraryDetails } from './pages/itinerary/ItineraryDetails';
import { FlightList } from './pages/flight/FlightList';
import { FlightAdd } from './pages/flight/FlightAdd';
import { FlightDetails } from './pages/flight/FlightDetails';
import { AirlineAdd } from './pages/flight/AirlineAdd';
import { AirlineDetails } from './pages/flight/AirlineDetails';
import { HotelList } from './pages/hotel/HotelList';
import { HotelAdd } from './pages/hotel/HotelAdd';
import { HotelDetails } from './pages/hotel/HotelDetails';
import { SeasonList } from './pages/season/SeasonList';
import { PackageList } from './pages/package/PackageList';
import { PackageCreate } from './pages/package/PackageCreate';
import { PackageDetails } from './pages/package/PackageDetails';
import { GroupTripList } from './pages/group-trip/GroupTripList';
import { GroupTripCreate } from './pages/group-trip/GroupTripCreate';
import { GroupTripDetails } from './pages/group-trip/GroupTripDetails';
import { BookingList } from './pages/booking/BookingList';
import { BookingCreate } from './pages/booking/BookingCreate';
import { BookingDetails } from './pages/booking/BookingDetails';

import { FinanceOverview } from './pages/finance/FinanceOverview';
import { RefundRequests } from './pages/finance/RefundRequests';
import { CommissionSummary } from './pages/finance/CommissionSummary';
import { FinanceSettings } from './pages/finance/FinanceSettings';

import { PaymentList } from './pages/billing/PaymentList';
import { InvoiceCreate } from './pages/billing/InvoiceCreate';
import { InvoiceDetails } from './pages/billing/InvoiceDetails';
import { AllowanceList } from './pages/finance/AllowanceList';
import { AllowanceDetails } from './pages/finance/AllowanceDetails';
import { AllowanceCreate } from './pages/finance/AllowanceCreate';
import { PayoutPreparation } from './pages/finance/PayoutPreparation';
import { FinanceReports } from './pages/finance/FinanceReports';
import { TestimonialList } from './pages/testimonial/TestimonialList';
import { TestimonialDetails } from './pages/testimonial/TestimonialDetails';
import { MutawwifReportDetails } from './pages/testimonial/MutawwifReportDetails';
import { ReportList } from './pages/reports/ReportList';
import { ReportCreate } from './pages/reports/ReportCreate';
import { ReportDetails } from './pages/reports/ReportDetails';
import { ArticleList } from './pages/articles/ArticleList';
import { ArticleCreate } from './pages/articles/ArticleCreate';
import { ArticleDetails } from './pages/articles/ArticleDetails';
import { AnnouncementList } from './pages/announcement/AnnouncementList';
import { AnnouncementCreate } from './pages/announcement/AnnouncementCreate';
import { AnnouncementDetails } from './pages/announcement/AnnouncementDetails';
import { SettingsPage } from './pages/settings/SettingsPage';
import { MyProfile } from './pages/profile/MyProfile';
import { LoginPage } from './pages/auth/LoginPage';
import { Button } from './components/actions/Button';
import { IconButton } from './components/actions/IconButton';
import { FormField } from './components/inputs/FormField';
import { Input } from './components/inputs/Input';
import { Select } from './components/inputs/Select';
import { DatePicker } from './components/inputs/DatePicker';
import { Badge } from './components/data-display/Badge';
import { Skeleton } from './components/data-display/Skeleton';
import { EmptyState } from './components/data-display/EmptyState';
import { DataTable } from './components/data-display/DataTable';
import { Modal } from './components/feedback/Modal';
import { Drawer } from './components/feedback/Drawer';
import { ToastContainer } from './components/feedback/Toast';
import type { ToastMessage } from './components/feedback/Toast';
import { AppShell } from './components/layout/AppShell';
import { PageHeader } from './components/layout/PageHeader';
import { Tabs } from './components/navigation/Tabs';
import { Stepper } from './components/navigation/Stepper';
import { Pagination } from './components/navigation/Pagination';
import { DropdownMenu } from './components/actions/DropdownMenu';
import { BulkActionBar } from './components/actions/BulkActionBar';
import { SearchInput } from './components/inputs/SearchInput';
import { FileUploader } from './components/inputs/FileUploader';
import { FilterBar } from './components/inputs/FilterBar';
import { MetricCard } from './components/data-display/MetricCard';
import { Timeline } from './components/data-display/Timeline';
import { AttachmentList } from './components/data-display/AttachmentList';
import { AlertBanner } from './components/feedback/AlertBanner';
import { ConfirmationDialog } from './components/feedback/ConfirmationDialog';
import { VerificationChecklist } from './components/domain/VerificationChecklist';
import { ApprovalDecisionBar } from './components/domain/ApprovalDecisionBar';
import { ReviewHistoryPanel } from './components/domain/ReviewHistoryPanel';
import { RemarkPanel } from './components/domain/RemarkPanel';
import { DocumentStatusControl } from './components/domain/DocumentStatusControl';
import { SensitiveDataReveal } from './components/domain/SensitiveDataReveal';
import { AuditLogPanel } from './components/domain/AuditLogPanel';
import { StatusTransitionMenu } from './components/domain/StatusTransitionMenu';
import { ExportControl } from './components/domain/ExportControl';
import { ImportControl } from './components/domain/ImportControl';
import { Home, Building, Users, UserCheck, Package, Ticket, Plane, Bed, Map, CalendarDays, Wallet, FileEdit, Megaphone, MessageSquare, BarChart3, Settings, Search, Trash2, Edit2, AlertTriangle, Plus, Calendar, DollarSign, CreditCard, BarChart2, History, LayoutDashboard, ChevronRight, Eye, RefreshCcw, Archive, Edit, Copy } from 'lucide-react';

export function ComponentShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeTab, setActiveTab] = useState('tab1');
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const path = hash.split('?')[0];
    return path || 'dashboard';
  });
  const [routeState, setRouteState] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('erp_auth') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('erp_auth', 'true');
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const path = hash.split('?')[0];
      if (path && path !== currentRoute) {
        setCurrentRoute(path);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute]);

  const navigate = (route: string, state?: any) => {
    const path = route.split('?')[0];
    setCurrentRoute(path);
    setRouteState(state || null);
    window.location.hash = route;
  };
  const [searchValue, setSearchValue] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set(['1', '2']));
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const showToast = (title: string, description: string = '', variant: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToasts(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        title,
        description,
        variant
      }
    ]);
  };

  const removeToast = (id: string) => {
    setToasts(toasts.filter(t => t.id !== id));
  };

  const updateActiveNavItems = (items: any[]): any[] => {
    return items.map(item => {
      const children = item.children ? updateActiveNavItems(item.children) : undefined;
      let isActive = item.isActive || item.id === currentRoute || (currentRoute.startsWith(item.id + '-') && !item.children);
      if (children && children.some((c: any) => c.isActive)) isActive = true;

      return {
        ...item,
        isActive,
        onClick: item.children ? undefined : () => navigate(item.id),
        children
      };
    });
  };

  const navItems = updateActiveNavItems([
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { 
      id: 'travel-agency', 
      label: 'Travel Agency', 
      category: 'Network & Users',
      icon: <Building size={20} />,
      children: [
        { id: 'ta-applications', label: 'Applications' },
        { id: 'ta-list', label: 'Travel Agency List' },
        { id: 'ta-add', label: 'Add Travel Agency' }
      ]
    },
    {
      id: 'jamaah-list',
      label: 'Jamaah List',
      category: 'Network & Users',
      onClick: () => navigate('jamaah-list'),
      isActive: currentRoute.startsWith('jamaah-list') || currentRoute.startsWith('jamaah-add') || currentRoute.startsWith('jamaah-details'),
      icon: <Users size={20} /> 
    },
    { 
      id: 'mutawwif-list', 
      label: 'Mutawwif List', 
      category: 'Network & Users',
      icon: <UserCheck size={20} />,
      onClick: () => navigate('mutawwif-list'),
      isActive: currentRoute.startsWith('mutawwif-list') || currentRoute.startsWith('mutawwif-add') || currentRoute.startsWith('mutawwif-details')
    },
    { 
      id: 'itinerary-list', 
      label: 'Itinerary', 
      category: 'Operations',
      icon: <Calendar size={20} />,
      onClick: () => navigate('itinerary-list'),
      isActive: currentRoute.startsWith('itinerary-list') || currentRoute.startsWith('itinerary-add') || currentRoute.startsWith('itinerary-details')
    },
    { 
      id: 'package-list', 
      label: 'Package Management', 
      category: 'Operations',
      icon: <Package size={20} />,
      onClick: () => navigate('package-list'),
      isActive: currentRoute.startsWith('package-list') || currentRoute.startsWith('package-create') || currentRoute.startsWith('package-details')
    },
    { 
      id: 'booking-list', 
      label: 'Booking', 
      category: 'Operations',
      icon: <Ticket size={20} />,
      onClick: () => navigate('booking-list'),
      isActive: currentRoute.startsWith('booking-list') || currentRoute.startsWith('booking-create') || currentRoute.startsWith('booking-details')
    },
    { 
      id: 'group-trip-list', 
      label: 'Group Trip', 
      category: 'Operations',
      icon: <Users size={20} />,
      onClick: () => navigate('group-trip-list'),
      isActive: currentRoute.startsWith('group-trip-list') || currentRoute.startsWith('group-trip-create') || currentRoute.startsWith('group-trip-details')
    },
    { 
      id: 'flight-list', 
      label: 'Flight', 
      category: 'Operations',
      icon: <Plane size={20} />,
      onClick: () => navigate('flight-list'),
      isActive: currentRoute.startsWith('flight-list') || currentRoute.startsWith('flight-add') || currentRoute.startsWith('flight-details') || currentRoute.startsWith('airline-add') || currentRoute.startsWith('airline-details')
    },
    { 
      id: 'hotel-list', 
      label: 'Hotel', 
      category: 'Operations',
      icon: <Bed size={20} />,
      onClick: () => navigate('hotel-list'),
      isActive: currentRoute.startsWith('hotel-list') || currentRoute.startsWith('hotel-add') || currentRoute.startsWith('hotel-details')
    },
    { 
      id: 'season-list', 
      label: 'Season Management', 
      category: 'Operations',
      icon: <CalendarDays size={20} />,
      onClick: () => navigate('season-list'),
      isActive: currentRoute.startsWith('season-list')
    },
    { 
      id: 'finance', 
      label: 'Finance Management',
      category: 'Finance',
      icon: <DollarSign size={20} />,
      children: [
        { id: 'fin-overview', label: 'Overview', icon: <Eye size={16} />, onClick: () => navigate('fin-overview'), isActive: currentRoute.startsWith('fin-overview') },
        { id: 'fin-refunds', label: 'Refund Requests', icon: <RefreshCcw size={16} />, onClick: () => navigate('fin-refunds'), isActive: currentRoute.startsWith('fin-refunds') },
        { id: 'fin-commission', label: 'Commission Summary', onClick: () => navigate('fin-commission'), isActive: currentRoute.startsWith('fin-commission') },
        { 
          id: 'fin-allowance', 
          label: 'Allowance Management',
          onClick: () => navigate('fin-allowance'),
          isActive: currentRoute.startsWith('fin-allowance')
        },
        { 
          id: 'fin-payout', 
          label: 'Payout Preparation',
          onClick: () => navigate('fin-payout'),
          isActive: currentRoute.startsWith('fin-payout')
        },
        { 
          id: 'fin-reports', 
          label: 'Finance Reports',
          onClick: () => navigate('fin-reports'),
          isActive: currentRoute.startsWith('fin-reports')
        },
        { id: 'fin-settings', label: 'Finance Settings', onClick: () => navigate('fin-settings'), isActive: currentRoute.startsWith('fin-settings') },
      ]
    },
    { 
      id: 'billing-list', 
      label: 'Billing & Payment', 
      category: 'Finance',
      icon: <CreditCard size={20} />,
      onClick: () => navigate('billing-list'),
      isActive: currentRoute.startsWith('billing-list') || currentRoute.startsWith('invoice-create') || currentRoute.startsWith('invoice-details')
    },
    { 
      id: 'articles', 
      label: 'Articles', 
      category: 'Content & Support',
      icon: <FileEdit size={20} />,
      children: [
        { id: 'article-list', label: 'Article List', onClick: () => navigate('article-list'), isActive: currentRoute === 'article-list' || currentRoute.startsWith('article-details') },
        { id: 'article-create', label: 'Create Article', onClick: () => navigate('article-create'), isActive: currentRoute === 'article-create' },
      ]
    },
    { 
      id: 'announcement', 
      label: 'Announcement', 
      category: 'Content & Support',
      icon: <Megaphone size={20} />,
      children: [
        { id: 'announcement-list', label: 'Announcement List', onClick: () => navigate('announcement-list'), isActive: currentRoute === 'announcement-list' || currentRoute.startsWith('announcement-details') },
        { id: 'announcement-create', label: 'Create Announcement', onClick: () => navigate('announcement-create'), isActive: currentRoute === 'announcement-create' },
      ]
    },
    { 
      id: 'testimonial', 
      label: 'Testimonials', 
      category: 'Content & Support',
      icon: <MessageSquare size={20} />,
      children: [
        { id: 'testimonial-list', label: 'Testimonial List', onClick: () => navigate('testimonial-list'), isActive: currentRoute === 'testimonial-list' || currentRoute.startsWith('testimonial-details') || currentRoute.startsWith('mutawwif-report-details') },
      ]
    },
    { 
      id: 'issue-reports', 
      label: 'Reports', 
      category: 'Content & Support',
      icon: <BarChart2 size={20} />,
      children: [
        { id: 'report-list', label: 'All Reports', onClick: () => navigate('report-list'), isActive: currentRoute === 'report-list' || currentRoute.startsWith('report-details') },
        { id: 'report-create', label: 'Create / Escalate Report', onClick: () => navigate('report-create'), isActive: currentRoute === 'report-create' },
      ]
    },
    { 
      id: 'user-management', 
      label: 'User Management', 
      category: 'System',
      icon: <Users size={20} />,
      children: [
        {
          id: 'um-users',
          label: 'User List',
          onClick: () => navigate('um-users'),
          isActive: currentRoute.startsWith('um-users') || currentRoute.startsWith('um-invite') || currentRoute.startsWith('um-details')
        },
        {
          id: 'um-roles',
          label: 'Roles & Permissions',
          onClick: () => navigate('um-roles'),
          isActive: currentRoute.startsWith('um-roles') || currentRoute.startsWith('um-role-form')
        }
      ]
    },
    { id: 'settings', label: 'Settings', category: 'System', icon: <Settings size={20} />, onClick: () => navigate('settings'), isActive: currentRoute === 'settings' },
  ]);

  const renderRoute = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <AdminDashboard navigate={navigate}  showToast={showToast} />;
      case 'ta-list':
        return <TravelAgencyList navigate={navigate}  showToast={showToast} />;
      case 'ta-applications':
        return <TravelAgencyApplications navigate={navigate}  showToast={showToast} />;
      case 'ta-review':
        return <ApplicationReview navigate={navigate} applicationId={routeState?.applicationId}  showToast={showToast} />;
      case 'ta-details':
        return <TravelAgencyDetails navigate={navigate} agencyId={routeState?.agencyId}  showToast={showToast} />;
      case 'ta-add':
      case 'ta-edit':
        return <TravelAgencyForm navigate={navigate} agencyId={routeState?.agencyId}  showToast={showToast} />;
      case 'um-users':
        return <UserList navigate={navigate}  showToast={showToast} />;
      case 'um-invite':
        return <UserInvite navigate={navigate}  showToast={showToast} />;
      case 'um-details':
        return <UserDetails navigate={navigate} userId={routeState?.id}  showToast={showToast} />;
      case 'um-roles':
        return <RoleList navigate={navigate}  showToast={showToast} />;
      case 'um-role-form':
        return <RoleForm navigate={navigate} roleId={routeState?.id}  showToast={showToast} />;
      case 'jamaah-list':
        return <JamaahList navigate={navigate}  showToast={showToast} />;
      case 'jamaah-add':
        return <JamaahAdd navigate={navigate}  showToast={showToast} />;
      case 'jamaah-details':
        return <JamaahDetails navigate={navigate} jamaahId={routeState?.id}  showToast={showToast} />;
      case 'mutawwif-list':
        return <MutawwifList navigate={navigate}  showToast={showToast} />;
      case 'mutawwif-add':
        return <MutawwifAdd navigate={navigate}  showToast={showToast} />;
      case 'mutawwif-details':
        return <MutawwifDetails navigate={navigate} mutawwifId={routeState?.id}  showToast={showToast} />;
      case 'itinerary-list':
        return <ItineraryList navigate={navigate}  showToast={showToast} />;
      case 'itinerary-add':
        return <ItineraryAdd navigate={navigate}  showToast={showToast} />;
      case 'itinerary-details':
        return <ItineraryDetails navigate={navigate} itineraryId={routeState?.id}  showToast={showToast} />;
      case 'flight-list':
        return <FlightList navigate={navigate}  showToast={showToast} />;
      case 'flight-add':
        return <FlightAdd navigate={navigate}  showToast={showToast} />;
      case 'flight-details':
        return <FlightDetails navigate={navigate} flightId={routeState?.id}  showToast={showToast} />;
      case 'airline-add':
        return <AirlineAdd navigate={navigate}  showToast={showToast} />;
      case 'airline-details':
        return <AirlineDetails navigate={navigate} airlineId={routeState?.id}  showToast={showToast} />;
      case 'hotel-list':
        return <HotelList navigate={navigate}  showToast={showToast} />;
      case 'hotel-add':
        return <HotelAdd navigate={navigate}  showToast={showToast} />;
      case 'hotel-details':
        return <HotelDetails navigate={navigate} hotelId={routeState?.id}  showToast={showToast} />;
      case 'season-list':
        return <SeasonList navigate={navigate}  showToast={showToast} />;
      case 'package-list':
        return <PackageList navigate={navigate}  showToast={showToast} />;
      case 'package-create':
        return <PackageCreate navigate={navigate}  showToast={showToast} />;
      case 'package-details':
        return <PackageDetails navigate={navigate} packageId={routeState?.id}  showToast={showToast} />;
      case 'group-trip-list':
        return <GroupTripList navigate={navigate}  showToast={showToast} />;
      case 'group-trip-create':
        return <GroupTripCreate navigate={navigate}  showToast={showToast} />;
      case 'group-trip-details':
        return <GroupTripDetails navigate={navigate} tripId={routeState?.id} showToast={showToast} />;
      case 'report-details':
        return <ReportDetails navigate={navigate} reportId={routeState?.id}  showToast={showToast} />;
      
      case 'booking-list':
        return <BookingList navigate={navigate} showToast={showToast} />;
      case 'booking-create':
        return <BookingCreate navigate={navigate} showToast={showToast} />;
      case 'booking-details':
        return <BookingDetails navigate={navigate} bookingId={routeState?.id} showToast={showToast} />;
      case 'billing-list':
        return <PaymentList navigate={navigate} showToast={showToast} />;
      case 'billing-invoice-create':
        return <InvoiceCreate navigate={navigate} showToast={showToast} />;
      case 'billing-invoice-details':
        return <InvoiceDetails navigate={navigate} invoiceId={routeState?.id} showToast={showToast} />;

      case 'fin-overview':
        return <FinanceOverview navigate={navigate} showToast={showToast} />;
      case 'fin-refunds':
        return <RefundRequests navigate={navigate} showToast={showToast} />;
      case 'fin-commission':
        return <CommissionSummary navigate={navigate} showToast={showToast} />;
      case 'fin-allowance':
        return <AllowanceList navigate={navigate} showToast={showToast} />;
      case 'fin-allowance-create':
        return <AllowanceCreate navigate={navigate} showToast={showToast} />;
      case 'fin-allowance-details':
        return <AllowanceDetails navigate={navigate} allowanceId={routeState?.id} showToast={showToast} />;
      case 'fin-payout':
        return <PayoutPreparation navigate={navigate} showToast={showToast} />;
      case 'fin-reports':
        return <FinanceReports navigate={navigate} showToast={showToast} />;
      case 'fin-settings':
        return <FinanceSettings navigate={navigate} showToast={showToast} />;
      case 'testimonial-list':
        return <TestimonialList navigate={navigate} showToast={showToast} />;
      case 'testimonial-details':
        return <TestimonialDetails navigate={navigate} testimonialId={routeState?.id} showToast={showToast} />;
      case 'mutawwif-report-details':
        return <MutawwifReportDetails navigate={navigate} reportId={routeState?.id} showToast={showToast} />;
      case 'report-list':
        return <ReportList navigate={navigate} showToast={showToast} />;
      case 'report-create':
        return <ReportCreate navigate={navigate} showToast={showToast} />;
      case 'article-list':
        return <ArticleList navigate={navigate}  showToast={showToast} />;
      case 'article-create':
        return <ArticleCreate navigate={navigate}  showToast={showToast} />;
      case 'article-details':
        return <ArticleDetails navigate={navigate} articleId={routeState?.id}  showToast={showToast} />;
      case 'announcement-list':
        return <AnnouncementList navigate={navigate}  showToast={showToast} />;
      case 'announcement-create':
        return <AnnouncementCreate navigate={navigate}  showToast={showToast} />;
      case 'announcement-details':
        return <AnnouncementDetails navigate={navigate} id={routeState?.id}  showToast={showToast} />;
      case 'settings':
        return <SettingsPage navigate={navigate}  showToast={showToast} />;
      case 'my-profile':
        return <MyProfile navigate={navigate} showToast={showToast} />;
      default:
        // Fallback to Component Showcase for testing other components
        return renderComponentShowcase();
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <AppShell navItems={navItems}>
      {renderRoute()}
    </AppShell>
  );

  function renderComponentShowcase() {
    const tableData = [
    { id: '1', name: 'John Doe', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Jane Smith', role: 'Editor', status: 'Pending' },
    { id: '3', name: 'Bob Johnson', role: 'Viewer', status: 'Inactive' },
  ];

  const tableColumns = [
    { header: 'Name', accessor: 'name' as const },
    { header: 'Role', accessor: 'role' as const },
    { 
      header: 'Status', 
      accessor: (row: typeof tableData[0]) => (
        <Badge variant={row.status === 'Active' ? 'success' : row.status === 'Pending' ? 'warning' : 'neutral'}>
          {row.status}
        </Badge>
      )
    },
    {
      header: 'Actions',
      accessor: () => (
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <IconButton size="sm"><Edit2 size={16} /></IconButton>
          <IconButton size="sm" className="text-danger"><Trash2 size={16} /></IconButton>
        </div>
      ),
      align: 'right' as const
    }
  ];

  return (
    <AppShell navItems={navItems}>
      <PageHeader 
        title="Component Showcase" 
        breadcrumbs={[{ label: 'Home' }, { label: 'Showcase' }]}
        actions={
          <Button leftIcon={<Plus size={20} />}>Primary Action</Button>
        }
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        {/* Actions */}
        <section>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Actions</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button isLoading>Loading</Button>
            <Button leftIcon={<Search size={20} />}>With Icon</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Inputs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
            <FormField label="Standard Input" required helperText="This is a helper text.">
              <Input placeholder="Enter something..." />
            </FormField>
            
            <FormField label="Input with Error" error="This field is required.">
              <Input error defaultValue="Invalid data" />
            </FormField>

            <FormField label="Input with Icon">
              <Input leftIcon={<Search size={20} />} placeholder="Search..." />
            </FormField>

            <FormField label="Select">
              <Select>
                <option>Option 1</option>
                <option>Option 2</option>
              </Select>
            </FormField>

            <FormField label="Date Picker">
              <DatePicker />
            </FormField>
          </div>
        </section>

        {/* Navigation & P1 Additions */}
        <section>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Navigation & Complex Inputs</h2>
          
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Tabs</h3>
            <Tabs 
              activeTab={activeTab} 
              onChange={setActiveTab}
              tabs={[
                { id: 'tab1', label: 'All Packages' },
                { id: 'tab2', label: 'Active' },
                { id: 'tab3', label: 'Drafts' },
                { id: 'tab4', label: 'Archived', icon: <Archive size={16} />, disabled: true }
              ]} 
            />
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Stepper</h3>
            <Stepper 
              currentStepIndex={1}
              steps={[
                { id: '1', label: 'Basic Info' },
                { id: '2', label: 'Pricing' },
                { id: '3', label: 'Itinerary' },
                { id: '4', label: 'Review', icon: <Eye size={16} /> }
              ]}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Filter Bar & Search</h3>
            <FilterBar 
              hasActiveFilters={true} 
              onClearFilters={() => setSearchValue('')}
            >
              <div style={{ width: '300px' }}>
                <SearchInput 
                  placeholder="Search packages..." 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClear={() => setSearchValue('')}
                />
              </div>
              <Select defaultValue="all">
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
              </Select>
            </FilterBar>
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>File Uploader</h3>
            <FileUploader 
              onFileSelect={(files) => console.log(files)}
              accept=".pdf,.png,.jpg"
              maxSizeMB={5}
            />
          </div>
        </section>

        {/* Data Display */}
        <section>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Data Display (P0 & P1)</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <MetricCard title="Total Revenue" value="$45,231" icon={<DollarSign size={20} className="text-success" />} iconBg="var(--color-success-light)" trend="up" trendValue="12.5%" />
            <MetricCard title="Active Pilgrims" value="1,204" icon={<Users size={20} className="text-primary" />} iconBg="var(--color-primary-light)" trend="up" trendValue="3.2%" />
            <MetricCard title="Cancellations" value="12" icon={<AlertTriangle size={20} className="text-danger" />} iconBg="var(--color-danger-light)" trend="down" trendValue="1.5%" />
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-8)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Timeline</h3>
              <Timeline items={[
                { id: '1', title: 'Package Created', timestamp: 'Today, 10:00 AM', description: 'Initial draft created by Admin.' },
                { id: '2', title: 'Payment Received', timestamp: 'Yesterday, 2:30 PM', variant: 'success' },
                { id: '3', title: 'Visa Rejected', timestamp: 'Oct 12, 09:15 AM', variant: 'danger', description: 'Missing passport scan.' }
              ]} />
            </div>
            
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Attachments</h3>
              <AttachmentList 
                attachments={[
                  { id: '1', name: 'passport_scan.pdf', size: '2.4 MB' },
                  { id: '2', name: 'vaccine_cert.png', size: '840 KB' }
                ]}
                onDownload={() => {}}
                onRemove={() => {}}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Skeletons</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <Skeleton style={{ height: '24px', width: '250px' }} />
              <Skeleton style={{ height: '44px', width: '100%' }} />
              <Skeleton style={{ height: '44px', width: '100%' }} />
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <h3 className="text-subsection-title">Data Table (with Selection & Sticky Header)</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="text-caption">Toggle Loading:</span>
                <input type="checkbox" checked={isLoadingTable} onChange={(e) => setIsLoadingTable(e.target.checked)} />
              </div>
            </div>
            
            <DataTable 
              data={tableData} 
              columns={tableColumns} 
              keyExtractor={(r) => r.id} 
              selectedKeys={selectedRows}
              onSelectionChange={setSelectedRows}
              isLoading={isLoadingTable}
            />
            <Pagination 
              currentPage={currentPage}
              totalPages={12}
              onPageChange={setCurrentPage}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Data Table (Empty State)</h3>
            <DataTable 
              data={[]} 
              columns={tableColumns} 
              keyExtractor={(r) => r.id} 
              emptyStateTitle="No users found"
              emptyStateDescription="There are no users matching your current filters."
            />
          </div>

          <div>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Empty State</h3>
            <EmptyState 
              title="No packages found" 
              description="Get started by creating your first travel package."
              actionLabel="Create Package"
              onAction={() => alert('Clicked')}
            />
          </div>
        </section>

        {/* Domain Components */}
        <section>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Domain Components</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
              {/* Review & Approval */}
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Verification Checklist</h3>
                <VerificationChecklist 
                  items={[
                    { id: 'ssm', label: 'SSM Certificate', required: true, status: 'pass' },
                    { id: 'motac', label: 'MOTAC License', required: true, status: 'pending' },
                    { id: 'bank', label: 'Bank Statement', required: false, status: 'fail', remark: 'Image too blurry' }
                  ]}
                  onStatusChange={(id, status) => console.log(id, status)}
                />
              </div>

              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Approval Decision Bar</h3>
                <ApprovalDecisionBar 
                  onApprove={() => console.log('Approve')}
                  onReject={() => console.log('Reject')}
                  onRevise={() => console.log('Revise')}
                  onAssignReviewer={() => console.log('Assign')}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
              {/* Document & Data Controls */}
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Document Status Control</h3>
                <DocumentStatusControl 
                  documentName="Flight Manifest"
                  status="Submitted"
                  required
                  onStatusChange={(status) => console.log(status)}
                />
              </div>

              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Sensitive Data Reveal</h3>
                <SensitiveDataReveal 
                  label="Bank Account Number"
                  realValue="1560 1234 5678"
                  onReveal={() => console.log('Revealed for audit')}
                />
              </div>

              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Status Transition & Export</h3>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <StatusTransitionMenu 
                    currentStatus="Pending"
                    allowedTransitions={['Approved', 'Rejected']}
                    onTransition={(s) => console.log(s)}
                  />
                  <ExportControl onExport={(f) => console.log(f)} />
                </div>
              </div>
            </div>

            {/* Panels */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)' }}>
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Remark Panel</h3>
                <RemarkPanel 
                  remarks={[{ id: '1', author: 'Jane Admin', timestamp: 'Today', content: 'Checked SSM, looks good.', priority: 'normal' }]}
                  onAddRemark={(c, p, cat) => console.log(c, p, cat)}
                />
              </div>

              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Audit Log Panel</h3>
                <AuditLogPanel 
                  logs={[
                    { id: '1', timestamp: '1 hour ago', actor: 'Super Admin', action: 'Approved Application', module: 'Travel Agency', details: 'APP-2026-001' },
                    { id: '2', timestamp: '2 hours ago', actor: 'Ops Staff', action: 'Uploaded Document', module: 'Group Trip', details: 'Flight Manifest TRP-100' }
                  ]}
                />
              </div>
            </div>

            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Import Control</h3>
              <ImportControl onImport={async (f) => console.log(f)} />
            </div>

          </div>
        </section>

        {/* Feedback */}
        <section>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Feedback & Overlays (P0 & P1)</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            <AlertBanner variant="info" title="System Update" message="A new version of the dashboard is available." />
            <AlertBanner variant="warning" message="Your session will expire in 5 minutes." />
            <AlertBanner variant="danger" title="Payment Failed" message="The credit card on file has expired." />
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <Button onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>
            <Button onClick={() => setIsConfirmOpen(true)} variant="danger">Open Confirmation</Button>
            <Button onClick={() => showToast('Success', 'Action completed successfully', 'success')} variant="secondary">Success Toast</Button>
            
            <DropdownMenu 
              triggerLabel="Actions"
              items={[
                { id: '1', label: 'Edit', icon: <Edit size={16} />, onClick: () => {} },
                { id: '2', label: 'Duplicate', icon: <Copy size={16} />, onClick: () => {} },
                { id: '3', label: 'Delete', icon: <Trash2 size={16} />, danger: true, onClick: () => {} }
              ]}
            />
          </div>
        </section>

      </div>

      {/* Overlays */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Confirmation"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setIsModalOpen(false)}>Delete</Button>
          </>
        }
      >
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <AlertTriangle size={24} className="text-danger" color="var(--color-danger)" />
          <p>Are you sure you want to delete this record? This action cannot be undone.</p>
        </div>
      </Modal>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title="Edit Record"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDrawerOpen(false)}>Save Changes</Button>
          </>
        }
      >
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <FormField label="Name" required>
            <Input defaultValue="John Doe" />
          </FormField>
        </div>
        <FormField label="Role">
          <Select>
            <option>Admin</option>
            <option>Editor</option>
          </Select>
        </FormField>
      </Drawer>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          showToast('Success', 'Action completed successfully', 'success');
        }}
        title="Delete Package"
        message="Are you sure you want to delete this package? This action cannot be undone and will remove all associated pilgrim records."
        isDestructive
        confirmLabel="Yes, Delete"
      />

      <BulkActionBar 
        selectedCount={selectedRows.size}
        onClearSelection={() => setSelectedRows(new Set())}
        actions={
          <>
            <Button size="sm" variant="ghost" style={{ color: 'white' }}>Export</Button>
            <Button size="sm" variant="danger">Delete All</Button>
          </>
        }
      />

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </AppShell>
  );
}
}

export default ComponentShowcase;
