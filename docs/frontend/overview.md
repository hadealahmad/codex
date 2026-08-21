# Frontend Overview

All frontend code lives in `resources/js` (React 19 + Inertia v2, JSX, no TypeScript for pages). Entry: `app.jsx`; Blade shell: `resources/views/app.blade.php`.

## Structure

```
resources/js/
├── app.jsx                  # Inertia app bootstrap
├── bootstrap.js             # axios setup
├── Layouts/Layout.jsx       # single global layout (RTL): nav, user menu,
│                            # notifications box, AddRepoDialog trigger, toasts
├── Pages/
│   ├── Feed.jsx             # global/following feed
│   ├── Welcome.jsx          # landing page
│   ├── Posts/{Create,Edit,Show,UserBlog}.jsx
│   ├── Profile/Show.jsx     # /@username profile
│   ├── Repos/UserRepos.jsx  # /@username/repos showcase
│   ├── Users/List.jsx       # explore users
│   ├── Notifications/Index.jsx
│   ├── Verification/Show.jsx
│   └── Admin/{Dashboard,Posts,Repos}.jsx
├── components/
│   ├── AddRepoDialog.jsx    # GitHub repo import dialog
│   ├── NotificationBox.jsx  # recent-notifications dropdown
│   ├── ModeToggle.jsx       # dark/light toggle (next-themes)
│   ├── Pagination.jsx
│   ├── TopProjects.jsx      # sidebar top repos
│   ├── UserHoverCard.jsx
│   └── ui/*                 # shadcn/ui primitives (Radix-based)
├── routes/                  # Wayfinder-generated typed route helpers
├── actions/                 # Wayfinder-generated controller action helpers
└── lib/utils.js             # cn() helper (clsx + tailwind-merge)
```

## Conventions

- Pages are resolved by Inertia from `resources/js/Pages` (dot notation matches directory).
- Server communication uses Wayfinder helpers (`import { route } from '@/routes/...'`) instead of hardcoded URLs — regenerate with `php artisan wayfinder:generate` after changing backend routes/controllers.
- Flash messages (`flash.success` / `flash.error`) are shown as sonner toasts from the Layout.
- Dark mode via `next-themes` with a `.dark` class variant.
- `components.json` configures shadcn/ui; add new primitives with the shadcn CLI into `components/ui`.

## Views (Blade)

Only three blade files exist: `app.blade.php` (Inertia root), `welcome.blade.php`, and a `partials/post-meta.blade.php` partial.
