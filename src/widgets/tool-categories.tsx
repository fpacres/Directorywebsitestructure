import { Palette, Ruler, Database } from 'phosphor-react';

// Category Card Component (under 100 lines)
interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function CategoryCard({ icon, title, description }: CategoryCardProps) {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[24px] shrink-0">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
          {/* Icon */}
          <div 
            className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center overflow-clip p-[6px] relative rounded-[10px] shrink-0 size-[44px]"
            style={{ background: 'var(--accent)' }}
          >
            <div className="relative shrink-0 size-[28px] flex items-center justify-center" style={{ color: 'white' }}>
              {icon}
            </div>
          </div>

          {/* Text Content */}
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <p 
              className="leading-[1.3] relative shrink-0 w-full" 
              style={{ color: 'var(--foreground)' }}
            >
              {title}
            </p>
            <p 
              className="leading-[1.5] relative shrink-0 w-full" 
              style={{ color: 'var(--muted-foreground)' }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
      <div 
        aria-hidden="true" 
        className="absolute border border-solid inset-0 pointer-events-none rounded-[24px]"
        style={{ borderColor: 'var(--border)' }}
      />
    </div>
  );
}

// Tool Categories Section
export function ToolCategories() {
  const categories = [
    {
      icon: <Palette size={28} weight="regular" />,
      title: "Color Converters",
      description: "Educational digital tools for students, teachers, and academic calculations. Free online learning utilities including GPA calculators, study tools, and classroom resources for educational success."
    },
    {
      icon: <Ruler size={28} weight="regular" />,
      title: "Unit Converters",
      description: "Educational digital tools for students, teachers, and academic calculations. Free online learning utilities including GPA calculators, study tools, and classroom resources for educational success."
    },
    {
      icon: <Database size={28} weight="regular" />,
      title: "SQL Converters",
      description: "Educational digital tools for students, teachers, and academic calculations. Free online learning utilities including GPA calculators, study tools, and classroom resources for educational success."
    }
  ];

  return (
    <div 
      className="bg-white relative rounded-[28px] size-full" 
      style={{ boxShadow: '0px 5px 10px -2px rgba(13,13,18,0.04), 0px 4px 8px -1px rgba(13,13,18,0.02)' }}
    >
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[80px] items-center overflow-clip p-[104px] relative size-full">
          {/* Header */}
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
            <p 
              className="leading-[1.25] relative shrink-0 w-[563px]" 
              style={{ color: 'var(--foreground)' }}
            >
              Explore our Online Tools Categories
            </p>
            <p 
              className="leading-[1.5] min-w-full relative shrink-0 w-[min-content]" 
              style={{ color: 'var(--muted-foreground)' }}
            >
              Discover hundreds of free digital tools organized by category to help you work smarter and faster.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                icon={category.icon}
                title={category.title}
                description={category.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
