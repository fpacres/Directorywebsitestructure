interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  helperText?: string;
}

export function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
  helperText,
}: FormSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label style={{ color: 'var(--foreground)' }}>
        {label}
        {required && <span style={{ color: 'var(--destructive)' }}> *</span>}
      </label>
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-3 rounded-[var(--radius)] outline-none transition-colors"
        style={{
          backgroundColor: 'var(--input-background)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--ring)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {helperText && (
        <p style={{ color: 'var(--muted-foreground)' }}>
          {helperText}
        </p>
      )}
    </div>
  );
}
