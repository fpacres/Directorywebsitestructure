import { ArrowRight, Trash } from '@phosphor-icons/react';
import { Button } from '../../ui/button';

interface RedirectListItemProps {
  redirect: {
    id: string;
    oldUrl: string;
    newUrl: string;
    created_at: string;
  };
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function RedirectListItem({ redirect, onDelete, isDeleting }: RedirectListItemProps) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-[var(--radius)] border group hover:shadow-sm transition-all"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Old URL */}
        <div className="flex-1 min-w-0">
          <p
            className="truncate font-mono"
            style={{
              color: 'var(--foreground)',
              fontSize: 'var(--text-sm)',
            }}
          >
            {redirect.oldUrl}
          </p>
        </div>

        {/* Arrow */}
        <ArrowRight size={16} weight="bold" style={{ color: 'var(--muted-foreground)' }} className="flex-shrink-0" />

        {/* New URL */}
        <div className="flex-1 min-w-0">
          <p
            className="truncate font-mono"
            style={{
              color: 'var(--foreground)',
              fontSize: 'var(--text-sm)',
            }}
          >
            {redirect.newUrl}
          </p>
        </div>
      </div>

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(redirect.id)}
        disabled={isDeleting}
        className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash size={18} weight="regular" style={{ color: 'var(--destructive)' }} />
      </Button>
    </div>
  );
}
