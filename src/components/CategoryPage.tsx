'use client';

import NavMenu from './NavMenu';
import Footer from './Footer';
import CategoryHeader from './CategoryHeader';
import { CategoryFilterSidebar } from '../features/category-filter';
import { ToolsGrid } from '../features/tools-grid';
import EmptyState from '../shared/ui/empty-state';
import { ToolsGridSkeleton } from './skeletons/ToolsGridSkeleton';
import { useCategoryPage } from '../features/category-page';

interface CategoryPageProps {
  categoryName: string;
  description: string;
  categoryFilter?: string; // Category to filter by in the backend
}

export default function CategoryPage({ categoryName, description, categoryFilter }: CategoryPageProps) {
  const {
    subcategories,
    activeSubcategory,
    filteredTools,
    loading,
    error,
    setActiveSubcategory,
    handleToolNavigation,
  } = useCategoryPage(categoryFilter);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4" style={{ background: 'var(--background)' }}>
        <div className="w-full max-w-[1440px] mx-auto">
          <NavMenu />
        </div>
      </div>
      
      <div className="flex flex-col gap-4 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <CategoryHeader categoryName={categoryName} description={description} />

        {/* Tools List Area */}
        <div className="bg-card box-border content-stretch flex gap-[40px] items-start overflow-clip p-[40px] relative rounded-[32px] w-full" style={{ boxShadow: 'var(--elevation-sm)' }}>
          {/* Sidebar */}
          <CategoryFilterSidebar 
            subcategories={subcategories}
            activeSubcategory={activeSubcategory}
            onSubcategoryChange={setActiveSubcategory}
          />

          {/* Tools Grid */}
          <div className="basis-0 flex flex-row grow items-start min-h-px min-w-px relative shrink-0">
            <div className="basis-0 content-stretch flex flex-col gap-[40px] grow h-full items-start min-h-px min-w-px relative shrink-0">
              {loading ? (
                <ToolsGridSkeleton />
              ) : error ? (
                <EmptyState 
                  title="Error loading tools"
                  description={error}
                />
              ) : filteredTools.length > 0 ? (
                <ToolsGrid tools={filteredTools} onLearnMore={handleToolNavigation} />
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
    </div>
  );
}