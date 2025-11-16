interface FormToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function FormToggle({ label, description, checked, onChange }: FormToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <label style={{ color: 'var(--foreground)' }}>
          {label}
        </label>
        {description && (
          <p style={{ color: 'var(--muted-foreground)' }}>
            {description}
          </p>
        )}
      </div>
      
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
        style={{
          backgroundColor: checked ? 'var(--primary)' : 'var(--muted)',
        }}
      >
        <span
          className="inline-block h-4 w-4 transform rounded-full transition-transform"
          style={{
            backgroundColor: 'var(--card)',
            transform: checked ? 'translateX(24px)' : 'translateX(4px)',
          }}
        />
      </button>
    </div>
  );
}
