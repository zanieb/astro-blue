#!/usr/bin/env bash
set -euo pipefail

echo "🐳 Running Playwright in Docker to update visual regression snapshots..."
echo "This ensures snapshots match the CI environment (Linux)."
echo "Using production build for search functionality (Pagefind)."
echo ""

docker run --rm --network host \
  -v "$(pwd):/work" \
  -w /work \
  mcr.microsoft.com/playwright:v1.57.0-jammy \
  /bin/bash -c "npm install -g bun && bun install && USE_PREVIEW=1 bun run playwright test --update-snapshots"

echo ""
echo "✅ Snapshots updated! Review changes with: git diff tests/__screenshots__/"
