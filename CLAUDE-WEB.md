# Claude Code for Web Notes

This file contains setup notes specific to Claude Code running in web environments.

## Setup

**Installing dependencies:**

```bash
bun install
```

If the puppeteer postinstall fails (network-restricted environments), use:

```bash
PUPPETEER_SKIP_DOWNLOAD=true bun install
```

**Dev server:** `bun run dev` (runs at http://localhost:4321)

## Known Issues

**MCP browser tools may not be available:** The `.mcp.json` configures Playwright/Puppeteer MCP servers, but these only work if Claude Code loads them at startup. If MCP tools aren't available, you cannot use browser automation for visual verification. Check available tools or ask the user to verify visually.

**Puppeteer download may fail:** The `@modelcontextprotocol/server-puppeteer` package triggers browser downloads during `bun install`. In restricted environments, use `PUPPETEER_SKIP_DOWNLOAD=true` as shown above.
