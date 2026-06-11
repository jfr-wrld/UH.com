import React, { useState } from 'react';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { useDataFilter } from '../../hooks/useDataFilter';

export const SeasonPeriodModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const calculateDuration = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      if (diffTime < 0) return 0;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays + 1;
    }
    return 0;
  };

  const existingPeriods = [
    { start: new Date('2026-11-01'), end: new Date('2026-11-30') },
    { start: new Date('2026-05-01'), end: new Date('2026-06-30') }
  ];

  const handleSave = () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }

    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);

    if (newStart > newEnd) {
      setError('Start date cannot be after end date.');
      return;
    }

    // Actual overlap validation logic
    const hasOverlap = existingPeriods.some(period => {
      // An overlap occurs if the new period starts before an existing period ends
      // AND the new period ends after an existing period starts.
      return newStart <= period.end && newEnd >= period.start;
    });
    
    if (hasOverlap) {
      setError('Date overlap detected! This period conflicts with an existing active period in this season type.');
    } else {
      setError(null);
      onClose();
    }
  };
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(existingPeriods);


  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '550px', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)' }}>
          <h2 className="text-section-title">Add Season Period</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-muted)' }}>&times;</button>
        </div>

        {error && (
          <div style={{ padding: 'var(--space-3)', backgroundColor: 'rgba(255, 59, 48, 0.1)', borderLeft: '4px solid var(--color-danger)', borderRadius: 'var(--radius-sm)' }}>
            <span className="text-body-bold" style={{ color: 'var(--color-danger)' }}>{error}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
          <FormField label="Parent Season Type" required>
            <Select 
              options={[{ value: 'st_1', label: 'Low Season' }, { value: 'st_2', label: 'Peak Season' }]} 
              value="st_1" 
              onChange={() => {}} 
              disabled
            />
          </FormField>

          <FormField label="Period Name" required>
            <Input placeholder="e.g. Winter 2026" />
          </FormField>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Start Date" required>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </FormField>
            <FormField label="End Date" required>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </FormField>
            <FormField label="Duration">
              <Input value={`${calculateDuration()} Days`} disabled />
            </FormField>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Package Scope">
              <Select options={[{ value: 'all', label: 'All Categories' }, { value: 'umrah', label: 'Umrah Only' }]} value="all" onChange={() => {}} />
            </FormField>
            <FormField label="Market Scope">
              <Select options={[{ value: 'global', label: 'Global' }, { value: 'my', label: 'Malaysia' }]} value="global" onChange={() => {}} />
            </FormField>
            <FormField label="Status" required>
              <Select options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} value="active" onChange={() => {}} />
            </FormField>
          </div>

          <FormField label="Notes">
            <textarea 
              className="input-field" 
              rows={2} 
              placeholder="Internal notes..."
              style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-input)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}
            />
          </FormField>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Period</Button>
        </div>
        
      </div>
    </div>
  );
};
