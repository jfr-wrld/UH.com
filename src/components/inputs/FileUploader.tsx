import React, { useRef, useState } from 'react';
import { classNames } from '../../lib/utils';
import { UploadCloud } from 'lucide-react';

export interface FileUploaderProps {
  onFileSelect: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  className?: string;
  error?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  accept,
  multiple,
  maxSizeMB,
  className,
  error
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const validateFiles = (files: FileList | null) => {
    setLocalError(null);
    if (!files || files.length === 0) return;

    if (maxSizeMB) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSizeMB * 1024 * 1024) {
          setLocalError(`File size must be less than ${maxSizeMB}MB`);
          return;
        }
      }
    }
    onFileSelect(files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    validateFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateFiles(e.target.files);
  };

  const displayError = error || localError;

  return (
    <div
      className={classNames(
        'file-uploader',
        isDragActive && 'drag-active',
        displayError && 'error',
        className
      )}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
      />
      <UploadCloud size={32} color={displayError ? 'var(--color-danger)' : 'var(--color-primary)'} style={{ marginBottom: 'var(--space-2)' }} />
      <p className="text-body-medium">
        Click to upload or drag and drop
      </p>
      {accept && (
        <p className="text-caption" style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
          Supported formats: {accept}
        </p>
      )}
      {maxSizeMB && (
        <p className="text-caption" style={{ color: 'var(--color-text-muted)' }}>
          Max size: {maxSizeMB}MB
        </p>
      )}
      {displayError && (
        <p className="text-caption form-error" style={{ marginTop: 'var(--space-2)' }}>
          {displayError}
        </p>
      )}
    </div>
  );
};
