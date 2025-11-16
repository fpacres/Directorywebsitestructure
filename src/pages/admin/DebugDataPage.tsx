import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { projectId, publicAnonKey } from '../../utils/supabase/info.tsx';

export default function DebugDataPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDebugData();
  }, []);

  const fetchDebugData = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/pages`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error('Error fetching debug data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 style={{ color: 'var(--foreground)' }}>Debug Database Data</h1>
          <p style={{ color: 'var(--muted-foreground)' }}>
            View all pages in the database
          </p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div 
            className="p-6 rounded-[var(--radius-card)]"
            style={{ 
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)'
            }}
          >
            <h2 className="mb-4" style={{ color: 'var(--foreground)' }}>
              All Pages ({data?.pages?.length || 0})
            </h2>
            <pre 
              className="overflow-auto p-4 rounded-lg"
              style={{ 
                backgroundColor: 'var(--muted)',
                fontSize: '12px',
                maxHeight: '600px'
              }}
            >
              {JSON.stringify(data?.pages?.map((p: any) => ({
                id: p.id,
                title: p.title,
                slug: p.slug,
                category: p.category,
                subcategory: p.subcategory,
                subcategory_display_name: p.subcategory_display_name,
                published: p.published
              })), null, 2)}
            </pre>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
