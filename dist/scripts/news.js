// News functionality
document.addEventListener('DOMContentLoaded', () => {
  
  // Efectos de hover para las tarjetas de noticias
  function initializeNewsCards() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }
  
  // Funcionalidad del video simplificada
  function initializeVideoPlayer() {
    const iframe = document.querySelector('#featuredVideo');
    const videoWrapper = document.querySelector('.video-wrapper');
    
    if (iframe && videoWrapper) {
      // Agregar efectos de hover al contenedor del video
      videoWrapper.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
      });
      
      videoWrapper.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
      
      // Agregar tracking analytics si es necesario
      iframe.addEventListener('load', function() {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'video_load', {
            'event_category': 'engagement',
            'event_label': 'featured_video'
          });
        }
      });
    }
  }
  
  // Lazy loading mejorado para imágenes
  function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Agregar efecto de fade-in cuando la imagen se carga
            img.addEventListener('load', () => {
              img.style.opacity = '0';
              img.style.transition = 'opacity 0.5s ease';
              setTimeout(() => {
                img.style.opacity = '1';
              }, 100);
            });
            
            observer.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }
  
  // Animaciones de entrada mejoradas
  function initializeEnhancedAnimations() {
    const cards = document.querySelectorAll('.news-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease';
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
      const parallaxElements = document.querySelectorAll('.featured-video-section');
      
      parallaxElements.forEach(element => {
        const speed = 0.2;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
      
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
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
if (!document.querySelector('#video-animations')) {
  const style = document.createElement('style');
  style.id = 'video-animations';
  style.textContent = fadeInVideoCSS;
  document.head.appendChild(style);
}

// Modal de video para noticia destacada
(function setupFeaturedVideoModal(){
  let modal, dialog, player;
  function openModal(src){
    if(!modal){
      modal = document.querySelector('#videoModal');
      // mover modal al body para evitar issues de stacking/overflow en móviles
      if(modal && modal.parentElement !== document.body){
        document.body.appendChild(modal);
      }
      dialog = modal && modal.querySelector('.video-modal-dialog');
      player = modal && modal.querySelector('#videoModalPlayer');
    }
    if(!modal || !dialog || !player) return;
    player.src = src;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    player.currentTime = 0;
    
    // Configurar audio del video
    setupVideoAudio();
    
    // Respetar la configuración muted del video (por defecto está configurado como false en el HTML)
    // Solo en móviles forzar mute inicialmente para autoplay
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if(isMobile && player.autoplay) {
      player.muted = true;
      player.play().then(()=>{
        // El usuario puede activar sonido manualmente
      }).catch(()=>{});
    } else {
      // En desktop, respetar la configuración original
      player.play().catch(()=>{});
    }
    
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    if(!modal || !player) return;
    player.pause();
    player.removeAttribute('src');
    player.load();
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Función para gestionar el estado del audio del video
  function setupVideoAudio() {
    if(!player) return;
    
    // Agregar controles de audio mejorados
    player.addEventListener('loadedmetadata', () => {
      // Asegurar que el video respete la configuración inicial
      const shouldBeMuted = player.hasAttribute('muted') && player.getAttribute('muted') !== 'false';
      if(!shouldBeMuted) {
        player.muted = false;
      }
    });

    // Permitir que el usuario controle el audio fácilmente
    player.addEventListener('click', (e) => {
      // Si el video está silenciado y el usuario hace clic, activar audio
      if(player.muted && e.target === player) {
        player.muted = false;
        // Mostrar indicador visual temporal de que el audio se activó
        const indicator = document.createElement('div');
        indicator.textContent = '🔊 Audio activado';
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
        player.parentElement.style.position = 'relative';
        player.parentElement.appendChild(indicator);
        setTimeout(() => indicator.remove(), 2000);
      }
    });
  }

  document.addEventListener('click', (e)=>{
    const openBtn = e.target.closest('[data-open-video]');
    if(openBtn){
      const src = openBtn.getAttribute('data-video-src');
      if(src) openModal(src);
      return;
    }
    const closeBtn = e.target.closest('[data-close-video]');
    if(closeBtn){
      closeModal();
    }
  });

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      const isOpen = document.querySelector('#videoModal.is-open');
      if(isOpen) closeModal();
    }
  });
})();