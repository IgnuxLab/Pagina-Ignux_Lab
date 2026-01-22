/**
 * Middleware de Astro para manejo de rutas y errores
 * Intercepta las solicitudes y maneja redirecciones, autenticación, etc.
 */

import type { MiddlewareHandler } from 'astro';
import { ROUTES, isValidRoute, getRouteByPath } from './config/routes';

export const onRequest: MiddlewareHandler = (context, next) => {
  const { request, url } = context;
  const pathname = url.pathname;

  // Saltar middleware para archivos estáticos y APIs
  if (pathname.includes('.xml') || pathname.includes('.txt') || pathname.includes('/api/')) {
    return next();
  }

  // Redirecciones personalizadas
  const redirects = getRedirects();
  const redirect = redirects[pathname];
  if (redirect) {
    return Response.redirect(redirect, 301);
  }

  // Validar rutas y agregar metadatos
  const route = getRouteByPath(pathname);
  if (route) {
    // Agregar metadatos de la ruta al contexto
    (context.locals as any).route = route;
    (context.locals as any).isValidRoute = true;
  } else if (pathname !== '/404' && pathname !== '/404.html') {
    // Si la ruta no existe y no es 404, marcar como inválida
    (context.locals as any).isValidRoute = false;
    (context.locals as any).originalPath = pathname;
  }

  // Manejo de errores
  try {
    return next();
  } catch (error) {
    console.error('Error en middleware:', error);
    return new Response(null, {
      status: 500,
      statusText: 'Internal Server Error'
    });
  }
};

/**
 * Configuración de redirecciones
 */
function getRedirects(): Record<string, string> {
  return {
    // Redirecciones de URLs antiguas
    '/home': '/',
    '/index': '/',
    '/inicio': '/',
    
    // Redirecciones de SEO
    '/about-us': '/about',
    '/acerca': '/about',
    '/nosotros': '/about',
    '/services': '/solutions',
    '/servicios': '/solutions',
    '/soluciones': '/solutions',
    '/blog': '/news',
    '/noticias': '/news',
    '/contact-us': '/contact',
    '/contacto': '/contact',
    
    // Redirecciones de idiomas (si planeas internacionalización)
    '/en': '/',
    '/es': '/',
    
    // Redirecciones de archivos comunes
    '/favicon.ico': '/img/favicon.png',
    '/robots.txt': '/robots.txt',
    '/sitemap.xml': '/sitemap.xml'
  };
}

/**
 * Manejo de errores 404
 */
export function handle404(context: any): Response {
  const { url, locals, request } = context;
  
  // Crear respuesta 404 personalizada con validación de URL
  try {
    const notFoundUrl = new URL('/404', url.origin);
    
    // Agregar información del error a la URL para debugging
    if (locals.originalPath) {
      notFoundUrl.searchParams.set('from', locals.originalPath);
    }
    
    return Response.redirect(notFoundUrl, 404);
  } catch (error) {
    // Fallback si hay problemas con la URL
    return new Response('Not Found', { status: 404 });
  }
}

/**
 * Validar y sanitizar parámetros de URL
 */
export function sanitizeUrlParams(url: URL): URL {
  const sanitizedUrl = new URL(url);
  
  // Remover parámetros peligrosos
  const dangerousParams = ['javascript:', 'data:', 'vbscript:', 'onload', 'onerror'];
  
  for (const [key, value] of sanitizedUrl.searchParams.entries()) {
    if (dangerousParams.some(param => value.toLowerCase().includes(param))) {
      sanitizedUrl.searchParams.delete(key);
    }
  }
  
  return sanitizedUrl;
}

/**
 * Headers de seguridad para diferentes tipos de contenido
 */
export function getSecurityHeaders(contentType?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };

  // CSP específico para páginas HTML
  if (contentType?.includes('text/html')) {
    headers['Content-Security-Policy'] = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');
  }

  return headers;
}

/**
 * Rate limiting básico (para futuras implementaciones)
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, limit: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now();
  const key = ip;
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Logging de solicitudes para análisis
 */
export function logRequest(context: any, response: Response): void {
  const { request, url } = context;
  const startTime = Date.now();
  
  // Información básica de la solicitud
  const logData = {
    method: request.method,
    url: url.pathname,
    status: response.status,
    userAgent: request.headers.get('user-agent'),
    referer: request.headers.get('referer'),
    ip: request.headers.get('x-forwarded-for') || 'unknown',
    timestamp: new Date().toISOString()
  };

  // Log solo en desarrollo o para errores
  if (import.meta.env.DEV || response.status >= 400) {
    // Los logs se manejaran en un sistema de logging externo en producción
  }
}
