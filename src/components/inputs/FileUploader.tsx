import React, { useRef, useState } from 'react';
import { classNames } from '../../lib/utils';
import { UploadCloud, FileText, CheckCircle, Trash2, RefreshCw, Eye } from 'lucide-react';
import { Button } from '../actions/Button';

export interface FileUploaderProps {
  id?: string;
  onUpload?: (files: any) => void;
  onFileSelect?: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  id,
  onFileSelect,
  onUpload,
  accept,
  multiple,
  maxSizeMB,
  className,
  error,
  label,
  required
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);

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

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      if (maxSizeMB && files[i].size > maxSizeMB * 1024 * 1024) {
        setLocalError(`File size exceeds ${maxSizeMB}MB`);
        return;
      }
      validFiles.push(files[i]);
    }
    
    // Simulate upload animation
    setIsUploading(true);
    setUploadProgress(0);
    setUploadingFile(validFiles[0]);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadingFile(null);
          setUploadedFiles(validFiles);
          if(onFileSelect) onFileSelect(files); 
          if(onUpload) onUpload(files);
        }, 300);
      }
      setUploadProgress(progress);
    }, 100);
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

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFiles([]);
    if(onFileSelect) onFileSelect(null);
    if(onUpload) onUpload(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReplace = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (uploadedFiles.length > 0) {
      const url = URL.createObjectURL(uploadedFiles[0]);
      window.open(url, '_blank');
    }
  };

  const displayError = error || localError;

  if (isUploading && uploadingFile) {
    return (
      <div className={classNames('file-uploader-compact', className)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', padding: 'var(--space-3)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-light)', opacity: 0.8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--surface-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <RefreshCw size={20} className="animate-spin" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="text-body-bold" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{uploadingFile.name}</span>
              </div>
              <div className="text-caption text-muted">
                Uploading... {uploadProgress}%
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-pill)', marginTop: 'var(--space-2)', overflow: 'hidden' }}>
          <div style={{ width: `${uploadProgress}%`, height: '100%', backgroundColor: 'var(--color-primary)', transition: 'width 0.1s linear' }} />
        </div>
        <input type="file" ref={fileInputRef} onChange={handleChange} accept={accept} multiple={multiple} style={{ display: 'none' }} />
      </div>
    );
  }

  if (uploadedFiles.length > 0) {
    const file = uploadedFiles[0];
    return (
      <div className={classNames('file-uploader-compact', className)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', padding: 'var(--space-3)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-sunken)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <FileText size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="text-body-bold" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                {required && <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: 'var(--gray-200)', borderRadius: 'var(--radius-pill)', fontWeight: 600 }}>Required</span>}
              </div>
              <div className="text-caption text-muted">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--color-success)', fontSize: '12px', fontWeight: 500 }}>
            <CheckCircle size={14} /> Uploaded successfully
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)' }}>
          <Button variant="ghost" size="sm" onClick={handlePreview} leftIcon={<Eye size={14} />} style={{ fontSize: '12px', height: '28px' }}>Preview</Button>
          <Button variant="ghost" size="sm" onClick={handleReplace} leftIcon={<RefreshCw size={14} />} style={{ fontSize: '12px', height: '28px' }}>Replace</Button>
          <Button variant="ghost" size="sm" onClick={handleRemove} leftIcon={<Trash2 size={14} />} style={{ fontSize: '12px', height: '28px', color: 'var(--color-danger)' }}>Remove</Button>
        </div>
        <input type="file" ref={fileInputRef} onChange={handleChange} accept={accept} multiple={multiple} style={{ display: 'none' }} />
      </div>
    );
  }

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
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <input
        id={id}
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
      />
      <UploadCloud size={24} color={displayError ? 'var(--color-danger)' : 'var(--color-primary)'} style={{ marginBottom: 'var(--space-2)' }} />
      <p className="text-body-medium">
        Click to upload or drag and drop
      </p>
      {accept && (
        <p className="text-caption" style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
          {accept.split(',').join(', ')}
        </p>
      )}
      {displayError && (
        <p className="text-caption form-error" style={{ marginTop: 'var(--space-2)' }}>
          {displayError}
        </p>
      )}
      {!displayError && maxSizeMB && (
        <p className="text-caption" style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
          Max file size: {maxSizeMB}MB
        </p>
      )}
    </div>
  );
};
