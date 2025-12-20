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
