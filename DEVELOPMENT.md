# Development Notes

## MCP Browser Tools

This project uses MCP servers for browser automation during development.

### Setup

The Playwright MCP works with either Chrome or Chromium. Install Chromium with:

```bash
bunx playwright install chromium
```

Or use Chrome if already installed.

### Configuration

MCP servers are configured in `.mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "bun",
      "args": ["run", "mcp:playwright"],
      "env": { "BROWSER": "chromium" }
    }
  }
}
```

Note: The `BROWSER` env var can be set to `"chromium"` or `"chrome"` depending on your installation.

### Running the Dev Server

```bash
bun run dev
```

The site runs at http://localhost:4321

## Theme Customization

Working on matching Mintlify styling. See `MINTLIFY_DIFFERENCES.md` for remaining items.

Key files:

- `src/styles/custom.css` - Main theme styling
- `src/components/` - Custom Starlight component overrides
- `astro.config.mjs` - Sidebar and Starlight configuration
