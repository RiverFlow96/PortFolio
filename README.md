# Portfolio — Yordany Almeda Riveron

> Portafolio profesional fullstack con React 18 + Vite + TypeScript y backend Django REST API.

**Demo en vivo:** [riverflow.dev](https://riverflow.dev)

---

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38b2ac?style=flat-square&logo=tailwind-css)

### Backend
![Django](https://img.shields.io/badge/Django-5.0-092e20?style=flat-square&logo=django)
![Django REST](https://img.shields.io/badge/DRF-3.14-ff6f00?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql)

---

## Quick Start

### 1. Clonar repositorio

```bash
git clone https://github.com/RiverFlow96/portafolio.git
cd portafolio
```

### 2. Configurar Backend (Django)

```bash
cd backend
cp .env.example .env
# Editar .env con SECRET_KEY, DEBUG, ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS

source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Configurar Frontend (React + Vite)

```bash
cd frontend
cp .env.example .env
# Las variables deben tener prefijo VITE_

npm install
npm run dev
```

### 4. Abrir navegador

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000

---

## Estructura del Proyecto

```
portafolio/
├── frontend/              # React 18 + Vite + TypeScript SPA
│   ├── src/
│   │   ├── components/    # UI reutilizable (SEO, LazyImage, etc.)
│   │   ├── sections/       # Secciones de página (Hero, About, Projects...)
│   │   ├── pages/          # Composición de páginas
│   │   ├── hooks/          # Custom hooks (scroll reveal, portfolio data)
│   │   ├── data/           # portfolio.json (fuente de datos centralizada)
│   │   ├── layout/         # Navbar, Footer
│   │   └── index.css       # Tokens de diseño, variables CSS, animaciones
│   └── vite.config.ts      # Proxy para /api → Django
│
└── backend/                # Django 5 + Django REST Framework
    ├── config/             # Settings, URLs raíz
    └── apps/               # Users, listings, categories, reports
```

---

## Características

- **Arquitectura:** SPA con React 18 + Vite + TypeScript strict mode
- **Backend:** Django 5 + DRF 3.14 + PostgreSQL (SQLite en desarrollo)
- **Animaciones:** IntersectionObserver para scroll-reveal, typewriter en Hero
- **SEO:** Meta tags dinámicos, JSON-LD, sitemap, robots.txt, service worker PWA
- **Rendimiento:** Lazy loading de imágenes, código splitted, prefers-reduced-motion
- **Diseño:** Sistema de tokens CSS, tipografía Archivo + Space Grotesk
- **API Integration:** Vite proxy en desarrollo; rutas relativas (`/api/...`)

---

## Scripts Disponibles

### Frontend

| Comando            | Descripción                                |
| ------------------ | ------------------------------------------ |
| `npm run dev`      | Servidor de desarrollo en puerto 5173      |
| `npm run build`    | Build de producción (TypeScript + Vite)   |
| `npm run preview`  | Previsualizar build de producción          |
| `npm run type-check` | Validar TypeScript sin bundling          |

### Backend

| Comando                    | Descripción                      |
| -------------------------- | -------------------------------- |
| `python manage.py runserver` | Servidor Django en puerto 8000  |
| `python manage.py migrate`   | Aplicar migraciones de BD       |
| `python manage.py createsuperuser` | Crear admin                  |

---

## Convenciones de Commit

Formato: `<tipo>(<ámbito>): <descripción>`

```
feat(frontend): add project filtering by tech stack
fix(contact): resolve form validation error on empty email
docs(AGENTS): update commit conventions
```

**Tipos:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

---

## API Endpoints

| Método | Ruta                    | Descripción              |
| ------ | ----------------------- | ------------------------ |
| GET    | `/api/users/`           | Lista de usuarios        |
| GET    | `/api/listings/`        | Listados del portfolio   |
| GET    | `/api/categories/`      | Categorías de proyectos   |
| POST   | `/api/reports/`         | Enviar formulario        |

---

## Deployment

### Frontend (Vercel / Netlify)

```bash
cd frontend
npm run build
# Subir carpeta dist/
```

**Variables de entorno necesarias:**
- `VITE_API_URL` — URL del backend en producción

### Backend (Railway / Render / VPS)

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate --noinput
gunicorn config.wsgi:application
```

**Variables de entorno necesarias:**
- `SECRET_KEY`
- `DEBUG=false`
- `ALLOWED_HOSTS`
- `DATABASE_URL` (PostgreSQL)
- `CORS_ALLOWED_ORIGINS`

---

## Licencia

MIT © 2025 Yordany Almeda Riveron — [riverflow.dev](https://riverflow.dev)