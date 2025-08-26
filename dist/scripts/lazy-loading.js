// Lazy loading enhancement for better performance
export function initializeLazyLoading() {
  // Enhanced intersection observer for images
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Create a new image to handle loading
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
          // Image has loaded successfully
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          img.removeAttribute('data-src');
        };
        
        imageLoader.onerror = () => {
          // Handle image loading error
          img.classList.add('error');
          console.warn('Failed to load image:', img.dataset.src || img.src);
        };
        
        // Start loading the image
        imageLoader.src = img.dataset.src || img.src;
        
        // Stop observing this image
        observer.unobserve(img);
      }
    });
  }, {
    // Load images when they're 100px away from viewport
    rootMargin: '100px 0px',
    threshold: 0.01
  });

  // Observe all lazy loading images
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });

  // Preload critical images immediately
  const criticalImages = document.querySelectorAll('img[data-critical="true"]');
  criticalImages.forEach(img => {
    const imageLoader = new Image();
    imageLoader.src = img.src;
  });
}

// Optimize video loading
export function optimizeVideoLoading() {
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    // Only load video when it's about to be visible
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Load video
          if (video.preload !== 'auto') {
            video.preload = 'metadata';
            video.load();
          }
          videoObserver.unobserve(video);
        }
      });
    }, {
      rootMargin: '200px 0px'
    });
    
    videoObserver.observe(video);
  });
}

// Debounced resize handler for better performance
export function optimizeResizeHandlers() {
  let resizeTimeout;
  
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Handle resize events with debouncing
      window.dispatchEvent(new CustomEvent('optimizedResize'));
    }, 250);
  };
  
  window.addEventListener('resize', handleResize, { passive: true });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  initializeLazyLoading();
  optimizeVideoLoading();
  optimizeResizeHandlers();
  
  // Mark page as loaded for performance measurement
  window.addEventListener('load', () => {
    performance.mark('page-fully-loaded');
    
    // Optional: Report performance metrics
    if (typeof performance.getEntriesByType === 'function') {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paintEntries = performance.getEntriesByType('paint');
      
      // Performance metrics are being tracked silently
    }
  });
});
