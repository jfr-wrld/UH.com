import React, { useState, useEffect } from 'react';
import { JUVLandingPage } from './pages/juv/JUVLandingPage';

import { TACrmDashboard } from './pages/ta-portal/TACrmDashboard';
import { TACrmJamaah360 } from './pages/ta-portal/TACrmJamaah360';
import { TAPackageList } from './pages/ta-portal/TAPackageList';
import { TAPackageDetails } from './pages/ta-portal/TAPackageDetails';
import { TABookingList } from './pages/ta-portal/TABookingList';
import { TABookingDetails } from './pages/ta-portal/TABookingDetails';
import { TALoginPage } from './pages/auth/TALoginPage';
import { TARegisterPage } from './pages/auth/TARegisterPage';
import { JUVLoginPage } from './pages/auth/JUVLoginPage';
import { JUVRegisterPage } from './pages/auth/JUVRegisterPage';
import { TAGroupTripList } from './pages/ta-portal/trips/TAGroupTripList';
import { TAGroupTripCreate } from './pages/ta-portal/trips/TAGroupTripCreate';
import { TAGroupTripDetails } from './pages/ta-portal/trips/TAGroupTripDetails';
import { TADocumentDashboard } from './pages/ta-portal/documents/TADocumentDashboard';
import { TAJamaahList } from './pages/ta-portal/jamaah/TAJamaahList';
import { TAJamaahDetails } from './pages/ta-portal/jamaah/TAJamaahDetails';
import { TATeamList } from './pages/ta-portal/team/TATeamList';
import { TAStaffDetail } from './pages/ta-portal/team/TAStaffDetail';
import { TAMutawwifList } from './pages/ta-portal/mutawwif/TAMutawwifList';
import { TAMutawwifDetails } from './pages/ta-portal/mutawwif/TAMutawwifDetails';
import { TAProfile } from './pages/ta-portal/profile/TAProfile';
import { TAFinanceDashboard } from './pages/ta-portal/finance/TAFinanceDashboard';
import { TAInvoiceList } from './pages/ta-portal/finance/TAInvoiceList';
import { TAInvoiceDetails } from './pages/ta-portal/finance/TAInvoiceDetails';
import { TAPaymentList } from './pages/ta-portal/finance/TAPaymentList';
import { TARefundList } from './pages/ta-portal/finance/TARefundList';
import { TACreateInvoice } from './pages/ta-portal/finance/TACreateInvoice';
import { TASettlementList } from './pages/ta-portal/finance/TASettlementList';
import { TASettlementDetails } from './pages/ta-portal/finance/TASettlementDetails';
import { TAFinanceSettings } from './pages/ta-portal/finance/TAFinanceSettings';
import { TATestimonialList } from './pages/ta-portal/testimonial/TATestimonialList';
import { TATestimonialDetails } from './pages/ta-portal/testimonial/TATestimonialDetails';
import { TAReportList } from './pages/ta-portal/support/TAReportList';
import { TAReportCreate } from './pages/ta-portal/support/TAReportCreate';
import { TAReportDetails } from './pages/ta-portal/support/TAReportDetails';
import { TAAnnouncementList } from './pages/ta-portal/announcements/TAAnnouncementList';
import { TAAnnouncementCreate } from './pages/ta-portal/announcements/TAAnnouncementCreate';
import { TAAnnouncementDetails } from './pages/ta-portal/announcements/TAAnnouncementDetails';
import { TAArticleHome } from './pages/ta-portal/articles/TAArticleHome';
import { TAArticleList } from './pages/ta-portal/articles/TAArticleList';
import { TAArticleDetails } from './pages/ta-portal/articles/TAArticleDetails';
import { TASettings } from './pages/ta-portal/settings/TASettings';

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

import { AdminFinanceDashboard } from './pages/admin-portal/finance/AdminFinanceDashboard';
import { AdminInvoiceList } from './pages/admin-portal/finance/AdminInvoiceList';
import { AdminPaymentList } from './pages/admin-portal/finance/AdminPaymentList';
import { AdminRefundList } from './pages/admin-portal/finance/AdminRefundList';
import { AdminPayoutList } from './pages/admin-portal/finance/AdminPayoutList';
import { AdminInvoiceCreate } from './pages/admin-portal/finance/AdminInvoiceCreate';
import { AdminInvoiceDetails } from './pages/admin-portal/finance/AdminInvoiceDetails';
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
import { ReferralDashboard } from './pages/referrals/ReferralDashboard';
import { ReferralProgramsList } from './pages/referrals/ReferralProgramsList';
import { ReferralAttributionList } from './pages/referrals/ReferralAttributionList';
import { ReferralFinanceHandoff } from './pages/referrals/ReferralFinanceHandoff';
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
import { Home, Building, Users, UserCheck, Package, Ticket, Plane, Bed, Map, CalendarDays, Wallet, FileEdit, Megaphone, MessageSquare, BarChart3, Settings, Search, Trash2, Edit2, AlertTriangle, Plus, Calendar, DollarSign, CreditCard, BarChart2, History, LayoutDashboard, ChevronRight, Eye, RefreshCcw, Archive, Edit, Copy, Contact, UserCog, Briefcase, Building2, FileText, Star, Bell, BookOpen } from 'lucide-react';
import { useFeatureFlags } from './contexts/FeatureFlagContext';

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
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    return window.location.pathname.startsWith('/admin');
  });

  const handleLogin = () => {
    localStorage.setItem('erp_auth', 'true');
    setIsAuthenticated(true);
  };

  const [isTARoute, setIsTARoute] = useState(() => {
    return window.location.pathname.startsWith('/ta');
  });
  const [isTAAuthenticated, setIsTAAuthenticated] = useState(() => {
    return localStorage.getItem('ta_auth') === 'true';
  });
  const [isJUVAuthenticated, setIsJUVAuthenticated] = useState(() => {
    return localStorage.getItem('juv_auth') === 'true';
  });

  const handleTALogin = () => {
    localStorage.setItem('ta_auth', 'true');
    setIsTAAuthenticated(true);
    navigate('ta-crm-dashboard');
  };

  const handleJUVLogin = () => {
    localStorage.setItem('juv_auth', 'true');
    setIsJUVAuthenticated(true);
    navigate('dashboard');
  };


  useEffect(() => {
    const handlePopState = () => {
      setIsAdminRoute(window.location.pathname.startsWith('/admin'));
      setIsTARoute(window.location.pathname.startsWith('/ta'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
  const { flags } = useFeatureFlags();

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
        onClick: item.children ? undefined : (item.onClick || (() => navigate(item.id))),
        children
      };
    });
  };

  const navItems = updateActiveNavItems([
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { 
      id: 'travel-agency', 
      label: 'Travel Agencies', 
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
      label: 'Jamaah',
      category: 'Network & Users',
      onClick: () => navigate('jamaah-list'),
      isActive: currentRoute.startsWith('jamaah-list') || currentRoute.startsWith('jamaah-add') || currentRoute.startsWith('jamaah-details'),
      icon: <Users size={20} /> 
    },
    { 
      id: 'mutawwif-list', 
      label: 'Mutawwif', 
      category: 'Network & Users',
      icon: <UserCheck size={20} />,
      onClick: () => navigate('mutawwif-list'),
      isActive: currentRoute.startsWith('mutawwif-list') || currentRoute.startsWith('mutawwif-add') || currentRoute.startsWith('mutawwif-details')
    },
    { 
      id: 'package-list', 
      label: 'Packages', 
      category: 'Operations',
      icon: <Package size={20} />,
      onClick: () => navigate('package-list'),
      isActive: currentRoute.startsWith('package-list') || currentRoute.startsWith('package-create') || currentRoute.startsWith('package-details')
    },
    { 
      id: 'booking-list', 
      label: 'Bookings', 
      category: 'Operations',
      icon: <Ticket size={20} />,
      onClick: () => navigate('booking-list'),
      isActive: currentRoute.startsWith('booking-list') || currentRoute.startsWith('booking-create') || currentRoute.startsWith('booking-details')
    },
    { 
      id: 'group-trip-list', 
      label: 'Trips', 
      category: 'Operations',
      icon: <Users size={20} />,
      onClick: () => navigate('group-trip-list'),
      isActive: currentRoute.startsWith('group-trip-list') || currentRoute.startsWith('group-trip-create') || currentRoute.startsWith('group-trip-details')
    },
    { 
      id: 'flight-list', 
      label: 'Flights', 
      category: 'Operations',
      icon: <Plane size={20} />,
      onClick: () => navigate('flight-list'),
      isActive: currentRoute.startsWith('flight-list') || currentRoute.startsWith('flight-add') || currentRoute.startsWith('flight-details') || currentRoute.startsWith('airline-add') || currentRoute.startsWith('airline-details')
    },
    { 
      id: 'hotel-list', 
      label: 'Hotels', 
      category: 'Operations',
      icon: <Bed size={20} />,
      onClick: () => navigate('hotel-list'),
      isActive: currentRoute.startsWith('hotel-list') || currentRoute.startsWith('hotel-add') || currentRoute.startsWith('hotel-details')
    },
    { 
      id: 'itinerary-list', 
      label: 'Itineraries', 
      category: 'Operations',
      icon: <Calendar size={20} />,
      onClick: () => navigate('itinerary-list'),
      isActive: currentRoute.startsWith('itinerary-list') || currentRoute.startsWith('itinerary-add') || currentRoute.startsWith('itinerary-details')
    },
    { 
      id: 'season-list', 
      label: 'Seasons', 
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
        { id: 'admin-finance-dashboard', label: 'Overview', onClick: () => navigate('admin-finance-dashboard'), isActive: currentRoute.startsWith('admin-finance-dashboard') },
        { id: 'admin-finance-payments', label: 'Payments', onClick: () => navigate('admin-finance-payments'), isActive: currentRoute.startsWith('admin-finance-payments') },
        { id: 'admin-finance-invoices', label: 'Invoices', onClick: () => navigate('admin-finance-invoices'), isActive: currentRoute.startsWith('admin-finance-invoice') },
        { id: 'admin-finance-refunds', label: 'Refund Requests', onClick: () => navigate('admin-finance-refunds'), isActive: currentRoute.startsWith('admin-finance-refunds') },
        { id: 'fin-commission', label: 'Commission Summary', onClick: () => navigate('fin-commission'), isActive: currentRoute.startsWith('fin-commission') },
        { 
          id: 'fin-allowance', 
          label: 'Allowance Management',
          onClick: () => navigate('fin-allowance'),
          isActive: currentRoute.startsWith('fin-allowance')
        },
        { 
          id: 'admin-finance-payouts', 
          label: 'Payout Preparation',
          onClick: () => navigate('admin-finance-payouts'),
          isActive: currentRoute.startsWith('admin-finance-payout')
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
      id: 'articles', 
      label: 'Articles', 
      category: 'Content',
      icon: <FileEdit size={20} />,
      children: [
        { id: 'article-list', label: 'Article List', onClick: () => navigate('article-list'), isActive: currentRoute === 'article-list' || currentRoute.startsWith('article-details') },
        { id: 'article-create', label: 'Create Article', onClick: () => navigate('article-create'), isActive: currentRoute === 'article-create' },
      ]
    },
    { 
      id: 'announcement', 
      label: 'Announcements', 
      category: 'Content',
      icon: <Megaphone size={20} />,
      children: [
        { id: 'announcement-list', label: 'Announcement List', onClick: () => navigate('announcement-list'), isActive: currentRoute === 'announcement-list' || currentRoute.startsWith('announcement-details') },
        { id: 'announcement-create', label: 'Create Announcement', onClick: () => navigate('announcement-create'), isActive: currentRoute === 'announcement-create' },
      ]
    },
    { 
      id: 'testimonial', 
      label: 'Testimonials', 
      category: 'Content',
      icon: <MessageSquare size={20} />,
      children: [
        { id: 'testimonial-list', label: 'Testimonial List', onClick: () => navigate('testimonial-list'), isActive: currentRoute === 'testimonial-list' || currentRoute.startsWith('testimonial-details') || currentRoute.startsWith('mutawwif-report-details') },
      ]
    },
    { 
      id: 'issue-reports', 
      label: 'Reports', 
      category: 'Content',
      icon: <BarChart2 size={20} />,
      children: [
        { id: 'report-list', label: 'All Reports', onClick: () => navigate('report-list'), isActive: currentRoute === 'report-list' || currentRoute.startsWith('report-details') },
        { id: 'report-create', label: 'Create / Escalate Report', onClick: () => navigate('report-create'), isActive: currentRoute === 'report-create' },
      ]
    },
    { 
      id: 'user-management', 
      label: 'Users', 
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
    { 
      id: 'referrals', 
      label: 'Referrals & Rewards', 
      category: 'Marketing',
      icon: <Ticket size={20} />,
      children: [
        { id: 'ref-dashboard', label: 'Dashboard', onClick: () => navigate('ref-dashboard'), isActive: currentRoute === 'ref-dashboard' },
        { id: 'ref-programs', label: 'Programs & Campaigns', onClick: () => navigate('ref-programs'), isActive: currentRoute === 'ref-programs' },
        { id: 'ref-attributions', label: 'Attributions & Review', onClick: () => navigate('ref-attributions'), isActive: currentRoute === 'ref-attributions' },
        { id: 'ref-finance', label: 'Finance Handoff', onClick: () => navigate('ref-finance'), isActive: currentRoute === 'ref-finance' },
      ]
    },
    { id: 'settings', label: 'Settings', category: 'System', icon: <Settings size={20} />, onClick: () => navigate('settings'), isActive: currentRoute === 'settings' },
  ]).filter(item => {
    if (item.id === 'referrals') {
      return flags.REFERRAL_MODULE !== false; // Show by default or if true
    }
    return true;
  });

  const renderRoute = () => {
    if (currentRoute.startsWith('ref-') && flags.REFERRAL_MODULE === false) {
      return (
        <div className="p-8 h-full flex items-center justify-center">
          <EmptyState
            icon={<AlertTriangle size={48} className="text-yellow-500" />}
            title="Module Disabled"
            description="The Referral & Rewards module is currently disabled by the Platform Administrator."
          />
        </div>
      );
    }

    switch (currentRoute) {
      case 'dashboard':
        return <AdminDashboard navigate={navigate} />;
      case 'ta-list':
        return <TravelAgencyList navigate={navigate} />;
      case 'ta-applications':
        return <TravelAgencyApplications navigate={navigate} />;
      case 'ta-review':
        return <ApplicationReview navigate={navigate} applicationId={routeState?.applicationId}  showToast={showToast} />;
      case 'ta-details':
        return <TravelAgencyDetails navigate={navigate} agencyId={routeState?.agencyId} />;
      case 'ta-add':
      case 'ta-edit':
        return <TravelAgencyForm navigate={navigate} agencyId={routeState?.agencyId}  showToast={showToast} />;
      case 'um-users':
        return <UserList navigate={navigate} />;
      case 'um-invite':
        return <UserInvite navigate={navigate}  showToast={showToast} />;
      case 'um-details':
        return <UserDetails navigate={navigate} userId={routeState?.id} />;
      case 'um-roles':
        return <RoleList navigate={navigate} />;
      case 'um-role-form':
        return <RoleForm navigate={navigate} roleId={routeState?.id}  showToast={showToast} />;
      case 'jamaah-list':
        return <JamaahList navigate={navigate} />;
      case 'jamaah-add':
        return <JamaahAdd navigate={navigate}  showToast={showToast} />;
      case 'jamaah-details':
        return <JamaahDetails navigate={navigate} jamaahId={routeState?.id} />;
      case 'mutawwif-list':
        return <MutawwifList navigate={navigate} />;
      case 'mutawwif-add':
        return <MutawwifAdd navigate={navigate}  showToast={showToast} />;
      case 'mutawwif-details':
        return <MutawwifDetails navigate={navigate} mutawwifId={routeState?.id} />;
      case 'itinerary-list':
        return <ItineraryList navigate={navigate} />;
      case 'itinerary-add':
        return <ItineraryAdd navigate={navigate}  showToast={showToast} />;
      case 'itinerary-details':
        return <ItineraryDetails navigate={navigate} itineraryId={routeState?.id} />;
      case 'flight-list':
        return <FlightList navigate={navigate} />;
      case 'flight-add':
        return <FlightAdd navigate={navigate}  showToast={showToast} />;
      case 'flight-details':
        return <FlightDetails navigate={navigate} flightId={routeState?.id} />;
      case 'airline-add':
        return <AirlineAdd navigate={navigate}  showToast={showToast} />;
      case 'airline-details':
        return <AirlineDetails navigate={navigate} airlineId={routeState?.id} />;
      case 'hotel-list':
        return <HotelList navigate={navigate} />;
      case 'hotel-add':
        return <HotelAdd navigate={navigate}  showToast={showToast} />;
      case 'hotel-details':
        return <HotelDetails navigate={navigate} hotelId={routeState?.id} />;
      case 'season-list':
        return <SeasonList navigate={navigate} />;
      case 'package-list':
        return <PackageList navigate={navigate} />;
      case 'package-create':
        return <PackageCreate navigate={navigate}  showToast={showToast} />;
      case 'package-details':
        return <PackageDetails navigate={navigate} packageId={routeState?.id}  showToast={showToast} />;
      case 'group-trip-list':
        return <GroupTripList navigate={navigate} />;
      case 'group-trip-create':
        return <GroupTripCreate navigate={navigate}  showToast={showToast} />;
      case 'group-trip-details':
        return <GroupTripDetails navigate={navigate} tripId={routeState?.id} />;
      case 'report-details':
        return <ReportDetails navigate={navigate} reportId={routeState?.id} />;
      
      case 'booking-list':
        return <BookingList navigate={navigate} />;
      case 'booking-create':
        return <BookingCreate navigate={navigate} showToast={showToast} />;
      case 'booking-details':
        return <BookingDetails navigate={navigate} bookingId={routeState?.id} />;
      case 'admin-finance-dashboard':
        return <AdminFinanceDashboard navigate={navigate} />;
      case 'admin-finance-payments':
        return <AdminPaymentList navigate={navigate} showToast={showToast} />;
      case 'admin-finance-invoices':
        return <AdminInvoiceList navigate={navigate} />;
      case 'admin-finance-refunds':
        return <AdminRefundList navigate={navigate} />;
      case 'admin-finance-payouts':
        return <AdminPayoutList navigate={navigate} />;
      case 'admin-finance-invoice-create':
        return <AdminInvoiceCreate navigate={navigate} showToast={showToast} />;
      case 'admin-finance-invoice-details':
        return <AdminInvoiceDetails navigate={navigate} invoiceId={routeState?.id} showToast={showToast} />;
      case 'fin-commission':
        return <CommissionSummary navigate={navigate} showToast={showToast} />;
      case 'fin-allowance':
        return <AllowanceList navigate={navigate} />;
      case 'fin-allowance-create':
        return <AllowanceCreate navigate={navigate} showToast={showToast} />;
      case 'fin-allowance-details':
        return <AllowanceDetails navigate={navigate} allowanceId={routeState?.id} />;

      case 'fin-reports':
        return <FinanceReports navigate={navigate} />;
      case 'fin-settings':
        return <FinanceSettings navigate={navigate} showToast={showToast} />;
      case 'testimonial-list':
        return <TestimonialList navigate={navigate} />;
      case 'testimonial-details':
        return <TestimonialDetails navigate={navigate} testimonialId={routeState?.id} showToast={showToast} />;
      case 'mutawwif-report-details':
        return <MutawwifReportDetails navigate={navigate} reportId={routeState?.id} />;
      case 'report-list':
        return <ReportList navigate={navigate} />;
      case 'report-create':
        return <ReportCreate navigate={navigate} showToast={showToast} />;
      case 'article-list':
        return <ArticleList navigate={navigate} />;
      case 'article-create':
        return <ArticleCreate navigate={navigate}  showToast={showToast} />;
      case 'article-details':
        return <ArticleDetails navigate={navigate} articleId={routeState?.id} />;
      case 'announcement-list':
        return <AnnouncementList navigate={navigate} />;
      case 'announcement-create':
        return <AnnouncementCreate navigate={navigate}  showToast={showToast} />;
      case 'announcement-details':
        return <AnnouncementDetails navigate={navigate} id={routeState?.id} />;
      case 'ref-dashboard':
        return <ReferralDashboard navigate={navigate} />;
      case 'ref-programs':
        return <ReferralProgramsList navigate={navigate} />;
      case 'ref-attributions':
        return <ReferralAttributionList navigate={navigate} />;
      case 'ref-finance':
        return <ReferralFinanceHandoff navigate={navigate} />;
      case 'settings':
        return <SettingsPage navigate={navigate}  showToast={showToast} />;
      case 'my-profile':
        return <MyProfile navigate={navigate} showToast={showToast} />;
      default:
        // Fallback to Component Showcase for testing other components
        return renderComponentShowcase();
    }
  };


  const taNavItems = updateActiveNavItems([
    { id: 'ta-crm-dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => navigate('ta-crm-dashboard'), isActive: currentRoute === 'ta-crm-dashboard' || currentRoute.startsWith('ta-crm-jamaah-360') },
    
    // DIRECTORY & USERS
    { id: 'ta-profile', label: 'Agency Profile', category: 'Directory & Users', icon: <Building2 size={20} />, onClick: () => navigate('ta-profile'), isActive: currentRoute === 'ta-profile' },
    { id: 'ta-team', label: 'Agency Team', category: 'Directory & Users', icon: <Contact size={20} />, onClick: () => navigate('ta-team'), isActive: currentRoute === 'ta-team' || currentRoute.startsWith('ta-staff-') },
    { 
      id: 'ta-jamaah', 
      label: 'Jamaah', 
      category: 'Directory & Users',
      icon: <Users size={20} />,
      onClick: () => navigate('ta-jamaah-list'),
      isActive: currentRoute === 'ta-jamaah-list' || currentRoute.startsWith('ta-jamaah-')
    },
    { 
      id: 'ta-mutawwif', 
      label: 'Mutawwif', 
      category: 'Directory & Users', 
      icon: <UserCheck size={20} />,
      onClick: () => navigate('ta-mutawwif-list'),
      isActive: currentRoute === 'ta-mutawwif-list' || currentRoute.startsWith('ta-mutawwif-details')
    },

    // SALES & BOOKING
    { id: 'ta-packages', label: 'Packages', category: 'Sales & Booking', icon: <Package size={20} />, onClick: () => navigate('ta-package-list'), isActive: currentRoute === 'ta-package-list' || currentRoute.startsWith('ta-package-') },
    { id: 'ta-bookings', label: 'Bookings', category: 'Sales & Booking', icon: <Ticket size={20} />, onClick: () => navigate('ta-booking-list'), isActive: currentRoute === 'ta-booking-list' || currentRoute.startsWith('ta-booking-') },

    // TRIP OPERATIONS
    { id: 'ta-trips', label: 'Group Trips', category: 'Trip Operations', icon: <Briefcase size={20} />, onClick: () => navigate('ta-trip-list'), isActive: currentRoute === 'ta-trip-list' || currentRoute.startsWith('ta-trip-') },
    { id: 'ta-documents', label: 'Documents & Services', category: 'Trip Operations', icon: <FileText size={20} />, onClick: () => navigate('ta-documents'), isActive: currentRoute === 'ta-documents' },

    // FINANCE
    { 
      id: 'ta-finance', 
      label: 'Finance', 
      category: 'Finance', 
      icon: <Wallet size={20} />,
      isActive: currentRoute === 'ta-finance' || currentRoute.startsWith('ta-finance-'),
      children: [
        { id: 'ta-finance-dashboard', label: 'Dashboard', onClick: () => navigate('ta-finance'), isActive: currentRoute === 'ta-finance' },
        { id: 'ta-finance-invoices', label: 'Invoices', onClick: () => navigate('ta-finance-invoices'), isActive: currentRoute === 'ta-finance-invoices' || currentRoute.startsWith('ta-finance-invoice') },
        { id: 'ta-finance-payments', label: 'Payments', onClick: () => navigate('ta-finance-payments'), isActive: currentRoute === 'ta-finance-payments' },
        { id: 'ta-finance-refunds', label: 'Refunds', onClick: () => navigate('ta-finance-refunds'), isActive: currentRoute === 'ta-finance-refunds' },
        { id: 'ta-finance-settlements', label: 'Settlements', onClick: () => navigate('ta-finance-settlements'), isActive: currentRoute.startsWith('ta-finance-settlement') },
        { id: 'ta-finance-settings', label: 'Settings', onClick: () => navigate('ta-finance-settings'), isActive: currentRoute === 'ta-finance-settings' }
      ]
    },

    // COMMUNICATION & SUPPORT
    { id: 'ta-reports', label: 'Reports & Support', category: 'Communication & Support', icon: <MessageSquare size={20} />, children: [
      { id: 'ta-report-list', label: 'All Tickets / Reports', onClick: () => navigate('ta-report-list'), isActive: currentRoute === 'ta-report-list' || currentRoute.startsWith('ta-report-details') },
      { id: 'ta-report-create', label: 'Create Ticket', onClick: () => navigate('ta-report-create'), isActive: currentRoute === 'ta-report-create' }
    ] },
    { id: 'ta-testimonials', label: 'Testimonials', category: 'Communication & Support', icon: <Star size={20} />, children: [
      { id: 'ta-testimonial-list', label: 'All Feedback', onClick: () => navigate('ta-testimonial-list'), isActive: currentRoute === 'ta-testimonial-list' || currentRoute.startsWith('ta-testimonial-details') }
    ] },
    { id: 'ta-announcements', label: 'Announcements', category: 'Communication & Support', icon: <Bell size={20} />, onClick: () => navigate('ta-announcements'), isActive: currentRoute === 'ta-announcements' || currentRoute.startsWith('ta-announcement-') },
    { id: 'ta-knowledge-base', label: 'Knowledge Base', category: 'Communication & Support', icon: <BookOpen size={20} />, onClick: () => navigate('ta-knowledge-base'), isActive: currentRoute === 'ta-knowledge-base' || currentRoute.startsWith('ta-article-') },

    // SYSTEM
    { id: 'ta-settings', label: 'Settings', category: 'System', icon: <Settings size={20} />, onClick: () => navigate('ta-settings'), isActive: currentRoute === 'ta-settings' },
  ]);

  const renderTARoute = () => {
    switch (currentRoute) {
      case 'ta-crm-dashboard':
      case 'dashboard':
        return <TACrmDashboard navigate={navigate} />;
      case 'ta-crm-jamaah-360':
        return <TACrmJamaah360 navigate={navigate} jamaahId={routeState?.id} />;
      case 'ta-package-list':
        return <TAPackageList navigate={navigate} />;
      case 'ta-package-details':
        return <TAPackageDetails navigate={navigate} packageId={routeState?.id} />;
      case 'ta-booking-list':
        return <TABookingList navigate={navigate} />;
      case 'ta-booking-details':
        return <TABookingDetails navigate={navigate} bookingId={routeState?.id} />;
      case 'ta-trip-list':
        return <TAGroupTripList navigate={navigate} />;
      case 'ta-trip-create':
        return <TAGroupTripCreate navigate={navigate} showToast={showToast} />;
      case 'ta-trip-details':
        return <TAGroupTripDetails navigate={navigate} tripId={routeState?.id} showToast={showToast} />;
      case 'ta-jamaah-list':
        return <TAJamaahList navigate={navigate} />;
      case 'ta-jamaah-details':
        return <TAJamaahDetails navigate={navigate} jamaahId={routeState?.id} />;
      case 'ta-mutawwif-list':
        return <TAMutawwifList navigate={navigate} />;
      case 'ta-mutawwif-details':
        return <TAMutawwifDetails navigate={navigate} mutawwifId={routeState?.id} />;
      case 'ta-team':
        return <TATeamList navigate={navigate} />;
      case 'ta-staff-details':
        return <TAStaffDetail navigate={navigate} staffId={routeState?.id} />;
      case 'ta-profile':
        return <TAProfile navigate={navigate} />;
      case 'ta-documents':
        return <TADocumentDashboard navigate={navigate} />;
      case 'ta-finance':
        return <TAFinanceDashboard navigate={navigate} />;
      case 'ta-finance-invoices':
        return <TAInvoiceList navigate={navigate} />;
      case 'ta-finance-invoice-create':
        return <TACreateInvoice navigate={navigate} showToast={showToast} />;
      case 'ta-finance-invoice-details':
        return <TAInvoiceDetails navigate={navigate} invoiceId={routeState?.id} />;
      case 'ta-finance-payments':
        return <TAPaymentList navigate={navigate} />;
      case 'ta-finance-refunds':
        return <TARefundList navigate={navigate} />;
      case 'ta-finance-settlements':
        return <TASettlementList navigate={navigate} />;
      case 'ta-finance-settlement-details':
        return <TASettlementDetails navigate={navigate} settlementId={routeState?.id} />;
      case 'ta-finance-settings':
        return <TAFinanceSettings navigate={navigate} />;
      case 'ta-testimonial-list':
      case 'ta-testimonials':
        return <TATestimonialList navigate={navigate} />;
      case 'ta-testimonial-details':
        return <TATestimonialDetails navigate={navigate} testimonialId={routeState?.id} showToast={showToast} />;
      case 'ta-report-list':
      case 'ta-reports':
        return <TAReportList navigate={navigate} />;
      case 'ta-report-create':
        return <TAReportCreate navigate={navigate} showToast={showToast} />;
      case 'ta-report-details':
        return <TAReportDetails navigate={navigate} reportId={routeState?.id} showToast={showToast} />;
      case 'ta-announcements':
      case 'ta-announcement-list':
        return <TAAnnouncementList navigate={navigate} />;
      case 'ta-announcement-create':
        return <TAAnnouncementCreate navigate={navigate} showToast={showToast} />;
      case 'ta-announcement-details':
        return <TAAnnouncementDetails navigate={navigate} id={routeState?.id} type={routeState?.type} />;
      case 'ta-knowledge-base':
        return <TAArticleHome navigate={navigate} />;
      case 'ta-article-list':
        return <TAArticleList navigate={navigate} />;
      case 'ta-article-details':
        return <TAArticleDetails navigate={navigate} id={routeState?.id} />;
      case 'ta-settings':
        return <TASettings navigate={navigate} showToast={showToast} />;
      default:
        return <TACrmDashboard navigate={navigate} />;
    }
  };

  if (isAdminRoute) {
    if (!isAuthenticated) {
      return <LoginPage onLogin={handleLogin} />;
    }
    return (
      <AppShell navItems={navItems}>
        {renderRoute()}
      </AppShell>
    );
  }


  if (isTARoute) {
    if (!isTAAuthenticated) {
      if (currentRoute === 'ta-register') {
        return <TARegisterPage onRegister={handleTALogin} onLoginClick={() => navigate('ta-login')} />;
      }
      return <TALoginPage onLogin={handleTALogin} onRegisterClick={() => navigate('ta-register')} />;
    }
    return (
      <AppShell navItems={taNavItems} agencyName="Al-Hijrah Travel">
        {renderTARoute()}
      </AppShell>
    );
  }

  // JUV Auth Routes
  if (currentRoute === 'login') {
    return <JUVLoginPage onLogin={handleJUVLogin} onRegisterClick={() => navigate('register')} />;
  }
  if (currentRoute === 'register') {
    return <JUVRegisterPage onRegister={handleJUVLogin} onLoginClick={() => navigate('login')} />;
  }

  // Default to User/Jamaah View - Landing Page
  return (
    <JUVLandingPage 
      isAuthenticated={isJUVAuthenticated} 
      onLoginClick={() => navigate('login')}
      onRegisterClick={() => navigate('register')}
      onLogoutClick={() => {
        localStorage.removeItem('juv_auth');
        setIsJUVAuthenticated(false);
      }}
    />
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
                  <ExportControl data={[]} />
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
