import { Skeleton } from '../ui/skeleton';

export function CategoryPageSkeleton() {
  return (
    <main className="box-border content-stretch flex flex-col gap-[12px] items-start relative w-full">
      {/* Category Header Skeleton */}
      <div className="bg-card box-border content-stretch flex flex-col gap-[32px] items-start p-[40px] relative rounded-[32px] w-full" style={{ boxShadow: 'var(--elevation-sm)' }}>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </div>

      {/* Main Content Area Skeleton */}
      <div className="bg-card box-border content-stretch flex gap-[40px] items-start p-[40px] relative rounded-[32px] w-full flex-col lg:flex-row" style={{ boxShadow: 'var(--elevation-sm)' }}>
        {/* Sidebar Skeleton */}
        <div className="flex flex-col gap-[24px] w-full lg:w-[280px]">
          <Skeleton className="h-8 w-48" />
          <div className="flex flex-col gap-[8px]">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Tools Grid Skeleton */}
        <div className="flex flex-col gap-[24px] flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px]">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-[16px] p-[24px] rounded-[16px]" style={{ border: '1px solid var(--border)' }}>
                <Skeleton className="h-10 w-10 rounded-[8px]" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
