import { useState, useEffect } from 'react';
import NavMenu from '../components/NavMenu';
import Footer from '../components/Footer';
import { ToolHeader } from '../components/unit-converter/ToolHeader';
import { CalculatorWidget } from '../components/unit-converter/CalculatorWidget';
import { RelatedTools } from '../components/unit-converter/RelatedTools';
import { UnitConverterContent } from '../widgets/unit-converter-content';
import { relatedTools, descriptionSections } from '../shared/data/inch-to-meter-data';
import { convertLength } from '../shared/data/unit-conversions';
import { Toaster } from '../components/ui/sonner';

export default function UnitConverterPage() {
  const [fromValue, setFromValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('Inch');
  const [toValue, setToValue] = useState('0.0254');
  const [toUnit, setToUnit] = useState('Meter');

  useEffect(() => {
    const numValue = parseFloat(fromValue) || 0;
    const result = convertLength(numValue, fromUnit, toUnit);
    setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
  }, [fromValue, fromUnit, toUnit]);

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
  };

  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(toValue);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Toaster position="top-center" />
      <NavMenu />
      
      <main className="box-border content-stretch flex flex-col gap-[12px] items-start relative w-full">
        <ToolHeader 
          categoryName="Unit Converter"
          title="Inches to Meters Converter (in to m)"
          description="Convert in to m instantly with charts, formulas, and height examples."
        />
        
        <UnitConverterContent
          calculator={
            <CalculatorWidget
              fromValue={fromValue}
              fromUnit={fromUnit}
              toValue={toValue}
              toUnit={toUnit}
              onFromValueChange={handleFromValueChange}
              onFromUnitChange={handleFromUnitChange}
              onToUnitChange={handleToUnitChange}
              onSwap={handleSwap}
              onCopy={handleCopy}
            />
          }
          relatedTools={<RelatedTools tools={relatedTools} />}
          descriptionSections={descriptionSections}
        />
      </main>
      
      <Footer />
    </div>
  );
}