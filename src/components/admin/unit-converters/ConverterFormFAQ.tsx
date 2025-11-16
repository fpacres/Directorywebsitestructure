import { Plus } from '@phosphor-icons/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { FAQList } from './faq/FAQList';
import { FAQ, ConverterFormData } from '../../../types/converter';

interface ConverterFormFAQProps {
  formData: ConverterFormData;
  setFormData: (data: ConverterFormData) => void;
}

export function ConverterFormFAQ({ formData, setFormData }: ConverterFormFAQProps) {
  const faqs = formData.faqs || [];

  const handleAddFAQ = () => {
    const newFAQ: FAQ = {
      id: `faq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question: '',
      answer: '',
    };
    setFormData({ ...formData, faqs: [...faqs, newFAQ] });
  };

  const handleUpdateFAQ = (id: string, field: 'question' | 'answer', value: string) => {
    const updatedFAQs = faqs.map((faq) =>
      faq.id === id ? { ...faq, [field]: value } : faq
    );
    setFormData({ ...formData, faqs: updatedFAQs });
  };

  const handleDeleteFAQ = (id: string) => {
    const updatedFAQs = faqs.filter((faq) => faq.id !== id);
    setFormData({ ...formData, faqs: updatedFAQs });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updatedFAQs = [...faqs];
    [updatedFAQs[index - 1], updatedFAQs[index]] = [updatedFAQs[index], updatedFAQs[index - 1]];
    setFormData({ ...formData, faqs: updatedFAQs });
  };

  const handleMoveDown = (index: number) => {
    if (index === faqs.length - 1) return;
    const updatedFAQs = [...faqs];
    [updatedFAQs[index], updatedFAQs[index + 1]] = [updatedFAQs[index + 1], updatedFAQs[index]];
    setFormData({ ...formData, faqs: updatedFAQs });
  };

  return (
    <div
      className="rounded-[var(--radius-card)]"
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="faq" style={{ borderColor: 'var(--border)' }}>
          <AccordionTrigger className="px-6" style={{ color: 'var(--foreground)' }}>
            <div className="flex items-center justify-between w-full pr-4">
              <h3>FAQ Section</h3>
              <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
                {faqs.length} {faqs.length === 1 ? 'question' : 'questions'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <div className="flex flex-col gap-4">
              <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
                Add frequently asked questions to improve SEO and provide helpful information to users.
              </p>

              <FAQList
                faqs={faqs}
                onUpdate={handleUpdateFAQ}
                onDelete={handleDeleteFAQ}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
              />

              <button
                type="button"
                onClick={handleAddFAQ}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-[var(--radius-button)] transition-opacity"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <Plus size={20} weight="bold" />
                <span>Add FAQ</span>
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}