#!/usr/bin/env bash
set -euo pipefail

echo "🐳 Running Playwright visual regression tests in Docker (PREVIEW MODE)..."
echo "This runs with a production build to test search functionality (Pagefind)."
echo ""

docker run --rm --network host \
  -v "$(pwd):/work" \
  -w /work \
  -it mcr.microsoft.com/playwright:v1.57.0-jammy \
  /bin/bash -c "npm install -g bun && bun install && USE_PREVIEW=1 bun run playwright test"

echo ""
echo "✅ Tests complete!"
