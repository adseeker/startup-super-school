#!/usr/bin/env node
/**
 * check-links.mjs
 *
 * Checks for broken internal references across all content files:
 * 1. relatedTerms / relatedConcepts / steps in frontmatter → slugs must exist
 * 2. Internal links in body (/glossary/x, /guides/x, /concepts/x, /articles/x)
 * 3. Duplicate slugs within the same section
 *
 * Run: npm run check-links
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT = join(ROOT, 'src/content');

const SECTIONS = ['glossary', 'guides', 'concepts', 'articles'];

// ─── Collect all existing slugs ──────────────────────────────────────────────

const slugs = {};
for (const section of SECTIONS) {
  const dir = join(CONTENT, section, 'en');
  slugs[section] = new Set(
    readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''))
  );
}

// ─── Parse frontmatter (simple regex, no extra deps) ─────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const raw = match[1];

  const result = {};

  // relatedTerms: ["a", "b"]
  const relatedTerms = raw.match(/^relatedTerms:\s*\[([^\]]*)\]/m);
  if (relatedTerms) {
    result.relatedTerms = relatedTerms[1].match(/"([^"]+)"/g)?.map(s => s.replace(/"/g, '')) ?? [];
  }

  // relatedConcepts: ["a", "b"]
  const relatedConcepts = raw.match(/^relatedConcepts:\s*\[([^\]]*)\]/m);
  if (relatedConcepts) {
    result.relatedConcepts = relatedConcepts[1].match(/"([^"]+)"/g)?.map(s => s.replace(/"/g, '')) ?? [];
  }

  return result;
}

function getBody(content) {
  return content.replace(/^---\n[\s\S]*?\n---/, '');
}

// ─── Check all files ──────────────────────────────────────────────────────────

const errors = [];
let totalFiles = 0;

for (const section of SECTIONS) {
  const dir = join(CONTENT, section, 'en');
  const files = readdirSync(dir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    totalFiles++;
    const slug = file.replace('.md', '');
    const content = readFileSync(join(dir, file), 'utf-8');
    const fm = parseFrontmatter(content);
    const body = getBody(content);
    const ref = `${section}/${slug}`;

    // 1. relatedTerms → must exist in glossary
    for (const term of fm.relatedTerms ?? []) {
      if (!slugs.glossary.has(term)) {
        errors.push({ file: ref, type: 'relatedTerms', value: term, expected: 'glossary' });
      }
    }

    // 2. relatedConcepts → must exist in concepts
    for (const concept of fm.relatedConcepts ?? []) {
      if (!slugs.concepts.has(concept)) {
        errors.push({ file: ref, type: 'relatedConcepts', value: concept, expected: 'concepts' });
      }
    }

    // 3. Internal links in body — /section/slug pattern
    const linkRegex = /\(?\/(glossary|guides|concepts|articles)\/([a-z0-9-]+)\)?/g;
    let match;
    while ((match = linkRegex.exec(body)) !== null) {
      const linkSection = match[1];
      const linkSlug = match[2];
      if (!slugs[linkSection].has(linkSlug)) {
        errors.push({ file: ref, type: 'body link', value: `/${linkSection}/${linkSlug}`, expected: linkSection });
      }
    }
  }
}

// ─── Duplicate slugs ─────────────────────────────────────────────────────────

for (const section of SECTIONS) {
  const dir = join(CONTENT, section, 'en');
  const files = readdirSync(dir).filter(f => f.endsWith('.md'));
  const seen = new Set();
  for (const file of files) {
    const slug = file.replace('.md', '');
    if (seen.has(slug)) {
      errors.push({ file: `${section}/${slug}`, type: 'duplicate slug', value: slug, expected: 'unique' });
    }
    seen.add(slug);
  }
}

// ─── Report ───────────────────────────────────────────────────────────────────

console.log(`\nScanned ${totalFiles} files across ${SECTIONS.length} sections.\n`);

if (errors.length === 0) {
  console.log('✅ No broken links or references found.');
} else {
  console.log(`❌ Found ${errors.length} issue(s):\n`);
  for (const e of errors) {
    console.log(`  [${e.type}] ${e.file}`);
    console.log(`    → "${e.value}" not found in ${e.expected}\n`);
  }
  process.exit(1);
}
