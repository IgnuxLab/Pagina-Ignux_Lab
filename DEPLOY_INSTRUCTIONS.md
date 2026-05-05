# 🚀 Instrucciones Rápidas de Despliegue

## Pasos para Subir el Sitio a cPanel

### 1️⃣ Generar el Build
```bash
npm run build
```

### 2️⃣ Subir Archivos al Servidor

#### Opción A: Usando File Manager de cPanel
1. Accede a **File Manager** en cPanel
2. Navega a `public_html/`
3. Crea la carpeta `ignuxlab/` si no existe
4. Sube **todo el contenido** de la carpeta `dist/` a `public_html/ignuxlab/`
5. Sube el archivo `public/.htaccess` a `public_html/ignuxlab/.htaccess`
6. Sube el archivo `.htaccess.public_html` a `public_html/.htaccess` (raíz)

#### Opción B: Usando FTP/SFTP
1. Conecta a tu servidor vía FTP/SFTP
2. Navega a `public_html/`
3. Crea la carpeta `ignuxlab/`
4. Sube todo el contenido de `dist/` a `public_html/ignuxlab/`
5. Sube `public/.htaccess` a `public_html/ignuxlab/.htaccess`
6. Sube `.htaccess.public_html` a `public_html/.htaccess`

### 3️⃣ Verificar Permisos
- Archivos: `644`
- Carpetas: `755`
- `.htaccess`: `644`

### 4️⃣ Verificar que Funciona
Visita: `https://ignuxlab.com/`

El sitio debe cargar correctamente sin mostrar `/ignuxlab/` en la URL.

## ✅ Checklist de Verificación

- [ ] Build generado (`npm run build`)
- [ ] Carpeta `ignuxlab/` creada en `public_html/`
- [ ] Todos los archivos de `dist/` subidos a `ignuxlab/`
- [ ] `.htaccess` subido a `ignuxlab/.htaccess`
- [ ] `.htaccess.public_html` subido a `public_html/.htaccess`
- [ ] Permisos correctos (644/755)
- [ ] Sitio accesible en `https://ignuxlab.com/`
- [ ] Sin errores 404 en assets
- [ ] Navegación entre páginas funciona

## 🔧 Si Algo No Funciona

1. **Verifica que `mod_rewrite` esté habilitado** en tu servidor
2. **Revisa los logs de error** en cPanel → Error Log
3. **Confirma que ambos `.htaccess` estén en su lugar**
4. **Verifica permisos** de archivos y carpetas
5. **Limpia la caché** del navegador (Ctrl+F5)

## 📁 Estructura Esperada en el Servidor

```
public_html/
├── .htaccess                    ← Redirige a /ignuxlab/
├── ignuxlab/                    ← Tu sitio aquí
│   ├── .htaccess               ← Configuración del sitio
│   ├── index.html
│   ├── _astro/
│   ├── img/
│   ├── scripts/
│   ├── videos/
│   └── ...
└── (otros archivos)
```

## 💡 Nota Importante

Aunque los archivos están en `public_html/ignuxlab/`, el sitio funciona en `https://ignuxlab.com/` gracias a la configuración de `.htaccess`. Las URLs se mantienen limpias y no muestran la carpeta `ignuxlab`.
