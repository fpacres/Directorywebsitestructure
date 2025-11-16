interface DescriptionSectionProps {
  title: string;
  paragraphs: string[];
}

export function DescriptionSection({ title, paragraphs }: DescriptionSectionProps) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center not-italic relative shrink-0 w-full">
      <div 
        className="leading-[1.5] relative shrink-0 tracking-[-0.32px] w-full rich-text-content"
        style={{ color: 'var(--muted-foreground)' }}
      >
        {paragraphs.map((paragraph, index) => (
          <div 
            key={index} 
            className={`prose prose-headings:text-foreground prose-p:text-foreground ${index < paragraphs.length - 1 ? "mb-4" : "mb-0"}`}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>
    </div>
  );
}