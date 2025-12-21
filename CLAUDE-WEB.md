# Claude Code for Web Notes

Web environments have limited capabilities compared to local Claude Code.

## Setup

Dependencies must be installed before running build commands:

```bash
PUPPETEER_SKIP_DOWNLOAD=true bun install
```

Use `PUPPETEER_SKIP_DOWNLOAD=true` to avoid network failures from puppeteer trying to download browsers.

## Validation

Run `bun run build` to catch compile errors.

For CSS/styling changes, push the branch and fetch the Vercel preview to verify.
Preview URL: `astro-blue-git-{branch}-zaniebs-projects.vercel.app` (branch lowercase, slashes become dashes)

If you get a 503, the deployment is still building - wait and retry.
