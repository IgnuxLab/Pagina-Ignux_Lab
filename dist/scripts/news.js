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
  
  console.log('🎬 Sistema de noticias con video mejorado inicializado correctamente');
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