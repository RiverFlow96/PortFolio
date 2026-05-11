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

## Architecture
- **Routing**: React Router 6 in `frontend/src/router/router.tsx`
- **State**: Zustand stores in `frontend/src/store/`
- **Data**: `frontend/src/datas/portfolio.json` + GitHub API via `usePortfolio.ts`
- **SEO**: react-helmet-async in `frontend/src/components/SEO.tsx`
- **PWA**: manifest.json + service worker (sw.js)

## Key Sections (in order)
- Hero: typewriter effect, scroll indicator
- About: animated counters, avatar with gradient
- Projects: cards with modal, difficulty tags, filtering (search, tech, sort)
- TechStack: spinning wheel animation on hover
- Contact: form with validation, loading/success/error states

## Key Files
- `frontend/src/main.tsx` - Entry point, registers service worker
- `frontend/src/App.tsx` - Root with SEO component
- `frontend/src/datas/portfolio.json` - Centralized data (profile, projects, tech, social)
- `frontend/src/sections/` - All page sections
- `frontend/src/components/SEO.tsx` - Meta tags, Open Graph, JSON-LD schema
- `frontend/src/components/LazyImage.tsx` - Lazy loading with IntersectionObserver

## Style
- Dark cyber theme (`#0a0a0f` background, `#06b6d4` cyan, `#ec4899` pink)
- Inter font, JetBrains Mono for code
- Fade-in scroll animations via IntersectionObserver

## TypeScript
- All source files are `.tsx` or `.ts`
- Build runs `tsc && vite build` - type errors fail the build
- Run `npm run type-check` before committing

## PWA
- Service worker caches static assets and images for offline
- manifest.json for installable web app
- Replace `G-XXXXXXXXXX` in SEO.tsx with real Google Analytics ID

## Common Issues
- Sections not showing: Check IntersectionObserver ref usage
- Type errors: Run `npm run type-check` before committing
- GitHub API rate limited: fallback data in portfolio.json works offline