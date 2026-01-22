# Guía de Deployment - IgnuxLab

## 🚀 Configuración de Producción

Este proyecto está configurado para funcionar en **desarrollo local** y en **producción** en el dominio raíz.

### 📁 Estructura de Entornos

| Entorno | Base Path | URL de Acceso |
|---------|-----------|---------------|
| **Desarrollo** | `/` | `http://localhost:3000/` |
| **Producción** | `/` | `https://ignuxlab.com/` |

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
  // Base path para producción en el dominio raíz
  base: '/',
  site: 'https://ignuxlab.com',
  // ... resto de configuración
});
```

### Organización de Archivos en Servidor
Los archivos se organizan en una carpeta `ignuxlab/` dentro de `public_html/`, pero el sitio funciona en la raíz del dominio gracias a la configuración de `.htaccess`.

## 📦 Deployment en cPanel

### 1. Generar Build
```bash
npm run build
```

### 2. Subir Archivos al Servidor

#### Paso 2.1: Subir contenido de `dist/` a carpeta `ignuxlab/`
- Subir **todo el contenido** de la carpeta `./dist/` a `public_html/ignuxlab/`
- Esto incluye: `index.html`, `_astro/`, `img/`, `scripts/`, `videos/`, etc.

#### Paso 2.2: Subir `.htaccess` a la carpeta `ignuxlab/`
- Copiar el archivo `public/.htaccess` a `public_html/ignuxlab/.htaccess`

#### Paso 2.3: Subir `.htaccess` a la raíz de `public_html`
- Copiar el archivo `.htaccess.public_html` a `public_html/.htaccess`
- Este archivo redirige todo el tráfico de la raíz a la carpeta `ignuxlab/`

### 3. Estructura Final en cPanel
```
public_html/
├── .htaccess              ← Redirige a /ignuxlab/ (desde .htaccess.public_html)
├── ignuxlab/              ← Carpeta con tu sitio
│   ├── .htaccess          ← Configuración del sitio (desde public/.htaccess)
│   ├── index.html
│   ├── _astro/
│   ├── img/
│   ├── scripts/
│   ├── videos/
│   └── ...
└── (otros archivos/carpetas)
```

### 4. Verificar
El sitio estará disponible en:
```
https://ignuxlab.com/
```

**Nota:** Aunque los archivos están en `public_html/ignuxlab/`, el sitio funciona en la raíz del dominio gracias a la configuración de `.htaccess`.

## ✅ Verificación

### En Desarrollo
- ✅ Todas las páginas cargan: `/`, `/about`, `/solutions`, `/contact`
- ✅ Imágenes y videos se muestran correctamente
- ✅ CSS y JavaScript funcionan
- ✅ Navegación entre páginas operativa

### En Producción
- ✅ CSS con rutas `/_astro/*.css`
- ✅ Imágenes con rutas `/img/*`
- ✅ Videos con rutas `/videos/*`
- ✅ Sin errores 404 en assets
- ✅ URLs limpias sin mostrar la carpeta `ignuxlab` en la URL

## 🔧 Troubleshooting

### Si hay errores 404 en assets:
1. Verificar que ambos archivos `.htaccess` estén en su lugar:
   - `public_html/.htaccess` (redirige a ignuxlab)
   - `public_html/ignuxlab/.htaccess` (configuración del sitio)
2. Confirmar que `base: '/'` en `astro.config.mjs`
3. Ejecutar `npm run build` después de cambios en configuración
4. Verificar permisos de archivos en el servidor (644 para archivos, 755 para carpetas)

### Si el sitio no carga:
1. Verificar que `mod_rewrite` esté habilitado en el servidor
2. Revisar los logs de error de Apache en cPanel
3. Confirmar que la carpeta `ignuxlab/` existe y contiene todos los archivos

### Para probar producción localmente:
```bash
npm run build
npm run preview
```

## 📂 Estructura de Archivos

### En el Proyecto Local
```
dist/
├── _astro/                 # CSS y JS optimizados
├── img/                   # Imágenes estáticas
│   ├── logo.webp
│   ├── soluciones.webp
│   └── clientes/          # Logos de clientes
├── videos/                # Videos
│   └── hero.mp4
├── scripts/               # JavaScript
├── about/index.html       # Página sobre nosotros
├── solutions/index.html   # Página soluciones
├── news/index.html        # Página noticias
├── contact/index.html     # Página contacto
├── index.html            # Página principal
├── 404.html              # Página de error
└── robots.txt            # SEO
```

### Archivos de Configuración para Deployment
```
.htaccess.public_html      # Subir a public_html/.htaccess
public/.htaccess          # Subir a public_html/ignuxlab/.htaccess
```

## 📝 Notas Importantes

- **Mantén `base: '/'` en `astro.config.mjs`** - No cambies esto
- **Los archivos se organizan en `ignuxlab/`** pero el sitio funciona en la raíz
- **Las URLs se mantienen limpias** - No se muestra `/ignuxlab/` en las URLs
- **Compatible con cPanel** - Funciona con la configuración estándar de cPanel
