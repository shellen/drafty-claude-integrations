#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

const DRAFTY_API_BASE = "https://www.drafty.com";

// Get API key from environment
const API_KEY = process.env.DRAFTY_API_KEY;

if (!API_KEY) {
  console.error("Error: DRAFTY_API_KEY environment variable is required");
  process.exit(1);
}

// Create MCP server
const server = new Server(
  {
    name: "drafty",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
const TOOLS: Tool[] = [
  {
    name: "create_post",
    description: "Create and publish a new blog post on Drafty",
    inputSchema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Post title",
        },
        content: {
          type: "string",
          description: "Post content in Markdown format",
        },
        visibility: {
          type: "string",
          enum: ["public", "unlisted", "private"],
          default: "public",
          description: "Post visibility setting",
        },
        tags: {
          type: "array",
          items: { type: "string" },
          description: "Optional tags for the post",
        },
      },
      required: ["title", "content"],
    },
  },
  {
    name: "list_posts",
    description: "List recent blog posts from Drafty",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          default: 10,
          description: "Maximum number of posts to return",
        },
      },
    },
  },
  {
    name: "update_post",
    description: "Update an existing Drafty post",
    inputSchema: {
      type: "object",
      properties: {
        postId: {
          type: "string",
          description: "ID of the post to update",
        },
        title: {
          type: "string",
          description: "New post title",
        },
        content: {
          type: "string",
          description: "New post content in Markdown",
        },
        visibility: {
          type: "string",
          enum: ["public", "unlisted", "private"],
          description: "New visibility setting",
        },
        tags: {
          type: "array",
          items: { type: "string" },
          description: "New tags",
        },
      },
      required: ["postId"],
    },
  },
];

// Handle tool list request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "create_post": {
        const response = await fetch(`${DRAFTY_API_BASE}/api/integrations/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Drafty-API-Key": API_KEY,
          },
          body: JSON.stringify({
            title: args.title,
            content: args.content,
            visibility: args.visibility || "public",
            tags: args.tags || [],
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Failed to create post: ${error}`);
        }

        const data = await response.json();
        return {
          content: [
            {
              type: "text",
              text: `✅ Post created successfully!\n\nTitle: ${args.title}\nURL: ${data.url}\nVisibility: ${args.visibility || "public"}`,
            },
          ],
        };
      }

      case "list_posts": {
        const response = await fetch(
          `${DRAFTY_API_BASE}/api/integrations/posts?limit=${args.limit || 10}`,
          {
            headers: {
              "X-Drafty-API-Key": API_KEY,
            },
          }
        );

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Failed to list posts: ${error}`);
        }

        const data = await response.json();
        const posts = data.posts || [];

        if (posts.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: "No posts found.",
              },
            ],
          };
        }

        const postList = posts
          .map(
            (post: any, index: number) =>
              `${index + 1}. **${post.title || "Untitled"}**\n   ID: ${post.id}\n   URL: ${post.url}\n   Visibility: ${post.visibility}\n   Published: ${new Date(post.publishedAt).toLocaleDateString()}`
          )
          .join("\n\n");

        return {
          content: [
            {
              type: "text",
              text: `Found ${posts.length} post(s):\n\n${postList}`,
            },
          ],
        };
      }

      case "update_post": {
        const updateData: any = {};
        if (args.title) updateData.title = args.title;
        if (args.content) updateData.content = args.content;
        if (args.visibility) updateData.visibility = args.visibility;
        if (args.tags) updateData.tags = args.tags;

        const response = await fetch(
          `${DRAFTY_API_BASE}/api/integrations/posts/${args.postId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "X-Drafty-API-Key": API_KEY,
            },
            body: JSON.stringify(updateData),
          }
        );

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Failed to update post: ${error}`);
        }

        const data = await response.json();
        return {
          content: [
            {
              type: "text",
              text: `✅ Post updated successfully!\n\nURL: ${data.url}`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `❌ Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Drafty MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
