# Agent Guide — Hugo + Tailwind v4 Template

A concise reference for LLM coding agents working in this repository.

---

## Stack

| Layer | Tool | Notes |
|---|---|---|
| Static site generator | [Hugo](https://gohugo.io/) | Extended build, installed via Homebrew |
| CSS | [Tailwind CSS v4](https://tailwindcss.com/) | Standalone binary, no Node/npm required |
| Deployment | [Netlify](https://netlify.com/) | Auto-deploys on git push |

---

## Project Structure

```
bootstrap.sh          # One-time setup: downloads Tailwind binary, compiles CSS, initial git commit
dev.sh                # Dev server: starts Tailwind watcher + Hugo server concurrently
hugo.toml             # Site config: baseURL, title, [params]
netlify.toml          # Netlify build command and Hugo version
assets/
  css/
    input.css         # Tailwind entry point — edit this for custom CSS
static/
  css/
    main.css          # GENERATED — do not edit directly
  js/
    main.js           # Client-side JS entry point
content/
  _index.md           # Homepage content (Markdown + front matter)
layouts/
  index.html          # Homepage template block
  _default/
    baseof.html       # Outer HTML shell: <head>, <nav>, <main>, <script>
```

---

## Common Tasks

### Start the dev server
```bash
./dev.sh
# Site at http://localhost:1313/ — live reload on file changes
```

### Add a new page
Create `content/<slug>.md`:
```markdown
---
title: "About"
---

Page content here.
```
The page is available at `/<slug>/` and auto-appears in the nav (nav renders all top-level `site.RegularPages`).

### Add a single-page template
Create `layouts/_default/single.html`:
```html
{{ define "main" }}
<article>
  <h1 class="text-3xl font-bold">{{ .Title }}</h1>
  <div class="mt-6 prose">{{ .Content }}</div>
</article>
{{ end }}
```

### Edit the homepage layout
Edit `layouts/index.html` — it defines the `"main"` block rendered inside `<main>` in `baseof.html`.

### Add Tailwind utility classes
Write classes directly in any `layouts/**/*.html` file. Tailwind v4 scans these via `@source` directives in `assets/css/input.css` and generates only the used utilities into `static/css/main.css`.

### Add custom CSS
Edit `assets/css/input.css`:
```css
@import "tailwindcss";
@source "../../layouts/**/*.html";
@source "../../content/**/*.md";

/* Custom styles below */
.my-component {
  @apply text-lg font-medium text-gray-700;
}
```

### Add a site-wide parameter
1. Add to `hugo.toml` under `[params]`:
   ```toml
   [params]
     myParam = "value"
   ```
2. Reference in templates as `{{ site.Params.myParam }}`.

### Add JavaScript
Write code in `static/js/main.js`. It is included via a `<script>` tag at the bottom of `baseof.html`.

---

## Key Files to Know

### `layouts/_default/baseof.html`
The outer shell. Contains:
- `<head>` with title, meta description, Open Graph tags, and CSS link
- `<nav>` rendering top-level pages from `site.RegularPages`
- `<main>` wrapping `{{ block "main" . }}` — all page templates inject here
- `<script src="/js/main.js">` at the end of `<body>`

The nav shows the home link only when `showHomeInNav = true` in `hugo.toml`.

### `assets/css/input.css`
Tailwind entry point. Must include `@source` directives for every directory containing class names:
```css
@import "tailwindcss";
@source "../../layouts/**/*.html";
@source "../../content/**/*.md";
```
Without `@source`, Tailwind v4 will not scan templates and the output CSS will only contain the base reset — no utilities.

### `hugo.toml`
```toml
baseURL = "https://example.com"   # Set this before deploying
title   = "My Site"

[params]
  description    = ""             # Used in <meta name="description"> and OG tags
  author         = ""
  og_image       = ""             # Absolute URL for OG image
  showHomeInNav  = false          # Set true to include home link in nav
```

### `netlify.toml`
Netlify build downloads the Tailwind binary, compiles CSS, then runs `hugo`. To update versions, change the `curl` URL and `HUGO_VERSION` here.

---

## Tailwind v4 Notes

- **No config file** — Tailwind v4 uses CSS-first configuration. Customise tokens directly in `input.css` using `@theme`:
  ```css
  @import "tailwindcss";

  @theme {
    --color-brand: oklch(55% 0.2 250);
    --font-display: "Inter", sans-serif;
  }
  ```
- **`@source` is required** — v4 does not auto-detect template files. Always add a `@source` for each directory with class names.
- **No arbitrary value brackets needed for most things** — spacing, colors, and typography use CSS variables under the hood.
