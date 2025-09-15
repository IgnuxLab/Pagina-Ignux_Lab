/**
 * Funcionalidad del formulario de contacto
 * Maneja el envío de correos electrónicos usando la API de Resend
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.innerHTML;
      
      try {
        // Estado de carga
        setLoadingState(submitBtn, true);
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        
        // Enviar datos al endpoint API
        const response = await fetch('/api/contact-working', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          // Mostrar mensaje de éxito
          showSuccessMessage(contactForm, formSuccess);
          
          // Resetear formulario después de 5 segundos
          setTimeout(() => {
            resetForm(contactForm, formSuccess, submitBtn, originalText);
          }, 5000);
          
        } else {
          // Mostrar error
          showErrorMessage(submitBtn, result.error || 'Error al enviar el mensaje');
          setLoadingState(submitBtn, false, originalText);
        }
        
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        showErrorMessage(submitBtn, 'Error de conexión. Inténtalo de nuevo.');
        setLoadingState(submitBtn, false, originalText);
      }
    });
  }
});

/**
 * Establece el estado de carga del botón
 * @param {HTMLElement} submitBtn - Botón de envío
 * @param {boolean} isLoading - Si está cargando
 * @param {string} originalText - Texto original del botón
 */
function setLoadingState(submitBtn, isLoading, originalText = null) {
  if (isLoading) {
    submitBtn.innerHTML = `
      <span class="submit-text">Enviando...</span>
      <svg class="submit-icon loading" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
      </svg>
    `;
    submitBtn.disabled = true;
  } else {
    submitBtn.innerHTML = originalText || submitBtn.innerHTML;
    submitBtn.disabled = false;
  }
}

/**
 * Muestra el mensaje de éxito
 * @param {HTMLElement} contactForm - Formulario de contacto
 * @param {HTMLElement} formSuccess - Elemento de mensaje de éxito
 */
function showSuccessMessage(contactForm, formSuccess) {
  contactForm.style.display = 'none';
  formSuccess.style.display = 'block';
  
  // Scroll suave al mensaje de éxito
  formSuccess.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'center' 
  });
}

/**
 * Muestra un mensaje de error
 * @param {HTMLElement} submitBtn - Botón de envío
 * @param {string} message - Mensaje de error
 */
function showErrorMessage(submitBtn, message) {
  // Crear o actualizar elemento de error
  let errorElement = document.getElementById('formError');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = 'formError';
    errorElement.className = 'form-error';
    errorElement.style.cssText = `
      background: #f8d7da;
      color: #721c24;
      padding: 12px 16px;
      border-radius: 4px;
      border: 1px solid #f5c6cb;
      margin-top: 16px;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    
    const form = submitBtn.closest('form');
    form.appendChild(errorElement);
  }
  
  errorElement.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px; flex-shrink: 0;">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
    <span>${message}</span>
  `;
  
  // Scroll al error
  errorElement.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'center' 
  });
  
  // Remover error después de 5 segundos
  setTimeout(() => {
    if (errorElement && errorElement.parentNode) {
      errorElement.parentNode.removeChild(errorElement);
    }
  }, 5000);
}

/**
 * Resetea el formulario a su estado inicial
 * @param {HTMLElement} contactForm - Formulario de contacto
 * @param {HTMLElement} formSuccess - Elemento de mensaje de éxito
 * @param {HTMLElement} submitBtn - Botón de envío
 * @param {string} originalText - Texto original del botón
 */
function resetForm(contactForm, formSuccess, submitBtn, originalText) {
  contactForm.style.display = 'block';
  formSuccess.style.display = 'none';
  contactForm.reset();
  submitBtn.innerHTML = originalText;
  submitBtn.disabled = false;
  
  // Remover cualquier mensaje de error
  const errorElement = document.getElementById('formError');
  if (errorElement && errorElement.parentNode) {
    errorElement.parentNode.removeChild(errorElement);
  }
}