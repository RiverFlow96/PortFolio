# Portfolio — Yordany Almeda Riveron

> Professional fullstack portfolio built with React 18 + Vite + TypeScript and Django REST API backend.

**Live Demo:** [riverflow.dev](https://riverflow.dev)

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

### 1. Clone repository

```bash
git clone https://github.com/RiverFlow96/portafolio.git
cd portafolio
```

### 2. Setup Backend (Django)

```bash
cd backend
cp .env.example .env
# Edit .env with SECRET_KEY, DEBUG, ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS

source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Setup Frontend (React + Vite)

```bash
cd frontend
cp .env.example .env
# Variables must use VITE_ prefix

npm install
npm run dev
```

### 4. Open browser

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000

---

## Project Structure

```
portafolio/
├── frontend/              # React 18 + Vite + TypeScript SPA
│   ├── src/
│   │   ├── components/    # Reusable UI (SEO, LazyImage, etc.)
│   │   ├── sections/       # Page sections (Hero, About, Projects...)
│   │   ├── pages/          # Page composition
│   │   ├── hooks/          # Custom hooks (scroll reveal, portfolio data)
│   │   ├── data/           # portfolio.json (centralized data source)
│   │   ├── layout/         # Navbar, Footer
│   │   └── index.css       # Design tokens, CSS variables, animations
│   └── vite.config.ts      # Proxy for /api → Django
│
└── backend/                # Django 5 + Django REST Framework
    ├── config/             # Settings, root URLs
    └── apps/               # Users, listings, categories, reports
```

---

## Features

- **Architecture:** SPA with React 18 + Vite + TypeScript strict mode
- **Backend:** Django 5 + DRF 3.14 + PostgreSQL (SQLite in dev)
- **Animations:** IntersectionObserver for scroll-reveal, typewriter in Hero
- **SEO:** Dynamic meta tags, JSON-LD, sitemap, robots.txt, PWA service worker
- **Performance:** Lazy image loading, code splitting, prefers-reduced-motion
- **Design:** CSS token system, Archivo + Space Grotesk typography
- **API Integration:** Vite proxy in dev; relative paths (`/api/...`)

---

## Available Scripts

### Frontend

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Dev server on port 5173        |
| `npm run build`   | Production build (TS + Vite)   |
| `npm run preview` | Preview production build       |
| `npm run type-check` | Validate TS without bundling |

### Backend

| Command                          | Description                 |
| -------------------------------- | --------------------------- |
| `python manage.py runserver`     | Django server on port 8000  |
| `python manage.py migrate`        | Apply database migrations   |
| `python manage.py createsuperuser` | Create admin user          |

---

## Commit Conventions

Format: `<type>(<scope>): <description>`

```
feat(frontend): add project filtering by tech stack
fix(contact): resolve form validation error on empty email
docs(AGENTS): update commit conventions
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

---

## API Endpoints

| Method | Path                   | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | `/api/users/`          | User list           |
| GET    | `/api/listings/`       | Portfolio listings  |
| GET    | `/api/categories/`     | Project categories  |
| POST   | `/api/reports/`        | Submit contact form |

---

## Deployment

### Frontend (Vercel / Netlify)

```bash
cd frontend
npm run build
# Upload dist/ folder
```

**Required environment variables:**
- `VITE_API_URL` — Production backend URL

### Backend (Railway / Render / VPS)

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate --noinput
gunicorn config.wsgi:application
```

**Required environment variables:**
- `SECRET_KEY`
- `DEBUG=false`
- `ALLOWED_HOSTS`
- `DATABASE_URL` (PostgreSQL)
- `CORS_ALLOWED_ORIGINS`

---

## License

MIT © 2025 Yordany Almeda Riveron — [riverflow.dev](https://riverflow.dev)