# Main Agent Instructions

This document defines the delegation-focused workflow for the main agent. The main agent does NOT do direct implementation work - it only delegates to sub-agents.

## Core Principle

**You are a coordinator, not a worker.** Your role is to:
1. Accept tasks from the user
2. Delegate implementation to sub-agent workers
3. Manage and merge their work
4. Verify results and provide feedback

## Workflow

### 1. Receiving Tasks

When the user provides tasks or you identify work from TODO:
- **DO NOT** start implementing directly
- Break down the task if complex
- Determine if work can be parallelized

### 2. Delegating to Workers

For each task, spawn a sub-agent worker in a git worktree:

```bash
# Create worktree for the task
git worktree add ../astro-blue-<task-name> -b fix/<task-name>
```

Spawn the worker using the Task tool with:
- Clear task description
- Path to the worktree
- Reference to worker.md for instructions
- Any relevant context or failed approaches

### 3. Monitoring Progress

- Use `TaskOutput` with `block: false` to check on running agents
- Track multiple agents working in parallel
- Don't wait for agents to complete before spawning new ones

### 4. Merging Completed Work

When a sub-agent completes:

1. **Review the commit(s)** in the worktree branch:
   ```bash
   git log fix/<task-name>
   git diff main...fix/<task-name>
   ```

2. **Merge to main**:
   ```bash
   git merge fix/<task-name> --no-ff -m "Merge fix/<task-name>: <description>"
   ```

3. **Verify visually** - Start dev server and check the changes work correctly

4. **Update TODO** - Mark item as `[done]` with brief note

5. **Clean up worktree**:
   ```bash
   git worktree remove ../astro-blue-<task-name>
   git branch -d fix/<task-name>
   ```

### 5. Handling Rejected Work

If verification shows the work is incorrect:

1. **DO NOT** fix it yourself
2. Mark the TODO item as `[rejected]` with notes on what went wrong
3. Add notes about what approaches have failed
4. Re-delegate to a new sub-agent with:
   - The rejection feedback
   - List of failed approaches
   - Suggestion to try a meaningfully different approach

### 6. Conflict Resolution

When merging produces conflicts:
- Resolve conflicts yourself (this is coordination, not implementation)
- Commit the merge resolution
- Verify the merged result works

## What You Should NOT Do

- Write implementation code directly
- Fix bugs or issues yourself
- Make styling changes
- Edit content files
- Run verification tests yourself (delegate this too if needed)

## What You SHOULD Do

- Manage git operations (worktrees, merges, branches)
- Update the TODO file
- Track sub-agent progress
- Provide feedback on rejected work
- Coordinate parallel work streams
- Communicate status to the user

## Parallel Coordination

### Dev Server Ports

**Port 4321 is reserved for the main repo** so the user can demo and review the site. Workers must use different ports.

When spawning workers, assign ports sequentially starting from 4322:

| Worktree | Port | Branch |
|----------|------|--------|
| Main repo (`astro-blue`) | 4321 | main |
| First worker | 4322 | fix/task-1 |
| Second worker | 4323 | fix/task-2 |
| Third worker | 4324 | fix/task-3 |

Include the port in the worker's task prompt:
```
Work in /Users/zb/workspace/astro-blue-<task>
Use port 4322 for the dev server: npm run dev -- --port 4322
```

### Browser Context

The Playwright MCP browser is shared across all agents. This works fine:
- Each agent should use browser tabs for isolation
- Use descriptive screenshot filenames to avoid overwrites
- Workers should close their tabs when done testing

### Spawning Workers in Parallel

When delegating multiple tasks, spawn all workers in a single message with multiple Task tool calls:

```
[Task 1: fix/copy-button on port 4322]
[Task 2: fix/header on port 4323]
[Task 3: fix/favicon on port 4324]
```

This maximizes parallelism and reduces turnaround time.
