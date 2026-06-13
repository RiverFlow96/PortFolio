# Frontend AGENTS.md

See [root AGENTS.md](../AGENTS.md) for full project context. This file covers frontend-specific details only.

---

## Commands (run from `frontend/`)

```bash
npm run dev          # Vite HMR on :5173
npm run type-check   # tsc --noEmit (required before commits)
npm run build        # tsc && vite build
npm run preview      # Preview production build
```

---

## Structure

```
src/
├── pages/HomePage.tsx         # Root page composing all sections
├── sections/                  # Hero → About → HowIWork → Projects → TechStack → Contact
├── layout/                    # Navbar (IntersectionObserver scroll tracking) + Footer
├── components/                # SEO, LazyImage, FloatingParticles, Terminal, ui/
├── hooks/                     # usePortfolio (GitHub API + JSON fallback)
├── data/portfolio.json        # Source of truth (projects, skills, contact)
├── router/router.tsx          # Single route `/`
├── index.css                  # Design tokens, animations, Tailwind layers
├── App.tsx                    # Root component
└── main.tsx                   # Entry point (StrictMode, SEOProvider, SW register)
```

---

## Design System (real — not what README says)

File: `src/index.css:7-27`. **Do NOT trust the README colors:**

```css
--bg-primary: #080808      /* Near-black */
--accent: #e63946          /* Red/crimson */
--text-primary: #f5f5f5
--text-secondary: #a0a0a0
```

- **Font:** Geist (imported from Google Fonts) — not Archivo/Space Grotesk
- **Easing:** Spring curves (`--spring-snappy`, `--spring-bounce`) used for animations
- `prefers-reduced-motion` respected in CSS (line 34-44)

---

## Key Patterns

- **Section IDs:** Each section has `id="{name}"` → `Navbar.tsx` derives active state via IntersectionObserver. Never hardcode the section list.
- **Data source:** `data/portfolio.json` is ground truth. The GitHub API hook (`usePortfolio.ts`) tries live fetch first, falls back to JSON. Never hardcode data in JSX.
- **API calls:** Always relative (`/api/...`). Vite proxies to Django in dev. Never use `localhost:8000` directly.
- **SEO:** `components/SEO.tsx` uses react-helmet-async + JSON-LD. GA ID placeholder `G-XXXXXXXXXX` needs replacement.

---

## Dead / Stale Code

- `hooks/useScrollReveal.ts` — unused (sections use inline IntersectionObserver)
- `data/projects.ts` — legacy, replaced by `portfolio.json`
- `zustand`, `axios` in `package.json` — installed but never imported

---

## What's Missing

- **No test setup** (Vitest + RTL recommended in `../recommendations.md`)
- **No linter/formatter config**

---

## Adding a Section

1. Create `sections/NewSection.tsx`
2. Add to `pages/HomePage.tsx` in order
3. Add `id="new-section"` for navbar scroll tracking
4. Add data to `portfolio.json` if needed
5. Run `npm run type-check`
