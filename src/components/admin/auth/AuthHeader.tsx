import { ShieldCheck } from '@phosphor-icons/react';

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div 
        className="flex items-center justify-center w-16 h-16 rounded-[var(--radius)]"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        <ShieldCheck size={32} style={{ color: 'var(--accent-foreground)' }} weight="bold" />
      </div>
      <div className="text-center">
        <h1 style={{ color: 'var(--foreground)' }}>{title}</h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
