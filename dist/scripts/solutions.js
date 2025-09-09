// Solutions functionality - Contadores ultra-optimizados para móviles
(function() {
  'use strict';
  
  let animationStarted = false;
  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Función de animación optimizada para móviles
  function animateCounters() {
    if (animationStarted) return;
    animationStarted = true;
    
    const counters = document.querySelectorAll('.counter-item');
    
    if (counters.length === 0) {
      setTimeout(animateCounters, 500);
      return;
    }
    
    counters.forEach((counter, index) => {
      const numberElement = counter.querySelector('.counter-number');
      const progressBar = counter.querySelector('.progress-bar');
      
      if (numberElement) {
        // Forzar visibilidad inmediata
        numberElement.style.display = 'inline-block';
        numberElement.style.opacity = '1';
        numberElement.style.visibility = 'visible';
        
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const duration = isMobile ? 1500 : 2000; // Más rápido en móviles
        const startDelay = isMobile ? index * 100 : index * 200; // Delay más corto en móviles
        
        setTimeout(() => {
          // Usar requestAnimationFrame para mejor rendimiento
          let startTime = null;
          let current = 0;
          
          function animateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Usar easing para suavidad
            const easeOut = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(target * easeOut);
            
            numberElement.textContent = current.toString();
            
            if (progress < 1) {
              requestAnimationFrame(animateCounter);
            } else {
              numberElement.textContent = target.toString();
            }
          }
          
          requestAnimationFrame(animateCounter);
          
          // Animar barra de progreso
          if (progressBar) {
            progressBar.style.width = '100%';
            progressBar.style.transition = `width ${duration}ms ease-out`;
          }
        }, startDelay);
      }
    });
  }
  
  // Función de inicialización robusta
  function initCounters() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCounters);
      return;
    }
    
    // Buscar la sección de contadores
    const countersSection = document.querySelector('.counters-section');
    if (!countersSection) {
      setTimeout(initCounters, 200);
      return;
    }
    
    // Para móviles, usar scroll listener más simple
    if (isMobile) {
      let hasAnimated = false;
      
      function checkScroll() {
        const rect = countersSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !hasAnimated) {
          hasAnimated = true;
          animateCounters();
          window.removeEventListener('scroll', checkScroll);
        }
      }
      
      // Verificar inmediatamente
      checkScroll();
      
      // Agregar listener de scroll
      window.addEventListener('scroll', checkScroll, { passive: true });
      
      // Fallback por tiempo
      setTimeout(() => {
        if (!hasAnimated) {
          animateCounters();
        }
      }, 2000);
      
    } else {
      // Para desktop, usar IntersectionObserver
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounters();
              observer.unobserve(entry.target);
            }
          });
        }, { 
          threshold: 0.1,
          rootMargin: '100px'
        });
        
        observer.observe(countersSection);
      } else {
        // Fallback para navegadores antiguos
        setTimeout(animateCounters, 1000);
      }
    }
  }
  
  // Inicializar inmediatamente
  initCounters();
  
  // Fallback de seguridad
  setTimeout(() => {
    if (!animationStarted) {
      animateCounters();
    }
  }, 4000);
})();