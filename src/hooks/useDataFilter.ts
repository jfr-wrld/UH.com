import { useState, useEffect, useMemo, useRef } from 'react';

export interface UseDataFilterOptions {
  defaultSort?: { key: string; order: 'asc' | 'desc' };
  defaultPerPage?: number;
  syncToUrl?: boolean;
  searchKeys?: string[];
}

export function useDataFilter<T>(
  initialData: T[] = [],
  options: UseDataFilterOptions = {}
) {
  const { defaultSort, defaultPerPage = 10, syncToUrl = false, searchKeys } = options;

  // Helper to parse query parameters from current hash
  const parseQueryParams = () => {
    const hash = window.location.hash;
    const qIndex = hash.indexOf('?');
    if (qIndex === -1) return { params: {}, path: hash.replace('#', '') };
    const path = hash.substring(0, qIndex).replace('#', '');
    const search = hash.substring(qIndex + 1);
    const params: Record<string, string> = {};
    new URLSearchParams(search).forEach((value, key) => {
      params[key] = value;
    });
    return { params, path };
  };

  const getInitialParams = () => {
    if (syncToUrl) {
      const { params } = parseQueryParams();
      return {
        search: params.search || '',
        page: params.page ? parseInt(params.page, 10) : 1,
        per_page: params.per_page ? parseInt(params.per_page, 10) : defaultPerPage,
        sort: params.sort || defaultSort?.key || '',
        order: (params.order as 'asc' | 'desc') || defaultSort?.order || 'asc',
        filters: { ...params }
      };
    }
    return {
      search: '',
      page: 1,
      per_page: defaultPerPage,
      sort: defaultSort?.key || '',
      order: defaultSort?.order || 'asc',
      filters: {} as Record<string, string>
    };
  };

  const currentPathRef = useRef(parseQueryParams().path);

  // States
  const [initialParams] = useState(getInitialParams);
  const [searchInputValue, setSearchInputValue] = useState(initialParams.search);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialParams.search);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(() => {
    const f = { ...initialParams.filters };
    delete f.search;
    delete f.page;
    delete f.per_page;
    delete f.sort;
    delete f.order;
    return f;
  });
  
  const [currentPage, setCurrentPage] = useState(initialParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(initialParams.per_page);
  const [sortKey, setSortKey] = useState(initialParams.sort);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialParams.order);

  // Sync state with URL when hash changes (e.g. back/forward buttons)
  useEffect(() => {
    if (!syncToUrl) return;

    const handleHashChange = () => {
      const { params, path } = parseQueryParams();
      
      // If path changed, we don't sync from the new path's params (the hook is probably unmounting anyway)
      if (path !== currentPathRef.current) return;

      const search = params.search || '';
      const page = params.page ? parseInt(params.page, 10) : 1;
      const per_page = params.per_page ? parseInt(params.per_page, 10) : defaultPerPage;
      const sort = params.sort || defaultSort?.key || '';
      const order = (params.order as 'asc' | 'desc') || defaultSort?.order || 'asc';
      
      const filters = { ...params };
      delete filters.search;
      delete filters.page;
      delete filters.per_page;
      delete filters.sort;
      delete filters.order;

      setSearchInputValue(search);
      setDebouncedSearchQuery(search);
      setActiveFilters(filters);
      setCurrentPage(page);
      setRowsPerPage(per_page);
      setSortKey(sort);
      setSortOrder(order);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [defaultSort, defaultPerPage, syncToUrl]);

  // Debounce search query input (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedSearchQuery !== searchInputValue) {
        setDebouncedSearchQuery(searchInputValue);
        if (syncToUrl) {
          updateUrl({ search: searchInputValue || null, page: '1' });
        } else {
          setCurrentPage(1);
        }
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInputValue, debouncedSearchQuery, syncToUrl]);

  // Helper to update URL params
  const updateUrl = (newParams: Record<string, string | null>) => {
    if (!syncToUrl) return;

    const hash = window.location.hash;
    const qIndex = hash.indexOf('?');
    const path = qIndex === -1 ? hash : hash.substring(0, qIndex);
    
    // Get current query params
    const { params } = parseQueryParams();
    const mergedParams = { ...params };
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        delete mergedParams[key];
      } else {
        mergedParams[key] = value;
      }
    });
    
    const searchString = new URLSearchParams(mergedParams).toString();
    window.location.hash = searchString ? `${path}?${searchString}` : path;
  };

  // Handlers called by UI
  const handleSearch = (query: string) => {
    setSearchInputValue(query);
  };

  const handleFilterChange = (groupId: string, value: string) => {
    const newFilters = { ...activeFilters, [groupId]: value };
    if (!value || value === 'all') {
      delete newFilters[groupId];
    }
    setActiveFilters(newFilters);
    if (syncToUrl) {
      updateUrl({ [groupId]: value && value !== 'all' ? value : null, page: '1' });
    } else {
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (syncToUrl) {
      updateUrl({ page: String(page) });
    }
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    if (syncToUrl) {
      updateUrl({ per_page: String(rows), page: '1' });
    } else {
      setCurrentPage(1);
    }
  };

  const handleSort = (key: string) => {
    let nextOrder: 'asc' | 'desc' = 'asc';
    let nextKey = key;
    
    if (sortKey === key) {
      if (sortOrder === 'asc') {
        nextOrder = 'desc';
      } else {
        nextKey = defaultSort?.key || '';
        nextOrder = defaultSort?.order || 'asc';
      }
    }
    
    setSortKey(nextKey);
    setSortOrder(nextOrder);
    if (syncToUrl) {
      updateUrl({ sort: nextKey || null, order: nextKey ? nextOrder : null });
    }
  };

  const clearFilters = () => {
    setSearchInputValue('');
    setDebouncedSearchQuery('');
    setActiveFilters({});
    setCurrentPage(1);
    
    if (syncToUrl) {
      const clearObj: Record<string, null> = {
        search: null,
        page: null,
        sort: null,
        order: null
      };
      Object.keys(activeFilters).forEach(key => {
        clearObj[key] = null;
      });
      updateUrl(clearObj);
    }
  };

  const hasActiveFilters = searchInputValue !== '' || Object.values(activeFilters).some(v => v !== '' && v !== 'all');

  // Perform Filtering and Sorting on initialData
  const filteredAndSortedData = useMemo(() => {
    let result = [...initialData];

    // 1. Search Query (Min 2 characters)
    if (debouncedSearchQuery && debouncedSearchQuery.length >= 2) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(row => {
        if (searchKeys && searchKeys.length > 0) {
          const rowString = searchKeys.map(key => String((row as any)[key] || '')).join(' ').toLowerCase();
          return rowString.includes(query);
        } else {
          const rowString = Object.values(row as any)
            .map(val => String(val).toLowerCase())
            .join(' ');
          return rowString.includes(query);
        }
      });
    }

    // 2. Active Filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (!value || value === 'all' || value === '') return;
      
      result = result.filter(row => {
        const rowValue = (row as any)[key];
        
        if (rowValue !== undefined && rowValue !== null) {
          return String(rowValue).toLowerCase().includes(value.toLowerCase());
        }

        return Object.values(row as any).some(
          val => val !== null && val !== undefined && String(val).toLowerCase().includes(value.toLowerCase())
        );
      });
    });

    // 3. Sorting
    if (sortKey) {
      result.sort((a: any, b: any) => {
        let valA = a[sortKey];
        let valB = b[sortKey];

        // Format dates if possible
        if (typeof valA === 'string' && !isNaN(Date.parse(valA)) && valA.includes(' ')) {
          const timeA = new Date(valA).getTime();
          const timeB = new Date(valB).getTime();
          if (!isNaN(timeA) && !isNaN(timeB)) {
            valA = timeA;
            valB = timeB;
          }
        }

        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }

        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();

        if (strA < strB) return sortOrder === 'asc' ? -1 : 1;
        if (strA > strB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [initialData, debouncedSearchQuery, activeFilters, sortKey, sortOrder]);

  // Paginated Data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage) || 1;

  return {
    searchQuery: searchInputValue,
    setSearchQuery: handleSearch,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData: paginatedData,
    totalItems: filteredAndSortedData.length,
    currentPage,
    totalPages,
    rowsPerPage,
    onPageChange: handlePageChange,
    onRowsPerPageChange: handleRowsPerPageChange,
    sortKey,
    sortOrder,
    onSort: handleSort
  };
}
