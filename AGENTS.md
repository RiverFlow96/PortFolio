# Repository guide

Portfolio for Yordany Almeda Riveron (RiverFlow), built as a static React 18, Vite, and TypeScript SPA. The active deployment is Render at `https://portfolio-p6iv.onrender.com/`. There is no Django backend in this repository.

## Commands

Run frontend commands from `frontend/`:

```bash
npm run dev
npm run type-check
npm test
npm run build
npm run preview
```

## Frontend integration

- Vite's `@` alias maps to `frontend/src/`.
- `frontend/src/data/portfolio.json` is the source of truth for portfolio profile, project, and contact information.
- Public GitHub profile/repository data is fetched from GitHub's API and falls back to the local profile content if unavailable.
- Contact submissions use FormSubmit; the recipient is configured in `portfolio.json` and may need to activate the service.
- SEO metadata uses the active Render URL. Update canonical, structured data, `robots.txt`, and sitemap together when the public domain changes.

## Design system

The actual CSS tokens live in `frontend/src/index.css`: near-black background, red accent, Geist type, and spring animation curves. Prefer these tokens to stale color/font references elsewhere.

## Sections

`frontend/src/pages/HomePage.tsx` composes Hero → About → HowIWork → Projects → TechStack → Contact. Preserve section IDs used by Navbar's IntersectionObserver.

## Commits

Use `<type>(<scope>): <imperative description>` with lowercase text and no trailing period.
