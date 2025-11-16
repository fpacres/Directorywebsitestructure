interface ConversionFormulaProps {
  fromUnit: string;
  toUnit: string;
  conversionFactor: number;
}

export function ConversionFormula({ fromUnit, toUnit, conversionFactor }: ConversionFormulaProps) {
  return (
    <div
      className="box-border flex items-center gap-[8px] p-[16px] relative shrink-0 w-full rounded-[var(--radius)]"
      style={{
        backgroundColor: 'var(--muted)',
        border: '1px solid var(--border)',
      }}
    >
      <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
        Formula:
      </span>
      <span style={{ color: 'var(--foreground)', fontSize: 'var(--text-sm)' }}>
        1 {fromUnit} = {conversionFactor} {toUnit}
      </span>
    </div>
  );
}
