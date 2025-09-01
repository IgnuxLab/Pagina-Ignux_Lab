document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.getElementById('heroVideo');
    let hasPlayed = false;
    
    if (heroVideo) {
        // Configurar el video para mostrar el frame del segundo 12
        heroVideo.addEventListener('loadedmetadata', function() {
            if (!hasPlayed) {
                heroVideo.currentTime = 12;
            }
        });
        
        // Cuando el usuario hace clic en play, iniciar desde el principio
        heroVideo.addEventListener('play', function() {
            if (!hasPlayed) {
                heroVideo.currentTime = 0;
                hasPlayed = true;
            }
        });
        
        // Reset cuando el video termina o se pausa por mucho tiempo
        heroVideo.addEventListener('ended', function() {
            hasPlayed = false;
            setTimeout(() => {
                if (heroVideo.paused) {
                    heroVideo.currentTime = 12;
                }
            }, 1000);
        });
        
        // Si el video se pausa y regresa al inicio, resetear
        heroVideo.addEventListener('pause', function() {
            setTimeout(() => {
                if (heroVideo.currentTime === 0 && !hasPlayed) {
                    heroVideo.currentTime = 12;
                }
            }, 500);
        });
    }
});
