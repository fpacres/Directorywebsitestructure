interface RelatedToolsProps {
  tools: string[];
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  return (
    <div className="bg-white relative rounded-[24px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
          <h3 className="font-normal leading-[1.3] not-italic relative shrink-0 text-[#0d0d12] tracking-[-0.72px] w-full">
            Related Digital Tools
          </h3>
          
          <Divider />
          
          <ToolsList tools={tools} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dfe1e7] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_8px_-1px_rgba(13,13,18,0.02)]" />
    </div>
  );
}

function Divider() {
  return (
    <div className="h-0 relative shrink-0 w-full">
      <div className="absolute inset-[-0.5px_-0.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 517 1">
          <path d="M0.5 0.5H516.5" stroke="#DFE1E7" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function ToolsList({ tools }: { tools: string[] }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start leading-[1.5] not-italic relative shrink-0 text-[#0d0d12] w-full">
      {tools.map((tool, index) => (
        <a
          key={index}
          href="#"
          className="relative shrink-0 w-full hover:text-[var(--accent)] transition-colors"
        >
          {tool}
        </a>
      ))}
    </div>
  );
}
