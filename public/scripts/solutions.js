// Solutions functionality - Animación de contadores
document.addEventListener('DOMContentLoaded', () => {
  // Función para animar los contadores
  function animateCounters() {
    const counters = document.querySelectorAll('.counter-item');
    
    counters.forEach(counter => {
      const numberElement = counter.querySelector('.counter-number');
      const progressBar = counter.querySelector('.progress-bar');
      
      if (numberElement && progressBar) {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          numberElement.textContent = Math.floor(current).toString();
        }, 16);
        
        // Animar la barra de progreso
        progressBar.style.width = '100%';
      }
    });
  }
  
  // Observador de intersección para activar la animación cuando sea visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  // Observar la sección de contadores
  const countersSection = document.querySelector('.counters-section');
  if (countersSection) {
    observer.observe(countersSection);
  }
});