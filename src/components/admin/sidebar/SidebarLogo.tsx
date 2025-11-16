export function SidebarLogo() {
  return (
    <div 
      className="flex items-center gap-3 px-6 py-8 border-b" 
      style={{ borderColor: 'var(--sidebar-border)' }}
    >
      <div
        className="w-10 h-10 rounded-[var(--radius)] flex items-center justify-center"
        style={{ backgroundColor: 'var(--sidebar-primary)' }}
      >
        <span style={{ color: 'var(--sidebar-primary-foreground)' }}>EDT</span>
      </div>
      <div>
        <h4 style={{ color: 'var(--sidebar-foreground)' }}>EveryDigitalTools</h4>
        <p style={{ color: 'var(--sidebar-accent)', fontSize: 'var(--text-xs)' }}>
          Admin Panel
        </p>
      </div>
    </div>
  );
}
