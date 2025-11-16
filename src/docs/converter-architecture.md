# Converter Architecture - Baseline Template

## Overview

This document defines the **baseline architecture** for all unit converter types. The Length Converter serves as the reference implementation that all future converter types (weight, temperature, volume, etc.) must follow.

## Architecture Principles

1. **Shared Components** - Reusable UI across all converter types
2. **Type-Specific Logic** - Each converter has its own conversion logic
3. **Under 100 Lines** - Every file must be under 100 lines (FSD guideline)
4. **CSS Variables** - All styling uses design system CSS variables
5. **Scalability** - Easy to add new converter types

## Directory Structure

```
/components/unit-converter/
  /shared/                              # Shared across ALL converter types
    /calculator/                        # Calculator UI components
      CalculatorFrame.tsx               # Outer frame with card styling
      CalculatorHeader.tsx              # Header with reset button
      UnitInput.tsx                     # Input field component
      SwapButton.tsx                    # Swap button component
      CalculatorActions.tsx             # Copy/action buttons
    ToolHeader.tsx                      # Page header component
    ConversionFormula.tsx               # Formula display component
    RelatedTools.tsx                    # Related converters list
    
  /length/                              # LENGTH-SPECIFIC components
    LengthCalculator.tsx                # Main length calculator (uses shared components)
    LengthInputRow.tsx                  # Input row with length unit select
    LengthUnitSelect.tsx                # Length units dropdown
    useLengthConversion.tsx             # Length conversion logic hook
    
  /weight/                              # FUTURE: Weight converter
  /temperature/                         # FUTURE: Temperature converter
  /volume/                              # FUTURE: Volume converter

/shared/data/
  unit-conversions.ts                   # Conversion data and functions
```

## Component Responsibilities

### Shared Components

#### CalculatorFrame
- Provides card container with border and shadow
- Wraps all calculator content
- **Reusable**: Yes, across all converters

#### CalculatorHeader
- Displays "Calculator" title
- Reset button functionality
- **Reusable**: Yes, across all converters

#### UnitInput
- Input field for entering/displaying values
- Handles editable vs readonly states
- Number validation
- **Reusable**: Yes, across all converters

#### SwapButton
- Swaps from/to units and values
- Keyboard support (Enter key)
- **Reusable**: Yes, across all converters

#### CalculatorActions
- Copy to clipboard button
- Shows "Copied!" confirmation
- **Reusable**: Yes, across all converters

#### ToolHeader
- Category badge with icon
- H1 title and description
- **Reusable**: Yes, across all converters

#### ConversionFormula
- Displays conversion formula
- Example: "1 Meter = 3.28084 Foot"
- **Reusable**: Yes, across all converters

#### RelatedTools
- Grid of related converter links
- **Reusable**: Yes, across all converters

### Length-Specific Components

#### LengthCalculator
- Main calculator component for length conversions
- Composes shared calculator components
- Handles keyboard shortcuts
- Manages copy/reset actions
- **Reusable**: No, length-specific

#### LengthInputRow
- Combines UnitInput with LengthUnitSelect
- **Reusable**: No, length-specific

#### LengthUnitSelect
- Dropdown with length units only
- Uses data from `/shared/data/unit-conversions.ts`
- **Reusable**: No, length-specific

#### useLengthConversion
- Custom hook for length conversion logic
- Manages state (fromValue, toValue, units)
- Performs conversions
- Handles swap/copy actions
- **Reusable**: No, length-specific

## Data Structure

```typescript
// /shared/data/unit-conversions.ts

export const lengthUnits = ['Inch', 'Foot', 'Yard', 'Mile', 'Millimeter', 'Centimeter', 'Meter', 'Kilometer'];

export const lengthConversions: Record<string, number> = {
  'Inch': 0.0254,
  'Foot': 0.3048,
  // ... all units converted to meters
};

export function convertLength(value: number, fromUnit: string, toUnit: string): number {
  const fromFactor = lengthConversions[fromUnit] || 1;
  const toFactor = lengthConversions[toUnit] || 1;
  return (value * fromFactor) / toFactor;
}

export function getConversionFactor(fromUnit: string, toUnit: string): number {
  const fromFactor = lengthConversions[fromUnit] || 1;
  const toFactor = lengthConversions[toUnit] || 1;
  return fromFactor / toFactor;
}
```

## How to Add a New Converter Type

### Example: Adding Weight Converter

1. **Create converter directory**
   ```
   /components/unit-converter/weight/
   ```

2. **Create type-specific components** (following length pattern):
   - `WeightCalculator.tsx` - Main calculator (copy from LengthCalculator)
   - `WeightInputRow.tsx` - Input row (copy from LengthInputRow)
   - `WeightUnitSelect.tsx` - Units dropdown (copy from LengthUnitSelect)
   - `useWeightConversion.tsx` - Conversion logic hook (copy from useLengthConversion)

3. **Add data to `/shared/data/unit-conversions.ts`**:
   ```typescript
   export const weightUnits = ['Gram', 'Kilogram', 'Pound', 'Ounce', ...];
   
   export const weightConversions: Record<string, number> = {
     'Gram': 0.001,        // to kilograms
     'Kilogram': 1,
     'Pound': 0.453592,
     // ...
   };
   
   export function convertWeight(value: number, fromUnit: string, toUnit: string): number {
     const fromFactor = weightConversions[fromUnit] || 1;
     const toFactor = weightConversions[toUnit] || 1;
     return (value * fromFactor) / toFactor;
   }
   ```

4. **Update page to use new converter**:
   ```typescript
   import { WeightCalculator } from '../components/unit-converter/weight/WeightCalculator';
   import { useWeightConversion } from '../components/unit-converter/weight/useWeightConversion';
   ```

5. **No changes needed to shared components!** ✅

## Design System Integration

All components use CSS variables from `/styles/globals.css`:

### Colors
- `var(--card)` - Card background
- `var(--border)` - Border color
- `var(--foreground)` - Text color
- `var(--muted-foreground)` - Secondary text
- `var(--accent)` - Accent color (buttons, icons)
- `var(--primary)` - Primary buttons
- `var(--muted)` - Muted backgrounds

### Spacing
- Consistent gap-[16px], gap-[24px], p-[32px]
- Following design system spacing scale

### Radius
- `var(--radius)` - Default radius (12px)
- `var(--radius-card)` - Card radius (24px)
- `var(--radius-button)` - Button radius (16px)

### Typography
- `var(--text-xs)` - 12px
- `var(--text-sm)` - 14px
- `var(--text-base)` - 16px
- `var(--text-lg)` - 24px
- Font: 'Inter', sans-serif

### Elevation
- `var(--elevation-sm)` - Small shadow for cards

## File Size Compliance

✅ All files under 100 lines:
- CalculatorFrame.tsx - 28 lines
- CalculatorHeader.tsx - 24 lines
- UnitInput.tsx - 50 lines
- SwapButton.tsx - 24 lines
- CalculatorActions.tsx - 36 lines
- LengthCalculator.tsx - 88 lines
- LengthInputRow.tsx - 50 lines
- LengthUnitSelect.tsx - 38 lines
- useLengthConversion.tsx - 50 lines
- ToolHeader.tsx - 38 lines
- ConversionFormula.tsx - 24 lines
- RelatedTools.tsx - 54 lines

## Key Benefits

1. **Consistency** - All converters have identical UI/UX
2. **Maintainability** - Shared components updated once, apply everywhere
3. **Scalability** - Adding new types is fast and predictable
4. **Code Quality** - Small, focused files under 100 lines
5. **Design System** - Perfect CSS variable integration
6. **Developer Experience** - Clear patterns, easy to understand

## Migration Notes

### What Changed (from old structure)
- ❌ Old: Single `CalculatorWidget.tsx` tried to handle everything
- ✅ New: Shared calculator frame + type-specific logic

- ❌ Old: `/components/unit-converter/calculator/` mixed concerns
- ✅ New: `/shared/calculator/` for reusable, `/length/` for specific

- ❌ Old: Tight coupling between UI and logic
- ✅ New: Clean separation with custom hooks

### Backward Compatibility
- ✅ All existing functionality preserved
- ✅ Same user experience
- ✅ Same keyboard shortcuts
- ✅ Same data structure

## Future Roadmap

### Phase 1: Length (COMPLETE ✅)
- [x] Refactor to new architecture
- [x] Create baseline template
- [x] Document patterns

### Phase 2: Add More Converter Types
- [ ] Weight converter
- [ ] Temperature converter
- [ ] Volume converter
- [ ] Area converter
- [ ] Speed converter

### Phase 3: Enhanced Features
- [ ] Conversion history
- [ ] Favorites
- [ ] Recent conversions
- [ ] Offline support

## Testing Checklist

When implementing a new converter type:

- [ ] All shared components reused (no duplication)
- [ ] Type-specific components under 100 lines
- [ ] CSS variables used throughout
- [ ] Keyboard shortcuts work (Enter to swap, Cmd+C to copy)
- [ ] Reset button works
- [ ] Copy button works with toast notification
- [ ] Units dropdown populated correctly
- [ ] Conversions are accurate
- [ ] Responsive on mobile/tablet/desktop
- [ ] Loading states work
- [ ] Error states work
- [ ] Related tools section (if applicable)

---

**Last Updated**: November 16, 2025
**Status**: ✅ Baseline Complete - Ready for Expansion
