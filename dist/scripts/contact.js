// Contact functionality - Formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (!contactForm || !formSuccess) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.form-submit');
    if (!submitBtn) return;

    const originalText = submitBtn.innerHTML;
    
    // Estado de carga
    submitBtn.innerHTML = `
      <span class="submit-text">Enviando...</span>
      <svg class="submit-icon loading" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
      </svg>
    `;
    submitBtn.disabled = true;

    try {
      // Recopilar datos del formulario
      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());

      // Enviar al endpoint externo
      const response = await fetch('https://ignuxlab-api.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error ${response.status}: ${response.statusText}`);
      }

      if (!data.ok) {
        throw new Error(data.error || 'Error desconocido al enviar el mensaje');
      }

      // Mostrar mensaje de éxito
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';

      // Scroll hacia el mensaje de éxito
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Reset después de 5 segundos
      setTimeout(() => {
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
        contactForm.reset();
        
        // Scroll de vuelta al formulario
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 5000);

    } catch (error) {
      console.error('Error al enviar formulario:', error);
      
      // Mostrar mensaje de error al usuario
      let errorMessage = 'No se pudo enviar tu mensaje. ';
      
      if (error.message.includes('fetch')) {
        errorMessage += 'Verifica tu conexión a internet y intenta nuevamente.';
      } else if (error.message.includes('400')) {
        errorMessage += 'Por favor revisa que todos los campos estén completos correctamente.';
      } else if (error.message.includes('500') || error.message.includes('502')) {
        errorMessage += 'Problema temporal del servidor. Intenta nuevamente en unos minutos.';
      } else {
        errorMessage += 'Intenta nuevamente o contáctanos directamente.';
      }
      
      alert(errorMessage);
      
    } finally {
      // Restaurar botón
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
});