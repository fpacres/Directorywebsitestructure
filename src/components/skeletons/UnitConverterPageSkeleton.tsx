import { Skeleton } from '../ui/skeleton';

export function UnitConverterPageSkeleton() {
  return (
    <main className="box-border content-stretch flex flex-col gap-[12px] items-start relative w-full">
      {/* Tool Header Skeleton */}
      <div className="bg-card box-border content-stretch flex flex-col gap-[32px] items-start p-[40px] relative rounded-[32px] w-full" style={{ boxShadow: 'var(--elevation-sm)' }}>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="bg-card box-border content-stretch flex gap-[40px] items-start p-[40px] relative rounded-[32px] w-full flex-col lg:flex-row" style={{ boxShadow: 'var(--elevation-sm)' }}>
        {/* Calculator Skeleton */}
        <div className="flex flex-col gap-[24px] w-full lg:w-[480px]">
          <Skeleton className="h-10 w-full" />
          <div className="flex flex-col gap-[16px]">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-12 mx-auto rounded-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="h-16 w-full" />
        </div>

        {/* Content Area Skeleton */}
        <div className="flex flex-col gap-[40px] flex-1 w-full">
          {/* Description Section Skeleton */}
          <div className="flex flex-col gap-[24px]">
            <Skeleton className="h-8 w-48" />
            <div className="flex flex-col gap-[12px]">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* FAQ Section Skeleton */}
          <div className="flex flex-col gap-[24px]">
            <Skeleton className="h-8 w-64" />
            <div className="flex flex-col gap-[16px]">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>

          {/* Related Tools Skeleton */}
          <div className="flex flex-col gap-[24px]">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
