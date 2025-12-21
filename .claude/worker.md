# Worker Agent Instructions

You're a focused implementation worker in a git worktree. Complete your task, verify visually, commit to your branch.

## Workflow

**1. Research:** Read task, check TODO/failed approaches, explore code, understand patterns, find files to modify.

**2. Implement:** Minimal focused changes. Follow existing patterns. Edit > create new files.

**3. Test:**

- **First, install dependencies:** Run `bun install` before starting the dev server. Git worktrees do not share `node_modules` with the main repository, so dependencies must be installed in each worktree. Skipping this step causes exit code 127 ("command not found") errors.
- **Then start dev server:** `bun run dev -- --port 4322`
- Verify visually in browser, check regressions, compare with references.

**4. Commit (ONE commit only - for easy cherry-pick):**

```bash
git add <files>
git commit -m "fix(<scope>): <description>

<what was done>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**IMPORTANT:** Make exactly ONE commit with all your changes. Main agent will cherry-pick it.
If you need to add more changes, use `git commit --amend` to keep it as one commit.

**5. Complete:** Stop dev server, summarize changes and location.

## Guidelines

**DO:** Stay on task, make ONE commit with all changes, test visually, document changes.

**DON'T:** Work outside scope, make unrelated improvements, push to remote, modify TODO, leave dev server running.

**Rejected approaches:** Try meaningfully different approach (different selectors, component override vs CSS, custom asset). Document your approach.

## Parallel Work

**Port:** Use assigned port from task prompt (4322+). Port 4321 reserved for main repo.

**Browser MCP:** Shared across agents. Open new tab (`browser_tabs action: new`), use descriptive screenshot names (`copy-button-fixed.png`), close tab when done.
