import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Textarea } from '../../components/inputs/Textarea';
import { RichTextEditor } from '../../components/inputs/RichTextEditor';
import { FileUploader } from '../../components/inputs/FileUploader';
import { Button } from '../../components/actions/Button';
import { Save, Eye, Send, Image as ImageIcon } from 'lucide-react';

export const ArticleCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [status, setStatus] = useState('draft');
  const [category, setCategory] = useState('fiqh');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Create Article"
        breadcrumbs={[{ label: 'Communications' }, { label: 'Articles', onClick: () => navigate('article-list') }, { label: 'Editor' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success'); navigate('article-list'); }}>Cancel</Button>
            <Button variant="secondary" leftIcon={<Eye size={16} />}>Preview</Button>
            <Button variant="secondary" leftIcon={<Save size={16} />}>Save Draft</Button>
            <Button leftIcon={<Send size={16} />} onClick={() => navigate('article-list')}>Publish Article</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        
        {/* Main Column: Content Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              
              <FormField label="Article Title" required>
                <Input placeholder="Enter a compelling title..." />
              </FormField>

              <FormField label="Slug" required>
                <Input placeholder="e.g. essential-guide-to-ihram" />
              </FormField>

              <FormField label="Short Excerpt" required>
                <Textarea 
                  placeholder="A brief summary of the article..." 
                />
              </FormField>

              {/* Rich Text Editor */}
              <FormField label="Article Content" required>
                <RichTextEditor placeholder="Write your article content here..." />
              </FormField>

            </div>
          </div>

        </div>

        {/* Right Column: Settings & Metadata */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* Publish Settings */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Publish Settings</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <FormField label="Status">
                <Select 
                  options={[
                    {value: 'draft', label: 'Draft (Not Public)'},
                    {value: 'scheduled', label: 'Scheduled'},
                    {value: 'published', label: 'Published immediately'}
                  ]} 
                  value={status} 
                  onChange={setStatus} 
                />
              </FormField>

              {status === 'scheduled' && (
                <FormField label="Publish Date & Time">
                  <Input type="datetime-local" />
                </FormField>
              )}

              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                <input type="checkbox" id="featured" />
                <label htmlFor="featured" className="text-body">Set as Featured Article</label>
              </div>

              <FormField label="Visibility" required>
                <Select 
                  options={[
                    {value: 'public', label: 'Public'}, 
                    {value: 'private', label: 'Private'}, 
                    {value: 'internal', label: 'Internal Only'}
                  ]} 
                  value="public" 
                  onChange={() => {}} 
                />
              </FormField>

              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                <input type="checkbox" id="indexing" defaultChecked />
                <label htmlFor="indexing" className="text-body">Allow Search Engine Indexing</label>
              </div>
            </div>
          </div>

          {/* Taxonomy (Author, Category, Tags) */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Taxonomy</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <FormField label="Author" required>
                <Select 
                  options={[
                    {value: 'admin', label: 'Admin Team'},
                    {value: 'azhar', label: 'Ustaz Azhar Idrus'},
                    {value: 'don', label: 'Ustaz Don Daniyal'}
                  ]} 
                  value="admin" 
                  onChange={() => {}} 
                />
              </FormField>

              <FormField label="Primary Category" required>
                <Select 
                  options={[
                    {value: 'fiqh', label: 'Umrah Fiqh'},
                    {value: 'tips', label: 'Practical Tips'},
                    {value: 'news', label: 'News & Updates'},
                    {value: 'guide', label: 'Travel Guide'}
                  ]} 
                  value={category} 
                  onChange={setCategory} 
                />
              </FormField>

              <FormField label="Tags">
                <Input placeholder="Type a tag and press enter..." />
              </FormField>
            </div>
          </div>

          {/* Featured Image */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Featured Image</h3>
            <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-4)' }}>Recommended size: 1200 x 630 px. (Max 3MB)</p>
            
            <div style={{ marginTop: 'var(--space-2)' }}>
              <FileUploader accept=".jpg,.png" maxSizeMB={3} id="article-thumbnail" />
            </div>
          </div>

          {/* SEO Metadata */}
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-card)', border: 'none' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>SEO Metadata</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <FormField label="SEO Title">
                <Input placeholder="Defaults to Article Title" />
              </FormField>
              <FormField label="Meta Description">
                <Textarea 
                  placeholder="Defaults to Excerpt" 
                  style={{ minHeight: '80px' }}
                />
              </FormField>
              <FormField label="Canonical URL">
                <Input placeholder="e.g. https://umrahhaji.com/articles/slug" />
              </FormField>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />
              <h4 className="text-body-bold">Open Graph</h4>
              <FormField label="Open Graph Title">
                <Input placeholder="Defaults to SEO Title" />
              </FormField>
              <FormField label="Open Graph Description">
                <Textarea 
                  placeholder="Defaults to Meta Description" 
                  style={{ minHeight: '80px' }}
                />
              </FormField>
              <FormField label="Open Graph Image">
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <Button variant="secondary" size="sm" leftIcon={<ImageIcon size={14} />}>Upload Image</Button>
                  <span className="text-caption text-muted">Defaults to Featured Image</span>
                </div>
              </FormField>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
