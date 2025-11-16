import { UnitInput } from './UnitInput';

interface InputRowProps {
  value: string;
  unit: string;
  onChange?: (value: string) => void;
  onUnitChange?: (unit: string) => void;
  editable?: boolean;
}

export function InputRow({ value, unit, onChange, onUnitChange, editable = false }: InputRowProps) {
  return (
    <div className="box-border content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <UnitInput
        value={value}
        onChange={onChange}
        editable={editable}
      />
      <div className="relative shrink-0 w-[200px]">
        {onUnitChange ? (
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            className="w-full px-4 py-3 rounded-[var(--radius)] outline-none transition-colors appearance-none cursor-pointer"
            style={{
              backgroundColor: 'var(--muted)',
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
            }}
          >
            {/* Units will be passed from parent */}
          </select>
        ) : (
          <div
            className="w-full px-4 py-3 rounded-[var(--radius)]"
            style={{
              backgroundColor: 'var(--muted)',
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
            }}
          >
            {unit}
          </div>
        )}
      </div>
    </div>
  );
}
