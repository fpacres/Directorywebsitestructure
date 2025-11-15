import { FileText } from '@phosphor-icons/react';
import imgToolNameHeader from "figma:asset/974ed41b38c8036ad37cb7df9603a15b873551fa.png";

interface ToolHeaderProps {
  categoryName: string;
  title: string;
  description: string;
}

export function ToolHeader({ categoryName, title, description }: ToolHeaderProps) {
  return (
    <div className="box-border content-stretch flex gap-[80px] items-center justify-center overflow-clip px-[104px] py-[56px] relative rounded-[32px] shadow-[0px_4px_8px_-1px_rgba(13,13,18,0.02)] shrink-0 w-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
        <div className="absolute bg-white inset-0 rounded-[32px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[32px]">
          <img alt="" className="absolute h-[113.05%] left-0 max-w-none top-0 w-full" src={imgToolNameHeader} />
        </div>
      </div>
      
      <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-center min-h-px min-w-px relative shrink-0">
        <CategoryBadge categoryName={categoryName} />
        <TitleSection title={title} description={description} />
      </div>
    </div>
  );
}

function CategoryBadge({ categoryName }: { categoryName: string }) {
  return (
    <div className="backdrop-blur-[10px] backdrop-filter bg-[rgba(255,255,255,0.1)] h-[28px] relative rounded-[8px] shrink-0">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[24px] py-[16px] relative">
          <FileText size={16} className="text-white shrink-0" />
          <p className="font-normal leading-[1.6] not-italic relative shrink-0 text-center text-nowrap text-white tracking-[-0.28px] whitespace-pre">
            {categoryName}
          </p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)]" />
    </div>
  );
}

function TitleSection({ title, description }: { title: string; description: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start font-normal not-italic relative shrink-0 text-center text-white w-full">
      <h1 className="leading-[1.25] relative shrink-0 tracking-[-1.44px] w-full text-[32px]">{title}</h1>
      <p className="leading-[1.5] relative shrink-0 tracking-[-0.32px] w-full">{description}</p>
    </div>
  );
}