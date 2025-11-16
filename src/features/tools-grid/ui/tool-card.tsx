import { Tool } from '../model/types';
import { truncateText } from '../lib/utils';
import { ToolCardHeader } from './tool-card-header';
import { ToolCardButton } from './tool-card-button';

interface ToolCardProps {
  tool: Tool;
  onAction: (toolId: string) => void;
}

export function ToolCard({ tool, onAction }: ToolCardProps) {
  return (
    <div 
      className="bg-card relative rounded-[24px] w-[calc(50%-12px)] border border-border" 
      style={{ boxShadow: 'var(--elevation-sm)' }}
    >
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[24px] relative size-full">
          {/* Header */}
          <ToolCardHeader title={tool.title} category={tool.category} />

          {/* Description */}
          <p className="relative shrink-0 text-muted-foreground w-full">
            {truncateText(tool.description)}
          </p>

          {/* Action Button */}
          <ToolCardButton onClick={() => onAction(tool.id)} />
        </div>
      </div>
    </div>
  );
}
