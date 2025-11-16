import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { Tool } from '../../tools-grid/model/types';
import { Subcategory } from '../../category-filter/model/types';
import { slugToDisplayName } from '../lib/utils';

interface FetchToolsResult {
  tools: Tool[];
  subcategories: Subcategory[];
}

/**
 * Fetches tools from the backend API
 * @param categoryFilter - Optional category to filter by
 * @returns Promise with tools and subcategories
 */
export async function fetchTools(categoryFilter?: string): Promise<FetchToolsResult> {
  // Build API URL with category filter if provided
  const url = new URL(`https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/pages`);
  if (categoryFilter) {
    url.searchParams.append('category', categoryFilter);
  }
  
  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tools');
  }

  const data = await response.json();
  const pages = data.pages || [];
  
  // Filter only published pages
  const publishedPages = pages.filter((page: any) => page.published);
  
  // Extract unique subcategories for the filter sidebar
  const subcategoryMap = new Map<string, string>();
  publishedPages.forEach((page: any) => {
    if (page.subcategory) {
      const displayName = page.subcategory_display_name || slugToDisplayName(page.subcategory);
      subcategoryMap.set(page.subcategory, displayName);
    }
  });
  
  // Convert map to array and sort by display name
  const subcategories = Array.from(subcategoryMap.entries())
    .map(([slug, displayName]) => ({ slug, displayName }))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
  
  // Map pages to tools format
  const tools: Tool[] = publishedPages.map((page: any) => {
    const subcategoryDisplay = page.subcategory 
      ? (page.subcategory_display_name || slugToDisplayName(page.subcategory))
      : page.category;
      
    return {
      id: page.id,
      slug: page.slug,
      title: page.title,
      category: subcategoryDisplay,
      subcategorySlug: page.subcategory,
      description: page.meta_description || page.excerpt || '',
    };
  });
  
  return { tools, subcategories };
}
