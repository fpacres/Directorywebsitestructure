import { useState } from 'react';
import { ArrowRight, Check, Path } from '@phosphor-icons/react';
import { Input } from '../../ui/input';
import { SettingsSectionCard } from './SettingsSectionCard';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

interface CreateRedirectSectionProps {
  onRedirectCreated?: () => void;
}

export function CreateRedirectSection({ onRedirectCreated }: CreateRedirectSectionProps) {
  const [oldUrl, setOldUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleAddRedirect = async () => {
    if (!oldUrl || !newUrl) return;

    setIsCreating(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/settings/redirects`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oldUrl,
            newUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create redirect');
      }

      toast.success('Redirect created successfully');
      setOldUrl('');
      setNewUrl('');
      
      // Notify parent to refresh the list
      if (onRedirectCreated) {
        onRedirectCreated();
      }
    } catch (error) {
      console.error('Error creating redirect:', error);
      toast.error('Failed to create redirect');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <SettingsSectionCard 
      title="Create Redirect"
      icon={<Path size={24} weight="duotone" />}
      description="Redirect existing URLs to new ones to maintain search engine ranking."
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-4 items-end mt-6">
        {/* Old URL */}
        <div>
          <label 
            htmlFor="old-url" 
            className="block mb-2"
            style={{ color: 'var(--foreground)' }}
          >
            Old URL
          </label>
          <Input
            id="old-url"
            value={oldUrl}
            onChange={(e) => setOldUrl(e.target.value)}
            placeholder="/url, /url/* ..."
            disabled={isCreating}
          />
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center pb-2">
          <ArrowRight size={20} weight="bold" style={{ color: 'var(--muted-foreground)' }} />
        </div>

        {/* New URL */}
        <div>
          <label 
            htmlFor="new-url" 
            className="block mb-2"
            style={{ color: 'var(--foreground)' }}
          >
            New URL
          </label>
          <Input
            id="new-url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Page or URL..."
            disabled={isCreating}
          />
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddRedirect}
          disabled={!oldUrl || !newUrl || isCreating}
          className="inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius)] transition-colors disabled:opacity-50"
          style={{
            backgroundColor: oldUrl && newUrl && !isCreating ? 'var(--accent)' : 'var(--muted)',
            color: 'white'
          }}
        >
          <Check size={20} weight="bold" />
        </button>
      </div>
    </SettingsSectionCard>
  );
}