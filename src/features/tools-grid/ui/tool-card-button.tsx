import { ArrowRight } from '@phosphor-icons/react';

interface ToolCardButtonProps {
  onClick: () => void;
}

export function ToolCardButton({ onClick }: ToolCardButtonProps) {
  return (
    <div 
      className="bg-card h-[48px] relative rounded-[14px] shrink-0 w-full border border-border" 
      style={{ boxShadow: 'var(--elevation-sm)' }}
    >
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <button
          onClick={onClick}
          className="box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center px-[16px] py-[12px] relative w-full cursor-pointer hover:bg-muted/30 transition-colors rounded-[14px]"
          style={{ background: 'transparent', border: 'none' }}
        >
          <p className="relative shrink-0 text-foreground text-nowrap whitespace-pre">
            Use Tool
          </p>
          <ArrowRight size={20} className="text-foreground" weight="regular" />
        </button>
      </div>
    </div>
  );
}
