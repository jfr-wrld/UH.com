import React from 'react';
import { classNames } from '../../lib/utils';
import { EmptyState } from './EmptyState';
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortKey?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor?: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  className?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  isLoading?: boolean;
  selectedKeys?: Set<string | number> | Array<string | number>;
  onSelectionChange?: (keys: any) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    totalItems: number;
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (rows: number) => void;
  };
  sort?: {
    key: string;
    order: 'asc' | 'desc';
    onSort?: (key: string) => void;
  };
}

const getAutoSortKey = (header: string, sampleRow: any): string => {
  if (!sampleRow) return '';
  const cleanHeader = header.toLowerCase().replace(/[^a-z0-9]/g, '');
  const keys = Object.keys(sampleRow);
  
  // 1. Direct match
  const directMatch = keys.find(k => k.toLowerCase() === cleanHeader);
  if (directMatch) return directMatch;
  
  // 2. Common mappings
  if (cleanHeader.includes('datecreated') || cleanHeader.includes('createdat') || cleanHeader.includes('createddate') || cleanHeader.includes('date')) {
    const found = keys.find(k => k.toLowerCase().includes('created') || k.toLowerCase().includes('date') || k.toLowerCase() === 'submitted');
    if (found) return found;
  }
  if (cleanHeader.includes('lastupdated') || cleanHeader.includes('updatedat') || cleanHeader.includes('updated') || cleanHeader.includes('update')) {
    const found = keys.find(k => k.toLowerCase().includes('update') || k.toLowerCase().includes('updated'));
    if (found) return found;
  }
  if (cleanHeader.includes('submitted') || cleanHeader.includes('submitteddate')) {
    const found = keys.find(k => k.toLowerCase().includes('submit'));
    if (found) return found;
  }
  if (cleanHeader.includes('departure') || cleanHeader.includes('departuredate')) {
    const found = keys.find(k => k.toLowerCase().includes('departure') || k.toLowerCase() === 'date');
    if (found) return found;
  }
  if (cleanHeader.includes('bookingid') || cleanHeader.includes('booking')) {
    const found = keys.find(k => k.toLowerCase() === 'bookingid' || k.toLowerCase().includes('booking'));
    if (found) return found;
  }
  if (cleanHeader.includes('amount') || cleanHeader.includes('totalamount') || cleanHeader.includes('price')) {
    const found = keys.find(k => k.toLowerCase().includes('amount') || k.toLowerCase().includes('price'));
    if (found) return found;
  }
  if (cleanHeader.includes('status')) {
    const found = keys.find(k => k.toLowerCase().includes('status'));
    if (found) return found;
  }
  if (cleanHeader.includes('agency')) {
    const found = keys.find(k => k.toLowerCase().includes('agency'));
    if (found) return found;
  }
  if (cleanHeader.includes('package')) {
    const found = keys.find(k => k.toLowerCase().includes('package'));
    if (found) return found;
  }
  if (cleanHeader.includes('name')) {
    const found = keys.find(k => k.toLowerCase().includes('name'));
    if (found) return found;
  }

  return '';
};

const SortIcon = ({ sorted, order }: { sorted: boolean; order?: 'asc' | 'desc' }) => {
  if (!sorted) {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35, marginLeft: '6px', flexShrink: 0 }}>
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
      </svg>
    );
  }
  if (order === 'asc') {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px', flexShrink: 0 }}>
        <path d="m18 15-6-6-6 6" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px', flexShrink: 0 }}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

export function DataTable<T>({
  data,
  columns,
  keyExtractor = (row: any) => row.id || JSON.stringify(row),
  onRowClick,
  className,
  emptyStateTitle = 'No data available',
  emptyStateDescription = 'There are no records to display at this time.',
  isLoading,
  selectedKeys,
  onSelectionChange,
  pagination,
  sort
}: DataTableProps<T>) {
  
  if (isLoading) {
    return (
      <div className={classNames('data-table-container', className)} style={{ padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '40px', width: '100%' }} />
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState title={emptyStateTitle} description={emptyStateDescription} />;
  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSelectionChange) return;
    if (e.target.checked) {
      const allKeys = data.map(keyExtractor);
      onSelectionChange(Array.isArray(selectedKeys) ? allKeys : new Set(allKeys));
    } else {
      onSelectionChange(Array.isArray(selectedKeys) ? [] : new Set());
    }
  };

  const handleSelectRow = (key: string | number, checked: boolean) => {
    if (!onSelectionChange || !selectedKeys) return;
    
    if (Array.isArray(selectedKeys)) {
      if (checked) {
        onSelectionChange([...selectedKeys, key]);
      } else {
        onSelectionChange(selectedKeys.filter(k => k !== key));
      }
    } else {
      const newKeys = new Set(selectedKeys);
      if (checked) {
        newKeys.add(key);
      } else {
        newKeys.delete(key);
      }
      onSelectionChange(newKeys);
    }
  };

  const hasSelection = !!onSelectionChange && !!selectedKeys;
  const selectedCount = selectedKeys ? (selectedKeys instanceof Set ? selectedKeys.size : selectedKeys.length) : 0;
  const allSelected = hasSelection && data.length > 0 && selectedCount === data.length;

  const isSelected = (key: string | number) => {
    if (!selectedKeys) return false;
    if (selectedKeys instanceof Set) return selectedKeys.has(key);
    if (Array.isArray(selectedKeys)) return selectedKeys.includes(key);
    return false;
  };

  const sampleRow = data && data[0];

  return (
    <div className={classNames('data-table-container', className)}>
      <table className="data-table text-body">
        <thead>
          <tr>
            {hasSelection && (
              <th style={{ width: '40px', textAlign: 'center' }}>
                <input 
                  type="checkbox" 
                  checked={allSelected} 
                  onChange={handleSelectAll} 
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((col, index) => {
              const autoKey = getAutoSortKey(col.header, sampleRow);
              const isSortable = !!sort && (!!col.sortKey || typeof col.accessor === 'string' || !!autoKey);
              const sortField = col.sortKey || (typeof col.accessor === 'string' ? col.accessor : autoKey);
              const isSorted = !!sort && sort.key === sortField && !!sortField;
              const currentOrder = isSorted ? sort.order : undefined;

              return (
                <th 
                  key={index} 
                  style={{ 
                    width: col.width,
                    textAlign: col.align || 'left',
                    cursor: isSortable ? 'pointer' : 'default',
                    userSelect: isSortable ? 'none' : 'auto'
                  }}
                  className={classNames('text-label', isSortable && 'sortable-header')}
                  onClick={() => {
                    if (isSortable && sort?.onSort && sortField) {
                      sort.onSort(String(sortField));
                    }
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'center' : 'flex-start' 
                  }}>
                    <span>{col.header}</span>
                    {isSortable && <SortIcon sorted={isSorted} order={currentOrder} />}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const rowKey = keyExtractor(row);
            const rowIsSelected = hasSelection && isSelected(rowKey);

            return (
              <tr 
                key={rowKey}
                onClick={() => onRowClick && onRowClick(row)}
                style={{ 
                  cursor: onRowClick ? 'pointer' : 'default',
                  backgroundColor: rowIsSelected ? 'var(--surface-selected)' : undefined
                }}
              >
                {hasSelection && (
                  <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={rowIsSelected}
                      onChange={(e) => handleSelectRow(rowKey, e.target.checked)}
                      aria-label="Select row"
                    />
                  </td>
                )}
                {columns.map((col, index) => (
                  <td 
                    key={index}
                    style={{ textAlign: col.align || 'left' }}
                  >
                    {typeof col.accessor === 'function' 
                      ? col.accessor(row) 
                      : String(row[col.accessor])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {pagination && (
        <div className="pagination-container" style={{
          padding: 'var(--space-3) var(--space-4)',
          borderTop: '1px solid var(--gray-200)',
          color: 'var(--gray-500)',
          fontSize: 'var(--text-caption-size)'
        }}>
          <div>
            Showing {(pagination.currentPage - 1) * pagination.rowsPerPage + 1}–{Math.min(pagination.currentPage * pagination.rowsPerPage, pagination.totalItems)} of {pagination.totalItems}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span className="text-body text-muted">Rows per page:</span>
              <select 
                value={pagination.rowsPerPage}
                onChange={e => pagination.onRowsPerPageChange?.(Number(e.target.value))}
                style={{
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 24px 4px 8px',
                  backgroundColor: 'var(--surface-base)',
                  color: 'var(--color-text-neutral)',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 4px center',
                  backgroundSize: '16px'
                }}
              >
                {[10, 25, 50, 100].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            
            <div className="pagination-controls">
              <button 
                className="pagination-btn"
                onClick={() => pagination.onPageChange?.(Math.max(1, pagination.currentPage - 1))}
                disabled={pagination.currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => {
                  if (page > 3 && page < pagination.totalPages && page !== pagination.currentPage) {
                    if (page === 4) return <span key={page} style={{ padding: '0 var(--space-1)', color: 'var(--gray-500)' }}>...</span>;
                    return null;
                  }
                  
                  return (
                    <button
                      key={page}
                      className={classNames('pagination-btn', pagination.currentPage === page && 'active')}
                      onClick={() => pagination.onPageChange?.(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button 
                className="pagination-btn"
                onClick={() => pagination.onPageChange?.(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                disabled={pagination.currentPage === pagination.totalPages}
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
