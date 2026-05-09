# AGENTS.md

## Project Structure
```
portafolio/
├── frontend/      # React 18 + Vite + Tailwind CSS
└── backend/      # Django (partially configured)
```

## Frontend Commands
```bash
cd frontend
npm run dev      # Dev server on port 5173
npm run build   # Production build
npm run preview # Preview production build
```

## Backend Commands
```bash
cd backend
source .venv/bin/activate  # Activate virtualenv
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
- **UI**: Tailwind CSS + custom components in `frontend/src/components/ui/`

## Current TODO
- [ ] Animación de iconos de tecnologías en rueda (TechStack section)

## Style
- Dark cyber theme (`#0a0a0f` background, `#8b5cf6` accent)
- Inter font, mono for code
- Fade-in scroll animations, subtle glow effects