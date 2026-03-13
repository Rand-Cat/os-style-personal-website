import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const rootDir = process.cwd();
const postsPath = path.join(rootDir, "src/data/jike-posts.generated.ts");
const translationsPath = path.join(rootDir, "src/data/jike-translations.ts");

function parseArgs(argv) {
  const options = {
    limit: 20,
    format: "summary",
    untranslatedOnly: true,
    topics: [],
    ids: []
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--limit" || arg === "-n") {
      const value = Number.parseInt(argv[index + 1] || "", 10);
      if (Number.isNaN(value) || value < 1) {
        throw new Error(`Invalid value for ${arg}: ${argv[index + 1] || ""}`);
      }
      options.limit = value;
      index += 1;
      continue;
    }

    if (arg === "--format") {
      const value = argv[index + 1];
      if (!["summary", "markdown", "ts"].includes(value)) {
        throw new Error(`Unsupported format: ${value || ""}`);
      }
      options.format = value;
      index += 1;
      continue;
    }

    if (arg === "--topic") {
      const value = argv[index + 1];
      if (!value) {
        throw new Error("Missing value for --topic");
      }
      options.topics.push(value);
      index += 1;
      continue;
    }

    if (arg === "--ids") {
      const value = argv[index + 1];
      if (!value) {
        throw new Error("Missing value for --ids");
      }
      options.ids.push(
        ...value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      );
      index += 1;
      continue;
    }

    if (arg === "--all") {
      options.untranslatedOnly = false;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function printHelp() {
  console.log(`Usage: npm run jike:translate:worklist -- [options]

Options:
  --limit, -n <number>     Number of posts to print (default: 20)
  --format <summary|markdown|ts>
                           Output format (default: summary)
  --topic <name>           Filter by topic, can be repeated
  --ids <id,id,...>        Output specific post ids in order
  --all                    Include translated posts too
  --help, -h               Show this help
`);
}

function loadPosts(filePath) {
  const source = fs
    .readFileSync(filePath, "utf8")
    .replace(/^\/\/.*$/gm, "")
    .replace("export const jikePosts =", "globalThis.jikePosts =");
  const context = { globalThis: {} };
  vm.createContext(context);
  vm.runInContext(source, context);
  return context.globalThis.jikePosts;
}

function loadTranslatedIds(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  return new Set([...source.matchAll(/"([0-9a-f]{24})": \{/g)].map((match) => match[1]));
}

function makeExcerpt(value) {
  return value.replace(/\s+/g, " ").trim().slice(0, 140);
}

function formatSummary(posts, stats) {
  const header = [
    `Total posts: ${stats.totalPosts}`,
    `Translated: ${stats.translatedPosts}`,
    `Untranslated: ${stats.untranslatedPosts}`,
    `Showing: ${posts.length}`
  ];

  const lines = posts.map(
    (post) =>
      `- ${post.dateLabel} | ${post.topic} | ${post.id} | ${makeExcerpt(post.content || post.repost?.content || "")}`
  );

  return `${header.join("\n")}\n\n${lines.join("\n")}`;
}

function formatMarkdown(posts, stats) {
  const sections = posts.map((post) => {
    const blocks = [`## ${post.dateLabel} | ${post.topic} | ${post.id}`, ""];

    if (post.content) {
      blocks.push("Post content:", "", "```text", post.content, "```", "");
    }

    if (post.repost?.content) {
      blocks.push("Repost content:", "", "```text", post.repost.content, "```", "");
    }

    if (!post.content && !post.repost?.content) {
      blocks.push("Post content:", "", "```text", "", "```", "");
    }

    blocks.push(
      "Translation stub:",
      "",
      "```ts",
      `"${post.id}": {`,
      `  content: \`\`,`,
      `  excerpt: \`\`${post.repost?.content ? "," : ""}`
    );

    if (post.repost?.content) {
      blocks.push("  repost: {", "    content: ``", "  }");
    }

    blocks.push("},", "```");

    return blocks.join("\n");
  });

  return [
    `# Jike Translation Worklist`,
    "",
    `- Total posts: ${stats.totalPosts}`,
    `- Translated: ${stats.translatedPosts}`,
    `- Untranslated: ${stats.untranslatedPosts}`,
    `- Showing: ${posts.length}`,
    "",
    ...sections
  ].join("\n");
}

function formatTs(posts) {
  return posts
    .map((post) => {
      const originalLines = post.content
        ? post.content
            .split("\n")
            .map((line) => `  // ${line}`)
            .join("\n")
        : "";
      const repostLines = post.repost?.content
        ? post.repost.content
            .split("\n")
            .map((line) => `  // ${line}`)
            .join("\n")
        : "";
      const lines = [
        `  // ${post.dateLabel} | ${post.topic}`,
        `  // ${makeExcerpt(post.content || post.repost?.content || "")}`
      ];

      if (originalLines) {
        lines.push("  // Original post:", originalLines);
      }

      if (repostLines) {
        lines.push("  // Repost content:", repostLines);
      }

      lines.push(`  "${post.id}": {`, `    content: \`\`,`, `    excerpt: \`\``);

      if (post.repost?.content) {
        lines[lines.length - 1] += ",";
        lines.push("    repost: {", "      content: ``", "    }");
      }

      lines.push("  },");
      return lines.join("\n");
    })
    .join("\n\n");
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const posts = loadPosts(postsPath);
  const translatedIds = loadTranslatedIds(translationsPath);
  const stats = {
    totalPosts: posts.length,
    translatedPosts: translatedIds.size,
    untranslatedPosts: posts.length - translatedIds.size
  };

  let filtered = posts;

  if (options.untranslatedOnly) {
    filtered = filtered.filter((post) => !translatedIds.has(post.id));
  }

  if (options.topics.length > 0) {
    const topicSet = new Set(options.topics);
    filtered = filtered.filter((post) => topicSet.has(post.topic));
  }

  if (options.ids.length > 0) {
    const postById = new Map(filtered.map((post) => [post.id, post]));
    filtered = options.ids.map((id) => postById.get(id)).filter(Boolean);
  } else {
    filtered = filtered.slice(0, options.limit);
  }

  if (options.format === "markdown") {
    console.log(formatMarkdown(filtered, stats));
    return;
  }

  if (options.format === "ts") {
    console.log(formatTs(filtered));
    return;
  }

  console.log(formatSummary(filtered, stats));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
