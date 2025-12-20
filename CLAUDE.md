# Claude Code Project Notes

## Current Task
Style Astro Starlight to match Mintlify/PYX docs (https://docs.pyx.dev).

**Workflow:**
1. Pick next item from `MINTLIFY_DIFFERENCES.md`
2. Implement CSS/component change in `src/styles/custom.css` or `src/components/`
3. Remove completed item from `MINTLIFY_DIFFERENCES.md`
4. Commit with descriptive message

## Key Files
- `src/styles/custom.css` - Theme CSS (primary)
- `src/components/` - Starlight component overrides
- `astro.config.mjs` - Sidebar and Starlight config
- `MINTLIFY_DIFFERENCES.md` - Tracks remaining styling items

## Setup
See `DEVELOPMENT.md` for dev server and MCP browser tools (uses Chromium).
