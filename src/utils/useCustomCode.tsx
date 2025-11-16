import { useEffect } from 'react';
import { projectId, publicAnonKey } from './supabase/info';

/**
 * useCustomCode Hook
 * 
 * Automatically loads and injects custom code snippets into the current page.
 * This enables SEO optimization, analytics tracking, and third-party integrations.
 * 
 * How it works:
 * 1. Fetches saved custom code from the backend on component mount
 * 2. Injects "head code" into the document <head> (for meta tags, analytics, styles)
 * 3. Injects "body code" at the end of <body> (for tracking pixels, chat widgets)
 * 
 * Usage:
 * - Called automatically in App.tsx for all public pages
 * - Does NOT run on admin pages to avoid interference
 * - Admins can manage custom code in Settings > General > Custom Code
 * 
 * Examples of what you can add:
 * 
 * HEAD CODE (for SEO and analytics):
 * ```html
 * <!-- Google Analytics -->
 * <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
 * <script>
 *   window.dataLayer = window.dataLayer || [];
 *   function gtag(){dataLayer.push(arguments);}
 *   gtag('js', new Date());
 *   gtag('config', 'GA_MEASUREMENT_ID');
 * </script>
 * 
 * <!-- Open Graph Meta Tags -->
 * <meta property="og:title" content="EveryDigitalTools - AI & Digital Tools Directory" />
 * <meta property="og:description" content="Discover the best AI and digital tools" />
 * ```
 * 
 * BODY CODE (for tracking and widgets):
 * ```html
 * <!-- Facebook Pixel -->
 * <script>
 *   !function(f,b,e,v,n,t,s){...}
 * </script>
 * 
 * <!-- Chat Widget -->
 * <script src="https://widget.chat.com/widget.js"></script>
 * ```
 */
export function useCustomCode() {
  useEffect(() => {
    // Don't inject custom code on admin pages
    if (window.location.pathname.startsWith('/admin')) {
      return;
    }

    const loadCustomCode = async () => {
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
          console.error('Failed to load custom code settings');
          return;
        }

        const data = await response.json();

        // Inject head code
        if (data.headCode) {
          const headContainer = document.createElement('div');
          headContainer.innerHTML = data.headCode;
          
          // Move all script and style elements to the head
          Array.from(headContainer.children).forEach((child) => {
            document.head.appendChild(child.cloneNode(true));
          });
        }

        // Inject body code
        if (data.bodyCode) {
          const bodyContainer = document.createElement('div');
          bodyContainer.innerHTML = data.bodyCode;
          
          // Move all script elements to the end of body
          Array.from(bodyContainer.children).forEach((child) => {
            document.body.appendChild(child.cloneNode(true));
          });
        }
      } catch (error) {
        console.error('Error loading custom code:', error);
      }
    };

    loadCustomCode();
  }, []);
}