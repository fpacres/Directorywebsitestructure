import { PencilSimple, ArrowSquareOut, Trash } from '@phosphor-icons/react';
import { navigate } from '../../../../shared/utils/navigation';

interface Page {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  default_from_unit?: string;
  default_to_unit?: string;
  published: boolean;
  updated_at: string;
}

interface ConverterTableRowProps {
  page: Page;
  isLast: boolean;
  onDelete: (id: string, title: string) => void;
  isDeleting: boolean;
}

export function ConverterTableRow({ page, isLast, onDelete, isDeleting }: ConverterTableRowProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <tr
      style={{
        borderBottom: !isLast ? '1px solid var(--border)' : 'none',
      }}
    >
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <span style={{ color: 'var(--foreground)' }}>{page.title}</span>
          <span
            className="text-sm"
            style={{ color: 'var(--muted-foreground)' }}
          >
            /{page.slug}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span style={{ color: 'var(--foreground)' }}>{page.category}</span>
      </td>
      <td className="px-6 py-4">
        {page.default_from_unit && page.default_to_unit ? (
          <span style={{ color: 'var(--foreground)' }}>
            {page.default_from_unit} → {page.default_to_unit}
          </span>
        ) : (
          <span style={{ color: 'var(--muted-foreground)' }}>Not set</span>
        )}
      </td>
      <td className="px-6 py-4">
        <span
          className="px-3 py-1 rounded-full text-sm inline-block"
          style={{
            backgroundColor: page.published
              ? 'var(--success-background)'
              : 'var(--muted)',
            color: page.published
              ? 'var(--success-foreground)'
              : 'var(--muted-foreground)',
          }}
        >
          {page.published ? 'Published' : 'Draft'}
        </span>
      </td>
      <td className="px-6 py-4">
        <span style={{ color: 'var(--muted-foreground)' }}>
          {formatDate(page.updated_at)}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => navigate(`/admin/unit-converters/edit/${page.id}`)}
            className="p-2 rounded-[var(--radius)] transition-colors"
            style={{ color: 'var(--foreground)' }}
            title="Edit"
          >
            <PencilSimple className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(`/tools/${page.slug}`)}
            className="p-2 rounded-[var(--radius)] transition-colors"
            style={{ color: 'var(--foreground)' }}
            title="View"
          >
            <ArrowSquareOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(page.id, page.title)}
            className="p-2 rounded-[var(--radius)] transition-colors"
            style={{ color: 'var(--foreground)' }}
            title="Delete"
            disabled={isDeleting}
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
