# Drafty Skill Examples

Real-world examples of using the Drafty skill in Claude Code.

## Example 1: Create a Technical Blog Post

**User request:** "Write a blog post about building REST APIs in Node.js"

**Workflow:**

1. **Draft the content:**
```markdown
# Building REST APIs with Node.js and Express

REST APIs are the backbone of modern web applications. Let's build one from scratch.

## Prerequisites

- Node.js 18+
- Basic JavaScript knowledge
- Understanding of HTTP methods

## Setting Up

First, initialize your project:

\`\`\`bash
npm init -y
npm install express
\`\`\`

## Creating the Server

Create `server.js`:

\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});
\`\`\`

## Testing

Use curl to test your endpoint:

\`\`\`bash
curl http://localhost:3000/api/users
\`\`\`

## Next Steps

- Add authentication
- Implement database persistence
- Add input validation

Happy coding!
```

2. **Publish via API:**
```bash
curl -X POST https://www.drafty.com/api/integrations/posts \
  -H "Content-Type: application/json" \
  -H "X-Drafty-API-Key: $DRAFTY_API_KEY" \
  -d '{
    "title": "Building REST APIs with Node.js and Express",
    "content": "<content from step 1>",
    "visibility": "public",
    "tags": ["nodejs", "rest-api", "express", "tutorial"]
  }'
```

3. **Return to user:**
```
✅ Published: Building REST APIs with Node.js and Express
🔗 https://drafty.com/@yourname/building-rest-apis-with-nodejs-and-express
```

## Example 2: Quick Note (Private Post)

**User request:** "Save a quick note about today's standup meeting"

**Workflow:**

1. **Format as Markdown:**
```markdown
# Standup Notes - Oct 16, 2025

## Yesterday
- Completed user authentication flow
- Fixed API rate limiting bug
- Code review for PR #234

## Today
- Start dashboard redesign
- Meet with design team at 2pm
- Review Q4 roadmap

## Blockers
- None
```

2. **Post as private:**
```bash
curl -X POST https://www.drafty.com/api/integrations/posts \
  -H "Content-Type: application/json" \
  -H "X-Drafty-API-Key: $DRAFTY_API_KEY" \
  -d '{
    "title": "Standup Notes - Oct 16, 2025",
    "content": "<markdown from step 1>",
    "visibility": "private",
    "tags": ["notes", "standup"]
  }'
```

3. **Confirm:**
```
✅ Private note saved
🔗 https://drafty.com/@yourname/standup-notes-oct-16-2025
(Only visible to you when logged in)
```

## Example 3: Update a Post

**User request:** "Update my latest post to fix a typo in the title"

**Workflow:**

1. **List recent posts:**
```bash
curl https://www.drafty.com/api/integrations/posts?limit=1 \
  -H "X-Drafty-API-Key: $DRAFTY_API_KEY"
```

Response:
```json
{
  "posts": [
    {
      "id": "abc123",
      "title": "Building REST APis with Node.js",
      "slug": "building-rest-apis-with-nodejs",
      "url": "https://drafty.com/@yourname/building-rest-apis-with-nodejs"
    }
  ]
}
```

2. **Update the title:**
```bash
curl -X PATCH https://www.drafty.com/api/integrations/posts/abc123 \
  -H "Content-Type: application/json" \
  -H "X-Drafty-API-Key: $DRAFTY_API_KEY" \
  -d '{
    "title": "Building REST APIs with Node.js"
  }'
```

3. **Confirm:**
```
✅ Post updated: Building REST APIs with Node.js
🔗 https://drafty.com/@yourname/building-rest-apis-with-nodejs
```

## Example 4: Draft Multiple Posts

**User request:** "Create 3 draft posts for next week's content calendar"

**Workflow:**

Create each as `unlisted` (can share link but not publicly visible):

```bash
# Post 1: Monday
curl -X POST https://www.drafty.com/api/integrations/posts \
  -H "Content-Type: application/json" \
  -H "X-Drafty-API-Key: $DRAFTY_API_KEY" \
  -d '{
    "title": "Why TypeScript Makes You a Better Developer",
    "content": "# Why TypeScript Makes You a Better Developer\n\n[Draft content...]",
    "visibility": "unlisted",
    "tags": ["typescript", "programming"]
  }'

# Post 2: Wednesday
curl -X POST https://www.drafty.com/api/integrations/posts \
  -H "Content-Type: application/json" \
  -H "X-Drafty-API-Key: $DRAFTY_API_KEY" \
  -d '{
    "title": "10 Git Commands Every Developer Should Know",
    "content": "# 10 Git Commands Every Developer Should Know\n\n[Draft content...]",
    "visibility": "unlisted",
    "tags": ["git", "productivity"]
  }'

# Post 3: Friday
curl -X POST https://www.drafty.com/api/integrations/posts \
  -H "Content-Type: application/json" \
  -H "X-Drafty-API-Key: $DRAFTY_API_KEY" \
  -d '{
    "title": "Building a CI/CD Pipeline with GitHub Actions",
    "content": "# Building a CI/CD Pipeline with GitHub Actions\n\n[Draft content...]",
    "visibility": "unlisted",
    "tags": ["cicd", "github-actions", "devops"]
  }'
```

Return:
```
✅ Created 3 unlisted drafts:

📝 Monday: Why TypeScript Makes You a Better Developer
   https://drafty.com/@yourname/why-typescript-makes-you-better

📝 Wednesday: 10 Git Commands Every Developer Should Know
   https://drafty.com/@yourname/10-git-commands-every-developer

📝 Friday: Building a CI/CD Pipeline with GitHub Actions
   https://drafty.com/@yourname/building-cicd-pipeline-github-actions

(Posts are unlisted - you can share links but they won't appear on your blog)
```

## Example 5: Batch Content Analysis

**User request:** "Show me all my posts from the last month"

**Workflow:**

1. **Fetch posts:**
```bash
curl https://www.drafty.com/api/integrations/posts?limit=50 \
  -H "X-Drafty-API-Key: $DRAFTY_API_KEY"
```

2. **Filter and format:**
```
📊 Your Posts (Last 30 Days)

Public Posts (5):
1. Building REST APIs with Node.js - Oct 15
   🔗 https://drafty.com/@yourname/building-rest-apis

2. Why TypeScript Makes You Better - Oct 12
   🔗 https://drafty.com/@yourname/why-typescript

3. 10 Git Commands - Oct 10
   🔗 https://drafty.com/@yourname/git-commands

Unlisted Drafts (2):
4. CI/CD Pipeline Guide - Oct 16 (draft)
5. AWS Lambda Tutorial - Oct 14 (draft)

Private Notes (3):
6. Standup Notes - Oct 16
7. Project Ideas - Oct 13
8. Meeting Notes - Oct 11
```

## Tips for Using the Skill

### In Claude Code

Type `/drafty` to activate this skill, then ask:
- "Write a blog post about X"
- "Create a private note about Y"
- "List my recent posts"
- "Update my latest post"
- "Show me all my drafts"

### Chaining Commands

You can chain multiple operations:
```
User: "Create 3 posts about web performance, then show me all my published posts"

Claude:
1. Creates 3 posts about web performance
2. Lists all public posts
3. Returns summary with URLs
```

### Content Collaboration

Use with other skills:
```
User: "Research web3 trends, then write a blog post about it"

Claude:
1. Uses research skills to gather info
2. Synthesizes findings
3. Drafts blog post
4. Publishes to Drafty
```
