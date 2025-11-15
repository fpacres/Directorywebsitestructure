# Figma Import Mapping & Component Structure

## Purpose
This document tracks the original Figma import structure and maps it to our FSD architecture components to prevent accidental removal or duplication of sections.

---

## Original Figma Import: `/imports/Features.tsx`

### Complete Section Breakdown:
1. **Header/Navigation** (Lines 10-69)
   - Logo with SVG paths
   - Navigation links (AI Tools, Digital Tools, Blog, About)
   - Mobile menu button
   - **Status:** ✅ Migrated to `/components/NavMenu.tsx`

2. **Hero Section** (Lines 71-128)
   - Background: `figma:asset/974ed41b38c8036ad37cb7df9603a15b873551fa.png` (starry background)
   - Badge: "71+ Free Digital Tools Across All Categories"
   - Heading: "Digital Tools for Every Task"
   - Description text
   - CTA Buttons: "View Digital Tools" & "AI Tools Directory"
   - Mockup cards placeholder (right side)
   - **Status:** ✅ Migrated to `/widgets/landing-hero.tsx`

3. **Why Section - Tool Categories** (Lines 130-131)
   - Imported from `/imports/Why.tsx`
   - Section title: "Explore our Online Tools Categories"
   - Three category cards:
     - Color Converters
     - Unit Converters
     - SQL Converters
   - **Status:** ✅ Available at `/imports/Why.tsx`, ✅ Integrated in HomePage

4. **AI Directory Section** (Lines 133-134)
   - Imported from `/imports/AIDirectory.tsx`
   - Shows AI tool categories
   - Three category cards with similar layout
   - **Status:** ✅ Available at `/imports/AIDirectory.tsx`, ✅ Integrated in HomePage

5. **Footer** (Lines 136-327)
   - Logo & social media links
   - Four-column footer menu:
     - Column 1-3: Digital tools categories (Color Converters, Unit Converters, SQL Converters, etc.)
     - Column 4: AI tools categories
   - Copyright notice
   - **Status:** ✅ Migrated to `/components/Footer.tsx`

---

## Current Component Architecture (FSD)

### Pages Layer (`/pages/`)
- `HomePage.tsx` - Main landing page
  - Composes: NavMenu → LandingHero → Why → AIDirectory → Footer

### Widgets Layer (`/widgets/`)
- `landing-hero.tsx` - Hero section with CTA buttons
  - Uses: FloatingCards, HeroSearch
  - Background: Figma asset (starry background)

### Components Layer (`/components/`)
- `NavMenu.tsx` - Site navigation
- `Footer.tsx` - Site footer with links

### Shared Layer (`/shared/`)
- `ui/floating-cards.tsx` - Animated floating cards for hero
- `ui/hero-search.tsx` - Search component for hero

### Imports (`/imports/`)
- `Features.tsx` - ⚠️ ORIGINAL FIGMA IMPORT - DO NOT DELETE
- `Why.tsx` - Tool categories section
- `AIDirectory.tsx` - AI tools categories section
- SVG files with paths for icons

---

## Critical Assets

### Images
- Hero background: `figma:asset/974ed41b38c8036ad37cb7df9603a15b873551fa.png`

### SVG Path Files
- `/imports/svg-pilyrms40n.ts` - Logo paths
- `/imports/svg-h9ezwotdzz.ts` - Category icon paths
- (Other SVG files for various icons)

---

## Before Making Changes - Checklist

- [ ] Check this document to verify what sections exist
- [ ] Review `/imports/Features.tsx` to see original structure
- [ ] Verify all sections are accounted for in new architecture
- [ ] Test that all sections render on the homepage
- [ ] Update this document if adding/removing sections

---

## Migration Rules

1. **NEVER delete `/imports/Features.tsx`** - It's the source of truth
2. **ALWAYS preserve Figma imports** - Images, SVGs, exact styling
3. **Document changes** - Update this file when restructuring
4. **Test visual regression** - Compare against original Figma design
5. **Keep assets** - Don't remove imported images/SVGs even if refactoring

---

## Restoration Process (If Sections Go Missing)

1. Check `/imports/Features.tsx` for original structure
2. Identify missing sections by comparing to this document
3. Check if section exists in `/imports/` as separate component
4. Import and integrate into appropriate page
5. Verify Figma assets are properly imported

---

**Last Updated:** 2025-11-15
**Last Verified Against Figma:** 2025-11-15
