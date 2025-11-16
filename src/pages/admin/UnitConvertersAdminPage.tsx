import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ConvertersHeader } from '../../components/admin/unit-converters/ConvertersHeader';
import { ConvertersSearch } from '../../components/admin/unit-converters/ConvertersSearch';
import { ConvertersTable } from '../../components/admin/unit-converters/ConvertersTable';
import { ConvertersTableSkeleton } from '../../components/admin/unit-converters/ConvertersTableSkeleton';
import { ConvertersPagination } from '../../components/admin/unit-converters/ConvertersPagination';
import { ConvertersEmptyState } from '../../components/admin/unit-converters/ConvertersEmptyState';
import { projectId, publicAnonKey } from '../../utils/supabase/info.tsx';
import { toast } from 'sonner@2.0.3';

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

const ITEMS_PER_PAGE = 15;

export default function UnitConvertersAdminPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/pages?subcategory=length-unit-converter`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }

      const data = await response.json();
      setPages(data.pages || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast.error('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPages = filteredPages.slice(startIndex, endIndex);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        {/* Header with action buttons */}
        <ConvertersHeader 
          onRefresh={fetchPages} 
          isEmpty={!loading && pages.length === 0}
        />
        
        {/* Search input */}
        <ConvertersSearch value={searchQuery} onChange={handleSearchChange} />

        {/* Content area - loading, empty, or table */}
        {loading ? (
          <ConvertersTableSkeleton />
        ) : filteredPages.length === 0 ? (
          <ConvertersEmptyState hasSearchQuery={!!searchQuery} />
        ) : (
          <>
            <ConvertersTable pages={paginatedPages} onDeleteSuccess={fetchPages} />
            <ConvertersPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredPages.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
}