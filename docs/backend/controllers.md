# Controllers & Routes

All routes live in `routes/web.php` (no separate API routes). Auth middleware: `auth`; admin middleware: `auth` + `admin` (`CheckAdmin`).

## Public Routes

| Method | URI | Controller@method | Name |
|---|---|---|---|
| GET | `/` | FeedController@index | `home` |
| GET | `/feed` | FeedController@index | `feed` |
| GET | `/auth/github/redirect` | AuthController@redirect | `login` |
| GET | `/auth/github/callback` | AuthController@callback | — |
| POST | `/logout` | AuthController@logout | `logout` |
| GET | `/@{username}/repos` | RepoController@userRepos | `repos.user_repos` |
| GET | `/@{username}/blog` | PostController@userBlog | `posts.user_blog` |
| GET | `/@{username}` | ProfileController@show | `profile.show` |
| GET | `/u/{username}/{slug}` | PostController@show | `posts.show` |
| GET | `/u/explore` | ProfileController@explore | `users.explore` |

## Authenticated Routes (`auth`)

**Verification**
- GET/POST `/verification` — show form / submit gist URL (`verification.show`, `verification.store`)
- POST `/verification/scan` — re-scan gists (`verification.scan`)

**Repos**
- Resource (store/update/destroy only): `/repos`
- POST `/repos/import` — GitHub import
- POST `/repos/{repo}/toggle-feature`
- POST `/repos/{repo}/refresh-verification`

**Posts / Social**
- GET `/posts/create`, POST `/posts`, GET `/posts/{post}/edit`, PUT `/posts/{post}`, DELETE `/posts/{post}`
- POST `/posts/{post}/like` — LikeController@toggle
- POST `/posts/{post}/comments`, DELETE `/comments/{comment}`
- POST `/users/{user}/follow`

**Notifications**
- GET `/notifications`, GET `/notifications/recent`, POST `/notifications/{id}/read`

**Profile**
- POST `/profile/update`, POST `/profile/revert-avatar`, POST `/profile/social-links`
- GET `/profile/download-data`, DELETE `/profile`

## Admin Routes (`auth` + `admin`, prefix `/admin`)

- GET `/admin/dashboard` — AdminController@index
- POST `/admin/verifications/{id}/approve` · `/reject`
- POST `/admin/users/{id}/verify` · `/unverify` · `/ban` · `/unban`
- DELETE `/admin/users/{id}`, POST `/admin/users/bulk-action`
- GET `/admin/repos`, DELETE `/admin/repos/{id}`

(Post moderation routes are commented out in web.php — handled via Filament instead.)

## Filament Panel

Filament registers its own routes at `/admin` (login, dashboard, resources) via `AdminPanelProvider`. Access requires `is_admin`.
