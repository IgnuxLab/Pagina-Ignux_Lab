import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  site: 'https://ignuxlab.com',
  base: '/',
  vite: {
    define: {
      // Variables de entorno para desarrollo y producción
      'import.meta.env.RESEND_API_KEY': JSON.stringify('re_YJUTY3Lo_3XCrkHrudzycYPbnGzJSkYjd'),
      'import.meta.env.CONTACT_EMAIL': JSON.stringify('programador3@ainteractivo.com'),
      'import.meta.env.FROM_EMAIL': JSON.stringify('noreply@ignuxlab.com'),
      'import.meta.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }
});