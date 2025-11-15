import { MagnifyingGlass } from '@phosphor-icons/react';

export function HeroSearch() {
  return (
    <div className="flex items-center w-full max-w-[600px] bg-white rounded-[var(--radius-button)] overflow-hidden">
      {/* Category Dropdown */}
      <select className="px-4 py-4 bg-white border-r border-[var(--border)] outline-none cursor-pointer text-[var(--foreground)] min-w-[140px]">
        <option>All Category</option>
        <option>AI Tools</option>
        <option>Digital Tools</option>
        <option>Converters</option>
        <option>Utilities</option>
      </select>

      {/* Search Input */}
      <div className="flex items-center flex-1">
        <input
          type="text"
          placeholder="Search any tools..."
          className="flex-1 px-4 py-4 outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
        />
        <button className="px-6 py-4 bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 transition-opacity">
          <MagnifyingGlass className="w-5 h-5" weight="regular" />
        </button>
      </div>
    </div>
  );
}