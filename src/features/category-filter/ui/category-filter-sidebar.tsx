import { Subcategory } from '../model/types';
import { FilterItem } from './filter-item';

interface CategoryFilterSidebarProps {
  subcategories: Subcategory[];
  activeSubcategory: string;
  onSubcategoryChange: (subcategory: string) => void;
}

export default function CategoryFilterSidebar({ 
  subcategories, 
  activeSubcategory, 
  onSubcategoryChange 
}: CategoryFilterSidebarProps) {
  const ALL_SUBCATEGORIES = 'All Subcategories';

  return (
    <div className="box-border content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[240px] sticky top-[40px] self-start">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
        <h2 className="flex flex-col justify-center relative shrink-0 text-foreground w-full pt-[0px] pr-[0px] pb-[10px] pl-[0px]">
          Subcategories
        </h2>
        
        {/* All Subcategories option */}
        <FilterItem
          label={ALL_SUBCATEGORIES}
          isActive={activeSubcategory === ALL_SUBCATEGORIES}
          onClick={() => onSubcategoryChange(ALL_SUBCATEGORIES)}
        />
        
        {/* Individual subcategories */}
        {subcategories.map((subcategory) => (
          <FilterItem
            key={subcategory.slug}
            label={subcategory.displayName}
            isActive={activeSubcategory === subcategory.slug}
            onClick={() => onSubcategoryChange(subcategory.slug)}
          />
        ))}
      </div>
    </div>
  );
}
