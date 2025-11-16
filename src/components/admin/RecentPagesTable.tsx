import { PageTableRow } from './dashboard/PageTableRow';

// Mock data - will be replaced with real data from API
const mockData = [
  {
    id: '1',
    title: 'Length Unit Converter',
    category: 'Digital Tools',
    subcategory: 'Unit Converter',
    status: 'published',
    lastModified: '2024-01-15',
  },
  {
    id: '2',
    title: 'Feet to CM Converter',
    category: 'Digital Tools',
    subcategory: 'Unit Converter',
    status: 'Published',
    updated_at: '2025-11-14T15:20:00Z'
  },
  {
    id: '3',
    title: 'Miles to KM Converter',
    category: 'Digital Tools',
    subcategory: 'Unit Converter',
    status: 'Draft',
    updated_at: '2025-11-13T09:15:00Z'
  },
];

export function RecentPagesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
            <th className="text-left py-3 px-4" style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
              Title
            </th>
            <th className="text-left py-3 px-4 hidden md:table-cell" style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
              Category
            </th>
            <th className="text-left py-3 px-4 hidden lg:table-cell" style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
              Status
            </th>
            <th className="text-left py-3 px-4 hidden sm:table-cell" style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
              Updated
            </th>
            <th className="text-right py-3 px-4" style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((page) => (
            <PageTableRow key={page.id} page={page} />
          ))}
        </tbody>
      </table>
    </div>
  );
}