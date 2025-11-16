import { ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div 
        className="w-full max-w-[540px] rounded-[var(--radius-card)] p-8 md:p-12"
        style={{ 
          backgroundColor: 'var(--card)',
          boxShadow: 'var(--elevation-sm)',
          border: '1px solid var(--border)'
        }}
      >
        {children}
      </div>
    </div>
  );
}
