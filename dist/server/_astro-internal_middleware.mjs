import { g as getRouteByPath } from './chunks/routes_mUABMEue.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_CZYeC4dt.mjs';
import 'kleur/colors';
import './chunks/astro/server_DMnf0x-c.mjs';
import 'clsx';
import 'cookie';
import { s as sequence } from './chunks/index_Bgyi3cjI.mjs';

const onRequest$1 = (context, next) => {
  const { request, url } = context;
  const pathname = url.pathname;
  if (pathname.includes(".xml") || pathname.includes(".txt") || pathname.includes("/api/")) {
    return next();
  }
  const redirects = getRedirects();
  const redirect = redirects[pathname];
  if (redirect) {
    return Response.redirect(redirect, 301);
  }
  const route = getRouteByPath(pathname);
  if (route) {
    context.locals.route = route;
    context.locals.isValidRoute = true;
  } else if (pathname !== "/404" && pathname !== "/404.html") {
    context.locals.isValidRoute = false;
    context.locals.originalPath = pathname;
  }
  try {
    return next();
  } catch (error) {
    console.error("Error en middleware:", error);
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error"
    });
  }
};
function getRedirects() {
  return {
    // Redirecciones de URLs antiguas
    "/home": "/",
    "/index": "/",
    "/inicio": "/",
    // Redirecciones de SEO
    "/about-us": "/about",
    "/acerca": "/about",
    "/nosotros": "/about",
    "/services": "/solutions",
    "/servicios": "/solutions",
    "/soluciones": "/solutions",
    "/blog": "/news",
    "/noticias": "/news",
    "/contact-us": "/contact",
    "/contacto": "/contact",
    // Redirecciones de idiomas (si planeas internacionalización)
    "/en": "/",
    "/es": "/",
    // Redirecciones de archivos comunes
    "/favicon.ico": "/img/favicon.png",
    "/robots.txt": "/robots.txt",
    "/sitemap.xml": "/sitemap.xml"
  };
}

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
