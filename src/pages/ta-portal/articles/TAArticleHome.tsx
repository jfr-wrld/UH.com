import React from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Input } from '../../../components/inputs/Input';
import { Button } from '../../../components/actions/Button';
import { BookOpen, Search, Bookmark, ArrowRight, ShieldCheck, FileText, Compass, Book } from 'lucide-react';

export const TAArticleHome: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const categories = [
    { id: 'umrah-fiqh', label: 'Umrah Fiqh & Rituals', icon: <Book size={24} />, count: 42, color: 'var(--color-primary)' },
    { id: 'hajj-fiqh', label: 'Hajj Guidelines', icon: <Compass size={24} />, count: 18, color: 'var(--color-warning)' },
    { id: 'documents', label: 'Visas & Documents', icon: <FileText size={24} />, count: 15, color: 'var(--color-info)' },
    { id: 'platform', label: 'Platform Guide', icon: <ShieldCheck size={24} />, count: 24, color: 'var(--color-success)' }
  ];

  const featured = [
    { id: 'ART-001', title: 'New Visa Regulations for 2027 Season', category: 'Visas & Documents', readTime: '5 min' },
    { id: 'ART-002', title: 'Managing Group Trip Changes Effectively', category: 'Platform Guide', readTime: '8 min' },
    { id: 'ART-003', title: 'Umrah Etiquette for First-timers', category: 'Umrah Fiqh & Rituals', readTime: '12 min' }
  ];

  return (
    <div style={{ paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Knowledge Base"
        subtitle="Official guidance, operational references, and platform guides."
        actions={
          <Button variant="secondary" onClick={() => navigate('ta-article-list')} leftIcon={<Bookmark size={16} />}>
            My Bookmarks
          </Button>
        }
      />

      {/* Hero Search Section */}
      <div style={{ 
        padding: 'var(--space-8) var(--space-6)', 
        backgroundColor: 'var(--color-primary-dark)', 
        borderRadius: 'var(--radius-xl)', 
        color: 'white',
        marginBottom: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <h2 className="text-h2" style={{ marginBottom: 'var(--space-2)' }}>How can we help you today?</h2>
        <p className="text-body" style={{ opacity: 0.9, marginBottom: 'var(--space-6)', maxWidth: '600px' }}>
          Search for operational guides, fiqh references, visa requirements, or system tutorials.
        </p>
        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', gap: 'var(--space-2)' }}>
          <div style={{ flex: 1 }}>
            <Input placeholder="Search articles..." style={{ backgroundColor: 'white', color: 'black' }} />
          </div>
          <Button variant="primary" style={{ backgroundColor: 'white', color: 'var(--color-primary-dark)' }} onClick={() => navigate('ta-article-list')}>
            <Search size={20} />
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 'var(--space-8)' }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 className="text-section-title">Browse by Category</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('ta-article-list')} rightIcon={<ArrowRight size={16} />}>View All</Button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
              {categories.map(c => (
                <div 
                  key={c.id} 
                  onClick={() => navigate('ta-article-list')}
                  style={{ 
                    padding: 'var(--space-5)', 
                    backgroundColor: 'var(--surface-base)', 
                    borderRadius: 'var(--radius-card)', 
                    boxShadow: 'var(--glass-shadow)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 'var(--space-4)'
                  }}
                  className="hover-lift"
                >
                  <div style={{ padding: 'var(--space-3)', backgroundColor: `${c.color}20`, color: c.color, borderRadius: 'var(--radius-md)' }}>
                    {c.icon}
                  </div>
                  <div>
                    <span className="text-body-bold" style={{ display: 'block' }}>{c.label}</span>
                    <span className="text-caption text-muted">{c.count} articles</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Featured Articles</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {featured.map(art => (
                <div 
                  key={art.id}
                  onClick={() => navigate('ta-article-details', { id: art.id })}
                  style={{ 
                    padding: 'var(--space-5)', 
                    backgroundColor: 'var(--surface-base)', 
                    borderRadius: 'var(--radius-card)', 
                    boxShadow: 'var(--glass-shadow)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  className="hover-lift"
                >
                  <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={24} className="text-primary" />
                    </div>
                    <div>
                      <span className="text-body-bold" style={{ display: 'block' }}>{art.title}</span>
                      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-1)' }}>
                        <span className="text-caption text-primary">{art.category}</span>
                        <span className="text-caption text-muted">•</span>
                        <span className="text-caption text-muted">{art.readTime} read</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={16} />}>Read</Button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ padding: 'var(--space-5)', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--glass-shadow)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Need More Help?</h3>
            <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>
              Cannot find what you are looking for? You can submit a support ticket to our platform operations team.
            </p>
            <Button style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('ta-report-create')}>
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
