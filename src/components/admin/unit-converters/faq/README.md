# FAQ Component Module

This module provides FAQ management functionality for Unit Converter forms in the admin panel.

## Components

### FAQItem.tsx
Renders a single FAQ item with:
- Question and answer input fields
- Move up/down buttons for reordering
- Delete button
- Visual indicators for position (FAQ #1, #2, etc.)

Component size: ~110 lines (within FSD micro-component guidelines)

### FAQList.tsx
Manages the list of FAQ items:
- Renders all FAQ items
- Shows empty state when no FAQs exist
- Handles list rendering with proper keys

Component size: ~45 lines (follows FSD micro-component pattern)

## Features

✅ **Add/Remove FAQs** - Users can add unlimited FAQ entries and remove them individually
✅ **Reorder** - Move FAQs up/down to control display order
✅ **SEO Optimized** - FAQs are designed to improve search engine visibility
✅ **Responsive** - Works across all device sizes
✅ **CSS Variable Styled** - Uses design system variables for consistent theming
✅ **Type Safe** - Shared types from `/types/converter.ts`

## Data Structure

```typescript
interface FAQ {
  id: string;         // Unique identifier (auto-generated)
  question: string;   // The FAQ question
  answer: string;     // The FAQ answer
}
```

## Integration

The FAQ component is integrated into `ConverterFormFAQ.tsx` which:
1. Manages FAQ state within the form
2. Handles CRUD operations
3. Persists data to backend via the main form submission

## Backend

FAQs are automatically saved with the converter page data in the KV store. No additional backend configuration needed.

## Usage Example

```tsx
import { ConverterFormFAQ } from './ConverterFormFAQ';

<ConverterFormFAQ
  formData={formData}
  setFormData={setFormData}
/>
```

## Future Enhancements

- Drag-and-drop reordering (instead of up/down buttons)
- Rich text editor for answers
- FAQ templates/presets
- Bulk import/export
- FAQ analytics (views, helpfulness)
