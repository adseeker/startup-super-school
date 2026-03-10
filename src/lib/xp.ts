/**
 * XP and levelling system for Startup Super School.
 *
 * XP is computed client-side from the completions table — no DB column needed.
 * Levels are derived values, never stored.
 */

// ── XP per content section ───────────────────────────────────────────────
export const XP_PER_SECTION: Record<string, number> = {
  glossary: 10,   // quick definitions
  concepts: 20,   // frameworks and mental models
  articles: 25,   // deep dives
  guides:   30,   // practical step-by-step
};

// ── Level definitions ────────────────────────────────────────────────────
export type LevelDef = {
  level:  number;
  title:  string;
  minXp:  number;
  /** null for the final level */
  maxXp:  number | null;
  /** hex color used for badge, bar fill, accents */
  color:  string;
  /** emoji representing this level */
  icon:   string;
};

export const LEVELS: LevelDef[] = [
  { level: 1,  title: 'Curious Newcomer',   minXp: 0,    maxXp: 99,   color: '#9CA3AF', icon: '🌱' },
  { level: 2,  title: 'Aspiring Founder',   minXp: 100,  maxXp: 249,  color: '#3B82F6', icon: '📖' },
  { level: 3,  title: 'Startup Explorer',   minXp: 250,  maxXp: 499,  color: '#6366F1', icon: '🔍' },
  { level: 4,  title: 'Venture Apprentice', minXp: 500,  maxXp: 899,  color: '#8B5CF6', icon: '⚡' },
  { level: 5,  title: 'Product Builder',    minXp: 900,  maxXp: 1499, color: '#10B981', icon: '🛠️' },
  { level: 6,  title: 'Growth Hacker',      minXp: 1500, maxXp: 2299, color: '#06B6D4', icon: '🚀' },
  { level: 7,  title: 'Series A Ready',     minXp: 2300, maxXp: 3499, color: '#F59E0B', icon: '💼' },
  { level: 8,  title: 'Seasoned Operator',  minXp: 3500, maxXp: 4999, color: '#F97316', icon: '🏆' },
  { level: 9,  title: 'Startup Veteran',    minXp: 5000, maxXp: 6999, color: '#F43F5E', icon: '🦁' },
  { level: 10, title: 'Unicorn Hunter',     minXp: 7000, maxXp: null, color: '#EAB308', icon: '🦄' },
];

// ── Compute total XP from completions ────────────────────────────────────
export function computeXp(completions: Array<{ section: string }>): number {
  return completions.reduce((sum, c) => sum + (XP_PER_SECTION[c.section] ?? 10), 0);
}

// ── Resolve current level and progress info ──────────────────────────────
export type LevelInfo = {
  current:      LevelDef;
  next:         LevelDef | null;
  /** 0–100 progress within current level */
  progressPct:  number;
  /** XP earned within this level */
  xpInLevel:    number;
  /** XP needed to reach next level (span of current level) */
  xpToNext:     number;
};

export function getLevelInfo(xp: number): LevelInfo {
  const current = [...LEVELS].reverse().find(l => xp >= l.minXp) ?? LEVELS[0];
  const next    = LEVELS.find(l => l.level === current.level + 1) ?? null;

  const xpInLevel = xp - current.minXp;
  const xpToNext  = next ? next.minXp - current.minXp : 0;
  const progressPct = next
    ? Math.min(100, Math.round((xpInLevel / xpToNext) * 100))
    : 100;

  return { current, next, progressPct, xpInLevel, xpToNext };
}

// ── Streak: consecutive days with at least one completion ────────────────
export function computeStreak(completions: Array<{ completed_at: string }>): number {
  if (completions.length === 0) return 0;

  const days = [...new Set(completions.map(c => c.completed_at.slice(0, 10)))].sort().reverse();

  const today     = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

  // Streak only alive if the user completed something today or yesterday
  if (days[0] !== today && days[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]);
    const curr = new Date(days[i]);
    const diff = Math.round((prev.getTime() - curr.getTime()) / 86_400_000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}
