import { MagnifyingGlass } from '@phosphor-icons/react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 w-full gap-4 max-h-[400px]">
      <div className="flex flex-col items-center gap-2">
        <div className="size-12 flex items-center justify-center rounded-full bg-muted">
          {icon || <MagnifyingGlass size={24} className="text-muted-foreground" weight="regular" />}
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-foreground font-medium">{title}</h3>
          <p className="text-muted-foreground text-center max-w-[320px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}