# Skeleton Loaders

This directory contains all skeleton loading components for the EveryDigitalTools application. Skeletons are displayed while data is being fetched from the backend, providing users with visual feedback and improving perceived performance.

## Available Skeletons

### Frontend Skeletons

#### 1. **UnitConverterPageSkeleton**
- **Location**: `/components/skeletons/UnitConverterPageSkeleton.tsx`
- **Used in**: `/pages/UnitConverterPage.tsx`
- **Purpose**: Displays while unit converter page data is loading from the backend
- **Layout**: 
  - Tool header with badge, title, and description placeholders
  - Calculator section with input/output rows and swap button
  - Content area with description, FAQ, and related tools sections

#### 2. **ToolsGridSkeleton**
- **Location**: `/components/skeletons/ToolsGridSkeleton.tsx`
- **Used in**: `/components/CategoryPage.tsx`
- **Purpose**: Displays while tools are being fetched for category pages
- **Layout**: Grid of tool card placeholders (6 cards by default)

#### 3. **CategoryPageSkeleton**
- **Location**: `/components/skeletons/CategoryPageSkeleton.tsx`
- **Purpose**: Full category page skeleton (header + sidebar + grid)
- **Note**: Available for full-page loading scenarios if needed

### Admin Skeletons

#### 4. **ConvertersTableSkeleton**
- **Location**: `/components/admin/unit-converters/ConvertersTableSkeleton.tsx`
- **Used in**: `/pages/admin/UnitConvertersAdminPage.tsx`
- **Purpose**: Displays while the converters admin table is loading
- **Layout**: Full table structure with 6 skeleton rows

#### 5. **AdminFormSkeleton**
- **Location**: `/components/skeletons/AdminFormSkeleton.tsx`
- **Used in**: `/pages/admin/UnitConverterFormPage.tsx`
- **Purpose**: Displays while loading converter form data in edit mode
- **Layout**: 
  - Form header with title and action buttons
  - Basic info section
  - SEO section
  - Content section with FAQ

#### 6. **AuthLoadingSkeleton**
- **Location**: `/components/skeletons/AuthLoadingSkeleton.tsx`
- **Used in**: `/pages/admin/AdminLoginPage.tsx`
- **Purpose**: Displays while checking authentication state on login page
- **Layout**: Login card with header and form field placeholders

## Design Principles

All skeleton components follow these principles:

1. **Design System Compliance**: Use CSS variables from `/styles/globals.css`
2. **No Font Specifications**: No Tailwind font classes (text-*, font-*, leading-*) per project standards
3. **Accurate Layout**: Match the structure and dimensions of the actual content
4. **Responsive**: Adapt to mobile, tablet, and desktop layouts
5. **Base Component**: Use the shadcn/ui `Skeleton` component from `/components/ui/skeleton`
6. **Animation**: Skeleton component includes built-in pulse animation via Tailwind's `animate-pulse`

## Usage Pattern

### Standard Loading State Implementation

```tsx
import { SomePageSkeleton } from '../components/skeletons/SomePageSkeleton';

function SomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Header/Nav still shows */}
        <NavMenu />
        
        {/* Skeleton for loading content */}
        <SomePageSkeleton />
        
        {/* Footer still shows */}
        <Footer />
      </div>
    );
  }

  return <ActualContent data={data} />;
}
```

### Loading Overlay for Form Submissions

For actions where data is already loaded (like saving/updating):

```tsx
export default function FormPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = async () => {
    setLoading(true);
    await saveData(formData);
    setLoading(false);
  };

  return (
    <div className="relative">
      {loading && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        >
          <div className="flex flex-col items-center gap-3">
            <div 
              className="w-8 h-8 border-4 rounded-full animate-spin" 
              style={{ 
                borderColor: 'var(--border)',
                borderTopColor: 'var(--primary)'
              }} 
            />
            <p style={{ color: 'var(--foreground)' }}>Saving changes...</p>
          </div>
        </div>
      )}
      
      {/* Form content */}
    </div>
  );
}
```

## Troubleshooting

### Skeleton not appearing
1. Check that the import path is correct
2. Verify the `loading` state is being set to `true` initially
3. Ensure the skeleton is returned before the main content

### Skeleton not animating
1. Verify Tailwind's `animate-pulse` is working
2. Check that the Skeleton component is imported from `/components/ui/skeleton`
3. Ensure Tailwind is processing the skeleton component

### Wrong layout
1. Compare skeleton structure with actual content structure
2. Check responsive classes match (e.g., `lg:flex-row`)
3. Verify spacing and gap values match the design system