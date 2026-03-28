Tech stack:
a bare-bones Hugo website with Tailwind and without Node. Meant as a bare-bones template for a simple website that can be easily deployed and maintained without needing to worry about dependencies or build tools.
- Tailwind v4
- Hugo (latest version)
- Netlify 
Deployment: Git push to repository connected to Netlify for automatic builds


Style:
- Minimalist
    - This is meant to be a simple template that can be reused easily, so it should be as minimal and lightweight as possible.
    - no design, no content except what the user provides
- Technical simplicity while maintaining long-term archival quality.
    - Minimal Dependencies: Prefer solutions with clean dependency chains and minimal bloat
    - Archival Quality: Favor native browser technologies (HTML, CSS, minimal JavaScript)
    - Portability: Single binary solutions get bonus points
    - Future-Proofing: Must be actively maintained with good long-term stability 

Include: 
- Include Readme that explains how to use the template, how to deploy it, and how to customize it. The Readme should also include instructions for setting up Netlify for automatic deployment. It should be workflow focused, with clear steps for each part of the process, from first time setup, to development, to deploy and everything else a user might need.
- Include a bootstrap.sh script that sets up the site

Stack
Hugo — latest stable, version pinned in netlify.toml
Tailwind CSS v4 — standalone CLI binary, no Node, no npm
Netlify — automatic deploys on git push
File Structure
bootstrap.sh
Runs once to set up the project. Tasks in order:

Check for Hugo — if not found, print install instructions (Homebrew + direct binary link) and exit
Detect OS + architecture, download the pinned Tailwind v4 standalone binary to bin/tailwindcss
Make binary executable (chmod +x)
Compile CSS once (bin/tailwindcss -i assets/css/input.css -o static/css/main.css)
git init + first commit (commit everything except gitignored files)
Script operates in the current directory. No npm, no Node.

dev.sh
Start Tailwind watcher in the background: bin/tailwindcss -i assets/css/input.css -o static/css/main.css --watch
Start hugo server in the foreground
On exit (SIGINT), kill the background Tailwind watcher process
hugo.toml
Minimal config with [params] placeholders:

Templates
layouts/_default/baseof.html

Standard HTML5 boilerplate
<title>: page title + site title
Open Graph meta tags (og:title, og:description, og:image, og:url) using params
Loads static/css/main.css
Loads static/js/main.js before </body>
Auto-built nav from Hugo's .Site.Pages, filtered to top-level pages; home page inclusion controlled by params.showHomeInNav
{{ block "main" . }}{{ end }}
layouts/index.html

Defines {{ define "main" }} block
Renders {{ .Content }} from content/_index.md
content/_index.md

Empty front matter + one placeholder line of content
SEO
All via Hugo config/built-ins:

<title> and Open Graph tags in baseof.html
robots.txt — enabled via enableRobotsTXT = true
sitemap.xml — Hugo built-in, automatic
RSS feed — Hugo built-in, automatic
netlify.toml
Tailwind binary version matches bootstrap.sh. Build command: download Linux binary → compile CSS → build Hugo.

.gitignore
static/js/main.js
README
Workflow-focused. Sections:

Prerequisites — Install Hugo (Homebrew on macOS, direct binary for others)
First-time setup — Clone/use template, run ./bootstrap.sh
Development — Run ./dev.sh; explains the two-process setup
Content & Customization — Editing _index.md, adding pages, modifying templates, editing assets/css/input.css for Tailwind
Configuration — hugo.toml params walkthrough (description, og_image, showHomeInNav, etc.)
Deployment — Netlify: create new site from Git, set Hugo version if needed; netlify.toml explained; how git push triggers build
Updating — How to change pinned Hugo/Tailwind versions in netlify.toml and bootstrap.sh