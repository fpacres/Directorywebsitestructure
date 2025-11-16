import { AdminLayout } from '../../components/admin/AdminLayout';
import { StatsCard } from '../../components/admin/StatsCard';
import { RecentPagesTable } from '../../components/admin/RecentPagesTable';
import { DashboardEmptyState } from '../../components/admin/dashboard/DashboardEmptyState';
import { Calculator, Robot, FolderOpen, Eye } from '@phosphor-icons/react';

export default function AdminDashboardPage() {
  // Check if there's any content - replace with real data check later
  const hasContent = false; // Change to true when you have real data

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        {/* Page Header */}
        <div>
          <h1 style={{ color: 'var(--foreground)' }}>Dashboard</h1>
          <p style={{ color: 'var(--muted-foreground)' }}>
            Welcome back! Here's an overview of your content.
          </p>
        </div>

        {hasContent ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Length Unit Converter"
                value="12"
                change="+2 this week"
                icon={Calculator}
              />
              <StatsCard
                title="AI Tools"
                value="8"
                change="+1 this week"
                icon={Robot}
                color="var(--brand-cyan)"
              />
              <StatsCard
                title="Digital Tools"
                value="25"
                change="+5 this week"
                icon={FolderOpen}
                color="var(--brand-teal)"
              />
              <StatsCard
                title="Total Views"
                value="12.5K"
                change="+18% this month"
                icon={Eye}
                color="var(--brand-orange)"
              />
            </div>

            {/* Recent Pages */}
            <div
              className="rounded-[var(--radius-card)] p-6 border"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--elevation-sm)'
              }}
            >
              <div className="mb-6">
                <h3 style={{ color: 'var(--foreground)' }}>Recent Pages</h3>
                <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
                  Your most recently updated pages
                </p>
              </div>
              <RecentPagesTable />
            </div>
          </>
        ) : (
          <DashboardEmptyState />
        )}
      </div>
    </AdminLayout>
  );
}