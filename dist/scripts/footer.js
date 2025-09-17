// Footer functionality - Newsletter y navegación activa
document.addEventListener('DOMContentLoaded', () => {
  // Newsletter functionality
  const newsletterForm = document.getElementById('newsletterForm');
  const successMessage = document.getElementById('successMessage');
  
  if (newsletterForm && successMessage) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const submitBtn = newsletterForm.querySelector('.newsletter-btn');
      
      if (emailInput && submitBtn) {
        const email = emailInput.value.trim();
        
        if (email) {
          const originalText = submitBtn.innerHTML;
          
          // Loading state
          submitBtn.innerHTML = `
            <span class="newsletter-btn-text">Suscribiendo...</span>
            <svg class="newsletter-btn-icon loading" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
            </svg>
          `;
          submitBtn.disabled = true;
          
          // Simulate delay
          setTimeout(() => {
            // Show success message
            successMessage.style.display = 'flex';
            emailInput.value = '';
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
              successMessage.style.display = 'none';
            }, 5000);
            
            // Here you would normally send the data to your backend
          }, 1500);
        }
      }
    });
  }
  
  // Detectar página actual y marcar enlace activo en footer
  function setActiveFooterNavigation() {
    const currentPath = window.location.pathname;
    const currentUrl = window.location.href;
    const footerLinks = document.querySelectorAll('.footer-link');
    
    footerLinks.forEach(link => {
      // Remover clase activa de todos los enlaces primero
      link.classList.remove('footer-link-active');
      
      const linkHref = link.getAttribute('href');
      const linkPage = link.getAttribute('data-page');
      
      let isActive = false;
      
      // Método 1: Comparación directa de href
      if (linkHref && currentPath === linkHref) {
        isActive = true;
      }
      
      // Método 2: Comparación usando data-page para subdirectorios
      if (linkPage && !isActive) {
        const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);
        
        if (linkPage === 'home') {
          // Para inicio: ser más específico para evitar que siempre esté activo
          const isHomePage = (
            currentPath === '/' || 
            currentPath === linkHref ||
            currentPath === '/demo/ignuxlab' ||
            currentPath === '/demo/ignuxlab/' ||
            (linkHref && linkHref !== '/' && currentPath === linkHref)
          );
          
          // Verificar que NO estemos en otras páginas específicas
          const isNotOtherPage = !pathSegments.some(segment => 
            ['about', 'solutions', 'contact'].includes(segment)
          );
          
          if (isHomePage && isNotOtherPage) {
            isActive = true;
          }
        } else {
          // Para otras páginas: verificar si la página está en la ruta
          const lastSegment = pathSegments[pathSegments.length - 1];
          
          if (lastSegment === linkPage || 
              pathSegments.includes(linkPage) ||
              currentPath.endsWith(`/${linkPage}`) ||
              currentPath.includes(`/${linkPage}/`)) {
            isActive = true;
          }
        }
      }
      
      // Método 3: Comparación de URL completa como fallback
      if (!isActive && linkHref) {
        try {
          const fullLinkUrl = linkHref.startsWith('http') ? linkHref : new URL(linkHref, window.location.origin).href;
          const normalizedCurrentUrl = currentUrl.replace(/\/$/, '');
          const normalizedLinkUrl = fullLinkUrl.replace(/\/$/, '');
          const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);
          
          if (normalizedCurrentUrl === normalizedLinkUrl) {
            // Para home, verificar que no estemos en otra página específica
            if (linkPage === 'home') {
              const isNotOtherPage = !pathSegments.some(segment => 
                ['about', 'solutions', 'contact'].includes(segment)
              );
              if (isNotOtherPage) {
                isActive = true;
              }
            } else {
              isActive = true;
            }
          }
        } catch (e) {
          // Error silencioso
        }
      }
      
      if (isActive) {
        link.classList.add('footer-link-active');
      }
    });
  }
  
  // Ejecutar la función
  setActiveFooterNavigation();
});