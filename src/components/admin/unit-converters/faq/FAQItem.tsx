import { Trash, ArrowUp, ArrowDown } from '@phosphor-icons/react';
import { FAQ } from '../../../../types/converter';

interface FAQItemProps {
  faq: FAQ;
  index: number;
  totalItems: number;
  onUpdate: (id: string, field: 'question' | 'answer', value: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export function FAQItem({
  faq,
  index,
  totalItems,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: FAQItemProps) {
  return (
    <div
      className="p-4 rounded-[var(--radius-card)] flex flex-col gap-4"
      style={{
        backgroundColor: 'var(--muted)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
          FAQ #{index + 1}
        </span>
        
        <div className="flex items-center gap-2">
          {/* Move up button */}
          <button
            type="button"
            onClick={() => onMoveUp(index)}
            disabled={index === 0}
            className="p-2 rounded-[var(--radius-button)] transition-opacity"
            style={{
              backgroundColor: 'var(--background)',
              opacity: index === 0 ? '0.4' : '1',
              cursor: index === 0 ? 'not-allowed' : 'pointer',
            }}
            aria-label="Move up"
          >
            <ArrowUp size={16} style={{ color: 'var(--foreground)' }} />
          </button>

          {/* Move down button */}
          <button
            type="button"
            onClick={() => onMoveDown(index)}
            disabled={index === totalItems - 1}
            className="p-2 rounded-[var(--radius-button)] transition-opacity"
            style={{
              backgroundColor: 'var(--background)',
              opacity: index === totalItems - 1 ? '0.4' : '1',
              cursor: index === totalItems - 1 ? 'not-allowed' : 'pointer',
            }}
            aria-label="Move down"
          >
            <ArrowDown size={16} style={{ color: 'var(--foreground)' }} />
          </button>

          {/* Delete button */}
          <button
            type="button"
            onClick={() => onDelete(faq.id)}
            className="p-2 rounded-[var(--radius-button)] transition-opacity"
            style={{ backgroundColor: 'var(--destructive)' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            aria-label="Delete FAQ"
          >
            <Trash size={16} style={{ color: 'var(--destructive-foreground)' }} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={faq.question}
          onChange={(e) => onUpdate(faq.id, 'question', e.target.value)}
          placeholder="Enter your question here..."
          className="px-4 py-3 rounded-[var(--radius)] outline-none transition-colors"
          style={{
            backgroundColor: 'var(--input-background)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--ring)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
        />

        <textarea
          value={faq.answer}
          onChange={(e) => onUpdate(faq.id, 'answer', e.target.value)}
          placeholder="Enter the answer here..."
          rows={3}
          className="px-4 py-3 rounded-[var(--radius)] outline-none transition-colors resize-vertical"
          style={{
            backgroundColor: 'var(--input-background)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--ring)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
        />
      </div>
    </div>
  );
}