# Drafty Integrations for Claude

Official integrations for using [Drafty.com](https://www.drafty.com) with Claude Desktop and Claude Code.

**Write and publish blog posts using AI assistance.**

## What's Included

### 🖥️ MCP Server (Claude Desktop)

Blog post management tools that appear natively in Claude Desktop.

**Features:**
- Create, list, and update blog posts
- Manage post visibility (public, unlisted, private)
- Add tags and organize content
- All from within Claude Desktop

**Quick Start:**
```bash
npm install -g @drafty/mcp-server
```

👉 [Full MCP Server Documentation](mcp-server/README.md)

### ⌨️ Agent Skill (Claude Code)

Type `/drafty` in Claude Code to activate blog post workflows.

**Features:**
- Draft blog posts with AI assistance
- Publish directly from Claude Code
- Manage existing posts
- Create private notes and drafts

**Quick Start:**
```bash
git clone https://github.com/yourusername/drafty-claude-integrations
cd drafty-claude-integrations
# Claude Code will discover skill/ automatically
```

👉 [Full Agent Skill Documentation](skill/README.md)

## Prerequisites

Both integrations require:

1. **Drafty Pro account** ($5/month after 7-day trial)
2. **API key** from your Drafty settings

### Getting Your API Key

1. Go to https://www.drafty.com/dash
2. Click **Settings** → **Advanced** → **Developer Tools**
3. Copy your API key (starts with `drafty_`)

**Free users:** API keys are a Pro-only feature. OAuth integration is available for free users via [ChatGPT GPTs](https://www.drafty.com/docs/integrations/chatgpt).

## Installation

### Claude Desktop (MCP Server)

#### Option 1: Install from npm (Recommended)

```bash
npm install -g @drafty/mcp-server
```

Then configure Claude Desktop:

**macOS:** Edit `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** Edit `%APPDATA%\Claude\claude_desktop_config.json`

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

Restart Claude Desktop and look for the 🔨 hammer icon.

#### Option 2: Install from source

```bash
git clone https://github.com/yourusername/drafty-claude-integrations
cd drafty-claude-integrations/mcp-server
npm install
npm run build
```

Then configure with absolute path to `dist/index.js`.

### Claude Code (Agent Skill)

#### Option 1: Clone entire repo

```bash
git clone https://github.com/yourusername/drafty-claude-integrations
cd drafty-claude-integrations
# Claude Code will discover skill/ directory
```

#### Option 2: Symlink just the skill

```bash
git clone https://github.com/yourusername/drafty-claude-integrations
ln -s "$(pwd)/drafty-claude-integrations/skill" ~/.config/claude/skills/drafty
```

Set your API key:
```bash
export DRAFTY_API_KEY="your_api_key_here"
```

In Claude Code, type `/drafty` to activate the skill.

## Usage Examples

### Create a Blog Post (MCP Server)

In Claude Desktop:
```
You: Write a blog post about building REST APIs in Node.js

Claude: I'll help you create a comprehensive blog post about building REST APIs...
[Uses create_post tool]
✅ Post published at https://drafty.com/@yourname/building-rest-apis
```

### Create a Blog Post (Agent Skill)

In Claude Code:
```
You: /drafty write a post about TypeScript best practices

Claude: I'll draft a blog post about TypeScript best practices and publish it to Drafty...
[Creates post via API]
✅ Published: TypeScript Best Practices
🔗 https://drafty.com/@yourname/typescript-best-practices
```

### List Your Posts

```
You: Show me my recent blog posts

Claude: [Lists posts with titles, URLs, and publication dates]
```

### Update a Post

```
You: Update my latest post to fix a typo in the title

Claude: [Finds most recent post and updates it]
✅ Post updated
```

## API Reference

Both integrations use the same Drafty API:

### Create Post
```
POST /api/integrations/posts
Headers: X-Drafty-API-Key: your_key

Body: {
  "title": "string",
  "content": "markdown string",
  "visibility": "public|unlisted|private",
  "tags": ["string"]
}
```

### List Posts
```
GET /api/integrations/posts?limit=10
Headers: X-Drafty-API-Key: your_key
```

### Update Post
```
PATCH /api/integrations/posts/{postId}
Headers: X-Drafty-API-Key: your_key

Body: {
  "title": "string",
  "content": "markdown string",
  "visibility": "public|unlisted|private",
  "tags": ["string"]
}
```

## Web Integrations

Looking for web-based integrations?

- **ChatGPT GPT**: [Custom GPT Guide](https://www.drafty.com/docs/integrations/chatgpt)
- **OAuth Integration**: [OAuth Guide](https://www.drafty.com/docs/integrations/oauth)
- **Claude API**: Use function calling with the API endpoints above

## Troubleshooting

### "Invalid API Key" Error

1. Verify you have a Drafty Pro account
2. Check your API key starts with `drafty_`
3. Ensure no extra spaces in the key
4. Try regenerating your API key in settings

### MCP Server Not Showing in Claude Desktop

1. Check `claude_desktop_config.json` is valid JSON
2. Verify API key is set in `env` section
3. Restart Claude Desktop completely
4. Check logs: `~/Library/Logs/Claude/mcp*.log` (macOS)

### Agent Skill Not Activating

1. Ensure skill directory is in Claude Code's path
2. Check `DRAFTY_API_KEY` environment variable is set
3. Verify `SKILL.md` has proper YAML frontmatter
4. Restart Claude Code

### Rate Limiting

- Free trial: 10 posts/hour
- Pro users: Higher limits
- Wait and retry if you hit limits

## Contributing

Found a bug or want to contribute?

1. Fork this repository
2. Create a feature branch
3. Submit a pull request

## Support

- **Drafty Issues**: support@drafty.com
- **MCP Issues**: [GitHub Issues](https://github.com/yourusername/drafty-claude-integrations/issues)
- **MCP Protocol**: https://github.com/anthropics/mcp/issues

## License

MIT

## Links

- [Drafty.com](https://www.drafty.com)
- [Drafty Documentation](https://www.drafty.com/docs)
- [MCP Documentation](https://modelcontextprotocol.io)
- [Agent Skills Guide](https://docs.anthropic.com/claude/docs/agent-skills)
- [Anthropic Claude](https://claude.ai)

---

Built with ❤️ for the Drafty community
