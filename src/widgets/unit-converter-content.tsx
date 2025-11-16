import { DescriptionSection } from '../components/unit-converter/shared/DescriptionSection';
import { FAQSection } from '../components/unit-converter/shared/FAQSection';
import { RelatedConverters } from '../components/unit-converter/shared/RelatedConverters';

interface ContentSectionProps {
  calculator: React.ReactNode;
  relatedTools: React.ReactNode;
  descriptionSections: Array<{ title: string; paragraphs: string[] }>;
  faqSections?: Array<{ question: string; answer: string }>;
  relatedConverters?: Array<{ id: string; title: string; slug: string; category?: string }>;
  categoryName?: string;
}

export function UnitConverterContent({ 
  calculator, 
  relatedTools, 
  descriptionSections,
  faqSections,
  relatedConverters,
  categoryName
}: ContentSectionProps) {
  return (
    <div 
      className="relative rounded-[30px] shrink-0 w-full"
      style={{
        backgroundColor: 'var(--card)',
        boxShadow: 'var(--elevation-nav)'
      }}
    >
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[56px] items-center px-[104px] py-[64px] relative w-full">
          <div className="content-stretch flex gap-[40px] items-start justify-center relative shrink-0 w-full z-[1]">
            <DescriptionArea descriptionSections={descriptionSections} faqSections={faqSections} />
            <Sidebar 
              calculator={calculator} 
              relatedConverters={relatedConverters}
              categoryName={categoryName}
              relatedTools={relatedTools} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DescriptionArea({ 
  descriptionSections, 
  faqSections 
}: { 
  descriptionSections: Array<{ title: string; paragraphs: string[] }>; 
  faqSections?: Array<{ question: string; answer: string }>;
}) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[64px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
      {descriptionSections.map((section, index) => (
        <DescriptionSection
          key={index}
          title={section.title}
          paragraphs={section.paragraphs}
        />
      ))}
      {faqSections && <FAQSection items={faqSections} />}
    </div>
  );
}

function Sidebar({ calculator, relatedConverters, categoryName, relatedTools }: { calculator: React.ReactNode; relatedConverters?: Array<{ id: string; title: string; slug: string; category?: string }>; categoryName?: string; relatedTools: React.ReactNode }) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[40px] grow items-start justify-center min-h-px min-w-px relative shrink-0 sticky top-[120px] self-start">
      {calculator}
      {relatedConverters && <RelatedConverters converters={relatedConverters} categoryName={categoryName} />}
    </div>
  );
}