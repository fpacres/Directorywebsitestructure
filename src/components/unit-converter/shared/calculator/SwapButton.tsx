import { ArrowsDownUp } from '@phosphor-icons/react';

interface SwapButtonProps {
  onSwap: () => void;
}

export function SwapButton({ onSwap }: SwapButtonProps) {
  return (
    <div className="flex items-center justify-center relative shrink-0 w-full">
      <button
        onClick={onSwap}
        className="flex items-center justify-center p-[12px] rounded-[var(--radius)] transition-colors hover:bg-[var(--muted)]"
        style={{ 
          border: '1px solid var(--border)',
          color: 'var(--accent)'
        }}
        aria-label="Swap units"
      >
        <ArrowsDownUp size={20} weight="bold" />
      </button>
    </div>
  );
}
