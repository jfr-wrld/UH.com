import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { Edit2, Eye, Calendar, User, Tag, FileText, Clock, TrendingUp } from 'lucide-react';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const ArticleDetails: React.FC<{ navigate: (route: string, data?: any) => void, articleId?: string }> = ({ navigate, articleId = 'art_1' }) => {
  const [status, setStatus] = useState('Draft');
  
  // Mock Data
  const article = {
    id: articleId,
    title: 'Essential Guide to Ihram for First Timers',
    excerpt: 'Everything you need to know about the rules and prohibitions of Ihram before crossing the Miqat.',
    author: 'Ustaz Azhar Idrus',
    category: 'Umrah Fiqh',
    tags: ['Ihram', 'First Timer', 'Umrah', 'Rules'],
    status: status,
    featured: true,
    publishedDate: '10 Nov 2026, 09:00 AM',
    updatedDate: '12 Nov 2026, 02:15 PM',
    seoTitle: 'Essential Guide to Ihram | UmrahHaji.com',
    image: 'https://picsum.photos/seed/281/1200/630',
    metrics: {
      views: 12450,
      wordCount: 1850,
      readTime: '8 min'
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Article Analytics & Details"
        breadcrumbs={[{ label: 'Communications' }, { label: 'Articles', onClick: () => navigate('article-list') }, { label: 'Details' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('article-list')}>Back</Button>
            <Button variant="secondary" leftIcon={<Eye size={16} />}>Live Preview</Button>
            <Button leftIcon={<Edit2 size={16} />} onClick={() => navigate('article-create', { id: article.id })}>Edit Article</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        
        {/* Left Column: Content Preview & Analytics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* Metrics Dashboard */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-md)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <TrendingUp size={16} className="text-success" />
                <span className="text-caption text-muted">Total Views</span>
              </div>
              <span className="text-h3">{article.metrics.views.toLocaleString()}</span>
            </div>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-md)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <Clock size={16} className="text-primary" />
                <span className="text-caption text-muted">Est. Read Time</span>
              </div>
              <span className="text-h3">{article.metrics.readTime}</span>
            </div>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-md)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <FileText size={16} className="text-muted" />
                <span className="text-caption text-muted">Word Count</span>
              </div>
              <span className="text-h3">{article.metrics.wordCount.toLocaleString()}</span>
            </div>
          </div>

          {/* Content Snapshot */}
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Content Snapshot</h3>
            
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <img src={article.image} alt={article.title} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }} />
            </div>

            <h2 className="text-h2" style={{ marginBottom: 'var(--space-2)' }}>{article.title}</h2>
            <p className="text-body text-muted" style={{ fontStyle: 'italic', marginBottom: 'var(--space-4)' }}>{article.excerpt}</p>
            
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {article.tags.map(tag => (
                <Badge key={tag} variant="neutral">{tag}</Badge>
              ))}
            </div>

          </div>

        </div>

        {/* Right Column: Metadata */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Metadata & Taxonomy</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: '4px' }}>Status</span>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <StatusTransitionMenu currentStatus={status} onTransition={setStatus} allowedTransitions={['Draft', 'Active', 'Archived', 'Pending', 'Confirmed', 'Completed', 'Cancelled', 'Scheduled', 'Upcoming', 'Under Review', 'Published']} />
                  <Badge variant={getStatusBadgeVariant("Public")}>Public</Badge>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
                  <User size={14} className="text-muted" />
                  <span className="text-caption text-muted">Author</span>
                </div>
                <span className="text-body-bold">{article.author}</span>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
                  <Tag size={14} className="text-muted" />
                  <span className="text-caption text-muted">Slug</span>
                </div>
                <span className="text-body-bold">essential-guide-to-ihram</span>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
                  <Tag size={14} className="text-muted" />
                  <span className="text-caption text-muted">Primary Category</span>
                </div>
                <span className="text-body-bold">{article.category}</span>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
                  <Calendar size={14} className="text-muted" />
                  <span className="text-caption text-muted">Published Date</span>
                </div>
                <span className="text-body">{article.publishedDate}</span>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
                  <Calendar size={14} className="text-muted" />
                  <span className="text-caption text-muted">Last Updated</span>
                </div>
                <span className="text-body">{article.updatedDate}</span>
              </div>
            </div>
          </div>

          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>SEO Snapshot</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>SEO Title</span>
                <span className="text-body-bold">{article.seoTitle}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>SEO Description</span>
                <span className="text-body">{article.excerpt}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Canonical URL</span>
                <span className="text-body">https://umrahhaji.com/articles/essential-guide-to-ihram</span>
              </div>
            </div>
          </div>

          <div>
            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: '2 hours ago', actor: 'Operations Admin', action: 'Article Published', module: 'Article', details: 'Status changed from Scheduled to Published' },
                { id: '2', timestamp: '1 day ago', actor: 'Ustaz Azhar Idrus', action: 'Article Scheduled', module: 'Article', details: 'Scheduled for 10 Nov 2026, 09:00 AM' }
              ]}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
