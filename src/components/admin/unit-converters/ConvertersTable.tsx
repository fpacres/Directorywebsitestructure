import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { projectId } from '../../../utils/supabase/info.tsx';
import { useAuth } from '../../../contexts/AuthContext';
import { ConfirmDialog } from '../../shared/ConfirmDialog';
import { ConverterTableRow } from './table/ConverterTableRow';

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

interface ConvertersTableProps {
  pages: Page[];
  onDeleteSuccess?: () => void;
}

export function ConvertersTable({ pages, onDeleteSuccess }: ConvertersTableProps) {
  const { session } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    pageId: string;
    pageTitle: string;
  }>({
    isOpen: false,
    pageId: '',
    pageTitle: '',
  });

  const handleDeleteClick = (pageId: string, pageTitle: string) => {
    setConfirmDialog({
      isOpen: true,
      pageId,
      pageTitle,
    });
  };

  const handleConfirmDelete = async () => {
    if (!session?.access_token) {
      toast.error('You must be logged in to delete pages');
      return;
    }

    try {
      setDeletingId(confirmDialog.pageId);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/pages/${confirmDialog.pageId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete page');
      }

      toast.success('Page deleted successfully');
      setConfirmDialog({ isOpen: false, pageId: '', pageTitle: '' });
      
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      toast.error('Failed to delete page');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDialog({ isOpen: false, pageId: '', pageTitle: '' });
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Converter Page"
        description={`Are you sure you want to delete "${confirmDialog.pageTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={!!deletingId}
        variant="danger"
      />
      <div
        className="rounded-[var(--radius)] overflow-hidden"
        style={{
          border: '1px solid var(--border)',
          backgroundColor: 'var(--card)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--muted)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <th className="px-6 py-4 text-left" style={{ color: 'var(--foreground)' }}>
                  Title
                </th>
                <th className="px-6 py-4 text-left" style={{ color: 'var(--foreground)' }}>
                  Category
                </th>
                <th className="px-6 py-4 text-left" style={{ color: 'var(--foreground)' }}>
                  Default Units
                </th>
                <th className="px-6 py-4 text-left" style={{ color: 'var(--foreground)' }}>
                  Status
                </th>
                <th className="px-6 py-4 text-left" style={{ color: 'var(--foreground)' }}>
                  Last Updated
                </th>
                <th className="px-6 py-4 text-right" style={{ color: 'var(--foreground)' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page, index) => (
                <ConverterTableRow
                  key={page.id}
                  page={page}
                  isLast={index === pages.length - 1}
                  onDelete={handleDeleteClick}
                  isDeleting={deletingId === page.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
