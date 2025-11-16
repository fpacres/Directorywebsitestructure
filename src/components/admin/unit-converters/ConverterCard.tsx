import { Calculator } from '@phosphor-icons/react';
import { navigate } from '../../../shared/utils/navigation';

interface ConverterCardProps {
  page: {
    id: string;
    title: string;
    slug: string;
    default_from_unit?: string;
    default_to_unit?: string;
    published: boolean;
    updated_at: string;
  };
}

export function ConverterCard({ page }: ConverterCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className="rounded-[var(--radius-card)] p-6 border transition-all cursor-pointer"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--elevation-sm)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      onClick={() => navigate(`/admin/unit-converters/edit/${page.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-[var(--radius)] flex items-center justify-center"
          style={{ backgroundColor: 'var(--accent)15' }}
        >
          <Calculator size={24} style={{ color: 'var(--accent)' }} weight="bold" />
        </div>
        <div
          className="px-3 py-1 rounded-full"
          style={{
            backgroundColor: page.published ? 'var(--brand-teal)15' : 'var(--brand-orange)15',
            color: page.published ? 'var(--brand-teal)' : 'var(--brand-orange)',
            fontSize: 'var(--text-xs)'
          }}
        >
          {page.published ? 'Published' : 'Draft'}
        </div>
      </div>

      <h4 style={{ color: 'var(--foreground)' }} className="mb-2">
        {page.title}
      </h4>
      
      <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }} className="mb-4">
        {page.slug}
      </p>

      {page.default_from_unit && page.default_to_unit && (
        <div className="flex items-center gap-2 mb-4">
          <div
            className="px-2 py-1 rounded"
            style={{
              backgroundColor: 'var(--muted)',
              color: 'var(--foreground)',
              fontSize: 'var(--text-xs)'
            }}
          >
            {page.default_from_unit}
          </div>
          <span style={{ color: 'var(--muted-foreground)' }}>→</span>
          <div
            className="px-2 py-1 rounded"
            style={{
              backgroundColor: 'var(--muted)',
              color: 'var(--foreground)',
              fontSize: 'var(--text-xs)'
            }}
          >
            {page.default_to_unit}
          </div>
        </div>
      )}

      <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-xs)' }}>
        Updated {formatDate(page.updated_at)}
      </p>
    </div>
  );
}