import { navigate } from '../../../shared/utils/navigation';
import { PencilSimple, Eye } from '@phosphor-icons/react';

interface PageTableRowProps {
  page: {
    id: string;
    title: string;
    category: string;
    subcategory: string;
    status: string;
    updated_at: string;
  };
}

export function PageTableRow({ page }: PageTableRowProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <tr
      className="border-b transition-colors cursor-pointer"
      style={{ borderColor: 'var(--border)' }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      onClick={() => navigate(`/admin/unit-converters/${page.id}`)}
    >
      <td className="py-4 px-4">
        <p style={{ color: 'var(--foreground)' }}>{page.title}</p>
        <p className="md:hidden" style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-xs)' }}>
          {page.subcategory}
        </p>
      </td>
      <td className="py-4 px-4 hidden md:table-cell">
        <div
          className="inline-flex px-3 py-1 rounded-full"
          style={{
            backgroundColor: 'var(--muted)',
            color: 'var(--muted-foreground)',
            fontSize: 'var(--text-xs)'
          }}
        >
          {page.subcategory}
        </div>
      </td>
      <td className="py-4 px-4 hidden lg:table-cell">
        <div
          className="inline-flex px-3 py-1 rounded-full"
          style={{
            backgroundColor: page.status === 'Published' ? 'var(--brand-teal)15' : 'var(--brand-orange)15',
            color: page.status === 'Published' ? 'var(--brand-teal)' : 'var(--brand-orange)',
            fontSize: 'var(--text-xs)'
          }}
        >
          {page.status}
        </div>
      </td>
      <td className="py-4 px-4 hidden sm:table-cell" style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
        {formatDate(page.updated_at)}
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/unit-converters/${page.id}`);
            }}
            className="p-2 rounded-[var(--radius)] transition-colors"
            style={{ color: 'var(--muted-foreground)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent)15';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--muted-foreground)';
            }}
          >
            <PencilSimple size={18} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-[var(--radius)] transition-colors"
            style={{ color: 'var(--muted-foreground)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent)15';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--muted-foreground)';
            }}
          >
            <Eye size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
