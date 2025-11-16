import { useState } from 'react';
import { ChartLine } from '@phosphor-icons/react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { SettingsSectionCard } from './SettingsSectionCard';

export function GoogleAnalyticsSection() {
  const [measurementId, setMeasurementId] = useState('');

  return (
    <SettingsSectionCard 
      title="Google Analytics"
      icon={<ChartLine size={24} weight="duotone" />}
      description="Directly integrate Google Analytics into your site. Please note that as a site owner you are responsible for making sure that your site is handling data in a way that is in line with privacy laws such as the GDPR."
      action={<Button size="default">Save</Button>}
    >
      <div className="mt-6">
        <label 
          htmlFor="ga-measurement-id" 
          className="block mb-2"
          style={{ color: 'var(--foreground)' }}
        >
          Google Analytics Measurement ID
        </label>
        <Input
          id="ga-measurement-id"
          value={measurementId}
          onChange={(e) => setMeasurementId(e.target.value)}
          placeholder="G-XXXXXXXXXX"
        />
      </div>
    </SettingsSectionCard>
  );
}