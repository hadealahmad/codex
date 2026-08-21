# Codex

Codex is a social platform built for developers to share projects, publish blog posts, discuss ideas, and connect with peers. Built with Laravel 12 and React 19 via Inertia.js.

> 📚 **Full documentation lives in [`docs/`](docs/README.md)** — architecture, features, database schema, admin panel, styling guidelines, and operations.

## Tech Stack

- **Backend:** [Laravel](https://laravel.com) 12 (PHP 8.2+)
- **Frontend:** [React](https://react.dev) 19 + [Inertia.js](https://inertiajs.com) 2, built with [Vite](https://vite.dev) 7
- **UI Components:** [shadcn/ui](https://ui.shadcn.com) on Radix primitives, Tailwind CSS 4, lucide-react icons, sonner toasts
- **Admin Panel:** [Filament](https://filamentphp.com) v4 at `/admin`
- **Routing (FE↔BE):** [Wayfinder](https://github.com/laravel/wayfinder) typed route/action bindings
- **Runtime:** [Bun](https://bun.sh) (or Node.js)
- **Database:** SQLite (local default), MySQL/MariaDB (production)
- **Images:** Intervention Image 3 (WebP conversion)
- **Authentication:** GitHub OAuth only ([Laravel Socialite](https://github.com/laravel/socialite))
- **Queue / Cache / Sessions:** database driver

## Key Features

- Global & following feeds with likes, comments, and follow recommendations
- Developer blogging: markdown posts with cover images, auto-generated excerpts, reading time, slugs (`/u/{username}/{slug}`), and Open Graph link previews
- GitHub repo import & showcase with folders, featured repos, and language filters
- Gist-based account verification
- Public profiles at `/@{username}`, user explore page, notifications
- Admin: custom dashboard (user/verification/repo moderation) + Filament CRUD panel

See [docs/features.md](docs/features.md) for the full list.

## Project Structure

- **`app/Http/Controllers`** — backend logic (e.g., `FeedController`, `PostController`, `RepoController`)
- **`app/Filament/Resources`** — Filament v4 admin CRUD (Users, Posts, Comments)
- **`app/Models`** — Eloquent models (`User`, `Post`, `Repo`, `Comment`, `Verification`)
- **`app/Jobs`** — queued work (Open Graph scraping, gist verification)
- **`resources/js/Pages`** — Inertia pages rendered by React
- **`resources/js/components`** — reusable UI components (shadcn/ui based)
- **`resources/js/routes` & `resources/js/actions`** — Wayfinder-generated route bindings (regenerate with `php artisan wayfinder:generate`)
- **`routes/web.php`** — all web routes

## Local Development

### Prerequisites

- PHP 8.2+, Composer, Bun (or Node.js), a database (SQLite works out of the box)

### Installation

```bash
git clone <repository-url> && cd codex
composer install
bun install
cp .env.example .env
```

Set your GitHub OAuth credentials in `.env`:

```ini
APP_NAME=Codex
APP_URL=http://localhost:8000

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI="${APP_URL}/auth/github/callback"
```

Then:

```bash
php artisan key:generate
php artisan migrate
php artisan storage:link
composer dev
```

`composer dev` runs everything concurrently: `php artisan serve`, queue worker, Pail (log tail), and Vite. The app is available at `http://localhost:8000`.

> The queue worker is required for Open Graph link previews and gist verification.

More details: [docs/operations/development.md](docs/operations/development.md).

## Deployment

See [docs/operations/deployment.md](docs/operations/deployment.md) for the Virtualmin/Apache production guide, Supervisor setup, and the self-hosted GitHub Actions runner workflow.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Open-sourced under the [MIT license](LICENSE).
