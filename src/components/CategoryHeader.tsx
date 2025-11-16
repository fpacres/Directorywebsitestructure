import { CategoryHeaderBackground, CategoryHeaderContent } from '../shared/ui/category-header';

interface CategoryHeaderProps {
  categoryName: string;
  description: string;
}

export default function CategoryHeader({ categoryName, description }: CategoryHeaderProps) {
  return (
    <div className="relative rounded-[32px] w-full shadow-[0px_4px_8px_-1px_rgba(13,13,18,0.02)]">
      <CategoryHeaderBackground />
      <CategoryHeaderContent categoryName={categoryName} description={description} />
    </div>
  );
}