import React from 'react';
import { Button } from '../actions/Button';
import { DropdownMenu } from '../actions/DropdownMenu';
import { Download } from 'lucide-react';

export type ExportFormat = 'pdf' | 'csv' | 'xlsx';

export interface ExportControlProps {
  onExport: (format: ExportFormat) => void;
  disabled?: boolean;
}

export const ExportControl: React.FC<ExportControlProps> = ({
  onExport,
  disabled = false
}) => {
  return (
    <DropdownMenu 
      triggerLabel="Export"
      leftIcon={<Download size={16} />}
      disabled={disabled}
      items={[
        { id: 'pdf', label: 'Export as PDF', icon: <Download size={16} />, onClick: () => onExport('pdf') },
        { id: 'csv', label: 'Export as CSV', icon: <Download size={16} />, onClick: () => onExport('csv') },
        { id: 'xlsx', label: 'Export as Excel', icon: <Download size={16} />, onClick: () => onExport('xlsx') }
      ]}
    />
  );
};
