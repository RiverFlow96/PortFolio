# Portfolio — Yordany Almeda Riveron

> Professional fullstack portfolio built with React 18 + Vite + TypeScript.

**Live Demo:** [riverflow.dev](https://riverflow.dev)

---

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38b2ac?style=flat-square&logo=tailwind-css)

---

## Quick Start

### 1. Clone repository

```bash
git clone https://github.com/RiverFlow96/portafolio.git
cd portafolio
```

### 2. Setup Frontend (React + Vite)

```bash
cd frontend
cp .env.example .env
# Variables must use VITE_ prefix

npm install
npm run dev
```

### 3. Open browser

- **Frontend:** http://localhost:5173

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
│   └── vite.config.ts      # Configuration
```

---

## Features

- **Architecture:** SPA with React 18 + Vite + TypeScript strict mode
- **Animations:** IntersectionObserver for scroll-reveal, typewriter in Hero
- **SEO:** Dynamic meta tags, JSON-LD, sitemap, robots.txt, PWA service worker
- **Performance:** Lazy image loading, code splitting, prefers-reduced-motion
- **Design:** CSS token system, Archivo + Space Grotesk typography

---

## Available Scripts

### Frontend

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Dev server on port 5173        |
| `npm run build`   | Production build (TS + Vite)   |
| `npm run preview` | Preview production build       |
| `npm run type-check` | Validate TS without bundling |

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

## Deployment

### Frontend (Vercel / Netlify)

```bash
cd frontend
npm run build
# Upload dist/ folder
```

---

## License

MIT © 2025 Yordany Almeda Riveron — [riverflow.dev](https://riverflow.dev)
