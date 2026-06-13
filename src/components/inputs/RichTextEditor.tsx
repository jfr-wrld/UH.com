import React, { useRef, useState } from 'react';
import { Button } from '../actions/Button';
import { Image as ImageIcon, Bold, Italic, Underline, Heading1, Heading2, Quote } from 'lucide-react';

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value = '', onChange, placeholder }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const initialValue = useRef(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync value from props if it changes externally
  React.useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      if (onChange) {
        onChange(html);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          execCommand('insertImage', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const execCommand = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      editorRef.current.focus();
    }
    handleInput();
  };

  return (
    <div style={{ 
      border: '1px solid var(--gray-300)', 
      borderRadius: 'var(--radius-md)', 
      overflow: 'hidden',
      backgroundColor: 'var(--surface-base)'
    }}>
      {/* Toolbar */}
      <div style={{ 
        display: 'flex', 
        gap: 'var(--space-2)', 
        padding: 'var(--space-2)', 
        borderBottom: '1px solid var(--gray-200)', 
        backgroundColor: 'var(--surface-sunken)',
        flexWrap: 'wrap'
      }}>
        <Button variant="ghost" size="sm" onMouseDown={(e) => { e.preventDefault(); execCommand('bold'); }} aria-label="Bold">
          <Bold size={16} />
        </Button>
        <Button variant="ghost" size="sm" onMouseDown={(e) => { e.preventDefault(); execCommand('italic'); }} aria-label="Italic">
          <Italic size={16} />
        </Button>
        <Button variant="ghost" size="sm" onMouseDown={(e) => { e.preventDefault(); execCommand('underline'); }} aria-label="Underline">
          <Underline size={16} />
        </Button>
        <span style={{ borderLeft: '1px solid var(--gray-300)', margin: '0 var(--space-2)' }} />
        <Button variant="ghost" size="sm" onMouseDown={(e) => { e.preventDefault(); execCommand('formatBlock', 'H1'); }} aria-label="Heading 1">
          H1
        </Button>
        <Button variant="ghost" size="sm" onMouseDown={(e) => { e.preventDefault(); execCommand('formatBlock', 'H2'); }} aria-label="Heading 2">
          H2
        </Button>
        <Button variant="ghost" size="sm" onMouseDown={(e) => { e.preventDefault(); execCommand('formatBlock', 'BLOCKQUOTE'); }} aria-label="Quote">
          <Quote size={16} />
        </Button>
        <span style={{ borderLeft: '1px solid var(--gray-300)', margin: '0 var(--space-2)' }} />
        <Button variant="ghost" size="sm" leftIcon={<ImageIcon size={14} />} onMouseDown={(e) => { 
          e.preventDefault(); 
          fileInputRef.current?.click();
        }}>
          Add Media
        </Button>
      </div>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
      
      {/* Editor Body */}
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        style={{ 
          width: '100%', 
          padding: 'var(--space-4)', 
          minHeight: '400px', 
          border: 'none', 
          outline: 'none',
          overflowY: 'auto'
        }}
        dangerouslySetInnerHTML={{ __html: initialValue.current }}
        data-placeholder={placeholder}
        className="rich-text-editor-content"
      />
    </div>
  );
};
