import { Tool } from '../model/types';
import { ToolCard } from './tool-card';

interface ToolsGridProps {
  tools: Tool[];
  onLearnMore?: (toolId: string) => void;
}

export default function ToolsGrid({ tools, onLearnMore }: ToolsGridProps) {
  const handleToolAction = (toolId: string) => {
    onLearnMore?.(toolId);
  };

  return (
    <div className="content-stretch flex flex-wrap gap-[24px] items-start relative shrink-0 w-full">
      {tools.map(tool => (
        <ToolCard 
          key={tool.id} 
          tool={tool} 
          onAction={handleToolAction} 
        />
      ))}
    </div>
  );
}
