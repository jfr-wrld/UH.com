import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# 1. Imports
imports = """
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
import { TAProfile } from './pages/ta-portal/profile/TAProfile';
"""
content = re.sub(r"(import \{ JUVLandingPage \} from '\./pages/juv/JUVLandingPage';)", r"\1\n" + imports, content)

# 2. Add lucide icons
content = content.replace("Star } from 'lucide-react';", "Star, Bell, BookOpen, Contact, UserCog } from 'lucide-react';")
if "UserCog" not in content:
    content = content.replace("} from 'lucide-react';", ", Contact, UserCog } from 'lucide-react';")

# 3. Add states
states = """
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
"""
content = re.sub(r"(const handleLogin = \(\) => \{\n.*?setIsAuthenticated\(true\);\n  \};)", r"\1\n" + states, content, flags=re.DOTALL)

# 4. update popstate
pop = """
    const handlePopState = () => {
      setIsAdminRoute(window.location.pathname.startsWith('/admin'));
      setIsTARoute(window.location.pathname.startsWith('/ta'));
    };
"""
content = re.sub(r"const handlePopState = \(\) => \{.*?\};", pop.strip(), content, flags=re.DOTALL)


# 5. Add taNavItems and renderTARoute
ta_code = """
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
    { id: 'ta-mutawwif', label: 'Mutawwif', category: 'Directory & Users', icon: <UserCheck size={20} /> },

    // SALES & BOOKING
    { id: 'ta-packages', label: 'Packages', category: 'Sales & Booking', icon: <Package size={20} />, onClick: () => navigate('ta-package-list'), isActive: currentRoute === 'ta-package-list' || currentRoute.startsWith('ta-package-') },
    { id: 'ta-bookings', label: 'Bookings', category: 'Sales & Booking', icon: <Ticket size={20} />, onClick: () => navigate('ta-booking-list'), isActive: currentRoute === 'ta-booking-list' || currentRoute.startsWith('ta-booking-') },

    // TRIP OPERATIONS
    { id: 'ta-trips', label: 'Group Trips', category: 'Trip Operations', icon: <Briefcase size={20} />, onClick: () => navigate('ta-trip-list'), isActive: currentRoute === 'ta-trip-list' || currentRoute.startsWith('ta-trip-') },
    { id: 'ta-documents', label: 'Documents & Services', category: 'Trip Operations', icon: <FileText size={20} />, onClick: () => navigate('ta-documents'), isActive: currentRoute === 'ta-documents' },

    // FINANCE
    { id: 'ta-finance', label: 'Finance', category: 'Finance', icon: <Wallet size={20} /> },

    // COMMUNICATION & SUPPORT
    { id: 'ta-reports', label: 'Support', category: 'Communication & Support', icon: <MessageSquare size={20} /> },
    { id: 'ta-testimonials', label: 'Testimonials', category: 'Communication & Support', icon: <Star size={20} /> },
    { id: 'ta-announcements', label: 'Announcements', category: 'Communication & Support', icon: <Bell size={20} /> },
    { id: 'ta-articles', label: 'Knowledge Base', category: 'Communication & Support', icon: <BookOpen size={20} /> },

    // SYSTEM
    { id: 'ta-settings', label: 'Settings', category: 'System', icon: <Settings size={20} /> },
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
      case 'ta-team':
        return <TATeamList navigate={navigate} />;
      case 'ta-staff-details':
        return <TAStaffDetail navigate={navigate} staffId={routeState?.id} />;
      case 'ta-profile':
        return <TAProfile navigate={navigate} showToast={showToast} />;
      case 'ta-documents':
        return <TADocumentDashboard navigate={navigate} />;
      default:
        return <TACrmDashboard navigate={navigate} />;
    }
  };
"""
content = re.sub(r"(  if \(isAdminRoute\) \{)", ta_code + r"\n\1", content)


# 6. Add routing logic at the end
ta_routing = """
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

"""
content = re.sub(r"(  // Default to User/Jamaah View - Landing Page)", ta_routing + r"\1", content)


with open("src/App.tsx", "w") as f:
    f.write(content)

