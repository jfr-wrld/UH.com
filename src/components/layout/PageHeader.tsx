import React from 'react';
import { classNames } from '../../lib/utils';
import { ChevronRight } from 'lucide-react';

export interface Breadcrumb {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className
}) => {
  return (
    <div className={classNames('page-header', className)}>
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="text-caption" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-2)', color: 'var(--color-text-muted)' }}>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {crumb.href ? (
                  <a href={crumb.href} style={{ color: 'inherit' }} className="hover-link">{crumb.label}</a>
                ) : (
                  <span>{crumb.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && <ChevronRight size={14} />}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-page-title" style={{ margin: 0 }}>{title}</h1>
        {subtitle && <p className="text-body" style={{ margin: '4px 0 0 0', color: 'var(--gray-500)' }}>{subtitle}</p>}
      </div>
      {actions && (
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          {actions}
        </div>
      )}
    </div>
  );
};
