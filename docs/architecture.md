# Architecture

## Overview

Codex is a monolithic Laravel application using **Inertia.js** as the glue between backend and frontend. There is no separate API — controllers render React pages directly via `Inertia::render()`.

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
│   React 19 SPA (resources/js) — Inertia client, no SSR      │
└──────────────▲──────────────────────────────┬───────────────┘
               │ Inertia JSON responses       │ Wayfinder typed
               │ (X-Inertia headers)          │ route/action helpers
┌──────────────┴──────────────────────────────▼───────────────┐
│                     Laravel 12 (routes/web.php)             │
│                                                             │
│  Controllers ──► Actions/Services ──► Eloquent Models       │
│       │                  │                                  │
│       │            Jobs (database queue)                     │
│       │                  │                                  │
│  Filament v4 panel (/admin)   GitHub API / OG scraping      │
└─────────────────────────────────────────────────────────────┘
               │
        SQLite / MySQL + storage/app/public (images)
```

## Request Flow

1. `routes/web.php` maps all URLs. Public routes: feed, profiles (`/@{username}`), blog posts (`/u/{username}/{slug}`), explore.
2. Auth is exclusively **GitHub OAuth** via Socialite (`AuthController`). Scopes: `read:user`, `user:email`, `public_repo`.
3. Admin area: custom `/admin/*` routes guarded by `auth` + `admin` middleware (`CheckAdmin`) → custom Inertia admin pages (`Pages/Admin/*`). Access requires `is_admin`. Authorization for user-owned resources is handled by Policies (`app/Policies`).
4. Heavy work is queued on the `database` connection: `FetchOpenGraphData`, `VerifyGistJob`.

## Key Patterns

- **Observer**: `PostObserver` hooks `saving` to derive `body_html` (markdown), `reading_time` (200 wpm), auto-excerpt, and canonical URL whenever `body_markdown` changes.
- **Model events**: `Post::created/updated` dispatches `FetchOpenGraphData` for link previews.
- **Action class**: `App\Actions\Post\CreatePostAction` wraps post creation in a DB transaction with cover-image upload (WebP via `ImageService`).
- **Repository**: `UserRepository` provides filtered/sorted user queries (used by explore/user listing).
- **Wayfinder**: `php artisan wayfinder:generate` produces typed JS bindings in `resources/js/routes/` and `resources/js/actions/` so React calls Laravel routes without hardcoded URLs.

## Directory Map

```
app/
├── Actions/Post/CreatePostAction.php     # transactional post creation
├── Console/Commands/MigratePosts.php     # one-off backfill: app:migrate-posts
├── Http/
│   ├── Controllers/                      # controllers (see backend/controllers.md)
│   ├── Middleware/CheckAdmin.php         # blocks non-admins from /admin
│   ├── Middleware/HandleInertiaRequests.php
│   ├── Requests/StorePostRequest.php
│   └── Resources/UserListingResource.php # API resource for user listings
├── Jobs/{FetchOpenGraphData,VerifyGistJob}.php
├── Models/{User,Post,Repo,Comment,Verification}.php
├── Notifications/NewFollower.php
├── Observers/PostObserver.php
├── Policies/{PostPolicy,CommentPolicy,RepoPolicy}.php  # authorization
├── Providers/AppServiceProvider.php      # registers PostObserver
├── Repositories/UserRepository.php
└── Services/{GistVerificationService,ImageService}.php
```

## Notable Quirks / Important Notes

- `User::getIsAdminAttribute()` hardcodes username `hadealahmad` as always-admin.
- `FetchOpenGraphData` stores scraped Open Graph data in the `og_data` JSON column (restored in migration `2026_08_21_000000` after being dropped in `2026_01_02_210433`).- `Post` exposes compatibility accessors `content` (= `body_markdown`) and `thumbnail` (= `cover_image_path`) for older frontend code.
- The layout is RTL Arabic; flash messages and some errors are written in Arabic.
