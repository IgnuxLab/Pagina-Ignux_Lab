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
  
  // Inicializar funcionalidades
  initializeNewsCards();
});