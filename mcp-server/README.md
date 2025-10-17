# Drafty MCP Server

MCP (Model Context Protocol) server for managing Drafty.com blog posts in Claude Desktop.

## Quick Start

### Install from npm (Coming Soon)

```bash
npm install -g @drafty/mcp-server
```

### Install from Source

```bash
git clone https://github.com/shellen/drafty-claude-integrations
cd drafty-claude-integrations/mcp-server
npm install
npm run build
```

## Prerequisites

1. **Drafty Pro account** ($5/month after trial) - API keys are Pro-only
2. **Claude Desktop** app (download from https://claude.ai/download)
3. **Node.js 18+**

## Getting Your API Key

1. Go to https://www.drafty.com/dash
2. Settings → Advanced → Developer Tools
3. Copy your API key (starts with `drafty_`)

## Configuration

Edit your Claude Desktop config:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### If installed via npm:

```json
{
  "mcpServers": {
    "drafty": {
      "command": "drafty-mcp-server",
      "env": {
        "DRAFTY_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### If installed from source:

```json
{
  "mcpServers": {
    "drafty": {
      "command": "node",
      "args": ["/absolute/path/to/drafty-claude-integrations/mcp-server/dist/index.js"],
      "env": {
        "DRAFTY_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

**Important:** Use absolute paths, not relative paths.

## Usage

After configuring, restart Claude Desktop completely. You'll see a 🔨 hammer icon indicating MCP tools are available.

### Create a Blog Post

```
You: Write a blog post about building REST APIs

Claude: [Creates post using create_post tool]
✅ Post published at https://drafty.com/@yourname/building-rest-apis
```

### List Your Posts

```
You: Show me my recent posts

Claude: [Uses list_posts tool]
Found 10 post(s):
1. **Building REST APIs** - https://drafty.com/@yourname/...
2. **TypeScript Tips** - https://drafty.com/@yourname/...
...
```

### Update a Post

```
You: Update my latest post title

Claude: [Uses update_post tool]
✅ Post updated
```

## Available Tools

### create_post
Create and publish a new blog post

**Parameters:**
- `title` (string, required): Post title
- `content` (string, required): Markdown content
- `visibility` (string, optional): `public`, `unlisted`, or `private` (default: `public`)
- `tags` (array, optional): Array of tag strings

### list_posts
List recent blog posts

**Parameters:**
- `limit` (number, optional): Max posts to return (default: 10, max: 50)

### update_post
Update an existing post

**Parameters:**
- `postId` (string, required): ID of post to update
- `title` (string, optional): New title
- `content` (string, optional): New Markdown content
- `visibility` (string, optional): New visibility setting
- `tags` (array, optional): New tags

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run watch
```

## Testing

### Test with MCP Inspector

```bash
DRAFTY_API_KEY=your_key npx @modelcontextprotocol/inspector node dist/index.js
```

This opens a web UI to test your tools.

### Test with Real API

```bash
# Set API key
export DRAFTY_API_KEY=your_key_here

# Build and run
npm run build
node dist/index.js
```

## Troubleshooting

### "Invalid API Key" Error

1. Verify you have a Drafty Pro account
2. Check API key starts with `drafty_`
3. Ensure no extra spaces in the key
4. Try regenerating key in Drafty settings

### MCP Server Not Showing

1. Check `claude_desktop_config.json` is valid JSON
2. Verify absolute path to `dist/index.js`
3. Ensure API key is in `env` section
4. Restart Claude Desktop completely
5. Check logs: `~/Library/Logs/Claude/mcp*.log` (macOS)

### Tool Calls Failing

1. Check network connectivity
2. Test API directly:
   ```bash
   curl -H "X-Drafty-API-Key: YOUR_KEY" \
     https://www.drafty.com/api/integrations/posts
   ```
3. Check MCP server console output

## Rate Limits

- Trial users: 10 posts/hour
- Pro users: Higher limits
- Wait and retry if you hit limits

## License

MIT

## Links

- [Main Integration Repo](https://github.com/shellen/drafty-claude-integrations)
- [Drafty.com](https://www.drafty.com)
- [MCP Documentation](https://modelcontextprotocol.io)
- [Report Issues](https://github.com/shellen/drafty-claude-integrations/issues)
