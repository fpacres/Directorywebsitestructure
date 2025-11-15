import { DescriptionSection } from '../components/unit-converter/DescriptionSection';
import { FAQSection } from '../components/unit-converter/FAQSection';

interface ContentSectionProps {
  calculator: React.ReactNode;
  relatedTools: React.ReactNode;
  descriptionSections: Array<{ title: string; paragraphs: string[] }>;
  faqSections?: Array<{ question: string; answer: string }>;
}

export function UnitConverterContent({ 
  calculator, 
  relatedTools, 
  descriptionSections,
  faqSections
}: ContentSectionProps) {
  return (
    <div className="bg-white relative rounded-[30px] shadow-[0px_4px_8px_-1px_rgba(13,13,18,0.02)] shrink-0 w-full">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[56px] items-center px-[104px] py-[64px] relative w-full">
          <div className="content-stretch flex gap-[40px] items-start justify-center relative shrink-0 w-full z-[1]">
            <DescriptionArea descriptionSections={descriptionSections} faqSections={faqSections} />
            <Sidebar calculator={calculator} relatedTools={relatedTools} />
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

function Sidebar({ calculator, relatedTools }: { calculator: React.ReactNode; relatedTools: React.ReactNode }) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[40px] grow items-start justify-center min-h-px min-w-px relative shrink-0 sticky top-[24px] self-start">
      {calculator}
      {relatedTools}
    </div>
  );
}