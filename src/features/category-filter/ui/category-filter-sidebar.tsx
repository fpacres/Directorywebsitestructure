interface CategoryFilterSidebarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilterSidebar({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterSidebarProps) {
  return (
    <div className="box-border content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[240px] sticky top-[40px] self-start">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
        <h2 className="flex flex-col justify-center relative shrink-0 text-foreground w-full pt-[0px] pr-[0px] pb-[10px] pl-[0px] text-[18px]">
          Categories
        </h2>
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`box-border content-stretch flex flex-col items-start justify-center overflow-clip px-[16px] relative rounded-[12px] shrink-0 w-full h-[44px] cursor-pointer transition-colors ${
              activeCategory === category ? 'bg-muted' : 'hover:bg-muted/30'
            }`}
          >
            <div className="flex flex-col justify-center relative shrink-0 w-full">
              <p className={activeCategory === category ? 'text-foreground' : 'text-muted-foreground'}>
                {category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}