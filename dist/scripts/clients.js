// Clients functionality - Carrusel infinito de clientes
document.addEventListener('DOMContentLoaded', function() {
  // Verificar que el carrusel esté cargado correctamente
  const track = document.getElementById('carouselTrack');
  if (track) {
    
    // Opcional: Pausar animación al hover (si se desea)
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }
});