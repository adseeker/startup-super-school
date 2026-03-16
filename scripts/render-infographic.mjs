#!/usr/bin/env node
// Usage: node scripts/render-infographic.mjs --section=guides --slug=my-guide

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// --- Parse CLI args ---
const args = Object.fromEntries(
  process.argv.slice(2).map(arg => {
    const [key, val] = arg.replace(/^--/, '').split('=');
    return [key, val];
  })
);

const { section, slug } = args;

if (!section || !slug) {
  console.error('Usage: node scripts/render-infographic.mjs --section=<section> --slug=<slug>');
  process.exit(1);
}

const validSections = ['glossary', 'guides', 'concepts', 'articles'];
if (!validSections.includes(section)) {
  console.error(`Invalid section "${section}". Must be one of: ${validSections.join(', ')}`);
  process.exit(1);
}

// --- Read content file ---
const contentPath = join(ROOT, 'src', 'content', section, 'en', `${slug}.md`);
let raw;
try {
  raw = readFileSync(contentPath, 'utf-8');
} catch {
  console.error(`File not found: ${contentPath}`);
  process.exit(1);
}

// --- Frontmatter parsing ---
const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) { console.error('Could not find frontmatter.'); process.exit(1); }
const fm = fmMatch[1];

function extractField(yaml, key) {
  const m = yaml.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return m ? m[1].replace(/^['"]|['"]$/g, '').trim() : '';
}

function extractArray(yaml, key) {
  const inlineM = yaml.match(new RegExp(`^${key}:\\s*\\[([^\\]]+)\\]`, 'm'));
  if (inlineM) return inlineM[1].split(',').map(s => s.replace(/^['"\s]+|['"\s]+$/g, ''));
  const blockM = yaml.match(new RegExp(`^${key}:\\s*\\n((?:\\s+-\\s+.+\\n?)*)`, 'm'));
  if (blockM) return blockM[1].split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, '').trim());
  return [];
}

const title = extractField(fm, 'title');
const category = extractField(fm, 'category');
const difficulty = extractField(fm, 'difficulty') || 'beginner';
const tags = extractArray(fm, 'tags');

if (!title) { console.error('Missing title in frontmatter.'); process.exit(1); }

// --- Extract body ---
const bodyMatch = raw.match(/^---[\s\S]*?---\r?\n([\s\S]*)$/);
const body = bodyMatch ? bodyMatch[1] : '';

// --- Clean inline markdown from text ---
function cleanMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/_{1,2}(.+?)_{1,2}/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .trim();
}

// --- Extract H2 sections with first-paragraph description ---
const SKIP = new Set([
  'key takeaway', 'conclusion', 'summary', 'tldr', 'tl;dr',
  'faq', 'faqs', 'frequently asked questions',
]);

function extractSections(body) {
  const sections = [];
  const parts = body.split(/^## /m);

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const lines = part.split('\n');
    const heading = lines[0].trim();

    if (SKIP.has(heading.toLowerCase())) continue;

    // Find first plain prose paragraph (skip H3s, lists, tables, code, images)
    let description = '';
    for (let j = 1; j < lines.length; j++) {
      const line = lines[j].trim();
      if (!line) continue;
      if (
        line.startsWith('#') || line.startsWith('-') || line.startsWith('*') ||
        line.startsWith('|') || line.startsWith('!') || line.startsWith('>') ||
        line.startsWith('```') || line.startsWith('1.')
      ) continue;
      description = cleanMarkdown(line);
      break;
    }

    // Limit to first sentence when paragraph is very long
    const sentenceMatch = description.match(/^[^.!?]+[.!?]/);
    if (sentenceMatch && sentenceMatch[0].length < description.length) {
      description = sentenceMatch[0].trim();
    }

    // Hard cap
    if (description.length > 150) {
      description = description.slice(0, 147) + '...';
    }

    sections.push({ heading, description });
    if (sections.length >= 5) break;
  }

  return sections;
}

const sections = extractSections(body);

if (sections.length === 0) {
  console.error('No H2 sections found in body. Cannot generate infographic.');
  process.exit(1);
}

console.log(`\nGenerating infographic: ${title}`);
console.log(`  section:    ${section}`);
console.log(`  slug:       ${slug}`);
console.log(`  difficulty: ${difficulty}`);
console.log(`  sections:   ${sections.length}`);
sections.forEach((s, i) => console.log(`    ${i + 1}. ${s.heading}`));
console.log('');

// --- SVG Generation ---
const ACCENT = {
  glossary: '#4F46E5',
  guides: '#059669',
  concepts: '#D97706',
  articles: '#E11D48',
}[section] || '#4F46E5';

const ACCENT_LIGHT = {
  glossary: '#EEF2FF',
  guides: '#ECFDF5',
  concepts: '#FFFBEB',
  articles: '#FFF1F2',
}[section] || '#EEF2FF';

const W = 900;
const PAD = 44;
const HEADER_H = 130;
const SECTION_H = 88;
const FOOTER_H = 56;
const TOTAL_H = HEADER_H + sections.length * SECTION_H + FOOTER_H;

const FONT = "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const DIVIDER = '#E5E7EB';
const GRAY = '#6B7280';
const DARK = '#111827';

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Word-wrap text to an array of lines
function wrap(text, maxChars, maxLines = 2) {
  if (!text) return [];
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    const result = lines.slice(0, maxLines);
    result[maxLines - 1] = result[maxLines - 1].replace(/\s+\S+$/, '') + '…';
    return result;
  }
  return lines;
}

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${TOTAL_H}" viewBox="0 0 ${W} ${TOTAL_H}">`;

// White background + border
svg += `<rect width="${W}" height="${TOTAL_H}" rx="12" fill="white"/>`;
svg += `<rect width="${W}" height="${TOTAL_H}" rx="12" fill="none" stroke="${DIVIDER}" stroke-width="1.5"/>`;

// ── Header ──────────────────────────────────────────────────────────────
svg += `<rect width="${W}" height="${HEADER_H}" rx="12" fill="${ACCENT}"/>`;
// Fill bottom-left/right corners of header (so it doesn't look rounded at bottom)
svg += `<rect y="${HEADER_H - 12}" width="${W}" height="12" fill="${ACCENT}"/>`;

// Category · Difficulty label
svg += `<text x="${PAD}" y="30" font-family="${FONT}" font-size="11" font-weight="600" fill="rgba(255,255,255,0.7)" letter-spacing="1">${esc(category.toUpperCase())} · ${esc(difficulty.toUpperCase())}</text>`;
// Site label
svg += `<text x="${W - PAD}" y="30" font-family="${FONT}" font-size="11" fill="rgba(255,255,255,0.5)" text-anchor="end">startupsuperschool.com</text>`;

// Title (up to 2 lines)
const titleLines = wrap(title, 44, 2);
const titleStartY = titleLines.length === 2 ? 60 : 76;
titleLines.forEach((line, i) => {
  svg += `<text x="${PAD}" y="${titleStartY + i * 34}" font-family="${FONT}" font-size="28" font-weight="700" fill="white">${esc(line)}</text>`;
});

// ── Sections ─────────────────────────────────────────────────────────────
sections.forEach((sec, idx) => {
  const sY = HEADER_H + idx * SECTION_H;
  const midY = sY + SECTION_H / 2;
  const badgeCx = PAD + 14;

  // Divider (between sections)
  if (idx > 0) {
    svg += `<line x1="${PAD}" y1="${sY}" x2="${W - PAD}" y2="${sY}" stroke="${DIVIDER}" stroke-width="1"/>`;
  }

  // Number badge
  svg += `<circle cx="${badgeCx}" cy="${midY}" r="14" fill="${ACCENT_LIGHT}"/>`;
  svg += `<text x="${badgeCx}" y="${midY + 5}" font-family="${FONT}" font-size="13" font-weight="700" fill="${ACCENT}" text-anchor="middle">${idx + 1}</text>`;

  // Text block
  const textX = PAD + 40;
  const descLines = wrap(sec.description, 74, 2);
  const hasDesc = descLines.length > 0;
  const headingY = hasDesc ? sY + 29 : midY + 6;

  svg += `<text x="${textX}" y="${headingY}" font-family="${FONT}" font-size="15" font-weight="600" fill="${DARK}">${esc(sec.heading)}</text>`;

  descLines.forEach((line, li) => {
    svg += `<text x="${textX}" y="${headingY + 22 + li * 19}" font-family="${FONT}" font-size="13" fill="${GRAY}">${esc(line)}</text>`;
  });
});

// ── Footer ────────────────────────────────────────────────────────────────
const footerY = HEADER_H + sections.length * SECTION_H;
svg += `<line x1="0" y1="${footerY}" x2="${W}" y2="${footerY}" stroke="${DIVIDER}" stroke-width="1"/>`;

// Tags
let tagX = PAD;
for (const tag of tags.slice(0, 6)) {
  const label = `#${tag}`;
  const tagW = label.length * 7.2 + 18;
  if (tagX + tagW > W - PAD) break;
  svg += `<rect x="${tagX}" y="${footerY + 17}" width="${tagW}" height="22" rx="4" fill="${ACCENT_LIGHT}"/>`;
  svg += `<text x="${tagX + tagW / 2}" y="${footerY + 32}" font-family="${FONT}" font-size="11" font-weight="500" fill="${ACCENT}" text-anchor="middle">${esc(label)}</text>`;
  tagX += tagW + 6;
}

svg += `</svg>`;

// --- Write output ---
const outDir = join(ROOT, 'public', 'infographics', section);
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `${slug}.svg`);
writeFileSync(outFile, svg, 'utf-8');

console.log(`Done: ${outFile}\n`);
