import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => {
    return data.locale === 'en' && data.published !== false;
  });
  const guides = await getCollection('guides', ({ data }) => {
    return data.locale === 'en' && data.published !== false;
  });

  const allItems = [...articles, ...guides].sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf(),
  );

  return rss({
    title: 'Startup Super School',
    description: 'The startup world encyclopedia — guides, definitions, and frameworks for founders.',
    site: context.site!,
    items: allItems.map((item) => {
      const section = 'author' in item.data ? 'articles' : 'guides';
      const slug = item.slug.split('/').pop();
      const siteBase = context.site!.href.replace(/\/$/, '');
      return {
        title: item.data.title,
        pubDate: item.data.publishedDate,
        description: item.data.description,
        link: `${siteBase}/${section}/${slug}`,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
