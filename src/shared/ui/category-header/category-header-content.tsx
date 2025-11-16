interface CategoryHeaderContentProps {
  categoryName: string;
  description: string;
}

export function CategoryHeaderContent({ categoryName, description }: CategoryHeaderContentProps) {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <div className="box-border content-stretch flex gap-[80px] items-center justify-center overflow-clip p-[40px] sm:p-[60px] lg:p-[104px] relative w-full">
        <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
          <div className="basis-0 content-stretch flex flex-col gap-[20px] grow h-full items-center min-h-px min-w-px relative shrink-0">
            {/* Title */}
            <h1 style={{ color: 'var(--grayscale-0)', textAlign: 'center', fontSize: 'var(--text-xl)' }}>
              {categoryName}
            </h1>

            {/* Description */}
            <p className="leading-[1.5] not-italic relative shrink-0 text-white text-center tracking-[-0.36px] max-w-[506px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}