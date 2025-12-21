#!/usr/bin/env bash
set -euo pipefail

echo "🐳 Running Playwright in Docker to update visual regression snapshots..."
echo "This ensures snapshots match the CI environment (Linux)."
echo ""

docker run --rm --network host \
  -v "$(pwd):/work" \
  -w /work \
  -it mcr.microsoft.com/playwright:v1.57.0-jammy \
  /bin/bash -c "npm install -g bun && bun install && bun run test:visual:update"

echo ""
echo "✅ Snapshots updated! Review changes with: git diff tests/__screenshots__/"
