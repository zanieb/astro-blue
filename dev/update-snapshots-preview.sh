#!/usr/bin/env bash
set -euo pipefail

echo "🐳 Running Playwright in Docker to update visual regression snapshots (PREVIEW MODE)..."
echo "This uses a production build to capture search functionality (Pagefind)."
echo ""

docker run --rm --network host \
  -v "$(pwd):/work" \
  -w /work \
  -it mcr.microsoft.com/playwright:v1.57.0-jammy \
  /bin/bash -c "npm install -g bun && bun install && USE_PREVIEW=1 bun run playwright test --update-snapshots"

echo ""
echo "✅ Snapshots updated! Review changes with: git diff tests/__screenshots__/"
