# AGENTS.md

## Project Overview

**Portfolio 2025** — A React 18 + Vite + TypeScript SPA frontend with Django backend. Single-page scrolling portfolio site featuring projects, tech stack, and contact form. Currently on `feature/projects` branch.

---

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev          # Dev server on port 5173 + HMR
npm run type-check   # TypeScript validation only (run before commits)
npm run build        # Production: tsc + vite build
npm run preview      # Preview production build locally
```

### Backend

```bash
cd backend
source .venv/bin/activate
python manage.py runserver  # Django API on port 8000
```

**Dev Integration:** Vite proxies `/api` and `/media` to Django. Use relative paths only (`/api/endpoint`), never absolute URLs.

---

## Commit Conventions

All commits follow **[Conventional Commits](https://www.conventionalcommits.org/)** format:

```
<type>(<scope>): <description>
```

- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- **Scope:** Module/folder affected (e.g., `frontend`, `backend`, `projects`, `contact`)
- **Description:** Imperative, lowercase, no period
- **Examples:**
  - `feat(frontend): add project filtering by tech stack`
  - `fix(contact): resolve form validation error on empty email`
  - `docs(AGENTS): update commit conventions`

⚠️ **Always update `AGENTS.md` if you add new conventions or architectural decisions.**

---

## Environment Setup

- **Frontend:** Copy `frontend/.env.example` → `frontend/.env`
  - All vars must be prefixed with `VITE_` (Vite requirement)
- **Backend:** Copy `backend/.env.example` → `backend/.env`
  - Required: `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`
  - Language: Spanish (es), Timezone: Europe/Madrid

---

## Frontend Architecture

### Structure

```
frontend/src/
├── pages/           # Page templates (HomePage)
├── sections/        # Full-width sections (Hero, About, Projects, TechStack, Contact)
├── layout/          # Global UI (Navbar with scroll tracking, Footer)
├── components/      # Reusable UI (SEO, LazyImage, FloatingParticles, Terminal)
├── hooks/           # Custom logic (useScrollReveal, usePortfolio)
├── data/            # Data sources & API (portfolio.json, usePortfolio.ts hook)
├── router/          # React Router 6 config (single route: /)
├── api/             # API client setup (if expanded)
├── index.css        # Design tokens, animations, CSS variables
└── main.tsx         # Entry point (registers service worker)
```

### Key Patterns

| Pattern              | Example                   | Location                                                                 |
| -------------------- | ------------------------- | ------------------------------------------------------------------------ |
| **Scroll detection** | Navbar active section     | `layout/Navbar.tsx` uses IntersectionObserver + section `id` attributes  |
| **Data fetching**    | GitHub API + fallback     | `hooks/usePortfolio.ts` (falls back to `portfolio.json` if rate-limited) |
| **Animations**       | Scroll reveal, typewriter | CSS animations + `useScrollReveal()` hook or IntersectionObserver        |
| **SEO**              | Meta tags, JSON-LD        | `components/SEO.tsx` (react-helmet-async)                                |
| **Lazy loading**     | Images                    | `components/LazyImage.tsx` (IntersectionObserver)                        |

### Key Files

- `pages/HomePage.tsx` — Composes all sections in correct order
- `sections/*.tsx` — Hero (typewriter, scroll indicator), About (counters), Projects (modal), TechStack (spinning wheel), Contact (form)
- `data/portfolio.json` — Centralized project/tech data (source of truth)
- `index.css` — All design tokens, CSS variables, animations

### Page Sections (in order)

1. **Hero** — Typewriter effect + scroll indicator
2. **About** — Animated counters + avatar + philosophy card
3. **Projects** — Grid + modal (no filtering; see [recommendations.md](recommendations.md#a-archivos-duplicadossin-usar))
4. **TechStack** — Spinning wheel animation + category lists
5. **Contact** — Form with validation + social links

---

## Design System (2025 Refresh)

### Typography

- **Headings:** Archivo (variable weight)
- **Body:** Space Grotesk

### Color Palette (CSS variables in `index.css`)

```css
--bg-primary: #0f172a /* Dark slate background */ --accent: #22c55e
  /* Green accent */ --text-primary: #f8fafc /* Off-white text */
  --text-muted: #64748b /* Muted gray */;
```

### Accessibility

- `prefers-reduced-motion` media query respected in all animations
- Semantic HTML (buttons, forms, landmarks)
- IntersectionObserver for performance (instead of scroll listeners)

---

## Backend Architecture

### API Structure

- **Routes:** `/api/users/`, `/api/listings/`, `/api/categories/`, `/api/reports/`
- **Framework:** Django 5.0 + Django REST Framework 3.14
- **Database:** SQLite (dev) — configure for PostgreSQL in production
- **Auth model:** Custom `users.User` model
- **CORS:** Enabled for `http://localhost:5173` (dev); configure for production

### Configuration

- **Settings:** `config/settings.py` (loads `DEBUG`, `SECRET_KEY`, `ALLOWED_HOSTS` from `.env`)
- **Timezone:** Europe/Madrid
- **Language:** Spanish (es)
- **Pagination:** 20 items/page (PageNumberPagination)

---

## TypeScript & Type Safety

**Build enforces strict TypeScript:**

```bash
npm run build  # Runs: tsc && vite build (type errors → build fails)
```

**Before committing:**

```bash
npm run type-check  # Validates types without bundling
```

All source files are `.tsx` (React components) or `.ts` (utilities).

---

## PWA & SEO

- **Service Worker:** `public/sw.js` caches assets for offline access
- **Manifest:** `public/manifest.json` makes site installable
- **Sitemap & Robots:** `public/sitemap.xml`, `public/robots.txt`
- **Analytics:** Google Analytics ID placeholder in `components/SEO.tsx` (replace `G-XXXXXXXXXX`)

---

## Common Issues & Solutions

| Issue                              | Cause                                 | Solution                                                         |
| ---------------------------------- | ------------------------------------- | ---------------------------------------------------------------- |
| Sections not animating/showing     | IntersectionObserver ref not attached | Check section `id` attribute matches hook ref                    |
| Type errors blocking build         | TypeScript strict mode                | Run `npm run type-check` before commit                           |
| GitHub API rate limit              | Too many requests in dev              | Fallback to `portfolio.json` works automatically                 |
| Navbar not tracking active section | Section missing `id` attribute        | Add `id="{sectionName}"` to section container                    |
| Service worker not updating        | Stale cache                           | Clear browser cache or increment cache version in `public/sw.js` |

---

## Related Documentation

- [recommendations.md](recommendations.md) — Completed features & pending improvements (A11y, code cleanup)
- [frontend/AGENTS.md](frontend/AGENTS.md) — Frontend-specific guidance
- [docs/PORTAFOLIO-SPEC.md](frontend/docs/PORTAFOLIO-SPEC.md) — Full feature specification

---

## Agent Guidance

- **Before implementing features:** Check [recommendations.md](recommendations.md) for priorities
- **New sections:** Follow pattern: create `sections/NewSection.tsx`, add to `HomePage.tsx`, update `portfolio.json`
- **API integration:** Use `/api/path` (relative); Vite proxy handles dev; production needs backend URL
- **Components:** Use TypeScript `.tsx` files; respect design tokens in `index.css`
- **Commits:** Always follow Conventional Commits format and update this file if adding conventions
