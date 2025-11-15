import { MagnifyingGlass, Sparkle } from '@phosphor-icons/react';

export function Header() {
  return (
    <header className="w-full py-6 px-8">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Sparkle size={36} weight="fill" color="var(--accent)" />
          <span className="text-[var(--accent)]">Every</span>
          <span className="text-[var(--foreground)]">Digital Tools</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <a
            href="#ai-tools"
            className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          >
            AI Tools
          </a>
          <a
            href="#digital-tools"
            className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          >
            Digital Tools
          </a>
          <a
            href="#blog"
            className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          >
            Blog
          </a>
          <a
            href="#about"
            className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          >
            About
          </a>
          <button className="p-2 hover:bg-[var(--muted)] rounded-[var(--radius)] transition-colors">
            <MagnifyingGlass className="w-5 h-5 text-[var(--foreground)]" />
          </button>
        </nav>
      </div>
    </header>
  );
}