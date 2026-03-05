#!/usr/bin/env node
/**
 * submit-indexnow.mjs
 *
 * Submits changed (or all) content URLs to IndexNow API.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs              # submit URLs from CHANGED_FILES env var
 *   node scripts/submit-indexnow.mjs --all        # submit all published URLs
 */

import { readFile, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const KEY = '429c212d20b2750b7f3fa77924ef9c53';
const HOST = 'www.startupsuperschool.com';
const BASE_URL = 'https://www.startupsuperschool.com';
const SECTIONS = ['glossary', 'guides', 'concepts', 'articles'];
const API_ENDPOINT = 'https://api.indexnow.org/indexnow';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

/** Parse frontmatter from a markdown file — returns an object of key:value pairs. */
async function parseFrontmatter(filePath) {
  const text = await readFile(filePath, 'utf-8');
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      fm[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
    }
  }
  return fm;
}

/** Convert a content file path to its public URL. */
function filePathToUrl(filePath) {
  // e.g. src/content/glossary/en/mvp.md → /glossary/mvp
  const match = filePath.match(/src\/content\/(\w+)\/\w+\/([^/]+)\.md$/);
  if (!match) return null;
  const [, section, slug] = match;
  return `${BASE_URL}/${section}/${slug}`;
}

/** Collect all published URLs across all 4 collections. */
async function getAllUrls() {
  const urls = [BASE_URL];
  for (const section of SECTIONS) {
    urls.push(`${BASE_URL}/${section}`);
    const dir = join(ROOT, 'src', 'content', section, 'en');
    let files;
    try {
      files = await readdir(dir);
    } catch {
      continue;
    }
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const slug = file.replace(/\.md$/, '');
      const fm = await parseFrontmatter(join(dir, file));
      if (fm.published === 'false') continue;
      urls.push(`${BASE_URL}/${section}/${slug}`);
    }
  }
  return urls;
}

/** Build URL list from a newline-separated list of changed file paths. */
async function getChangedUrls(changedFiles) {
  const urls = new Set();
  for (const filePath of changedFiles.trim().split('\n').filter(Boolean)) {
    const url = filePathToUrl(filePath);
    if (!url) continue;
    const fm = await parseFrontmatter(join(ROOT, filePath)).catch(() => ({}));
    if (fm.published === 'false') continue;
    urls.add(url);
  }
  return [...urls];
}

/** POST the URL list to IndexNow. */
async function submitToIndexNow(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE_URL}/${KEY}.txt`,
    urlList: urls,
  };

  console.log(`Submitting ${urls.length} URL(s) to IndexNow...`);

  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  console.log(`Response: ${res.status} ${res.statusText}`);

  if (res.status === 200) {
    console.log('Successfully submitted.');
  } else if (res.status === 202) {
    console.log('Accepted — URLs queued for crawling.');
  } else {
    const text = await res.text().catch(() => '');
    console.error(`Unexpected response: ${text}`);
    process.exit(1);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

const allFlag = process.argv.includes('--all');

let urls;
if (allFlag) {
  urls = await getAllUrls();
} else {
  const changedFiles = process.env.CHANGED_FILES || '';
  if (!changedFiles.trim()) {
    console.log('No changed content files — skipping IndexNow submission.');
    process.exit(0);
  }
  urls = await getChangedUrls(changedFiles);
}

if (urls.length === 0) {
  console.log('No publishable URLs to submit.');
  process.exit(0);
}

console.log('URLs to submit:');
urls.forEach(u => console.log(' ', u));

await submitToIndexNow(urls);
