import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DMnf0x-c.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_vPHtAo0o.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_yxURgYlK.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Solutions = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Soluciones" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-container"> ${renderComponent($$result2, "Header", $$Header, {})} <main class="solutions-main"> <section class="hero-banner"> <div class="hero-content"> <h1 class="hero-title">Nuestras Soluciones</h1> <div class="breadcrumb"> <a${addAttribute(`${"/"}`, "href")} class="breadcrumb-link">Inicio</a> <span class="separator">/</span> <span class="breadcrumb-active">Soluciones</span> </div> </div> </section> <!-- Contenido principal de soluciones --> <section class="solutions-content"> <div class="container"> <!-- Introducción --> <div class="solutions-intro"> <p class="solutions-vision">
Tres laboratorios, una sola visión: <strong>crear, aprender y transformar</strong> a través de la innovación
</p> </div> <!-- Grid de Laboratorios --> <div class="labs-grid"> <!-- Laboratorio de Formación --> <div class="lab-card formacion"> <img class="lab-gif"${addAttribute(`${"/"}img/icons/lab-para-la-formacion.gif`, "src")} alt="Laboratorio de Formación"> <h3 class="lab-title">Laboratorio de Formación</h3> <p class="lab-subtitle">Con más de 25 años de experiencia, creamos experiencias educativas que transforman.</p> <p class="lab-description">
Desarrollamos contenidos en habilidades digitales, desarrollo personal y profesional, y acompañamos a instituciones en el diseño y virtualización de procesos formativos en modalidad virtual, mixta y presencial.
</p> <p class="lab-approach">
Nuestro enfoque es activo y vivencial: impulsa la autonomía, el pensamiento crítico y un aprendizaje realmente significativo.
</p> </div> <!-- Laboratorio de Proyectos --> <div class="lab-card proyectos"> <img class="lab-gif"${addAttribute(`${"/"}img/icons/lab-de-proyectos.gif`, "src")} alt="Laboratorio de Proyectos"> <h3 class="lab-title">Laboratorio de Proyectos</h3> <p class="lab-subtitle">Convertimos ideas y necesidades en soluciones estratégicas e innovadoras.</p> <p class="lab-description">
Diseñamos proyectos a la medida, combinando creatividad y análisis para responder a los objetivos de cada cliente. Definimos metas claras, optimizamos recursos y aseguramos procesos viables y sostenibles.
</p> <p class="lab-approach">
Nuestro compromiso es dar dirección, minimizar riesgos y garantizar resultados consistentes en cada fase del proyecto.
</p> </div> <!-- Laboratorio Creativo --> <div class="lab-card creativo"> <img class="lab-gif"${addAttribute(`${"/"}img/icons/lab-creativo.gif`, "src")} alt="Laboratorio Creativo"> <h3 class="lab-title">Laboratorio Creativo</h3> <p class="lab-subtitle">Un espacio para dar vida a las ideas, desde marketing digital, diseño gráfico y producción audiovisual, hasta narrativas inmersivas y formatos experimentales.</p> <p class="lab-description">
Imaginamos, diseñamos y producimos soluciones creativas que van de lo convencional a lo inesperado, siempre alineadas con los objetivos de cada organización.
</p> <p class="lab-approach">
Somos un aliado transversal para materializar cualquier reto comunicativo o expresivo.
</p> </div> </div> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} </div> ` })}`;
}, "C:/Users/Hewlett Packard/Desktop/ignuxlab/src/pages/solutions.astro", void 0);
const $$file = "C:/Users/Hewlett Packard/Desktop/ignuxlab/src/pages/solutions.astro";
const $$url = "/solutions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Solutions,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
