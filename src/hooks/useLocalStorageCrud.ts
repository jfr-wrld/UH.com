import { useState, useEffect } from 'react';

export function useLocalStorageCrud<T extends { id: string }>(key: string, initialData: T[] = []) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from local storage on mount
    const stored = localStorage.getItem(key);
    if (stored) {
      setData(JSON.parse(stored));
    } else if (initialData.length > 0) {
      // Pre-populate if empty
      localStorage.setItem(key, JSON.stringify(initialData));
      setData(initialData);
    }
    
    // Simulate network delay for realism
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [key]); // We only want this to run when key changes

  const saveToStorage = (newData: T[]) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  const create = (item: Omit<T, 'id'> & { id?: string }) => {
    const newId = item.id || `${key}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;
    const newItem = { ...item, id: newId } as T;
    saveToStorage([newItem, ...data]);
    return newItem;
  };

  const update = (id: string, updates: Partial<T>) => {
    const newData = data.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    saveToStorage(newData);
    return newData.find(item => item.id === id);
  };

  const remove = (id: string) => {
    const newData = data.filter(item => item.id !== id);
    saveToStorage(newData);
  };
  
  const removeMany = (ids: string[]) => {
    const newData = data.filter(item => !ids.includes(item.id));
    saveToStorage(newData);
  };

  const getById = (id: string) => {
    return data.find(item => item.id === id);
  };

  return {
    data,
    isLoading,
    create,
    update,
    remove,
    removeMany,
    getById
  };
}
