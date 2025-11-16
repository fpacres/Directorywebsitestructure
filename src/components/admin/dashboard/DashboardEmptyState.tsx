import { FolderOpen, Plus } from '@phosphor-icons/react';
import { Button } from '../../ui/button';

export function DashboardEmptyState() {
  const handleCreateContent = () => {
    // Navigate to create page - you can update this path as needed
    window.history.pushState({}, '', '/admin/unit-converters');
    window.dispatchEvent(new Event('navigate'));
  };

  return (
    <div 
      className="flex flex-col items-center justify-center py-16 px-6 rounded-[var(--radius-card)] border"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        borderStyle: 'dashed'
      }}
    >
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{
          backgroundColor: 'var(--muted)'
        }}
      >
        <FolderOpen 
          size={32} 
          weight="regular"
          style={{ color: 'var(--muted-foreground)' }}
        />
      </div>

      <h3 
        className="mb-2"
        style={{ color: 'var(--foreground)' }}
      >
        No content yet
      </h3>

      <p 
        className="text-center max-w-md mb-6"
        style={{ 
          color: 'var(--muted-foreground)',
          fontSize: 'var(--text-sm)'
        }}
      >
        Get started by creating your first tool page. Add unit converters, AI tools, or digital tools to build your directory.
      </p>

      <Button 
        onClick={handleCreateContent}
        size="lg"
        className="gap-2"
      >
        <Plus size={20} weight="bold" />
        Create First Page
      </Button>
    </div>
  );
}
