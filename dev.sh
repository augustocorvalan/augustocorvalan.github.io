#!/bin/bash
set -e

# Kill the background Tailwind watcher when this script exits (Ctrl+C or otherwise)
trap 'kill "$TAILWIND_PID" 2>/dev/null' EXIT INT TERM

echo "Starting Tailwind CSS watcher..."
mkdir -p static/css
./bin/tailwindcss -i assets/css/input.css -o static/css/main.css --watch &
TAILWIND_PID=$!

echo "Starting Hugo development server..."
hugo server
