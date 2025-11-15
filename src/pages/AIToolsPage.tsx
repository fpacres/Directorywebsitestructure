import CategoryPage from '../components/CategoryPage';
import { Sparkle, Code, ImageSquare, VideoCamera, Briefcase, Robot, SpeakerHigh, Lightning } from '@phosphor-icons/react';

export default function AIToolsPage() {
  const categories = [
    'All Categories',
    'AI Productivity Tools',
    'AI Text Generators',
    'AI Image Tools',
    'AI Art Generators',
    'AI Video Tools',
    'AI Business Tools',
    'Automation Tools',
    'AI Audio Generators',
    'AI Code Tools',
  ];

  const tools = [
    {
      id: 'ai-writer',
      icon: <Sparkle size={24} weight="regular" />,
      title: 'AI Content Writer',
      category: 'AI Text Generators',
      description: 'Generate high-quality content with advanced AI writing assistance',
    },
    {
      id: 'ai-image-gen',
      icon: <ImageSquare size={24} weight="regular" />,
      title: 'AI Image Generator',
      category: 'AI Image Tools',
      description: 'Create stunning images from text descriptions using AI',
    },
    {
      id: 'code-assistant',
      icon: <Code size={24} weight="regular" />,
      title: 'Code Assistant',
      category: 'AI Code Tools',
      description: 'Get intelligent code suggestions and debugging help',
    },
    {
      id: 'video-editor',
      icon: <VideoCamera size={24} weight="regular" />,
      title: 'AI Video Editor',
      category: 'AI Video Tools',
      description: 'Edit videos automatically with AI-powered tools',
    },
    {
      id: 'business-analyzer',
      icon: <Briefcase size={24} weight="regular" />,
      title: 'Business Analyzer',
      category: 'AI Business Tools',
      description: 'Analyze business data and get actionable insights',
    },
    {
      id: 'automation-bot',
      icon: <Robot size={24} weight="regular" />,
      title: 'Automation Bot',
      category: 'Automation Tools',
      description: 'Automate repetitive tasks and workflows',
    },
    {
      id: 'voice-generator',
      icon: <SpeakerHigh size={24} weight="regular" />,
      title: 'Voice Generator',
      category: 'AI Audio Generators',
      description: 'Generate realistic voice overs with AI',
    },
    {
      id: 'task-manager',
      icon: <Lightning size={24} weight="regular" />,
      title: 'Smart Task Manager',
      category: 'AI Productivity Tools',
      description: 'Manage tasks efficiently with AI recommendations',
    },
  ];

  return (
    <CategoryPage
      badge="AI Tools"
      title="Explore AI-Powered Tools"
      description="Discover cutting-edge AI tools to enhance your productivity and creativity"
      categories={categories}
      tools={tools}
    />
  );
}
