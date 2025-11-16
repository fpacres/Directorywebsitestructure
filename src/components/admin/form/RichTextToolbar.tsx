import { Editor } from '@tiptap/react';
import { 
  Bold, Italic, List, ListOrdered, 
  Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, 
  Pilcrow, Link2, Youtube as YoutubeIcon, Undo, Redo 
} from 'lucide-react';

interface RichTextToolbarProps {
  editor: Editor | null;
  onAddLink: () => void;
  onAddYoutube: () => void;
}

export function RichTextToolbar({ editor, onAddLink, onAddYoutube }: RichTextToolbarProps) {
  if (!editor) return null;

  return (
    <div
      className="flex flex-wrap gap-1 p-2"
      style={{
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--card)',
      }}
    >
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        isActive={editor.isActive('paragraph')}
        title="Paragraph"
      >
        <Pilcrow className="w-4 h-4" />
      </ToolbarButton>

      {[1, 2, 3, 4, 5, 6].map((level) => {
        const HeadingIcon = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6][level - 1];
        return (
          <ToolbarButton
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()}
            isActive={editor.isActive('heading', { level })}
            title={`Heading ${level}`}
          >
            <HeadingIcon className="w-4 h-4" />
          </ToolbarButton>
        );
      })}

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="Ordered List"
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        onClick={onAddLink}
        isActive={editor.isActive('link')}
        title="Add Link"
      >
        <Link2 className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={onAddYoutube}
        isActive={editor.isActive('youtube')}
        title="Embed YouTube"
      >
        <YoutubeIcon className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo className="w-4 h-4" />
      </ToolbarButton>
    </div>
  );
}

function ToolbarButton({ 
  onClick, 
  isActive = false, 
  disabled = false, 
  title, 
  children 
}: { 
  onClick: () => void; 
  isActive?: boolean; 
  disabled?: boolean; 
  title: string; 
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="p-2 rounded-[var(--radius)] transition-colors disabled:opacity-50"
      style={{
        backgroundColor: isActive ? 'var(--accent)' : 'transparent',
        color: isActive ? 'var(--accent-foreground)' : 'var(--foreground)',
      }}
      title={title}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div style={{ width: '1px', backgroundColor: 'var(--border)', margin: '0 4px' }} />;
}
