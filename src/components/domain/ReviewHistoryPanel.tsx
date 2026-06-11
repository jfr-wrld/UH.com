import React from 'react';
import { Timeline } from '../data-display/Timeline';
import type { TimelineItem } from '../data-display/Timeline';

export interface ReviewRecord {
  id: string;
  actor: string;
  decision: 'Approved' | 'Rejected' | 'Requested Revision';
  timestamp: string;
  note?: string;
}

export interface ReviewHistoryPanelProps {
  title?: string;
  reviews: ReviewRecord[];
}

export const ReviewHistoryPanel: React.FC<ReviewHistoryPanelProps> = ({
  title = 'Review History',
  reviews
}) => {
  const timelineItems: TimelineItemProps[] = reviews.map(review => {
    let status: TimelineItemProps['status'] = 'default';
    if (review.decision === 'Approved') status = 'success';
    if (review.decision === 'Rejected') status = 'danger';
    if (review.decision === 'Requested Revision') status = 'warning';

    return {
      id: review.id,
      title: `${review.decision} by ${review.actor}`,
      description: review.note,
      timestamp: review.timestamp,
      status
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <h3 className="text-section-title">{title}</h3>
      <div style={{ 
        backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', 
        padding: 'var(--space-6)', 
        borderRadius: 'var(--radius-card)',
        border: 'none'
      }}>
        {timelineItems.length > 0 ? (
          <Timeline items={timelineItems} />
        ) : (
          <p className="text-body text-muted">No review history available.</p>
        )}
      </div>
    </div>
  );
};
