import CategoryPage from '../components/CategoryPage';
import { PaintBucket, ArrowsLeftRight, Database, Code, FileCode, Key, ChartLine, Eye } from '@phosphor-icons/react';

export default function DigitalToolsPage() {
  const handleLearnMore = (toolId: string) => {
    // Navigate to tool pages
    const toolRoutes: { [key: string]: string } = {
      'inch-to-meter': '/tools/inch-to-meter',
      'unit-converter': '/tools/unit-converter',
    };
    
    const route = toolRoutes[toolId];
    if (route) {
      window.history.pushState({}, '', route);
      window.dispatchEvent(new Event('navigate'));
    }
  };

  const categories = [
    'All Categories',
    'Color Converters',
    'Unit Converters',
    'SQL Converters',
    'Encode and Decode',
    'Base64 Tools',
    'JSON Converters',
    'Chart Tools',
    'Viewers',
  ];

  const tools = [
    {
      id: 'hex-converter',
      icon: <PaintBucket size={24} weight="regular" />,
      title: 'HEX to RGB Converter',
      category: 'Color Converters',
      description: 'Convert HEX color codes to RGB format instantly',
    },
    {
      id: 'inch-to-meter',
      icon: <ArrowsLeftRight size={24} weight="regular" />,
      title: 'Inch to Meter Converter',
      category: 'Unit Converters',
      description: 'Convert inches to meters instantly with precise calculations',
    },
    {
      id: 'unit-converter',
      icon: <ArrowsLeftRight size={24} weight="regular" />,
      title: 'Unit Converter',
      category: 'Unit Converters',
      description: 'Convert between different units of measurement',
    },
    {
      id: 'sql-formatter',
      icon: <Database size={24} weight="regular" />,
      title: 'SQL Formatter',
      category: 'SQL Converters',
      description: 'Format and beautify your SQL queries',
    },
    {
      id: 'base64-encoder',
      icon: <Key size={24} weight="regular" />,
      title: 'Base64 Encoder',
      category: 'Base64 Tools',
      description: 'Encode and decode Base64 strings',
    },
    {
      id: 'json-viewer',
      icon: <FileCode size={24} weight="regular" />,
      title: 'JSON Viewer',
      category: 'JSON Converters',
      description: 'View and format JSON data with syntax highlighting',
    },
    {
      id: 'url-encoder',
      icon: <Code size={24} weight="regular" />,
      title: 'URL Encoder/Decoder',
      category: 'Encode and Decode',
      description: 'Encode and decode URL strings',
    },
    {
      id: 'chart-generator',
      icon: <ChartLine size={24} weight="regular" />,
      title: 'Chart Generator',
      category: 'Chart Tools',
      description: 'Create beautiful charts from your data',
    },
    {
      id: 'html-viewer',
      icon: <Eye size={24} weight="regular" />,
      title: 'HTML Viewer',
      category: 'Viewers',
      description: 'Preview and inspect HTML code',
    },
  ];

  return (
    <CategoryPage
      badge="Digital Tools"
      title="Essential Digital Tools"
      description="Browse our collection of free online tools for developers and creators"
      categories={categories}
      tools={tools}
      handleLearnMore={handleLearnMore}
    />
  );
}