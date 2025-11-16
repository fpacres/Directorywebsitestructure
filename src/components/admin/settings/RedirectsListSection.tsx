import { useState, useEffect } from 'react';
import { MagnifyingGlass, ListBullets } from '@phosphor-icons/react';
import { Input } from '../../ui/input';
import { SettingsSectionCard } from './SettingsSectionCard';
import { RedirectListItem } from './RedirectListItem';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

interface Redirect {
  id: string;
  oldUrl: string;
  newUrl: string;
  created_at: string;
}

interface RedirectsListSectionProps {
  refreshTrigger?: number;
}

export function RedirectsListSection({ refreshTrigger }: RedirectsListSectionProps) {
  const [filter, setFilter] = useState('');
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load redirects from backend
  useEffect(() => {
    loadRedirects();
  }, [refreshTrigger]);

  const loadRedirects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/settings/redirects`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load redirects');
      }

      const data = await response.json();
      setRedirects(data.redirects || []);
    } catch (error) {
      console.error('Error loading redirects:', error);
      toast.error('Failed to load redirects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/settings/redirects/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete redirect');
      }

      toast.success('Redirect deleted successfully');
      // Refresh the list
      loadRedirects();
    } catch (error) {
      console.error('Error deleting redirect:', error);
      toast.error('Failed to delete redirect');
    } finally {
      setDeletingId(null);
    }
  };

  // Filter redirects based on search query
  const filteredRedirects = redirects.filter(redirect => {
    if (!filter) return true;
    const searchLower = filter.toLowerCase();
    return (
      redirect.oldUrl.toLowerCase().includes(searchLower) ||
      redirect.newUrl.toLowerCase().includes(searchLower)
    );
  });

  return (
    <SettingsSectionCard 
      title="Redirects"
      icon={<ListBullets size={24} weight="duotone" />}
      description="Any changes made to this list will go live on publish. Reorder the items to define the priority."
    >
      <div className="mt-6">
        {/* Filter Input */}
        <div className="relative mb-4">
          <MagnifyingGlass 
            size={20} 
            weight="regular"
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--muted-foreground)' }}
          />
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter..."
            className="pl-10"
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div 
            className="flex items-center justify-center py-16"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Loading redirects...
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredRedirects.length === 0 && !filter && (
          <div 
            className="flex flex-col items-center justify-center py-16 px-6 rounded-[var(--radius)] border"
            style={{
              backgroundColor: 'var(--muted)',
              borderColor: 'var(--border)',
              borderStyle: 'dashed'
            }}
          >
            <p 
              className="text-center max-w-sm"
              style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}
            >
              Create a redirect to maintain search engine ranking for existing URLs
            </p>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && filteredRedirects.length === 0 && filter && (
          <div 
            className="flex flex-col items-center justify-center py-16 px-6 rounded-[var(--radius)] border"
            style={{
              backgroundColor: 'var(--muted)',
              borderColor: 'var(--border)',
              borderStyle: 'dashed'
            }}
          >
            <p 
              className="text-center max-w-sm"
              style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}
            >
              No redirects match your search
            </p>
          </div>
        )}

        {/* List of redirects */}
        {!isLoading && filteredRedirects.length > 0 && (
          <div className="flex flex-col gap-2">
            {filteredRedirects.map((redirect) => (
              <RedirectListItem
                key={redirect.id}
                redirect={redirect}
                onDelete={handleDelete}
                isDeleting={deletingId === redirect.id}
              />
            ))}
          </div>
        )}
      </div>
    </SettingsSectionCard>
  );
}