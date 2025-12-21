#!/usr/bin/env bash
set -euo pipefail

echo "🐳 Running Playwright visual regression tests in Docker..."
echo "This ensures tests run in the same environment as CI (Linux)."
echo ""

docker run --rm --network host \
  -v "$(pwd):/work" \
  -w /work \
  -it mcr.microsoft.com/playwright:v1.57.0-jammy \
  /bin/bash -c "npm install -g bun && bun install && bun run playwright test"

echo ""
echo "✅ Tests complete!"
