# Augusto Corvalan — Portfolio

A brutalist black/white/acid-yellow portfolio site built on [Hugo](https://gohugo.io/) and [Tailwind CSS v4](https://tailwindcss.com/) (standalone CLI — no Node, no npm). Deploys automatically to [Netlify](https://netlify.com/) on git push.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [First-time Setup](#2-first-time-setup)
3. [Development](#3-development)
4. [Content & Customization](#4-content--customization)
5. [Configuration](#5-configuration)
6. [Deployment](#6-deployment)
7. [Updating Versions](#7-updating-versions)

---

## 1. Prerequisites

You need Hugo installed locally. The Tailwind binary is downloaded automatically by `bootstrap.sh`.

### Install Hugo

**macOS (Homebrew):**
```bash
brew install hugo
```

**Other platforms:**
Download the latest binary from the [Hugo releases page](https://github.com/gohugoio/hugo/releases). Place it somewhere on your `PATH` (e.g. `/usr/local/bin/hugo`).

Verify the installation:
```bash
hugo version
```

---

## 2. First-time Setup

Run this once after cloning or using this template.

### Step 1 — Get the template

**Option A: Use this as a GitHub template**
Click "Use this template" on GitHub, create your new repo, then clone it:
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

**Option B: Clone directly**
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### Step 2 — Make scripts executable

```bash
chmod +x bootstrap.sh dev.sh
```

### Step 3 — Run bootstrap

```bash
./bootstrap.sh
```

This script will:
- Confirm Hugo is installed
- Download the Tailwind CSS v4 standalone binary for your OS and architecture into `bin/`
- Compile your CSS once
- Run `git init` and create the initial commit

---

## 3. Development

Start the local development server:

```bash
./dev.sh
```

This runs two processes together:
- **Tailwind watcher** — rebuilds `static/css/main.css` whenever you change `assets/css/input.css` or any template/content file
- **Hugo server** — serves the site at `http://localhost:1313/` with live reload

Press `Ctrl+C` to stop. Both processes shut down cleanly.

> **Note:** If `bin/tailwindcss` is missing (e.g. after a fresh clone on a new machine), re-run `./bootstrap.sh` first.

---

## 4. Content & Customization

### Site structure and URLs

| URL | Content file | Notes |
|---|---|---|
| `/` | `content/_index.md` | Homepage |
| `/about/` | `content/about/_index.md` | Engineering portfolio only |
| `/about-all/` | `content/about-all/_index.md` | All 4 verticals — **not linked in nav** |
| `/projects/{slug}/` | `content/projects/{slug}/index.md` | Project detail pages |
| `/projects/` | auto-generated list | Section index |

### Add a project

Create a new folder under `content/projects/`:

```bash
mkdir content/projects/my-project
```

Create `content/projects/my-project/index.md`:

```markdown
---
title: "My Project"
description: "Short description."
role: "Your Role"
tools: ["Tool A", "Tool B"]
vertical: "engineering"       # engineering | design | editorial | publication
links:
  github: "https://github.com/..."
  demo: ""
images: []                    # leave empty for placeholder rects
date: "2024-01-01"
---

Optional longer body text here.
```

The project will appear on the `/about/` or `/about-all/` page in the appropriate vertical (based on `vertical` front matter), and will have its own page at `/projects/my-project/`.

> **Important:** `vertical` is metadata only — it is not part of the URL. URLs stay evergreen if a project is recategorized.

### Vertical conventions

| Vertical | Description |
|---|---|
| `engineering` | Software, data systems, developer tooling |
| `design` | Brand, UI/UX, visual systems |
| `editorial` | Long-form journalism, photo essays, writing |
| `publication` | Zines, annual reports, print |

### Portfolio pages

- `/about/` shows only `engineering` vertical
- `/about-all/` shows all 4 verticals — share this URL privately; it is intentionally absent from the nav

To change which verticals appear on a portfolio page, edit the `verticals` list in the page's front matter:

```markdown
---
title: "About"
layout: "portfolio"
verticals: ["engineering", "design"]
---
```

### Edit styles

All Tailwind customization goes in `assets/css/input.css`. The design tokens are defined in the `@theme` block:

```css
@theme {
  --color-yellow: #FFFF00;
  --font-display: "Syne", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
}
```

### Edit templates

| Template | Purpose |
|---|---|
| `layouts/_default/baseof.html` | Outer HTML shell (head, nav, footer, body, scripts) |
| `layouts/index.html` | Homepage hero |
| `layouts/_default/portfolio.html` | Portfolio landing (iterates verticals) |
| `layouts/partials/portfolio-vertical.html` | One `<details>` block per vertical |
| `layouts/projects/single.html` | Project detail page |
| `layouts/_default/list.html` | Generic section list |
| `layouts/_default/single.html` | Generic single page fallback |

### Add JavaScript

Edit `static/js/main.js`. It is loaded on every page before `</body>`.

---

## 5. Configuration

All site-wide settings live in `hugo.toml`:

```toml
baseURL = "https://augustocorvalan.com"
title   = "Augusto Corvalan"

[params]
  description = "..."
  author      = "Augusto Corvalan"
  og_image    = ""        # Absolute URL for OG image
  tagline     = "Designer · Engineer · Editor"
  showHomeInNav = false
```

---

## 6. Deployment

### Connect to Netlify

1. Push your repo to GitHub (or GitLab / Bitbucket).
2. Log in to [netlify.com](https://netlify.com) and click **Add new site → Import an existing project**.
3. Connect your Git provider and select your repository.
4. Netlify will detect `netlify.toml` and pre-fill the build settings:
   - **Build command:** (from `netlify.toml`)
   - **Publish directory:** `public`
5. Click **Deploy site**.

### Set your baseURL

Before your first deploy, update `baseURL` in `hugo.toml` to your actual Netlify URL (or custom domain):

```toml
baseURL = "https://augustocorvalan.com"
```

---

## 7. Updating Versions

Pinned versions are defined in two places:

| What | Where |
|---|---|
| Hugo version | `netlify.toml` → `HUGO_VERSION` |
| Tailwind version | `bootstrap.sh` → `TAILWIND_VERSION` and `netlify.toml` → build `command` URL |

### Update Tailwind

1. Find the new version on the [Tailwind CSS releases page](https://github.com/tailwindlabs/tailwindcss/releases).
2. Update `TAILWIND_VERSION` in `bootstrap.sh`.
3. Update the download URL in the `command` field in `netlify.toml`.
4. Delete `bin/` and re-run `./bootstrap.sh` to fetch the new binary locally:
   ```bash
   rm -rf bin/
   ./bootstrap.sh
   ```

---

## File Structure

```
├── bootstrap.sh              # First-time setup (run once)
├── dev.sh                    # Local development server
├── hugo.toml                 # Hugo config and site params
├── netlify.toml              # Netlify build config (Hugo + Tailwind versions)
├── .gitignore
├── README.md
├── assets/
│   └── css/
│       └── input.css         # Tailwind CSS source — @theme tokens, animations
├── static/
│   ├── css/
│   │   └── main.css          # Compiled CSS output (gitignored, auto-generated)
│   └── js/
│       └── main.js           # JavaScript (loaded on every page)
├── content/
│   ├── _index.md             # Homepage
│   ├── about/
│   │   └── _index.md         # /about — engineering portfolio
│   ├── about-all/
│   │   └── _index.md         # /about-all — all verticals (not in nav)
│   └── projects/             # One folder per project
│       └── {slug}/
│           └── index.md
└── layouts/
    ├── _default/
    │   ├── baseof.html        # Base HTML shell (nav, footer, noise overlay)
    │   ├── portfolio.html     # Portfolio landing template
    │   ├── list.html          # Section list fallback
    │   └── single.html        # Single page fallback
    ├── index.html             # Home page template
    ├── partials/
    │   └── portfolio-vertical.html  # Reusable vertical expand/collapse block
    └── projects/
        └── single.html        # Project detail page
```

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [First-time Setup](#2-first-time-setup)
3. [Development](#3-development)
4. [Content & Customization](#4-content--customization)
5. [Configuration](#5-configuration)
6. [Deployment](#6-deployment)
7. [Updating Versions](#7-updating-versions)

---

## 1. Prerequisites

You need Hugo installed locally. The Tailwind binary is downloaded automatically by `bootstrap.sh`.

### Install Hugo

**macOS (Homebrew):**
```bash
brew install hugo
```

**Other platforms:**
Download the latest binary from the [Hugo releases page](https://github.com/gohugoio/hugo/releases). Place it somewhere on your `PATH` (e.g. `/usr/local/bin/hugo`).

Verify the installation:
```bash
hugo version
```

---

## 2. First-time Setup

Run this once after cloning or using this template.

### Step 1 — Get the template

**Option A: Use this as a GitHub template**
Click "Use this template" on GitHub, create your new repo, then clone it:
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

**Option B: Clone directly**
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### Step 2 — Make scripts executable

```bash
chmod +x bootstrap.sh dev.sh
```

### Step 3 — Run bootstrap

```bash
./bootstrap.sh
```

This script will:
- Confirm Hugo is installed
- Download the Tailwind CSS v4 standalone binary for your OS and architecture into `bin/`
- Compile your CSS once
- Run `git init` and create the initial commit

---

## 3. Development

Start the local development server:

```bash
./dev.sh
```

This runs two processes together:
- **Tailwind watcher** — rebuilds `static/css/main.css` whenever you change `assets/css/input.css` or any template/content file
- **Hugo server** — serves the site at `http://localhost:1313/` with live reload

Press `Ctrl+C` to stop. Both processes shut down cleanly.

> **Note:** If `bin/tailwindcss` is missing (e.g. after a fresh clone on a new machine), re-run `./bootstrap.sh` first.

---

## 4. Content & Customization

### Edit the home page

Open `content/_index.md` and replace the placeholder with your content. It supports standard Markdown:

```markdown
---
title: "Home"
---

Your content here.
```

### Add a new page

Create a new Markdown file in `content/`:

```bash
# e.g. content/about.md
```

```markdown
---
title: "About"
---

About this site.
```

The page will be available at `/about/` and will automatically appear in the nav (since nav is built from top-level pages).

### Edit styles

All Tailwind customization goes in `assets/css/input.css`. The file starts with:

```css
@import "tailwindcss";
```

Add your custom CSS below that line. Use any [Tailwind v4](https://tailwindcss.com/docs) utilities directly in your HTML templates, and they will be detected and included automatically.

### Edit templates

- `layouts/_default/baseof.html` — the outer HTML shell (head, nav, body, scripts)
- `layouts/index.html` — the home page content block

To add a template for other pages, create `layouts/_default/single.html`:

```html
{{ define "main" }}
<article>
  <h1>{{ .Title }}</h1>
  {{ .Content }}
</article>
{{ end }}
```

### Add JavaScript

Edit `static/js/main.js`. It is loaded on every page before `</body>`.

---

## 5. Configuration

All site-wide settings live in `hugo.toml`:

```toml
baseURL = "https://example.com"   # Your site's full URL (required for Netlify deploys)
languageCode = "en-us"
title = "My Site"                 # Site name — appears in <title> and nav

enableRobotsTXT = true            # Auto-generates /robots.txt

[params]
  description = ""    # Default meta description and og:description
  author = ""         # Site author (optional, available in templates as site.Params.author)
  og_image = ""       # Default Open Graph image URL (used when no page-specific image is set)
  showHomeInNav = false  # Set to true to include a "Home" link in the nav
```

**Per-page overrides:**
Set `description` in a page's front matter to override the default for that page's meta and OG tags:

```markdown
---
title: "About"
description: "Learn more about this project."
---
```

**Built-in Hugo features (no config needed):**
- `/sitemap.xml` — generated automatically
- `/robots.txt` — generated automatically (requires `enableRobotsTXT = true`)
- RSS feed — available at `/index.xml`

---

## 6. Deployment

### Connect to Netlify

1. Push your repo to GitHub (or GitLab / Bitbucket).
2. Log in to [netlify.com](https://netlify.com) and click **Add new site → Import an existing project**.
3. Connect your Git provider and select your repository.
4. Netlify will detect `netlify.toml` and pre-fill the build settings:
   - **Build command:** (from `netlify.toml`)
   - **Publish directory:** `public`
5. Click **Deploy site**.

### How deploys work

Every `git push` to your main branch triggers a Netlify build automatically. The build process (defined in `netlify.toml`) runs:

1. Downloads the pinned Tailwind CLI binary
2. Compiles and minifies CSS
3. Runs `hugo` to build the static site

### Set your baseURL

Before your first deploy, update `baseURL` in `hugo.toml` to your actual Netlify URL (or custom domain):

```toml
baseURL = "https://your-site.netlify.app"
```

You can find your Netlify URL in the site dashboard after the first deploy.

### Custom domain

In the Netlify dashboard: **Domain management → Add custom domain**. Then update `baseURL` in `hugo.toml` to match.

---

## 7. Updating Versions

Pinned versions are defined in two places:

| What | Where |
|---|---|
| Hugo version | `netlify.toml` → `HUGO_VERSION` |
| Tailwind version | `bootstrap.sh` → `TAILWIND_VERSION` and `netlify.toml` → build `command` URL |

### Update Hugo

1. Find the new version on the [Hugo releases page](https://github.com/gohugoio/hugo/releases).
2. Update `HUGO_VERSION` in `netlify.toml`.
3. Update Hugo locally (`brew upgrade hugo` or replace binary).

### Update Tailwind

1. Find the new version on the [Tailwind CSS releases page](https://github.com/tailwindlabs/tailwindcss/releases).
2. Update `TAILWIND_VERSION` in `bootstrap.sh`.
3. Update the download URL in the `command` field in `netlify.toml` to use the new version tag.
4. Delete `bin/` and re-run `./bootstrap.sh` to fetch the new binary locally:
   ```bash
   rm -rf bin/
   ./bootstrap.sh
   ```

---

## File Structure

```
├── bootstrap.sh              # First-time setup (run once)
├── dev.sh                    # Local development server
├── hugo.toml                 # Hugo config and site params
├── netlify.toml              # Netlify build config (Hugo + Tailwind versions)
├── .gitignore
├── README.md
├── assets/
│   └── css/
│       └── input.css         # Tailwind CSS source (edit this)
├── static/
│   ├── css/
│   │   └── main.css          # Compiled CSS output (gitignored, auto-generated)
│   └── js/
│       └── main.js           # JavaScript (loaded on every page)
├── layouts/
│   ├── _default/
│   │   └── baseof.html       # Base HTML shell
│   └── index.html            # Home page template
├── content/
│   └── _index.md             # Home page content
└── bin/                      # Gitignored — Tailwind binary lives here
```
