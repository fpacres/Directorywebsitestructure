# Development Checklist & Best Practices

## Before Starting Any Task

### 1. Review Documentation
- [ ] Read `/docs/figma-import-map.md` to understand current structure
- [ ] Check if feature affects existing Figma-imported sections
- [ ] Review FSD architecture layers (pages → widgets → features → shared)

### 2. Plan the Work
- [ ] List all components that will be modified
- [ ] Identify which sections/components will be created
- [ ] Check if any Figma imports will be affected
- [ ] Verify no duplicate functionality is being created

### 3. Code Quality Standards
- [ ] Components over 100 lines must be chunked into micro-components
- [ ] Use CSS variables from `/styles/globals.css`
- [ ] Use defined font faces only (no inline font-size/font-weight classes unless requested)
- [ ] Follow FSD architecture strictly

---

## During Development

### Component Creation
- [ ] Place component in correct FSD layer
- [ ] Use Phosphor icons (not Lucide or others)
- [ ] Import and reuse existing components before creating new ones
- [ ] Keep components under 100 lines (split if larger)

### Styling Rules
- [ ] Use `var(--color-name)` for colors
- [ ] Use `var(--spacing-name)` for spacing
- [ ] Use `var(--radius-name)` for border radius
- [ ] NO `text-*` size classes (e.g., text-lg, text-2xl)
- [ ] NO `font-*` weight classes (e.g., font-bold, font-semibold)
- [ ] NO `leading-*` line-height classes

### Working with Figma Imports
- [ ] Preserve ALL elements from import
- [ ] Preserve ALL Tailwind classes unless specifically changing
- [ ] Preserve ALL style attributes
- [ ] Preserve ALL background images
- [ ] Import and use Figma assets exactly as provided
- [ ] DO NOT create custom versions of imported SVGs

---

## Before Committing Changes

### Testing
- [ ] Verify all page routes still work
- [ ] Check responsive design (mobile, tablet, desktop)
- [ ] Verify no console errors
- [ ] Test navigation between pages
- [ ] Visual regression check against Figma design

### Documentation
- [ ] Update `/docs/figma-import-map.md` if structure changed
- [ ] Update this checklist if new patterns emerge
- [ ] Document any new components in their files

### Code Review
- [ ] Check for code duplication
- [ ] Verify component sizes (<100 lines)
- [ ] Confirm FSD architecture compliance
- [ ] Verify design system CSS variables are used

---

## Common Mistakes to Avoid

### ❌ DON'T
- Delete `/imports/Features.tsx` or any Figma imports
- Lose track of original sections when refactoring
- Create components without checking if they already exist
- Override typography with Tailwind utility classes
- Use different icon libraries (Lucide, etc.)
- Create components over 100 lines
- Place components in wrong FSD layers

### ✅ DO
- Keep Figma imports as source of truth
- Reference `/docs/figma-import-map.md` before changes
- Reuse existing components
- Use design system CSS variables
- Use Phosphor icons
- Split large components
- Follow FSD architecture

---

## Quick Reference: FSD Layers

```
/pages/          → Full page compositions
/widgets/        → Complex, self-contained UI blocks
/features/       → Business logic features
/components/     → Reusable UI components
/shared/         → Shared utilities, UI primitives
/imports/        → Figma imports (PROTECTED)
/docs/           → Documentation
```

---

## Emergency Recovery

If sections go missing:
1. Check `/imports/Features.tsx` for original structure
2. Review `/docs/figma-import-map.md` for mapping
3. Restore missing imports to appropriate page
4. Verify all Figma assets are properly imported

---

**Remember:** The Figma import is the source of truth. When in doubt, check `/imports/Features.tsx` and this documentation.
