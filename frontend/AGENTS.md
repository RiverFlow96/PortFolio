# AGENTS.md

## Project Overview
React 18 + Vite + Tailwind CSS frontend for a portfolio site. Proxies API requests to a Django backend at `http://localhost:8000`.

## Commands
- `npm run dev` - Start dev server on port 5173
- `npm run build` - Production build
- `npm run preview` - Preview production build

## Architecture
- **Routing**: React Router 6 in `src/router/router.tsx`
- **State**: Zustand stores in `src/store/`
- **API**: Axios configured in `src/api/`, uses `/api` and `/media` proxy paths
- **UI**: Tailwind CSS + custom components in `src/components/ui/`

## Environment
- Create `.env` from `.env.example`
- `VITE_API_URL` should point to Django backend (default: `http://localhost:8000`)
- Vite env vars must be prefixed with `VITE_`

## Dev Server Proxy
Vite proxies `/api` and `/media` to `http://localhost:8000`. Do not use absolute URLs for backend calls—use paths like `/api/endpoint`.