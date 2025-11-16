interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  type?: string;
}

export function FormInput({
  label,
  value,
  onChange,
  placeholder,
  required,
  helperText,
  type = 'text',
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label style={{ color: 'var(--foreground)' }}>
        {label}
        {required && <span style={{ color: 'var(--destructive)' }}> *</span>}
      </label>
      
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-4 py-3 rounded-[var(--radius)] outline-none transition-colors"
        style={{
          backgroundColor: 'var(--input-background)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--ring)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
      />
      
      {helperText && (
        <p style={{ color: 'var(--muted-foreground)' }}>
          {helperText}
        </p>
      )}
    </div>
  );
}
