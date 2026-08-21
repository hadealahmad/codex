# Services & Jobs

## Services

### GistVerificationService (`app/Services/GistVerificationService.php`)
- `findVerificationGist(User $user, string $token): ?string`
- Fetches the user's last 10 public gists from the GitHub API; uses the stored `github_token` for higher rate limits / secret gist access.
- Downloads each file's raw content and returns the `html_url` of any gist containing the token.

### ImageService (`app/Services/ImageService.php`)
- `store(UploadedFile $file, string $path, int $quality = 80): string`
- Intervention Image v3 (GD driver). Re-encodes to **WebP**, strips metadata, saves to the `public` disk as `<path>/<uniqid>.webp`.

## Jobs (queue: database)

### FetchOpenGraphData
- Dispatched on Post created / body_markdown changed.
- Extracts the first URL in the post body, fetches it (5s timeout), parses `og:title`, `og:description`, `og:image` (falls back to `<title>`).
- Stores the result in `posts.og_data` (JSON, cast to array on the model). The column was dropped in migration `2026_01_02_210433` and restored in `2026_08_21_000000`.

### VerifyGistJob
- Dispatched when a user submits a gist URL for verification.
- Uses `GistVerificationService` to confirm the token exists in one of the user's gists; updates the `Verification` record status accordingly.
