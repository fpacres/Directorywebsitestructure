import { useState, useRef, useEffect } from 'react';
import { CaretDown } from '@phosphor-icons/react';

interface UnitDropdownProps {
  unit: string;
  units: string[];
  onUnitChange?: (unit: string) => void;
}

export function UnitDropdown({ unit, units, onUnitChange }: UnitDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="basis-0 grow min-w-px relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[var(--input-background)] h-[48px] relative rounded-[var(--radius)] w-full transition-colors hover:bg-[var(--muted)]"
        style={{ 
          boxShadow: '0px 1px 2px 0px rgba(18,55,105,0.08), 0px 0px 0px 1px rgba(9,25,72,0.13)'
        }}
      >
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[12px] py-[6px] relative w-full">
            <p className="basis-0 grow min-w-px" style={{ color: 'var(--foreground)' }}>{unit}</p>
            <CaretDown size={20} style={{ color: 'var(--muted-foreground)' }} className="shrink-0" />
          </div>
        </div>
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-[52px] left-0 w-full bg-[var(--popover)] rounded-[var(--radius)] z-50 max-h-[200px] overflow-y-auto"
          style={{ 
            boxShadow: '0px 4px 8px -1px rgba(13,13,18,0.1), 0px 2px 4px 0px rgba(13,13,18,0.06)',
            border: '1px solid var(--border)'
          }}
        >
          {units.map((unitOption) => (
            <button
              key={unitOption}
              onClick={() => {
                onUnitChange && onUnitChange(unitOption);
                setIsOpen(false);
              }}
              className="w-full px-[12px] py-[10px] text-left transition-colors hover:bg-[var(--muted)] first:rounded-t-[var(--radius)] last:rounded-b-[var(--radius)]"
              style={{ 
                color: unit === unitOption ? 'var(--accent)' : 'var(--foreground)',
                fontWeight: unit === unitOption ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'
              }}
            >
              {unitOption}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}