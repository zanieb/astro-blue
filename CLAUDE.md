# Claude Code Project Notes

## Current Task

Style Astro Starlight to match Mintlify/PYX docs (https://docs.pyx.dev).

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

**Dev server:** `bun run dev` (runs at http://localhost:4321)

See `DEVELOPMENT.md` for MCP browser tools (uses Chrome or Chromium).

**Claude Code for Web:** Read `CLAUDE-WEB.md` for web-specific setup notes and known issues.

## Before Committing

Run linting and formatting checks before committing:

```bash
bun run lint        # Check for lint errors
bun run format:check # Check formatting
```

To auto-fix issues:

```bash
bun run lint:fix    # Fix lint errors
bun run format      # Fix formatting
```
