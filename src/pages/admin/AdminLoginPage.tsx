import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { navigate } from '../../shared/utils/navigation';
import { toast } from 'sonner@2.0.3';
import { AuthCard } from '../../components/admin/auth/AuthCard';
import { AuthHeader } from '../../components/admin/auth/AuthHeader';
import { AuthFormInput } from '../../components/admin/auth/AuthFormInput';
import { AuthPasswordInput } from '../../components/admin/auth/AuthPasswordInput';
import { AuthLoadingSkeleton } from '../../components/skeletons/AuthLoadingSkeleton';
import { Button } from '../../components/ui/button';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, session, loading } = useAuth();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && session) {
      navigate('/admin/dashboard');
    }
  }, [loading, session]);

  // Show loading state while checking auth
  if (loading) {
    return <AuthLoadingSkeleton />;
  }

  // Don't render form if redirecting
  if (session) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast.error(error);
      } else {
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader title="Admin Login" description="Sign in to manage your content" />
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthFormInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="admin@example.com"
          disabled={isLoading}
        />

        <AuthPasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          disabled={isLoading}
        />

        <Button
          type="submit"
          disabled={isLoading}
          size="lg"
          className="w-full mt-2"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        <div className="mt-4 text-center">
          <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
            First time?{' '}
          </span>
          <button
            type="button"
            onClick={() => navigate('/admin/setup')}
            className="transition-colors"
            style={{ 
              color: 'var(--accent)', 
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            Create admin account
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/')}
          className="transition-colors inline-flex items-center gap-2"
          style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted-foreground)'}
        >
          <span>←</span>
          <span>Back to website</span>
        </button>
      </div>
    </AuthCard>
  );
}