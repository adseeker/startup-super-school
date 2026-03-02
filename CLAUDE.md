# Startup Super School — CLAUDE.md

## Project Overview

**Startup Super School** is a startup-world encyclopedia built with Astro 5.
It provides definitions, guides, concepts, and articles for founders, operators, and builders.

**Live URL**: https://startup-super-school.vercel.app
**GitHub**: https://github.com/adseeker/startup-super-school

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Astro 5 (static output) |
| Styling | Tailwind CSS v4 (via Vite plugin) |
| Typography | `@tailwindcss/typography` for prose |
| Content | Markdown files with Zod-validated frontmatter |
| SEO | `@astrojs/sitemap`, custom JSON-LD, Open Graph |
| RSS | `@astrojs/rss` at `/rss.xml` |
| Deployment | Vercel (`@astrojs/vercel` adapter, static mode) |

---

## Project Structure

```
src/
├── content.config.ts        ← Zod schemas for all 4 content collections
├── content/
│   ├── glossary/en/         ← Short definitions of startup terms
│   ├── guides/en/           ← Long-form how-to guides
│   ├── concepts/en/         ← Frameworks and methodologies
│   └── articles/en/         ← Deep dives and insights
├── i18n/
│   └── en.ts                ← All UI strings for English
├── utils/
│   └── i18n.ts              ← getTranslations(), formatDate(), getAlternateUrls()
├── layouts/
│   ├── BaseLayout.astro     ← Full HTML doc, head, SEO, header/footer
│   └── ContentLayout.astro  ← Article body + ToC sidebar + related content
├── components/
│   ├── SEO.astro            ← Meta, OG, hreflang, JSON-LD
│   ├── Header.astro         ← Site nav (mobile responsive)
│   ├── Footer.astro         ← Links, copyright
│   ├── ContentCard.astro    ← Card for listing pages
│   ├── DifficultyBadge.astro ← beginner / intermediate / advanced pill
│   ├── TableOfContents.astro ← Auto-generated from h2/h3 headings
│   └── RelatedContent.astro ← Related entries by tag overlap
└── pages/
    ├── index.astro          ← Redirects to /en
    ├── rss.xml.ts           ← RSS feed (English articles + guides)
    └── en/
        ├── index.astro      ← Homepage
        ├── glossary/
        │   ├── index.astro
        │   └── [slug].astro
        ├── guides/
        │   ├── index.astro
        │   └── [slug].astro
        ├── concepts/
        │   ├── index.astro
        │   └── [slug].astro
        └── articles/
            ├── index.astro
            └── [slug].astro
```

---

## Content Collections

### Schema Fields (all collections share a base)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | ✓ | Full display title |
| `description` | string ≤160 chars | ✓ | Used as meta description |
| `locale` | `"en"` (enum) | ✓ | Currently only English |
| `category` | string | ✓ | e.g. `"product"`, `"finance"`, `"fundraising"` |
| `tags` | string[] (min 1) | ✓ | Used for related content matching |
| `difficulty` | `beginner\|intermediate\|advanced` | ✓ | Shown as colored badge |
| `publishedDate` | date | ✓ | ISO date string in frontmatter |
| `lastUpdated` | date | — | Optional; shown in article header |
| `published` | boolean | — | Defaults to `true`; set `false` to draft |
| `seoKeywords` | string[] | — | Extra keywords for the page |
| `image` | `{url, alt}` | — | OG image for the article |

### Collection-specific extras

- **glossary**: `relatedTerms?: string[]`, `acronym?: string`
- **guides**: `readingTime?: number` (minutes)
- **concepts**: `origin?: string`, `relatedConcepts?: string[]`
- **articles**: `readingTime?: number`, `author?: string`

---

## How to Add New Content

### Add a Glossary Term

1. Create `src/content/glossary/en/my-term.md`
2. Use this frontmatter template:

```markdown
---
title: "My Term"
description: "A concise definition under 160 characters."
locale: "en"
category: "product"
tags: ["product", "relevant-tag"]
difficulty: "beginner"
publishedDate: 2024-06-01
relatedTerms: ["related-slug-1", "related-slug-2"]
seoKeywords: ["my term startup", "what is my term"]
---

## What Is My Term?

[Content here...]
```

The URL will be `/en/glossary/my-term` (based on filename).

### Add a Guide

Same process, in `src/content/guides/en/my-guide.md`. Add `readingTime: 10` (minutes).

### Add a Concept

Same process, in `src/content/concepts/en/my-concept.md`. Add `origin: "Author Name, Year"`.

### Add an Article

Same process, in `src/content/articles/en/my-article.md`. Add `author: "Name"`.

---

## Content Quality Standards

Every piece of content should:

1. **Lead with a clear definition** — the first paragraph answers "what is this?"
2. **Use real numbers and examples** — avoid vague claims; cite specific benchmarks
3. **Include a comparison table** where relevant (e.g. before/after, type A vs type B)
4. **End with a Key Takeaway section** — one paragraph, actionable summary
5. **Use `##` for main sections** (h2), `###` for subsections (h3)
6. **Link to related terms** via `relatedTerms` in frontmatter (not inline links)
7. **Stay within 160 chars for description** — this is enforced by the schema

---

## SEO Architecture

- **Canonical URLs**: Auto-generated from `Astro.url.href`
- **Meta description**: From frontmatter `description` field (≤160 chars)
- **Open Graph**: Title, description, image, type, locale
- **Twitter Card**: `summary_large_image`
- **JSON-LD**: `Article` type for all content pages, `WebSite` for homepage
- **Sitemap**: Auto-generated at `/sitemap-index.xml` by `@astrojs/sitemap`
- **RSS**: At `/rss.xml` — includes articles and guides
- **robots.txt**: At `/robots.txt` — allows all crawlers

---

## i18n Architecture

### Current State
- English only (`locale: "en"`)
- URLs: `/en/glossary/mvp`, `/en/guides/validate-your-idea`

### Adding a New Language (e.g. Italian)

1. **Update `astro.config.mjs`**:
   ```js
   i18n: {
     defaultLocale: 'en',
     locales: ['en', 'it'],  // ← add 'it'
   }
   ```
   Also update the `sitemap` i18n config.

2. **Create translation file** `src/i18n/it.ts`:
   Copy `src/i18n/en.ts` and translate all values.

3. **Update `src/utils/i18n.ts`**:
   Add `it` to `locales` array and `translations` map.

4. **Add content files** in `src/content/glossary/it/`, etc.:
   Each content file needs `locale: "it"` in frontmatter.

5. **Duplicate page routes** under `src/pages/it/` — copy the `en/` folder structure
   and update the locale constant from `'en'` to `'it'`.

---

## Development Workflow

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Type-check
npx astro check

# Build
npm run build

# Preview build
npm run preview
```

---

## Deployment (Vercel)

1. Connect the GitHub repo to Vercel
2. Framework preset: **Astro**
3. Build command: `npm run build`
4. Output directory: `.vercel/output` (auto-detected)
5. Node version: 20+

No environment variables needed for the base setup.

After deploying, update `site` in `astro.config.mjs` to the real domain:
```js
site: 'https://your-real-domain.com',
```

---

## Style Conventions

- **Tailwind v4**: No `tailwind.config.js` — use CSS custom properties in `src/styles/global.css`
- **Typography**: Use `prose prose-gray prose-lg` for article body
- **Accent color**: `text-indigo-600` / `bg-indigo-600`
- **Font**: Inter (loaded from Google Fonts in `BaseLayout.astro`)
- No dark mode (yet) — clean white/gray palette

---

## Common Pitfalls

- `description` must be ≤160 chars — schema validation will fail the build if exceeded
- The `locale` field in frontmatter must match an entry in the `locales` array in `astro.config.mjs`
- Content slugs are derived from the filename — use lowercase kebab-case
- `publishedDate` must be a valid ISO date string (`YYYY-MM-DD`)
