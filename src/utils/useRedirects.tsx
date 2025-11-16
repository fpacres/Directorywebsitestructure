import { useEffect, useState } from 'react';
import { projectId, publicAnonKey } from './supabase/info';
import { navigate } from '../shared/utils/navigation';

interface Redirect {
  id: string;
  oldUrl: string;
  newUrl: string;
  created_at: string;
}

/**
 * useRedirects Hook
 * 
 * Automatically handles URL redirects based on admin settings.
 * Checks the current path against saved redirects and performs navigation if a match is found.
 * 
 * Supports:
 * - Exact path matching: /old-page → /new-page
 * - Wildcard matching: /blog/* → /articles/*
 * 
 * Usage:
 * Add this hook to your App.tsx or main routing component:
 * 
 * ```tsx
 * useRedirects();
 * ```
 */
export function useRedirects() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Load redirects on mount
  useEffect(() => {
    loadRedirects();
  }, []);

  // Listen for path changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('navigate', handleLocationChange as EventListener);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate', handleLocationChange as EventListener);
    };
  }, []);

  // Check for redirect when location changes
  useEffect(() => {
    if (!isLoaded || redirects.length === 0) return;

    const matchedRedirect = findMatchingRedirect(currentPath, redirects);

    if (matchedRedirect) {
      const newPath = buildNewPath(currentPath, matchedRedirect);
      
      // Prevent infinite redirect loops
      if (newPath === currentPath) {
        console.warn(`Redirect loop detected: ${currentPath} → ${newPath}`);
        return;
      }
      
      console.log(`Redirecting from ${currentPath} to ${newPath}`);
      navigate(newPath);
    }
  }, [currentPath, redirects, isLoaded]);

  const loadRedirects = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/settings/redirects`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load redirects');
      }

      const data = await response.json();
      setRedirects(data.redirects || []);
    } catch (error) {
      console.error('Error loading redirects:', error);
      setRedirects([]);
    } finally {
      setIsLoaded(true);
    }
  };

  return null;
}

/**
 * Find a matching redirect for the current path
 * Supports exact matches and wildcard patterns (e.g., /blog/*)
 */
function findMatchingRedirect(currentPath: string, redirects: Redirect[]): Redirect | null {
  for (const redirect of redirects) {
    // Check for exact match
    if (redirect.oldUrl === currentPath) {
      return redirect;
    }

    // Check for wildcard match (e.g., /blog/*)
    if (redirect.oldUrl.endsWith('/*')) {
      const basePattern = redirect.oldUrl.slice(0, -2); // Remove /*
      if (currentPath.startsWith(basePattern)) {
        return redirect;
      }
    }
  }

  return null;
}

/**
 * Build the new path based on the redirect rule
 * Handles both exact redirects and wildcard redirects
 */
function buildNewPath(currentPath: string, redirect: Redirect): string {
  // Exact match - use the new URL directly
  if (redirect.oldUrl === currentPath) {
    return redirect.newUrl;
  }

  // Wildcard match - preserve the remaining path
  if (redirect.oldUrl.endsWith('/*')) {
    const basePattern = redirect.oldUrl.slice(0, -2); // Remove /*
    const remainingPath = currentPath.slice(basePattern.length);

    // If new URL also has wildcard, replace it with remaining path
    if (redirect.newUrl.endsWith('/*')) {
      const newBase = redirect.newUrl.slice(0, -2); // Remove /*
      return newBase + remainingPath;
    }

    // Otherwise, append remaining path to new URL
    return redirect.newUrl + remainingPath;
  }

  return redirect.newUrl;
}