interface ConversionFormulaProps {
  fromUnit: string;
  toUnit: string;
  conversionFactor: number;
}

export function ConversionFormula({ fromUnit, toUnit, conversionFactor }: ConversionFormulaProps) {
  return (
    <div 
      className="w-full px-[16px] py-[12px] rounded-[var(--radius)] border"
      style={{ 
        backgroundColor: 'var(--muted)',
        borderColor: 'var(--border)'
      }}
    >
      <p 
        className="text-center"
        style={{ 
          color: 'var(--muted-foreground)',
          fontSize: 'var(--text-sm)'
        }}
      >
        1 {fromUnit} = {conversionFactor} {toUnit}
      </p>
    </div>
  );
}
