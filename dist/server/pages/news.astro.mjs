import { f as createComponent, m as maybeRenderHead, s as spreadAttributes, h as addAttribute, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_DMnf0x-c.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_vPHtAo0o.mjs';
import { a as $$Footer, $ as $$Header } from '../chunks/Footer_yxURgYlK.mjs';
import { n as newsData } from '../chunks/news_BzUtwS-I.mjs';
/* empty css                                */
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$NewsGrid = createComponent(($$result, $$props, $$slots) => {
  const { featured, recent } = newsData;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return renderTemplate`${maybeRenderHead()}<section class="news-grid-section section-spacing section-depth" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-out-cubic"> <div class="news-container"> <div class="section-header" data-aos="fade-down" data-aos-delay="150" data-aos-duration="800" data-aos-easing="ease-out-cubic"> <h2 class="section-title">Últimas Noticias</h2> <p class="section-subtitle">
Mantente al día con nuestros proyectos e innovaciones más recientes
</p> </div> <div class="news-grid" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000" data-aos-easing="ease-out-cubic"> <!-- Noticia Destacada Original --> <article class="news-card featured" data-aos="slide-up" data-aos-delay="450" data-aos-duration="800" data-aos-easing="ease-out-cubic"> <div class="news-image"${spreadAttributes({ "data-open-video": true, "data-video-src": featured.video } )}> <img${addAttribute(`${"/"}img/${featured.image}`, "src")}${addAttribute(featured.title, "alt")} loading="lazy"> ${renderTemplate`<button type="button" class="play-overlay" data-open-video${addAttribute(featured.video, "data-video-src")} aria-label="Reproducir video de lanzamiento"> <span class="play-icon">▶</span> </button>`} <div class="news-category">${featured.category}</div> </div> <div class="news-content"> <div class="news-meta"> <span class="news-date">${formatDate(featured.date)}</span> <span class="news-author">${featured.author}</span> </div> <h3 class="news-title">${featured.title}</h3> <p class="news-excerpt"> ${featured.excerpt} </p> <div class="news-tags"> ${featured.tags.map((tag) => renderTemplate`<span class="tag">${tag}</span>`)} </div> </div> </article> ${renderTemplate`<div id="videoModal" class="video-modal" aria-hidden="true"> <div class="video-modal-backdrop" data-close-video></div> <div class="video-modal-dialog" role="dialog" aria-modal="true" aria-label="Reproductor de video"> <button class="video-modal-close" type="button" data-close-video aria-label="Cerrar">×</button> <div class="video-modal-header"> <h3 class="video-modal-title">${featured.title}</h3> <div class="video-modal-meta"> <span class="video-date">${formatDate(featured.date)}</span> <span class="video-author">Por ${featured.author}</span> </div> </div> <div class="video-modal-content"> <video id="videoModalPlayer"${addAttribute(featured.videoConfig?.controls !== false, "controls")} preload="metadata" playsinline${addAttribute(featured.videoConfig?.muted !== false, "muted")}${addAttribute(featured.videoConfig?.autoplay === true, "autoplay")}${addAttribute(`${"/"}img/${featured.image}`, "poster")}></video> </div> <div class="video-modal-footer"> <p class="video-description">${featured.content}</p> <div class="video-tags"> ${featured.tags.map((tag) => renderTemplate`<span class="video-tag">${tag}</span>`)} </div> </div> </div> </div>`} <!-- Noticias Recientes --> ${recent.map((news, index) => renderTemplate`<article class="news-card" data-aos="slide-up"${addAttribute(600 + index * 80, "data-aos-delay")} data-aos-duration="800" data-aos-easing="ease-out-cubic"> <div class="news-image"> <img${addAttribute(`${"/"}img/${news.image}`, "src")}${addAttribute(news.title, "alt")} loading="lazy"> <div class="news-category">${news.category}</div> </div> <div class="news-content"> <div class="news-meta"> <span class="news-date">${formatDate(news.date)}</span> <span class="news-author">${news.author}</span> </div> <h3 class="news-title">${news.title}</h3> <p class="news-excerpt"> ${news.excerpt} </p> <div class="news-tags"> ${news.tags.map((tag) => renderTemplate`<span class="tag">${tag}</span>`)} </div> </div> </article>`)} </div> </div> </section> `;
}, "C:/Users/Hewlett Packard/Desktop/ignuxlab/src/components/NewsGrid.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$News = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Noticias" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="page-container"> ', ' <main class="news-main"> <section class="hero-banner"> <div class="hero-content"> <h1 class="hero-title">Noticias</h1> <div class="breadcrumb"> <a', ' class="breadcrumb-link">Inicio</a> <span class="separator">/</span> <span class="breadcrumb-active">Noticias</span> </div> </div> </section> <!-- Grid de Noticias --> ', ' <div class="section-separator"></div> </main> ', ' </div>  <script type="module"', "></script> "])), maybeRenderHead(), renderComponent($$result2, "Header", $$Header, {}), addAttribute(`${"/"}`, "href"), renderComponent($$result2, "NewsGrid", $$NewsGrid, {}), renderComponent($$result2, "Footer", $$Footer, {}), addAttribute(`${"/"}scripts/news.js`, "src")) })}`;
}, "C:/Users/Hewlett Packard/Desktop/ignuxlab/src/pages/news.astro", void 0);
const $$file = "C:/Users/Hewlett Packard/Desktop/ignuxlab/src/pages/news.astro";
const $$url = "/news";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$News,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
