interface AuthFormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export function AuthFormInput({ 
  id, 
  label, 
  type, 
  value, 
  onChange, 
  placeholder, 
  disabled 
}: AuthFormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} style={{ color: 'var(--foreground)' }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 px-4 rounded-[var(--radius)] border transition-colors outline-none"
        style={{
          backgroundColor: 'var(--input-background)',
          borderColor: 'var(--border)',
          color: 'var(--foreground)'
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--ring)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
        disabled={disabled}
      />
    </div>
  );
}
