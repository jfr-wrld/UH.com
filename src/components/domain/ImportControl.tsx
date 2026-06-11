import React from 'react';
import { FileUploader } from '../inputs/FileUploader';
import { UploadCloud } from 'lucide-react';
import { Button } from '../actions/Button';

export interface ImportControlProps {
  onImport: (files: File[]) => Promise<void>;
  acceptedFormats?: string;
  maxSizeMB?: number;
}

export const ImportControl: React.FC<ImportControlProps> = ({
  onImport,
  acceptedFormats = '.csv,.xlsx',
  maxSizeMB = 10
}) => {
  // A wrapper around FileUploader specifically styled or configured for bulk import
  return (
    <div style={{
      border: '1px dashed var(--border-strong)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      textAlign: 'center',
      backgroundColor: 'var(--surface-sunken)'
    }}>
      <UploadCloud size={32} color="var(--text-muted)" style={{ marginBottom: 'var(--space-3)' }} />
      <h4 className="text-body-medium">Bulk Import Data</h4>
      <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-4)' }}>
        Upload {acceptedFormats} files up to {maxSizeMB}MB
      </p>
      
      <FileUploader 
        id="import-uploader"
        accept={acceptedFormats}
        maxSize={maxSizeMB}
        onUpload={onImport}
        label=""
      />
    </div>
  );
};
