import { Copy, Check } from '@phosphor-icons/react';
import { Button } from '../../../../components/ui/button';

interface CalculatorActionsProps {
  onCopy: () => void;
  copied: boolean;
}

export function CalculatorActions({ onCopy, copied }: CalculatorActionsProps) {
  return (
    <div className="box-border flex gap-[12px] items-start relative shrink-0 w-full">
      <Button
        onClick={onCopy}
        className="flex items-center gap-[8px] flex-1"
        style={{
          backgroundColor: copied ? 'var(--accent)' : 'var(--primary)',
          color: copied ? 'var(--accent-foreground)' : 'var(--primary-foreground)',
        }}
      >
        {copied ? (
          <>
            <Check size={20} weight="bold" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy size={20} weight="bold" />
            <span>Copy Result</span>
          </>
        )}
      </Button>
    </div>
  );
}
