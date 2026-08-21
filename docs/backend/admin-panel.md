# Admin Panel

Codex has **two** admin surfaces:

## 1. Filament v4 Panel (`/admin`)

Configured in `app/Providers/Filament/AdminPanelProvider.php`:
- Default panel, path `admin`, has its own login page.
- Primary color: Amber.
- Access gated by `User::canAccessPanel()` → `is_admin`.

Resources (Filament v4 split structure: `Schemas/`, `Tables/`, `Pages/`):
- `app/Filament/Resources/Users/` — UserResource + Create/Edit/List pages, UserForm, UsersTable
- `app/Filament/Resources/Posts/` — PostResource + form/table
- `app/Filament/Resources/Comments/` — CommentResource + form/table

## 2. Custom Inertia Admin (`/admin/dashboard`, `/admin/repos`)

React pages in `resources/js/Pages/Admin/` (Dashboard, Posts, Repos) served by `AdminController` with the `CheckAdmin` middleware:
- User management: search (name/username/email), filters (pending verification / verified / banned), verify/unverify, ban/unban, delete, bulk actions.
- Verification moderation: approve/reject pending gist verifications.
- Repo moderation: list and delete repos.

Note: the custom admin dashboard route (`GET /admin/dashboard`) and Filament's `/admin` are separate route sets; both require admin but use different auth flows (session auth vs. Filament login).
