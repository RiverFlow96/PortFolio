# AGENTS.md

Portfolio 2025 — React 18 + Vite + TypeScript SPA with a Django 5 backend. Personal portfolio for Yordany Almeda Riveron (RiverFlow). Currently on `main`.

---

## Commands

All frontend commands run from `frontend/`:

```bash
npm run dev          # Vite HMR on :5173
npm run type-check   # tsc --noEmit (run before commits; if it reports TypeScript errors, fix the strict typing issues rather than bypassing them)
npm run build        # tsc && vite build
npm run preview      # Preview production build
```

Backend from `backend/` (activate `.venv` first):

```bash
python manage.py runserver  # :8000
```

---

## Dev Integration

Vite proxies `/api` and `/media` to Django on `localhost:8000`. Always use relative paths (`/api/...`), never absolute URLs. `@` path alias maps to `src/` (configured in `vite.config.ts`).

---

## Actual vs Documented Design System

**Do NOT trust README colors.** The real CSS at `frontend/src/index.css:7-21`:

- `--bg-primary: #080808` (near-black), `--accent: #e63946` (red)
- Font: **Geist** (not Archivo/Space Grotesk as the README says)
- Spring easing curves (`--spring-snappy`, `--spring-bounce`) used throughout

---

## Frontend Structure

Single-page composited in `pages/HomePage.tsx`. Section order: Hero → About → HowIWork → Projects → TechStack → Contact. Each section has an `id` attribute used by `layout/Navbar.tsx` for scroll tracking via IntersectionObserver.

Key files:

- `data/portfolio.json` — source of truth for projects, skills, contact data
- `hooks/usePortfolio.ts` — GitHub API fetch, falls back to `portfolio.json` if rate-limited
- `components/SEO.tsx` — react-helmet-async + JSON-LD; has GA placeholder `G-XXXXXXXXXX`
- `components/ui/orbiting-skills.tsx` — 3D orbiting tech icons (TechStack wheel)

---

## Dead Code / Known Issues

Do not touch or rely on these:

- `data/projects.ts` — legacy, unused (use `portfolio.json` instead)
- `hooks/useScrollReveal.ts` — unused; sections use inline IntersectionObserver
- `vite.config.js` — stale duplicate of `vite.config.ts` (no `@` alias)
- `zustand` and `axios` in `package.json` — installed but never imported
- **No test setup exists** (Vitest + RTL listed as medium priority in `recommendations.md`)
- **No CI/CD** (deploy is manual)

---

## Backend Caveats

`backend/apps/` contains only `__init__.py` — **no actual Django apps exist**. The routes registered in `config/urls.py` (`apps.users.urls`, `apps.listings.urls`, etc.) and `AUTH_USER_MODEL = 'users.User'` in `settings.py` will **404 / break** on any request. The backend is scaffolded but unimplemented.

When working on frontend components that fetch from `/api`, either use hardcoded mock data or immediately implement the corresponding Django backend route, as all backend endpoints currently return 404.

The Python virtual environment `.venv` lives at the repo root, not inside the `backend/` directory.

---

## Commit Convention

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Scope is module folder (e.g., `frontend`, `backend`, `projects`). Imperative, lowercase, no period.

---

## References

- `recommendations.md` — definitive TODO list (dead-code cleanup, A11y, Error Boundary, testing)
- `frontend/AGENTS.md` — frontend-specific detail
