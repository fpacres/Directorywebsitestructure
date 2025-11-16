import { ArrowLeft, Eye, ArrowSquareOut, DotsThree, Trash } from '@phosphor-icons/react';
import { navigate } from '../../../shared/utils/navigation';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';

interface ConverterFormHeaderProps {
  isEditMode: boolean;
  onPublish: () => void;
  onSaveDraft: () => void;
  onDelete?: () => void;
  loading: boolean;
  slug?: string;
  published?: boolean;
}

export function ConverterFormHeader({ isEditMode, onPublish, onSaveDraft, onDelete, loading, slug, published }: ConverterFormHeaderProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/unit-converters')}
            className="flex items-center justify-center w-10 h-10 rounded-[var(--radius)] transition-colors"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card)'}
          >
            <ArrowLeft size={20} weight="bold" />
          </button>
          
          <div>
            <h2 style={{ color: 'var(--foreground)' }}>
              {isEditMode ? 'Edit Converter' : 'Create New Converter'}
            </h2>
            <p style={{ color: 'var(--muted-foreground)' }}>
              {isEditMode ? 'Update converter details and settings' : 'Add a new unit converter to your directory'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {slug && (
            <button
              onClick={() => navigate(published ? `/tools/${slug}` : `/admin/unit-converters/${slug}/preview`)}
              className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] transition-colors"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card)'}
            >
              {published ? (
                <>
                  <ArrowSquareOut size={18} weight="bold" />
                  <span>View Page</span>
                </>
              ) : (
                <>
                  <Eye size={18} weight="bold" />
                  <span>Preview</span>
                </>
              )}
            </button>
          )}
          
          <button
            onClick={onSaveDraft}
            disabled={loading}
            className="px-6 py-2 rounded-[var(--radius-button)] transition-colors whitespace-nowrap"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
              opacity: loading ? 0.5 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = 'var(--muted)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = 'var(--card)')}
          >
            Save as Draft
          </button>
          
          <button
            onClick={onPublish}
            disabled={loading}
            className="px-6 py-2 rounded-[var(--radius-button)] transition-opacity whitespace-nowrap"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              opacity: loading ? 0.5 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.opacity = '1')}
          >
            {loading ? 'Saving...' : 'Publish'}
          </button>

          {isEditMode && onDelete && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-[var(--radius)] transition-colors"
                  style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card)'}
                >
                  <DotsThree size={20} weight="bold" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-[var(--destructive)]"
                >
                  <Trash size={16} weight="bold" className="mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Converter</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this converter? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowDeleteDialog(false);
                onDelete?.();
              }}
              style={{
                backgroundColor: 'var(--destructive)',
                color: 'var(--destructive-foreground)',
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}