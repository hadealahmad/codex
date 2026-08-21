# Backend Overview

Structure of `app/` by responsibility:

## Actions
- `Actions/Post/CreatePostAction.php` — transactional post creation: uploads cover image via `ImageService`, generates slug (`Str::slug` + 6 random chars), sets defaults for excerpt/published_at.

## Console Commands
- `Console/Commands/MigratePosts.php` — signature `app:migrate-posts`; chunks posts (100) and backfills `body_html`, `reading_time`, `excerpt`.

## Filament (see admin-panel.md)
- Resources for Users, Posts, Comments using the Filament v4 split structure (`Schemas/`, `Tables/`, `Pages/`).

## HTTP Layer
- Controllers: Auth, Feed, Post, Comment, Like, Follow, Notification, Profile, Repo, Verification, Admin.
- Middleware: `CheckAdmin` (admin gate), `HandleInertiaRequests` (shares `auth.user` and `flash`).
- FormRequest: `StorePostRequest`. API Resource: `UserListingResource`.

## Jobs
- `FetchOpenGraphData` — scrapes first URL in a post for OG tags. ⚠️ Writes to removed `og_data` column; needs updating.
- `VerifyGistJob` — async gist verification scan.

## Models
Five models: `User`, `Post`, `Repo`, `Comment`, `Verification` — see models-and-schema.md.

## Notifications
- `NewFollower` — database notification sent when a user gains a follower.

## Observers
- `PostObserver` — on `saving`: markdown→HTML, reading time, auto-excerpt, canonical URL fallback.

## Providers
- `AppServiceProvider` — registers `PostObserver`.
- `Filament/AdminPanelProvider` — default panel at `/admin`, Amber primary color, login page enabled.

## Repositories
- `UserRepository::filterForUser()` — verified filter + sorting; also defines a local `SortDirection` enum.

## Services
- `GistVerificationService` — scans a user's last 10 gists (authed with their GitHub token when available) for the verification token.
- `ImageService` — converts any upload to WebP (quality 80), strips metadata, stores on `public` disk with a uniqid filename.
