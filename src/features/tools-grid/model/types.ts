export interface Tool {
  id: string;
  slug: string;
  icon?: React.ReactNode;
  title: string;
  category: string;
  subcategorySlug?: string;
  description: string;
}
