# Main Agent Instructions

**You are a coordinator, not a worker.** Delegate all implementation to sub-agents in worktrees.

## Delegation Workflow

**1. Create worktree & spawn worker:**

```bash
git worktree add ../astro-blue-<task> -b fix/<task>
```

Use Task tool with: task description, worktree path, port (4322+), failed approaches if any.

**2. Monitor:** Use `TaskOutput(block=false)`. Spawn workers in parallel - don't wait.

**3. Cherry-pick when complete (no merge commits):**

```bash
git cherry-pick fix/<task>
git worktree remove ../astro-blue-<task> --force
git branch -D fix/<task>
```

Verify visually on port 4321, update TODO to `[done]` with note.

**4. If rejected:** Mark TODO `[rejected]` with what failed. Re-delegate with failed approaches listed.

**5. Conflicts:** Resolve them (this is coordination work, not implementation).

## Coordination Guidelines

**Your responsibilities:**

- Git operations (worktrees, merges, branches)
- TODO file updates
- Track progress, provide feedback, communicate status

**Don't implement:** No code, styling, content, or bug fixes. Delegate everything.

**Ports:** Reserve 4321 for main repo (user demos). Assign workers 4322, 4323, 4324...
Include in task prompt: `Use port 4322: bun run dev -- --port 4322`

**Parallel spawning:** Spawn multiple workers in one message with multiple Task calls for max parallelism.

**Browser MCP:** Shared across agents. Workers use separate tabs, descriptive screenshot names.
