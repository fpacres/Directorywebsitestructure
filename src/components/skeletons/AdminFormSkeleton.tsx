import { Skeleton } from '../ui/skeleton';

export function AdminFormSkeleton() {
  return (
    <div className="flex flex-col gap-8 mx-auto" style={{ maxWidth: '1200px' }}>
      {/* Header Skeleton */}
      <div className="flex items-center justify-between pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Form Sections Skeleton */}
      <div className="flex flex-col gap-6">
        {/* Basic Info Card */}
        <div className="rounded-lg p-6" style={{ border: '1px solid var(--border)', background: 'var(--card)' }}>
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="flex flex-col gap-4">
            <div>
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        {/* SEO Card */}
        <div className="rounded-lg p-6" style={{ border: '1px solid var(--border)', background: 'var(--card)' }}>
          <Skeleton className="h-8 w-56 mb-6" />
          <div className="flex flex-col gap-4">
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-28 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="rounded-lg p-6" style={{ border: '1px solid var(--border)', background: 'var(--card)' }}>
          <Skeleton className="h-8 w-40 mb-6" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
