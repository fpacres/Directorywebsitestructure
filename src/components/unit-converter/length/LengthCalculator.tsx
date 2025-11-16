import { useState, useEffect } from 'react';
import { toast } from 'sonner@2.0.3';
import { CalculatorFrame } from '../shared/calculator/CalculatorFrame';
import { CalculatorHeader } from '../shared/calculator/CalculatorHeader';
import { LengthInputRow } from './LengthInputRow';
import { SwapButton } from '../shared/calculator/SwapButton';
import { CalculatorActions } from '../shared/calculator/CalculatorActions';
import { ConversionFormula } from '../shared/ConversionFormula';
import { getConversionFactor } from '../../../shared/data/unit-conversions';

interface LengthCalculatorProps {
  fromValue: string;
  fromUnit: string;
  toValue: string;
  toUnit: string;
  onFromValueChange: (value: string) => void;
  onFromUnitChange: (unit: string) => void;
  onToUnitChange: (unit: string) => void;
  onSwap: () => void;
  onCopy: () => void;
}

export function LengthCalculator({
  fromValue,
  fromUnit,
  toValue,
  toUnit,
  onFromValueChange,
  onFromUnitChange,
  onToUnitChange,
  onSwap,
  onCopy
}: LengthCalculatorProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onSwap();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        handleCopy();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSwap, toValue]);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    toast.success('Result copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    onFromValueChange('1');
    toast.info('Calculator reset');
  };

  const conversionFactor = getConversionFactor(fromUnit, toUnit);

  return (
    <CalculatorFrame>
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
        <CalculatorHeader title="Length Unit Converter" onReset={handleReset} />
        <LengthInputRow 
          value={fromValue}
          unit={fromUnit}
          onChange={onFromValueChange}
          onUnitChange={onFromUnitChange}
          editable
        />
        <SwapButton onSwap={onSwap} />
        <LengthInputRow 
          value={toValue}
          unit={toUnit}
          onUnitChange={onToUnitChange}
        />
      </div>
      <ConversionFormula 
        fromUnit={fromUnit}
        toUnit={toUnit}
        conversionFactor={parseFloat(conversionFactor.toFixed(6))}
      />
      <CalculatorActions onCopy={handleCopy} copied={copied} />
    </CalculatorFrame>
  );
}