import { ReactNode } from 'react';

interface CalculatorFrameProps {
  children: ReactNode;
}

export function CalculatorFrame({ children }: CalculatorFrameProps) {
  return (
    <div 
      className="relative rounded-[var(--radius-card)] shrink-0 w-full"
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--elevation-sm)',
      }}
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
          {children}
        </div>
      </div>
    </div>
  );
}