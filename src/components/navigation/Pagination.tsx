import React from 'react';
import { classNames } from '../../lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  // Simple logic for MVP: Show 1, 2, 3... if few pages, else naive rendering
  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className={classNames('pagination-container', className)}>
      <span className="text-body text-muted" style={{ color: 'var(--color-text-muted)' }}>
        Showing page {currentPage} of {totalPages}
      </span>
      <div className="pagination-controls">
        <button 
          className="pagination-btn" 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        
        {getPages().map((page, idx) => (
          typeof page === 'number' ? (
            <button
              key={idx}
              className={classNames('pagination-btn', currentPage === page && 'active')}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span key={idx} style={{ padding: '0 var(--space-1)', color: 'var(--color-text-muted)' }}>
              <MoreHorizontal size={16} />
            </span>
          )
        ))}

        <button 
          className="pagination-btn" 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
