// Script específico para contadores en móviles - Máxima compatibilidad
(function() {
  'use strict';
  
  let mobileAnimationStarted = false;
  
  // Función ultra-simple para móviles
  function forceMobileCounters() {
    if (mobileAnimationStarted) return;
    mobileAnimationStarted = true;
    
    const counters = document.querySelectorAll('.counter-item');
    
    counters.forEach((counter, index) => {
      const numberElement = counter.querySelector('.counter-number');
      
      if (numberElement) {
        // Forzar estilos inmediatamente
        numberElement.style.cssText = `
          display: inline-block !important;
          opacity: 1 !important;
          visibility: visible !important;
          font-size: 2.5rem !important;
          font-weight: 800 !important;
          font-family: var(--font-display) !important;
          margin: 0 !important;
          line-height: 1 !important;
          min-height: 1em !important;
        `;
        
        const target = parseInt(counter.getAttribute('data-target') || '0');
        
        // Animación simple y directa
        let current = 0;
        const increment = target / 30; // 30 pasos
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          numberElement.textContent = Math.floor(current).toString();
        }, 50);
      }
    });
  }
  
  // Múltiples estrategias de activación para móviles
  function initMobileCounters() {
    // Estrategia 1: Inmediata
    setTimeout(forceMobileCounters, 100);
    
    // Estrategia 2: Después de scroll
    let scrollCount = 0;
    function onScroll() {
      scrollCount++;
      if (scrollCount > 2) {
        forceMobileCounters();
        window.removeEventListener('scroll', onScroll);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Estrategia 3: Después de touch
    function onTouch() {
      forceMobileCounters();
      document.removeEventListener('touchstart', onTouch);
    }
    document.addEventListener('touchstart', onTouch, { passive: true });
    
    // Estrategia 4: Fallback por tiempo
    setTimeout(forceMobileCounters, 2000);
  }
  
  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileCounters);
  } else {
    initMobileCounters();
  }
  
  // Fallback final
  setTimeout(forceMobileCounters, 5000);
  
})();
