interface FooterColumnProps {
  title?: string;
  links: string[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
      {/* Title */}
      {title && (
        <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white tracking-[-0.36px] w-full">
          <h3 className="leading-[1.5]">{title}</h3>
        </div>
      )}
      
      {/* Links */}
      <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full p-[0px]">
        {links.map(item => (
          <a 
            key={item} 
            href="#" 
            className="flex flex-col justify-center relative shrink-0 w-full hover:underline hover:text-white transition-colors cursor-pointer text-[#818898] text-[16px] tracking-[-0.32px]"
          >
            <p className="leading-[1.5]">{item}</p>
          </a>
        ))}
      </div>
    </div>
  );
}