# Claude Code Project Notes

## Current Task
Style Astro Starlight to match Mintlify/PYX docs (https://docs.pyx.dev).

**Workflow:**
1. Check `TODO` file and pick a `[new]` or `[rejected]` item (prioritize rejected - see TODO file for status workflow)
2. Update to `[in progress]`, implement the change, verify visually
3. Update to `[done]` when complete with a brief note of what changed
4. **Commit changes regularly** - don't let changes accumulate, commit after each logical unit of work
5. Keep working through items without waiting for review

**Important:** If an item gets `[rejected]`, try a meaningfully different approach (e.g., component override vs CSS)

## Parallel Development with Worktrees

Sub-agents may work on independent tasks in parallel using git worktrees:
- Each worktree is a separate working directory with its own branch
- Agents working in worktrees should commit their changes to their branch
- Changes from worktrees get merged back to main when complete
- Common worktree locations: `../astro-blue-<task-name>/`

If you're a sub-agent working in a worktree:
1. You're on a feature branch - commit your changes there
2. Don't modify files outside your task scope
3. The main agent will merge your work when ready

## Verifying Changes

### Visual Verification Best Practices
- **Establish clear baselines** - Capture screenshots of the current state before making changes to enable before/after comparison
- **Trust screenshots over CSS values** - Always verify changes by looking at actual screenshots, not just computed CSS values
- **Take comparative screenshots** - Capture before/after screenshots at the same viewport size and compare actual pixel positions
- **Use browser automation tools** - Leverage Playwright MCP to interactively test and verify changes in the browser
- **Test across states** - Verify changes work in different contexts (hover states, mobile/desktop, light/dark mode if applicable)

### Debugging Layout Issues
- CSS may report correct computed values but visual positioning can differ due to:
  - Fixed/absolute positioning
  - CSS transforms
  - Z-index layering
  - Flexbox/grid container constraints
- If a change isn't visible, investigate the DOM structure rather than assuming caching
- Use obviously large changes first (e.g., 100px) to verify you're targeting the correct element
- Check the element's position in the stacking context and parent containers

### Iterative Testing
- Make one change at a time and verify it works before proceeding
- If a fix doesn't work, try a different approach rather than tweaking the same method
- Use browser DevTools to inspect computed styles and layout in real-time

## Key Files
- `src/styles/custom.css` - Theme CSS (primary)
- `src/components/` - Starlight component overrides
- `astro.config.mjs` - Sidebar and Starlight config

## Setup
See `DEVELOPMENT.md` for dev server and MCP browser tools (uses Chrome or Chromium).
