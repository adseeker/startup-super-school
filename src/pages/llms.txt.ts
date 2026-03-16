import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const [glossary, guides, concepts, articles] = await Promise.all([
    getCollection('glossary', ({ data }) => data.locale === 'en' && data.published !== false),
    getCollection('guides', ({ data }) => data.locale === 'en' && data.published !== false),
    getCollection('concepts', ({ data }) => data.locale === 'en' && data.published !== false),
    getCollection('articles', ({ data }) => data.locale === 'en' && data.published !== false),
  ]);

  const site = context.site!.href.replace(/\/$/, '');

  const sortedGuides = guides.sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());
  const sortedArticles = articles.sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());
  const sortedGlossary = glossary.sort((a, b) => a.data.title.localeCompare(b.data.title));
  const sortedConcepts = concepts.sort((a, b) => a.data.title.localeCompare(b.data.title));

  function entry(section: string, slug: string, title: string, description: string) {
    return `- [${title}](${site}/${section}/${slug}): ${description}`;
  }

  const lines: string[] = [
    `# Startup Super School`,
    ``,
    `> The startup world encyclopedia. Definitions, guides, frameworks, and articles for founders, operators, and builders.`,
    ``,
    `## About`,
    ``,
    `Startup Super School is a free, structured learning resource covering every dimension of building a startup.`,
    `It is organized into four content types (Glossary, Guides, Concepts, Articles) and six curriculum tracks`,
    `(Foundations, Product & Validation, Finance & Metrics, Fundraising, Growth & Go-to-Market, Team & Culture).`,
    ``,
    `- Site: ${site}`,
    `- Curriculum: ${site}/curriculum`,
    `- Glossary: ${site}/glossary (${sortedGlossary.length} terms)`,
    `- Guides: ${site}/guides (${sortedGuides.length} guides)`,
    `- Concepts: ${site}/concepts (${sortedConcepts.length} frameworks)`,
    `- Articles: ${site}/articles (${sortedArticles.length} articles)`,
    `- RSS feed: ${site}/rss.xml`,
    ``,
    `## Guides (${sortedGuides.length})`,
    ``,
    ...sortedGuides.map(e => entry('guides', e.slug.split('/').pop()!, e.data.title, e.data.description)),
    ``,
    `## Articles (${sortedArticles.length})`,
    ``,
    ...sortedArticles.map(e => entry('articles', e.slug.split('/').pop()!, e.data.title, e.data.description)),
    ``,
    `## Glossary (${sortedGlossary.length})`,
    ``,
    ...sortedGlossary.map(e => entry('glossary', e.slug.split('/').pop()!, e.data.title, e.data.description)),
    ``,
    `## Concepts & Frameworks (${sortedConcepts.length})`,
    ``,
    ...sortedConcepts.map(e => entry('concepts', e.slug.split('/').pop()!, e.data.title, e.data.description)),
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
