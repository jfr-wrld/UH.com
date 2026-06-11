import React, { useRef, useState } from 'react';
import { classNames } from '../../lib/utils';
import { Camera, RefreshCw } from 'lucide-react';

export interface ImageUploaderProps {
  id?: string;
  onUpload?: (files: any) => void;
  onFileSelect?: (files: FileList | null) => void;
  maxSizeMB?: number;
  className?: string;
  error?: string;
  shape?: 'circle' | 'square';
  size?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  onFileSelect,
  onUpload,
  maxSizeMB = 2,
  className,
  error,
  shape = 'circle',
  size = 120
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
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

    const file = files[0];
    
    if (!file.type.startsWith('image/')) {
      setLocalError('Please upload a valid image file (JPG, PNG).');
      return;
    }

    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      setLocalError(`Image size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Simulate upload animation
    setIsUploading(true);
    setPreviewUrl(null);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setPreviewUrl(URL.createObjectURL(file));
          if(onFileSelect) onFileSelect(files); 
          if(onUpload) onUpload(files);
        }, 300);
      }
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

  const displayError = error || localError;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <div
        className={classNames('image-uploader', isDragActive && 'drag-active', displayError && 'error', className)}
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
        style={{ 
          width: size, 
          height: size, 
          borderRadius: shape === 'circle' ? '50%' : 'var(--radius-md)', 
          border: previewUrl ? 'none' : '2px dashed var(--border-default)', 
          backgroundColor: previewUrl ? 'transparent' : 'var(--surface-sunken)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer', 
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          boxShadow: previewUrl ? 'var(--shadow-sm)' : 'none'
        }}
      >
        <input
          id={id}
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          accept="image/*"
          style={{ display: 'none' }}
        />

        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundColor: 'rgba(0,0,0,0.4)', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                opacity: 0, 
                transition: 'opacity 0.2s ease', 
                color: 'white' 
              }} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
            >
              <Camera size={24} style={{ marginBottom: '4px' }} />
              <span style={{ fontSize: '12px', fontWeight: 500 }}>Change</span>
            </div>
          </>
        ) : isUploading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--color-primary)' }}>
            <RefreshCw size={24} className="animate-spin" />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: displayError ? 'var(--color-danger)' : 'var(--gray-500)', padding: 'var(--space-2)', textAlign: 'center' }}>
            <Camera size={28} style={{ marginBottom: '8px' }} />
            <span style={{ fontSize: '12px', fontWeight: 500 }}>{isDragActive ? 'Drop image' : 'Upload'}</span>
          </div>
        )}
      </div>
      
      {displayError && (
        <span className="text-caption form-error">{displayError}</span>
      )}
    </div>
  );
};
