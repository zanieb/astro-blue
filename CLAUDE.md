# Claude Code Project Notes

## Current Task

Style Astro Starlight to match Mintlify/PYX docs (https://docs.pyx.dev).

## Workflows

**Main agent (coordinator):** See `.claude/main.md` for delegation workflow and cherry-pick process.

**Worker agents (implementers):** See `.claude/worker.md` for implementation workflow, testing, and commits.

## Verifying Changes

**Visual verification:**

- Take before/after screenshots at same viewport size - trust visual results over CSS values
- Use Playwright MCP browser tools to verify changes interactively
- Test across states (hover, mobile/desktop) when relevant

**Debugging CSS that doesn't work:**

- Visual position may differ from computed CSS due to: fixed/absolute positioning, transforms, z-index, flexbox/grid constraints
- Use obviously large changes first (100px) to verify correct element targeting
- Investigate DOM structure, not caching
- Try different approaches if initial fix doesn't work (component override vs CSS, different selectors)

## Key Files

- `src/styles/custom.css` - Theme CSS (primary)
- `src/components/` - Starlight component overrides
- `astro.config.mjs` - Sidebar and Starlight config

## Setup

**Package manager:** Use `bun` for all dependency management (not npm).

See `DEVELOPMENT.md` for dev server and MCP browser tools (uses Chrome or Chromium).
