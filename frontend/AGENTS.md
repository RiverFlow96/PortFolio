# Frontend guide

See the [repository guide](../AGENTS.md) for shared project context.

## Commands

Run from `frontend/`:

```bash
npm run dev
npm run type-check
npm run test
npm run build
npm run preview
```

`npm test` runs Vitest component/data tests and Playwright browser tests. Playwright uses the installed Google Chrome at `/usr/bin/google-chrome-stable` in this environment.

## Structure

- `src/pages/HomePage.tsx`: composes all page sections.
- `src/sections/`: Hero, About, HowIWork, Projects, TechStack, Contact.
- `src/layout/`: Navbar and Footer.
- `src/data/portfolio.json`: local source of truth for portfolio content.
- `src/data/usePortfolio.ts`: shared GitHub requests with local fallback.
- `src/components/SEO.tsx`: canonical, social metadata, and JSON-LD.

## UI conventions

- Use relative, responsive layouts and preserve section IDs used by Navbar.
- Follow CSS tokens in `src/index.css` (Geist, near-black background, red accent).
- Respect `prefers-reduced-motion` and use semantic labels for controls.
- Keep the active public URL consistent across canonical metadata, JSON-LD, `robots.txt`, and sitemap.
