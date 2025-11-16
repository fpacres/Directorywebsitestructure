import { useState, useEffect } from 'react';
import { convertLength } from '../../../shared/data/unit-conversions';

interface UseLengthConversionProps {
  initialFromUnit?: string;
  initialToUnit?: string;
  initialValue?: string;
}

export function useLengthConversion({
  initialFromUnit = 'Meter',
  initialToUnit = 'Foot',
  initialValue = '1'
}: UseLengthConversionProps = {}) {
  const [fromValue, setFromValue] = useState(initialValue);
  const [fromUnit, setFromUnit] = useState(initialFromUnit);
  const [toValue, setToValue] = useState('');
  const [toUnit, setToUnit] = useState(initialToUnit);

  useEffect(() => {
    const numValue = parseFloat(fromValue);
    if (!isNaN(numValue) && fromValue !== '') {
      const result = convertLength(numValue, fromUnit, toUnit);
      setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
    } else {
      setToValue('');
    }
  }, [fromValue, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue || '0');
  };

  const handleCopy = () => {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(toValue).catch(() => {
        // Fallback to older method if Clipboard API fails
        fallbackCopyToClipboard(toValue);
      });
    } else {
      // Use fallback for older browsers or when Clipboard API is blocked
      fallbackCopyToClipboard(toValue);
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  };

  return {
    fromValue,
    fromUnit,
    toValue,
    toUnit,
    setFromValue,
    setFromUnit,
    setToUnit,
    handleSwap,
    handleCopy,
  };
}