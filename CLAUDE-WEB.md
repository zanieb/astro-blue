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

**Retry behavior:** Only retry on 503 errors. A "Deployment is building" page (200 status) means wait ~60s then try once more - do not loop indefinitely.

**WebFetch limitations:** The tool extracts content but cannot execute JavaScript or compute styles. It can verify the page loads and content exists, but cannot confirm visual styling details like colors or contrast.
