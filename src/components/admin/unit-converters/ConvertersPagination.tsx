import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ConvertersPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export function ConvertersPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: ConvertersPaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className="flex items-center justify-between px-6 py-4 rounded-[var(--radius)]"
      style={{
        border: '1px solid var(--border)',
        backgroundColor: 'var(--card)',
      }}
    >
      <div style={{ color: 'var(--muted-foreground)' }}>
        Showing {startItem} to {endItem} of {totalItems} converters
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-[var(--radius)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            border: '1px solid var(--border)',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
          }}
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className="px-4 py-2 rounded-[var(--radius)] transition-colors min-w-[40px]"
              style={{
                border: '1px solid var(--border)',
                backgroundColor: currentPage === page ? 'var(--primary)' : 'var(--background)',
                color: currentPage === page ? 'var(--primary-foreground)' : 'var(--foreground)',
              }}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="px-2"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {page}
            </span>
          )
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-[var(--radius)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            border: '1px solid var(--border)',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
          }}
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
