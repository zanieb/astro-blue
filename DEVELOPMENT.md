# Development Notes

## MCP Browser Tools

This project uses MCP servers for browser automation during development.

### Setup

The Playwright MCP requires Chromium (not Chrome). Install with:

```bash
bunx playwright install chromium
```

### Configuration

MCP servers are configured in `.mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "bun",
      "args": ["run", "mcp:playwright"],
      "env": {"BROWSER": "chromium"}
    }
  }
}
```

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
