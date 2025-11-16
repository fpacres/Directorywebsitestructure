import { useState, useEffect } from 'react';
import { Tool } from '../../tools-grid/model/types';
import { Subcategory } from '../../category-filter/model/types';
import { fetchTools } from '../api/fetchTools';

interface UseCategoryPageReturn {
  tools: Tool[];
  subcategories: Subcategory[];
  activeSubcategory: string;
  filteredTools: Tool[];
  loading: boolean;
  error: string | null;
  setActiveSubcategory: (subcategory: string) => void;
  handleToolNavigation: (toolId: string) => void;
}

/**
 * Custom hook for managing CategoryPage state and logic
 */
export function useCategoryPage(categoryFilter?: string): UseCategoryPageReturn {
  const [activeSubcategory, setActiveSubcategory] = useState('All Subcategories');
  const [tools, setTools] = useState<Tool[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tools from backend
  useEffect(() => {
    const loadTools = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { tools: fetchedTools, subcategories: fetchedSubcategories } = await fetchTools(categoryFilter);
        
        setTools(fetchedTools);
        setSubcategories(fetchedSubcategories);
      } catch (err) {
        console.error('Error fetching tools:', err);
        setError('Failed to load tools');
      } finally {
        setLoading(false);
      }
    };

    loadTools();
  }, [categoryFilter]);

  // Filter tools based on active subcategory
  const filteredTools = activeSubcategory === 'All Subcategories' 
    ? tools 
    : tools.filter(tool => tool.subcategorySlug === activeSubcategory);

  // Navigate to tool page
  const handleToolNavigation = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
      const url = `/tools/${tool.slug}`;
      window.history.pushState({}, '', url);
      window.dispatchEvent(new Event('navigate'));
    }
  };

  return {
    tools,
    subcategories,
    activeSubcategory,
    filteredTools,
    loading,
    error,
    setActiveSubcategory,
    handleToolNavigation,
  };
}
