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
  reviews?: ReviewRecord[];
  history?: any[];
}

export const ReviewHistoryPanel: React.FC<ReviewHistoryPanelProps> = ({
  title = 'Review History',
  reviews,
  history
}) => {
  const timelineItems: TimelineItemProps[] = (reviews || history || []).map(review => {
    let status: TimelineItemProps['status'] = 'default';
    review.decision = review.decision || (review as any).status; review.actor = review.actor || (review as any).reviewer; review.note = review.note || (review as any).notes; review.timestamp = review.timestamp || (review as any).date; if (review.decision === 'Approved') status = 'success';
    review.decision = review.decision || (review as any).status; review.actor = review.actor || (review as any).reviewer; review.note = review.note || (review as any).notes; review.timestamp = review.timestamp || (review as any).date; if (review.decision === 'Rejected') status = 'danger';
    review.decision = review.decision || (review as any).status; review.actor = review.actor || (review as any).reviewer; review.note = review.note || (review as any).notes; review.timestamp = review.timestamp || (review as any).date; if (review.decision === 'Requested Revision') status = 'warning';

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
        backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', 
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
