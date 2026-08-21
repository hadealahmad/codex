# Codex — Documentation

Codex is a social platform for developers to showcase projects, publish blog posts, and connect with peers. Built with **Laravel 12 + Inertia v2 + React 19**, authenticated via **GitHub OAuth**.

> The UI is primarily **Arabic (RTL)** — the layout uses `dir="rtl"` and IBM Plex Sans Arabic as the base font.

## Documentation Map

```
docs/
├── README.md                  ← you are here
├── architecture.md            ← system overview, request flow, diagrams
├── features.md                ← full feature list matched against the code
├── backend/
│   ├── overview.md            ← app/ structure: Actions, Services, Jobs, Observers, Repositories
│   ├── controllers.md         ← every HTTP controller & its routes
│   ├── models-and-schema.md   ← Eloquent models, relationships, DB schema chart
│   ├── services-and-jobs.md   ← GistVerificationService, ImageService, queued jobs
│   └── admin-panel.md         ← Filament v4 admin panel + custom /admin routes
├── frontend/
│   ├── overview.md            ← resources/js structure: Pages, Layouts, components
│   ├── wayfinder.md           ← generated routes/actions (resources/js/routes, actions)
│   └── styling.md             ← design guidelines, theming, Tailwind v4 setup
├── database/
│   ├── schema.md              ← table-by-table schema reference
│   └── migrations.md          ← migration history & notes
└── operations/
    ├── deployment.md          ← production deployment (moved from root DEPLOYMENT.md)
    └── development.md         ← how to run locally, tooling, testing
```

## Tech Stack

| Layer      | Technology |
|------------|------------|
| Backend    | PHP 8.2+, Laravel 12 |
| Frontend   | React 19, Inertia.js 2, Vite 7 |
| Styling    | Tailwind CSS 4, shadcn/ui (Radix), lucide-react icons, sonner toasts |
| Admin      | Custom Inertia dashboard (`/admin/*`) |
| Auth       | Laravel Socialite (GitHub OAuth) |
| Images     | Intervention Image 3 (WebP conversion) |
| DB         | SQLite (default/local), MySQL/MariaDB (production) |
| Queue/Cache/Sessions | Database driver |
| JS runtime | Bun (or npm) |

## Quick Start

```bash
composer install && bun install
cp .env.example .env
php artisan key:generate
php artisan migrate
composer dev        # runs server + queue + pail + vite concurrently
```

See [operations/development.md](operations/development.md) for details.
