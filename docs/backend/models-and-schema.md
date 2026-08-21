# Models & Relationships

## ER Diagram

```
┌──────────┐ 1     * ┌─────────────┐ *     1 ┌──────────┐
│  User    │─────────│    Post     │─────────│ Comment  │
│          │         │             │         └──────────┘
│          │◄────────│ user_id     │
│          │ 1     * └──────┬──────┘
│          │                │ *           likes (pivot: user_id, post_id)
│          │────────────────┤
│          │                │ *
│          │ 1     * ┌──────▼──────┐
│          │─────────│    Repo     │
│          │         └─────────────┘
│          │ 1     * ┌─────────────┐
│          │─────────│Verification │
│          │         └─────────────┘
│          │   *   * ┌─────────────┐
│          │─────────│   follows   │ (pivot: follower_id, following_id)
└──────────┘         └─────────────┘
```

## User
- Fillable: name, email, password, github_id, username, avatar_url, github_avatar_url, bio, website_url, social_links (array), is_verified, status, is_admin, github_token, email_verified_at.
- Relations: `repos`, `posts`, `comments`, `verifications`, `followers`/`following` (self-referencing via `follows`), `likedPosts` (via `likes`).
- Implements `FilamentUser::canAccessPanel()` → requires `is_admin`.
- ⚠️ `is_admin` accessor returns true if `username === 'hadealahmad'` regardless of DB value.
- Scope: `scopeIsFollowing($query, $userId)`.

## Post
- Fillable: user_id, slug, title, body_markdown, cover_image_path, excerpt, canonical_url, published_at. Casts published_at as datetime.
- Appended attributes: `content` (= body_markdown), `thumbnail` (= cover_image_path) — legacy compatibility.
- `cover_image_path` accessor prefixes `asset('storage/')` for local paths.
- Model events dispatch `FetchOpenGraphData` on create / body change.
- Relations: `user`, `likes` (belongsToMany User via `likes`), `comments` (latest first).
- Soft deletes enabled at schema level (`deleted_at` column; no `SoftDeletes` trait on the model yet).

## Repo
- Fillable: user_id, github_repo_id, name, description, url, language, stars, user_notes, folder, is_own_repo (bool), is_featured (bool).

## Comment
- Fillable: user_id, post_id, content. Relations: `user`, `post`.

## Verification
- Fillable: user_id, gist_url, status (`pending` | `approved` | `rejected`), token.

## Notifications
Laravel's built-in database notifications table is used (e.g., `NewFollower`).
