// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  // Base path para producción en el dominio raíz
  base: '/',
  
  // Configuración del sitio para SEO y metadatos
  site: 'https://ignuxlab.com', // Cambiar por tu dominio real
  
  // Configuración de compilación
  output: 'static',
  
  // Configuración de compresión
  compressHTML: true,
  
  // Configuración de redirecciones
  redirects: {
    // Redirecciones de URLs comunes
    '/home': '/',
    '/index': '/',
    '/inicio': '/',
    '/about-us': '/about',
    '/services': '/solutions',
    '/blog': '/news',
    '/contact-us': '/contact'
  },
  
  // Configuración de Vite
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@config': path.resolve(__dirname, './src/config'),
        '@components': path.resolve(__dirname, './src/components'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@types': path.resolve(__dirname, './src/types')
      }
    },
    
    // Optimizaciones de build
    build: {
      cssMinify: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro']
          }
        }
      }
    },
    
    // Configuración del servidor de desarrollo
    server: {
      port: 3000,
      host: true
    }
  },
  
  // Configuración de integraciones (futuras)
  integrations: [
    // Aquí puedes agregar integraciones como @astrojs/sitemap, @astrojs/seo, etc.
  ],
  
});
