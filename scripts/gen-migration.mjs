/**
 * Generate a SQL migration file from article markdown files.
 *
 * Usage:
 *   node scripts/gen-migration.mjs content/articles/01-*.md content/articles/02-*.md content/articles/03-*.md
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// Markdown parsing (same logic as seed-article.mjs)
// ---------------------------------------------------------------------------

function meta(raw, label) {
  const re = new RegExp(`\\*\\*${label}\\*\\*:\\s*(.+)`, "i");
  const m = raw.match(re);
  return m ? m[1].trim().replace(/^`|`$/g, "") : null;
}

function metaField(raw, section, label) {
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

function parseInline(text) {
  const result = [];
  const re = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\\?\[(.+?)\]\((.+?)\))/g;
  let lastIdx = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIdx)
      result.push({ type: "text", text: text.slice(lastIdx, match.index) });
    if (match[1]) {
      result.push({ type: "text", text: match[2], marks: [{ type: "bold" }] });
    } else if (match[3]) {
      result.push({
        type: "text",
        text: match[4],
        marks: [{ type: "italic" }],
      });
    } else if (match[5]) {
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
  if (lastIdx < text.length)
    result.push({ type: "text", text: text.slice(lastIdx) });
  return result.length > 0 ? result : [{ type: "text", text }];
}

function mdToTiptap(md) {
  const nodes = [];
  const lines = md.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^---\s*$/.test(line.trim())) {
      nodes.push({ type: "horizontalRule" });
      i++;
      continue;
    }
    const hm = line.match(/^(#{1,4})\s+(.+)/);
    if (hm) {
      nodes.push({
        type: "heading",
        attrs: { level: hm[1].length, textAlign: null },
        content: parseInline(hm[2].trim()),
      });
      i++;
      continue;
    }
    if (/^\d+\.\s/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: null },
              content: parseInline(lines[i].replace(/^\d+\.\s*/, "").trim()),
            },
          ],
        });
        i++;
      }
      nodes.push({ type: "orderedList", attrs: { start: 1 }, content: items });
      continue;
    }
    if (/^[-*]\s/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) {
        items.push({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: null },
              content: parseInline(lines[i].replace(/^[-*]\s*/, "").trim()),
            },
          ],
        });
        i++;
      }
      nodes.push({ type: "bulletList", content: items });
      continue;
    }
    if (line.trim() === "") {
      i++;
      continue;
    }
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
    if (paraLines.length > 0)
      nodes.push({
        type: "paragraph",
        attrs: { textAlign: null },
        content: parseInline(paraLines.join(" ")),
      });
  }
  return { type: "doc", content: nodes };
}

function extractBody(raw, marker) {
  const idx = raw.indexOf(marker);
  if (idx === -1) return "";
  let body = raw.slice(idx + marker.length);
  const next = body.search(/\n# [^#]/);
  if (next !== -1) body = body.slice(0, next);
  return body.trim();
}

function esc(s) {
  return s.replace(/'/g, "''");
}

// ---------------------------------------------------------------------------
// Process each file
// ---------------------------------------------------------------------------
const filePaths = process.argv.slice(2);
if (filePaths.length === 0) {
  console.error("Usage: node scripts/gen-migration.mjs <file1.md> [file2.md] ...");
  process.exit(1);
}

const inserts = [];

for (const fp of filePaths) {
  const raw = readFileSync(resolve(fp), "utf8");

  const slug = meta(raw, "Slug");
  const category = meta(raw, "Category");
  const author = meta(raw, "Author") || "Bratamedia";

  const tagsMatch = raw.match(/\*\*Tags\*\*:\s*(.+)/i);
  const tags = tagsMatch
    ? tagsMatch[1].split(",").map((t) => t.trim().replace(/^`|`$/g, ""))
    : [];

  const title_id =
    metaField(raw, "Indonesian", "Meta title") ||
    metaField(raw, "id", "Meta title");
  const title_en =
    metaField(raw, "English", "Meta title") ||
    metaField(raw, "en", "Meta title");
  const excerpt_id =
    metaField(raw, "Indonesian", "Meta description") ||
    metaField(raw, "id", "Meta description");
  const excerpt_en =
    metaField(raw, "English", "Meta description") ||
    metaField(raw, "en", "Meta description");

  const content_id = mdToTiptap(extractBody(raw, "# Versi Indonesia"));
  const content_en = mdToTiptap(extractBody(raw, "# English Version"));

  const tagsSQL = `'{${tags.map((t) => `"${esc(t)}"`).join(",")}}'`;

  inserts.push(`INSERT INTO public.articles (
  slug, title_id, title_en, excerpt_id, excerpt_en,
  content_id, content_en, cover_image_url,
  category, tags, author_name, is_published, published_at, sort_order
) VALUES (
  '${esc(slug)}',
  '${esc(title_id)}',
  '${esc(title_en)}',
  '${esc(excerpt_id)}',
  '${esc(excerpt_en)}',
  '${esc(JSON.stringify(content_id))}'::jsonb,
  '${esc(JSON.stringify(content_en))}'::jsonb,
  NULL,
  '${esc(category)}',
  ${tagsSQL},
  '${esc(author)}',
  true,
  now(),
  0
) ON CONFLICT (slug) DO NOTHING;`);

  console.log(`Processed: ${slug} (${content_id.content.length} nodes ID, ${content_en.content.length} nodes EN)`);
}

// ---------------------------------------------------------------------------
// Write migration file
// ---------------------------------------------------------------------------
const migrationSQL = `-- =============================================================================
-- Migration: 00008_seed_articles
-- Description: Seed initial blog articles (Local SEO Batch 1)
-- =============================================================================

${inserts.join("\n\n")}
`;

const outPath = resolve("supabase/migrations/00008_seed_articles.sql");
writeFileSync(outPath, migrationSQL, "utf8");
console.log(`\nMigration written to: ${outPath}`);
