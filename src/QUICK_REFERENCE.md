# Quick Reference Guide

## 🚀 Common Patterns & Examples

### Import Patterns

```typescript
// Navigation components
import { NavLogo, NavLinks, NavMobileMenuButton } from '../shared/ui/navigation';

// Footer components
import { FooterSocial, FooterColumn, FooterLinkColumn } from '../shared/ui/footer';

// Card components
import { ToolCard, FloatingCards, IconCard } from '../shared/ui/cards';

// Category header components
import { CategoryHeaderBadge, CategoryHeaderBackground } from '../shared/ui/category-header';

// Or import from main barrel export
import { NavLogo, FooterSocial, ToolCard } from '../shared/ui';

// ShadCN components
import { Button } from './components/ui/button';
import { Card, CardHeader, CardContent } from './components/ui/card';

// Icons (Phosphor only)
import { House, Gear, User, MagnifyingGlass } from 'phosphor-react';
```

---

## 🎨 Design System Usage

### Colors
```typescript
// Always use CSS variables
className="bg-[var(--background)] text-[var(--foreground)]"
className="bg-[var(--card)] border-[var(--border)]"
className="text-[var(--accent)] bg-[var(--accent)]/10"
className="text-[var(--muted-foreground)]"
className="bg-[var(--destructive)]"

// Available color variables:
// --foreground, --background
// --card, --card-foreground
// --popover, --popover-foreground
// --primary, --primary-foreground
// --secondary, --secondary-foreground
// --muted, --muted-foreground
// --accent, --accent-foreground
// --destructive, --destructive-foreground
// --border, --input, --ring
// --chart-1 through --chart-5
```

### Spacing
```typescript
// Use Tailwind classes (they map to CSS variables)
className="p-4 m-2 gap-4"
className="space-y-4 space-x-2"

// For custom spacing, use CSS variables
style={{ padding: 'var(--spacing-4)' }}
```

### Borders & Radius
```typescript
// Border radius
className="rounded-[var(--radius)]"
className="rounded-[var(--radius-card)]"

// Borders
className="border border-[var(--border)]"
className="border-t border-[var(--border)]"
```

### Typography
```typescript
// Use defined font faces from globals.css
// DO NOT set font-size, font-weight, or line-height classes
// unless specifically requested

// Text colors
className="text-[var(--foreground)]"
className="text-[var(--muted-foreground)]"

// For specific sizes (when needed):
className="text-[var(--text-xs)]"
className="text-[var(--text-sm)]"
className="text-[var(--text-base)]"
// etc.
```

### Shadows
```typescript
className="shadow-[var(--elevation-sm)]"
className="shadow-[var(--elevation-md)]"
className="shadow-[var(--elevation-lg)]"
```

---

## 📁 File Organization Patterns

### When to Create a Subfolder
```
❌ DON'T create subfolder for <5 files
✅ DO create subfolder for 5+ related files
⚡ MUST create subfolder for 8+ related files
```

### Folder Structure Pattern
```
/feature-name/
├── index.ts          # Barrel export (always include)
├── Component1.tsx    # Each component <100 lines
├── Component2.tsx
├── Component3.tsx
└── types.ts          # Shared types (optional)
```

### Index File Pattern
```typescript
// index.ts - Barrel export
export { Component1 } from './Component1';
export { Component2 } from './Component2';
export { Component3 } from './Component3';

// For default exports
export { default as Component1 } from './Component1';
export { default as Component2 } from './Component2';
```

---

## 🔧 Component Patterns

### Basic Component Template
```typescript
import { SomeIcon } from 'phosphor-react';

interface ComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
}

export default function Component({ 
  title, 
  description,
  onAction 
}: ComponentProps) {
  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-card)] p-4">
      <div className="flex items-center gap-2">
        <SomeIcon size={20} weight="regular" color="var(--accent)" />
        <h3 className="text-[var(--foreground)]">{title}</h3>
      </div>
      {description && (
        <p className="text-[var(--muted-foreground)]">{description}</p>
      )}
      {onAction && (
        <button 
          onClick={onAction}
          className="text-[var(--accent)] hover:underline"
        >
          Action
        </button>
      )}
    </div>
  );
}
```

### Card Component Pattern
```typescript
interface CardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function CustomCard({ 
  title, 
  subtitle, 
  icon, 
  children 
}: CardProps) {
  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-card)] p-6 shadow-[var(--elevation-sm)]">
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="w-10 h-10 rounded-[var(--radius)] bg-[var(--accent)]/10 flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-[var(--foreground)]">{title}</h3>
          {subtitle && (
            <p className="text-[var(--muted-foreground)] text-[var(--text-sm)]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
```

---

## 🎯 When to Chunk Components

### Size Thresholds
- **<80 lines**: ✅ Good, no action needed
- **80-100 lines**: ⚠️ Monitor, consider chunking if complex
- **100-150 lines**: 🔴 Chunk into microcomponents this week
- **150+ lines**: 🚨 Chunk immediately

### Chunking Strategy
```typescript
// Before: LargeComponent.tsx (150 lines)
export default function LargeComponent() {
  // Header section (30 lines)
  // Content section (60 lines)
  // Footer section (40 lines)
  // Logic (20 lines)
}

// After: Chunked
/large-component/
├── index.ts
├── LargeComponent.tsx      // Main (40 lines)
├── ComponentHeader.tsx     // (30 lines)
├── ComponentContent.tsx    // (60 lines)
└── ComponentFooter.tsx     // (40 lines)

// LargeComponent.tsx
import ComponentHeader from './ComponentHeader';
import ComponentContent from './ComponentContent';
import ComponentFooter from './ComponentFooter';

export default function LargeComponent() {
  // Logic only (40 lines)
  return (
    <>
      <ComponentHeader {...headerProps} />
      <ComponentContent {...contentProps} />
      <ComponentFooter {...footerProps} />
    </>
  );
}
```

---

## 🔍 Common Tasks

### Adding a New Feature
```bash
1. Create /features/feature-name/
2. Add feature components (<100 lines each)
3. Create index.ts with exports
4. Update feature imports in pages
5. Verify design system compliance
6. Test responsiveness
```

### Adding a New Shared Component
```bash
1. Determine appropriate location:
   - Navigation? → /shared/ui/navigation/
   - Footer? → /shared/ui/footer/
   - Card? → /shared/ui/cards/
   - Category? → /shared/ui/category-header/
   - Other? → /shared/ui/ (root)
   
2. Create component (<100 lines)
3. Add export to folder's index.ts
4. Use CSS variables only
5. Use Phosphor icons
6. Test in multiple contexts
```

### Refactoring an Existing Component
```bash
1. Check current line count
2. If >100 lines, plan chunking:
   - Identify logical sections
   - Extract to microcomponents
   - Create subfolder if needed
   - Add index.ts
3. Update design system compliance:
   - Replace hardcoded colors with var(--color)
   - Use CSS variable spacing
   - Verify font faces
4. Update imports across codebase
5. Test thoroughly
6. Update documentation
```

---

## 📦 Package Usage

### Commonly Used Packages
```typescript
// Icons (PRIMARY - use these)
import { IconName } from 'phosphor-react';

// ShadCN Components
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Dialog } from './components/ui/dialog';

// Forms
import { useForm } from 'react-hook-form@7.55.0';

// Charts
import { LineChart, BarChart } from 'recharts';

// Animations
import { motion } from 'motion/react';

// Toast notifications
import { toast } from 'sonner@2.0.3';

// Image handling
import { ImageWithFallback } from './components/figma/ImageWithFallback';
```

---

## ✅ Pre-commit Checklist

Before committing new code:

- [ ] All components under 100 lines
- [ ] Using CSS variables (no hardcoded colors/spacing)
- [ ] Phosphor icons only
- [ ] Proper TypeScript types
- [ ] Responsive design tested
- [ ] Imports organized (external → internal → relative)
- [ ] No console.logs (except in server)
- [ ] No commented-out code blocks
- [ ] Follows FSD architecture
- [ ] Barrel exports added if created new folder
- [ ] Documentation updated if needed

---

## 🚨 Common Mistakes to Avoid

### ❌ Don't Do This
```typescript
// Hardcoded colors
className="bg-blue-500 text-white"
style={{ color: '#000000' }}

// Wrong icon library
import { Icon } from 'lucide-react';  // ❌
import { Icon } from 'react-icons';   // ❌

// Hardcoded spacing in inline styles
style={{ padding: '16px', margin: '8px' }}

// Setting typography classes (unless requested)
className="text-2xl font-bold leading-tight"

// Components over 100 lines
// (chunk into smaller components)

// Direct file imports when barrel export exists
import { Component } from '../shared/ui/folder/component';  // ❌
```

### ✅ Do This Instead
```typescript
// CSS variables for colors
className="bg-[var(--accent)] text-[var(--foreground)]"

// Phosphor icons
import { Icon } from 'phosphor-react';  // ✅

// Tailwind classes for spacing (mapped to CSS vars)
className="p-4 m-2"

// Let global styles handle typography
// Only add classes if specifically requested

// Keep components under 100 lines
// Break into microcomponents

// Use barrel exports
import { Component } from '../shared/ui';  // ✅
import { Component } from '../shared/ui/folder';  // ✅
```

---

## 📞 Need Help?

- **Organization questions**: See `/CODEBASE_ORGANIZATION.md`
- **Maintenance tasks**: See `/MAINTENANCE_CHECKLIST.md`
- **Project status**: See `/PROJECT_STATUS.md`
- **Design system**: Check `/styles/globals.css`
- **ShadCN components**: Check `/components/ui/`

---

**Quick tip**: When in doubt, check existing similar components for patterns!
