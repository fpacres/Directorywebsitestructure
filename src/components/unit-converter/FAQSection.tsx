import { useState } from 'react';
import { Plus, Minus } from 'phosphor-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <h2 
        className="leading-[1.25] relative shrink-0 w-full" 
        style={{ color: 'var(--foreground)', fontSize: '20px' }}
      >
        Frequently Asked Questions
      </h2>
      
      <div className="flex flex-col gap-[16px] w-full">
        {items.map((item, index) => (
          <FAQItem 
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="border border-solid rounded-[var(--radius)] overflow-hidden"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-[24px] py-[20px] text-left hover:bg-[var(--muted)] transition-colors"
      >
        <span 
          className="leading-[1.5] flex-1"
          style={{ color: 'var(--foreground)' }}
        >
          {question}
        </span>
        <span style={{ color: 'var(--accent)' }}>
          {isOpen ? (
            <Minus size={20} weight="bold" />
          ) : (
            <Plus size={20} weight="bold" />
          )}
        </span>
      </button>
      
      {isOpen && (
        <div 
          className="px-[24px] pb-[20px] pt-[8px]"
          style={{ 
            borderTop: '1px solid var(--border)',
            color: 'var(--muted-foreground)' 
          }}
        >
          <p className="leading-[1.5]">{answer}</p>
        </div>
      )}
    </div>
  );
}