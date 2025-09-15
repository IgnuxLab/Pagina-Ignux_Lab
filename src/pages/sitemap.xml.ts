/**
 * Generador dinámico de sitemap.xml
 * Basado en la configuración de rutas
 */

import type { APIRoute } from 'astro';
import { getRoutesByPriority } from '../config/routes';

export const GET: APIRoute = async ({ request }) => {
  try {
    const routes = getRoutesByPriority();
    const baseUrl = 'https://ignuxlab.com';
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.priority || 0.5}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    return new Response('Error generating sitemap', { status: 500 });
  }
};
