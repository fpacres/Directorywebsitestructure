import { useState } from 'react';
import { Icon, MagnifyingGlass } from '@phosphor-icons/react';

interface SubItem {
  label: string;
  icon: Icon;
  path: string;
}

interface SidebarExtendedPanelProps {
  title: string;
  subItems: SubItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
  isVisible: boolean;
}

export function SidebarExtendedPanel({
  title,
  subItems,
  currentPath,
  onNavigate,
  isVisible
}: SidebarExtendedPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isVisible) return null;

  // Filter subItems based on search query
  const filteredItems = subItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="fixed left-[280px] top-0 h-full w-[400px] border-r overflow-y-auto z-40"
      style={{
        backgroundColor: 'var(--sidebar)',
        borderColor: 'var(--sidebar-border)'
      }}
    >
      {/* Panel Header */}
      <div className="px-6 py-6 border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
        <h3 style={{ color: 'var(--sidebar-foreground)', fontSize: 'var(--text-base)' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--sidebar-accent)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
          Select a tool to manage
        </p>
      </div>

      {/* Search Input */}
      <div className="px-4 pt-4 pb-2">
        <div 
          className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius)] border"
          style={{ 
            backgroundColor: 'var(--sidebar-border)',
            borderColor: 'var(--sidebar-border)'
          }}
        >
          <MagnifyingGlass size={16} style={{ color: 'var(--sidebar-accent)' }} weight="regular" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none"
            style={{ 
              color: 'var(--sidebar-foreground)',
              fontSize: 'var(--text-sm)'
            }}
          />
        </div>
      </div>

      {/* Subcategories List */}
      <div className="px-4 py-2">
        {filteredItems.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p style={{ color: 'var(--sidebar-accent)', fontSize: 'var(--text-sm)' }}>
              No tools found
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {filteredItems.map((subItem) => {
              const SubIcon = subItem.icon;
              const isActive = currentPath === subItem.path;

              return (
                <button
                  key={subItem.path}
                  onClick={() => onNavigate(subItem.path)}
                  className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius)] transition-all w-full"
                  style={{
                    backgroundColor: isActive ? 'var(--sidebar-primary)' : 'transparent',
                    color: isActive ? 'var(--sidebar-primary-foreground)' : 'var(--sidebar-foreground)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--sidebar-border)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <SubIcon size={20} weight={isActive ? 'fill' : 'regular'} />
                  <span style={{ fontSize: 'var(--text-sm)' }}>{subItem.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}