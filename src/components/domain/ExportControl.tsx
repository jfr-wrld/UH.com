import React from 'react';
import { DropdownMenu } from '../actions/DropdownMenu';
import { Download } from 'lucide-react';
import { exportData } from '../../lib/exportUtils';
import type { ExportFormat } from '../../lib/exportUtils';

export interface ExportControlProps {
  data: any[];
  filename?: string;
  disabled?: boolean;
}

export const ExportControl: React.FC<ExportControlProps> = ({
  data,
  filename = 'export',
  disabled = false
}) => {
  const handleExport = (format: ExportFormat) => {
    exportData(data, format, filename);
  };

  return (
    <DropdownMenu 
      triggerLabel="Export"
      leftIcon={<Download size={16} />}
      disabled={disabled || !data || data.length === 0}
      items={[
        { id: 'pdf', label: 'Export as PDF', icon: <Download size={16} />, onClick: () => handleExport('pdf') },
        { id: 'csv', label: 'Export as CSV', icon: <Download size={16} />, onClick: () => handleExport('csv') },
        { id: 'xlsx', label: 'Export as Excel', icon: <Download size={16} />, onClick: () => handleExport('xlsx') }
      ]}
    />
  );
};
