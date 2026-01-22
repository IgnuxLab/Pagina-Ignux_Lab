// News functionality
document.addEventListener("DOMContentLoaded", () => {
  // Efectos de hover para las tarjetas de noticias
  function initializeNewsCards() {
    const newsCards = document.querySelectorAll(".news-card");

    newsCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px) scale(1.02)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  // Funcionalidad del video simplificada
  function initializeVideoPlayer() {
    const iframe = document.querySelector("#featuredVideo");
    const videoWrapper = document.querySelector(".video-wrapper");

    if (iframe && videoWrapper) {
      // Agregar efectos de hover al contenedor del video
      videoWrapper.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.02)";
        this.style.transition = "transform 0.3s ease";
      });

      videoWrapper.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
      });

      // Agregar tracking analytics si es necesario
      iframe.addEventListener("load", function () {
        if (typeof gtag !== "undefined") {
          gtag("event", "video_load", {
            event_category: "engagement",
            event_label: "featured_video",
          });
        }
      });
    }
  }

  // Lazy loading mejorado para imágenes
  function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;

            // Agregar efecto de fade-in cuando la imagen se carga
            img.addEventListener("load", () => {
              img.style.opacity = "0";
              img.style.transition = "opacity 0.5s ease";
              setTimeout(() => {
                img.style.opacity = "1";
              }, 100);
            });

            observer.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    }
  }

  // Animaciones de entrada mejoradas
  function initializeEnhancedAnimations() {
    const cards = document.querySelectorAll(".news-card");

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "all 0.6s ease";
      cardObserver.observe(card);
    });
  }

  // Performance optimization
  function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;

    function updateScrollEffects() {
      // Parallax ligero para el fondo
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(
        ".featured-video-section",
      );

      parallaxElements.forEach((element) => {
        const speed = 0.2;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });

      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    });
  }

  // Inicializar todas las funcionalidades
  initializeNewsCards();
  initializeVideoPlayer();
  initializeLazyLoading();
  initializeEnhancedAnimations();
  optimizePerformance();
});

// Agregar estilos dinámicos para la animación del video
const fadeInVideoCSS = `
  @keyframes fadeInVideo {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

// Inyectar estilos si no existen
if (!document.querySelector("#video-animations")) {
  const style = document.createElement("style");
  style.id = "video-animations";
  style.textContent = fadeInVideoCSS;
  document.head.appendChild(style);
}

// Modal de video para noticias (featured y recientes)
(function setupVideoModals() {
  let currentModal = null;
  let currentPlayer = null;

  function openModal(src, videoId = null) {
    // Buscar el modal correspondiente
    let modal, dialog, player;

    if (videoId) {
      // Buscar modal específico por data-video-id
      modal = document.querySelector(
        `.video-modal[data-video-id="${videoId}"]`,
      );
    } else {
      // Modal del featured (sin data-video-id)
      modal =
        document.querySelector("#videoModal") ||
        document.querySelector(".video-modal:not([data-video-id])");
    }

    if (!modal) return;

    // Mover modal al body para evitar issues de stacking/overflow en móviles
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    dialog = modal.querySelector(".video-modal-dialog");
    player = modal.querySelector("video");

    if (!dialog || !player) return;

    // Asegurarse que el modal tenga z-index suficiente para estar por encima del cursor
    modal.style.zIndex = "10000";
    dialog.style.zIndex = "10001";

    currentModal = modal;
    currentPlayer = player;

    // Desactivar temporalmente el cursor personalizado
    document.body.style.cursor = "auto";

    // Ocultar elementos del cursor personalizado
    const cursorElements = document.querySelectorAll(
      ".cursor-dot, .cursor-outline, .cursor-particles",
    );
    cursorElements.forEach((el) => {
      if (el) el.style.opacity = "0";
    });

    // Almacenar el elemento con foco actual para restaurarlo después
    window.previouslyFocusedElement = document.activeElement;

    player.src = src;
    modal.classList.add("is-open");
    player.currentTime = 0;

    // Hacer el contenido de fondo inerte para tecnologías asistivas
    const mainContent = document.querySelector("main") || document.body;
    if (mainContent && mainContent !== modal.parentElement) {
      mainContent.setAttribute("inert", "");
    }

    // Configurar audio del video
    setupVideoAudio(player);

    // Respetar la configuración muted del video
    // Solo en móviles forzar mute inicialmente para autoplay
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    if (isMobile && player.autoplay) {
      player.muted = true;
      player
        .play()
        .then(() => {
          // El usuario puede activar sonido manualmente
        })
        .catch(() => {});
    } else {
      // En desktop, respetar la configuración original
      player.play().catch(() => {});
    }

    document.body.style.overflow = "hidden";

    // Enfocar el botón de cerrar para accesibilidad
    const closeButton = modal.querySelector(".video-modal-close");
    if (closeButton) {
      closeButton.focus();
    }
  }

  function closeModal() {
    if (!currentModal || !currentPlayer) {
      // Intentar cerrar cualquier modal abierto
      const openModal = document.querySelector(".video-modal.is-open");
      if (openModal) {
        const player = openModal.querySelector("video");
        if (player) {
          player.pause();
          player.removeAttribute("src");
          player.load();
        }
        openModal.classList.remove("is-open");
      }
    } else {
      currentPlayer.pause();
      currentPlayer.removeAttribute("src");
      currentPlayer.load();
      currentModal.classList.remove("is-open");
    }

    document.body.style.overflow = "";

    // Remover el atributo inert del contenido de fondo
    const mainContent = document.querySelector("main") || document.body;
    if (mainContent) {
      mainContent.removeAttribute("inert");
    }

    // Reactivar el cursor personalizado con un pequeño retraso para permitir transiciones
    setTimeout(() => {
      document.body.style.cursor = "none";

      // Mostrar elementos del cursor personalizado nuevamente
      const cursorElements = document.querySelectorAll(
        ".cursor-dot, .cursor-outline, .cursor-particles",
      );
      cursorElements.forEach((el) => {
        if (el) el.style.opacity = "";
      });
    }, 300);

    // Restaurar el foco al elemento que lo tenía antes de abrir el modal
    if (
      window.previouslyFocusedElement &&
      typeof window.previouslyFocusedElement.focus === "function"
    ) {
      window.previouslyFocusedElement.focus();
      window.previouslyFocusedElement = null;
    }

    currentModal = null;
    currentPlayer = null;
  }

  // Función para gestionar el estado del audio del video
  function setupVideoAudio(player) {
    if (!player) return;

    // Agregar controles de audio mejorados
    player.addEventListener("loadedmetadata", () => {
      // Asegurar que el video respete la configuración inicial
      const shouldBeMuted =
        player.hasAttribute("muted") &&
        player.getAttribute("muted") !== "false";
      if (!shouldBeMuted) {
        player.muted = false;
      }
    });

    // Permitir que el usuario controle el audio fácilmente
    player.addEventListener("click", (e) => {
      // Si el video está silenciado y el usuario hace clic, activar audio
      if (player.muted && e.target === player) {
        player.muted = false;
        // Mostrar indicador visual temporal de que el audio se activó
        const indicator = document.createElement("div");
        indicator.textContent = "🔊 Audio activado";
        indicator.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.9rem;
          pointer-events: none;
          z-index: 1000;
        `;
        player.parentElement.style.position = "relative";
        player.parentElement.appendChild(indicator);
        setTimeout(() => indicator.remove(), 2000);
      }
    });
  }

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-video]");
    if (openBtn) {
      const src = openBtn.getAttribute("data-video-src");
      if (!src) return;

      // Obtener el video-id del botón si existe
      const videoId = openBtn.getAttribute("data-video-id");

      openModal(src, videoId);
      return;
    }
    const closeBtn = e.target.closest("[data-close-video]");
    if (closeBtn) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const isOpen = document.querySelector(".video-modal.is-open");
      if (isOpen) closeModal();
    }
  });
})();

// Modal de contenido para posts sin video ni Instagram
(function setupContentModal() {
  let currentModal = null;

  function openContentModal(contentId) {
    const modal = document.querySelector(
      `.content-modal[data-content-id="${contentId}"]`,
    );
    if (!modal) {
      return;
    }

    // Mover modal al body si es necesario
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    currentModal = modal;

    // Desactivar temporalmente el cursor personalizado
    document.body.style.cursor = "auto";

    // Ocultar elementos del cursor personalizado
    const cursorElements = document.querySelectorAll(
      ".cursor-dot, .cursor-outline, .cursor-particles",
    );
    cursorElements.forEach((el) => {
      if (el) el.style.opacity = "0";
    });

    // Almacenar el elemento con foco actual
    window.previouslyFocusedContentElement = document.activeElement;

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";

    // Hacer el contenido de fondo inerte
    const mainContent = document.querySelector("main") || document.body;
    if (mainContent && mainContent !== modal.parentElement) {
      mainContent.setAttribute("inert", "");
    }

    // Enfocar el botón de cerrar
    const closeButton = modal.querySelector(".content-modal-close");
    if (closeButton) {
      closeButton.focus();
    }

    // Inicializar carrusel de imágenes si existe
    initImageCarousel(modal);
  }

  function initImageCarousel(modal) {
    const carousel = modal.querySelector(".content-image-carousel");
    if (!carousel) return;

    const slides = carousel.querySelectorAll(".carousel-image-slide");
    const indicators = carousel.querySelectorAll(".carousel-indicator-image");
    const prevBtn = carousel.querySelector(".carousel-prev-image");
    const nextBtn = carousel.querySelector(".carousel-next-image");

    if (slides.length <= 1) return;

    let currentSlide = 0;

    function showSlide(index) {
      // Asegurar que el índice esté dentro del rango
      if (index < 0) {
        currentSlide = slides.length - 1;
      } else if (index >= slides.length) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      // Ocultar todas las slides
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (indicators[i]) {
          indicators[i].classList.remove("active");
        }
      });

      // Mostrar la slide actual
      if (slides[currentSlide]) {
        slides[currentSlide].classList.add("active");
        if (indicators[currentSlide]) {
          indicators[currentSlide].classList.add("active");
        }
      }
    }

    // Event listeners para botones
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showSlide(currentSlide - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showSlide(currentSlide + 1);
      });
    }

    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        showSlide(index);
      });
    });

    // Inicializar en la primera imagen
    showSlide(0);
  }

  function closeContentModal() {
    if (!currentModal) {
      // Intentar cerrar cualquier modal abierto
      const openModal = document.querySelector(".content-modal.is-open");
      if (openModal) {
        openModal.classList.remove("is-open");
      }
    } else {
      currentModal.classList.remove("is-open");
    }

    document.body.style.overflow = "";

    // Remover el atributo inert del contenido de fondo
    const mainContent = document.querySelector("main") || document.body;
    if (mainContent) {
      mainContent.removeAttribute("inert");
    }

    // Reactivar el cursor personalizado
    setTimeout(() => {
      document.body.style.cursor = "none";

      const cursorElements = document.querySelectorAll(
        ".cursor-dot, .cursor-outline, .cursor-particles",
      );
      cursorElements.forEach((el) => {
        if (el) el.style.opacity = "";
      });
    }, 300);

    // Restaurar el foco
    if (
      window.previouslyFocusedContentElement &&
      typeof window.previouslyFocusedContentElement.focus === "function"
    ) {
      window.previouslyFocusedContentElement.focus();
      window.previouslyFocusedContentElement = null;
    }

    currentModal = null;
  }

  // Listener directo en document para cerrar modales (funciona aunque el modal esté en body)
  document.addEventListener("click", (e) => {
    const closeBtn = e.target.closest("[data-close-content]");
    if (closeBtn) {
      e.preventDefault();
      e.stopPropagation();
      closeContentModal();
      return;
    }
  });

  // Asegurar que el event listener se registre después de que el DOM esté listo
  function initContentModalListeners() {
    // Usar delegación de eventos en el contenedor de noticias
    const newsContainer = document.querySelector(".news-grid") || document.body;

    const clickHandler = (e) => {
      // Buscar el elemento con data-open-content (puede ser el div news-image o un hijo)
      const openBtn = e.target.closest("[data-open-content]");
      if (openBtn) {
        e.preventDefault();
        e.stopPropagation();
        const contentId = openBtn.getAttribute("data-content-id");
        if (contentId) {
          openContentModal(contentId);
        }
        return false;
      }
    };

    newsContainer.addEventListener("click", clickHandler, true);

    // También agregar listeners directos a los elementos con data-open-content
    setTimeout(() => {
      document.querySelectorAll("[data-open-content]").forEach((element) => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const contentId = element.getAttribute("data-content-id");
          if (contentId) {
            openContentModal(contentId);
          }
          return false;
        });
      });
    }, 100);
  }

  // Inicializar cuando el DOM esté listo
  function initModal() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(initContentModalListeners, 200);
      });
    } else {
      // Si el DOM ya está listo, ejecutar después de un pequeño delay
      setTimeout(initContentModalListeners, 200);
    }
  }

  initModal();

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const isOpen = document.querySelector(".content-modal.is-open");
      if (isOpen) closeContentModal();
    }
  });
})();
