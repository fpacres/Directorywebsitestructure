import { useAuth } from '../../contexts/AuthContext';
import { navigate } from '../../shared/utils/navigation';
import { SignOut, User } from '@phosphor-icons/react';
import { toast } from 'sonner@2.0.3';

export function AdminHeader() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/admin/login');
  };

  const userName = user?.user_metadata?.name || user?.email || 'Admin';

  return (
    <header
      className="h-[72px] flex items-center justify-between px-6 md:px-8 border-b"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--elevation-nav)'
      }}
    >
      <div className="flex items-center gap-4">
        <h3 style={{ color: 'var(--foreground)' }}>Content Management</h3>
      </div>

      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="hidden md:flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <User size={20} style={{ color: 'var(--accent-foreground)' }} weight="bold" />
          </div>
          <div className="flex flex-col">
            <span style={{ color: 'var(--foreground)', fontSize: 'var(--text-sm)' }}>
              {userName}
            </span>
            <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-xs)' }}>
              Administrator
            </span>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] transition-colors"
          style={{
            backgroundColor: 'transparent',
            color: 'var(--muted-foreground)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--muted)';
            e.currentTarget.style.color = 'var(--destructive)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--muted-foreground)';
          }}
        >
          <SignOut size={20} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
