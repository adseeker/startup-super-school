#!/usr/bin/env node
// Usage: node scripts/render-video.mjs --section=glossary --slug=mvp

import { readFileSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// --- Parse CLI args ---
const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, val] = arg.replace(/^--/, '').split('=');
    return [key, val];
  })
);

const { section, slug } = args;

if (!section || !slug) {
  console.error('Usage: node scripts/render-video.mjs --section=<section> --slug=<slug>');
  process.exit(1);
}

const validSections = ['glossary', 'guides', 'concepts', 'articles'];
if (!validSections.includes(section)) {
  console.error(`Invalid section "${section}". Must be one of: ${validSections.join(', ')}`);
  process.exit(1);
}

// --- Read file ---
const contentPath = join(ROOT, 'src', 'content', section, 'en', `${slug}.md`);
let raw;
try {
  raw = readFileSync(contentPath, 'utf-8');
} catch {
  console.error(`File not found: ${contentPath}`);
  process.exit(1);
}

// --- Extract frontmatter ---
const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) {
  console.error('Could not find frontmatter.');
  process.exit(1);
}
const fm = fmMatch[1];

function extractField(yaml, key) {
  const m = yaml.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return m ? m[1].replace(/^['"]|['"]$/g, '').trim() : '';
}

function extractArray(yaml, key) {
  const inlineM = yaml.match(new RegExp(`^${key}:\\s*\\[([^\\]]+)\\]`, 'm'));
  if (inlineM) {
    return inlineM[1].split(',').map((s) => s.replace(/^['"\s]+|['"\s]+$/g, ''));
  }
  const blockM = yaml.match(new RegExp(`^${key}:\\s*\\n((?:\\s+-\\s+.+\\n?)*)`, 'm'));
  if (blockM) {
    return blockM[1]
      .split('\n')
      .filter((l) => l.trim().startsWith('-'))
      .map((l) => l.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, '').trim());
  }
  return [];
}

const title = extractField(fm, 'title');
const description = extractField(fm, 'description');
const category = extractField(fm, 'category');
const difficulty = extractField(fm, 'difficulty') || 'beginner';
const tags = extractArray(fm, 'tags');

if (!title || !description) {
  console.error('Missing required frontmatter fields (title, description).');
  process.exit(1);
}

// --- Extract H2 headings from body (key points) ---
const bodyMatch = raw.match(/^---[\s\S]*?---\r?\n([\s\S]*)$/);
const body = bodyMatch ? bodyMatch[1] : '';

const SKIP_HEADINGS = ['key takeaway', 'conclusion', 'summary', 'tldr', 'tl;dr'];

const h2Regex = /^## (.+)$/gm;
const keyPoints = [];
let match;
while ((match = h2Regex.exec(body)) !== null) {
  const heading = match[1].trim();
  if (!SKIP_HEADINGS.includes(heading.toLowerCase())) {
    keyPoints.push(heading);
  }
}
// Max 5 key points for the video
const trimmedPoints = keyPoints.slice(0, 5);

console.log(`\nRendering: ${title}`);
console.log(`  section:    ${section}`);
console.log(`  slug:       ${slug}`);
console.log(`  difficulty: ${difficulty}`);
console.log(`  tags:       ${tags.join(', ')}`);
console.log(`  key points: ${trimmedPoints.length}`);
trimmedPoints.forEach((p, i) => console.log(`    ${i + 1}. ${p}`));
console.log('');

// --- Output dir ---
const outDir = join(ROOT, 'public', 'videos', section);
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `${slug}.mp4`);

// --- Build props ---
const props = {
  title,
  description,
  section,
  category,
  tags,
  difficulty,
  keyPoints: trimmedPoints,
};

const propsJson = JSON.stringify(props).replace(/'/g, "\\'");
const cmd = `npx remotion render ContentIntro "${outFile}" --props='${propsJson}'`;

console.log('Running render...\n');

try {
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
  console.log(`\nDone: ${outFile}`);
} catch {
  console.error('\nRendering failed.');
  process.exit(1);
}
