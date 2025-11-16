import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
import { initializeSeedData, forceSeedData } from "./seed-data.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Note: Automatic seed initialization has been disabled since the site is now fully CMS-driven.
// If you need to seed data, use the manual seed endpoint: POST /make-server-d38bd56f/seed

// Health check endpoint
app.get("/make-server-d38bd56f/health", (c) => {
  return c.json({ status: "ok" });
});

// Manual seed endpoint (for debugging)
app.post("/make-server-d38bd56f/seed", async (c) => {
  try {
    console.log('Manual seed triggered...');
    
    // Force seed by using forceSeedData which always overwrites
    const force = c.req.query('force') === 'true';
    
    if (force) {
      console.log('Force flag detected. Using forceSeedData...');
      const result = await forceSeedData();
      return c.json(result);
    }
    
    const result = await initializeSeedData();
    return c.json(result);
  } catch (error) {
    console.log(`Error seeding data: ${error}`);
    return c.json({ error: `Failed to seed data: ${error}` }, 500);
  }
});

// Migration endpoint: Update subcategory from 'unit-converter' to 'length-unit-converter'
app.post("/make-server-d38bd56f/migrate/update-subcategory", async (c) => {
  try {
    console.log('Migration: Updating subcategory from unit-converter to length-unit-converter...');
    
    const allPages = await kv.getByPrefix('page:');
    let updatedCount = 0;
    
    for (const page of allPages) {
      if (page.subcategory === 'unit-converter') {
        const updatedPage = {
          ...page,
          subcategory: 'length-unit-converter',
          subcategory_display_name: 'Length Unit Converter',
          updated_at: new Date().toISOString(),
        };
        
        await kv.set(`page:${page.id}`, updatedPage);
        updatedCount++;
        console.log(`Updated page: ${page.title}`);
      }
    }
    
    console.log(`Migration complete. Updated ${updatedCount} pages.`);
    return c.json({ 
      success: true, 
      message: `Updated ${updatedCount} pages from 'unit-converter' to 'length-unit-converter'`,
      updatedCount 
    });
  } catch (error) {
    console.log(`Error during migration: ${error}`);
    return c.json({ error: `Failed to migrate data: ${error}` }, 500);
  }
});

// Delete all pages endpoint (requires auth)
app.delete("/make-server-d38bd56f/pages/all", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    console.log('Deleting all pages...');
    const allPages = await kv.getByPrefix('page:');
    
    for (const page of allPages) {
      await kv.del(`page:${page.id}`);
      console.log(`Deleted page: ${page.title}`);
    }
    
    console.log(`Successfully deleted ${allPages.length} pages.`);
    return c.json({ success: true, deletedCount: allPages.length });
  } catch (error) {
    console.log(`Error deleting all pages: ${error}`);
    return c.json({ error: "Failed to delete all pages" }, 500);
  }
});

// Debug endpoint to view all KV data
app.get("/make-server-d38bd56f/debug/kv", async (c) => {
  try {
    const allPages = await kv.getByPrefix('page:');
    const allData = await kv.getByPrefix('');
    
    return c.json({ 
      pages: allPages,
      allData: allData,
      pageCount: allPages.length,
      totalKeys: allData.length
    });
  } catch (error) {
    console.log(`Error fetching debug data: ${error}`);
    return c.json({ error: "Failed to fetch debug data" }, 500);
  }
});

// ==================== AUTH ROUTES ====================

// Admin signup route
app.post("/make-server-d38bd56f/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: 'admin' },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true
    });

    if (error) {
      console.log(`Admin signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true, 
      user: { 
        id: data.user.id, 
        email: data.user.email,
        name: data.user.user_metadata.name 
      } 
    });
  } catch (error) {
    console.log(`Admin signup exception: ${error}`);
    return c.json({ error: "Failed to create admin account" }, 500);
  }
});

// ==================== PAGE MANAGEMENT ROUTES ====================

// Get all pages (filtered by category/subcategory)
app.get("/make-server-d38bd56f/pages", async (c) => {
  try {
    const category = c.req.query('category');
    const subcategory = c.req.query('subcategory');
    
    let pages = await kv.getByPrefix('page:');
    
    // Filter by category/subcategory if provided
    if (category || subcategory) {
      pages = pages.filter((page: any) => {
        if (category && page.category !== category) return false;
        if (subcategory && page.subcategory !== subcategory) return false;
        return true;
      });
    }
    
    return c.json({ pages });
  } catch (error) {
    console.log(`Error fetching pages: ${error}`);
    return c.json({ error: "Failed to fetch pages" }, 500);
  }
});

// Get single page by ID
app.get("/make-server-d38bd56f/pages/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const page = await kv.get(`page:${id}`);
    
    if (!page) {
      return c.json({ error: "Page not found" }, 404);
    }
    
    return c.json({ page });
  } catch (error) {
    console.log(`Error fetching page: ${error}`);
    return c.json({ error: "Failed to fetch page" }, 500);
  }
});

// Get single page by slug (public endpoint)
app.get("/make-server-d38bd56f/pages/by-slug/:slug", async (c) => {
  try {
    const slug = c.req.param('slug');
    const allPages = await kv.getByPrefix('page:');
    
    const page = allPages.find((p: any) => p.slug === slug);
    
    if (!page) {
      return c.json({ error: "Page not found" }, 404);
    }
    
    return c.json({ page });
  } catch (error) {
    console.log(`Error fetching page by slug: ${error}`);
    return c.json({ error: "Failed to fetch page" }, 500);
  }
});

// Get pages by category (public endpoint)
app.get("/make-server-d38bd56f/pages/by-category/:category", async (c) => {
  try {
    const category = c.req.param('category');
    const allPages = await kv.getByPrefix('page:');
    
    const pages = allPages.filter((p: any) => p.category === category && p.published !== false);
    
    return c.json({ pages });
  } catch (error) {
    console.log(`Error fetching pages by category: ${error}`);
    return c.json({ error: "Failed to fetch pages" }, 500);
  }
});

// Get pages by subcategory (public endpoint)
app.get("/make-server-d38bd56f/pages/by-subcategory/:subcategory", async (c) => {
  try {
    const subcategory = c.req.param('subcategory');
    const allPages = await kv.getByPrefix('page:');
    
    const pages = allPages.filter((p: any) => p.subcategory === subcategory && p.published !== false);
    
    return c.json({ pages });
  } catch (error) {
    console.log(`Error fetching pages by subcategory: ${error}`);
    return c.json({ error: "Failed to fetch pages" }, 500);
  }
});

// Create new page (requires auth)
app.post("/make-server-d38bd56f/pages", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const pageData = await c.req.json();
    const id = crypto.randomUUID();
    
    const page = {
      id,
      ...pageData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: user.id,
    };
    
    await kv.set(`page:${id}`, page);
    
    return c.json({ success: true, page });
  } catch (error) {
    console.log(`Error creating page: ${error}`);
    return c.json({ error: "Failed to create page" }, 500);
  }
});

// Update page (requires auth)
app.put("/make-server-d38bd56f/pages/:id", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param('id');
    const existingPage = await kv.get(`page:${id}`);
    
    if (!existingPage) {
      return c.json({ error: "Page not found" }, 404);
    }

    const updates = await c.req.json();
    const page = {
      ...existingPage,
      ...updates,
      id, // Ensure ID doesn't change
      created_at: existingPage.created_at, // Preserve creation date
      updated_at: new Date().toISOString(),
      updated_by: user.id,
    };
    
    await kv.set(`page:${id}`, page);
    
    return c.json({ success: true, page });
  } catch (error) {
    console.log(`Error updating page: ${error}`);
    return c.json({ error: "Failed to update page" }, 500);
  }
});

// Delete page (requires auth)
app.delete("/make-server-d38bd56f/pages/:id", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`page:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting page: ${error}`);
    return c.json({ error: "Failed to delete page" }, 500);
  }
});

// ==================== SETTINGS ROUTES ====================

// Get custom code settings
app.get("/make-server-d38bd56f/settings/custom-code", async (c) => {
  try {
    const settings = await kv.get('settings:custom-code');
    
    return c.json({
      headCode: settings?.headCode || '',
      bodyCode: settings?.bodyCode || '',
    });
  } catch (error) {
    console.log(`Error fetching custom code settings: ${error}`);
    return c.json({ error: "Failed to fetch custom code settings" }, 500);
  }
});

// Save custom code settings
app.post("/make-server-d38bd56f/settings/custom-code", async (c) => {
  try {
    const { headCode, bodyCode } = await c.req.json();
    
    const settings = {
      headCode: headCode || '',
      bodyCode: bodyCode || '',
      updated_at: new Date().toISOString(),
    };
    
    await kv.set('settings:custom-code', settings);
    
    return c.json({ success: true, settings });
  } catch (error) {
    console.log(`Error saving custom code settings: ${error}`);
    return c.json({ error: "Failed to save custom code settings" }, 500);
  }
});

// ==================== REDIRECT ROUTES ====================

// Get all redirects
app.get("/make-server-d38bd56f/settings/redirects", async (c) => {
  try {
    const redirects = await kv.get('settings:redirects');
    
    return c.json({
      redirects: redirects?.items || [],
    });
  } catch (error) {
    console.log(`Error fetching redirects: ${error}`);
    return c.json({ error: "Failed to fetch redirects" }, 500);
  }
});

// Create new redirect
app.post("/make-server-d38bd56f/settings/redirects", async (c) => {
  try {
    const { oldUrl, newUrl } = await c.req.json();
    
    if (!oldUrl || !newUrl) {
      return c.json({ error: "Old URL and new URL are required" }, 400);
    }
    
    const existingData = await kv.get('settings:redirects');
    const redirects = existingData?.items || [];
    
    const newRedirect = {
      id: crypto.randomUUID(),
      oldUrl,
      newUrl,
      created_at: new Date().toISOString(),
    };
    
    redirects.push(newRedirect);
    
    await kv.set('settings:redirects', {
      items: redirects,
      updated_at: new Date().toISOString(),
    });
    
    return c.json({ success: true, redirect: newRedirect });
  } catch (error) {
    console.log(`Error creating redirect: ${error}`);
    return c.json({ error: "Failed to create redirect" }, 500);
  }
});

// Delete redirect
app.delete("/make-server-d38bd56f/settings/redirects/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    const existingData = await kv.get('settings:redirects');
    const redirects = existingData?.items || [];
    
    const filteredRedirects = redirects.filter((r: any) => r.id !== id);
    
    await kv.set('settings:redirects', {
      items: filteredRedirects,
      updated_at: new Date().toISOString(),
    });
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting redirect: ${error}`);
    return c.json({ error: "Failed to delete redirect" }, 500);
  }
});

Deno.serve(app.fetch);