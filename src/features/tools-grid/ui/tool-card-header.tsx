interface ToolCardHeaderProps {
  title: string;
  category: string;
}

export function ToolCardHeader({ title, category }: ToolCardHeaderProps) {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
        <p className="relative shrink-0 text-foreground w-full">{title}</p>
        <p className="relative shrink-0 text-muted-foreground w-full">{category}</p>
      </div>
    </div>
  );
}
