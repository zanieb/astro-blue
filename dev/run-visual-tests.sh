#!/usr/bin/env bash
set -euo pipefail

echo "🐳 Running Playwright visual regression tests in Docker..."
echo "This ensures tests run in the same environment as CI (Linux)."
echo "Using production build for search functionality (Pagefind)."
echo ""

# Use -it only if we have a TTY (for interactive use)
# In CI or non-TTY environments, omit -it to avoid "input device is not a TTY" error
if [ -t 0 ]; then
  DOCKER_FLAGS="-it"
else
  DOCKER_FLAGS=""
fi

docker run --rm --network host \
  -v "$(pwd):/work" \
  -w /work \
  $DOCKER_FLAGS mcr.microsoft.com/playwright:v1.57.0-jammy \
  /bin/bash -c "npm install -g bun && bun install && USE_PREVIEW=1 bun run playwright test"

echo ""
echo "✅ Tests complete!"
