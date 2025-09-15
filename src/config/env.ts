/**
 * Configuración de variables de entorno
 * Maneja las variables de entorno de forma segura y centralizada
 */

interface EnvConfig {
  resendApiKey: string;
  contactEmail: string;
  fromEmail: string;
  nodeEnv: string;
}

/**
 * Obtiene la configuración de variables de entorno
 * @returns Configuración de variables de entorno
 */
export function getEnvConfig(): EnvConfig {
  // Obtener variables de entorno con valores por defecto
  const resendApiKey = import.meta.env.RESEND_API_KEY || 're_YJUTY3Lo_3XCrkHrudzycYPbnGzJSkYjd';
  const contactEmail = import.meta.env.CONTACT_EMAIL || 'programador3@ainteractivo.com';
  const fromEmail = import.meta.env.FROM_EMAIL || 'noreply@ignuxlab.com';
  const nodeEnv = import.meta.env.NODE_ENV || 'development';

  // Log para debugging (solo en desarrollo)
  if (nodeEnv === 'development') {
    console.log('Configuración de entorno cargada:', {
      resendApiKey: resendApiKey ? '***configurada***' : 'NO CONFIGURADA',
      contactEmail,
      fromEmail,
      nodeEnv
    });
  }

  // Validar que las variables críticas estén presentes
  if (!resendApiKey) {
    console.error('RESEND_API_KEY no está configurada');
    throw new Error('RESEND_API_KEY no está configurada');
  }

  if (!contactEmail) {
    console.error('CONTACT_EMAIL no está configurada');
    throw new Error('CONTACT_EMAIL no está configurada');
  }

  return {
    resendApiKey,
    contactEmail,
    fromEmail,
    nodeEnv
  };
}

/**
 * Valida si estamos en modo de desarrollo
 * @returns true si estamos en desarrollo
 */
export function isDevelopment(): boolean {
  return getEnvConfig().nodeEnv === 'development';
}

/**
 * Valida si estamos en modo de producción
 * @returns true si estamos en producción
 */
export function isProduction(): boolean {
  return getEnvConfig().nodeEnv === 'production';
}
