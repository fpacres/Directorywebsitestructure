interface FilterItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function FilterItem({ label, isActive, onClick }: FilterItemProps) {
  return (
    <div
      onClick={onClick}
      className={`box-border content-stretch flex flex-col items-start justify-center overflow-clip px-[16px] relative rounded-[12px] shrink-0 w-full h-[44px] cursor-pointer transition-colors ${
        isActive ? 'bg-muted' : 'hover:bg-muted/30'
      }`}
    >
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className={isActive ? 'text-foreground' : 'text-muted-foreground'}>
          {label}
        </p>
      </div>
    </div>
  );
}
