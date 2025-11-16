import { RichTextEditor } from './RichTextEditor';

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  rows?: number;
  richEditor?: boolean;
}

export function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  required,
  helperText,
  rows = 3,
  richEditor = false,
}: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label style={{ color: 'var(--foreground)' }}>
        {label}
        {required && <span style={{ color: 'var(--destructive)' }}> *</span>}
      </label>
      
      {richEditor ? (
        <RichTextEditor value={value} onChange={onChange} />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="px-4 py-3 rounded-[var(--radius)] outline-none transition-colors resize-vertical"
          style={{
            backgroundColor: 'var(--input-background)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
            pointerEvents: 'auto',
            userSelect: 'text',
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--ring)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          disabled={false}
          readOnly={false}
        />
      )}
      
      {helperText && (
        <p style={{ color: 'var(--muted-foreground)' }}>
          {helperText}
        </p>
      )}
    </div>
  );
}