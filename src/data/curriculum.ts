/**
 * Curriculum track definitions.
 *
 * Each track maps to a set of content categories (primary) and fallback tags
 * (secondary). At build time, pages query all 4 collections and assign each
 * entry to the FIRST track whose `categories` array contains the entry's
 * `category`. If no category match, the entry with the most tag overlaps wins.
 */

export type CurriculumTrack = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  /** Tailwind color name, e.g. "indigo" → used to build class names */
  color: string;
  /** content.data.category values that belong to this track (primary match) */
  categories: string[];
  /** content.data.tags values used as secondary/fallback match */
  tags: string[];
  order: number;
};

export const CURRICULUM_TRACKS: CurriculumTrack[] = [
  {
    id: 'foundations',
    slug: 'foundations',
    title: 'Foundations',
    subtitle: 'Start here — what startups are and how they work',
    description:
      'Understand the startup world from the ground up: what startups are, how they differ from regular businesses, the stages of growth, and the mental models every founder needs before writing a single line of code.',
    emoji: '🏗️',
    color: 'indigo',
    categories: ['startup', 'entrepreneurship', 'business'],
    tags: ['startup', 'founders', 'entrepreneur', 'early stage', 'business model', 'company building'],
    order: 1,
  },
  {
    id: 'product',
    slug: 'product',
    title: 'Product & Validation',
    subtitle: 'Build the right thing before building it right',
    description:
      'Learn how to discover real customer problems, build an MVP, measure what matters, and iterate toward product-market fit. Covers Jobs to Be Done, design thinking, prioritization frameworks, and more.',
    emoji: '🛠️',
    color: 'emerald',
    categories: ['product'],
    tags: ['product', 'mvp', 'validation', 'lean startup', 'product-market fit', 'ux', 'design', 'user research'],
    order: 2,
  },
  {
    id: 'finance',
    slug: 'finance',
    title: 'Finance & Metrics',
    subtitle: 'The numbers every founder must understand',
    description:
      'Master startup financial fundamentals: burn rate, runway, ARR, MRR, unit economics, gross margin, and the metrics that determine your fundraising readiness and long-term viability.',
    emoji: '📊',
    color: 'amber',
    categories: ['finance', 'metrics', 'accounting'],
    tags: ['finance', 'metrics', 'unit economics', 'revenue', 'cash flow', 'saas', 'accounting', 'kpi'],
    order: 3,
  },
  {
    id: 'fundraising',
    slug: 'fundraising',
    title: 'Fundraising',
    subtitle: 'How to raise money from angels and VCs',
    description:
      'From your first angel check to a Series A: understand how venture capital works, how to pitch, read a term sheet, build your data room, and close a round without getting diluted.',
    emoji: '💰',
    color: 'violet',
    categories: ['fundraising', 'venture capital', 'investment'],
    tags: ['fundraising', 'investors', 'venture capital', 'pitch', 'seed stage', 'cap table', 'equity', 'term sheet'],
    order: 4,
  },
  {
    id: 'growth',
    slug: 'growth',
    title: 'Growth & Go-to-Market',
    subtitle: 'Acquire customers and build a growth engine',
    description:
      'Build a repeatable go-to-market strategy: identify your ICP, choose your channels, set pricing, run growth experiments, and build the sales motion that takes you from first customer to $1M ARR.',
    emoji: '🚀',
    color: 'sky',
    categories: ['growth', 'marketing', 'sales', 'go-to-market'],
    tags: ['growth', 'gtm', 'sales', 'marketing', 'go-to-market', 'distribution', 'content marketing', 'seo', 'acquisition'],
    order: 5,
  },
  {
    id: 'team',
    slug: 'team',
    title: 'Team & Culture',
    subtitle: 'Hire, lead, and build a great founding team',
    description:
      'Learn how to find a co-founder, make your first hires, structure equity, set OKRs, manage remote teams, and build a culture that attracts and retains the people who will determine your outcome.',
    emoji: '👥',
    color: 'rose',
    categories: ['team', 'culture', 'hr', 'people'],
    tags: ['team', 'hiring', 'culture', 'co-founder', 'people', 'leadership', 'equity', 'compensation', 'remote work'],
    order: 6,
  },
];

/** Returns the track slug for a given content entry, or null if no match. */
export function getTrackForContent(
  category: string,
  tags: string[],
): string | null {
  const lowerCategory = category.toLowerCase();
  const lowerTags = tags.map((t) => t.toLowerCase());

  // 1. Primary: exact category match
  for (const track of CURRICULUM_TRACKS) {
    if (track.categories.some((c) => c.toLowerCase() === lowerCategory)) {
      return track.slug;
    }
  }

  // 2. Secondary: tag overlap score (most overlapping track wins)
  let bestTrack: CurriculumTrack | null = null;
  let bestScore = 0;
  for (const track of CURRICULUM_TRACKS) {
    const score = track.tags.filter((t) =>
      lowerTags.includes(t.toLowerCase()),
    ).length;
    if (score > bestScore) {
      bestScore = score;
      bestTrack = track;
    }
  }

  return bestScore > 0 ? bestTrack!.slug : null;
}
