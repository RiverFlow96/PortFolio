# Frontend AGENTS.md

**See root [AGENTS.md](../AGENTS.md) for full project context. This file focuses on frontend-specific patterns.**

---

## Quick Commands

```bash
npm run dev          # Dev server on port 5173 + HMR
npm run type-check   # Validate TypeScript (always before commits)
npm run build        # Production build: tsc && vite build
npm run preview      # Preview production output
```

---

## Frontend Structure

```
src/
├── pages/           # Page-level components
│   └── HomePage.tsx       # Root page (composes all sections)
├── sections/        # Full-width page sections
│   ├── Hero.tsx           # Typewriter + scroll indicator
│   ├── About.tsx          # Counters + avatar + philosophy
│   ├── HowIWork.tsx       # Process explanation
│   ├── Projects.tsx       # Project grid + modal
│   ├── TechStack.tsx      # Spinning wheel animation
│   └── Contact.tsx        # Form + validation + social links
├── layout/          # Global layouts
│   ├── Navbar.tsx         # Scroll-tracking header (active section detection)
│   └── Footer.tsx         # Site footer
├── components/      # Reusable UI components
│   ├── SEO.tsx            # react-helmet-async meta tags + JSON-LD
│   ├── LazyImage.tsx      # IntersectionObserver-based image loader
│   ├── FloatingParticles.tsx  # Background animation
│   ├── Terminal.tsx       # Code/terminal display
│   └── ui/                # Atomic components (buttons, inputs, etc.)
├── hooks/           # Custom React hooks
│   ├── useScrollReveal.ts # IntersectionObserver for scroll animations
│   └── usePortfolio.ts    # GitHub API fetch + fallback to portfolio.json
├── data/            # Data sources
│   ├── portfolio.json     # Projects, skills, contact data (source of truth)
│   ├── projects.ts        # (DEPRECATED - remove, see recommendations.md)
│   ├── social_medias.ts   # Social links
│   └── usePortfolio.ts    # GitHub API integration hook
├── router/          # React Router config
│   └── router.tsx         # Single route (/) to HomePage
├── utils/           # Utility functions
├── api/             # API client setup (expandable)
├── index.css        # Global styles, design tokens, animations
├── App.tsx          # Root component
└── main.tsx         # Entry point (registers service worker)
```

---

## Design System

### CSS Variables (in `index.css`)

```css
--bg-primary: #0f172a /* Dark slate */ --accent: #22c55e /* Green accent */
  --text-primary: #f8fafc /* Off-white */ --text-muted: #64748b /* Gray text */;
```

### Typography

- **Headings:** Archivo variable font
- **Body:** Space Grotesk

### Accessibility

- All animations respect `prefers-reduced-motion`
- Use IntersectionObserver instead of scroll listeners for performance
- Semantic HTML (avoid div-soup)

---

## Key Patterns

### 1. Scroll-Triggered Active Section (Navbar)

- **How:** Sections have `id="{sectionName}"` → Navbar uses IntersectionObserver
- **File:** `layout/Navbar.tsx` tracks which section is visible
- **Pattern:** Don't hardcode section list; derive from section `id` attributes

### 2. Data Management

- **Source of truth:** `data/portfolio.json` (projects, skills, timeline)
- **GitHub API fallback:** `hooks/usePortfolio.ts` fetches live data; falls back to JSON if rate-limited
- **Never hardcode:** Render lists from data, not JSX

### 3. Animations & IntersectionObserver

- Use `useScrollReveal()` hook for scroll-reveal effects (passes `ref` to elements)
- Or attach IntersectionObserver directly in components
- Avoid scroll event listeners (performance drain)

### 4. SEO & Meta Tags

- **File:** `components/SEO.tsx` (react-helmet-async)
- **Pattern:** Pass `title`, `description`, `image`, `url` to `<SEO />` at page level
- **GA ID:** Replace `G-XXXXXXXXXX` in SEO.tsx with real ID

### 5. Image Lazy Loading

- **File:** `components/LazyImage.tsx`
- **Pattern:** Use for portfolio images + project screenshots
- **Benefit:** Only loads images when scrolled into view

### 6. API Calls

- **URL pattern:** Always relative (`/api/endpoint`), never absolute
- **Why:** Vite proxy in dev, production backend handles routing
- **Example:** `fetch('/api/projects')` (not `http://localhost:8000/api/projects`)

---

## TypeScript Best Practices

1. **Build fails on type errors** — Run `npm run type-check` before commits
2. **Strict mode enabled** — All types must be explicit
3. **Component props:** Define via `interface Props { ... }`
4. **Hooks:** Type return values and dependencies

---

## Common Tasks

### Add New Section

1. Create `sections/NewSection.tsx` with TypeScript
2. Add to `HomePage.tsx` composition
3. Ensure section has `id="{newSectionName}"`
4. Add data to `portfolio.json` if needed
5. Run `npm run type-check`

### Add New Data to Portfolio

1. Edit `data/portfolio.json` (centralized source)
2. Update types if adding new properties
3. Component automatically re-renders (React reactivity)

### Integrate New API Endpoint

1. Use relative path: `fetch('/api/new-endpoint')`
2. Vite proxy forwards to Django in dev
3. Production uses backend URL

### Add Animation

1. Define keyframes in `index.css`
2. Use `useScrollReveal()` for scroll-triggered, or CSS `animation` for looping
3. Always check `prefers-reduced-motion` (see `index.css` examples)

---

## Related Files

- [../AGENTS.md](../AGENTS.md) — Project-wide conventions, commit format, architecture
- [PORTAFOLIO-SPEC.md](docs/PORTAFOLIO-SPEC.md) — Full feature specification
- [../recommendations.md](../recommendations.md) — Completed features + pending work (cleanup, A11y)
