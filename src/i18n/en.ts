export const en = {
  site: {
    name: 'Startup Super School',
    tagline: 'The startup world, explained.',
    description:
      'An encyclopedia for founders, operators, and builders — covering startup terminology, frameworks, guides, and strategies.',
  },
  nav: {
    home: 'Home',
    glossary: 'Glossary',
    guides: 'Guides',
    concepts: 'Concepts',
    articles: 'Articles',
  },
  footer: {
    tagline: 'Building the startup world encyclopedia.',
    copyright: '© {year} Startup Super School. All rights reserved.',
  },
  content: {
    readMore: 'Read more',
    readingTime: '{n} min read',
    lastUpdated: 'Last updated {date}',
    publishedOn: 'Published {date}',
    relatedTerms: 'Related terms',
    relatedContent: 'Related content',
    tableOfContents: 'Table of contents',
    backTo: 'Back to {section}',
    difficulty: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
    sections: {
      glossary: 'Glossary',
      guides: 'Guides',
      concepts: 'Concepts',
      articles: 'Articles',
    },
    sectionDescriptions: {
      glossary: 'Definitions of key startup terms, from MVP to venture capital.',
      guides: 'Step-by-step guides for founders building and growing startups.',
      concepts: 'Frameworks and methodologies that shape how startups operate.',
      articles: 'In-depth analysis and insights on the startup world.',
    },
  },
  home: {
    hero: {
      headline: 'The Startup World, Explained.',
      subheadline:
        'Definitions, guides, frameworks, and insights — everything a founder needs to understand the startup ecosystem.',
      cta: 'Start learning',
    },
    sections: {
      featuredTitle: 'Start Here',
      glossaryTitle: 'Glossary',
      guidesTitle: 'Guides',
      conceptsTitle: 'Concepts',
      articlesTitle: 'Articles',
    },
  },
  search: {
    placeholder: 'Search terms, guides, concepts…',
    noResults: 'No results found for "{query}"',
  },
} as const;

export type Translations = typeof en;
