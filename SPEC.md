# SPEC.md - Frontend-only Portfolio Refactor and Enhancements

## Goal
Transform the current fullstack portfolio into a robust, performant, and accessible frontend-only application by completely removing the non-functional Django backend and implementing identified improvements.

## Methodology
Spec-Driven Development (SDD) will be followed. This document serves as the primary specification for all changes, detailing each task, its rationale, and acceptance criteria.

## Backend Removal Strategy
All backend-related files and configurations will be systematically removed, ensuring no lingering dependencies or errors.

## Frontend Architecture Post-Backend Removal
The frontend will operate as a standalone Single Page Application (SPA), relying entirely on client-side data sources (e.g., `portfolio.json`, direct third-party API calls).

## Implementation Plan

### Phase 1: Backend Elimination & Frontend Cleanup
1.  **Remove Backend Directory and Files**
    *   Rationale: The backend is non-functional and will not be used.
    *   Tasks:
        *   Delete the `backend/` directory entirely.
        *   Remove `backend/` references from `.gitignore`.
        *   Update `README.md` and `README-en.md` to reflect a frontend-only project.
    *   Acceptance Criteria:
        *   `backend/` directory is no longer present.
        *   Project structure reflects a frontend-only application.

2.  **Adjust Frontend for Backend Absence**
    *   Rationale: The frontend currently expects a backend for API calls and media.
    *   Tasks:
        *   Remove `/api` and `/media` proxy configurations from `frontend/vite.config.ts`.
        *   Review `frontend/src` for any direct backend API calls or assumptions about a running backend.
        *   Update `Contact.tsx` to remove mock API call and integrate with a third-party form service (e.g., Formspree).
    *   Acceptance Criteria:
        *   `vite.config.ts` no longer contains proxy rules for backend.
        *   Contact form submissions are handled by a third-party service.
        *   No runtime errors due to missing backend APIs.

### Phase 2: Core Enhancements & Technical Debt Resolution

3.  **Implement Comprehensive Frontend Testing**
    *   Rationale: Improve code quality, prevent regressions, and ensure maintainability.
    *   Tasks:
        *   Install and configure Vitest and React Testing Library for unit/integration tests in `frontend/`.
        *   Install and configure Playwright for end-to-end (E2E) testing.
        *   Write initial suite of unit, integration, and E2E tests for critical components/flows (e.g., `Hero.tsx`, `Projects.tsx`, navigation, contact form submission).
    *   Acceptance Criteria:
        *   Test framework installed and configured.
        *   Core features covered by tests.
        *   Tests pass successfully.

4.  **Establish CI/CD Pipeline for Frontend**
    *   Rationale: Automate quality checks and streamline deployment.
    *   Tasks:
        *   Create GitHub Actions workflow (`.github/workflows/main.yml`) for linting, type-checking, running tests, and building the frontend.
        *   Configure deployment to a static hosting service (e.g., Vercel, Netlify) on successful build.
    *   Acceptance Criteria:
        *   CI/CD pipeline runs on pushes to `main` and PRs.
        *   All checks (lint, type-check, test, build) pass.
        *   Successful deployment to hosting environment.

5.  **Unify Tech Stack Data Source**
    *   Rationale: Eliminate data duplication and ensure a single source of truth.
    *   Tasks:
        *   Remove hardcoded `technologies` array from `frontend/src/sections/TechStack.tsx`.
        *   Ensure `frontend/src/data/portfolio.json` is the sole source for tech stack data, consumed via `frontend/src/hooks/usePortfolio.ts`.
    *   Acceptance Criteria:
        *   `TechStack.tsx` fetches data from `portfolio.json`.
        *   No redundant tech stack definitions.

6.  **Implement GitHub API Caching and Rate Limit Handling**
    *   Rationale: Improve performance and reliability of GitHub data fetching.
    *   Tasks:
        *   Modify `frontend/src/hooks/useGitHubData.ts` to implement client-side caching (e.g., `localStorage` or `IndexedDB`) for GitHub API responses.
        *   Add logic to handle GitHub API rate limits gracefully (e.g., display a message, use cached data).
    *   Acceptance Criteria:
        *   GitHub data is cached and re-fetched only when necessary or cache expires.
        *   Application behaves gracefully under API rate limits.

### Phase 3: Polish & Advanced Optimizations

7.  **Refactor Inline Styles and Magic Numbers**
    *   Rationale: Improve maintainability, themeability, and design consistency.
    *   Tasks:
        *   Extract hardcoded values (radii, sizes, speeds, colors) from `orbiting-skills.tsx`, `Hero.tsx`, `Projects.tsx` into Tailwind CSS config or CSS variables.
        *   Remove inline `<style>` injection from `FloatingParticles.tsx` and use CSS modules or Tailwind.
    *   Acceptance Criteria:
        *   Reduced inline styles and magic numbers.
        *   Consistent styling across components.

8.  **Enhance Accessibility (A11y)**
    *   Rationale: Ensure the portfolio is usable by everyone, including users with disabilities.
    *   Tasks:
        *   Add `role="log"`, `aria-live` regions, and keyboard navigation support for history in `Terminal.tsx`.
        *   Implement `aria-describedby` for form error messages in `Contact.tsx` and improve validation feedback.
        *   Implement focus trap for the mobile menu in `Navbar.tsx`.
        *   Ensure `orbiting-skills.tsx` animations respect `prefers-reduced-motion` media query.
    *   Acceptance Criteria:
        *   All identified A11y gaps are addressed.
        *   Keyboard navigation is functional for interactive elements.
        *   Animations are disabled for users preferring reduced motion.

9.  **Configure Robust PWA Service Worker**
    *   Rationale: Enable offline capabilities and improve loading performance.
    *   Tasks:
        *   Integrate a Workbox-based PWA plugin (e.g., `vite-plugin-pwa`) into `frontend/vite.config.ts`.
        *   Configure `frontend/src/main.tsx` to register the new service worker.
        *   Implement caching strategies for assets and API responses (if applicable for a frontend-only app).
    *   Acceptance Criteria:
        *   Service worker is correctly registered and active.
        *   Application functions offline with cached assets.

10. **Stricter TypeScript Configuration**
    *   Rationale: Catch more potential errors at compile time and improve code robustness.
    *   Tasks:
        *   Add `"noUncheckedIndexedAccess": true` and `"exactOptionalPropertyTypes": true` to `frontend/tsconfig.json`.
        *   Refactor code in `TechStack.tsx` and `Contact.tsx` to remove `any` types.
    *   Acceptance Criteria:
        *   New TypeScript rules are enforced without errors.
        *   No `any` types in `TechStack.tsx` and `Contact.tsx`.

11. **Optimize Bundle Size and Performance**
    *   Rationale: Improve application load times and responsiveness.
    *   Tasks:
        *   Refactor `react-icons` imports to import only necessary icons (e.g., direct imports `import { FaIcon } from 'react-icons/fa';` instead of `import * as FaIcons from 'react-icons/fa';`).
        *   Implement React.lazy and Suspense for code splitting `frontend/src/sections/` components.
        *   Optimize `orbiting-skills.tsx` by conditionally rendering animations or reducing update frequency on lower-end devices/background tabs.
        *   Investigate integrating a web-vitals reporting library.
    *   Acceptance Criteria:
        *   Reduced bundle size.
        *   Sections lazy-load as user scrolls.
        *   Improved animation performance.

12. **Enhance SEO Components**
    *   Rationale: Improve search engine visibility and social media presentation.
    *   Tasks:
        *   Replace placeholder GA ID in SEO component with a real ID.
        *   Update Open Graph (OG) image to use an actual portfolio screenshot.
        *   Implement dynamic sitemap generation (e.g., using a Vite plugin or a script that generates `sitemap.xml` based on `portfolio.json`).
    *   Acceptance Criteria:
        *   Correct GA ID configured.
        *   Relevant OG image for social sharing.
        *   `sitemap.xml` dynamically generated and accessible.

13. **Consolidate Duplicate Icon Imports**
    *   Rationale: Reduce bundle size and improve consistency.
    *   Tasks:
        *   Review all component files (`About.tsx`, `Contact.tsx`, `TechStack.tsx`, `orbiting-skills.tsx`) for duplicate `react-icons` imports.
        *   Create a centralized icon component or utility if appropriate, or ensure direct imports are consistent and minimal.
    *   Acceptance Criteria:
        *   No duplicate `react-icons` imports across different files.
        *   Reduced icon-related bundle size.

### Phase 4: Developer Experience & Image Optimization

14. **Improve Code Organization**
    *   Rationale: Enhance code readability, reusability, and maintainability.
    *   Tasks:
        *   Split `frontend/src/hooks/usePortfolio.ts` into smaller, domain-specific hook files (e.g., `useProjects.ts`, `useContact.ts`).
        *   Refactor `sections/` components to use a React Context/Provider for data rather than direct `usePortfolio` imports.
        *   Extract `AnimatedCounter` component from `frontend/src/sections/About.tsx` into a reusable UI component (e.g., `frontend/src/components/ui/AnimatedCounter.tsx`).
    *   Acceptance Criteria:
        *   `usePortfolio.ts` is refactored.
        *   Sections consume data via Context.
        *   `AnimatedCounter` is a standalone component.

15. **Enhance Developer Experience (DX)**
    *   Rationale: Streamline development workflow and maintain code style.
    *   Tasks:
        *   Install and configure ESLint with React and TypeScript rules.
        *   Install and configure Prettier for code formatting.
        *   Integrate Husky and create pre-commit hooks for linting, formatting, and type-checking.
        *   Consider setting up Storybook for isolated component development.
    *   Acceptance Criteria:
        *   ESLint and Prettier enforce code style.
        *   Pre-commit hooks ensure code quality before commits.
        *   Storybook (optional) is set up for component development.

16. **Optimize Images**
    *   Rationale: Improve loading performance and reduce bandwidth usage.
    *   Tasks:
        *   Convert project screenshots (currently PNGs in `dist/`) to modern formats like WebP or AVIF.
        *   Implement Low-Quality Image Placeholders (LQIP) or blur-up technique for `LazyImage` component.
        *   Implement `srcset` and `sizes` attributes for responsive image loading.
    *   Acceptance Criteria:
        *   Images are served in optimized formats.
        *   `LazyImage` displays LQIPs.
        *   Responsive images load appropriately for different screen sizes.

17. **Implement Internationalization (I18n)**
    *   Rationale: Support multiple languages for broader audience reach.
    *   Tasks:
        *   Integrate an i18n framework (e.g., `react-i18next`).
        *   Extract all hardcoded Spanish strings from components into translation files.
        *   Implement language switching functionality.
    *   Acceptance Criteria:
        *   Application supports at least two languages (e.g., Spanish and English).
        *   All user-facing text is translated.
        *   Language can be switched by the user.
