// Contact functionality - Formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('.form-submit');
      
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = `
          <span class="submit-text">Enviando...</span>
          <svg class="submit-icon loading" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
          </svg>
        `;
        submitBtn.disabled = true;
        
        // Simular envío
        setTimeout(() => {
          // Mostrar mensaje de éxito
          contactForm.style.display = 'none';
          formSuccess.style.display = 'block';
          
          // Aquí normalmente enviarías los datos a tu backend
          
          // Reset después de 5 segundos
          setTimeout(() => {
            contactForm.style.display = 'block';
            formSuccess.style.display = 'none';
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 5000);
        }, 2000);
      }
    });
  }
});