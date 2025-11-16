import { Icon } from '@phosphor-icons/react';
import { navigate } from '../../../shared/utils/navigation';

interface SidebarNavItemProps {
  label: string;
  icon: Icon;
  path: string;
  badge?: string;
  isActive: boolean;
  onNavigate: (path: string) => void;
}

export function SidebarNavItem({ 
  label, 
  icon: IconComponent, 
  path, 
  badge, 
  isActive,
  onNavigate 
}: SidebarNavItemProps) {
  return (
    <button
      onClick={() => onNavigate(path)}
      className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius)] transition-all w-full"
      style={{
        backgroundColor: isActive ? 'var(--sidebar-primary)' : 'transparent',
        color: isActive ? 'var(--sidebar-primary-foreground)' : 'var(--sidebar-accent)'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'var(--sidebar-border)';
          e.currentTarget.style.color = 'var(--sidebar-foreground)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--sidebar-accent)';
        }
      }}
    >
      <IconComponent size={20} weight={isActive ? 'fill' : 'regular'} />
      <span>{label}</span>
      {badge && (
        <span
          className="ml-auto px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: 'var(--brand-red)',
            color: 'var(--grayscale-0)',
            fontSize: 'var(--text-xs)'
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
