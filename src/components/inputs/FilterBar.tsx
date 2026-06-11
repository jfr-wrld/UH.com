import React, { useState, ChangeEvent, useEffect } from 'react';
import { classNames } from '../../lib/utils';
import { Button } from '../actions/Button';
import { SearchInput } from './SearchInput';
import { Select } from './Select';
import { ChevronUp, SlidersHorizontal } from 'lucide-react';

export interface FilterGroup {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

export interface FilterBarProps {
  groups?: FilterGroup[];
  filters?: FilterGroup[];
  activeFilters?: Record<string, string>;
  searchValue?: string;
  onFilterChange?: (groupId: string, value: string) => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
  className?: string;
  primaryCount?: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  groups,
  filters,
  activeFilters = {},
  searchValue,
  onFilterChange,
  onSearch,
  searchPlaceholder = 'Search...',
  children,
  onClearFilters = () => {},
  hasActiveFilters = true,
  className,
  primaryCount = 2
}) => {
  const [internalSearch, setInternalSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const currentSearch = searchValue !== undefined ? searchValue : internalSearch;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchValue === undefined) {
      setInternalSearch(e.target.value);
    }
    if (onSearch) onSearch(e.target.value);
  };

  const handleClearSearch = () => {
    if (searchValue === undefined) {
      setInternalSearch('');
    }
    if (onSearch) onSearch('');
  };

  const activeGroups = groups || filters || [];
  const primaryGroups = activeGroups.slice(0, primaryCount);
  const secondaryGroups = activeGroups.slice(primaryCount);
  
  const showToggle = secondaryGroups.length > 0;
  
  // Count active filters in secondaryGroups
  const secondaryActiveCount = secondaryGroups.filter(
    group => !!activeFilters[group.id] && activeFilters[group.id] !== 'all' && activeFilters[group.id] !== ''
  ).length;

  // Auto-expand if there are active secondary filters
  useEffect(() => {
    if (secondaryActiveCount > 0) {
      setIsExpanded(true);
    }
  }, [secondaryActiveCount]);

  return (
    <div className={classNames('filter-bar', className)} style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: 'var(--space-3)', 
      padding: 'var(--space-4)', 
      backgroundColor: 'var(--surface-base)', 
      borderRadius: 'var(--radius-lg)', 
      border: '1px solid var(--color-border)', 
      boxShadow: 'var(--shadow-sm)', 
    }}>
      {/* Top Row */}
      <div style={{ 
        display: 'flex', 
        gap: 'var(--space-4)', 
        flexWrap: 'wrap', 
        alignItems: 'center',
        width: '100%'
      }}>
        {onSearch && (
          <div style={{ flex: '1 1 280px', minWidth: '200px' }}>
            <SearchInput 
              placeholder={searchPlaceholder}
              value={currentSearch}
              onChange={handleSearchChange}
              onClear={handleClearSearch}
            />
          </div>
        )}
        
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
          {primaryGroups.map(group => (
            <div key={group.id} className="filter-select-wrapper" style={{ width: '160px' }}>
              <Select 
                placeholder={group.label}
                options={group.options}
                value={activeFilters[group.id] || ''}
                onChange={(e) => onFilterChange && onFilterChange(group.id, e.target.value)}
              />
            </div>
          ))}

          {showToggle && (
            <div style={{ width: '160px', flexShrink: 0 }}>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="input-base"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  width: '100%',
                  cursor: 'pointer',
                  padding: '10px 14px'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minWidth: 0, overflow: 'hidden' }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {isExpanded ? 'Hide Filters' : 'More Filters'}
                  </span>
                  {secondaryActiveCount > 0 && (
                    <span 
                      style={{ 
                        backgroundColor: 'var(--color-primary-light)', 
                        color: 'var(--color-primary-dark)', 
                        borderRadius: 'var(--radius-pill)', 
                        padding: '2px 6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        border: '1px solid var(--color-primary)',
                        flexShrink: 0
                      }}
                    >
                      {secondaryActiveCount}
                    </span>
                  )}
                </span>
                {isExpanded ? <ChevronUp size={16} style={{ flexShrink: 0, color: 'var(--gray-500)' }} /> : <SlidersHorizontal size={16} style={{ flexShrink: 0, color: 'var(--gray-500)' }} />}
              </button>
            </div>
          )}

          {children}

          {hasActiveFilters && (
            <Button variant="ghost" onClick={onClearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters Panel (Collapsible) */}
      {showToggle && isExpanded && (
        <div 
          className="advanced-filters-panel"
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 'var(--space-4)', 
            padding: 'var(--space-4)',
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--gray-200)',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <SlidersHorizontal size={16} className="text-muted" />
            <span className="text-body-bold text-muted">Advanced Filters</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            {secondaryGroups.map(group => (
              <div key={group.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', width: '240px' }}>
                <label className="text-caption text-muted">{group.label}</label>
                <Select 
                  placeholder={`Select ${group.label}`}
                  options={group.options}
                  value={activeFilters[group.id] || ''}
                  onChange={(e) => onFilterChange && onFilterChange(group.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Dummy export to satisfy runtime ES module value imports
export const FilterGroup = {};
