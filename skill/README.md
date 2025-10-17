# Drafty Agent Skill for Claude Code

Type `/drafty` in Claude Code to create and manage blog posts on Drafty.com.

## Quick Start

### Install

```bash
git clone https://github.com/yourusername/drafty-claude-integrations
cd drafty-claude-integrations
# Claude Code will discover skill/ directory automatically
```

### Set API Key

```bash
export DRAFTY_API_KEY="your_api_key_here"
```

Get your API key from:
1. https://www.drafty.com/dash
2. Settings → Advanced → Developer Tools (Pro feature)

### Use in Claude Code

Type `/drafty` to activate the skill, then:

```
You: /drafty write a blog post about TypeScript best practices

Claude: I'll draft and publish a blog post about TypeScript best practices...
[Creates post via API]
✅ Published: TypeScript Best Practices
🔗 https://drafty.com/@yourname/typescript-best-practices
```

## Prerequisites

1. **Drafty Pro account** ($5/month after trial) - API keys are Pro-only
2. **Claude Code** (part of Claude desktop app)
3. **API key** from Drafty settings

## What Can You Do?

### Create Blog Posts

```
/drafty write a post about building REST APIs in Node.js
```

Claude will:
1. Research the topic (if needed)
2. Draft Markdown content
3. Generate an SEO-friendly title
4. Publish to Drafty
5. Return the post URL

### List Posts

```
/drafty show me my recent posts
```

Claude will display your posts with titles, URLs, and publication dates.

### Update Posts

```
/drafty update my latest post to fix a typo
```

Claude will find and update the post.

### Create Private Notes

```
/drafty save a quick note about today's meeting (private)
```

Claude will create a private post only visible to you.

## Skill Files

- **SKILL.md** - Main skill definition with workflows and API reference
- **examples.md** - Real-world usage examples
- **README.md** - This file

## Advanced Usage

### Batch Operations

```
/drafty create 3 draft posts for next week's content calendar
```

### Content Analysis

```
/drafty show me all my posts from last month
```

### Chaining with Other Skills

```
/drafty research web3 trends, then write a blog post about it
```

## Troubleshooting

### Skill Not Activating

1. Ensure skill directory is in Claude Code's path
2. Check `DRAFTY_API_KEY` environment variable is set
3. Verify `SKILL.md` has proper YAML frontmatter
4. Restart Claude Code

### "Invalid API Key" Error

1. Verify you have a Drafty Pro account
2. Check API key starts with `drafty_`
3. Ensure no extra spaces
4. Try regenerating in Drafty settings

### Rate Limiting

- Trial users: 10 posts/hour
- Pro users: Higher limits
- Wait and retry if you hit limits

## Examples

See [examples.md](examples.md) for detailed workflow examples including:
- Creating technical blog posts
- Quick private notes
- Updating existing posts
- Batch content creation
- Content analysis

## License

MIT

## Links

- [Main Integration Repo](https://github.com/yourusername/drafty-claude-integrations)
- [Drafty.com](https://www.drafty.com)
- [Agent Skills Guide](https://docs.anthropic.com/claude/docs/agent-skills)
- [Report Issues](https://github.com/yourusername/drafty-claude-integrations/issues)
