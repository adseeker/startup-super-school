import { defineCollection, z } from 'astro:content';

const locales = ['en'] as const;
type Locale = typeof locales[number];

const difficultyLevels = ['beginner', 'intermediate', 'advanced'] as const;

/** Shared fields for all content types */
const baseSchema = z.object({
  title: z.string(),
  description: z.string().max(160),
  locale: z.enum(locales),
  category: z.string(),
  tags: z.array(z.string()).min(1),
  difficulty: z.enum(difficultyLevels),
  publishedDate: z.coerce.date(),
  lastUpdated: z.coerce.date().optional(),
  published: z.boolean().default(true),
  seoKeywords: z.array(z.string()).optional(),
  image: z
    .object({
      url: z.string(),
      alt: z.string(),
    })
    .optional(),
});

/** Glossary — short definitions of startup terms */
const glossaryCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    relatedTerms: z.array(z.string()).optional(),
    acronym: z.string().optional(),
  }),
});

/** Guides — long-form how-to articles */
const guidesCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    readingTime: z.number().optional(),
  }),
});

/** Concepts — frameworks and methodologies */
const conceptsCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    origin: z.string().optional(),
    relatedConcepts: z.array(z.string()).optional(),
  }),
});

/** Articles — deep dives and insights */
const articlesCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    readingTime: z.number().optional(),
    author: z.string().optional(),
  }),
});

export const collections = {
  glossary: glossaryCollection,
  guides: guidesCollection,
  concepts: conceptsCollection,
  articles: articlesCollection,
};
