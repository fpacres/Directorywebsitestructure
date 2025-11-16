# Admin System Documentation

## Overview
Template-based CMS for managing EveryDigitalTools content with Supabase authentication.

## Routes
- `/admin/setup` - First-time admin account creation
- `/admin/login` - Admin login
- `/admin/dashboard` - Overview with stats
- `/admin/unit-converters` - Manage unit converter pages

## Architecture (FSD)
All components follow Feature-Sliced Design with <100 lines per file.

### Component Structure
```
/components/admin/
  ├── auth/ (Micro components <40 lines)
  │   ├── AuthCard.tsx
  │   ├── AuthHeader.tsx
  │   ├── AuthFormInput.tsx
  │   ├── AuthPasswordInput.tsx
  │   └── SetupBenefits.tsx
  ├── sidebar/ (Micro components <60 lines)
  │   ├── SidebarLogo.tsx
  │   ├── SidebarNavItem.tsx
  │   └── SidebarMobileToggle.tsx
  ├── unit-converters/ (Micro components <90 lines)
  │   ├── ConverterCard.tsx
  │   ├── ConvertersHeader.tsx
  │   ├── ConvertersSearch.tsx
  │   └── ConvertersEmptyState.tsx
  └── dashboard/
      └── PageTableRow.tsx
```

## Backend API
- `POST /auth/signup` - Create admin account
- `GET /pages` - List all pages (with filters)
- `GET /pages/:id` - Get single page
- `POST /pages` - Create page (auth required)
- `PUT /pages/:id` - Update page (auth required)
- `DELETE /pages/:id` - Delete page (auth required)

## Data Model
Pages stored in KV store with key pattern: `page:{id}`

```typescript
{
  id: string,
  title: string,
  slug: string,
  category: string,
  subcategory: string,
  template: string,
  seo_title: string,
  meta_description: string,
  default_from_unit?: string,
  default_to_unit?: string,
  content_sections: JSON,
  published: boolean,
  created_at: timestamp,
  updated_at: timestamp
}
```

## Design System
All components use CSS variables from `/styles/globals.css`:
- Colors: `var(--accent)`, `var(--primary)`, etc.
- Typography: Inter font family
- Spacing: Design system tokens
- Responsive: Mobile-first approach
