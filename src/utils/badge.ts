import type { BadgeVariant } from '../components/data-display/Badge';

export const getStatusBadgeVariant = (status: string | undefined | null): BadgeVariant => {
  if (!status) return 'neutral';
  
  const normalized = status.toLowerCase().trim();
  
  switch (normalized) {
    case 'active':
    case 'approved':
    case 'verified':
    case 'paid':
    case 'success':
    case 'published':
    case 'confirmed':
    case 'ready':
      return 'success';

    case 'completed':
      return 'info';

    case 'departed':
    case 'submitted':
      return 'primary';

    case 'draft':
    case 'inactive':
    case 'archived':
    case 'cancelled':
    case 'not required':
    case 'neutral':
      return 'neutral';

    case 'pending':
    case 'pending review':
    case 'pending approval':
    case 'under review':
    case 'review':
    case 'revision':
    case 'warning':
    case 'on leave':
    case 'partial':
    case 'missing':
    case 'reversed':
    case 'refunded':
      return 'warning';

    case 'rejected':
    case 'failed':
    case 'suspension':
    case 'suspended':
    case 'locked':
    case 'danger':
    case 'critical':
    case 'unpaid':
      return 'danger';

    default:
      return 'neutral';
  }
};

export const getCategoryBadgeVariant = (category: string | undefined | null): BadgeVariant => {
  if (!category) return 'neutral';
  
  const normalized = category.toLowerCase().trim();
  
  if (['haji', 'hajj'].includes(normalized)) return 'warning';
  if (['umrah'].includes(normalized)) return 'primary';
  if (['standard', 'premium', 'custom'].includes(normalized)) return 'info';
  
  return 'primary';
};
