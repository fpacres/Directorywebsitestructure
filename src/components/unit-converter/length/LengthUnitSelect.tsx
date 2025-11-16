import { lengthUnits } from '../../../shared/data/unit-conversions';

interface LengthUnitSelectProps {
  value: string;
  onChange: (unit: string) => void;
  disabled?: boolean;
}

export function LengthUnitSelect({ value, onChange, disabled = false }: LengthUnitSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full px-4 py-3 rounded-[var(--radius)] outline-none transition-colors appearance-none cursor-pointer"
      style={{
        backgroundColor: 'var(--muted)',
        border: '1px solid var(--border)',
        color: 'var(--foreground)',
      }}
      onFocus={(e) => {
        if (!disabled) {
          e.currentTarget.style.borderColor = 'var(--ring)';
        }
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {lengthUnits.map((unit) => (
        <option key={unit} value={unit}>
          {unit}
        </option>
      ))}
    </select>
  );
}
