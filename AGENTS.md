# Agent Guide — Augusto Corvalan Portfolio

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
hugo.toml             # Site config: baseURL, title, [params] including tagline
netlify.toml          # Netlify build command and Hugo version
assets/
  css/
    input.css         # Tailwind entry point — @theme tokens, animations, details transition
static/
  css/
    main.css          # GENERATED — do not edit directly
  js/
    main.js           # Client-side JS entry point
content/
  _index.md           # Homepage (title only; tagline in hugo.toml params)
  about/
    _index.md         # /about — layout: portfolio, verticals: ["engineering"]
  about-all/
    _index.md         # /about-all — all 4 verticals — NOT linked in nav
  projects/
    {slug}/
      index.md        # URL: /projects/{slug}/ — vertical is front matter only
layouts/
  index.html          # Homepage hero block
  _default/
    baseof.html       # Outer HTML shell: head, nav, noise overlay, main, footer, script
    portfolio.html    # Portfolio landing — iterates .Params.verticals
    list.html         # Minimal section list fallback
    single.html       # Generic single-page fallback
  partials/
    portfolio-vertical.html   # Reusable: one <details> block per vertical
  projects/
    single.html       # Project detail page
```

---

## Design System

| Token | Value |
|---|---|
| Yellow | `#FFFF00` — CTA button, nav hover, card hover, link hover only |
| Display font | **Syne** (Google Fonts) — all headings, `var(--font-display)` |
| Mono font | **IBM Plex Mono** (Google Fonts) — metadata, labels, tags, body, `var(--font-mono)` |
| Layout width | `max-w-[1400px]` centered, `px-8` padding |
| Borders | `border-4` (standard), `border-[6px]` (nav), `border-b-4` (footer/section dividers) |
| Noise overlay | Fixed full-screen SVG grain, `opacity-[0.12]`, `pointer-events-none`, `z-50` |
| Motion | CSS `fadeIn` on `<main>` + CSS transition on `<details>` expand/collapse |

**Never** use `blue-*` color utilities. **Never** use rounded corners (`rounded-*`). Brutalist flat design throughout.

---

## Content Conventions

### Project front matter

```yaml
---
title: ""
description: ""
role: ""
tools: []
vertical: ""        # engineering | design | editorial | publication
links:
  github: ""
  demo: ""
images: []          # leave empty — template renders gray placeholder rects
date: ""
---
```

> **`vertical` is metadata only.** It is NOT part of the URL. URLs stay evergreen if projects are recategorized.

### Verticals

| Value | Description |
|---|---|
| `engineering` | Software, data systems, developer tooling |
| `design` | Brand, UI/UX, visual and graphic design |
| `editorial` | Long-form journalism, photo essays |
| `publication` | Zines, annual reports, print publications |

### Portfolio pages

- `/about/` — `verticals: ["engineering"]` — linked in nav
- `/about-all/` — `verticals: ["engineering","design","editorial","publication"]` — **intentionally absent from nav**, shared privately

The nav in `baseof.html` is hardcoded to link only `/about/`. It does NOT auto-render `site.RegularPages` top-level links (this differs from the original scaffold template).

---

## Common Tasks

### Start the dev server
```bash
./dev.sh
# Site at http://localhost:1313/ — live reload on file changes
```

### Add a project
Create `content/projects/{slug}/index.md` with the front matter fields above. The project auto-appears on portfolio pages filtered by `vertical`.

### Add a portfolio page for a new audience
Create `content/{slug}/_index.md`:
```yaml
---
title: "About"
layout: "portfolio"
verticals: ["engineering", "design"]
---
```

### Add Tailwind utility classes
Write classes directly in any `layouts/**/*.html` file. Tailwind v4 scans these via `@source` directives.

### Add custom CSS
Edit `assets/css/input.css`. Add design tokens to the `@theme` block, custom rules below it.

### Add a site-wide parameter
1. Add to `hugo.toml` under `[params]`
2. Reference in templates as `{{ site.Params.myParam }}`

---

## Key Files to Know

### `layouts/_default/baseof.html`
The outer shell. Contains:
- `<head>` with title, meta, OG tags, Google Fonts links, CSS
- Fixed noise/grain overlay `<div>` (SVG feTurbulence, pointer-events-none, z-50)
- `<nav>` — "AC" logo left (links to `/`), "About" link right (hardcoded to `/about/`), yellow hover state
- `<main class="max-w-[1400px] mx-auto px-8 py-16">` — all templates inject here
- `<footer>` — thick top border, mono text, email/LinkedIn/GitHub links
- `<script src="/js/main.js">`

### `assets/css/input.css`
Tailwind entry point with:
- `@import "tailwindcss"`
- `@source` directives for layouts and content
- `@theme` block with color and font tokens
- `@keyframes fadeIn` applied to `main`
- CSS transition on `details > *:not(summary)` for expand/collapse

### `layouts/partials/portfolio-vertical.html`
Receives `vertical` (string) and `page` (page context). Filters `site.RegularPages` by `Params.vertical`, renders a `<details>/<summary>` expand/collapse with a CSS grid of project cards.

### `hugo.toml`
```toml
baseURL = "https://augustocorvalan.com"
title   = "Augusto Corvalan"

[params]
  description   = "..."          # meta description and OG
  author        = "Augusto Corvalan"
  og_image      = ""             # Absolute URL for OG image
  tagline       = "Designer · Engineer · Editor"
  showHomeInNav = false
```

### `netlify.toml`
Netlify build downloads the Tailwind binary, compiles CSS, then runs `hugo`. To update versions, change the `curl` URL and `HUGO_VERSION` here.

---

## Tailwind v4 Notes

- **No config file** — CSS-first configuration via `@theme` in `input.css`
- **`@source` is required** — v4 does not auto-detect template files
- **Arbitrary values in use:** `max-w-[1400px]`, `border-[6px]`, `bg-[#FFFF00]`, `text-[clamp(...)]` — these are intentional brutalist design choices, not to be removed

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
