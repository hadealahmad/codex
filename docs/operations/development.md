# Development Guide

## Prerequisites
- PHP 8.2+ with extensions: bcmath, ctype, curl, dom, fileinfo, mbstring, pdo, tokenizer, xml (+ gd for images)
- Composer
- Bun (or Node.js/npm)
- SQLite (default) or MySQL/MariaDB

## Setup

```bash
git clone <repository-url> && cd codex
composer install
bun install            # or npm install
cp .env.example .env   # then set GitHub OAuth creds (see below)
php artisan key:generate
php artisan migrate    # sqlite database is created automatically
```

### Required environment variables

```ini
APP_NAME=Codex
APP_URL=http://localhost:8000

# GitHub OAuth (required for login)
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_REDIRECT_URI="${APP_URL}/auth/github/callback"
```

Create the OAuth app at https://github.com/settings/developers with callback `http://localhost:8000/auth/github/callback`.

## Running in Dev

Single command (recommended) — runs server + queue worker + Pail (log tail) + Vite concurrently:

```bash
composer dev
```

Or manually:
```bash
php artisan serve        # backend → http://localhost:8000
bun run dev              # Vite dev server (HMR)
php artisan queue:listen # required for OG scraping & gist verification jobs
```

## Useful Commands

| Command | Purpose |
|---|---|
| `composer test` / `php artisan test` | Run PHPUnit tests (`tests/`) |
| `vendor/bin/pint` | Code style fixer |
| `php artisan wayfinder:generate` | Regenerate JS route/action bindings after route changes |
| `php artisan app:migrate-posts` | One-off legacy post backfill |
| `php artisan filament:optimize` | Optimize Filament panel |

## Testing & Linting

- Tests: PHPUnit 11 via `phpunit.xml` — run with `php artisan test`.
- PHP style: Laravel Pint.
- No frontend linter/test runner is currently configured.

## Notes
- Queue driver is `database`; features like link previews and gist verification will hang without a queue worker running.
- Uploaded images go to `storage/app/public` — run `php artisan storage:link`.
