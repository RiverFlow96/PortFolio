# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Setup
- **Backend:**
    ```bash
    cd backend
    cp .env.example .env # Edit .env with SECRET_KEY, DEBUG, ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS
    source .venv/bin/activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py createsuperuser # Optional: create an admin user
    ```
- **Frontend:**
    ```bash
    cd frontend
    cp .env.example .env # Variables must use VITE_ prefix
    npm install
    ```

### Running the Application
- **Backend:**
    ```bash
    cd backend
    source .venv/bin/activate
    python manage.py runserver # Runs on http://localhost:8000
    ```
- **Frontend:**
    ```bash
    cd frontend
    npm run dev # Runs on http://localhost:5173
    ```

### Building and Testing
- **Frontend Build:**
    ```bash
    cd frontend
    npm run build # Creates a production build in the `dist/` folder
    npm run preview # Previews the production build
    npm run type-check # Validates TypeScript without bundling
    ```
- **Backend Migrations:**
    ```bash
    cd backend
    source .venv/bin/activate
    python manage.py migrate # Applies database migrations
    ```

### Linting (Implicit from dependencies and project structure)
- **Frontend:** ESLint (likely configured via `package.json` scripts, though not explicitly listed)
- **Backend:** Python linters (e.g., Black, Flake8 - not explicitly listed, but common for Django projects)

## High-Level Code Architecture

This repository contains a full-stack portfolio application with a decoupled frontend and backend.

### Frontend (React 18 + Vite + TypeScript)
- **Location:** `frontend/`
- **Frameworks/Libraries:** React, Vite, TypeScript, Tailwind CSS, React Router DOM.
- **Structure:**
    - `src/components/`: Reusable UI components (e.g., `SEO`, `LazyImage`).
    - `src/sections/`: Page sections that compose individual pages (e.g., `Hero`, `About`, `Projects`).
    - `src/pages/`: Compositions of sections to form complete pages.
    - `src/hooks/`: Custom React hooks for various functionalities (e.g., scroll reveal, portfolio data fetching).
    - `src/data/`: Centralized data source, specifically `portfolio.json`.
    - `src/layout/`: Global layout components like `Navbar` and `Footer`.
    - `src/index.css`: Global design tokens, CSS variables, and animations.
- **API Interaction:** Uses a Vite proxy in development (`frontend/vite.config.ts`) to forward `/api` and `/media` requests to the Django backend running on `http://localhost:8000`. In production, `VITE_API_URL` environment variable is used.
- **SEO & Performance:** Implements dynamic meta tags, JSON-LD, sitemap, robots.txt, PWA service worker, lazy loading for images, code splitting, and `prefers-reduced-motion`.

### Backend (Django 5 + Django REST Framework)
- **Location:** `backend/`
- **Frameworks/Libraries:** Django, Django REST Framework (DRF), PostgreSQL (SQLite for development).
- **Structure:**
    - `config/`: Contains core Django settings and root URL configurations.
    - `apps/`: Houses individual Django applications (e.g., `users`, `listings`, `categories`, `reports`), each potentially having its own models, views, serializers, and URLs.
- **API Endpoints:**
    - `GET /api/users/`: Lists users.
    - `GET /api/listings/`: Lists portfolio items.
    - `GET /api/categories/`: Lists project categories.
    - `POST /api/reports/`: Handles contact form submissions.
- **Deployment:** Uses `gunicorn` for serving in production. Requires environment variables for `SECRET_KEY`, `DEBUG=false`, `ALLOWED_HOSTS`, `DATABASE_URL`, and `CORS_ALLOWED_ORIGINS`.

## Commit Conventions

The project follows Conventional Commits specification: `<type>(<scope>): <description>`.
- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Examples:**
    - `feat(frontend): add project filtering by tech stack`
    - `fix(contact): resolve form validation error on empty email`
    - `docs(AGENTS): update commit conventions`