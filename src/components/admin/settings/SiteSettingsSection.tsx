import { useState } from 'react';
import { Globe } from '@phosphor-icons/react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { SettingsSectionCard } from './SettingsSectionCard';

export function SiteSettingsSection() {
  const [siteTitle, setSiteTitle] = useState('EveryDigitalTools');
  const [siteDescription, setSiteDescription] = useState('Discover free digital tools and AI-powered solutions for every task. From unit converters to productivity tools.');
  const [siteLanguage, setSiteLanguage] = useState('en-US');

  return (
    <SettingsSectionCard 
      title="Site Settings"
      icon={<Globe size={24} weight="duotone" />}
      action={<Button size="default">Save</Button>}
    >
      <div className="flex flex-col gap-6">
        {/* Site Title */}
        <div>
          <label 
            htmlFor="site-title" 
            className="block mb-2"
            style={{ color: 'var(--foreground)' }}
          >
            Site Title
          </label>
          <Input
            id="site-title"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            placeholder="Your site title"
          />
          <p 
            className="mt-2"
            style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}
          >
            The title for Home and 2 other pages won't be updated, as they are already set.
          </p>
        </div>

        {/* Site Description */}
        <div>
          <label 
            htmlFor="site-description" 
            className="block mb-2"
            style={{ color: 'var(--foreground)' }}
          >
            Site Description
          </label>
          <Textarea
            id="site-description"
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            placeholder="Your site description"
            rows={5}
          />
          <p 
            className="mt-2"
            style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}
          >
            The description for Case Studies and 1 other page won't be updated.
          </p>
        </div>

        {/* Site Language */}
        <div>
          <label 
            className="block mb-2"
            style={{ color: 'var(--foreground)' }}
          >
            Site Language
          </label>
          <Select value={siteLanguage} onValueChange={setSiteLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">🇺🇸 English (United States) - en-US</SelectItem>
              <SelectItem value="en-GB">🇬🇧 English (United Kingdom) - en-GB</SelectItem>
              <SelectItem value="es-ES">🇪🇸 Spanish (Spain) - es-ES</SelectItem>
              <SelectItem value="fr-FR">🇫🇷 French (France) - fr-FR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6">
        <label 
          className="block mb-2"
          style={{ color: 'var(--foreground)' }}
        >
          Preview
        </label>
        <div 
          className="p-4 rounded-[var(--radius)] border"
          style={{
            backgroundColor: 'var(--muted)',
            borderColor: 'var(--border)'
          }}
        >
          <div 
            className="mb-1"
            style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}
          >
            everydigitaltools.com
          </div>
          <h3 style={{ color: 'var(--accent)' }}>{siteTitle}</h3>
          <p 
            className="mt-1 line-clamp-2"
            style={{ color: 'var(--foreground)', fontSize: 'var(--text-sm)' }}
          >
            {siteDescription}
          </p>
        </div>
      </div>
    </SettingsSectionCard>
  );
}