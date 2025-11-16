import { Plus, ArrowsClockwise } from '@phosphor-icons/react';
import { navigate } from '../../../shared/utils/navigation';
import { projectId, publicAnonKey } from '../../../utils/supabase/info.tsx';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';

interface ConvertersHeaderProps {
  onRefresh?: () => void;
  isEmpty?: boolean;
}

export function ConvertersHeader({ onRefresh, isEmpty }: ConvertersHeaderProps) {
  const [isMigrating, setIsMigrating] = useState(false);

  const handleMigration = async () => {
    setIsMigrating(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/migrate/update-subcategory`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Migration failed');
      }

      const data = await response.json();
      toast.success(data.message || 'Migration completed successfully');
      
      // Refresh the page list
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Migration error:', error);
      toast.error('Failed to run migration');
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 style={{ color: 'var(--foreground)' }}>Length Unit Converter</h1>
        <p style={{ color: 'var(--muted-foreground)' }}>
          Manage your length unit converter page and SEO settings
        </p>
      </div>
      <div className="flex items-center gap-3">
        {isEmpty && (
          <button
            onClick={handleMigration}
            disabled={isMigrating}
            className="flex items-center gap-2 px-4 py-3 rounded-[var(--radius-button)] transition-opacity whitespace-nowrap"
            style={{
              backgroundColor: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
              opacity: isMigrating ? '0.6' : '1',
              cursor: isMigrating ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => !isMigrating && (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => !isMigrating && (e.currentTarget.style.opacity = '1')}
          >
            <ArrowsClockwise size={20} weight="bold" />
            <span>{isMigrating ? 'Migrating...' : 'Fix Missing Data'}</span>
          </button>
        )}
        <button
          onClick={() => navigate('/admin/unit-converters/new')}
          className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-button)] transition-opacity whitespace-nowrap"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <Plus size={20} weight="bold" />
          <span>Add New Converter</span>
        </button>
      </div>
    </div>
  );
}