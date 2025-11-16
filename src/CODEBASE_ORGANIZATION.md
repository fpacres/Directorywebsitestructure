# Codebase Organization & Refactoring Guide

## Latest Update: /shared/ui Reorganization (Completed)

### ✅ What Was Reorganized

The `/shared/ui` folder has been restructured to group related components into logical subfolders with proper index files for cleaner imports and better scalability.

### 📁 New Folder Structure

```
/shared/ui/
├── navigation/          # All navigation-related components
│   ├── nav-logo.tsx
│   ├── nav-link.tsx
│   ├── nav-links.tsx
│   ├── nav-mobile-menu-button.tsx
│   └── index.ts
│
├── footer/              # All footer-related components
│   ├── footer-logo.tsx
│   ├── footer-column.tsx
│   ├── footer-link-column.tsx
│   ├── footer-social.tsx
│   ├── footer-social-link.tsx
│   ├── footer-social-links.tsx
│   ├── footer-copyright.tsx
│   └── index.ts
│
├── category-header/     # Category header components
│   ├── category-header-badge.tsx
│   ├── category-header-background.tsx
│   ├── category-header-content.tsx
│   └── index.ts
│
├── cards/               # All card-type components
│   ├── analytics-card.tsx
│   ├── icon-card.tsx
│   ├── notification-card.tsx
│   ├── tool-card.tsx
│   ├── floating-cards.tsx
│   └── index.ts
│
├── header.tsx
├── hero-search.tsx
├── empty-state.tsx
├── features-header.tsx
├── features-footer-links.tsx
└── index.ts             # Main export file
```

### 🔄 Import Pattern Updates

**Before:**
```typescript
import { NavLogo } from '../shared/ui/nav-logo';
import { NavLinks } from '../shared/ui/nav-links';
import { NavMobileMenuButton } from '../shared/ui/nav-mobile-menu-button';
```

**After:**
```typescript
import { NavLogo, NavLinks, NavMobileMenuButton } from '../shared/ui/navigation';
// OR
import { NavLogo, NavLinks, NavMobileMenuButton } from '../shared/ui';
```

### 📊 Benefits Achieved

1. **Cleaner Imports** - Related components can be imported from a single source
2. **Better Discoverability** - Components are logically grouped by function
3. **Scalability** - Easy to add new components to existing groups
4. **Maintainability** - Reduced file clutter in the root /shared/ui directory
5. **FSD Compliance** - Follows Feature-Sliced Design principles

---

## 🔍 Ongoing Assessment Triggers

I will proactively assess and reorganize when:

1. **File Count Threshold**: When a directory has >8 related files that could be grouped
2. **Import Complexity**: When multiple related imports from the same directory appear frequently
3. **Duplication Detected**: When similar patterns appear across multiple files
4. **Component Size**: When any component exceeds 100 lines (chunk into microcomponents)
5. **Pattern Recognition**: When new components follow an existing pattern (e.g., new card types → /cards folder)

---

## 📋 Next Assessment Areas

### Priority 1: Monitor These Directories

- `/widgets` - Currently has 7 files, monitor for growth
- `/components/admin` - Well-organized but monitor subdirectories for bloat
- `/features` - Good structure, ensure new features follow the pattern

### Priority 2: Component Size Monitoring

Regularly check these components for potential chunking (if they grow):
- Hero components in `/widgets`
- Admin form components
- Category page components

### Priority 3: Potential Future Groupings

If these grow, consider grouping:
- Hero components → `/shared/ui/hero/`
- Feature sections → `/widgets/sections/`

---

## 🎯 Code Quality Standards

### Component Size Rule
- **Maximum**: 100 lines per component
- **Action**: If exceeded, chunk into microcomponents
- **Location**: Create subfolder with index.ts for chunked components

### Import Organization
- Use barrel exports (index.ts) for component groups
- Group imports by: external → internal → relative
- Alphabetize within groups

### Naming Conventions
- Components: PascalCase
- Files: kebab-case or PascalCase (match component name)
- Folders: kebab-case
- Index files: Always `index.ts`

---

## 🚀 Proactive Refactoring Checklist

### Weekly
- [ ] Check for components >100 lines
- [ ] Review new components for grouping opportunities
- [ ] Scan for duplicate code patterns

### Monthly
- [ ] Assess folder structure growth
- [ ] Review import patterns for optimization
- [ ] Check for unused components
- [ ] Evaluate new grouping opportunities

### Per Feature
- [ ] Ensure new components follow FSD architecture
- [ ] Check if microcomponents are needed
- [ ] Verify proper use of CSS variables
- [ ] Confirm Phosphor icons usage (not other icon libraries)

---

## 💡 Best Practices Established

1. **Design System Adherence**
   - All UI must use CSS variables from `/styles/globals.css`
   - Only use defined font faces for typography
   - No hardcoded colors, spacing, or typography

2. **Icon Standards**
   - Use Phosphor icons exclusively
   - Import from `@phosphor-icons/react`

3. **Responsive Design**
   - All components must be responsive
   - Mobile-first approach

4. **File Organization**
   - Group related components in subfolders
   - Always create index.ts for component groups
   - Keep root directories clean (max 10 files)

---

## 📝 Refactoring Log

### 2024 - /shared/ui Reorganization
- **Date**: Current session
- **Changes**: 
  - Created 4 new subfolders: navigation, footer, category-header, cards
  - Moved 20 components to appropriate folders
  - Updated all import statements across the codebase
  - Created index files for each group
- **Files Modified**: 5 component imports updated
- **Files Deleted**: 12 old component files removed
- **Result**: Cleaner structure, easier imports, better scalability

---

## 🎨 Design System Notes

### CSS Variables Must Be Used
All generated UI must strictly use these from `/styles/globals.css`:
- Colors: `var(--foreground)`, `var(--background)`, etc.
- Spacing: `var(--spacing-*)` 
- Borders: `var(--border-*)` 
- Radius: `var(--radius-*)` 
- Typography: Only defined font faces

This ensures:
- Consistent design across the app
- Easy theme updates via CSS
- Design system compliance
