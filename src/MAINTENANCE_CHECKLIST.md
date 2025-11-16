# Proactive Codebase Maintenance Checklist

## 🎯 Continuous Assessment Strategy

This document outlines the proactive assessment triggers and maintenance tasks to keep the EveryDigitalTools codebase organized, efficient, and maintainable.

---

## 📊 Automated Assessment Triggers

### 1. Component Size Check (100-Line Rule)
**Trigger**: Any component file exceeds 100 lines  
**Action**: Chunk into microcomponents  
**Process**:
1. Identify logical sections within the component
2. Extract each section into a dedicated microcomponent
3. Create a subfolder if multiple microcomponents are created
4. Add index.ts for clean imports
5. Update parent component to use new microcomponents

**Example**:
```
Before: /components/LargeComponent.tsx (150 lines)

After:
/components/large-component/
  ├── index.ts
  ├── LargeComponent.tsx (main, <100 lines)
  ├── ComponentHeader.tsx (<100 lines)
  ├── ComponentBody.tsx (<100 lines)
  └── ComponentFooter.tsx (<100 lines)
```

### 2. Folder File Count (8+ Related Files)
**Trigger**: A directory contains 8+ related files that share a common purpose  
**Action**: Group into subfolder with index.ts  
**Status**: ✅ Recently completed for `/shared/ui`

**Example from Recent Refactor**:
- Before: 20 files in `/shared/ui/`
- After: 4 organized subfolders + 5 standalone files

### 3. Import Pattern Repetition
**Trigger**: Multiple files import 3+ components from the same directory  
**Action**: Create barrel export (index.ts) if not exists  
**Monitor**: Check import statements weekly

### 4. Code Duplication
**Trigger**: Similar code blocks appear in 3+ files  
**Action**: Extract to shared utility or component  
**Locations to Monitor**:
- Form validation logic
- API call patterns
- UI component patterns
- Data transformation functions

### 5. New Feature Addition
**Trigger**: Any new feature is added  
**Action**: Ensure FSD architecture compliance  
**Checklist**:
- [ ] Follows `/features/{feature-name}` structure
- [ ] Components chunked if >100 lines
- [ ] Uses design system CSS variables
- [ ] Phosphor icons only
- [ ] Fully responsive
- [ ] Proper TypeScript types

---

## 🔍 Weekly Assessment Tasks

### Every Monday: Code Health Check

#### 1. Component Size Audit
```bash
# Check for components over 100 lines
# Review and plan chunking if needed
```
**Files to Check**:
- `/components/**/*.tsx`
- `/features/**/*.tsx`
- `/widgets/**/*.tsx`
- `/shared/ui/**/*.tsx`

#### 2. Import Organization Review
- Scan for repeated import patterns
- Identify opportunities for barrel exports
- Check for unused imports

#### 3. Folder Structure Assessment
- Count files in each directory
- Identify candidates for grouping (8+ related files)
- Plan reorganization if needed

#### 4. Dead Code Detection
- Look for unused components
- Check for commented-out code blocks
- Identify deprecated patterns

---

## 📅 Monthly Deep Dive

### First Monday of Each Month

#### 1. Architecture Review
- Verify FSD compliance across all features
- Check for architecture drift
- Document any necessary refactoring

#### 2. Dependency Audit
- Review package.json for unused dependencies
- Check for outdated packages
- Assess bundle size impact

#### 3. Design System Compliance
- Verify all components use CSS variables
- Check for hardcoded values
- Ensure font face consistency

#### 4. Performance Assessment
- Review component render patterns
- Identify optimization opportunities
- Check for unnecessary re-renders

#### 5. Documentation Update
- Update CODEBASE_ORGANIZATION.md
- Update this maintenance checklist
- Document new patterns or standards

---

## 🚨 Immediate Action Items

### Priority 1: Breaking Issues
- **Component >200 lines**: Chunk immediately
- **Broken imports**: Fix immediately
- **Duplicate code in 5+ places**: Extract immediately

### Priority 2: Quality Issues
- **Component 100-200 lines**: Plan chunking this week
- **Folder with 10+ files**: Plan reorganization this week
- **Hardcoded design values**: Refactor to CSS variables

### Priority 3: Optimization
- **Component 80-100 lines**: Monitor, plan if grows
- **Folder with 8-10 files**: Monitor, consider grouping
- **Minor duplication**: Document for future refactoring

---

## 📋 Current Monitoring Targets

### Directories to Watch (Next Candidates for Organization)

#### `/widgets` (7 files - Monitor)
Current files:
- ai-categories.tsx
- features-footer.tsx
- features-hero.tsx
- landing-footer.tsx
- landing-hero.tsx
- tool-categories.tsx
- unit-converter-content.tsx

**Action**: Monitor growth. If reaches 8+ files or new patterns emerge, consider grouping by:
- Landing widgets → `/widgets/landing/`
- Feature widgets → `/widgets/features/`
- Category widgets → `/widgets/categories/`

#### `/components/admin` (Well-organized - Monitor subdirectories)
Current structure is good. Monitor subdirectories for bloat:
- `/components/admin/settings` - Watch for size
- `/components/admin/dashboard` - Watch for size
- `/components/admin/form` - Watch for reusable patterns

#### `/features` (3 folders - Good structure)
- category-filter
- category-page
- tools-grid

**Action**: Ensure new features follow this pattern

---

## 🎨 Design System Enforcement

### CSS Variables Check
Every new component must use:

**Colors**:
- `var(--foreground)`, `var(--background)`, `var(--card)`
- `var(--accent)`, `var(--muted)`, `var(--muted-foreground)`
- `var(--destructive)`, `var(--chart-*)`, etc.

**Spacing**:
- `var(--spacing-*)` for margins/padding
- Never hardcode px values

**Borders & Radius**:
- `var(--border-*)` for border widths
- `var(--radius)`, `var(--radius-card)` for border radius

**Typography**:
- Only use defined font faces from globals.css
- `var(--text-xs)`, `var(--text-sm)`, etc. for sizes

### Automated Check
Review all `.tsx` files for:
- Hardcoded hex colors (e.g., `#000000`)
- Hardcoded px spacing (e.g., `p-4` is OK, inline `style={{padding: '16px'}}` is not)
- Font family declarations outside of globals.css

---

## 🔧 Refactoring Workflow

### When Chunking a Component

1. **Analyze** - Identify logical sections
2. **Extract** - Create microcomponents (<100 lines each)
3. **Organize** - Create subfolder if needed
4. **Export** - Add index.ts with barrel exports
5. **Test** - Verify functionality intact
6. **Document** - Update CODEBASE_ORGANIZATION.md

### When Grouping Files

1. **Identify** - Find related files (common prefix/purpose)
2. **Plan** - Determine subfolder name and structure
3. **Create** - Make subfolder and move files
4. **Export** - Create index.ts with exports
5. **Update** - Fix all import statements
6. **Clean** - Delete old files
7. **Verify** - Test all affected components
8. **Document** - Update organization docs

---

## 📈 Success Metrics

Track these metrics to measure code quality:

### Organization Metrics
- ✅ No directories with >10 files (excluding ui/components)
- ✅ All component groups have index.ts
- ✅ No components >100 lines

### Code Quality Metrics
- ✅ 100% CSS variable usage (no hardcoded values)
- ✅ Consistent icon library (Phosphor only)
- ✅ FSD architecture compliance across features

### Maintenance Metrics
- Weekly assessment completion rate
- Monthly deep dive completion rate
- Time from trigger to resolution

---

## 🎯 Next Assessment Date

**Next Weekly Check**: [To be set]  
**Next Monthly Review**: [To be set]  

### Recent Completions
- ✅ `/shared/ui` reorganization (Current session)
- ✅ All major components chunked to <100 lines
- ✅ FSD architecture implemented
- ✅ Design system CSS variables established

---

## 💡 Quick Reference

### When to Act
| Situation | Action | Priority |
|-----------|--------|----------|
| Component >200 lines | Chunk immediately | P1 |
| Component 100-200 lines | Plan chunking this week | P2 |
| Directory with 10+ related files | Reorganize this week | P2 |
| Directory with 8-9 related files | Plan reorganization | P3 |
| Import 3+ components from same dir | Add barrel export | P3 |
| Duplicate code in 5+ places | Extract immediately | P1 |
| Duplicate code in 3-4 places | Plan extraction | P2 |
| Hardcoded design values | Refactor to variables | P2 |
| New feature added | Verify FSD compliance | P1 |

### Organizational Patterns Established
1. Related components → Subfolder with index.ts
2. Large components → Chunk to microcomponents
3. Component groups → Use barrel exports
4. New features → Follow `/features/{name}` pattern
5. Shared UI → Organize by function/purpose
