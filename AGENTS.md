# AGENTS.md

## Project Structure
```
portafolio/
├── frontend/      # React 18 + Vite + Tailwind CSS + TypeScript
└── backend/       # Django (partially configured)
```

## Frontend Commands
```bash
cd frontend
npm run dev         # Dev server (port 5173+)
npm run build       # Production build (tsc + vite build)
npm run type-check # TypeScript validation only
npm run preview    # Preview production build
```

## Backend Commands
```bash
cd backend
source .venv/bin/activate   # Activate virtualenv
python manage.py runserver  # Start on port 8000
```

## Dev Server Proxy
Vite proxies `/api` and `/media` to `http://localhost:8000`. Use relative paths (`/api/endpoint`), never absolute URLs.

## Environment Setup
- Frontend: copy `frontend/.env.example` → `frontend/.env`
- Backend: copy `backend/.env.example` → `backend/.env`
- Vite env vars must be prefixed with `VITE_`

## Design System (2025 Refresh)
- **Fonts**: Archivo (headings) + Space Grotesk (body)
- **Color palette**: CSS variables in `index.css`:
  - `--bg-primary: #0f172a` (dark slate)
  - `--accent: #22c55e` (green)
  - `--text-primary: #f8fafc`
  - `--text-muted: #64748b`
- **Accessibility**: `prefers-reduced-motion` respected in CSS

## Architecture
- **Routing**: React Router 6 in `frontend/src/router/router.tsx`
- **Data**: `frontend/src/datas/portfolio.json` + GitHub API via `usePortfolio.ts`
- **SEO**: react-helmet-async in `frontend/src/components/SEO.tsx`
- **PWA**: manifest.json + service worker (sw.js)
- **CSS**: Variables-based theming in `index.css`

## Key Sections
- Hero: typewriter effect, scroll indicator
- About: animated counters, avatar, philosophy card
- Projects: grid with modal (no filters - minimalist)
- TechStack: spinning wheel + category lists
- Contact: form with validation, social links

## Key Files
- `frontend/src/main.tsx` - Entry point, registers service worker
- `frontend/src/App.tsx` - Root with SEO component
- `frontend/src/index.css` - CSS variables, animations, design tokens
- `frontend/src/datas/portfolio.json` - Centralized data

## TypeScript
- Build runs `tsc && vite build` - type errors fail the build
- Run `npm run type-check` before committing
- All source files are `.tsx` or `.ts`

## PWA & SEO
- Service worker caches for offline
- manifest.json for installable app
- Replace `G-XXXXXXXXXX` in SEO.tsx with real GA ID

## Common Issues
- Sections not showing: Check IntersectionObserver ref usage
- Type errors: Run `npm run type-check` before committing
- GitHub API rate limited: fallback in portfolio.json works offline