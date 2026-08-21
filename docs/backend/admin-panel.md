# Admin Panel

Codex has a **single** admin surface: the custom Inertia admin at `/admin/*` (the Filament panel was removed in favor of this dashboard).

React pages in `resources/js/Pages/Admin/` (Dashboard, Repos) served by `AdminController` with the `admin` middleware alias (`CheckAdmin`):
- User management: search (name/username/email), filters (pending verification / verified / banned), verify/unverify, ban/unban, delete, bulk actions.
- Verification moderation: approve/reject pending gist verifications.
- Repo moderation: list and delete repos.

Post moderation is available through the standard post routes plus policies (`PostPolicy` allows admins to delete any post).

