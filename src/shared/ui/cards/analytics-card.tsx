import { ChartLine } from 'phosphor-react';

export default function AnalyticsCard() {
  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-card)] p-6 shadow-[var(--elevation-sm)] w-[140px]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
          <ChartLine size={20} weight="regular" color="var(--accent)" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[var(--muted-foreground)] text-[var(--text-xs)]">
          Total
        </p>
        <p className="text-[var(--foreground)]">5,089</p>
        <p className="text-[var(--chart-3)] text-[var(--text-xs)]">
          ↑ 29.90%
        </p>
      </div>
    </div>
  );
}
