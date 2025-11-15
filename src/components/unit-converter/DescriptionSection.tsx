interface DescriptionSectionProps {
  title: string;
  paragraphs: string[];
}

export function DescriptionSection({ title, paragraphs }: DescriptionSectionProps) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center not-italic relative shrink-0 w-full">
      <h2 className="leading-[1.3] relative shrink-0 text-[#0d0d12] tracking-[-0.96px] w-full text-[20px]">
        {title}
      </h2>
      <div className="leading-[1.5] relative shrink-0 text-[#666d80] tracking-[-0.32px] w-full">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={index < paragraphs.length - 1 ? "mb-4" : "mb-0"}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
