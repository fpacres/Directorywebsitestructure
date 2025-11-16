import { ReactNode } from 'react';

interface SettingsSectionCardProps {
  title: string;
  description?: string | ReactNode;
  action?: ReactNode;
  badge?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function SettingsSectionCard({ 
  title, 
  description, 
  action,
  badge,
  icon,
  children 
}: SettingsSectionCardProps) {
  return (
    <div
      className="rounded-[var(--radius-card)] p-8 border"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)'
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <div style={{ color: 'var(--accent)' }}>
                {icon}
              </div>
            )}
            <h3 style={{ color: 'var(--foreground)' }}>{title}</h3>
            {badge && (
              <span 
                className="px-2 py-0.5 rounded-[var(--radius)]"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                {badge}
              </span>
            )}
          </div>
          {description && (
            <div style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
              {description}
            </div>
          )}
        </div>
        {action && <div className="ml-4">{action}</div>}
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}