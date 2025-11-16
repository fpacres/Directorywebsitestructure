import { NavLink } from './nav-link';

export function NavLinks() {
  return (
    <div className="hidden md:flex items-center gap-[16px]">
      <NavLink href="/" label="Home" />
      <NavLink href="/ai-tools" label="AI Tools" />
      <NavLink href="/digital-tools" label="Digital Tools" />
      <NavLink href="/blog" label="Blog" />
      <NavLink href="/about" label="About" />
    </div>
  );
}
