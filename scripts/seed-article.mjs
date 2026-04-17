/**
 * Seed a blog article into Supabase from a markdown content file.
 *
 * Usage:
 *   node scripts/seed-article.mjs content/articles/02-jasa-pembuatan-website-semarang.md
 *
 * Reads the .env file for SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL.
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// Load .env manually (no dotenv dependency needed)
// ---------------------------------------------------------------------------
const envPath = resolve(import.meta.dirname, "..", ".env");
const envContent = readFileSync(envPath, "utf8");
const env = {};
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  env[trimmed.slice(0, eqIdx)] = trimmed.slice(eqIdx + 1);
}

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SERVICE_KEY in .env");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Read & parse the markdown file
// ---------------------------------------------------------------------------
const filePath = resolve(process.argv[2]);
const raw = readFileSync(filePath, "utf8");

// --- Extract metadata from the top section ---
function meta(label) {
  const re = new RegExp(`\\*\\*${label}\\*\\*:\\s*(.+)`, "i");
  const m = raw.match(re);
  return m ? m[1].trim().replace(/^`|`$/g, "") : null;
}

const slug = meta("Slug");
const category = meta("Category");
const author = meta("Author") || "Bratamedia";

// Tags: **Tags**: `semarang`, `jawa tengah`, ...
const tagsMatch = raw.match(/\*\*Tags\*\*:\s*(.+)/i);
const tags = tagsMatch
  ? tagsMatch[1]
      .split(",")
      .map((t) => t.trim().replace(/^`|`$/g, ""))
  : [];

// SEO metadata
function metaField(section, label) {
  // Find section first, then the label within it
  const sectionRe = new RegExp(
    `## SEO Metadata.*${section}[\\s\\S]*?(?=## |---|\n# )`,
    "i"
  );
  const sectionMatch = raw.match(sectionRe);
  if (!sectionMatch) return null;
  const fieldRe = new RegExp(`\\*\\*${label}\\*\\*:\\s*(.+)`, "i");
  const m = sectionMatch[0].match(fieldRe);
  return m ? m[1].trim().replace(/\s*\(\d+ chars?\)$/, "") : null;
}

const title_id = metaField("Indonesian", "Meta title") || metaField("id", "Meta title");
const title_en = metaField("English", "Meta title") || metaField("en", "Meta title");
const excerpt_id = metaField("Indonesian", "Meta description") || metaField("id", "Meta description");
const excerpt_en = metaField("English", "Meta description") || metaField("en", "Meta description");

// ---------------------------------------------------------------------------
// Convert markdown body to Tiptap JSON
// ---------------------------------------------------------------------------
function mdToTiptap(md) {
  const nodes = [];
  const lines = md.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Horizontal rule
    if (/^---\s*$/.test(line.trim())) {
      nodes.push({ type: "horizontalRule" });
      i++;
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      nodes.push({
        type: "heading",
        attrs: { level, textAlign: null },
        content: parseInline(text),
      });
      i++;
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const itemText = lines[i].replace(/^\d+\.\s*/, "").trim();
        items.push({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: null },
              content: parseInline(itemText),
            },
          ],
        });
        i++;
        // Continuation lines (indented or empty between items)
        while (i < lines.length && lines[i].trim() !== "" && !/^\d+\.\s/.test(lines[i].trim()) && !/^[-*]\s/.test(lines[i].trim()) && !/^#/.test(lines[i].trim()) && !/^---/.test(lines[i].trim())) {
          const lastItem = items[items.length - 1];
          const lastPara = lastItem.content[lastItem.content.length - 1];
          lastPara.content.push({ type: "hardBreak" });
          lastPara.content.push(...parseInline(lines[i].trim()));
          i++;
        }
      }
      nodes.push({
        type: "orderedList",
        attrs: { start: 1 },
        content: items,
      });
      continue;
    }

    // Unordered list
    if (/^[-*]\s/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) {
        const itemText = lines[i].replace(/^[-*]\s*/, "").trim();
        items.push({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: null },
              content: parseInline(itemText),
            },
          ],
        });
        i++;
      }
      nodes.push({
        type: "bulletList",
        content: items,
      });
      continue;
    }

    // Empty line — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph — collect consecutive non-empty, non-special lines
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,4}\s/.test(lines[i]) &&
      !/^---\s*$/.test(lines[i].trim()) &&
      !/^[-*]\s/.test(lines[i].trim()) &&
      !/^\d+\.\s/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      nodes.push({
        type: "paragraph",
        attrs: { textAlign: null },
        content: parseInline(paraLines.join(" ")),
      });
    }
  }

  return { type: "doc", content: nodes };
}

function parseInline(text) {
  const result = [];
  // Simple inline parsing: **bold**, *italic*, [link](url)
  const re = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\[(.+?)\]\((.+?)\))/g;
  let lastIdx = 0;
  let match;

  while ((match = re.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIdx) {
      result.push({ type: "text", text: text.slice(lastIdx, match.index) });
    }

    if (match[1]) {
      // Bold
      result.push({
        type: "text",
        text: match[2],
        marks: [{ type: "bold" }],
      });
    } else if (match[3]) {
      // Italic
      result.push({
        type: "text",
        text: match[4],
        marks: [{ type: "italic" }],
      });
    } else if (match[5]) {
      // Link
      result.push({
        type: "text",
        text: match[6],
        marks: [
          {
            type: "link",
            attrs: {
              href: match[7],
              target: "_blank",
              rel: "noopener noreferrer nofollow",
              class: null,
            },
          },
        ],
      });
    }

    lastIdx = match.index + match[0].length;
  }

  // Remaining text
  if (lastIdx < text.length) {
    result.push({ type: "text", text: text.slice(lastIdx) });
  }

  return result.length > 0 ? result : [{ type: "text", text }];
}

// ---------------------------------------------------------------------------
// Extract ID and EN body sections
// ---------------------------------------------------------------------------
function extractBody(marker) {
  const idx = raw.indexOf(marker);
  if (idx === -1) return "";
  let body = raw.slice(idx + marker.length);
  // Stop at next top-level section
  const nextSection = body.search(/\n# [^#]/);
  if (nextSection !== -1) {
    body = body.slice(0, nextSection);
  }
  return body.trim();
}

const bodyId = extractBody("# Versi Indonesia");
const bodyEn = extractBody("# English Version");

if (!bodyId || !bodyEn) {
  console.error("Could not find '# Versi Indonesia' or '# English Version' sections");
  process.exit(1);
}

const content_id = mdToTiptap(bodyId);
const content_en = mdToTiptap(bodyEn);

// ---------------------------------------------------------------------------
// Insert into Supabase
// ---------------------------------------------------------------------------
const article = {
  slug,
  title_id,
  title_en,
  excerpt_id,
  excerpt_en,
  content_id,
  content_en,
  category,
  tags,
  author_name: author,
  is_published: true,
  published_at: new Date().toISOString(),
  sort_order: 0,
};

console.log("=== Article to insert ===");
console.log("slug:", article.slug);
console.log("title_id:", article.title_id);
console.log("title_en:", article.title_en);
console.log("excerpt_id:", article.excerpt_id?.substring(0, 80) + "...");
console.log("category:", article.category);
console.log("tags:", article.tags);
console.log("content_id nodes:", article.content_id.content.length);
console.log("content_en nodes:", article.content_en.content.length);
console.log("");

const res = await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
  method: "POST",
  headers: {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
  body: JSON.stringify(article),
});

if (!res.ok) {
  const err = await res.text();
  console.error("Insert failed:", res.status, err);
  process.exit(1);
}

const inserted = await res.json();
console.log("Inserted article:", inserted[0]?.id);
console.log("Done!");
