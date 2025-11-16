import { List } from '@phosphor-icons/react';

export function NavMobileMenuButton() {
  return (
    <button className="md:hidden p-2 text-foreground">
      <List size={24} weight="regular" />
    </button>
  );
}
