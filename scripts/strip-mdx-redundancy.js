#!/usr/bin/env node
/**
 * Strip redundant H1 (matching frontmatter title) and the immediately
 * following descriptive paragraph from each MDX page. Fumadocs renders
 * title + description from frontmatter, so the in-body duplicates are
 * pure noise.
 *
 * Conservative rules:
 * - Only removes the H1 if it exactly matches the frontmatter title
 *   (case-insensitive, trimmed).
 * - After removing the H1, removes ONE following paragraph only if:
 *   - it is a single text paragraph (no markdown block, no JSX, not a
 *     blockquote, no leading symbols)
 *   - AND it is followed by a blank line + a `##`/JSX block
 *     (so we don't gobble actual prose intro)
 * - If anything looks unusual, leaves the file alone.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "docs", "content", "docs");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile() && e.name.endsWith(".mdx")) out.push(p);
  }
  return out;
}

function parseFrontmatter(src) {
  if (!src.startsWith("---\n")) return null;
  const end = src.indexOf("\n---\n", 4);
  if (end === -1) return null;
  const block = src.slice(4, end);
  const body = src.slice(end + 5);
  const meta = {};
  for (const line of block.split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].replace(/^['"]|['"]$/g, "").trim();
  }
  return { meta, body, frontmatter: src.slice(0, end + 5) };
}

function looksLikeProseLine(line) {
  if (!line) return false;
  if (line.startsWith("#")) return false;
  if (line.startsWith("<")) return false;
  if (line.startsWith(">")) return false;
  if (line.startsWith("- ") || line.startsWith("* ") || line.startsWith("+ ")) return false;
  if (line.startsWith("```")) return false;
  if (line.startsWith("|")) return false;
  if (line.startsWith(":::")) return false;
  if (/^\d+\.\s/.test(line)) return false;
  return true;
}

function processFile(file) {
  const src = fs.readFileSync(file, "utf8");
  const parsed = parseFrontmatter(src);
  if (!parsed) return { file, changed: false, reason: "no frontmatter" };

  const { meta, body, frontmatter } = parsed;
  const title = (meta.title || "").trim();
  if (!title) return { file, changed: false, reason: "no title" };

  const lines = body.split("\n");

  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  if (i >= lines.length) return { file, changed: false, reason: "empty body" };

  const h1 = lines[i].trim();
  const isH1Match =
    h1.startsWith("# ") &&
    h1.slice(2).trim().toLowerCase() === title.toLowerCase();

  if (!isH1Match) return { file, changed: false, reason: `H1 mismatch (\"${h1}\")` };

  // Drop the H1 line and any blank lines immediately after it
  let removeFrom = i;
  let cursor = i + 1;
  while (cursor < lines.length && lines[cursor].trim() === "") cursor++;

  // Optionally also drop one prose subtitle paragraph if next non-empty
  // line is plain text AND the line after that paragraph (skipping blanks)
  // starts a new block (heading or JSX). This avoids eating real intros.
  let removeTo = cursor; // exclusive

  if (cursor < lines.length && looksLikeProseLine(lines[cursor].trim())) {
    // Collect a single "paragraph" — consecutive non-blank lines.
    let paraEnd = cursor;
    while (
      paraEnd < lines.length &&
      lines[paraEnd].trim() !== "" &&
      looksLikeProseLine(lines[paraEnd].trim())
    ) {
      paraEnd++;
    }

    // Look at what comes after this paragraph.
    let afterPara = paraEnd;
    while (afterPara < lines.length && lines[afterPara].trim() === "") afterPara++;

    const next = afterPara < lines.length ? lines[afterPara].trim() : "";
    const startsNewBlock =
      next.startsWith("## ") ||
      next.startsWith("<") ||
      next.startsWith("```") ||
      next.startsWith(":::") ||
      next.startsWith(">");

    if (startsNewBlock) {
      removeTo = afterPara; // also drop the blank lines between paragraph and next block
    }
  }

  if (removeTo === removeFrom) return { file, changed: false, reason: "nothing to remove" };

  const newLines = [...lines.slice(0, removeFrom), ...lines.slice(removeTo)];
  // Ensure we keep a single leading blank line after frontmatter
  while (newLines.length && newLines[0].trim() === "") newLines.shift();
  const newBody = "\n" + newLines.join("\n");

  const out = frontmatter + newBody;
  if (out === src) return { file, changed: false, reason: "no change" };
  fs.writeFileSync(file, out);
  return { file, changed: true };
}

const files = walk(ROOT);
const results = files.map(processFile);
const changed = results.filter((r) => r.changed);
const skipped = results.filter((r) => !r.changed);

console.log(`Processed ${files.length} files. Modified ${changed.length}.`);
for (const r of changed) console.log("  ✓", path.relative(ROOT, r.file));
if (skipped.length) {
  console.log("\nUnchanged:");
  for (const r of skipped) console.log(`  · ${path.relative(ROOT, r.file)}  (${r.reason})`);
}
