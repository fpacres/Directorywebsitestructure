import { Gear } from '@phosphor-icons/react';

export function SettingsPageHeader() {
  return (
    <div className="flex items-start gap-4">
      <div 
        className="flex items-center justify-center rounded-[var(--radius)]"
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: 'var(--accent)',
          color: 'var(--accent-foreground)'
        }}
      >
        <Gear size={24} weight="duotone" />
      </div>
      <div className="flex-1">
        <h1 style={{ color: 'var(--foreground)' }}>Settings</h1>
        <p style={{ color: 'var(--muted-foreground)' }}>
          Configure your site settings, integrations, and SEO options.
        </p>
      </div>
    </div>
  );
}
