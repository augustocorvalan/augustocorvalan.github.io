#!/bin/bash
set -e

TAILWIND_VERSION="v4.2.2"

# ── Check for Hugo ────────────────────────────────────────────────────────────
if ! command -v hugo &>/dev/null; then
  echo "Error: Hugo is not installed."
  echo ""
  echo "Install on macOS (Homebrew):"
  echo "  brew install hugo"
  echo ""
  echo "Or download a binary directly for your platform:"
  echo "  https://github.com/gohugoio/hugo/releases"
  exit 1
fi

echo "Hugo found: $(hugo version)"

# ── Detect OS ─────────────────────────────────────────────────────────────────
OS="$(uname -s)"
case "$OS" in
  Darwin) OS_NAME="macos" ;;
  Linux)  OS_NAME="linux" ;;
  *)
    echo "Error: Unsupported operating system: $OS"
    exit 1
    ;;
esac

# ── Detect architecture ───────────────────────────────────────────────────────
ARCH="$(uname -m)"
case "$ARCH" in
  x86_64)        ARCH_NAME="x64" ;;
  arm64|aarch64) ARCH_NAME="arm64" ;;
  *)
    echo "Error: Unsupported architecture: $ARCH"
    exit 1
    ;;
esac

# ── Download Tailwind standalone binary ───────────────────────────────────────
BINARY_NAME="tailwindcss-${OS_NAME}-${ARCH_NAME}"
URL="https://github.com/tailwindlabs/tailwindcss/releases/download/${TAILWIND_VERSION}/${BINARY_NAME}"

echo ""
echo "Downloading Tailwind CSS ${TAILWIND_VERSION} (${OS_NAME}/${ARCH_NAME})..."
mkdir -p bin
curl -fsSL "$URL" -o bin/tailwindcss
chmod +x bin/tailwindcss
echo "Tailwind binary installed at bin/tailwindcss"

# ── Compile CSS ───────────────────────────────────────────────────────────────
echo ""
echo "Compiling CSS..."
mkdir -p static/css
./bin/tailwindcss -i assets/css/input.css -o static/css/main.css
echo "CSS compiled to static/css/main.css"

# ── Git init + first commit ───────────────────────────────────────────────────
echo ""
echo "Initializing git repository..."
if [ ! -d .git ]; then
  git init
fi
git add -A
git commit -m "Initial commit"

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit hugo.toml — set baseURL, title, and site params"
echo "  2. Run ./dev.sh to start local development"
echo "  3. Connect this repo to Netlify for automatic deploys (see README.md)"
