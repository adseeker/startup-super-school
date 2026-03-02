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
  console.error('  section: glossary | guides | concepts | articles');
  process.exit(1);
}

const validSections = ['glossary', 'guides', 'concepts', 'articles'];
if (!validSections.includes(section)) {
  console.error(`Invalid section "${section}". Must be one of: ${validSections.join(', ')}`);
  process.exit(1);
}

// --- Read frontmatter ---
const contentPath = join(ROOT, 'src', 'content', section, 'en', `${slug}.md`);
let raw;
try {
  raw = readFileSync(contentPath, 'utf-8');
} catch {
  console.error(`Content file not found: ${contentPath}`);
  process.exit(1);
}

// Extract YAML frontmatter between ---
const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) {
  console.error('Could not find frontmatter in content file.');
  process.exit(1);
}
const fm = fmMatch[1];

function extractField(yaml, key) {
  const re = new RegExp(`^${key}:\\s*(.+)$`, 'm');
  const m = yaml.match(re);
  return m ? m[1].replace(/^['"]|['"]$/g, '').trim() : '';
}

function extractArray(yaml, key) {
  // Supports inline arrays: tags: ["a", "b"] or tags: [a, b]
  const inlineRe = new RegExp(`^${key}:\\s*\\[([^\\]]+)\\]`, 'm');
  const inlineMatch = yaml.match(inlineRe);
  if (inlineMatch) {
    return inlineMatch[1]
      .split(',')
      .map((s) => s.replace(/^['"\s]+|['"\s]+$/g, ''));
  }

  // Supports block arrays:
  // tags:
  //   - a
  //   - b
  const blockRe = new RegExp(`^${key}:\\s*\\n((?:\\s+-\\s+.+\\n?)*)`, 'm');
  const blockMatch = yaml.match(blockRe);
  if (blockMatch) {
    return blockMatch[1]
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
  console.error('Could not extract required fields (title, description) from frontmatter.');
  process.exit(1);
}

console.log(`\nRendering video for: ${title}`);
console.log(`  section:     ${section}`);
console.log(`  slug:        ${slug}`);
console.log(`  category:    ${category}`);
console.log(`  difficulty:  ${difficulty}`);
console.log(`  tags:        ${tags.join(', ')}\n`);

// --- Prepare output directory ---
const outDir = join(ROOT, 'public', 'videos', section);
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `${slug}.mp4`);

// --- Build props JSON ---
const props = JSON.stringify({ title, description, section, category, tags, difficulty });

// --- Run Remotion render ---
const cmd = `npx remotion render ContentIntro "${outFile}" --props='${props.replace(/'/g, "\\'")}'`;

console.log('Running:', cmd, '\n');

try {
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
  console.log(`\nVideo rendered successfully: ${outFile}`);
} catch (err) {
  console.error('\nRendering failed.');
  process.exit(1);
}
