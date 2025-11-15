export function RevenueCard() {
  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-card)] p-6 shadow-[var(--elevation-sm)] w-[180px]">
      <p className="text-[var(--muted-foreground)] text-[var(--text-xs)] mb-2">
        Revenue per month
      </p>
      <p className="text-[var(--foreground)] mb-4">$4,567</p>
      <div className="w-full h-20 relative">
        {/* Simple chart representation */}
        <svg width="100%" height="100%" viewBox="0 0 100 40">
          <path
            d="M0,30 Q20,25 40,20 T80,10"
            fill="none"
            stroke="var(--chart-2)"
            strokeWidth="2"
          />
          <path
            d="M0,35 Q20,32 40,28 T80,20"
            fill="none"
            stroke="var(--chart-1)"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}
