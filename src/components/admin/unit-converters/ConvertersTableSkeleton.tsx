/**
 * Skeleton loader for the converters table
 * Displays while data is being fetched from the server
 */
export function ConvertersTableSkeleton() {
  return (
    <div
      className="rounded-[var(--radius)] overflow-hidden"
      style={{
        border: '1px solid var(--border)',
        backgroundColor: 'var(--card)',
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--muted)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <th
                className="px-6 py-4 text-left"
                style={{ color: 'var(--foreground)' }}
              >
                Title
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{ color: 'var(--foreground)' }}
              >
                Category
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{ color: 'var(--foreground)' }}
              >
                Default Units
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{ color: 'var(--foreground)' }}
              >
                Status
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{ color: 'var(--foreground)' }}
              >
                Last Updated
              </th>
              <th
                className="px-6 py-4 text-right"
                style={{ color: 'var(--foreground)' }}
              >
                Actions
              </th>
            </tr>
          </thead>

          {/* Skeleton Rows */}
          <tbody>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonRow key={index} isLast={index === 5} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Individual skeleton row component
 * Represents a single loading converter entry
 */
function SkeletonRow({ isLast }: { isLast: boolean }) {
  return (
    <tr
      style={{
        borderBottom: isLast ? 'none' : '1px solid var(--border)',
      }}
    >
      {/* Title Column */}
      <td className="px-6 py-4">
        <div className="flex flex-col gap-2">
          <SkeletonBar width="180px" height="16px" />
          <SkeletonBar width="120px" height="14px" />
        </div>
      </td>

      {/* Category Column */}
      <td className="px-6 py-4">
        <SkeletonBar width="100px" height="16px" />
      </td>

      {/* Default Units Column */}
      <td className="px-6 py-4">
        <SkeletonBar width="140px" height="16px" />
      </td>

      {/* Status Column */}
      <td className="px-6 py-4">
        <SkeletonBar width="80px" height="24px" rounded="full" />
      </td>

      {/* Last Updated Column */}
      <td className="px-6 py-4">
        <SkeletonBar width="100px" height="16px" />
      </td>

      {/* Actions Column */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <SkeletonBar width="32px" height="32px" />
          <SkeletonBar width="32px" height="32px" />
        </div>
      </td>
    </tr>
  );
}

/**
 * Reusable skeleton bar with shimmer animation
 * Used for individual loading elements within the table
 */
function SkeletonBar({
  width,
  height,
  rounded = 'default',
}: {
  width: string;
  height: string;
  rounded?: 'default' | 'full';
}) {
  return (
    <div
      className="animate-pulse"
      style={{
        width,
        height,
        backgroundColor: 'var(--muted)',
        borderRadius: rounded === 'full' ? '9999px' : 'var(--radius)',
      }}
    />
  );
}
