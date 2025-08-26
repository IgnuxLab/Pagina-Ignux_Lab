# Guía de Deployment - IgnuxLab

## 🚀 Configuración Multi-Entorno

Este proyecto está configurado para funcionar tanto en **desarrollo local** como en **producción** con diferentes rutas base.

### 📁 Estructura de Entornos

| Entorno | Base Path | URL de Acceso |
|---------|-----------|---------------|
| **Desarrollo** | `/` | `http://localhost:4325/` |
| **Producción** | `/demo/ignuxlab/` | `https://ignuxlab.com/demo/ignuxlab/` |

## 🛠️ Comandos Disponibles

### Desarrollo Local
```bash
# Iniciar servidor de desarrollo
npm run dev

# El sitio estará disponible en: http://localhost:4325/
```

### Build de Producción
```bash
# Crear build optimizado para producción
npm run build

# Los archivos se generan en la carpeta ./dist/
```

### Preview de Producción (Local)
```bash
# Previsualizar el build de producción localmente
npm run preview:prod

# Simula el entorno de producción con el base path correcto
```

## ⚙️ Configuración Técnica

### astro.config.mjs
```javascript
export default defineConfig({
  // Base path condicional según el entorno
  base: process.env.NODE_ENV === 'production' ? '/demo/ignuxlab/' : '/',
  // ... resto de configuración
});
```

### Rutas de Assets
Los componentes usan `import.meta.env.BASE_URL` para rutas dinámicas:

```javascript
// ✅ Correcto - Se adapta automáticamente al entorno
<img src={`${import.meta.env.BASE_URL}img/logo.webp`} alt="Logo">

// ❌ Incorrecto - Ruta fija
<img src="/img/logo.webp" alt="Logo">
```

## 📦 Deployment

### 1. Generar Build
```bash
npm run build
```

### 2. Subir Archivos
Subir el contenido de la carpeta `./dist/` al servidor en la ruta:
```
/demo/ignuxlab/
```

### 3. Verificar
El sitio estará disponible en:
```
https://ignuxlab.com/demo/ignuxlab/
```

## ✅ Verificación

### En Desarrollo
- ✅ Todas las páginas cargan: `/`, `/about`, `/solutions`, `/contact`
- ✅ Imágenes y videos se muestran correctamente
- ✅ CSS y JavaScript funcionan
- ✅ Navegación entre páginas operativa

### En Producción
- ✅ CSS con rutas `/demo/ignuxlab/_astro/*.css`
- ✅ Imágenes con rutas `/demo/ignuxlab/img/*`
- ✅ Videos con rutas `/demo/ignuxlab/videos/*`
- ✅ Sin errores 404 en assets

## 🔧 Troubleshooting

### Si hay errores 404 en assets:
1. Verificar que `base` en `astro.config.mjs` coincida con la ruta del servidor
2. Confirmar que todos los componentes usan `import.meta.env.BASE_URL`
3. Ejecutar `npm run build` después de cambios en configuración

### Para probar producción localmente:
```bash
npm run build
npm run preview:prod
```

## 📂 Estructura de Archivos

```
dist/
├── _astro/                 # CSS y JS optimizados
├── img/                   # Imágenes estáticas
│   ├── logo.webp
│   ├── soluciones.webp
│   └── clientes/          # Logos de clientes
├── videos/                # Videos
│   └── hero.mp4
├── about/index.html       # Página sobre nosotros
├── solutions/index.html   # Página soluciones
├── contact/index.html     # Página contacto
├── index.html            # Página principal
└── favicon.svg           # Icono del sitio
```
