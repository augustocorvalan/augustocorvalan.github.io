
# Portfolio Website Build Plan — Augusto Corvalan

## TL;DR
Build a brutalist black/white/acid-yellow portfolio site for Augusto Corvalan on top of the existing Hugo + Tailwind v4 scaffold. The site has a homepage, an engineering-only `/about` portfolio page, a hidden `/about-all` page showing all 4 verticals, and individual project pages. Expand/collapse verticals use pure CSS (`<details>`/`<summary>`). Contact lives in the footer only.

---

## Design System

| Token | Value |
|---|---|
| Yellow | `#FFFF00` (acid yellow) — used sparingly: CTA button + nav hover/active state only |
| Display font | **Syne** (Google Fonts) — all headings |
| Mono font | **IBM Plex Mono** (Google Fonts) — metadata, labels, tags, captions |
| Layout width | `max-w-[1400px]` centered, `px-8` padding |
| Borders | Mix of heavy (`border-4`) and very heavy (`border-[6px]`–`border-[8px]`) black lines |
| Texture | Inline SVG grain/noise overlay, ~15–20% opacity, globally applied (fixed, pointer-events-none) |
| Black sections | Some sections invert to `bg-black text-white` for contrast |
| Motion | CSS fade-in on `<main>` for page transitions + smooth CSS transition on `<details>` expand/collapse |

---

## Content Structure

```
content/
  _index.md                   # Homepage — title, tagline via site.Params
  about/
    _index.md                 # /about — layout: portfolio, verticals: ["engineering"]
  about-all/
    _index.md                 # /about-all — layout: portfolio, verticals: ["engineering","design","editorial","publication"]
  projects/                   # Flat — no vertical subfolders
    {slug}/
      index.md                # URL: /projects/{slug}/ — vertical is front matter metadata only
```

**Project front matter fields:**
```yaml
title: ""
description: ""
role: ""
tools: []
vertical: ""        # metadata only — used for filtering, NOT part of URL
links:
  github: ""
  demo: ""
images: []          # empty for now; template renders gray placeholder rects
date: ""
```

**URL design rationale:** Vertical is excluded from the slug so URLs remain evergreen if a project is recategorized.

---

## Template Structure

```
layouts/
  index.html                        # Homepage hero (update existing)
  _default/
    baseof.html                     # Master layout (update: fonts, noise overlay, nav, footer)
    portfolio.html                  # Portfolio landing — reads .Params.verticals, ranges over them
    list.html                       # Minimal fallback for /projects/ section index
    single.html                     # Generic single-page fallback
  projects/
    single.html                     # Project detail page
  partials/
    portfolio-vertical.html         # Reusable: one <details> block per vertical
```

---

## Steps

### Phase 1: Config & Design System
1. Update `hugo.toml` — set `title = "Augusto Corvalan"`, fill `description`, `author`, `og_image` placeholder, `showHomeInNav = false`, add `tagline` param
2. Update `assets/css/input.css`:
   - Keep existing `@import` and `@source` directives
   - Add `@theme` block: `--color-yellow: #FFFF00`, `--font-display: "Syne"`, `--font-mono: "IBM Plex Mono"`
   - Add `@keyframes fadeIn` and apply to `main` for page transitions
   - Add CSS transition on `details > *:not(summary)` for expand/collapse animation
3. Update `layouts/_default/baseof.html`:
   - Add Google Fonts `<link>` preconnect + stylesheet for Syne and IBM Plex Mono in `<head>`
   - Add fixed full-screen noise overlay `<div>` (inline SVG `url()`, `pointer-events-none`, `z-10`, ~15–20% opacity) inside `<body>`
   - Nav: full-width, `border-b-[6px] border-black`, "AC" logo (Syne, bold, ~2xl) left — links to `/`; "About" link right — hover applies `#FFFF00` background or thick yellow underline
   - Strip all existing blue (`blue-600`, `blue-700`, `text-blue-600`)
   - Change `max-w-3xl` to `max-w-[1400px]`
   - Add `<footer>`: `border-t-4 border-black`, contact links (email, LinkedIn, GitHub — placeholder `href`s), IBM Plex Mono, small text

### Phase 2: Homepage *(after Phase 1)*
4. Update `layouts/index.html`:
   - Tall hero (not full-viewport): "Augusto Corvalan" in massive Syne display type
   - Tagline line in IBM Plex Mono, pulled from `site.Params.tagline`
   - CTA button → `/about` styled with `bg-[#FFFF00] border-4 border-black` (black on yellow, brutalist)
   - Hero tall enough that content below the fold is visible/hinted
5. Update `content/_index.md` — set `title: "Home"` (front matter only; tagline in `hugo.toml` params)

### Phase 3: Content Architecture *(parallel with Phase 2)*
6. Create `content/about/_index.md`:
   ```yaml
   ---
   title: "About"
   layout: "portfolio"
   verticals: ["engineering"]
   ---
   ```
7. Create `content/about-all/_index.md`:
   ```yaml
   ---
   title: "About"
   layout: "portfolio"
   verticals: ["engineering", "design", "editorial", "publication"]
   ---
   ```
8. Create 9 placeholder project pages at `content/projects/{slug}/index.md` — 2–3 per vertical. Use realistic-sounding placeholder titles, descriptions, roles, and tools. `images` list stays empty — template renders gray rects.

   Suggested slugs:
   - Engineering (3): `data-pipeline`, `design-system`, `cli-tool`
   - Design (2): `brand-identity`, `ui-kit`
   - Editorial (2): `long-form-feature`, `photo-essay`
   - Publication (2): `annual-report`, `zine`

### Phase 4: Templates
9. Create `layouts/_default/portfolio.html`:
   - Defines `"main"` block
   - Iterates `{{ range .Params.verticals }}` and calls `{{ partial "portfolio-vertical.html" (dict "vertical" . "page" $) }}` for each
10. Create `layouts/partials/portfolio-vertical.html`:
    - Receives `vertical` (string) and `page` (page context)
    - Filters projects: `{{ $projects := where site.RegularPages "Params.vertical" .vertical }}`
    - Renders `<details>` + `<summary>` (vertical name in Syne, bold, uppercase, thick bottom border on summary)
    - Inside: CSS grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) of project cards
    - Each card: gray placeholder rect (`aspect-video bg-gray-200 border-2 border-black`), title, description, links to `/projects/{slug}/`
11. Create `layouts/projects/single.html`:
    - Hero grid of 2–3 gray placeholder rects (`grid grid-cols-2 gap-2`, `aspect-video bg-gray-200 border-2 border-black`)
    - `<h1>` in Syne
    - Description paragraph
    - Role, tools (pill list: `border-2 border-black font-mono text-xs px-2 py-0.5`), links — all in IBM Plex Mono
12. Create `layouts/_default/list.html` — minimal: just renders `{{ block "main" . }}{{ end }}` with a heading, to prevent blank section pages
13. Create `layouts/_default/single.html` — minimal: renders `.Title` and `.Content` inside a constrained container

### Phase 5: Docs
14. Update `README.md` and `AGENTS.md` with:
    - New content structure and URL map
    - Vertical conventions (metadata-only field in front matter)
    - Design token reference (fonts, yellow value, border weights)
    - Note that `/about-all` is intentionally not in nav

---

## Relevant Files

| File | Action |
|---|---|
| `hugo.toml` | Update |
| `assets/css/input.css` | Update — @theme tokens, page transition, details animation |
| `layouts/_default/baseof.html` | Update — fonts, noise overlay, nav, footer, strip blue |
| `layouts/index.html` | Update — brutalist hero |
| `content/_index.md` | Update — title only |
| `content/about/_index.md` | Create |
| `content/about-all/_index.md` | Create |
| `content/projects/{slug}/index.md` ×9 | Create |
| `layouts/_default/portfolio.html` | Create |
| `layouts/partials/portfolio-vertical.html` | Create |
| `layouts/projects/single.html` | Create |
| `layouts/_default/list.html` | Create |
| `layouts/_default/single.html` | Create |
| `README.md`, `AGENTS.md` | Update |

---

## Verification

1. `./dev.sh` builds clean, no errors
2. Homepage: tall Syne hero with name + tagline + yellow CTA → `/about`; content hinted below fold
3. Nav: thick black bottom border, "AC" logo left, "About" right, yellow hover, no blue anywhere
4. Grain texture visible globally; black sections invert correctly
5. `/about`: engineering vertical only, expands with CSS animation on click
6. `/about-all`: all 4 verticals expand/collapse independently
7. Project cards: full (gray image rect + title + description always visible)
8. Project detail URL: `/projects/{slug}/` — no vertical in path
9. Project detail page: gray image grid, Syne h1, mono metadata, pill tags, links
10. `/about-all` is absent from nav HTML (not a `site.RegularPages` top-level page or excluded via front matter)
11. Footer: contact links in mono, thick top border
12. Mobile responsive at ~375px