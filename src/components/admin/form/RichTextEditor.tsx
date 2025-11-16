import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { RichTextToolbar } from './RichTextToolbar';
import { useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Youtube.configure({
        width: 640,
        height: 480,
      }),
    ],
    content: value,
    editable: true,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes with editor content
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addYoutube = () => {
    const url = window.prompt('Enter YouTube URL:');
    if (url && editor) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  return (
    <div
      className="rounded-[var(--radius)] overflow-hidden"
      style={{
        border: '1px solid var(--border)',
        backgroundColor: 'var(--input-background)',
      }}
    >
      <RichTextToolbar 
        editor={editor} 
        onAddLink={addLink} 
        onAddYoutube={addYoutube} 
      />
      
      <div className="p-4" style={{ minHeight: '500px' }}>
        <EditorContent 
          editor={editor} 
          className="tiptap-editor max-w-none"
          style={{ color: 'var(--foreground)', minHeight: '468px' }}
        />
      </div>
    </div>
  );
}