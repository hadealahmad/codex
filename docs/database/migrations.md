# Migration History

| Migration | Purpose |
|---|---|
| `0001_01_01_000000_create_users_table` | users, password_reset_tokens, sessions |
| `0001_01_01_000001_create_cache_table` | cache + cache_locks |
| `0001_01_01_000002_create_jobs_table` | jobs, job_batches, failed_jobs |
| `2025_01_01_000000_create_codex_tables` | repos, posts (legacy: content/thumbnail/og_data), comments, follows, notifications, verifications |
| `2025_12_23_195419_add_token_to_verifications_table` | gist verification token |
| `2025_12_23_201105_add_og_data_to_posts_table` | og_data json (later removed) |
| `2025_12_23_201751_add_is_admin_to_users_table` | is_admin boolean |
| `2025_12_23_213608_create_likes_table` | likes pivot |
| `2025_12_23_220050_add_folder_to_repos_table` | folder column |
| `2025_12_23_220751_add_is_own_repo_to_repos_table` | is_own_repo boolean |
| `2025_12_24_084812_add_github_avatar_url_to_users_table` | github_avatar_url |
| `2025_12_24_095608_add_is_featured_to_repos_table` | is_featured boolean |
| `2025_12_24_102310_add_thumbnail_to_posts_table` | thumbnail (renamed later) |
| `2025_12_24_115530_add_title_to_posts_table` | title |
| `2026_01_02_210433_update_posts_table_structure` | **blog overhaul**: rename content→body_markdown, thumbnail→cover_image_path; add excerpt, body_html, reading_time, canonical_url, is_featured, views_count, softDeletes; drop og_data; add indexes |

## Post-Migration Backfill
After the 2026_01_02 migration, run the one-off backfill command:

```bash
php artisan app:migrate-posts
```

It chunks through posts and fills `body_html`, `reading_time`, and `excerpt`.
