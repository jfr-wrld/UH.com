import React, { useState, useEffect } from 'react';
import { classNames } from '../../lib/utils';
import { Sidebar } from './Sidebar';
import type { NavItem } from './Sidebar';
import { TopBar } from './TopBar';

export interface AppShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
  agencyName?: string;
  agencyLogo?: string;
}

export const AppShell: React.FC<AppShellProps> = ({ children, navItems, agencyName, agencyLogo }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true';
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsDesktopCollapsed(prev => {
        const next = !prev;
        localStorage.setItem('sidebar_collapsed', String(next));
        return next;
      });
    }
  };

  return (
    <div className="app-shell">
      <Sidebar 
        items={navItems}
        isCollapsed={!isMobile && isDesktopCollapsed}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        agencyName={agencyName}
        agencyLogo={agencyLogo}
      />
      
      <div className="main-content-wrapper">
        <TopBar onMenuClick={handleMenuClick} navItems={navItems} />
        <main className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="page-container" style={{ flex: 1, paddingBottom: 'var(--space-8)' }}>
            {children}
          </div>
          
          <footer style={{ 
            marginTop: 'auto', 
            paddingTop: 'var(--space-6)', 
            borderTop: '1px solid var(--gray-200)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            color: 'var(--gray-500)', 
            fontSize: 'var(--text-caption-size)' 
          }}>
            <div>© 2026 UmrahHaji.com ERP. All rights reserved.</div>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <a href="#" style={{ color: 'var(--gray-500)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'var(--gray-500)', textDecoration: 'none' }}>Terms of Service</a>
              <a href="#" style={{ color: 'var(--gray-500)', textDecoration: 'none' }}>Help Center</a>
            </div>
          </footer>
        </main>
      </div>

    </div>
  );
};
