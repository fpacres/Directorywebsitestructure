import { Skeleton } from '../ui/skeleton';

export function AuthLoadingSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--background)' }}>
      <div 
        className="w-full max-w-md p-8 rounded-2xl" 
        style={{ 
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--elevation-sm)'
        }}
      >
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-2 text-center">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-5 w-64 mx-auto" />
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-5">
            <div>
              <Skeleton className="h-5 w-16 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-20 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-11 w-full mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
