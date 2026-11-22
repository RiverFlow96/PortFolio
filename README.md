# Portfolio — Yordany Almeda Riveron

> Portafolio estático de una sola página, desarrollado con React 18, Vite y TypeScript.

**Sitio publicado:** [portfolio-p6iv.onrender.com](https://portfolio-p6iv.onrender.com/)

## Desarrollo local

```bash
cd frontend
npm ci
npm run dev
```

Validaciones disponibles:

```bash
npm run type-check
npm run test
npm run build
```

## Estructura

- `frontend/src/sections/`: secciones del portfolio.
- `frontend/src/data/portfolio.json`: contenido de proyectos, perfil y contacto.
- `frontend/public/`: capturas, iconos, `robots.txt` y sitemap.
- `.github/workflows/ci-cd.yml`: validación y publicación de GitHub Pages.

## Datos y servicios externos

- Perfil y repositorios públicos se leen desde la API pública de GitHub. El sitio reutiliza la solicitud y recorre las páginas de repositorios disponibles.
- El formulario envía mensajes a FormSubmit usando el correo configurado en `frontend/src/data/portfolio.json`. FormSubmit puede requerir que se confirme la dirección receptora antes de entregar el primer mensaje.
- El sitio no requiere un backend Django; los datos del portfolio están incluidos en el frontend.

## Despliegue

Render publica el frontend desde `frontend/`. Configura el servicio para instalar dependencias con `npm ci`, ejecutar `npm run build` y servir `frontend/dist`. Las publicaciones de GitHub Pages son un flujo alternativo del repositorio.

## Licencia

MIT © 2026 Yordany Almeda Riveron.
