import { Icon } from '@phosphor-icons/react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: Icon;
  color: string;
}

export function StatsCard({ title, value, change, icon: IconComponent, color }: StatsCardProps) {
  return (
    <div
      className="rounded-[var(--radius-card)] p-6 border"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--elevation-sm)'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-[var(--radius)] flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <IconComponent size={24} style={{ color }} weight="bold" />
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
          {title}
        </p>
        <h2 style={{ color: 'var(--foreground)' }}>
          {value}
        </h2>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-xs)' }}>
          {change}
        </p>
      </div>
    </div>
  );
}
