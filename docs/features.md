# Features (verified against code)

## Authentication & Identity
- **GitHub OAuth login only** (`/auth/github/redirect` → `/auth/github/callback`). Stores `github_id`, `github_token`, `github_avatar_url`; auto-verifies email from GitHub.
- Logout via POST `/logout`.
- **Gist-based verification**: user creates a Gist containing a token (`verify-codex-<random>`), submits the gist URL; `VerifyGistJob` + `GistVerificationService` scan the user's 10 most recent gists for the token. Admin approves/rejects. Verified users get `is_verified`.
- Account deletion + GDPR-style data export: `/profile/download-data`, `DELETE /profile`.

## Feed
- Global and **Following** tabs (`/?tab=following`) — following tab includes your own posts.
- Posts paginated (10/page) with like counts, `is_liked`, and `is_following` flags per author.
- Sidebar: 5 random **verified** recommended users (stable across follow actions via session), top 10 starred own-repos from verified users.

## Blogging / Posts
- Create/edit/delete posts with **title, markdown body, cover image, excerpt, canonical URL, publish date**.
- Auto-derived on save: HTML render, reading time (200 wpm), auto-excerpt (160 chars), canonical URL fallback.
- Slugs auto-generated as `slug-title-random6`; URLs are `/u/{username}/{slug}`.
- Per-user blog index at `/@{username}/blog`.
- Cover images optimized to WebP by `ImageService` (Intervention Image).
- Link previews: first URL in post body is scraped for Open Graph data (queued job — currently broken, see architecture notes).

## Social
- Likes: toggle `POST /posts/{post}/like` (pivot table `likes`).
- Comments: create on post, delete own; latest-first.
- Follows: `POST /users/{user}/follow` (toggle); follower/following relations on User.
- Notifications: Laravel database notifications; `NewFollower` notification; recent-notifications polling endpoint + mark-as-read.

## Repositories
- Import repos from GitHub (`POST /repos/import`) using stored user token.
- Organize into **folders**, mark **own repos** (`is_own_repo`) and **featured** repos.
- Public repo showcase at `/@{username}/repos` with language/folder filters and sorting (name/stars/language).
- Toggle feature flag, refresh verification per repo.

## Profiles
- Public profile at `/@{username}` with bio, website, social links (JSON), avatar.
- Avatar upload (WebP) with revert-to-GitHub-avatar option.
- Explore/discover users at `/u/explore`.

## Admin
- Custom Inertia admin dashboard: user search/filter (pending verification, verified, banned), verify/unverify, ban/unban, delete, bulk actions; repo moderation (delete).
- Filament v4 panel at `/admin` (Amber theme): Users, Posts, Comments resources with full CRUD.

## Console Commands
- `php artisan app:migrate-posts` — one-off backfill converting legacy posts to the new schema (body_html, reading_time, excerpt).
