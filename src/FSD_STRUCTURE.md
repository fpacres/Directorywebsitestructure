# Feature-Sliced Design (FSD) Structure

This document outlines the FSD architecture implementation for EveryDigitalTools.

## Directory Structure

```
/features
├── /category-filter          # Category filtering feature
│   ├── /model               # Types and business logic
│   │   └── types.ts        # Subcategory type definitions
│   ├── /ui                  # UI components
│   │   ├── category-filter-sidebar.tsx  # Main sidebar component
│   │   └── filter-item.tsx             # Individual filter item (microcomponent)
│   └── index.ts            # Public API exports
│
├── /category-page           # Category page feature
│   ├── /api                # API integrations
│   │   └── fetchTools.ts  # Tools fetching logic
│   ├── /lib                # Helper utilities
│   │   └── utils.ts       # Slug conversion utilities
│   ├── /model              # Business logic
│   │   └── useCategoryPage.ts  # Custom hook for state management
│   └── index.ts           # Public API exports
│
└── /tools-grid             # Tools grid display feature
    ├── /model              # Types and data models
    │   └── types.ts       # Tool type definitions
    ├── /lib               # Helper utilities
    │   └── utils.ts      # Text truncation utilities
    ├── /ui                # UI components
    │   ├── tools-grid.tsx        # Main grid container
    │   ├── tool-card.tsx         # Individual tool card
    │   ├── tool-card-header.tsx  # Card header (microcomponent)
    │   └── tool-card-button.tsx  # Card action button (microcomponent)
    └── index.ts          # Public API exports

/shared
├── /ui                    # Shared UI components
│   ├── /navigation       # Navigation related
│   │   ├── nav-logo.tsx
│   │   ├── nav-links.tsx
│   │   ├── nav-link.tsx
│   │   └── nav-mobile-menu-button.tsx
│   ├── /footer          # Footer related
│   │   ├── footer-logo.tsx
│   │   ├── footer-social-link.tsx
│   │   ├── footer-social-links.tsx
│   │   ├── footer-copyright.tsx
│   │   └── footer-column.tsx
│   ├── /category-header # Category header related
│   │   ├── category-header-badge.tsx
│   │   ├── category-header-background.tsx
│   │   └── category-header-content.tsx
│   ├── empty-state.tsx
│   └── index.ts         # Public API exports
│
├── /data                # Shared data/constants
│   └── footer-links.ts # Footer navigation data
│
└── /utils               # Shared utilities
    └── (utility functions)

/components              # Page-level components
├── CategoryPage.tsx     # Category page composition
├── CategoryHeader.tsx   # Category header composition
├── NavMenu.tsx         # Navigation menu composition
├── Footer.tsx          # Footer composition
└── ...
```

## Key Principles

### 1. **Microcomponents**
- Any component exceeding 100 lines is broken down into smaller, focused components
- Each microcomponent has a single responsibility
- Examples:
  - `ToolCard` → `ToolCardHeader` + `ToolCardButton`
  - `Footer` → `FooterLogo` + `FooterSocialLinks` + `FooterCopyright`
  - `NavMenu` → `NavLogo` + `NavLinks` + `NavMobileMenuButton`

### 2. **Feature Organization**
Each feature follows this structure:
- `/model` - Types, interfaces, custom hooks, business logic
- `/api` - API calls and data fetching
- `/lib` - Helper functions and utilities specific to the feature
- `/ui` - UI components
- `index.ts` - Public API (what the feature exports)

### 3. **Separation of Concerns**
- **Business Logic** → `/model` and `/lib`
- **Data Fetching** → `/api`
- **UI Components** → `/ui`
- **Shared Code** → `/shared`

### 4. **Import Strategy**
- Features export through `index.ts` files
- Components import from feature's public API:
  ```typescript
  // Good
  import { ToolsGrid } from '../features/tools-grid';
  
  // Avoid
  import ToolsGrid from '../features/tools-grid/ui/tools-grid';
  ```

### 5. **Data Management**
- Static data moved to `/shared/data`
- Type definitions in feature's `/model`
- API logic in feature's `/api`
- Custom hooks in feature's `/model`

## Benefits

1. **Maintainability**: Small, focused components are easier to maintain
2. **Reusability**: Microcomponents can be reused across features
3. **Testability**: Small units are easier to test
4. **Scalability**: Clear structure makes it easy to add new features
5. **Separation of Concerns**: Business logic separated from UI
6. **Type Safety**: Types defined close to where they're used

## Code Quality Standards

- ✅ Components under 100 lines
- ✅ Single responsibility principle
- ✅ Clear separation of concerns
- ✅ Proper TypeScript typing
- ✅ Clean import structure
- ✅ CSS variables from design system
- ✅ Phosphor icons throughout
