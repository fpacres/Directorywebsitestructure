import { Plus, Icon } from '@phosphor-icons/react';
import { navigate } from '../../../shared/utils/navigation';

interface AdminEmptyStateProps {
  /**
   * The icon to display (Phosphor icon component)
   */
  icon: Icon;
  /**
   * The title shown when no items exist
   */
  title: string;
  /**
   * Description text for empty state
   */
  description: string;
  /**
   * Description text when search has no results
   */
  searchDescription?: string;
  /**
   * Button text for the CTA
   */
  buttonText: string;
  /**
   * URL to navigate to when button is clicked
   */
  buttonHref: string;
  /**
   * Whether user is currently searching
   */
  hasSearchQuery?: boolean;
}

/**
 * Reusable empty state component for admin panels
 * Can be used for unit converters, AI tools, digital tools, etc.
 */
export function AdminEmptyState({
  icon: IconComponent,
  title,
  description,
  searchDescription,
  buttonText,
  buttonHref,
  hasSearchQuery = false,
}: AdminEmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 rounded-[var(--radius-card)] border-2 border-dashed"
      style={{ borderColor: 'var(--border)' }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        <IconComponent size={32} style={{ color: 'var(--muted-foreground)' }} />
      </div>
      <h3 style={{ color: 'var(--foreground)' }}>{title}</h3>
      <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }} className="mb-4">
        {hasSearchQuery 
          ? (searchDescription || 'Try a different search term')
          : description
        }
      </p>
      {!hasSearchQuery && (
        <button
          onClick={() => navigate(buttonHref)}
          className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-button)] transition-opacity"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <Plus size={20} weight="bold" />
          <span>{buttonText}</span>
        </button>
      )}
    </div>
  );
}
