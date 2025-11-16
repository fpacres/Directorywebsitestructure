import { NavLogo, NavLinks, NavMobileMenuButton } from '../shared/ui/navigation';

export default function NavMenu() {
  return (
    <div className="bg-card relative rounded-[20px]" style={{ boxShadow: 'var(--elevation-sm)' }}>
      <div className="box-border content-stretch flex items-center justify-between overflow-clip px-[32px] py-[20px]">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-[48px]">
          <NavLogo />
          <NavLinks />
        </div>

        {/* Mobile menu button */}
        <NavMobileMenuButton />
      </div>
    </div>
  );
}