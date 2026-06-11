import React, { useState } from 'react';
import { Timeline } from '../data-display/Timeline';
import type { TimelineItem } from '../data-display/Timeline';
import { FilterBar } from '../inputs/FilterBar';
import { ChevronRight } from 'lucide-react';

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  module: string;
  details: string;
}

export interface AuditLogPanelProps {
  logs: AuditLog[];
}

export const AuditLogPanel: React.FC<AuditLogPanelProps> = ({ logs }) => {
  const [filterModule, setFilterModule] = useState<string>('');

  const filteredLogs = logs.filter(log => {
    if (filterModule && filterModule !== 'all' && log.module !== filterModule) return false;
    return true;
  });

  const timelineItems: TimelineItemProps[] = filteredLogs.map(log => ({
    id: log.id,
    title: `${log.action} by ${log.actor}`,
    description: `[${log.module}] ${log.details}`,
    timestamp: log.timestamp,
    status: 'default'
  }));

  const moduleOptions = Array.from(new Set(logs.map(l => l.module))).map(m => ({ value: m, label: m }));
  moduleOptions.unshift({ value: 'all', label: 'All Modules' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="text-section-title">Audit Logs</h3>
        <FilterBar 
          filters={[
            { id: 'module', label: 'Module', options: moduleOptions }
          ]}
          onFilterChange={(id, values) => {
            if (id === 'module' && values.length > 0) {
              setFilterModule(values[0]);
            } else {
              setFilterModule('');
            }
          }}
        />
      </div>

      <div style={{ 
        backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', 
        padding: 'var(--space-6)', 
        borderRadius: 'var(--radius-card)',
        border: 'none'
      }}>
        {timelineItems.length > 0 ? (
          <Timeline items={timelineItems} />
        ) : (
          <p className="text-body text-muted">No audit logs found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};
