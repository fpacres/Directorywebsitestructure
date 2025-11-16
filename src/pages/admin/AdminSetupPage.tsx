import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info.tsx';
import { navigate } from '../../shared/utils/navigation';
import { toast } from 'sonner@2.0.3';
import { AuthCard } from '../../components/admin/auth/AuthCard';
import { AuthHeader } from '../../components/admin/auth/AuthHeader';
import { AuthFormInput } from '../../components/admin/auth/AuthFormInput';
import { AuthPasswordInput } from '../../components/admin/auth/AuthPasswordInput';
import { SetupBenefits } from '../../components/admin/auth/SetupBenefits';
import { Button } from '../../components/ui/button';

export default function AdminSetupPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create admin account');
      }

      toast.success('Admin account created successfully!');
      setTimeout(() => navigate('/admin/login'), 1500);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create admin account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader 
        title="Admin Setup" 
        description="Create your first admin account to get started" 
      />
      
      <SetupBenefits />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthFormInput
          id="name" label="Full Name" type="text"
          value={formData.name}
          onChange={(val) => setFormData({ ...formData, name: val })}
          placeholder="John Doe" disabled={isLoading}
        />
        <AuthFormInput
          id="email" label="Email" type="email"
          value={formData.email}
          onChange={(val) => setFormData({ ...formData, email: val })}
          placeholder="admin@example.com" disabled={isLoading}
        />
        <AuthPasswordInput
          id="password" label="Password"
          value={formData.password}
          onChange={(val) => setFormData({ ...formData, password: val })}
          placeholder="At least 6 characters" disabled={isLoading}
        />
        <AuthPasswordInput
          id="confirmPassword" label="Confirm Password"
          value={formData.confirmPassword}
          onChange={(val) => setFormData({ ...formData, confirmPassword: val })}
          placeholder="Re-enter your password" disabled={isLoading}
        />

        <Button
          type="submit"
          disabled={isLoading}
          size="lg"
          className="w-full mt-4"
        >
          {isLoading ? 'Creating Account...' : 'Create Admin Account'}
        </Button>
      </form>
    </AuthCard>
  );
}