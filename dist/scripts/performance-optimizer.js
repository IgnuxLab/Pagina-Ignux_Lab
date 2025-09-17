// Performance optimizer para reducir trabajo del main thread
export class PerformanceOptimizer {
  constructor() {
    this.scheduledCallbacks = new Map();
    this.rafId = null;
    this.isRunning = false;
  }

  // Scheduler para agrupar operaciones DOM
  scheduleWork(callback, priority = 'normal') {
    const priorities = {
      high: 1,
      normal: 2,
      low: 3
    };

    const work = {
      callback,
      priority: priorities[priority] || 2,
      id: Math.random().toString(36).substr(2, 9)
    };

    this.scheduledCallbacks.set(work.id, work);
    
    if (!this.isRunning) {
      this.runScheduler();
    }

    return work.id;
  }

  // Ejecutar trabajos programados
  runScheduler() {
    this.isRunning = true;
    
    const processWork = (deadline) => {
      // Ordenar por prioridad
      const sortedWork = Array.from(this.scheduledCallbacks.values())
        .sort((a, b) => a.priority - b.priority);

      while (sortedWork.length > 0 && deadline.timeRemaining() > 0) {
        const work = sortedWork.shift();
        try {
          work.callback();
          this.scheduledCallbacks.delete(work.id);
        } catch (error) {
          console.error('Error executing scheduled work:', error);
        }
      }

      if (this.scheduledCallbacks.size > 0) {
        this.rafId = requestIdleCallback(processWork);
      } else {
        this.isRunning = false;
      }
    };

    this.rafId = requestIdleCallback(processWork);
  }

  // Cancelar trabajo programado
  cancelWork(id) {
    this.scheduledCallbacks.delete(id);
  }

  // Debounce para eventos frecuentes
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle para eventos muy frecuentes
  throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Optimizar animaciones
  optimizeAnimations() {
    // Detectar animaciones costosas y optimizarlas
    const animatedElements = document.querySelectorAll('[class*="animate"], [style*="animation"]');
    
    animatedElements.forEach(element => {
      // Promover a capa de composición
      element.style.willChange = 'transform';
      element.style.transform = 'translateZ(0)';
      element.style.backfaceVisibility = 'hidden';
      
      // Limpiar después de la animación
      element.addEventListener('animationend', () => {
        element.style.willChange = 'auto';
      }, { once: true });
    });
  }

  // Optimizar imágenes dinámicamente
  optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Lazy loading nativo como fallback
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Decode asíncrono para imágenes grandes
      if (img.naturalWidth > 1000 || img.naturalHeight > 1000) {
        img.decoding = 'async';
      }
    });
  }

  // Limpiar recursos no utilizados
  cleanupUnusedResources() {
    // Remover event listeners huérfanos
    const deadElements = document.querySelectorAll('[data-cleanup="true"]');
    deadElements.forEach(element => {
      element.removeEventListener = function() {};
      element.remove();
    });

    // Limpiar timeouts y intervals huérfanos
    const highestTimeoutId = setTimeout(() => {});
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }

    const highestIntervalId = setInterval(() => {});
    for (let i = 0; i < highestIntervalId; i++) {
      clearInterval(i);
    }
    clearInterval(highestIntervalId);
  }

  // Optimizar scroll performance
  optimizeScrollPerformance() {
    let isScrolling = false;
    
    const scrollHandler = this.throttle(() => {
      if (!isScrolling) {
        requestAnimationFrame(() => {
          // Operaciones de scroll optimizadas aquí
          this.scheduleWork(() => {
            // Actualizar elementos visibles
            this.updateVisibleElements();
          }, 'low');
          
          isScrolling = false;
        });
        isScrolling = true;
      }
    }, 16); // 60fps

    window.addEventListener('scroll', scrollHandler, { passive: true });
  }

  // Actualizar solo elementos visibles
  updateVisibleElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, {
      rootMargin: '50px'
    });

    document.querySelectorAll('[data-observe="true"]').forEach(el => {
      observer.observe(el);
    });
  }

  // Inicializar todas las optimizaciones
  init() {
    this.scheduleWork(() => this.optimizeAnimations(), 'high');
    this.scheduleWork(() => this.optimizeImages(), 'normal');
    this.scheduleWork(() => this.optimizeScrollPerformance(), 'normal');
    this.scheduleWork(() => this.cleanupUnusedResources(), 'low');
    

  }
}

// Singleton instance
const performanceOptimizer = new PerformanceOptimizer();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    performanceOptimizer.init();
  });
} else {
  performanceOptimizer.init();
}

export default performanceOptimizer;
