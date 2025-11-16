/**
 * Shared types for Unit Converter forms and pages
 */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ConverterFormData {
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  subcategory_display_name?: string;
  default_from_unit: string;
  default_to_unit: string;
  excerpt: string;
  description: string;
  meta_title: string;
  meta_description: string;
  published: boolean;
  featured: boolean;
  faqs?: FAQ[];
}