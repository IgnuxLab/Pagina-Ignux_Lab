import { f as createComponent, m as maybeRenderHead, l as renderScript, r as renderTemplate, e as createAstro, k as renderComponent, n as renderSlot, o as renderHead, h as addAttribute } from './astro/server_DMnf0x-c.mjs';
import 'kleur/colors';
/* empty css                         */
import 'clsx';

const $$FloatingActions = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="floating-actions"> <!-- Botón flotante izquierdo - Scroll to top --> <button class="floating-button scroll-top" id="scrollTopBtn" aria-label="Ir arriba" data-aos="fade-left" data-aos-delay="2000" data-aos-anchor-placement="top-bottom"> <div class="button-icon"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 4L12 20M12 4L6 10M12 4L18 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </div> <div class="button-glow"></div> <div class="button-ripple"></div> </button> <!-- Botón flotante derecho - Toggle chatbot --> <button class="floating-button chatbot-toggle" id="chatbotToggleBtn" aria-label="Abrir chatbot" data-aos="fade-left" data-aos-delay="2200" data-aos-anchor-placement="top-bottom"> <div class="button-icon"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </div> <div class="button-glow"></div> <div class="button-ripple"></div> </button> <!-- Panel del chatbot --> <div class="chatbot-panel" id="chatbotPanel"> <div class="chatbot-header" data-aos="fade-down" data-aos-delay="300"> <div class="chatbot-avatar" data-aos="zoom-in" data-aos-delay="400"> <div class="avatar-icon">🤖</div> </div> <div class="chatbot-info" data-aos="fade-left" data-aos-delay="500"> <h4 class="chatbot-name">IGNUX Assistant</h4> <p class="chatbot-status">En línea</p> </div> <button class="close-chatbot" id="closeChatbotBtn" aria-label="Cerrar chatbot" data-aos="fade-left" data-aos-delay="600"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </button> </div> <div class="chatbot-messages" id="chatbotMessages" data-aos="fade-up" data-aos-delay="700"> <div class="message bot-message"> <div class="message-content"> <p>¡Hola! Soy el asistente virtual de IGNUX LAB. ¿En qué puedo ayudarte hoy?</p> </div> <div class="message-time">Ahora</div> </div> </div> <div class="chatbot-input"> <input type="text" id="chatbotInput" placeholder="Escribe tu mensaje..." maxlength="500"> <button class="send-message" id="sendMessageBtn" aria-label="Enviar mensaje"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </button> </div> </div> </div> ${renderScript($$result, "C:/Users/Hewlett Packard/Desktop/ignuxlab/src/components/FloatingActions.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Hewlett Packard/Desktop/ignuxlab/src/components/FloatingActions.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://ignuxlab.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png" href="/img/favicon.png"><link rel="apple-touch-icon" href="/img/favicon.png"><link rel="shortcut icon" href="/img/favicon.png"><meta name="generator"', "><title>", ' | Ignuxlab</title><!-- AOS CSS --><link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css">', '</head> <body data-astro-cid-sckkx6r4> <!-- Fondo de part\xEDculas en movimiento --> <div class="particles-background" data-astro-cid-sckkx6r4> <div class="particle" data-astro-cid-sckkx6r4></div> <div class="particle" data-astro-cid-sckkx6r4></div> <div class="particle" data-astro-cid-sckkx6r4></div> <div class="particle" data-astro-cid-sckkx6r4></div> <div class="particle" data-astro-cid-sckkx6r4></div> <div class="particle" data-astro-cid-sckkx6r4></div> <div class="particle" data-astro-cid-sckkx6r4></div> <div class="particle" data-astro-cid-sckkx6r4></div> <div class="particle" data-astro-cid-sckkx6r4></div> <div class="particle" data-astro-cid-sckkx6r4></div> <div class="particle" data-astro-cid-sckkx6r4></div> <div class="particle" data-astro-cid-sckkx6r4></div> </div> ', " <!-- Componente de acciones flotantes --> ", ` <!-- AOS JavaScript --> <script src="https://unpkg.com/aos@next/dist/aos.js"><\/script> <script>
			// Use a more reliable approach to initialize AOS after the script has loaded
			document.addEventListener('DOMContentLoaded', function () {
				// Ensure mobile menu functionality is preserved
				setTimeout(function() {
					if (typeof window.AOS !== 'undefined') {
						window.AOS.init({
							duration: 800, // Optimized duration for smooth animations
							easing: 'ease-out-cubic',
							once: true,
							mirror: false,
							offset: 80, // Better offset for professional timing
							delay: 0,
							anchorPlacement: 'top-bottom',
							startEvent: 'DOMContentLoaded',
							useClassNames: false,
							disableMutationObserver: false,
							// Disable AOS on mobile for better performance and functionality
							disable: function() {
								var maxWidth = 768;
								return window.innerWidth < maxWidth;
							}
						});
					}
				}, 150); // Slightly increased delay to ensure stability
			});
			
			// Re-initialize AOS on window resize to handle orientation changes
			window.addEventListener('resize', function() {
				setTimeout(function() {
					if (typeof window.AOS !== 'undefined') {
						window.AOS.refresh();
					}
				}, 300);
			});
		<\/script> </body> </html> `])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]), renderComponent($$result, "FloatingActions", $$FloatingActions, { "data-astro-cid-sckkx6r4": true }));
}, "C:/Users/Hewlett Packard/Desktop/ignuxlab/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
