# Sistema de Rutas de IgnuxLab

## Descripción General

Este documento describe el sistema de rutas implementado en el proyecto IgnuxLab, diseñado para mantener una estructura profesional y escalable.

## Estructura del Sistema

### 1. Configuración de Rutas (`src/config/routes.ts`)

El archivo central de configuración define todas las rutas del sitio con sus metadatos:

```typescript
interface RouteConfig {
  path: string;           // Ruta de la página
  name: string;           // Nombre para navegación
  title: string;          // Título SEO
  description: string;    // Descripción SEO
  keywords: string[];     // Palabras clave
  isPublic: boolean;      // Si debe aparecer en sitemap
  priority?: number;      // Prioridad para SEO (0.1 - 1.0)
}
```

### 2. Página 404 Personalizada (`src/pages/404.astro`)

- Diseño profesional y responsive
- Enlaces útiles para navegación
- Funcionalidad de búsqueda
- Animaciones y efectos visuales
- Scripts para mejorar UX

### 3. Middleware de Rutas (`src/middleware.ts`)

Funcionalidades implementadas:
- Headers de seguridad
- Redirecciones automáticas
- Validación de rutas
- Manejo de errores
- Rate limiting básico
- Logging de solicitudes

### 4. Sitemap Dinámico (`src/pages/sitemap.xml.ts`)

- Generación automática basada en configuración
- Prioridades SEO configuradas
- Frecuencia de actualización
- Cache optimizado

## Rutas Configuradas

| Ruta | Nombre | Descripción |
|------|--------|-------------|
| `/` | Inicio | Página principal del sitio |
| `/about` | Nosotros | Información sobre la empresa |
| `/solutions` | Soluciones | Servicios y soluciones |
| `/news` | Noticias | Blog y actualizaciones |
| `/contact` | Contacto | Formulario de contacto |
| `/404` | Error 404 | Página de error personalizada |

## Redirecciones Configuradas

### Redirecciones de URLs Antiguas
- `/home` → `/`
- `/index` → `/`
- `/inicio` → `/`

### Redirecciones de SEO
- `/about-us` → `/about`
- `/services` → `/solutions`
- `/blog` → `/news`
- `/contact-us` → `/contact`

### Redirecciones de Archivos
- `/favicon.ico` → `/favicon.svg`

## Uso del Sistema

### En Componentes Astro

```astro
---
import { ROUTES, getRouteByPath } from '@config/routes';

const currentRoute = getRouteByPath(Astro.url.pathname);
---

<Layout 
  title={currentRoute?.title || 'IgnuxLab'}
  description={currentRoute?.description}
>
  <!-- Contenido -->
</Layout>
```

### En JavaScript/TypeScript

```typescript
import { ROUTES, getPublicRoutes, getRoutesByPriority } from '@config/routes';

// Obtener todas las rutas públicas
const publicRoutes = getPublicRoutes();

// Obtener rutas ordenadas por prioridad
const prioritizedRoutes = getRoutesByPriority();

// Validar una ruta
const isValid = isValidRoute('/about');
```

## Configuración de Astro

### Alias de Rutas Configurados

```javascript
alias: {
  '@': './src',
  '@config': './src/config',
  '@components': './src/components',
  '@layouts': './src/layouts',
  '@assets': './src/assets',
  '@types': './src/types'
}
```

### Redirecciones en astro.config.mjs

```javascript
redirects: {
  '/home': '/',
  '/about-us': '/about',
  '/services': '/solutions',
  // ... más redirecciones
}
```

## SEO y Metadatos

### Configuración SEO por Ruta

Cada ruta incluye:
- Título optimizado para SEO
- Descripción meta
- Palabras clave relevantes
- Prioridad para sitemap

### Sitemap Automático

- Generado dinámicamente
- Incluye solo rutas públicas
- Prioridades configuradas
- Fechas de modificación

### Robots.txt

- Configuración estándar
- Referencia al sitemap
- Reglas de crawling

## Seguridad

### Headers de Seguridad

El middleware incluye headers de seguridad:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Validación de URLs

- Sanitización de parámetros peligrosos
- Validación de rutas
- Manejo de errores 404

## Mantenimiento

### Agregar Nueva Ruta

1. Agregar la ruta en `src/config/routes.ts`:
```typescript
NEW_ROUTE: {
  path: '/new-page',
  name: 'Nueva Página',
  title: 'Título SEO',
  description: 'Descripción SEO',
  keywords: ['palabra1', 'palabra2'],
  isPublic: true,
  priority: 0.8
}
```

2. Crear el archivo de página en `src/pages/new-page.astro`

3. Si es necesario, agregar redirecciones en `astro.config.mjs`

### Modificar Redirecciones

1. Actualizar `getRedirects()` en `src/middleware.ts`
2. Actualizar `redirects` en `astro.config.mjs`

### Actualizar SEO

Modificar los metadatos en `src/config/routes.ts` para cada ruta.

## Monitoreo y Logs

### Logs de Errores 404

El middleware registra automáticamente:
- URL solicitada
- Referer de la solicitud
- Timestamp del error

### Rate Limiting

Implementación básica para prevenir abuso:
- 100 solicitudes por minuto por IP
- Reset automático del contador

## Mejores Prácticas

1. **Consistencia**: Usar siempre el sistema de rutas centralizado
2. **SEO**: Mantener títulos y descripciones actualizados
3. **Seguridad**: No exponer rutas sensibles en el sitemap
4. **Performance**: Usar prioridades apropiadas para el sitemap
5. **Mantenimiento**: Documentar cambios en rutas importantes

## Futuras Mejoras

- [ ] Internacionalización (i18n)
- [ ] Rutas dinámicas basadas en contenido
- [ ] Cache de rutas
- [ ] Analytics de rutas
- [ ] A/B testing de páginas
- [ ] Lazy loading de rutas
