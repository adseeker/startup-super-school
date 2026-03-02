// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import { readdirSync, readFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { rehypeInternalLinks } from './src/plugins/rehype-internal-links.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Build the keyword map by scanning all content files at config time.
 * Each file with a `primaryKeyword` frontmatter field is registered.
 * Returns: { [keyword: string]: { href: string } }
 */
function buildKeywordMap() {
  const contentRoot = resolve(__dirname, 'src/content');
  const sections = ['glossary', 'guides', 'concepts', 'articles'];
  const map = {};

  for (const section of sections) {
    const localeDir = join(contentRoot, section, 'en');
    let files;
    try {
      files = readdirSync(localeDir);
    } catch {
      continue;
    }

    for (const file of files) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

      const raw = readFileSync(join(localeDir, file), 'utf8');

      // Skip drafts
      if (/^published:\s*false\s*$/m.test(raw)) continue;

      // Extract primaryKeyword from frontmatter
      const kwMatch = raw.match(/^primaryKeyword:\s*["']?(.+?)["']?\s*$/m);
      if (!kwMatch) continue;

      const slug = file.replace(/\.(mdx?)$/, '');
      const keyword = kwMatch[1].trim().toLowerCase();

      map[keyword] = { href: `/${section}/${slug}` };
    }
  }

  return map;
}

const keywordMap = buildKeywordMap();

// https://astro.build/config
export default defineConfig({
  site: 'https://startup-super-school.vercel.app',
  output: 'static',
  adapter: vercel(),

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  markdown: {
    rehypePlugins: [
      [rehypeInternalLinks, { keywordMap, maxLinksPerPage: 2 }],
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US' },
      },
    }),
    mdx(),
  ],
});
