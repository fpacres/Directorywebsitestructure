import { Skeleton } from '../ui/skeleton';

export function ToolsGridSkeleton() {
  return (
    <div className="content-stretch flex flex-wrap gap-[24px] items-start relative shrink-0 w-full">
      {[1, 2, 3, 4].map((index) => (
        <div 
          key={index} 
          className="bg-card relative rounded-[24px] w-[calc(50%-12px)] border border-border" 
          style={{ boxShadow: 'var(--elevation-sm)' }}
        >
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[24px] relative size-full">
              {/* Header */}
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                <Skeleton className="rounded-[16px] shrink-0 size-[52px]" />
                <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
                  <Skeleton className="h-[20px] w-[60%]" />
                  <Skeleton className="h-[16px] w-[40%]" />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-[8px] w-full">
                <Skeleton className="h-[16px] w-full" />
                <Skeleton className="h-[16px] w-full" />
                <Skeleton className="h-[16px] w-[80%]" />
              </div>

              {/* Button */}
              <Skeleton className="h-[48px] w-full rounded-[14px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
