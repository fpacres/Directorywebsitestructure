import { ArrowRight } from '@phosphor-icons/react';
import { navigate } from '../../../shared/utils/navigation';

interface RelatedConverter {
  id: string;
  title: string;
  slug: string;
  category?: string;
}

interface RelatedConvertersProps {
  converters: RelatedConverter[];
  categoryName?: string;
}

export function RelatedConverters({ converters, categoryName }: RelatedConvertersProps) {
  // Don't render if no converters
  if (!converters || converters.length === 0) {
    return null;
  }

  const displayTitle = categoryName 
    ? `Related ${categoryName} Converters` 
    : 'Related Converters';

  return (
    <div 
      className="flex flex-col gap-[24px] items-start relative w-full rounded-[var(--radius-card)] p-[32px]"
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)'
      }}
    >
      <h4
        className="relative shrink-0 w-full"
        style={{ 
          color: 'var(--foreground)',
          fontSize: 'var(--text-button)'
        }}
      >
        {displayTitle}
      </h4>

      <div className="flex flex-col gap-[16px] w-full">
        {converters.map((converter) => (
          <ConverterLink 
            key={converter.id} 
            title={converter.title}
            slug={converter.slug}
          />
        ))}
      </div>
    </div>
  );
}

interface ConverterLinkProps {
  title: string;
  slug: string;
}

function ConverterLink({ title, slug }: ConverterLinkProps) {
  return (
    <button
      onClick={() => navigate(`/tools/${slug}`)}
      className="flex items-center justify-between gap-[12px] group no-underline hover:underline w-full text-left"
      style={{
        color: 'var(--foreground)',
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer'
      }}
    >
      <span>
        {title}
      </span>
      
      <ArrowRight 
        size={20} 
        weight="regular"
        style={{ 
          color: 'var(--muted-foreground)',
          flexShrink: 0
        }}
      />
    </button>
  );
}