import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import { useCustomCode } from './utils/useCustomCode';
import { useRedirects } from './utils/useRedirects';
import HomePage from './pages/HomePage';
import AIToolsPage from './pages/AIToolsPage';
import DigitalToolsPage from './pages/DigitalToolsPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import UnitConverterPage from './pages/UnitConverterPage';
import AdminSetupPage from './pages/admin/AdminSetupPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import UnitConvertersAdminPage from './pages/admin/UnitConvertersAdminPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import UnitConverterFormPage from './pages/admin/UnitConverterFormPage';
import DebugDataPage from './pages/admin/DebugDataPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Inject custom code for public pages (automatically skips admin pages)
  useCustomCode();
  
  // Handle URL redirects from admin settings
  useRedirects();

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for custom navigation events
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('navigate', handleLocationChange as EventListener);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate', handleLocationChange as EventListener);
    };
  }, []);

  // Route matching
  const renderPage = () => {
    // Admin routes
    if (currentPath.startsWith('/admin')) {
      switch (currentPath) {
        case '/admin/setup':
          return <AdminSetupPage />;
        case '/admin/login':
          return <AdminLoginPage />;
        case '/admin/dashboard':
          return <AdminDashboardPage />;
        case '/admin/unit-converters':
          return <UnitConvertersAdminPage />;
        case '/admin/unit-converters/new':
          return <UnitConverterFormPage />;
        case '/admin/settings':
          return <AdminSettingsPage />;
        case '/admin/debug-data':
          return <DebugDataPage />;
        default:
          if (currentPath.startsWith('/admin/unit-converters/edit/')) {
            return <UnitConverterFormPage />;
          }
          if (currentPath.startsWith('/admin/unit-converters/')) {
            return <UnitConvertersAdminPage />;
          }
          return <AdminDashboardPage />;
      }
    }

    // Public routes
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/ai-tools':
        return <AIToolsPage />;
      case '/digital-tools':
        return <DigitalToolsPage />;
      case '/blog':
        return <BlogPage />;
      case '/about':
        return <AboutPage />;
      case '/tools/unit-converter':
        return <UnitConverterPage />;
      default:
        // Check if it's a tool page pattern
        if (currentPath.startsWith('/tools/')) {
          return <UnitConverterPage />;
        }
        return <HomePage />;
    }
  };

  return (
    <AuthProvider>
      <Toaster position="top-center" />
      {renderPage()}
    </AuthProvider>
  );
}