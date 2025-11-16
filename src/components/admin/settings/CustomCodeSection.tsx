import { useState, useEffect } from 'react';
import { Code } from '@phosphor-icons/react';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { SettingsSectionCard } from './SettingsSectionCard';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

/**
 * CustomCodeSection Component
 * 
 * Allows admins to add custom HTML/JavaScript code that will be injected into every public page.
 * 
 * Use cases:
 * - SEO: Add meta tags, schema markup, Open Graph tags
 * - Analytics: Facebook Pixel, Google Tag Manager, Hotjar
 * - Third-party scripts: Chat widgets, tracking pixels, A/B testing tools
 * - Custom styles: Additional CSS for fine-tuned styling
 * 
 * The code is automatically injected into:
 * - Head code: Appended to the <head> tag (for meta tags, analytics, styles)
 * - Body code: Appended to the end of <body> tag (for tracking pixels, chat widgets)
 * 
 * Note: Code is only injected on public pages, not admin pages.
 */
export function CustomCodeSection() {
  const [headCode, setHeadCode] = useState('');
  const [bodyCode, setBodyCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved custom code on component mount
  useEffect(() => {
    loadCustomCode();
  }, []);

  const loadCustomCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/settings/custom-code`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load custom code');
      }

      const data = await response.json();
      setHeadCode(data.headCode || '');
      setBodyCode(data.bodyCode || '');
    } catch (error) {
      console.error('Error loading custom code:', error);
      toast.error('Failed to load custom code settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/settings/custom-code`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            headCode,
            bodyCode,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save custom code');
      }

      toast.success('Custom code saved successfully');
    } catch (error) {
      console.error('Error saving custom code:', error);
      toast.error('Failed to save custom code');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsSectionCard 
      title="Custom Code"
      icon={<Code size={24} weight="duotone" />}
      description="Add custom HTML, CSS, or JavaScript to every page. Perfect for analytics, SEO meta tags, chat widgets, and tracking pixels."
      action={
        <Button 
          size="default" 
          onClick={handleSave}
          disabled={isSaving || isLoading}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      }
    >
      <div className="flex flex-col gap-6 mt-6">
        {/* End of <head> tag */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <label 
              htmlFor="head-code" 
              style={{ color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}
            >
              End of &lt;head&gt; tag
            </label>
          </div>
          <p 
            className="mb-3"
            style={{ 
              color: 'var(--muted-foreground)', 
              fontSize: 'var(--text-sm)' 
            }}
          >
            Add Google Tag Manager, meta tags, custom CSS, or any code that should load in the page head.
          </p>
          <Textarea
            id="head-code"
            value={headCode}
            onChange={(e) => setHeadCode(e.target.value)}
            placeholder={`<!-- Example: Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-XXXXXX');</script>`}
            rows={8}
            className="font-mono"
            style={{ fontSize: 'var(--text-sm)' }}
            disabled={isLoading}
          />
        </div>

        {/* End of <body> tag */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <label 
              htmlFor="body-code"
              style={{ color: 'var(--foreground)', fontWeight: 'var(--font-weight-medium)' }}
            >
              End of &lt;body&gt; tag
            </label>
          </div>
          <p 
            className="mb-3"
            style={{ 
              color: 'var(--muted-foreground)', 
              fontSize: 'var(--text-sm)' 
            }}
          >
            Add Facebook Pixel, chat widgets (Intercom, Drift), or tracking scripts that should load at the end of the page.
          </p>
          <Textarea
            id="body-code"
            value={bodyCode}
            onChange={(e) => setBodyCode(e.target.value)}
            placeholder={`<!-- Example: Chat Widget -->\n<script>\n  window.intercomSettings = {\n    app_id: "YOUR_APP_ID"\n  };\n</script>\n<script src="https://widget.intercom.io/widget/YOUR_APP_ID"></script>`}
            rows={8}
            className="font-mono"
            style={{ fontSize: 'var(--text-sm)' }}
            disabled={isLoading}
          />
        </div>
      </div>
    </SettingsSectionCard>
  );
}