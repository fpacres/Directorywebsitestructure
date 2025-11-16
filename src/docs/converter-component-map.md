# Unit Converter - Component Map

## 🗺️ Visual Component Hierarchy

This document shows the visual structure of the Length Unit Converter and how components nest within each other.

---

## 📱 Full Page Structure

```
UnitConverterPage
├── NavMenu
├── ToolHeader (shared)
│   ├── Icon (ArrowsLeftRight)
│   ├── Category Name
│   ├── H1 Title
│   └── Description
│
├── UnitConverterContent (widget)
│   ├── DescriptionArea
│   │   ├── DescriptionSection (shared) × N
│   │   │   ├── H2 Title
│   │   │   └── Paragraphs × N
│   │   │
│   │   └── FAQSection (shared)
│   │       └── FAQItem × N
│   │           ├── Question (button)
│   │           ├── Icon (Plus/Minus)
│   │           └── Answer (collapsible)
│   │
│   └── Sidebar
│       ├── LengthCalculator (length-specific)
│       │   └── CalculatorFrame (shared)
│       │       ├── CalculatorHeader (shared)
│       │       │   ├── H4 "Calculator"
│       │       │   └── Reset Button (ArrowCounterClockwise)
│       │       │
│       │       ├── LengthInputRow (length-specific)
│       │       │   ├── UnitInput (shared)
│       │       │   │   ├── Label "Enter Value"
│       │       │   │   └── Input (editable)
│       │       │   │
│       │       │   └── LengthUnitSelect (length-specific)
│       │       │       └── Select dropdown
│       │       │
│       │       ├── SwapButton (shared)
│       │       │   └── Icon (ArrowsDownUp)
│       │       │
│       │       ├── LengthInputRow (length-specific)
│       │       │   ├── UnitInput (shared)
│       │       │   │   ├── Label "Result"
│       │       │   │   └── Input (read-only)
│       │       │   │
│       │       │   └── LengthUnitSelect (length-specific)
│       │       │       └── Select dropdown
│       │       │
│       │       ├── ConversionFormula (shared)
│       │       │   ├── "Formula:" label
│       │       │   └── "1 Unit = X Unit" text
│       │       │
│       │       └── CalculatorActions (shared)
│       │           └── Copy Button
│       │               ├── Icon (Copy/Check)
│       │               └── Text ("Copy Result"/"Copied!")
│       │
│       └── RelatedTools (shared)
│           ├── H3 "Related Converters"
│           └── Tool Cards × N
│               ├── Icon
│               ├── Title
│               └── Arrow (ArrowRight)
│
└── Footer
```

---

## 🎨 Component Styling Reference

### Color Usage by Component

| Component | Background | Text | Border | Accent |
|-----------|-----------|------|--------|--------|
| **CalculatorFrame** | `--card` | - | `--border` | - |
| **CalculatorHeader** | - | `--foreground` | - | - |
| **Reset Button** | hover: `--muted` | `--muted-foreground` | - | - |
| **UnitInput (editable)** | `--input-background` | `--foreground` | `--border`, focus: `--ring` | - |
| **UnitInput (result)** | `--muted` | `--foreground` | `--border` | - |
| **Label** | - | `--muted-foreground` | - | - |
| **UnitSelect** | `--muted` | `--foreground` | `--border`, focus: `--ring` | - |
| **SwapButton** | hover: `--muted` | `--accent` | `--border` | - |
| **ConversionFormula** | `--muted` | `--foreground`, label: `--muted-foreground` | `--border` | - |
| **Copy Button** | `--primary` / `--accent` | `--primary-foreground` / `--accent-foreground` | - | - |
| **ToolHeader Badge** | `--muted` | - | - | `--accent` (icon) |
| **FAQItem** | `--card` | `--foreground` | `--border` | `--accent` (icon) |
| **FAQItem (hover)** | `--muted` | - | - | - |
| **RelatedTools Card** | `--card` | `--foreground` | `--border` | `--accent` (icon) |

---

## 📐 Spacing Map

### Gaps (space between elements)

```
CalculatorFrame
└── 24px gap
    ├── [Header + Inputs Group]
    │   └── 16px gap
    │       ├── CalculatorHeader
    │       ├── Input Row 1
    │       ├── Swap Button
    │       └── Input Row 2
    ├── ConversionFormula
    └── CalculatorActions

Input Row
└── 16px gap
    ├── UnitInput
    └── UnitSelect

UnitInput
└── 4px gap
    ├── Label
    └── Input

ToolHeader
└── 16px gap
    ├── [Icon + Category]
    └── [Title + Description]
        └── 8px gap
            ├── H1
            └── Description

FAQSection
└── 32px gap
    ├── H2
    └── [FAQ Items]
        └── 16px gap between items

DescriptionSection
└── 24px gap
    ├── H2
    └── Paragraphs
```

### Padding (space inside elements)

```
CalculatorFrame: 32px all sides
Input/Select: 16px horizontal, 12px vertical (px-4 py-3)
Reset Button: 12px horizontal, 6px vertical
Swap Button: 12px all sides
Copy Button: standard button padding
FAQ Button: 24px horizontal, 20px vertical
FAQ Answer: 24px horizontal, 20px top, 8px bottom
ConversionFormula: 16px all sides
```

---

## 🔤 Typography Map

### Font Sizes by Element

| Element | CSS Variable | Actual Size | Usage |
|---------|--------------|-------------|-------|
| **H1 (Page Title)** | `--text-2xl` | 64px | ToolHeader title |
| **H2 (Sections)** | `--text-xl` | 48px | DescriptionSection, FAQSection |
| **H3 (Related)** | `--text-lg` | 24px | RelatedTools heading |
| **H4 (Calculator)** | `--text-button` | 20px | CalculatorHeader |
| **Body Text** | `--text-base` | 16px | Paragraphs, inputs, buttons |
| **Small Text** | `--text-sm` | 14px | Labels, reset button, formula, related tools |
| **Tiny Text** | `--text-xs` | 12px | (if needed for captions) |

### Font Weights

| Element | Weight | CSS Variable |
|---------|--------|--------------|
| **H4 (Calculator)** | 500 | `--font-weight-medium` |
| **Buttons** | 500 | `--font-weight-medium` |
| **All other text** | 400 | `--font-weight-normal` |

### Font Family

**All text**: `'Inter', sans-serif` (from globals.css)

---

## 🎯 Interactive States

### Input Fields

```
Default State:
  - Background: --input-background (editable) / --muted (result)
  - Border: --border
  - Text: --foreground

Focus State:
  - Border: --ring
  - Outline: --ring/50

Disabled State (result):
  - Cursor: default
  - Read-only: true
```

### Buttons

```
Reset Button:
  - Default: transparent background, --muted-foreground text
  - Hover: --muted background

Swap Button:
  - Default: transparent background, --accent icon, --border border
  - Hover: --muted background

Copy Button:
  - Default: --primary background, --primary-foreground text
  - Copied: --accent background, --accent-foreground text, check icon
  - Duration: 2 seconds
```

### Dropdowns

```
Default State:
  - Background: --muted
  - Border: --border
  - Text: --foreground

Focus State:
  - Border: --ring
```

### FAQ Items

```
Closed State:
  - Background: --card
  - Border: --border
  - Icon: Plus (--accent)

Hover State (button):
  - Background: --muted

Open State:
  - Icon: Minus (--accent)
  - Answer visible with border-top
```

---

## 🔄 State Flow Diagram

### Conversion Flow

```
User Input → fromValue
     ↓
useEffect triggers
     ↓
convertLength(fromValue, fromUnit, toUnit)
     ↓
Calculate result
     ↓
setToValue(result)
     ↓
Display in Result Input
```

### Swap Flow

```
User clicks Swap Button
     ↓
handleSwap()
     ↓
Swap values: fromValue ↔ toValue
Swap units: fromUnit ↔ toUnit
     ↓
useEffect triggers (fromValue, fromUnit, toUnit changed)
     ↓
Recalculate conversion
     ↓
Update display
```

### Copy Flow

```
User clicks Copy Button
     ↓
handleCopy()
     ↓
navigator.clipboard.writeText(toValue)
     ↓
setCopied(true)
     ↓
Show toast notification
Show "Copied!" with check icon
     ↓
setTimeout 2000ms
     ↓
setCopied(false)
     ↓
Revert to "Copy Result" with copy icon
```

---

## 📦 Import Relationships

### Length Calculator Dependencies

```
LengthCalculator.tsx
├── useState, useEffect (react)
├── toast (sonner@2.0.3)
├── CalculatorFrame (shared/calculator)
├── CalculatorHeader (shared/calculator)
├── LengthInputRow (length-specific)
├── SwapButton (shared/calculator)
├── CalculatorActions (shared/calculator)
├── ConversionFormula (shared)
└── getConversionFactor (shared/data/unit-conversions)

LengthInputRow.tsx
├── UnitInput (shared/calculator)
└── LengthUnitSelect (length-specific)

LengthUnitSelect.tsx
└── lengthUnits (shared/data/unit-conversions)

useLengthConversion.tsx
├── useState, useEffect (react)
└── convertLength (shared/data/unit-conversions)
```

### Shared Component Dependencies

```
CalculatorFrame.tsx
└── ReactNode (react)

CalculatorHeader.tsx
└── ArrowCounterClockwise (@phosphor-icons/react)

UnitInput.tsx
└── (no dependencies)

SwapButton.tsx
└── ArrowsDownUp (@phosphor-icons/react)

CalculatorActions.tsx
├── Copy, Check (@phosphor-icons/react)
└── Button (ui/button)

ToolHeader.tsx
└── ArrowsLeftRight (@phosphor-icons/react)

ConversionFormula.tsx
└── (no dependencies)

FAQSection.tsx
├── useState (react)
└── Plus, Minus (@phosphor-icons/react)

RelatedTools.tsx
└── ArrowRight (@phosphor-icons/react)
```

---

## 🎛️ Props Flow

### Page → Calculator

```
UnitConverterPage
  ↓ props
LengthCalculator {
  fromValue: string
  fromUnit: string
  toValue: string
  toUnit: string
  onFromValueChange: (value: string) => void
  onFromUnitChange: (unit: string) => void
  onToUnitChange: (unit: string) => void
  onSwap: () => void
  onCopy: () => void
}
```

### Calculator → Sub-components

```
LengthCalculator
  ↓
CalculatorHeader { onReset }
LengthInputRow { value, unit, onChange, onUnitChange, editable }
SwapButton { onSwap }
ConversionFormula { fromUnit, toUnit, conversionFactor }
CalculatorActions { onCopy, copied }
```

### Input Row → Inputs

```
LengthInputRow
  ↓
UnitInput { value, onChange, editable }
LengthUnitSelect { value, onChange }
```

---

## 🔍 Finding Components

### By Location

```
/components/unit-converter/
├── shared/                    ← Look here for reusable components
│   ├── calculator/           ← Calculator UI components
│   ├── ToolHeader.tsx        ← Page header
│   ├── ConversionFormula.tsx ← Formula display
│   ├── DescriptionSection.tsx← Content sections
│   ├── FAQSection.tsx        ← FAQ accordion
│   └── RelatedTools.tsx      ← Related links
│
└── length/                    ← Look here for length-specific
    ├── LengthCalculator.tsx  ← Main calculator
    ├── LengthInputRow.tsx    ← Input row wrapper
    ├── LengthUnitSelect.tsx  ← Units dropdown
    └── useLengthConversion.tsx← Conversion logic
```

### By Function

**Need to display a calculator?**
→ Use `LengthCalculator` (or create new type-specific calculator)

**Need a page header?**
→ Use `ToolHeader` from shared

**Need input fields?**
→ Use `UnitInput` from shared/calculator

**Need unit selection?**
→ Create type-specific select (like `LengthUnitSelect`)

**Need conversion logic?**
→ Create type-specific hook (like `useLengthConversion`)

**Need to show formula?**
→ Use `ConversionFormula` from shared

**Need copy button?**
→ Use `CalculatorActions` from shared

**Need FAQ?**
→ Use `FAQSection` from shared

**Need related tools?**
→ Use `RelatedTools` from shared

---

## 📚 Quick Reference

### Creating New Converter Type

1. **Copy** length directory → new type directory
2. **Rename** all Length → YourType
3. **Update** imports (length → yourtype)
4. **Add** data to unit-conversions.ts
5. **Test** conversions

### Using Shared Components

All shared components accept standard props and use CSS variables automatically. No configuration needed!

### Styling Components

Don't modify components. Update `/styles/globals.css` instead!

---

**Last Updated**: November 16, 2025  
**Status**: Complete ✅
