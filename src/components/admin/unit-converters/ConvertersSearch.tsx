import { MagnifyingGlass } from '@phosphor-icons/react';

interface ConvertersSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ConvertersSearch({ value, onChange }: ConvertersSearchProps) {
  return (
    <div className="relative">
      <MagnifyingGlass
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2"
        style={{ color: 'var(--muted-foreground)' }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search converters..."
        className="w-full h-12 pl-12 pr-4 rounded-[var(--radius)] border transition-colors outline-none"
        style={{
          backgroundColor: 'var(--input-background)',
          borderColor: 'var(--border)',
          color: 'var(--foreground)'
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--ring)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
      />
    </div>
  );
}
