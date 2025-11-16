import { useState, useEffect } from 'react';
import NavMenu from '../components/NavMenu';
import Footer from '../components/Footer';
import { ToolHeader } from '../components/unit-converter/shared/ToolHeader';
import { LengthCalculator } from '../components/unit-converter/length/LengthCalculator';
import { useLengthConversion } from '../components/unit-converter/length/useLengthConversion';
import { RelatedTools } from '../components/unit-converter/shared/RelatedTools';
import { UnitConverterContent } from '../widgets/unit-converter-content';
import { UnitConverterPageSkeleton } from '../components/skeletons/UnitConverterPageSkeleton';
import { convertLength } from '../shared/data/unit-conversions';
import { Toaster } from '../components/ui/sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PageData {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  meta_title?: string;
  meta_description?: string;
  h1_title?: string;
  excerpt?: string;
  content?: string;
  description?: string;
  faqs?: Array<{ question: string; answer: string }>;
  default_from_unit?: string;
  default_to_unit?: string;
  published: boolean;
}

export default function UnitConverterPage() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedConverters, setRelatedConverters] = useState<Array<{ id: string; title: string; slug: string; category?: string }>>([]);
  const [relatedTools, setRelatedTools] = useState<Array<{ id: string; title: string; slug: string }>>([]);
  const [currentSlug, setCurrentSlug] = useState('');
  
  const [fromValue, setFromValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('Inch');
  const [toValue, setToValue] = useState('0.0254');
  const [toUnit, setToUnit] = useState('Meter');

  // Listen for navigation events and update current slug
  useEffect(() => {
    const updateSlug = () => {
      const path = window.location.pathname;
      const slug = path.replace('/tools/', '');
      setCurrentSlug(slug);
    };

    // Set initial slug
    updateSlug();

    // Listen for navigation events
    window.addEventListener('navigate', updateSlug);
    window.addEventListener('popstate', updateSlug);

    return () => {
      window.removeEventListener('navigate', updateSlug);
      window.removeEventListener('popstate', updateSlug);
    };
  }, []);

  // Fetch page data from Supabase
  useEffect(() => {
    if (!currentSlug) return;

    const fetchPageData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/pages/by-slug/${currentSlug}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Page not found');
        }

        const data = await response.json();
        setPageData(data.page);
        
        // Set default units if available
        if (data.page.default_from_unit) {
          setFromUnit(data.page.default_from_unit);
        }
        if (data.page.default_to_unit) {
          setToUnit(data.page.default_to_unit);
        }

        // Fetch related converters from the same category
        if (data.page.category) {
          fetchRelatedConverters(data.page.category, data.page.id);
        }

        // Fetch related tools from different subcategories
        if (data.page.subcategory) {
          fetchRelatedTools(data.page.subcategory, data.page.id);
        }
      } catch (err) {
        console.error('Error fetching page data:', err);
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedConverters = async (category: string, currentPageId: string) => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/pages/by-category/${encodeURIComponent(category)}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Filter out the current page and limit to 5 converters
          const filtered = data.pages
            .filter((page: any) => page.id !== currentPageId)
            .slice(0, 5)
            .map((page: any) => ({
              id: page.id,
              title: page.title,
              slug: page.slug,
              category: page.category
            }));
          setRelatedConverters(filtered);
        }
      } catch (err) {
        console.error('Error fetching related converters:', err);
        // Don't fail the whole page if related converters fail
      }
    };

    const fetchRelatedTools = async (subcategory: string, currentPageId: string) => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/pages/by-subcategory/${encodeURIComponent(subcategory)}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Filter out the current page and limit to 4 tools
          const filtered = data.pages
            .filter((page: any) => page.id !== currentPageId)
            .slice(0, 4)
            .map((page: any) => ({
              id: page.id,
              title: page.title,
              slug: page.slug
            }));
          setRelatedTools(filtered);
        }
      } catch (err) {
        console.error('Error fetching related tools:', err);
        // Don't fail the whole page if related tools fail
      }
    };

    fetchPageData();
  }, [currentSlug]);

  useEffect(() => {
    const numValue = parseFloat(fromValue) || 0;
    const result = convertLength(numValue, fromUnit, toUnit);
    setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
  }, [fromValue, fromUnit, toUnit]);

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
  };

  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCopy = () => {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(toValue).catch(() => {
        // Fallback to older method if Clipboard API fails
        fallbackCopyToClipboard(toValue);
      });
    } else {
      // Use fallback for older browsers or when Clipboard API is blocked
      fallbackCopyToClipboard(toValue);
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen">
        <Toaster position="top-center" />
        <div className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4" style={{ background: 'var(--background)' }}>
          <div className="w-full max-w-[1440px] mx-auto">
            <NavMenu />
          </div>
        </div>
        
        <div className="flex flex-col gap-4 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <UnitConverterPageSkeleton />
          <Footer />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !pageData) {
    return (
      <div className="min-h-screen">
        <Toaster position="top-center" />
        <div className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4" style={{ background: 'var(--background)' }}>
          <div className="w-full max-w-[1440px] mx-auto">
            <NavMenu />
          </div>
        </div>
        
        <div className="flex flex-col gap-4 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <main className="box-border content-stretch flex flex-col gap-[12px] items-start relative w-full">
            <div 
              className="flex flex-col items-center justify-center py-20 gap-4"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <h1>Page Not Found</h1>
              <p>The converter page you're looking for doesn't exist.</p>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  // Parse content sections from the content field
  // Support both new format (content field) and legacy format (description field)
  let descriptionSections = [];
  let faqSections = [];
  
  if (pageData.content) {
    // New format: content field with JSON
    try {
      const contentData = JSON.parse(pageData.content);
      descriptionSections = contentData.descriptionSections || [];
      faqSections = contentData.faqSections || [];
    } catch (error) {
      console.error('Error parsing content field:', error);
    }
  } else if (pageData.description) {
    // Legacy format: description field directly
    descriptionSections = [{ 
      title: 'Description', 
      paragraphs: [pageData.description] 
    }];
  }
  
  // Handle legacy FAQ format if faqs array exists directly on pageData
  if (!faqSections.length && pageData.faqs && Array.isArray(pageData.faqs)) {
    faqSections = pageData.faqs.map((faq: any) => ({
      question: faq.question,
      answer: faq.answer,
    }));
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" />
      <div className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4" style={{ background: 'var(--background)' }}>
        <div className="w-full max-w-[1440px] mx-auto">
          <NavMenu />
        </div>
      </div>
      
      <div className="flex flex-col gap-4 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <main className="box-border content-stretch flex flex-col gap-[12px] items-start relative w-full">
          <ToolHeader 
            categoryName={pageData.category}
            title={pageData.h1_title || pageData.title}
            description={pageData.meta_description || ''}
            excerpt={pageData.excerpt}
          />
          
          <UnitConverterContent
            calculator={
              <LengthCalculator
                fromValue={fromValue}
                fromUnit={fromUnit}
                toValue={toValue}
                toUnit={toUnit}
                onFromValueChange={handleFromValueChange}
                onFromUnitChange={handleFromUnitChange}
                onToUnitChange={handleToUnitChange}
                onSwap={handleSwap}
                onCopy={handleCopy}
              />
            }
            relatedTools={<RelatedTools tools={relatedTools} />}
            relatedConverters={relatedConverters}
            categoryName={pageData.category}
            descriptionSections={descriptionSections}
            faqSections={faqSections}
          />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}