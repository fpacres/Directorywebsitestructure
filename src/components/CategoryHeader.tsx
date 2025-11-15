import { SquaresFour } from '@phosphor-icons/react';
import imgCategoryPageHeader from "figma:asset/974ed41b38c8036ad37cb7df9603a15b873551fa.png";

interface CategoryHeaderProps {
  badge: string;
  title: string;
  description: string;
}

export default function CategoryHeader({ badge, title, description }: CategoryHeaderProps) {
  return (
    <div className="relative rounded-[32px] w-full shadow-[0px_4px_8px_-1px_rgba(13,13,18,0.02)]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
        <div className="absolute bg-white inset-0 rounded-[32px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[32px]">
          <img alt="" className="absolute h-[113.05%] left-0 max-w-none top-0 w-full" src={imgCategoryPageHeader} />
        </div>
      </div>
      
      <div className="flex flex-row items-center justify-center w-full">
        <div className="box-border content-stretch flex gap-[80px] items-center justify-center overflow-clip p-[40px] sm:p-[60px] lg:p-[104px] relative w-full">
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <div className="basis-0 content-stretch flex flex-col gap-[20px] grow h-full items-center min-h-px min-w-px relative shrink-0">
              {/* Badge */}
              <div className="bg-white h-[28px] relative rounded-[8px] shrink-0">
                <div className="box-border content-stretch flex gap-[6px] h-[28px] items-center justify-center overflow-clip pl-[8px] pr-[10px] py-[8px] relative rounded-[inherit]">
                  <SquaresFour size={16} weight="regular" style={{ color: '#666d80' }} />
                  <p className="leading-[1.6] not-italic relative shrink-0 text-[#666d80] text-[14px] text-center text-nowrap tracking-[-0.28px] whitespace-pre">
                    {badge}
                  </p>
                </div>
                <div aria-hidden="true" className="absolute border border-[#dfe1e7] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)]" />
              </div>

              {/* Title */}
              <h1 className="leading-[1.25] min-w-full not-italic relative shrink-0 text-white text-[40px] sm:text-[52px] lg:text-[64px] text-center tracking-[-0.64px] w-[min-content]">
                {title}
              </h1>

              {/* Description */}
              <p className="leading-[1.5] not-italic relative shrink-0 text-white text-[16px] sm:text-[18px] text-center tracking-[-0.36px] max-w-[506px]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}