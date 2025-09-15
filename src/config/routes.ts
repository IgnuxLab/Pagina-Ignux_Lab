/**
 * Configuración de rutas del sitio
 * Centraliza todas las rutas para facilitar el mantenimiento
 */

export interface RouteConfig {
  path: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  isPublic: boolean;
  priority?: number;
}

export const ROUTES: Record<string, RouteConfig> = {
  HOME: {
    path: '/',
    name: 'Inicio',
    title: 'IgnuxLab - Laboratorio de Innovación Digital',
    description: 'Transformamos ideas en soluciones digitales innovadoras. Laboratorio especializado en desarrollo web, móvil y tecnologías emergentes.',
    keywords: ['innovación digital', 'desarrollo web', 'laboratorio', 'tecnología', 'soluciones digitales'],
    isPublic: true,
    priority: 1.0
  },
  ABOUT: {
    path: '/about',
    name: 'Nosotros',
    title: 'Acerca de IgnuxLab - Nuestro Equipo y Misión',
    description: 'Conoce nuestro equipo de expertos y nuestra misión de transformar el mundo digital a través de la innovación y la excelencia técnica.',
    keywords: ['equipo', 'misión', 'valores', 'experiencia', 'innovación'],
    isPublic: true,
    priority: 0.8
  },
  SOLUTIONS: {
    path: '/solutions',
    name: 'Soluciones',
    title: 'Soluciones Digitales - Servicios de IgnuxLab',
    description: 'Descubre nuestras soluciones especializadas en desarrollo web, aplicaciones móviles, e-commerce y transformación digital.',
    keywords: ['desarrollo web', 'aplicaciones móviles', 'e-commerce', 'transformación digital', 'servicios'],
    isPublic: true,
    priority: 0.9
  },
  NEWS: {
    path: '/news',
    name: 'Noticias',
    title: 'Noticias y Actualizaciones - IgnuxLab',
    description: 'Mantente al día con las últimas noticias, proyectos y actualizaciones de IgnuxLab.',
    keywords: ['noticias', 'actualizaciones', 'proyectos', 'blog', 'tecnología'],
    isPublic: true,
    priority: 0.7
  },
  CONTACT: {
    path: '/contact',
    name: 'Contacto',
    title: 'Contacto - Habla con IgnuxLab',
    description: '¿Tienes un proyecto en mente? Contáctanos y trabajemos juntos para hacerlo realidad.',
    keywords: ['contacto', 'proyectos', 'consultoría', 'desarrollo', 'colaboración'],
    isPublic: true,
    priority: 0.6
  },
  NOT_FOUND: {
    path: '/404',
    name: 'Página no encontrada',
    title: '404 - Página no encontrada | IgnuxLab',
    description: 'La página que buscas no existe. Regresa al inicio o explora nuestras soluciones.',
    keywords: ['404', 'error', 'página no encontrada'],
    isPublic: false,
    priority: 0.1
  }
} as const;

/**
 * Obtiene la configuración de una ruta por su clave
 */
export function getRoute(key: keyof typeof ROUTES): RouteConfig {
  return ROUTES[key];
}

/**
 * Obtiene todas las rutas públicas para sitemap
 */
export function getPublicRoutes(): RouteConfig[] {
  return Object.values(ROUTES).filter(route => route.isPublic);
}

/**
 * Obtiene rutas ordenadas por prioridad (para sitemap)
 */
export function getRoutesByPriority(): RouteConfig[] {
  return getPublicRoutes().sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

/**
 * Valida si una ruta existe
 */
export function isValidRoute(path: string): boolean {
  return Object.values(ROUTES).some(route => route.path === path);
}

/**
 * Obtiene la ruta por path
 */
export function getRouteByPath(path: string): RouteConfig | undefined {
  return Object.values(ROUTES).find(route => route.path === path);
}

/**
 * Navegación principal del sitio
 */
export const MAIN_NAVIGATION = [
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.SOLUTIONS,
  ROUTES.NEWS,
  ROUTES.CONTACT
];

/**
 * Breadcrumbs helper
 */
export function getBreadcrumbs(currentPath: string): Array<{ name: string; path: string }> {
  const breadcrumbs = [{ name: 'Inicio', path: '/' }];
  
  if (currentPath === '/') return breadcrumbs;
  
  const route = getRouteByPath(currentPath);
  if (route && route.name !== 'Inicio') {
    breadcrumbs.push({ name: route.name, path: route.path });
  }
  
  return breadcrumbs;
}
