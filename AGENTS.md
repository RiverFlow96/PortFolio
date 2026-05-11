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
npm run dev         # Dev server (port 5173+ if occupied)
npm run build      # Production build (tsc + vite build)
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
Vite proxies `/api` and `/media` to `http://localhost:8000`. Always use relative paths (`/api/endpoint`), never absolute URLs.

## Environment Setup
- Frontend: copy `frontend/.env.example` → `frontend/.env`
- Backend: copy `backend/.env.example` → `backend/.env`
- Vite env vars must be prefixed with `VITE_`

## Architecture
- **Routing**: React Router 6 in `frontend/src/router/router.tsx`
- **State**: Zustand stores in `frontend/src/store/`
- **API**: Axios in `frontend/src/api/`, uses `/api` proxy
- **UI**: Tailwind CSS + custom components

## TypeScript
- All source files are `.tsx` or `.ts`
- tsconfig.json uses `moduleResolution: bundler`
- Build runs `tsc && vite build` - type errors fail the build

## Style
- Dark cyber theme (`#0a0a0f` background, `#8b5cf6` accent)
- Inter font, mono for code
- Fade-in scroll animations via IntersectionObserver

## Key Files
- `frontend/src/main.tsx` - Entry point
- `frontend/src/App.tsx` - Root component
- `frontend/src/sections/` - Page sections (Hero, About, Projects, TechStack, Contact, HowIWork)
- `frontend/src/components/` - Reusable components (Terminal, RiverFlowLogo, FloatingParticles)
- `frontend/src/hooks/useScrollReveal.ts` - Scroll reveal hook

## Common Issues
- Sections not showing: Check IntersectionObserver ref usage - prefer direct refs over complex hook wrappers
- Type errors: Run `npm run type-check` before committing