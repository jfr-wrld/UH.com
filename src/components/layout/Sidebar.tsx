import React from 'react';
import { classNames } from '../../lib/utils';
import { ChevronRight } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  category?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  children?: Omit<NavItem, 'icon' | 'children' | 'category'>[];
}

export interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  items: NavItem[];
  onCloseMobile?: () => void;
  className?: string;
  agencyName?: string;
  agencyLogo?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  isMobileOpen,
  items,
  onCloseMobile,
  className,
  agencyName,
  agencyLogo
}) => {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  // Automatically expand parent menus when a child is active
  React.useEffect(() => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      items.forEach(item => {
        const hasActiveChild = item.children && item.children.some(c => c.isActive);
        if (hasActiveChild) {
          next.add(item.id);
        }
      });
      return next;
    });
  }, [items]);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="overlay-backdrop" 
          onClick={onCloseMobile} 
          style={{ zIndex: 'calc(var(--z-sidebar) - 1)' }}
        />
      )}
      
      <aside 
        className={classNames(
          'sidebar',
          isCollapsed && !isMobileOpen && 'sidebar-collapsed',
          isMobileOpen && 'sidebar-mobile-open',
          className
        )}
      >
        <div className="sidebar-header" style={{ justifyContent: isCollapsed ? 'center' : 'flex-start', padding: isCollapsed ? '0 var(--space-2)' : '0 var(--space-4)', height: 'var(--topbar-height)', minHeight: 'var(--topbar-height)', display: 'flex', alignItems: 'center' }}>
          {agencyName ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {agencyLogo ? (
                <img src={agencyLogo} alt={agencyName} style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)' }} />
              ) : (
                <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                  {agencyName.charAt(0)}
                </div>
              )}
              {!isCollapsed && (
                <span style={{ fontWeight: 700, fontSize: '16px', color: 'var(--color-text-neutral)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
                  {agencyName}
                </span>
              )}
            </div>
          ) : (
            isCollapsed ? (
              <img src="/brand/logo-mark.svg" alt="UmrahHaji" style={{ width: 32, height: 32 }} />
            ) : (
              <img src="/brand/logo-full.svg" alt="UmrahHaji" style={{ height: 32, maxWidth: '100%' }} />
            )
          )}
        </div>
        
        <nav className="sidebar-content">
          {items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.has(item.id);
            const hasActiveChild = hasChildren && item.children!.some(c => c.isActive);
            const prevCategory = index > 0 ? items[index - 1].category : null;
            const showCategory = item.category && item.category !== prevCategory && !isCollapsed;
            
            return (
              <React.Fragment key={item.id}>
                {showCategory && (
                  <div style={{ 
                    padding: 'var(--space-3) var(--space-4) var(--space-2)', 
                    fontSize: '10px', 
                    fontWeight: 600, 
                    color: 'var(--gray-400)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    {item.category}
                  </div>
                )}
                <div className="sidebar-group">
                <a 
                  href={`#${item.id}`}
                  className={classNames(
                    'sidebar-item',
                    (item.isActive && (!hasChildren || isCollapsed)) && 'sidebar-item-active',
                    hasActiveChild && !isCollapsed && 'sidebar-item-parent-active'
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasChildren) {
                      if (!isCollapsed) {
                        toggleExpand(item.id);
                      } else {
                        // When collapsed, clicking parent navigates to first child
                        if (item.children && item.children.length > 0) {
                          item.children[0].onClick?.();
                        }
                      }
                    } else {
                      item.onClick?.();
                    }
                  }}
                  title={isCollapsed ? item.label : undefined}
                >
                  {item.icon && <span className="sidebar-item-icon" style={{ width: 24, display: 'flex', justifyContent: 'center' }}>{item.icon}</span>}
                  {!isCollapsed && (
                    <span className="text-body-medium" style={{ flex: 1 }}>{item.label}</span>
                  )}
                  {!isCollapsed && hasChildren && (
                    <ChevronRight 
                      size={16} 
                      color="var(--color-text-muted)" 
                      style={{ 
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform var(--motion-fast) var(--ease-standard)'
                      }} 
                    />
                  )}
                </a>
                
                {(isExpanded || isCollapsed) && hasChildren && (
                  <div className={classNames('sidebar-submenu', isCollapsed && 'sidebar-submenu-floating')}>
                    {item.children!.map((child) => (
                      <a
                        key={child.id}
                        href={`#${child.id}`}
                        className={classNames(
                          'sidebar-subitem',
                          child.isActive && 'sidebar-subitem-active'
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          child.onClick?.();
                        }}
                      >
                        <span className="text-label">{child.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              </React.Fragment>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
