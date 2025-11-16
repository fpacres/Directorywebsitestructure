import { ArrowCounterClockwise } from '@phosphor-icons/react';

interface CalculatorHeaderProps {
  title?: string;
  onReset: () => void;
}

export function CalculatorHeader({ title = 'Calculator', onReset }: CalculatorHeaderProps) {
  return (
    <div className="box-border flex items-center justify-between relative shrink-0 w-full">
      <h4 style={{ color: 'var(--foreground)' }}>
        {title}
      </h4>
      <button
        onClick={onReset}
        className="flex items-center gap-[8px] px-[12px] py-[6px] rounded-[var(--radius)] transition-colors hover:bg-[var(--muted)]"
        style={{ color: 'var(--muted-foreground)' }}
      >
        <ArrowCounterClockwise size={16} weight="bold" />
        <span style={{ fontSize: 'var(--text-sm)' }}>Reset</span>
      </button>
    </div>
  );
}