import { ArrowRight } from '@phosphor-icons/react';

interface Tool {
  id: string;
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
}

interface ToolsGridProps {
  tools: Tool[];
  onLearnMore?: (toolId: string) => void;
}

export default function ToolsGrid({ tools, onLearnMore }: ToolsGridProps) {
  // Truncate description to 180-200 characters
  const truncateDescription = (desc: string) => {
    if (desc.length <= 200) return desc;
    const truncated = desc.substring(0, 200);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 180 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  return (
    <div className="content-stretch flex flex-wrap gap-[24px] items-start relative shrink-0 w-full">
      {tools.map(tool => (
        <div key={tool.id} className="bg-card relative rounded-[24px] w-[calc(50%-12px)] border border-border" style={{ boxShadow: 'var(--elevation-sm)' }}>
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[24px] relative size-full">
              {/* Header */}
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                <div className="rounded-[16px] shrink-0 size-[52px]">
                  {tool.icon}
                </div>
                <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
                  <p className="relative shrink-0 text-foreground w-full">{tool.title}</p>
                  <p className="relative shrink-0 text-muted-foreground w-full">{tool.category}</p>
                </div>
              </div>

              {/* Description */}
              <p className="relative shrink-0 text-muted-foreground w-full">
                {truncateDescription(tool.description)}
              </p>

              {/* Button */}
              <div className="bg-card h-[48px] relative rounded-[14px] shrink-0 w-full border border-border" style={{ boxShadow: 'var(--elevation-sm)' }}>
                <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                  <button
                    onClick={() => onLearnMore?.(tool.id)}
                    className="box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center px-[16px] py-[12px] relative w-full cursor-pointer hover:bg-muted/30 transition-colors rounded-[14px]"
                    style={{ background: 'transparent', border: 'none' }}
                  >
                    <p className="relative shrink-0 text-foreground text-nowrap whitespace-pre">Learn More</p>
                    <ArrowRight size={20} className="text-foreground" weight="regular" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}