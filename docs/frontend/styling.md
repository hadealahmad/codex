# Styling & Design Guidelines

## Stack
- **Tailwind CSS v4** (CSS-first config via `@theme` in `resources/css/app.css` — no `tailwind.config.js`).
- Plugins: `@tailwindcss/typography` (prose for blog content), `tw-animate-css`.
- **shadcn/ui** components on Radix primitives (`resources/js/components/ui/*`), styled with `class-variance-authority` + `tailwind-merge` (`cn()` in `lib/utils.js`).
- Icons: `lucide-react`. Toasts: `sonner`. Theme: `next-themes`.

## Key Rules
- **RTL-first**: the root layout uses `dir="rtl"`; the UI language is Arabic. Keep new UI RTL-compatible.
- Typography: `--font-sans: 'IBM Plex Sans Arabic', 'Instrument Sans', ...`.
- Dark mode: class strategy via `@custom-variant dark (&:is(.dark *))`; toggle with `ModeToggle` (next-themes, resolvedTheme swaps logo assets too).
- Colors use shadcn CSS variables (`--background`, `--foreground`, `--card`, `--primary`, ...) mapped into Tailwind theme tokens — never hardcode hex colors; use semantic classes (`bg-background`, `text-muted-foreground`, etc.).
- Radius scale derived from a single `--radius` variable.
- Filament admin panel uses **Amber** as its primary color.

## Adding a shadcn component
```bash
bunx shadcn@latest add <component>
```
Components land in `resources/js/components/ui/`.
