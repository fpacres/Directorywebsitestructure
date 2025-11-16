# Unit Converter - Quick Start Guide

## 🎯 For Developers: Adding a New Converter Type

This guide shows you how to add a new converter type (e.g., Weight, Temperature, Volume) using the **Length Converter as the baseline template**.

---

## 📁 Directory Structure

```
/components/unit-converter/
  /shared/              ← Reusable components (DO NOT MODIFY)
  /length/              ← Length converter (BASELINE TEMPLATE)
  /[your-type]/         ← Your new converter type
```

---

## 🚀 Step-by-Step: Adding Weight Converter

### Step 1: Create the Directory
```
/components/unit-converter/weight/
```

### Step 2: Copy Length Template Files

Copy these 4 files from `/length/` to `/weight/`:

1. **LengthCalculator.tsx** → **WeightCalculator.tsx**
2. **LengthInputRow.tsx** → **WeightInputRow.tsx**  
3. **LengthUnitSelect.tsx** → **WeightUnitSelect.tsx**
4. **useLengthConversion.tsx** → **useWeightConversion.tsx**

### Step 3: Find & Replace

In all 4 files, replace:
- `Length` → `Weight`
- `length` → `weight`
- `convertLength` → `convertWeight`
- `lengthUnits` → `weightUnits`
- `lengthConversions` → `weightConversions`
- `"Length Unit Converter"` → `"Weight Unit Converter"` (in calculator header)

### Step 4: Add Data to `/shared/data/unit-conversions.ts`

```typescript
// Add weight units array
export const weightUnits = [
  'Gram',
  'Kilogram', 
  'Pound',
  'Ounce',
  'Ton'
];

// Add conversion factors (base unit: Kilogram)
export const weightConversions: Record<string, number> = {
  'Gram': 0.001,
  'Kilogram': 1,
  'Pound': 0.453592,
  'Ounce': 0.0283495,
  'Ton': 1000
};

// Add conversion function
export function convertWeight(value: number, fromUnit: string, toUnit: string): number {
  const fromFactor = weightConversions[fromUnit] || 1;
  const toFactor = weightConversions[toUnit] || 1;
  return (value * fromFactor) / toFactor;
}
```

### Step 5: Create Index File

Create `/components/unit-converter/weight/index.tsx`:

```typescript
export { WeightCalculator } from './WeightCalculator';
export { WeightInputRow } from './WeightInputRow';
export { WeightUnitSelect } from './WeightUnitSelect';
export { useWeightConversion } from './useWeightConversion';
```

### Step 6: Update Page to Use New Converter

In your page file (e.g., `/pages/UnitConverterPage.tsx`):

```typescript
// Import the new converter
import { WeightCalculator } from '../components/unit-converter/weight';
import { useWeightConversion } from '../components/unit-converter/weight';
import { convertWeight } from '../shared/data/unit-conversions';

// In your component, use the logic
const {
  fromValue,
  fromUnit,
  toValue,
  toUnit,
  setFromValue,
  setFromUnit,
  setToUnit,
  handleSwap,
  handleCopy,
} = useWeightConversion({
  initialFromUnit: 'Kilogram',
  initialToUnit: 'Pound',
  initialValue: '1'
});

// Render the calculator
<WeightCalculator
  fromValue={fromValue}
  fromUnit={fromUnit}
  toValue={toValue}
  toUnit={toUnit}
  onFromValueChange={setFromValue}
  onFromUnitChange={setFromUnit}
  onToUnitChange={setToUnit}
  onSwap={handleSwap}
  onCopy={handleCopy}
/>
```

---

## ✅ Checklist

- [ ] Created `/weight/` directory
- [ ] Copied 4 files from `/length/`
- [ ] Renamed all files (Length → Weight)
- [ ] Updated all imports and references
- [ ] Added `weightUnits` array to `/shared/data/unit-conversions.ts`
- [ ] Added `weightConversions` object to `/shared/data/unit-conversions.ts`
- [ ] Added `convertWeight` function to `/shared/data/unit-conversions.ts`
- [ ] Created `/weight/index.tsx` for exports
- [ ] Updated page to use new converter
- [ ] Tested conversions are accurate
- [ ] Verified all files are under 100 lines
- [ ] Checked keyboard shortcuts work (Enter, Cmd+C)
- [ ] Tested copy/reset buttons
- [ ] Verified responsive on mobile/tablet/desktop

---

## 🎨 Design System Compliance

All components automatically use CSS variables from `/styles/globals.css`:

### Colors Used
- `var(--card)` - Calculator background
- `var(--border)` - Borders
- `var(--foreground)` - Primary text
- `var(--muted-foreground)` - Secondary text
- `var(--accent)` - Icons, accents
- `var(--primary)` - Primary buttons
- `var(--muted)` - Muted backgrounds
- `var(--input-background)` - Input fields

### Spacing
- Gaps: `gap-[16px]`, `gap-[24px]`
- Padding: `p-[32px]`, `px-[24px]`, `py-[20px]`

### Radius
- `var(--radius)` - Default (12px)
- `var(--radius-card)` - Cards (24px)

### Typography
- Font: Inter (from globals.css)
- Sizes: `var(--text-sm)`, `var(--text-base)`, `var(--text-lg)`

**No hardcoded styles needed!** Just follow the template.

---

## 📦 What You Get for Free

When using the shared components, you automatically get:

✅ **Card styling** with borders and shadows  
✅ **Keyboard shortcuts** (Enter to swap, Cmd+C to copy)  
✅ **Copy button** with toast notifications  
✅ **Reset button** functionality  
✅ **Input validation** (numbers only)  
✅ **Swap animation** with icon  
✅ **Responsive design** (mobile/tablet/desktop)  
✅ **Focus states** on inputs  
✅ **Hover effects** on buttons  
✅ **Loading states** (if needed)  
✅ **Design system compliance**  

---

## 🔍 File Size Verification

All files MUST be under 100 lines (FSD guideline). Use this command to check:

```bash
wc -l /components/unit-converter/weight/*.tsx
```

Expected sizes (based on length template):
- `WeightCalculator.tsx` - ~90 lines
- `WeightInputRow.tsx` - ~50 lines
- `WeightUnitSelect.tsx` - ~40 lines
- `useWeightConversion.tsx` - ~50 lines

Total: ~230 lines for complete converter type

---

## 🚨 Common Mistakes to Avoid

❌ **DON'T** modify shared components  
✅ **DO** reuse them as-is

❌ **DON'T** hardcode colors or styles  
✅ **DO** use CSS variables

❌ **DON'T** create files over 100 lines  
✅ **DO** chunk into micro-components if needed

❌ **DON'T** use different icon libraries  
✅ **DO** use @phosphor-icons/react

❌ **DON'T** duplicate logic  
✅ **DO** follow the template pattern

---

## 📚 Additional Examples

### Temperature Converter

Base unit: Celsius

```typescript
export const temperatureUnits = ['Celsius', 'Fahrenheit', 'Kelvin'];

export function convertTemperature(value: number, fromUnit: string, toUnit: string): number {
  // Convert to Celsius first
  let celsius: number;
  switch (fromUnit) {
    case 'Fahrenheit':
      celsius = (value - 32) * 5/9;
      break;
    case 'Kelvin':
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }
  
  // Convert from Celsius to target
  switch (toUnit) {
    case 'Fahrenheit':
      return (celsius * 9/5) + 32;
    case 'Kelvin':
      return celsius + 273.15;
    default:
      return celsius;
  }
}
```

### Volume Converter

Base unit: Liter

```typescript
export const volumeUnits = ['Milliliter', 'Liter', 'Gallon', 'Cup', 'Tablespoon'];

export const volumeConversions: Record<string, number> = {
  'Milliliter': 0.001,
  'Liter': 1,
  'Gallon': 3.78541,
  'Cup': 0.236588,
  'Tablespoon': 0.0147868
};

export function convertVolume(value: number, fromUnit: string, toUnit: string): number {
  const fromFactor = volumeConversions[fromUnit] || 1;
  const toFactor = volumeConversions[toUnit] || 1;
  return (value * fromFactor) / toFactor;
}
```

---

## 🤝 Need Help?

1. **Reference**: Look at `/length/` files - they're the gold standard
2. **Documentation**: Read `/docs/converter-architecture.md` for deep dive
3. **Pattern**: Copy → Rename → Replace → Test

---

## 🎉 You're Done!

Your new converter type is now:
- ✅ Consistent with the design system
- ✅ Following FSD architecture (under 100 lines)
- ✅ Reusing all shared components
- ✅ Ready to expand with more units

**Time to create**: ~15 minutes per converter type

---

**Last Updated**: November 16, 2025  
**Status**: ✅ Production Ready