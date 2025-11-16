export default function NotificationCard() {
  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-card)] p-4 shadow-[var(--elevation-sm)] w-[240px]">
      <div className="flex items-center gap-1 mb-3">
        <div className="w-2 h-2 rounded-full bg-[var(--destructive)]"></div>
        <div className="w-2 h-2 rounded-full bg-[var(--chart-4)]"></div>
        <div className="w-2 h-2 rounded-full bg-[var(--chart-3)]"></div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[var(--destructive)]"></div>
            <span className="text-[var(--text-xs)]">Users newly onboarded</span>
          </div>
          <span className="text-[var(--muted-foreground)] text-[var(--text-xs)]">
            2 days ago
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[var(--chart-4)]"></div>
            <span className="text-[var(--text-xs)]">Made an purchase</span>
          </div>
          <span className="text-[var(--muted-foreground)] text-[var(--text-xs)]">
            5 days ago
          </span>
        </div>
      </div>
    </div>
  );
}
