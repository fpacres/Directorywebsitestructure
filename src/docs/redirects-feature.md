# Redirects Feature Documentation

## Overview

The Redirects feature allows admins to create URL redirects to maintain SEO rankings when URLs change. The system supports both exact path matching and wildcard patterns.

## Architecture (FSD Approach)

### Backend Layer (`/supabase/functions/server/`)

**API Routes:**
- `GET /make-server-d38bd56f/settings/redirects` - Fetch all redirects
- `POST /make-server-d38bd56f/settings/redirects` - Create new redirect
- `DELETE /make-server-d38bd56f/settings/redirects/:id` - Delete redirect

**Data Storage:**
- Key: `settings:redirects`
- Structure:
  ```typescript
  {
    items: [
      {
        id: string;
        oldUrl: string;
        newUrl: string;
        created_at: string;
      }
    ],
    updated_at: string;
  }
  ```

### Components Layer

**Admin Settings Components** (`/components/admin/settings/`):

1. **CreateRedirectSection.tsx** (< 100 lines)
   - Form to create new redirects
   - Two inputs: Old URL → New URL
   - Validates and saves to backend
   - Triggers list refresh on success

2. **RedirectsListSection.tsx** (< 100 lines)
   - Displays all redirects
   - Search/filter functionality
   - Loading and empty states
   - Manages delete operations

3. **RedirectListItem.tsx** (< 100 lines)
   - Individual redirect row display
   - Shows: Old URL → New URL
   - Delete button (appears on hover)
   - Uses CSS variables for theming

### Utils Layer

**useRedirects Hook** (`/utils/useRedirects.tsx`):
- Loads redirects from backend on mount
- Listens to route changes
- Matches current path against redirect rules
- Performs navigation when match found
- Prevents infinite redirect loops

### Page Integration

**AdminSettingsPage.tsx**:
- Manages state for redirect refresh trigger
- Passes callback to CreateRedirectSection
- Passes refresh trigger to RedirectsListSection

**App.tsx**:
- Calls `useRedirects()` hook at top level
- Works alongside `useCustomCode()` hook

## Features

### Redirect Types Supported

1. **Exact Match**
   - Old URL: `/old-page`
   - New URL: `/new-page`
   - Behavior: Only redirects exact path match

2. **Wildcard Match**
   - Old URL: `/blog/*`
   - New URL: `/articles/*`
   - Behavior: Redirects all paths under `/blog/` to `/articles/`
   - Example: `/blog/post-1` → `/articles/post-1`

### Safety Features

- **Loop Prevention**: Detects and prevents redirect loops
- **Empty States**: Helpful messages when no redirects exist
- **Loading States**: Shows loading indicator during operations
- **Error Handling**: Toast notifications for errors
- **Search Filter**: Filter redirects by old or new URL

## User Flow

### Creating a Redirect

1. Admin navigates to Settings → Redirects tab
2. Enters old URL and new URL in the form
3. Clicks checkmark button to save
4. Toast confirmation appears
5. Redirect appears in list below
6. Redirect is immediately active on public site

### Managing Redirects

1. View all redirects in the list
2. Use search bar to filter by URL
3. Hover over redirect to reveal delete button
4. Click delete to remove redirect
5. Confirmation toast appears

### Public Site Behavior

1. User visits old URL (e.g., `/old-page`)
2. `useRedirects` hook detects match
3. User is automatically redirected to new URL
4. Browser history is updated
5. No flash of old content

## Code Quality Standards

✅ All components under 100 lines (FSD requirement)
✅ Uses CSS variables from design system
✅ TypeScript interfaces for type safety
✅ Error handling with user feedback
✅ Loading states for async operations
✅ Responsive design (mobile-friendly)
✅ Accessibility (semantic HTML, ARIA labels)

## Testing Checklist

- [ ] Create exact match redirect
- [ ] Create wildcard redirect
- [ ] Test redirect on public site
- [ ] Delete redirect
- [ ] Filter redirects
- [ ] Test with empty state
- [ ] Verify loop prevention
- [ ] Check mobile responsiveness
- [ ] Verify toast notifications
- [ ] Test concurrent redirects

## Future Enhancements

Potential improvements:
- Drag-and-drop reordering (priority)
- Redirect analytics (track usage)
- Bulk import/export
- Redirect type (301 permanent vs 302 temporary)
- Regular expression support
- Redirect chaining validation
