// Header functionality - Menu hamburguesa y navegación activa
document.addEventListener('DOMContentLoaded', () => {
  // Funcionalidad del menú hamburguesa
  const menuToggle = document.getElementById('menuToggle');
  const navigation = document.getElementById('navigation');
  
  if (!menuToggle || !navigation) return;
  
  // Function to close menu
  function closeMenu() {
    navigation.classList.remove('nav-open');
    menuToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
  
  // Function to open menu
  function openMenu() {
    navigation.classList.add('nav-open');
    menuToggle.classList.add('active');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
  
  // Toggle del menú
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigation.classList.contains('nav-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  // Cerrar menú al hacer click en un enlace
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
  
  // Cerrar menú al hacer click fuera de él
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (navigation.classList.contains('nav-open') && 
        target && 
        !navigation.contains(target) && 
        !menuToggle.contains(target)) {
      closeMenu();
    }
  });
  
  // Cerrar menú con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navigation.classList.contains('nav-open')) {
      closeMenu();
    }
  });
  
  // Close menu on window resize to prevent issues
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navigation.classList.contains('nav-open')) {
      closeMenu();
    }
  });

  // Detectar página actual y marcar enlace activo en header
  function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentUrl = window.location.href;
    
    console.log('Detectando navegación activa:', {
      currentPath,
      currentUrl
    });
    
    navLinks.forEach(link => {
      // Remover clase activa de todos los enlaces primero
      link.classList.remove('nav-link-active');
      
      const linkHref = link.getAttribute('href');
      const linkPage = link.getAttribute('data-page');
      
      console.log(`Verificando enlace: ${linkPage}`, {
        linkHref,
        linkPage
      });
      
      let isActive = false;
      
      // Extraer la base path de la URL actual para manejar subdirectorios
      const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);
      const basePath = linkHref && linkHref !== '/' ? linkHref.split('/').filter(segment => segment.length > 0) : [];
      
      // Método 1: Comparación directa de href con path actual
      if (linkHref && currentPath === linkHref) {
        isActive = true;
        console.log(`✅ Método 1 - Coincidencia exacta: ${linkPage}`);
      }
      
      // Método 2: Comparación usando data-page - más robusta para subdirectorios
      if (linkPage && !isActive) {
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
            console.log(`✅ Método 2a - Página inicio: ${linkPage}`);
          }
        } else {
          // Para otras páginas: verificar si el último segmento coincide con la página
          const lastSegment = pathSegments[pathSegments.length - 1];
          if (lastSegment === linkPage || 
              pathSegments.includes(linkPage) ||
              currentPath.endsWith(`/${linkPage}`) ||
              currentPath.includes(`/${linkPage}/`)) {
            isActive = true;
            console.log(`✅ Método 2b - Página específica: ${linkPage}`);
          }
        }
      }
      
      // Método 3: Comparación basada en la estructura de la URL completa
      if (!isActive && linkHref) {
        try {
          const fullLinkUrl = linkHref.startsWith('http') ? linkHref : new URL(linkHref, window.location.origin).href;
          const normalizedCurrentUrl = currentUrl.replace(/\/$/, '');
          const normalizedLinkUrl = fullLinkUrl.replace(/\/$/, '');
          
          if (normalizedCurrentUrl === normalizedLinkUrl) {
            // Para home, verificar que no estemos en otra página específica
            if (linkPage === 'home') {
              const isNotOtherPage = !pathSegments.some(segment => 
                ['about', 'solutions', 'contact'].includes(segment)
              );
              if (isNotOtherPage) {
                isActive = true;
                console.log(`✅ Método 3 - URL completa home: ${linkPage}`);
              }
            } else {
              isActive = true;
              console.log(`✅ Método 3 - URL completa: ${linkPage}`);
            }
          }
        } catch (e) {
          console.log('Error en comparación de URL completa:', e);
        }
      }
      
      if (isActive) {
        link.classList.add('nav-link-active');
        console.log(`🎯 Enlace activo final: ${linkPage || linkHref}`);
      }
    });
  }
  
  // Ejecutar al cargar la página
  setActiveNavigation();
  
  // También ejecutar cuando cambie la URL (para SPAs)
  window.addEventListener('popstate', setActiveNavigation);
});