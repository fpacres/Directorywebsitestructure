import { Check } from '@phosphor-icons/react';

const benefits = [
  'Create and manage unit converter pages',
  'Edit SEO metadata and content',
  'Control page visibility (draft/published)',
  'Track page analytics'
];

export function SetupBenefits() {
  return (
    <div 
      className="mb-8 p-4 rounded-[var(--radius)] border"
      style={{ 
        backgroundColor: 'var(--muted)',
        borderColor: 'var(--border)'
      }}
    >
      <p style={{ color: 'var(--foreground)', fontSize: 'var(--text-sm)' }} className="mb-3">
        What you'll be able to do:
      </p>
      <ul className="space-y-2">
        {benefits.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check size={18} style={{ color: 'var(--accent)' }} weight="bold" className="mt-0.5" />
            <span style={{ color: 'var(--foreground)', fontSize: 'var(--text-sm)' }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
