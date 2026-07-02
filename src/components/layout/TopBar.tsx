import React, { useState, useRef, useEffect } from 'react';
import { classNames } from '../../lib/utils';
import { Menu, Bell, UserCircle, LogOut, Settings, Search as SearchIcon, FileText, Building, Package, Plane, Users } from 'lucide-react';
import { IconButton } from '../actions/IconButton';
import { DropdownMenu } from '../actions/DropdownMenu';
import { SearchInput } from '../inputs/SearchInput';
import type { NavItem } from './Sidebar';

export interface TopBarProps {
  onMenuClick: () => void;
  title?: string;
  className?: string;
  hasNotifications?: boolean;
  navItems?: NavItem[];
}

export const TopBar: React.FC<TopBarProps> = ({ 
  onMenuClick, 
  title, 
  className,
  hasNotifications = true,
  navItems = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setIsSearchOpen(val.length > 0);
  };

  const handleSelectResult = (route: string) => {
    window.location.hash = route;
    setSearchQuery('');
    setDebouncedQuery('');
    setIsSearchOpen(false);
  };

  // Flatten navItems to find matches
  const menuItems: { id: string, label: string, route: string, icon: React.ReactNode, type: string, parent?: string, subtitle?: string }[] = [];
  navItems.forEach(item => {
    if (item.id && !item.children) {
      menuItems.push({ id: `menu-${item.id}`, label: item.label, route: item.id, icon: item.icon || <FileText size={16} />, type: 'Menus & Pages' });
    }
    if (item.children) {
      item.children.forEach(child => {
        menuItems.push({ id: `menu-${child.id}`, label: child.label, route: child.id, icon: child.icon || <FileText size={16} />, parent: item.label, type: 'Menus & Pages' });
      });
    }
  });

  // Mock data records for Global Search matching the search scope
  const dataRecords = [
    // Travel Agencies
    { id: 'rec-1', label: 'Zamzam Travels', route: 'ta-details?id=TA-001', icon: <Building size={16} />, type: 'Travel Agencies', parent: 'Travel Agency', subtitle: 'License: UM-2026-04 • PIC: Ahmad Abdullah' },
    { id: 'rec-2', label: 'Hijrah Tours', route: 'ta-details?id=TA-002', icon: <Building size={16} />, type: 'Travel Agencies', parent: 'Travel Agency', subtitle: 'License: UM-2026-05 • PIC: Siti Aminah' },
    { id: 'rec-101', label: 'Global Travel', route: 'ta-details?id=TA-003', icon: <Building size={16} />, type: 'Travel Agencies', parent: 'Travel Agency', subtitle: 'License: TK-2026-01 • PIC: Mohammad Ali' },
    
    // Bookings
    { id: 'rec-3', label: 'BKG-2026-001', route: 'booking-details?id=bk_1', icon: <FileText size={16} />, type: 'Bookings', parent: 'Booking', subtitle: 'Ahmad Hassan • Premium Umrah Safar' },
    { id: 'rec-4', label: 'BKG-2026-002', route: 'booking-details?id=bk_2', icon: <FileText size={16} />, type: 'Bookings', parent: 'Booking', subtitle: 'Siti Aminah • Standard Umrah Ramadhan' },
    { id: 'rec-102', label: 'BKG-2026-003', route: 'booking-details?id=bk_3', icon: <FileText size={16} />, type: 'Bookings', parent: 'Booking', subtitle: 'Zahid Kamaruddin • Custom VIP Family' },
    
    // Jamaah
    { id: 'rec-9', label: 'Ahmad Fauzi', route: 'jamaah-details?id=jm_1', icon: <Users size={16} />, type: 'Jamaah', parent: 'Jamaah', subtitle: 'Passport: A12345678 • Zamzam Travels' },
    { id: 'rec-13', label: 'Siti Aminah', route: 'jamaah-details?id=jm_2', icon: <Users size={16} />, type: 'Jamaah', parent: 'Jamaah', subtitle: 'Passport: B98765432 • Zamzam Travels' },
    { id: 'rec-14', label: 'Budi Santoso', route: 'jamaah-details?id=jm_3', icon: <Users size={16} />, type: 'Jamaah', parent: 'Jamaah', subtitle: 'Passport: C45678901 • Nusantara Umrah' },
    
    // Payments
    { id: 'rec-15', label: 'PAY-2026-001', route: 'billing-invoice-details?id=pay_1', icon: <FileText size={16} />, type: 'Payments', parent: 'Payment', subtitle: 'RM 12,500 • Bank Transfer • Paid' },
    { id: 'rec-16', label: 'INV-2026-045', route: 'billing-invoice-details?id=pay_2', icon: <FileText size={16} />, type: 'Payments', parent: 'Payment', subtitle: 'RM 8,400 • Card Payment • Partially Paid' },
    
    // Articles
    { id: 'rec-25', label: 'Panduan Umrah Pertama Kali', route: 'article-details?id=art_1', icon: <FileText size={16} />, type: 'Articles', parent: 'Article', subtitle: 'Category: Guide • Author: Ustaz Ahmad' },
    
    // Users
    { id: 'rec-7', label: 'Superadmin User', route: 'um-details?id=u_1', icon: <UserCircle size={16} />, type: 'Users', parent: 'User', subtitle: 'Email: admin@umrahhaji.com • Role: Superadmin' },
    { id: 'rec-8', label: 'Zamzam Staff', route: 'um-details?id=u_2', icon: <UserCircle size={16} />, type: 'Users', parent: 'User', subtitle: 'Email: staff@zamzam.com • Role: Staff' },

    // Mutawwif
    { id: 'rec-17', label: 'Ustaz Ahmad Rizal', route: 'mutawwif-details?id=mut_1', icon: <UserCircle size={16} />, type: 'Mutawwif', parent: 'Mutawwif', subtitle: 'Email: rizal@mutawwif.com • Languages: Malay, Arabic' },
    { id: 'rec-18', label: 'Abdul Rahman', route: 'mutawwif-details?id=mut_2', icon: <UserCircle size={16} />, type: 'Mutawwif', parent: 'Mutawwif', subtitle: 'Email: rahman@mutawwif.com • Languages: English, Malay' },

    // Packages
    { id: 'rec-5', label: 'Premium Umrah Safar', route: 'package-details?id=pkg_1', icon: <Package size={16} />, type: 'Packages', parent: 'Package', subtitle: 'RM 12,000 • 12 Days • Makkah & Madinah' },
    { id: 'rec-6', label: 'Standard Umrah Ramadhan', route: 'package-details?id=pkg_2', icon: <Package size={16} />, type: 'Packages', parent: 'Package', subtitle: 'RM 7,500 • 10 Days • Makkah' },

    // Group Trips
    { id: 'rec-10', label: 'TRP-1001 (Premium Dec)', route: 'group-trip-details?id=grp_1', icon: <Users size={16} />, type: 'Group Trips', parent: 'Group Trip', subtitle: 'Departure: 15 Dec 2026 • Tour: Zamzam Travels' },

    // Flights
    { id: 'rec-11', label: 'SV 816 (Saudia Airlines)', route: 'flight-details?id=fl_1', icon: <Plane size={16} />, type: 'Flights', parent: 'Flight', subtitle: 'Flight: SV 816 • Route: KUL - JED • Scheduled' },

    // Hotels
    { id: 'rec-12', label: 'Swissotel Makkah', route: 'hotel-details?id=ht_1', icon: <Building size={16} />, type: 'Hotels', parent: 'Hotel', subtitle: 'Location: Makkah • Category: 5 Star' }
  ];

  const allSearchableItems = [...menuItems, ...dataRecords];

  // Grouped search results filtering logic
  const getGroupedResults = () => {
    if (debouncedQuery.length < 2) return { groups: {}, totalCount: 0 };

    const query = debouncedQuery.toLowerCase();
    const matches = allSearchableItems.filter(item => 
      item.label.toLowerCase().includes(query) || 
      (item.subtitle && item.subtitle.toLowerCase().includes(query)) ||
      (item.parent && item.parent.toLowerCase().includes(query))
    );

    const groups: Record<string, { items: typeof allSearchableItems, total: number, viewAllRoute: string }> = {};

    matches.forEach(item => {
      const type = item.type;
      if (!groups[type]) {
        let viewAllRoute = 'dashboard';
        if (type === 'Travel Agencies') viewAllRoute = 'ta-list';
        else if (type === 'Bookings') viewAllRoute = 'booking-list';
        else if (type === 'Jamaah') viewAllRoute = 'jamaah-list';
        else if (type === 'Payments') viewAllRoute = 'billing-list';
        else if (type === 'Articles') viewAllRoute = 'article-list';
        else if (type === 'Users') viewAllRoute = 'um-users';
        else if (type === 'Mutawwif') viewAllRoute = 'mutawwif-list';
        else if (type === 'Packages') viewAllRoute = 'package-list';
        else if (type === 'Group Trips') viewAllRoute = 'group-trip-list';
        else if (type === 'Flights') viewAllRoute = 'flight-list';
        else if (type === 'Hotels') viewAllRoute = 'hotel-list';

        groups[type] = {
          items: [],
          total: 0,
          viewAllRoute
        };
      }
      groups[type].total++;
      if (groups[type].items.length < 5) {
        groups[type].items.push(item);
      }
    });

    return { groups, totalCount: matches.length };
  };

  const { groups: searchResultsGroups, totalCount: totalSearchCount } = getGroupedResults();

  return (
    <header className={classNames('topbar', className)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flex: 1 }}>
        <IconButton onClick={onMenuClick} aria-label="Toggle menu" className="menu-toggle-btn" size="sm">
          <Menu size={20} color="var(--color-text-neutral)" />
        </IconButton>
        {title && <span className="text-section-title">{title}</span>}
        
        {/* Global Search Box */}
        <div ref={searchContainerRef} style={{ position: 'relative', width: '100%', maxWidth: '480px', marginLeft: title ? 'var(--space-4)' : '0' }}>
          <div style={{ position: 'relative' }}>
            <SearchInput 
              ref={inputRef}
              placeholder="Search booking ID, agency, jamaah..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => { if (searchQuery.length > 0) setIsSearchOpen(true); }}
              onClear={() => { setSearchQuery(''); setDebouncedQuery(''); setIsSearchOpen(false); }}
            />
            {!searchQuery && (
              <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '2px', pointerEvents: 'none' }}>
                <kbd style={{ fontSize: '11px', fontFamily: 'var(--font-family-base)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--gray-200)', backgroundColor: 'var(--gray-50)', color: 'var(--gray-400)', lineHeight: '16px' }}>⌘K</kbd>
              </div>
            )}
          </div>
          {isSearchOpen && (
            <div className="search-results" style={{ 
              position: 'absolute', 
              top: 'calc(100% + var(--space-2))', 
              left: 0, 
              width: '100%', 
              backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', 
              borderRadius: 'var(--radius-md)', 
              border: 'none', 
              boxShadow: 'var(--shadow-md)', 
              zIndex: 100,
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {searchQuery.length < 2 ? (
                <div style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>
                  <span className="text-caption text-muted">Type at least 2 characters to search...</span>
                </div>
              ) : Object.keys(searchResultsGroups).length > 0 ? (
                <div style={{ padding: 'var(--space-2) 0' }}>
                  {Object.entries(searchResultsGroups).map(([groupTitle, groupData]) => (
                    <div key={groupTitle} style={{ borderBottom: '1px solid var(--gray-100)', paddingBottom: 'var(--space-2)' }}>
                      <div style={{ padding: 'var(--space-2) var(--space-4)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-primary-dark)', letterSpacing: '0.5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{groupTitle}</span>
                        {groupData.total > 5 && (
                          <button 
                            onClick={() => handleSelectResult(groupData.viewAllRoute)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '10px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                          >
                            View all ({groupData.total})
                          </button>
                        )}
                      </div>
                      {groupData.items.map((res) => (
                        <button
                          key={res.id}
                          onClick={() => handleSelectResult(res.route)}
                          style={{ 
                            width: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 'var(--space-3)', 
                            padding: 'var(--space-2) var(--space-4)', 
                            border: 'none', 
                            backgroundColor: 'transparent', 
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <div style={{ width: '28px', height: '28px', borderRadius: '4px', backgroundColor: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                            {res.icon}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <span className="text-body-bold" style={{ fontSize: '13px' }}>{res.label}</span>
                            {res.subtitle && <span className="text-caption text-muted" style={{ fontSize: '11px' }}>{res.subtitle}</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: 'var(--space-4) var(--space-4)', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <span className="text-body-bold" style={{ color: 'var(--color-text-neutral)' }}>No results found</span>
                  <span className="text-caption text-muted">Try searching by ID, name, email, or phone number.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <DropdownMenu 
          variant="ghost"
          iconOnly={true}
          triggerLabel={
            <div style={{ position: 'relative', display: 'flex' }}>
              <Bell size={20} color="var(--color-text-neutral)" />
              {hasNotifications && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  minWidth: '16px',
                  height: '16px',
                  padding: '0 4px',
                  backgroundColor: 'var(--color-danger)',
                  borderRadius: '999px',
                  border: '2px solid var(--surface-base)',
                  fontSize: '9px',
                  fontWeight: 700,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1
                }}>3</span>
              )}
            </div>
          }
          items={[
            { id: 'n1', label: 'New Agency Application', icon: <Building size={16} />, onClick: () => window.location.hash = 'ta-applications' },
            { id: 'n2', label: 'Payment Received: INV-1002', icon: <FileText size={16} />, onClick: () => window.location.hash = 'fin-overview' },
            { id: 'n3', label: 'System Update: v2.1 Released', icon: <Bell size={16} />, onClick: () => window.location.hash = 'announcement-list' }
          ]}
        />
        
        <DropdownMenu 
          triggerLabel={
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-text-neutral)' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, letterSpacing: '0.02em' }}>AU</div>
              <span className="text-body-bold" style={{ fontSize: '14px' }}>Admin</span>
            </div>
          }
          variant="ghost"
          items={[
            { id: 'profile', label: 'My Profile', icon: <UserCircle size={16} />, onClick: () => {
              window.location.hash = window.location.pathname.startsWith('/ta') ? 'ta-profile' : 'my-profile';
            }},
            { id: 'settings', label: 'Preferences', icon: <Settings size={16} />, onClick: () => {
              window.location.hash = window.location.pathname.startsWith('/ta') ? 'ta-settings' : 'settings';
            }},
            { id: 'logout', label: 'Logout', icon: <LogOut size={16} />, danger: true, onClick: () => {
              if (window.location.pathname.startsWith('/ta')) {
                localStorage.removeItem('ta_auth');
              } else {
                localStorage.removeItem('erp_auth');
              }
              window.location.hash = '';
              window.location.reload();
            }}
          ]}
        />
      </div>
    </header>
  );
};

