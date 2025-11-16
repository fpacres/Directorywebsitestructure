import { ArrowRight } from '@phosphor-icons/react';

interface RelatedTool {
  id: string;
  title: string;
  slug: string;
  icon?: React.ReactNode;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  if (tools.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[16px] w-full">
      <h3 style={{ color: 'var(--foreground)' }}>Related Converters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        {tools.map((tool) => (
          <a
            key={tool.id}
            href={`/tools/${tool.slug}`}
            className="flex items-center justify-between p-[16px] rounded-[var(--radius)] transition-all hover:shadow-md"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex items-center gap-[12px]">
              {tool.icon && <div style={{ color: 'var(--accent)' }}>{tool.icon}</div>}
              <span style={{ color: 'var(--foreground)', fontSize: 'var(--text-sm)' }}>
                {tool.title}
              </span>
            </div>
            <ArrowRight size={16} weight="bold" style={{ color: 'var(--muted-foreground)' }} />
          </a>
        ))}
      </div>
    </div>
  );
}
