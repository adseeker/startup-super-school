/**
 * rehype-internal-links
 *
 * Automatically converts the first N occurrences of each registered primary
 * keyword into internal anchor links, across all content pages.
 *
 * Rules:
 * - Never links inside <a>, <code>, <pre>, <h1>-<h6> elements
 * - Never self-links (skips if the keyword's target === current page)
 * - Each keyword is linked at most once per page
 * - Total links added per page is capped at `maxLinksPerPage` (default: 2)
 * - Keywords are matched case-insensitively; anchor text preserves original casing
 * - Longer keywords are matched first to avoid partial-match conflicts
 *
 * @param {{ keywordMap: Record<string, { href: string }>, maxLinksPerPage?: number }} options
 */

import { visit, SKIP } from 'unist-util-visit';

/** Elements whose text content should never be auto-linked */
const BLOCKED_TAGS = new Set([
  'a', 'code', 'pre',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'script', 'style', 'button',
]);

/** Escape a string for safe use inside a RegExp */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function rehypeInternalLinks({ keywordMap = {}, maxLinksPerPage = 2 } = {}) {
  // Pre-sort keywords longest-first so longer phrases match before substrings
  const sortedKeywords = Object.entries(keywordMap)
    .map(([keyword, meta]) => ({
      keyword: keyword.toLowerCase(),
      href: meta.href,
      escaped: escapeRegex(keyword),
    }))
    .sort((a, b) => b.keyword.length - a.keyword.length);

  return function transformer(tree, file) {
    if (sortedKeywords.length === 0) return;

    // Derive current page slug from the file path to prevent self-linking
    const filePath = String(file.history?.[0] ?? file.path ?? '');
    const fileSlug = filePath.split('/').pop()?.replace(/\.(mdx?|astro)$/, '') ?? '';

    let linksAdded = 0;
    const usedKeywords = new Set();

    visit(tree, (node, index, parent) => {
      // Skip blocked elements and all their descendants
      if (node.type === 'element' && BLOCKED_TAGS.has(node.tagName)) {
        return SKIP;
      }

      if (node.type !== 'text') return;
      if (linksAdded >= maxLinksPerPage) return;
      if (!parent || parent.type !== 'element') return;

      const text = node.value;
      if (!text.trim()) return;

      for (const { keyword, href, escaped } of sortedKeywords) {
        if (usedKeywords.has(keyword)) continue;

        // Prevent self-linking: skip if this page is the link target
        if (href.endsWith(`/${fileSlug}`)) continue;

        // Word-boundary match, case-insensitive
        // Uses negative lookbehind/lookahead for alphanumeric chars and hyphens
        const regex = new RegExp(`(?<![a-zA-Z0-9-])(${escaped})(?![a-zA-Z0-9-])`, 'i');
        const match = regex.exec(text);
        if (!match) continue;

        const before = text.slice(0, match.index);
        const matched = match[0]; // preserves original casing from article text
        const after = text.slice(match.index + matched.length);

        const replacement = [];
        if (before) replacement.push({ type: 'text', value: before });
        replacement.push({
          type: 'element',
          tagName: 'a',
          properties: { href },
          children: [{ type: 'text', value: matched }],
        });
        if (after) replacement.push({ type: 'text', value: after });

        // Replace the text node with the split [before, <a>, after] nodes
        parent.children.splice(index, 1, ...replacement);

        linksAdded++;
        usedKeywords.add(keyword);
        break; // one keyword per text node per visit
      }
    });
  };
}
