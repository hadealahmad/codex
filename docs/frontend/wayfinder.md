# Wayfinder (Generated Route/Action Bindings)

Codex uses [Laravel Wayfinder](https://github.com/laravel/wayfinder) + `@laravel/vite-plugin-wayfinder` to expose backend routes and controller actions as typed TypeScript helpers consumed by React.

## Generated Artifacts
- `resources/js/routes/` — one folder per route namespace mirroring `routes/web.php` and Filament/Livewire routes:
  - `posts/`, `comments/`, `profile/`, `repos/`, `users/`, `notifications/`, `verification/`, `admin/{repos,users,verifications}/`, plus `filament/*` and `livewire/*`.
- `resources/js/actions/` — controller action bindings mirroring `app/Http/Controllers` and Filament/Livewire controllers.
- `resources/js/wayfinder/index.ts` — core helper.

## Workflow
After **any** change to routes or controllers, regenerate:

```bash
php artisan wayfinder:generate
```

The Vite plugin also regenerates during dev. Commit the regenerated files.

## Usage Example

```js
import { store } from '@/actions/App/Http/Controllers/PostController';
import { router } from '@inertiajs/react';

router.post(store(), formData);
```
