# Database Schema Reference

Connection: SQLite by default (`database/database.sqlite`), MySQL/MariaDB in production. Queue, cache, and sessions all use the database driver.

## Tables

### users
| Column | Type | Notes |
|---|---|---|
| id | bigint PK | |
| name | string | |
| email | string unique | auto-verified from GitHub |
| email_verified_at | timestamp nullable | |
| password | string nullable | null for OAuth users |
| remember_token | string nullable | |
| github_id | string | OAuth identity |
| username | string | profile handle (`/@{username}`) |
| avatar_url / github_avatar_url | string nullable | uploaded vs GitHub avatar |
| bio | text nullable | |
| website_url | string nullable | |
| social_links | json nullable | cast to array |
| is_verified | boolean | gist-verified badge |
| status | string | e.g. `banned` |
| is_admin | boolean | + hardcoded admin username |
| github_token | string nullable | used for repo import & gist scan |
| timestamps | — | |

### repos
id, user_id FK→users (cascade), github_repo_id (string), name, description (text), url, language (nullable), stars (int, default 0), user_notes (text nullable), folder (string nullable), is_own_repo (bool), is_featured (bool), timestamps.

### posts
| Column | Type | Notes |
|---|---|---|
| id | bigint PK | |
| user_id | FK → users cascade | |
| slug | string unique | `title-slug-random6` |
| title | string | added 2025_12_24 |
| body_markdown | longText | renamed from `content` |
| body_html | longText nullable | derived by PostObserver |
| excerpt | text nullable | auto: first 160 chars |
| cover_image_path | string nullable | renamed from `thumbnail`; WebP on public disk |
| reading_time | int nullable | minutes @200wpm |
| canonical_url | string nullable | |
| published_at | timestamp nullable | indexed; composite index with is_featured |
| is_featured | bool default false | |
| views_count | bigint default 0 | column exists, not yet incremented in code |
| og_data | json nullable | OG link preview data; restored in 2026_08_21 migration |
| deleted_at | softDeletes | schema only; model lacks SoftDeletes trait |
| timestamps | — | |

### comments
id, user_id FK, post_id FK (both cascade), content (text), timestamps.

### follows
Composite PK (`follower_id`, `following_id`), both FK→users cascade, created_at (default now). No updated_at.

### likes
Pivot user↔post with timestamps (created 2025_12_23).

### verifications
id, user_id FK, gist_url (string), token (string, added 2025_12_23), status (string, default `pending`: pending/approved/rejected), timestamps.

### notifications
Laravel standard: uuid PK, type, notifiable morphs, data (text), read_at nullable, timestamps.

### Standard Laravel tables
cache, jobs (queue), sessions, plus job batching/failing tables.
