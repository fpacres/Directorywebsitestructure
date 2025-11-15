'use client';

import { useState } from 'react';
import NavMenu from './NavMenu';
import Footer from './Footer';
import CategoryHeader from './CategoryHeader';
import CategoryFilterSidebar from '../features/category-filter/ui/category-filter-sidebar';
import ToolsGrid from '../features/tools-grid/ui/tools-grid';
import EmptyState from '../shared/ui/empty-state';

interface Tool {
  id: string;
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
}

interface CategoryPageProps {
  badge: string;
  title: string;
  description: string;
  categories: string[];
  tools: Tool[];
  handleLearnMore?: (toolId: string) => void;
}

export default function CategoryPage({ badge, title, description, categories, tools, handleLearnMore }: CategoryPageProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'All Categories');

  // Filter tools based on active category
  const filteredTools = activeCategory === 'All Categories' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  const onLearnMore = (toolId: string) => {
    if (handleLearnMore) {
      handleLearnMore(toolId);
    } else {
      console.log(`Learn more about tool: ${toolId}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Navigation */}
      <NavMenu />

      {/* Category Header */}
      <CategoryHeader badge={badge} title={title} description={description} />

      {/* Tools List Area */}
      <div className="bg-card box-border content-stretch flex gap-[40px] items-start overflow-clip p-[40px] relative rounded-[32px] w-full" style={{ boxShadow: 'var(--elevation-sm)' }}>
        {/* Sidebar */}
        <CategoryFilterSidebar 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Tools Grid */}
        <div className="basis-0 flex flex-row grow items-start min-h-px min-w-px relative shrink-0">
          <div className="basis-0 content-stretch flex flex-col gap-[40px] grow h-full items-start min-h-px min-w-px relative shrink-0">
            {filteredTools.length > 0 ? (
              <ToolsGrid tools={filteredTools} onLearnMore={onLearnMore} />
            ) : (
              <EmptyState 
                title="No tools found"
                description="We couldn't find any tools in this category yet. Check back soon or explore other categories!"
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}