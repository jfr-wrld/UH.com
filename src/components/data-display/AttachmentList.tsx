import React from 'react';
import { classNames } from '../../lib/utils';
import { FileText, Download, Trash2 } from 'lucide-react';
import { IconButton } from '../actions/IconButton';

export interface Attachment {
  id: string;
  name: string;
  size?: string;
  url?: string;
}

export interface AttachmentListProps {
  attachments: Attachment[];
  onDownload?: (attachment: Attachment) => void;
  onRemove?: (attachment: Attachment) => void;
  className?: string;
}

export const AttachmentList: React.FC<AttachmentListProps> = ({
  attachments,
  onDownload,
  onRemove,
  className
}) => {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className={classNames('attachment-list', className)}>
      {attachments.map((file) => (
        <div key={file.id} className="attachment-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <FileText size={20} color="var(--color-text-muted)" />
            <div>
              <p className="text-body-medium">{file.name}</p>
              {file.size && <p className="text-caption" style={{ color: 'var(--color-text-muted)' }}>{file.size}</p>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {onDownload && (
              <IconButton size="sm" onClick={() => onDownload(file)} aria-label="Download file">
                <Download size={16} />
              </IconButton>
            )}
            {onRemove && (
              <IconButton size="sm" onClick={() => onRemove(file)} className="text-danger" aria-label="Remove file">
                <Trash2 size={16} />
              </IconButton>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
