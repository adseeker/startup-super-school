# Startup Super School — CLAUDE.md

## Project Overview

**Startup Super School** is a startup-world encyclopedia built with Astro 5.
It provides definitions, guides, concepts, and articles for founders, operators, and builders.

**Live URL**: https://www.startupsuperschool.com/
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
| Video | Remotion 4 — programmatic React video, rendered locally |
| Analytics | Google Tag Manager (GTM-5TNQT7V), installed in `BaseLayout.astro` |

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
│   ├── BaseLayout.astro     ← Full HTML doc, head (GTM), SEO, header/footer
│   └── ContentLayout.astro  ← Article body + video player + ToC sidebar + related content
├── components/
│   ├── SEO.astro            ← Meta, OG, hreflang, JSON-LD
│   ├── Header.astro         ← Site nav (mobile responsive)
│   ├── Footer.astro         ← Links, copyright
│   ├── ContentCard.astro    ← Card for listing pages
│   ├── DifficultyBadge.astro ← beginner / intermediate / advanced pill
│   ├── TableOfContents.astro ← Auto-generated from h2/h3 headings
│   └── RelatedContent.astro ← Related entries by tag overlap
└── pages/
    ├── index.astro          ← Homepage
    ├── search.astro         ← Pagefind search
    ├── rss.xml.ts           ← RSS feed (articles + guides)
    ├── tags/[tag].astro     ← Tag listing pages
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

remotion/                    ← Remotion video source (NOT compiled into Astro build)
├── Root.tsx                 ← Entry point — registers ContentIntro composition
├── ContentIntro.tsx         ← Main 30s composition (900 frames, 30fps, 1280×720)
├── types.ts                 ← ContentIntroProps interface
└── components/
    ├── TitleCard.tsx        ← Slide 1 (0–4s): accent bg, animated title words
    ├── KeyPointSlide.tsx    ← Slides 2..N: white bg, H2 headings from article
    └── OutroSlide.tsx       ← Last slide (3s): dark bg, brand + tags

scripts/
└── render-video.mjs         ← CLI: reads frontmatter + H2s → calls remotion render

public/
└── videos/
    └── guides/
        └── build-product-roadmap.mp4   ← Example rendered video (1.8 MB)

remotion.config.ts           ← Remotion entry point config
```

**URL structure**: `/glossary/{slug}`, `/guides/{slug}`, `/concepts/{slug}`, `/articles/{slug}`
The `en/` subfolder in content is for locale organization only — it does NOT appear in URLs.

---

## Content Collections

### Schema Fields (all collections share a base)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | ✓ | Full display title |
| `description` | string ≤160 chars | ✓ | Used as meta description — **Zod enforces this hard limit** |
| `locale` | `"en"` (enum) | ✓ | Currently only English |
| `category` | string | ✓ | e.g. `"product"`, `"finance"`, `"fundraising"` |
| `tags` | string[] (min 1) | ✓ | Used for related content matching |
| `difficulty` | `beginner\|intermediate\|advanced` | ✓ | Shown as colored badge |
| `publishedDate` | date | ✓ | ISO date string (`YYYY-MM-DD`) |
| `lastUpdated` | date | — | Optional; shown in article header |
| `published` | boolean | — | Defaults to `true`; set `false` to draft |
| `video` | boolean | — | Set `true` to embed the video player (file must exist at `public/videos/{section}/{slug}.mp4`) |
| `primaryKeyword` | string | — | SEO focus keyword; used by autolinker (lowercase, unique across all content) |
| `seoKeywords` | string[] | — | Extra keywords for the page |
| `faqs` | `{question, answer}[]` | — | Structured FAQ entries for JSON-LD |
| `image` | `{url, alt}` | — | OG image for the article |

### Collection-specific extras

- **glossary**: `relatedTerms?: string[]`, `acronym?: string`
- **guides**: `readingTime?: number` (minutes), `steps?: {name, text}[]`
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
primaryKeyword: "my term startup"
seoKeywords: ["my term startup", "what is my term"]
---

## What Is My Term?

[Content here...]
```

URL: `/glossary/my-term`

### Add a Guide

Same process, `src/content/guides/en/my-guide.md`. Add `readingTime: 10`.

### Add a Concept

Same process, `src/content/concepts/en/my-concept.md`. Add `origin: "Author Name, Year"`.

### Add an Article

Same process, `src/content/articles/en/my-article.md`. Add `author: "Name"`.

---

## Content Quality Standards

Every piece of content should:

1. **Lead with a clear definition** — the first paragraph answers "what is this?"
2. **Use real numbers and examples** — avoid vague claims; cite specific benchmarks
3. **Include a comparison table** where relevant (e.g. before/after, type A vs type B)
4. **End with a Key Takeaway section** — one paragraph, actionable summary
5. **Use `##` for main sections** (h2), `###` for subsections (h3)
6. **Link to related terms** via `relatedTerms` in frontmatter (not inline links)
7. **Stay within 160 chars for description** — this is enforced by Zod at build time

---

## Video Generation System (Remotion)

### How it works

- Videos are **30 seconds**, 1280×720, 30fps, H.264 MP4
- Content: **TitleCard** (4s) → **one KeyPointSlide per H2 heading** (up to 5, ~4–5s each) → **OutroSlide** (3s)
- The script automatically extracts H2 headings from the article body as key points; it skips "Key Takeaway", "Conclusion", "Summary"
- Videos are stored in `public/videos/{section}/{slug}.mp4` and committed to the repo
- The player appears in the article only when `video: true` is in frontmatter **and** the file exists

### Accent colors by section

| Section | Color | Hex |
|---------|-------|-----|
| glossary | Indigo | `#4F46E5` |
| guides | Emerald | `#059669` |
| concepts | Amber | `#D97706` |
| articles | Rose | `#E11D48` |

### SOP: Generate a video for a content page

```bash
# Step 1 — Render the video (~2–5 min)
npm run render-video -- --section=guides --slug=my-guide
# → public/videos/guides/my-guide.mp4

# Step 2 — Add video: true to the frontmatter of the content file
# src/content/guides/en/my-guide.md
# video: true

# Step 3 — Verify locally
npm run dev
# → /guides/my-guide should show the video player above the first H2

# Step 4 — Build check
npm run build

# Step 5 — Commit both the video file and the updated .md
git add public/videos/guides/my-guide.mp4 src/content/guides/en/my-guide.md
git commit -m "feat(video): add intro video for my-guide"
git push
```

### Remotion Studio (preview without rendering)

```bash
npx remotion studio
# Opens http://localhost:3000 — live preview of ContentIntro composition
```

### Adding a new Remotion component

- All components live in `remotion/components/`
- Use `useCurrentFrame()` for animations — inside a `<Sequence>` it's already relative
- Use `spring({ frame, fps, config: { stiffness: 300–400, damping: 20–25 } })` for punchy animations
- Load Inter font with `import { loadFont } from '@remotion/google-fonts/Inter'; const { fontFamily } = loadFont();` at module level
- Register any new composition in `remotion/Root.tsx`

---

## Analytics

**Google Tag Manager** is installed with container ID `GTM-5TNQT7V`.

- The `<script>` snippet is in `<head>` in `src/layouts/BaseLayout.astro` (first element)
- The `<noscript>` iframe is immediately after `<body>` opening tag
- **Do NOT add a second GTM snippet** — it is already global and fires on all pages
- To add GA4, conversion pixels, or custom events: configure them inside GTM, not in code

---

## SEO Architecture

- **Canonical URLs**: Auto-generated from `Astro.url.href`
- **Meta description**: From frontmatter `description` field (≤160 chars)
- **Open Graph**: Title, description, image, type, locale
- **Twitter Card**: `summary_large_image`
- **JSON-LD**: `Article` / `HowTo` / `DefinedTerm` per section; `BreadcrumbList` on every content page
- **Sitemap**: Auto-generated at `/sitemap-index.xml` by `@astrojs/sitemap`
- **RSS**: At `/rss.xml` — includes articles and guides
- **robots.txt**: At `/robots.txt` — allows all crawlers

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

# Generate a video
npm run render-video -- --section=glossary --slug=mvp

# Remotion Studio (video preview)
npx remotion studio
```

---

## Deployment (Vercel)

- Vercel is connected to GitHub — every push to `main` triggers a deploy automatically
- Build command: `npm run build`
- Output: `.vercel/output/static` (auto-detected)
- No environment variables needed

---

## Style Conventions

- **Tailwind v4**: No `tailwind.config.js` — use CSS custom properties in `src/styles/global.css`
- **Typography**: `prose prose-gray prose-lg` for article body
- **Accent color**: `text-indigo-600` / `bg-indigo-600`
- **Font**: Inter, loaded from Google Fonts in `BaseLayout.astro`
- No dark mode — clean white/gray palette

---

## Agent SOPs

### Before starting any task

1. Read `CLAUDE.md` (this file) in full
2. Run `npm run build` to confirm the baseline is clean before touching anything
3. Read every file you plan to modify — never edit blind

### SOP: Add or update a content piece

1. Create or edit the `.md` file in `src/content/{section}/en/`
2. Verify `description` is ≤160 chars (count manually or use a tool)
3. Run `npm run build` — Zod will catch schema errors before deploy
4. If adding `video: true`, generate the video first (see video SOP above)
5. Commit with `git add` (specific files, not `-A`) and push

### SOP: Modify the Zod schema (`src/content.config.ts`)

1. Add the new field as **optional** (`z.something().optional()`) unless there's an explicit reason to require it — a required field will break the build for every existing content file that doesn't have it
2. Run `npm run build` immediately after — schema errors surface here
3. Update this CLAUDE.md schema table to reflect the change

### SOP: Modify a layout or component

1. Read the file in full before editing
2. Check what props it receives and where it's used (`Grep` for the component name)
3. After editing, run `npm run build` — TypeScript errors in `.astro` files surface here
4. Never add external scripts or third-party tags directly to components — use GTM for tracking

### SOP: Add a new page or route

1. Create the `.astro` file in `src/pages/`
2. If it's a dynamic route (`[slug].astro`), implement `getStaticPaths()`
3. Wrap with `BaseLayout` or `ContentLayout` as appropriate
4. Run `npm run build` and verify the new route appears in the build output

### SOP: Commit and push

1. Always run `npm run build` before committing — never push a broken build
2. Stage specific files with `git add path/to/file` — avoid `git add -A` or `git add .`
3. Commit message format: `type(scope): description` (e.g. `feat(video): add intro for mvp`)
4. Push to `main` — Vercel auto-deploys on every push
5. **Never force-push**, never `--no-verify`, never amend published commits

### SOP: Regenerate a video after content changes

If an article's H2 headings change significantly:

```bash
npm run render-video -- --section={section} --slug={slug}
# Overwrites public/videos/{section}/{slug}.mp4
git add public/videos/{section}/{slug}.mp4
git commit -m "chore(video): regenerate {slug} after content update"
git push
```

---

## Common Pitfalls

- `description` must be ≤160 chars — Zod will fail the build if exceeded
- `locale` in frontmatter must be `"en"` (the only supported value currently)
- Content slugs come from the filename — use lowercase kebab-case
- `publishedDate` must be a valid ISO date string (`YYYY-MM-DD`)
- The `en/` folder in `src/content/glossary/en/` does NOT appear in the URL — the slug is extracted with `.split('/').pop()`
- The video player only appears when **both** `video: true` is in frontmatter **and** the `.mp4` file exists in `public/videos/`
- Remotion files in `remotion/` are NOT processed by Astro's Vite pipeline — they are standalone TypeScript compiled by Remotion's bundler
- GTM is already installed globally — do not add a second GTM or GA script in code
