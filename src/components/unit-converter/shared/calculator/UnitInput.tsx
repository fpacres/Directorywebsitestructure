interface UnitInputProps {
  value: string;
  onChange?: (value: string) => void;
  editable?: boolean;
}

export function UnitInput({ value, onChange, editable = false }: UnitInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '' || newValue === '-' || !isNaN(Number(newValue))) {
      onChange?.(newValue);
    }
  };

  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[4px] grow items-start relative shrink-0">
      <label 
        style={{ 
          color: 'var(--muted-foreground)',
          fontSize: 'var(--text-sm)'
        }}
      >
        {editable ? 'Enter Value' : 'Result'}
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        readOnly={!editable}
        placeholder={editable ? "Enter value" : ""}
        className="w-full px-4 py-3 rounded-[var(--radius)] outline-none transition-colors"
        style={{
          backgroundColor: editable ? 'var(--input-background)' : 'var(--muted)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
          cursor: editable ? 'text' : 'default',
        }}
        onFocus={(e) => {
          if (editable) {
            e.currentTarget.style.borderColor = 'var(--ring)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
        }}
      />
    </div>
  );
}
