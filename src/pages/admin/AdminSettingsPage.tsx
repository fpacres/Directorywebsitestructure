import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SettingsPageHeader } from '../../components/admin/settings/SettingsPageHeader';
import { SettingsTabs } from '../../components/admin/settings/SettingsTabs';
import { SettingsSectionDivider } from '../../components/admin/settings/SettingsSectionDivider';
import { SiteSettingsSection } from '../../components/admin/settings/SiteSettingsSection';
import { GoogleAnalyticsSection } from '../../components/admin/settings/GoogleAnalyticsSection';
import { CustomCodeSection } from '../../components/admin/settings/CustomCodeSection';
import { CreateRedirectSection } from '../../components/admin/settings/CreateRedirectSection';
import { RedirectsListSection } from '../../components/admin/settings/RedirectsListSection';
import { DatabaseManagementSection } from '../../components/admin/settings/DatabaseManagementSection';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [redirectRefreshTrigger, setRedirectRefreshTrigger] = useState(0);

  const handleRedirectCreated = () => {
    // Increment trigger to refresh the list
    setRedirectRefreshTrigger(prev => prev + 1);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        {/* Page Header */}
        <SettingsPageHeader />

        {/* Tabs Navigation */}
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Settings Content */}
        <div className="flex flex-col gap-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <>
              <SiteSettingsSection />
            </>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <>
              <GoogleAnalyticsSection />
            </>
          )}

          {/* Redirects Tab */}
          {activeTab === 'redirects' && (
            <>
              <CreateRedirectSection onRedirectCreated={handleRedirectCreated} />
              <RedirectsListSection refreshTrigger={redirectRefreshTrigger} />
            </>
          )}

          {/* Advanced Tab */}
          {activeTab === 'advanced' && (
            <>
              <CustomCodeSection />
            </>
          )}

          {/* Database Tab */}
          {activeTab === 'database' && (
            <>
              <DatabaseManagementSection />
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}