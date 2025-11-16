import { UnitInput } from '../shared/calculator/UnitInput';
import { LengthUnitSelect } from './LengthUnitSelect';

interface LengthInputRowProps {
  value: string;
  unit: string;
  onChange?: (value: string) => void;
  onUnitChange?: (unit: string) => void;
  editable?: boolean;
}

export function LengthInputRow({ 
  value, 
  unit, 
  onChange, 
  onUnitChange, 
  editable = false 
}: LengthInputRowProps) {
  return (
    <div className="box-border content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <UnitInput
        value={value}
        onChange={onChange}
        editable={editable}
      />
      <div className="relative shrink-0 w-[200px]">
        {onUnitChange ? (
          <LengthUnitSelect
            value={unit}
            onChange={onUnitChange}
          />
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
