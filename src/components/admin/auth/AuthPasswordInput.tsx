import { useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';

interface AuthPasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export function AuthPasswordInput({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  disabled 
}: AuthPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} style={{ color: 'var(--foreground)' }}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 px-4 pr-12 rounded-[var(--radius)] border transition-colors outline-none w-full"
          style={{
            backgroundColor: 'var(--input-background)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--ring)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
          style={{ color: 'var(--muted-foreground)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted-foreground)'}
          disabled={disabled}
        >
          {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}
