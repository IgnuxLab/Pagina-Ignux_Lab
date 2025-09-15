import { f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DMnf0x-c.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_vPHtAo0o.mjs';
import { R as ROUTES } from '../chunks/routes_mUABMEue.mjs';
/* empty css                                 */
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": ROUTES.NOT_FOUND.title, "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-container" data-astro-cid-zetdm5md> <!-- Separador superior --> <div class="section-separator" data-astro-cid-zetdm5md></div> <div class="section-container" data-astro-cid-zetdm5md> <div class="error-page section-spacing" data-astro-cid-zetdm5md> <!-- Contenido principal centrado --> <div class="error-content-wrapper" data-astro-cid-zetdm5md> <!-- Número 404 --> <div class="error-number" data-aos="fade-up" data-astro-cid-zetdm5md> <span class="error-404" data-astro-cid-zetdm5md>404</span> </div> <!-- Mensaje principal --> <div class="error-message" data-aos="fade-up" data-aos-delay="200" data-astro-cid-zetdm5md> <h1 class="error-title" data-astro-cid-zetdm5md>Página no encontrada</h1> <p class="error-description" data-astro-cid-zetdm5md>
Lo sentimos, la página que buscas no existe o ha sido movida.
</p> </div> <!-- Botones de acción --> <div class="error-actions" data-aos="fade-up" data-aos-delay="400" data-astro-cid-zetdm5md> <a href="/" class="btn-home" data-astro-cid-zetdm5md> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-zetdm5md> <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" data-astro-cid-zetdm5md></path> <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2" data-astro-cid-zetdm5md></polyline> </svg>
Volver al Inicio
</a> <a href="/solutions" class="btn-solutions" data-astro-cid-zetdm5md> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-zetdm5md> <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" data-astro-cid-zetdm5md></rect> <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" data-astro-cid-zetdm5md></line> <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2" data-astro-cid-zetdm5md></line> </svg>
Ver Soluciones
</a> </div> <!-- Enlaces rápidos --> <div class="quick-links" data-aos="fade-up" data-aos-delay="600" data-astro-cid-zetdm5md> <p class="quick-links-title" data-astro-cid-zetdm5md>O explora nuestras secciones:</p> <div class="links-grid" data-astro-cid-zetdm5md> <a href="/about" class="quick-link" data-astro-cid-zetdm5md>Sobre Nosotros</a> <a href="/news" class="quick-link" data-astro-cid-zetdm5md>Noticias</a> <a href="/contact" class="quick-link" data-astro-cid-zetdm5md>Contacto</a> </div> </div> </div> </div> </div> <!-- Separador inferior --> <div class="section-separator" data-astro-cid-zetdm5md></div> </div> ` })}  ${renderScript($$result, "C:/Users/Hewlett Packard/Desktop/ignuxlab/src/pages/404.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Hewlett Packard/Desktop/ignuxlab/src/pages/404.astro", void 0);

const $$file = "C:/Users/Hewlett Packard/Desktop/ignuxlab/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
