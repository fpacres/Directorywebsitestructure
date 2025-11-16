import { Icon, CaretRight } from '@phosphor-icons/react';

interface SubItem {
  label: string;
  icon: Icon;
  path: string;
}

interface SidebarNavItemCollapsibleProps {
  label: string;
  icon: Icon;
  subItems: SubItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarNavItemCollapsible({ 
  label, 
  icon: IconComponent, 
  subItems,
  currentPath,
  onNavigate,
  isOpen,
  onToggle
}: SidebarNavItemCollapsibleProps) {
  const isAnySubItemActive = subItems.some(item => currentPath === item.path);
  const isActive = isOpen || isAnySubItemActive;

  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius)] transition-all w-full"
      style={{
        backgroundColor: isActive ? 'var(--sidebar-border)' : 'transparent',
        color: isActive ? 'var(--sidebar-foreground)' : 'var(--sidebar-accent)'
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
      <CaretRight 
        size={16} 
        weight="bold"
        className="ml-auto"
        style={{ 
          color: isActive ? 'var(--sidebar-foreground)' : 'var(--sidebar-accent)'
        }}
      />
    </button>
  );
}