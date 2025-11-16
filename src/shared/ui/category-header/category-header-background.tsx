import imgCategoryPageHeader from "figma:asset/974ed41b38c8036ad37cb7df9603a15b873551fa.png";

export function CategoryHeaderBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
      <div className="absolute bg-white inset-0 rounded-[32px]" />
      <div className="absolute inset-0 overflow-hidden rounded-[32px]">
        <img alt="" className="absolute h-[113.05%] left-0 max-w-none top-0 w-full" src={imgCategoryPageHeader} />
      </div>
    </div>
  );
}
