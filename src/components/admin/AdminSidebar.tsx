import { useState } from 'react';
import { House, Calculator, Robot, FolderOpen, ChartBar, Gear } from '@phosphor-icons/react';
import { SidebarLogo } from './sidebar/SidebarLogo';
import { SidebarNavItem } from './sidebar/SidebarNavItem';
import { SidebarNavItemCollapsible } from './sidebar/SidebarNavItemCollapsible';
import { SidebarMobileToggle } from './sidebar/SidebarMobileToggle';
import { SidebarExtendedPanel } from './sidebar/SidebarExtendedPanel';

const navItems = [
  { type: 'link', label: 'Dashboard', icon: House, path: '/admin/dashboard' },
  { type: 'link', label: 'AI Tools', icon: Robot, path: '/admin/ai-tools' },
  { 
    type: 'collapsible',
    label: 'Digital Tools', 
    icon: FolderOpen,
    subItems: [
      { label: 'Length Unit Converter', icon: Calculator, path: '/admin/unit-converters' }
    ]
  },
  { type: 'link', label: 'Analytics', icon: ChartBar, path: '/admin/analytics' },
  { type: 'link', label: 'Settings', icon: Gear, path: '/admin/settings' },
];

export function AdminSidebar() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('navigate'));
    setCurrentPath(path);
    setMobileOpen(false);
    setOpenPanel(null);
  };

  const handleTogglePanel = (label: string) => {
    setOpenPanel(openPanel === label ? null : label);
  };

  return (
    <>
      <SidebarMobileToggle isOpen={mobileOpen} onToggle={() => setMobileOpen(!mobileOpen)} />

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Overlay to close extended panel when clicking outside */}
      {openPanel && (
        <div
          className="hidden lg:block fixed inset-0 z-30"
          onClick={() => setOpenPanel(null)}
        />
      )}

      <aside
        className={`fixed lg:relative inset-y-0 left-0 w-[280px] flex flex-col transition-transform duration-300 ease-in-out z-40 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{
          backgroundColor: 'var(--sidebar)',
          borderRight: '1px solid var(--sidebar-border)'
        }}
      >
        <SidebarLogo />

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              if (item.type === 'link') {
                return (
                  <SidebarNavItem
                    key={item.path}
                    label={item.label}
                    icon={item.icon}
                    path={item.path}
                    isActive={currentPath === item.path}
                    onNavigate={handleNavigate}
                  />
                );
              } else if (item.type === 'collapsible') {
                return (
                  <SidebarNavItemCollapsible
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    subItems={item.subItems}
                    currentPath={currentPath}
                    onNavigate={handleNavigate}
                    isOpen={openPanel === item.label}
                    onToggle={() => handleTogglePanel(item.label)}
                  />
                );
              }
              return null;
            })}
          </div>
        </nav>

        <div className="px-6 py-4 border-t" style={{ borderColor: 'var(--sidebar-border)' }}>
          <p style={{ color: 'var(--sidebar-accent)', fontSize: 'var(--text-xs)' }}>
            v1.0.0 • Admin Dashboard
          </p>
        </div>
      </aside>

      {/* Extended Panel for Collapsible Items */}
      {navItems.map((item) => {
        if (item.type === 'collapsible') {
          return (
            <SidebarExtendedPanel
              key={item.label}
              title={item.label}
              subItems={item.subItems}
              currentPath={currentPath}
              onNavigate={handleNavigate}
              isVisible={openPanel === item.label}
            />
          );
        }
        return null;
      })}
    </>
  );
}