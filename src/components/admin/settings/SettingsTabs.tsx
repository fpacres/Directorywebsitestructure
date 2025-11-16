import { useState } from 'react';
import { Globe, ChartLine, Code, Path, Database } from '@phosphor-icons/react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  {
    id: 'general',
    label: 'General',
    icon: <Globe size={18} weight="duotone" />
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: <ChartLine size={18} weight="duotone" />
  },
  {
    id: 'redirects',
    label: 'Redirects',
    icon: <Path size={18} weight="duotone" />
  },
  {
    id: 'advanced',
    label: 'Advanced',
    icon: <Code size={18} weight="duotone" />
  },
  {
    id: 'database',
    label: 'Database',
    icon: <Database size={18} weight="duotone" />
  }
];

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div 
      className="flex gap-2 p-1 rounded-[var(--radius)]"
      style={{
        backgroundColor: 'var(--muted)',
        border: '1px solid var(--border)'
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius)] transition-all"
          style={{
            backgroundColor: activeTab === tab.id ? 'var(--card)' : 'transparent',
            color: activeTab === tab.id ? 'var(--foreground)' : 'var(--muted-foreground)',
            boxShadow: activeTab === tab.id ? 'var(--elevation-sm)' : 'none',
            fontWeight: activeTab === tab.id ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'
          }}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}