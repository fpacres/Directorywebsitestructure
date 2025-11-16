import { SquaresFour } from '@phosphor-icons/react';

interface CategoryHeaderBadgeProps {
  label: string;
}

export function CategoryHeaderBadge({ label }: CategoryHeaderBadgeProps) {
  return (
    <div className="bg-white h-[28px] relative rounded-[8px] shrink-0">
      <div className="box-border content-stretch flex gap-[6px] h-[28px] items-center justify-center overflow-clip pl-[8px] pr-[10px] py-[8px] relative rounded-[inherit]">
        <SquaresFour size={16} weight="regular" style={{ color: '#666d80' }} />
        <p className="leading-[1.6] not-italic relative shrink-0 text-[#666d80] text-center text-nowrap tracking-[-0.28px] whitespace-pre">
          {label}
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dfe1e7] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)]" />
    </div>
  );
}
