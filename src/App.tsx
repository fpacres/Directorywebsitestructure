import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AIToolsPage from './pages/AIToolsPage';
import DigitalToolsPage from './pages/DigitalToolsPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import UnitConverterPage from './pages/UnitConverterPage';
import InchToMeterPage from './pages/InchToMeterPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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
      case '/tools/inch-to-meter':
        return <InchToMeterPage />;
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

  return renderPage();
}