import { ArrowsLeftRight, Copy, ArrowCounterClockwise, Check, CaretUp, CaretDown } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { UnitDropdown } from './UnitDropdown';
import { ConversionFormula } from './ConversionFormula';
import { lengthUnits, convertLength, getConversionFactor } from '../../shared/data/unit-conversions';
import { toast } from 'sonner@2.0.3';

interface CalculatorWidgetProps {
  fromValue: string;
  fromUnit: string;
  toValue: string;
  toUnit: string;
  onFromValueChange: (value: string) => void;
  onSwap: () => void;
  onCopy: () => void;
  onFromUnitChange?: (unit: string) => void;
  onToUnitChange?: (unit: string) => void;
}

export function CalculatorWidget({
  fromValue,
  fromUnit,
  toValue,
  toUnit,
  onFromValueChange,
  onSwap,
  onCopy,
  onFromUnitChange,
  onToUnitChange
}: CalculatorWidgetProps) {
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
    <div className="bg-[var(--card)] relative rounded-[var(--radius-card)] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
          <CalculatorInputs 
            fromValue={fromValue}
            fromUnit={fromUnit}
            toValue={toValue}
            toUnit={toUnit}
            onFromValueChange={onFromValueChange}
            onSwap={onSwap}
            onReset={handleReset}
            onFromUnitChange={onFromUnitChange}
            onToUnitChange={onToUnitChange}
          />
          <ConversionFormula 
            fromUnit={fromUnit}
            toUnit={toUnit}
            conversionFactor={parseFloat(conversionFactor.toFixed(6))}
          />
          <CalculatorActions onCopy={handleCopy} copied={copied} />
        </div>
      </div>
      <div 
        aria-hidden="true" 
        className="absolute border border-solid inset-0 pointer-events-none rounded-[var(--radius-card)]"
        style={{ 
          borderColor: 'var(--border)',
          boxShadow: 'var(--elevation-sm)'
        }}
      />
    </div>
  );
}

function CalculatorInputs({ 
  fromValue, 
  fromUnit, 
  toValue, 
  toUnit, 
  onFromValueChange,
  onSwap,
  onReset,
  onFromUnitChange,
  onToUnitChange
}: {
  fromValue: string;
  fromUnit: string;
  toValue: string;
  toUnit: string;
  onFromValueChange: (value: string) => void;
  onSwap: () => void;
  onReset: () => void;
  onFromUnitChange?: (unit: string) => void;
  onToUnitChange?: (unit: string) => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="flex items-center justify-between w-full">
        <div 
          className="inline-flex items-center px-[8.571px] py-[6.857px] rounded-[6px]"
          style={{ 
            backgroundColor: 'var(--muted)',
            color: 'var(--accent)'
          }}
        >
          <p style={{ fontSize: 'var(--text-sm)' }}>
            Calculator Tool
          </p>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-[6px] px-[10px] py-[6px] rounded-[6px] transition-colors"
          style={{ 
            color: 'var(--muted-foreground)',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <ArrowCounterClockwise size={16} />
          <span style={{ fontSize: 'var(--text-sm)' }}>Reset</span>
        </button>
      </div>
      
      <InputRow value={fromValue} unit={fromUnit} onChange={onFromValueChange} editable onUnitChange={onFromUnitChange} />
      <SwapButton onSwap={onSwap} />
      <InputRow value={toValue} unit={toUnit} onUnitChange={onToUnitChange} />
    </div>
  );
}

function InputRow({ value, unit, onChange, editable = false, onUnitChange }: { 
  value: string; 
  unit: string; 
  onChange?: (value: string) => void; 
  editable?: boolean;
  onUnitChange?: (unit: string) => void;
}) {
  const handleChange = (newValue: string) => {
    if (/^\d*\.?\d*$/.test(newValue) || newValue === '') {
      onChange?.(newValue);
    }
  };

  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <UnitInput value={value} onChange={handleChange} editable={editable} />
      <UnitDropdown 
        unit={unit} 
        units={lengthUnits}
        onUnitChange={onUnitChange} 
      />
    </div>
  );
}

function UnitInput({ value, onChange, editable }: { 
  value: string; 
  onChange?: (value: string) => void; 
  editable?: boolean;
}) {
  const handleIncrement = () => {
    const numValue = parseFloat(value) || 0;
    onChange?.((numValue + 1).toString());
  };

  const handleDecrement = () => {
    const numValue = parseFloat(value) || 0;
    onChange?.((numValue - 1).toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };

  return (
    <div className="basis-0 grow min-w-px">
      <div 
        className="bg-[var(--input-background)] h-[48px] relative rounded-[var(--radius)] w-full"
        style={{ 
          boxShadow: '0px 1px 2px 0px rgba(18,55,105,0.08), 0px 0px 0px 1px rgba(9,25,72,0.13)'
        }}
      >
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[12px] py-[6px] relative w-full">
            {editable ? (
              <>
                <input 
                  type="text"
                  value={value}
                  onChange={(e) => onChange?.(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="basis-0 grow min-w-px bg-transparent border-none outline-none"
                  style={{ color: 'var(--foreground)' }}
                  placeholder="Enter value"
                />
                <div className="flex flex-col gap-[2px] shrink-0">
                  <button
                    onClick={handleIncrement}
                    className="flex items-center justify-center w-[20px] h-[16px] rounded-[4px] transition-colors"
                    style={{ 
                      color: 'var(--muted-foreground)',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--muted)';
                      e.currentTarget.style.color = 'var(--foreground)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--muted-foreground)';
                    }}
                  >
                    <CaretUp size={12} weight="bold" />
                  </button>
                  <button
                    onClick={handleDecrement}
                    className="flex items-center justify-center w-[20px] h-[16px] rounded-[4px] transition-colors"
                    style={{ 
                      color: 'var(--muted-foreground)',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--muted)';
                      e.currentTarget.style.color = 'var(--foreground)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--muted-foreground)';
                    }}
                  >
                    <CaretDown size={12} weight="bold" />
                  </button>
                </div>
              </>
            ) : (
              <p className="basis-0 grow min-w-px" style={{ color: 'var(--foreground)' }}>
                {value}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SwapButton({ onSwap }: { onSwap: () => void }) {
  return (
    <div className="w-full">
      <button 
        onClick={onSwap}
        className="h-[48px] relative rounded-[var(--radius)] w-full transition-colors"
        style={{ 
          backgroundColor: 'var(--muted)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center px-[12px] py-[6px] relative w-full">
            <ArrowsLeftRight size={24} style={{ color: 'var(--accent)' }} />
          </div>
        </div>
      </button>
    </div>
  );
}

function CalculatorActions({ onCopy, copied }: { onCopy: () => void; copied: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <button 
        onClick={onCopy}
        className="h-[48px] relative rounded-[var(--radius-button)] w-full transition-colors"
        style={{ 
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center p-[16px] relative w-full">
            {copied ? <Check size={20} /> : <Copy size={20} />}
            <p className="not-italic relative shrink-0 text-nowrap whitespace-pre">
              {copied ? 'Copied!' : 'Copy Result'}
            </p>
          </div>
        </div>
      </button>
      <p 
        className="not-italic relative shrink-0 text-center w-full"
        style={{ 
          color: 'var(--muted-foreground)',
          fontSize: 'var(--text-sm)'
        }}
      >
        Enter to swap • ↑↓ to increment • Ctrl+C to copy
      </p>
    </div>
  );
}