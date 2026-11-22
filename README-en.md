# Portfolio — Yordany Almeda Riveron

> Static single-page portfolio built with React 18, Vite, and TypeScript.

**Live site:** [portfolio-p6iv.onrender.com](https://portfolio-p6iv.onrender.com/)

## Local development

```bash
cd frontend
npm ci
npm run dev
```

Available checks:

```bash
npm run type-check
npm run test
npm run build
```

## Structure

- `frontend/src/sections/`: portfolio sections.
- `frontend/src/data/portfolio.json`: project, profile, and contact content.
- `frontend/public/`: screenshots, icons, `robots.txt`, and sitemap.
- `.github/workflows/ci-cd.yml`: validation and GitHub Pages deployment.

## Data and external services

- Public profile and repository data come from GitHub's public API. The site shares the request and follows available repository pages.
- The contact form sends messages through FormSubmit to the email in `frontend/src/data/portfolio.json`. FormSubmit may require confirming the recipient address before delivering the first message.
- The portfolio does not require a Django backend; its content is bundled with the frontend.

## Deployment

Render serves the frontend from `frontend/`. Configure the service to install dependencies with `npm ci`, run `npm run build`, and serve `frontend/dist`. GitHub Pages remains an alternate repository deployment.

## License

MIT © 2026 Yordany Almeda Riveron.
