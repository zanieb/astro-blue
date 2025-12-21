# Developer Scripts

## Visual Regression Testing

### Updating Snapshots

To update visual regression snapshots to match the CI environment (Linux):

```bash
./dev/update-snapshots.sh
```

This runs Playwright tests in Docker using the same image as CI, ensuring consistent snapshots across all platforms.

**Requirements:**

- Docker installed and running
- Sufficient disk space for Playwright Docker image (~1GB)

**When to use:**

- You've made intentional visual changes to the UI
- Snapshots need to be regenerated after CSS refactoring
- New pages/components added that need baseline screenshots

**After running:**
Review the changes with `git diff tests/__screenshots__/` before committing.
