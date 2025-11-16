import { List, X } from '@phosphor-icons/react';

interface SidebarMobileToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarMobileToggle({ isOpen, onToggle }: SidebarMobileToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-[var(--radius)] transition-colors"
      style={{
        backgroundColor: 'var(--sidebar)',
        color: 'var(--sidebar-foreground)'
      }}
    >
      {isOpen ? <X size={24} /> : <List size={24} />}
    </button>
  );
}
