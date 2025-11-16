import { useState } from 'react';
import { Button } from '../../ui/button';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export function DatabaseManagementSection() {
  const [isReseeding, setIsReseeding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [pageCount, setPageCount] = useState<number | null>(null);

  const handleReseedDatabase = async () => {
    if (!confirm('This will overwrite all existing pages with fresh seed data. Are you sure?')) {
      return;
    }

    setIsReseeding(true);
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/seed?force=true`;
      console.log('Attempting to reseed database at:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${responseText}`);
      }

      const result = JSON.parse(responseText);
      
      toast.success('Database reseeded successfully', {
        description: `${result.count} pages have been reseeded.`,
      });

      // Refresh the page to show updated data
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error reseeding database:', error);
      toast.error('Failed to reseed database', {
        description: error instanceof Error ? error.message : 'Please check the console for more details.',
      });
    } finally {
      setIsReseeding(false);
    }
  };

  const handleDeleteAllPages = async () => {
    if (!confirm('This will permanently delete ALL pages from the database. This action cannot be undone. Are you sure?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        toast.error('Not authenticated', {
          description: 'Please log in to perform this action.',
        });
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/pages/all`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete pages');
      }

      const result = await response.json();
      
      toast.success('All pages deleted', {
        description: `${result.deletedCount} pages have been removed.`,
      });

      // Clear the page count
      setPageCount(0);

      // Refresh the page
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error deleting pages:', error);
      toast.error('Failed to delete pages', {
        description: 'Please check the console for more details.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleVerifyDatabase = async () => {
    setIsVerifying(true);
    setPageCount(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/debug/kv`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch database info');
      }

      const result = await response.json();
      const count = result.pageCount || 0;
      
      setPageCount(count);
      
      if (count === 0) {
        toast.success('Database is empty', {
          description: 'No pages found in the database.',
        });
      } else {
        toast.info(`Database contains ${count} page${count === 1 ? '' : 's'}`, {
          description: `Found ${count} page${count === 1 ? '' : 's'} in the database.`,
        });
      }
    } catch (error) {
      console.error('Error verifying database:', error);
      toast.error('Failed to verify database', {
        description: 'Please check the console for more details.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-8 bg-card rounded-[24px]" style={{ boxShadow: 'var(--elevation-sm)' }}>
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-foreground">Database Management</h2>
        <p className="text-muted-foreground">
          Manage your database with these administrative tools. Use with caution.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4">
        {/* Reseed Database */}
        <div className="flex flex-col gap-3 p-6 bg-muted/30 rounded-[16px]">
          <div className="flex flex-col gap-1">
            <h3 className="text-foreground">Reseed Database</h3>
            <p className="text-muted-foreground">
              Reset all pages to the default seed data. This will overwrite any existing pages with the latest seed values.
            </p>
          </div>
          <div>
            <Button
              onClick={handleReseedDatabase}
              disabled={isReseeding}
              variant="default"
            >
              {isReseeding ? 'Reseeding...' : 'Reseed Database'}
            </Button>
          </div>
        </div>

        {/* Delete All Pages */}
        <div className="flex flex-col gap-3 p-6 bg-destructive/10 rounded-[16px]">
          <div className="flex flex-col gap-1">
            <h3 className="text-destructive">Delete All Pages</h3>
            <p className="text-muted-foreground">
              Permanently delete all pages from the database. This action cannot be undone.
            </p>
          </div>
          <div>
            <Button
              onClick={handleDeleteAllPages}
              disabled={isDeleting}
              variant="destructive"
            >
              {isDeleting ? 'Deleting...' : 'Delete All Pages'}
            </Button>
          </div>
        </div>

        {/* Verify Database */}
        <div className="flex flex-col gap-3 p-6 bg-muted/30 rounded-[16px]">
          <div className="flex flex-col gap-1">
            <h3 className="text-foreground">Verify Database</h3>
            <p className="text-muted-foreground">
              Check the current number of pages in the database.
            </p>
          </div>
          <div>
            <Button
              onClick={handleVerifyDatabase}
              disabled={isVerifying}
              variant="default"
            >
              {isVerifying ? 'Verifying...' : 'Verify Database'}
            </Button>
          </div>
          {pageCount !== null && (
            <p className="text-muted-foreground">
              Current page count: {pageCount}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}