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
| Auth & DB | Supabase (client-side JS SDK + SSR for public profiles) — `profiles`, `completions`, `notes` tables |
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
├── lib/
│   ├── supabase.ts          ← Supabase client singleton + Profile type
│   └── xp.ts                ← computeXp(), getLevelInfo(), computeStreak(), LEVELS, XP_PER_SECTION
├── data/
│   └── curriculum.ts        ← CURRICULUM_TRACKS array + getTrackForContent(category, tags)
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
    ├── index.astro          ← Homepage (personalized for logged-in users)
    ├── search.astro         ← Pagefind search
    ├── rss.xml.ts           ← RSS feed (articles + guides)
    ├── tags/[tag].astro     ← Tag listing pages
    ├── login.astro          ← Login form (signInWithPassword)
    ├── register.astro       ← Sign-up form (first_name, last_name, email, password)
    ├── profile.astro        ← User profile: XP, level, streaks, curriculum progress, activity feed, notes
    ├── u/
    │   ├── [username].astro ← Public profile page (SSR, noindex) — notes feed
    │   └── [username]/
    │       └── notes/
    │           └── [id].astro ← Single note page (SSR, noindex)
    ├── @[username].astro    ← 301 redirect to /u/[username] (legacy, do not use)
    ├── @[username]/
    │   └── notes/
    │       └── [id].astro   ← 301 redirect to /u/[username]/notes/[id] (legacy)
    ├── curriculum/
    │   ├── index.astro      ← All tracks overview
    │   └── [track].astro    ← Individual track page (slug from CURRICULUM_TRACKS)
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
| `faqs` | `{question, answer}[]` | — | FAQ entries: rendered as visual accordion in page AND as `FAQPage` JSON-LD for Google rich results |
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
- **JSON-LD schemas** (see full table below)
- **Sitemap**: Auto-generated at `/sitemap-index.xml` by `@astrojs/sitemap`
- **RSS**: At `/rss.xml` — includes articles and guides
- **robots.txt**: At `/robots.txt` — allows all crawlers

### JSON-LD Schema map

Every page emits structured data automatically. No extra code needed — schemas are driven by frontmatter fields.

| Page / Section | Schemas emitted |
|----------------|-----------------|
| Homepage | `WebSite` (with `SearchAction`) + `Organization` |
| All content pages | Main schema (see below) + `BreadcrumbList` |
| + `faqs` in frontmatter | + `FAQPage` (rich results in Google) |
| Glossary pages | `DefinedTerm` + `DefinedTermSet` |
| Guides pages | `HowTo` (+ `step[]` when `steps` in frontmatter) |
| Concepts pages | `Article` |
| Articles pages | `Article` |

**Rule: every new content page must include `faqs`.** FAQs generate `FAQPage` rich results in Google — they are one of the highest-value SEO signals available for this type of content. Do not publish a page without at least 3–4 well-written FAQs in the frontmatter.

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
- **Required environment variables** (set in Vercel project settings):
  - `PUBLIC_SUPABASE_URL` — Supabase project URL (e.g. `https://xxxx.supabase.co`)
  - `PUBLIC_SUPABASE_ANON_KEY` — Supabase publishable/anon key
  - These must also be present in `.env` locally for `npm run dev` to work
  - Both need the `PUBLIC_` prefix so Astro exposes them to client-side scripts

---

## Style Conventions

- **Tailwind v4**: No `tailwind.config.js` — use CSS custom properties in `src/styles/global.css`
- **Typography**: `prose prose-gray prose-lg` for article body
- **Accent color**: `text-indigo-600` / `bg-indigo-600`
- **Font**: Inter Variable, self-hosted via `@fontsource-variable/inter` — imported in `src/styles/global.css`, font-family is `'Inter Variable'`
- No dark mode — clean white/gray palette

---

## Agent SOPs

### Before starting any task

1. Read `CLAUDE.md` (this file) in full
2. Run `npm run build` to confirm the baseline is clean before touching anything
3. Read every file you plan to modify — never edit blind
4. When creating new content: list existing slugs first to avoid duplicates
   ```bash
   ls src/content/glossary/en/ src/content/guides/en/ src/content/concepts/en/ src/content/articles/en/
   ```

### SOP: Add or update a content piece

1. Create or edit the `.md` file in `src/content/{section}/en/`
2. Verify `description` is ≤160 chars — use this one-liner, do not guess:
   ```bash
   echo -n "your description here" | wc -c
   ```
3. **Add `faqs` — mandatory for every page** (see SOP below)
4. For guides: **add `steps`** — mandatory for every guide (enables HowTo rich results)
5. Run `npm run build` — Zod will catch schema errors before deploy
6. If adding `video: true`, generate the video first (see video SOP above)
7. Commit with `git add` (specific files, not `-A`) and push

### SOP: Schema markup — FAQs and Steps (mandatory for all new content)

**This is not optional.** Every content page must include `faqs` in frontmatter. Guide pages must also include `steps`. These fields drive FAQPage and HowTo rich results in Google Search.

#### Adding FAQs to any content page

```yaml
faqs:
  - question: "What is X?"
    answer: "X is ... [complete, standalone answer — 2–4 sentences]"
  - question: "How does X work?"
    answer: "X works by ... [no references to 'this article' or 'as mentioned above']"
  - question: "What is the difference between X and Y?"
    answer: "X does A, while Y does B ..."
  - question: "When should you use X?"
    answer: "Use X when ... avoid it when ..."
```

**FAQ writing rules:**
- Minimum 3 questions, ideally 4
- Questions must match real search queries (think: what would someone Google?)
- Answers must be self-contained — Google shows them without surrounding context
- No answer should reference "this article", "as described above", or "see below"
- Each answer: 2–5 sentences, factually accurate, no padding

#### Adding Steps to guides (HowTo schema)

```yaml
steps:
  - name: "Step name (short, imperative)"
    text: "What the user actually does in this step. 1–3 sentences, specific and actionable."
  - name: "Next step name"
    text: "..."
```

**Steps rules:**
- Map each step to a main `##` heading in the guide body
- 4–8 steps is the right range
- `text` must describe the action, not just restate the heading

#### Backfilling existing content

All existing content pages should eventually have `faqs` added. Prioritize by traffic potential (core terms first: MVP, PMF, burn rate, runway, ARR, churn rate are already done).

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
6. After any push that adds or updates content pages, run IndexNow to notify search engines:
   ```bash
   node scripts/submit-indexnow.mjs --all
   ```
   Use `--all` when multiple pages changed (bulk content updates, em dash cleanups, etc.).
   For single-page updates, pass `CHANGED_FILES` instead:
   ```bash
   CHANGED_FILES="src/content/glossary/en/mvp.md" node scripts/submit-indexnow.mjs
   ```

### SOP: Supabase auth (client-side pattern)

This site is fully static — auth runs 100% client-side via `@supabase/supabase-js`. No SSR or middleware.

**Architecture**:
- `src/lib/supabase.ts` — exports a singleton `supabase` client. Import this everywhere.
- `src/pages/login.astro` / `register.astro` — plain HTML forms, auth logic in `<script>` tags via `supabase.auth.signInWithPassword()` / `signUp()`
- `src/pages/profile.astro` — fetches user + completions from Supabase client-side on page load
- `src/components/Header.astro` — calls `supabase.auth.getUser()` in a `<script>` to show/hide auth nav items
- `profiles` table has `id` (= `auth.users.id`), `username` (unique, public), `first_name`, `last_name`, `bio`, `interests`, etc.
- `completions` table has `user_id`, `section`, `slug`, `completed_at`
- `notes` table has `id` (BIGSERIAL), `user_id`, `body` (max 500 chars), `created_at`

**Setup checklist for a new environment**:
1. Create Supabase project
2. Run migrations: `profiles` table (linked to `auth.users`), `completions` table, `notes` table, RLS policies
3. Add `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` to `.env` (local) and Vercel env vars (production)
4. In Supabase Dashboard → Auth → Providers → Email: disable "Confirm email" during dev (re-enable + add custom SMTP for production)

**Migration SQL for notes + public profiles**:
```sql
-- Add username to profiles
ALTER TABLE profiles ADD COLUMN username TEXT UNIQUE;
CREATE UNIQUE INDEX profiles_username_lower_idx ON profiles (lower(username));

-- Allow public read of profiles that have a username set
CREATE POLICY "profiles_public_read" ON profiles
  FOR SELECT USING (username IS NOT NULL);

-- Notes table
CREATE TABLE notes (
  id         BIGSERIAL PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body       TEXT NOT NULL CHECK (char_length(body) >= 1 AND char_length(body) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notes_public_read" ON notes FOR SELECT USING (true);
CREATE POLICY "notes_owner_all"   ON notes FOR ALL    USING (auth.uid() = user_id);
```

**Key pattern — lazy-load Supabase for pages with many guest visitors**:
For pages where most visitors are not logged in (content pages, homepage, curriculum), avoid loading the 46KB Supabase SDK unconditionally. Check localStorage first — Supabase stores its session token there:
```ts
const hasSession = Object.keys(localStorage).some(k => k.includes('-auth-token'));
if (hasSession) {
  const { supabase } = await import('../lib/supabase');
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    // logged-in UI
  } else {
    // guest UI (expired token)
  }
} else {
  // guest UI — SDK never loaded
}
```
Pages that already use this pattern: `Header.astro`, `ContentLayout.astro`. Pages that load Supabase unconditionally (intentional — always need auth): `index.astro`, `profile.astro`, `curriculum/index.astro`, `curriculum/[track].astro`.

**Key pattern — top-level await in `<script>`**:
```ts
// Astro <script> tags are ESM modules — top-level await is supported
const { data: { user } } = await supabase.auth.getUser();
if (user) {
  // show logged-in UI
} else {
  // show guest UI
}
// Never use `return` at top level — wrap in `if` blocks
```

**Key pattern — `?next=` redirect after login/register**:
```ts
const redirect = new URLSearchParams(window.location.search).get('next') ?? '/';
window.location.href = redirect;
```
Link to login as: `href="/login?next=/profile"`.

### SOP: Generate an infographic for a content page

Infographics are static SVG files (900px wide) that summarize the article structure: colored header, numbered sections with H2 heading + first paragraph description, tag footer. They appear automatically in ContentLayout when the file exists — no frontmatter change needed.

```bash
# Generate the SVG (~instant)
npm run render-infographic -- --section=guides --slug=my-guide
# → public/infographics/guides/my-guide.svg

# Verify locally
npm run dev
# → /guides/my-guide should show the infographic between header and article body

# Build check
npm run build

# Commit
git add public/infographics/guides/my-guide.svg
git commit -m "feat(infographic): add infographic for my-guide"
git push
```

- SVG accent color follows the same section map as videos (glossary=indigo, guides=emerald, concepts=amber, articles=rose)
- Script skips sections named "Key Takeaway", "Conclusion", "Summary", "FAQ" — max 5 sections
- If H2 headings change significantly, regenerate by re-running the same command (overwrites)
- ContentLayout detects the file via `existsSync` at build time — no `infographic: true` frontmatter needed

### SOP: Deploy di una Edge Function

1. Prima del primo deploy in un nuovo ambiente, linka il CLI al progetto corretto:
   ```bash
   npx supabase link --project-ref <project-ref>
   ```
   Il project ref si trova in **Supabase Dashboard → Settings → General → Reference ID**.
2. Deploya:
   ```bash
   npx supabase functions deploy <function-name>
   ```
3. I secrets (es. `BREVO_API_KEY`) vanno settati in **Dashboard → Edge Functions → Secrets** e sopravvivono ai redeploy.

### SOP: Chiamare una Edge Function dal frontend

Non usare `supabase.functions.invoke()` — fallisce con 401 quando non c'è una sessione attiva (es. subito dopo `signUp()`). Usare sempre `fetch()` diretto con la **legacy anon key** (`eyJ...`):

```ts
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
await fetch(`${supabaseUrl}/functions/v1/<function-name>`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': supabaseAnonKey,
    'Authorization': `Bearer ${supabaseAnonKey}`,
  },
  body: JSON.stringify({ ... }),
});
```

**Nota**: `PUBLIC_SUPABASE_ANON_KEY` deve contenere la **legacy anon key** (`eyJ...`), non la nuova publishable key (`sb_publishable_...`). Le Edge Functions non accettano il nuovo formato. La legacy key si trova in **Dashboard → Settings → API → tab "Legacy anon, service_role API keys"**.

### SOP: Public profiles and notes (SSR pages)

Public profile pages and note pages are **SSR** (server-rendered at request time), not static. They use `export const prerender = false` in the Astro frontmatter.

**URL structure**:
- `/u/[username]` — public profile page with notes feed
- `/u/[username]/notes/[id]` — single note page
- Both pages are `noindex` (thin content, not for indexing)

**Files**:
- `src/pages/u/[username].astro` — fetches profile + notes from Supabase server-side
- `src/pages/u/[username]/notes/[id].astro` — fetches note + author, redirects 301 if wrong username
- `src/pages/@[username].astro` and `src/pages/@[username]/notes/[id].astro` — 301 redirects to `/u/` (do not edit)
- `src/middleware.ts` — passthrough only, no rewrites

**Why `/u/[username]` and not `/@username`**: Vite's dev server intercepts all `/@...` paths internally. The `@` routes would work in production (Vercel) but fail in local dev. Using `/u/[username]` avoids this entirely.

**RLS requirement**: The `profiles` table needs a public read policy for SSR queries (which use the anon key, no session):
```sql
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT USING (username IS NOT NULL);
```
Without this policy, the server-side Supabase query returns null and the page 404s.

**Username rules**: 3–30 chars, `[a-z0-9_-]` only, unique across all profiles (enforced by DB unique constraint + app-level check before save).

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
- `publishedDate` must be a valid ISO date string (`YYYY-MM-DD`) and must reflect the **real current date** (read from the `currentDate` value in the system context) — never invent a date or copy dates from existing content as reference, as existing articles have incorrect placeholder dates
- The `en/` folder in `src/content/glossary/en/` does NOT appear in the URL — the slug is extracted with `.split('/').pop()`
- The video player only appears when **both** `video: true` is in frontmatter **and** the `.mp4` file exists in `public/videos/`
- Remotion files in `remotion/` are NOT processed by Astro's Vite pipeline — they are standalone TypeScript compiled by Remotion's bundler
- GTM is already installed globally — do not add a second GTM or GA script in code
- **Do not publish content without `faqs`** — missing FAQs means missing `FAQPage` rich results in Google
- **Do not publish a guide without `steps`** — missing steps means the `HowTo` schema has no structured step data for Google rich results
- **`title` in frontmatter must be ≤ 47 chars** — the rendered `<title>` tag is `{title} - Startup Super School` (23-char suffix), reaching exactly 70 chars at 47 frontmatter chars. Bing and Google flag titles over 70. Check with: `echo -n "your title here - Startup Super School" | wc -c`
- **Internal links must never include `/en/` in the path** — content lives under `src/content/glossary/en/` etc. but `en/` is stripped from URLs. Always link as `/guides/slug`, `/glossary/slug`, etc. Periodically grep for `/en/` in content bodies to catch stale links: `grep -r "/en/" src/content/`
- **`pagefind-ui.js` is an IIFE with no ES module exports** — `const { PagefindUI } = await import('/pagefind/pagefind-ui.js')` always returns `undefined` (the file only sets `window.PagefindUI`). The widget silently never renders. Always import from the npm package in a regular `<script>` tag: `import { PagefindUI } from '@pagefind/default-ui'`
- **`PagefindUI` has no `defaultValue` option** — to pre-fill the search box from `?q=` and auto-trigger the search, manually set the input value and dispatch an `input` event after `new PagefindUI()`: `input.value = query; input.dispatchEvent(new Event('input', { bubbles: true }))`
- **`return` at top-level in Astro `<script>` tags is a syntax error** — Astro bundles `<script>` as ESM modules; `return` is not allowed outside a function. Use `if (user) { ... }` guard blocks instead of early returns.
- **Supabase email rate limit on free tier** — the shared transactional email pool throttles new signups globally. For local development, disable "Confirm email" in Supabase Dashboard → Authentication → Providers → Email. Re-enable before going to production with a custom SMTP.
- **`PUBLIC_` prefix required for browser-accessible env vars** — in Astro, only `import.meta.env.PUBLIC_*` variables are included in client bundles. Any env var without the `PUBLIC_` prefix is `undefined` in the browser (even if it exists in `.env`). Supabase keys must be `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.
- **Build-time data for client scripts**: when a client-side `<script>` needs data computed at build time (e.g. tag lists, track mappings, title lookups), embed it as JSON in a hidden `data-*` attribute on a `<div>` in the Astro template, then read it with `JSON.parse(el.dataset.key)` in the script. This avoids API calls and is safe for static sites.
- **`@astrojs/rss` adds trailing slashes to relative `link` URLs** — passing `link: '/section/slug'` gets normalized to `/section/slug/`. Fix: always use absolute URLs: `link: \`${siteBase}/${section}/${slug}\`` where `siteBase = context.site!.href.replace(/\/$/, '')`.
- **WCAG AA contrast failures** — `text-gray-400` on white is 2.85:1 (fails). `text-gray-500` on `text-xs` (12px) is 4.48:1 (fails, needs 4.5:1). Colored text `-600` on same-color `-50` tinted backgrounds also fails (e.g. `text-emerald-600` on `bg-emerald-50`). Use `text-gray-500` for secondary text, `text-gray-600` for extra-small text, `-700` variants for colored text on tinted backgrounds.
- **Vite dev server intercepts `/@...` URL paths** — Vite reserves paths starting with `/@` for internal virtual modules (`/@vite/client`, `/@id/...`). Any Astro page file named `@[param].astro` will return 404 in local dev (works in Vercel production but breaks DX). Use `/u/[username]` or another prefix instead. Never create routes with `@` as the first character of the URL path.
- **SSR pages querying Supabase server-side need explicit RLS public read policies** — SSR frontmatter runs with the anon key and no user session. If `profiles` or other tables have RLS policies of `auth.uid() = id`, all server-side reads return null. Add a `FOR SELECT USING (...)` policy for any data that should be publicly readable.
- **Astro middleware must export `onRequest` via `defineMiddleware`** — an empty `export {}` in `src/middleware.ts` causes a build error (`import { sequence } from 'astro:middleware'` fails). Use `export const onRequest = defineMiddleware((_ctx, next) => next())` for a no-op passthrough.
- **esbuild fails on TypeScript generics in `<script>` blocks AND in Astro template expressions** — esbuild processes `<script>` blocks in transpile-only mode and chokes on TypeScript generics. Remove all of the following from `<script>` tags: `Record<string, X>`, `Array<{...}>`, `as const`, `as HTMLElement`, `: TypeAnnotation` on function params, `!` non-null assertions. The same restriction applies to JSX template expression contexts (inside `{...}` in the template section) — e.g., `(['a', 'b'] as const).map(...)` or a `.map((x: string) => ...)` callback inside the template will also fail. The error location reported by esbuild is often misleading; when debugging, scan both the `<script>` block and all `{...}` template expressions.
