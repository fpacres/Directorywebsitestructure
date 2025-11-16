import { FAQItem } from './FAQItem';
import { FAQ } from '../../../../types/converter';

interface FAQListProps {
  faqs: FAQ[];
  onUpdate: (id: string, field: 'question' | 'answer', value: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export function FAQList({ faqs, onUpdate, onDelete, onMoveUp, onMoveDown }: FAQListProps) {
  if (faqs.length === 0) {
    return (
      <div
        className="p-8 rounded-[var(--radius-card)] text-center"
        style={{
          backgroundColor: 'var(--muted)',
          border: '1px dashed var(--border)',
        }}
      >
        <p style={{ color: 'var(--muted-foreground)' }}>
          No FAQs added yet. Click "Add FAQ" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          index={index}
          totalItems={faqs.length}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        />
      ))}
    </div>
  );
}