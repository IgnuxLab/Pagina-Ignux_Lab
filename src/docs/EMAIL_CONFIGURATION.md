# Configuración del Sistema de Correos - IgnuxLab

## Descripción General

El sistema de correos de IgnuxLab utiliza **Resend API** para el envío de correos electrónicos desde el formulario de contacto. Los correos se envían a `programador3@ainteractivo.com` y están configurados para funcionar tanto en desarrollo como en producción.

## Arquitectura

### Componentes Principales

1. **API Endpoint**: `src/pages/api/contact.ts`
   - Maneja las peticiones POST del formulario
   - Valida los datos del formulario
   - Envía correos usando Resend API
   - Retorna respuestas JSON estructuradas

2. **Configuración de Entorno**: `src/config/env.ts`
   - Centraliza la gestión de variables de entorno
   - Valida la presencia de variables críticas
   - Proporciona funciones de utilidad para el entorno

3. **Frontend**: `public/scripts/contact.js`
   - Maneja la interacción del formulario
   - Envía datos al endpoint API
   - Muestra estados de carga y mensajes de error/éxito

## Configuración de Variables de Entorno

### Variables Requeridas

```env
RESEND_API_KEY=re_YJUTY3Lo_3XCrkHrudzycYPbnGzJSkYjd
CONTACT_EMAIL=programador3@ainteractivo.com
FROM_EMAIL=noreply@ignuxlab.com
NODE_ENV=production
```

### Configuración en Producción

Las variables están configuradas en `astro.config.mjs` para producción:

```javascript
vite: {
  define: {
    'import.meta.env.RESEND_API_KEY': JSON.stringify('re_YJUTY3Lo_3XCrkHrudzycYPbnGzJSkYjd'),
    'import.meta.env.CONTACT_EMAIL': JSON.stringify('programador3@ainteractivo.com'),
    'import.meta.env.FROM_EMAIL': JSON.stringify('noreply@ignuxlab.com'),
    'import.meta.env.NODE_ENV': JSON.stringify('production')
  }
}
```

## Flujo de Funcionamiento

### 1. Usuario Completa el Formulario
- El usuario llena el formulario en `/contact`
- Los campos requeridos son: nombre, apellido, email, mensaje
- Los campos opcionales son: teléfono, empresa

### 2. Validación Frontend
- JavaScript valida los campos básicos
- Muestra estado de carga durante el envío
- Maneja errores de conexión

### 3. Envío al Endpoint API
- POST request a `/api/contact`
- Datos enviados como FormData
- Headers apropiados para JSON

### 4. Validación Backend
- Validación exhaustiva de datos
- Verificación de formato de email
- Validación de campos requeridos

### 5. Envío de Correo
- Uso de Resend API para envío
- Correo HTML y texto plano
- Reply-to configurado con el email del usuario

### 6. Respuesta al Usuario
- Mensaje de éxito o error
- Reset automático del formulario
- Manejo de errores específicos

## Estructura del Correo

### Asunto
```
Nuevo mensaje de contacto de [Nombre] [Apellido]
```

### Contenido HTML
- Diseño responsive y profesional
- Información del contacto estructurada
- Timestamp en zona horaria de Colombia
- Branding de IgnuxLab

### Contenido de Texto Plano
- Versión simplificada para clientes de email básicos
- Misma información que la versión HTML

## Manejo de Errores

### Errores de Validación (400)
- Campos requeridos faltantes
- Formato de email inválido
- Formato de teléfono inválido

### Errores de API (500)
- Problemas con Resend API
- Errores de configuración
- Errores internos del servidor

### Errores de Conexión
- Timeouts de red
- Problemas de conectividad
- Errores de CORS

## Seguridad

### Validación de Datos
- Sanitización de inputs
- Validación de tipos de datos
- Límites de longitud de campos

### Rate Limiting
- Implementado a nivel de servidor
- Prevención de spam
- Protección contra ataques

### CORS
- Configuración apropiada para el dominio
- Headers de seguridad
- Métodos permitidos

## Monitoreo y Logs

### Logs de Aplicación
- Errores de envío de correos
- Errores de validación
- Errores de API

### Métricas de Resend
- Tasa de entrega
- Bounces y errores
- Estadísticas de envío

## Testing

### Pruebas Locales
1. Ejecutar `npm run dev`
2. Navegar a `/contact`
3. Completar formulario de prueba
4. Verificar envío de correo

### Pruebas de Producción
1. Desplegar a https://ignuxlab.com/
2. Probar formulario en producción
3. Verificar recepción en programador3@ainteractivo.com

## Mantenimiento

### Actualización de API Key
1. Obtener nueva API key de Resend
2. Actualizar en `astro.config.mjs`
3. Redesplegar aplicación

### Cambio de Email de Destino
1. Actualizar `CONTACT_EMAIL` en configuración
2. Verificar configuración de Resend
3. Redesplegar aplicación

### Monitoreo de Errores
1. Revisar logs de aplicación
2. Verificar métricas de Resend
3. Monitorear tasa de entrega

## Troubleshooting

### Problemas Comunes

1. **Correos no llegan**
   - Verificar API key de Resend
   - Revisar configuración de dominio
   - Verificar spam folder

2. **Errores de validación**
   - Revisar formato de datos
   - Verificar campos requeridos
   - Comprobar validación frontend/backend

3. **Errores de CORS**
   - Verificar configuración de headers
   - Comprobar dominio de origen
   - Revisar configuración de servidor

### Contacto de Soporte
- Email: programador3@ainteractivo.com
- Documentación: Este archivo
- Logs: Consola del servidor
