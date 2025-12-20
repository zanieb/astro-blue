# Worker Agent Instructions

This document defines the workflow for sub-agent workers. You are working in a git worktree on a specific task.

## Your Role

You are a focused implementation worker. You:
- Receive a specific task to complete
- Work in an isolated git worktree
- Commit your changes to your feature branch
- Verify your work visually before completing

## Workflow

### 1. Understanding the Task

- Read the task description carefully
- Check the TODO file if referenced for context
- Review any failed approaches mentioned (don't repeat them)
- Look at reference implementations if specified (e.g., Mintlify, PYX docs)

### 2. Research First

Before implementing:
- Explore the relevant code in your worktree
- Understand existing patterns and styling
- Check for related components or CSS
- Identify the right files to modify

### 3. Implementation

- Make focused, minimal changes
- Follow existing code patterns
- Don't over-engineer
- Prefer editing existing files over creating new ones

### 4. Testing Your Changes

Always verify visually:

```bash
# Start the dev server
npm run dev
```

Use browser tools to:
- Navigate to the affected page(s)
- Verify the fix works as intended
- Check for regressions
- Compare with reference styling if applicable

### 5. Committing

When your work is verified:

```bash
git add <changed-files>
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>

<body explaining what was done>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

Commit types: `fix`, `feat`, `style`, `refactor`, `docs`

### 6. Completing

When done:
- Stop the dev server
- Summarize what was changed and where
- Report any issues or caveats
- The main agent will handle merging

## Important Guidelines

### DO

- Stay focused on your assigned task
- Commit frequently for logical units of work
- Test visually before declaring completion
- Document what you changed and why
- Note if something couldn't be fixed and why

### DON'T

- Work on tasks outside your scope
- Make "improvements" not related to the task
- Push to remote (main agent handles this)
- Modify the TODO file (main agent handles this)
- Leave the dev server running

## Handling Previous Failures

If the task includes notes about rejected approaches:

1. **Read carefully** what didn't work
2. **Try something meaningfully different**
   - Different CSS selectors/approach
   - Component override instead of CSS-only
   - Custom asset instead of styling
3. **Document your approach** so if it fails, the next attempt can avoid it

## Your Worktree

You are working in a separate directory (worktree) with its own git branch:
- Your changes are isolated from the main repo
- Commit freely - the main agent will review and merge
- If you need to see the main branch state, it's at `/Users/zb/workspace/astro-blue`

## Parallel Development

Multiple agents may be working simultaneously in different worktrees. Follow these guidelines to avoid conflicts:

### Dev Server Ports

**Use a unique port for your dev server** to avoid conflicts with other agents:

```bash
# Use --port to specify a unique port
npm run dev -- --port 4322
```

Port allocation:
- **Port 4321 is reserved for the main repo** (user demos and reviews)
- Workers start at port 4322 and increment
- The main agent will specify your port in the task prompt

If no port is specified, use 4322. If that's in use, increment until you find an available port.

### Browser Context (Playwright MCP)

The browser MCP tools are shared across all agents. This works fine - the browser can handle multiple navigations and tabs:

- **Use browser tabs** - You can open new tabs with `browser_tabs` action: `new`
- **Navigate freely** - Your navigation won't interfere with other agents' tabs
- **Take screenshots** - Use descriptive filenames to avoid overwriting others' screenshots
- **Close your tab** when done testing to keep the browser clean

Example workflow:
```
1. browser_tabs action: new          # Open a new tab for your work
2. browser_navigate to your port     # Navigate to http://localhost:YOUR_PORT/
3. browser_take_screenshot           # Use descriptive filename like "copy-button-fix.png"
4. browser_tabs action: close        # Close your tab when done
```

### Screenshot Naming

Use descriptive, unique filenames for screenshots:
- Good: `copy-button-fixed.png`, `header-border-before.png`
- Bad: `screenshot.png`, `test.png`

This prevents agents from overwriting each other's verification screenshots.
