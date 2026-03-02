---
title: "Cohort Analysis"
description: "A method of grouping users by a shared trait—typically signup date—and tracking their behavior over time to reveal retention trends."
locale: "en"
category: "metrics"
tags: ["metrics", "analytics", "retention", "product"]
difficulty: "intermediate"
publishedDate: 2024-01-01
primaryKeyword: "cohort analysis"
relatedTerms: ["churn-rate", "ltv", "nrr", "product-market-fit"]
seoKeywords: ["cohort analysis startup", "what is cohort analysis", "retention cohort analysis", "SaaS cohort analysis"]
---

## What Is Cohort Analysis?

**Cohort analysis** is a method of grouping users by a shared characteristic — most commonly the time period in which they first signed up or made their first purchase — and then tracking the behavior of each group over subsequent time periods.

Instead of asking "how many users do we have today?", cohort analysis asks: "of the users who joined in January, what fraction are still active in month 3? Month 6? Month 12?" That distinction is the difference between a metric and an insight.

A **cohort** is any group defined by a common trait:

- **Acquisition cohort**: users who signed up in the same week or month (most common)
- **Behavioral cohort**: users who completed a specific action (e.g., invited a teammate, connected an integration)
- **Product cohort**: users who first used a specific feature or version

## Why Cohort Analysis Beats Aggregate Metrics

Aggregate metrics — total users, total revenue, average retention — are averages. Averages hide problems.

Consider a product with the following situation:

- January cohort: 60% retention at month 6
- February cohort: 50% retention at month 6
- March cohort: 35% retention at month 6
- April cohort: 20% retention at month 6

The overall average retention at month 6 might look acceptable — but the trend is catastrophic. Something changed in March (a product update, a new acquisition channel bringing lower-quality users, a pricing change) that is destroying retention. An aggregate view would never surface this. A cohort view makes it immediately visible.

## Reading a Cohort Retention Table

A standard cohort retention table looks like this, where each cell shows the percentage of the original cohort still active at that time period:

| Cohort | Month 0 | Month 1 | Month 2 | Month 3 | Month 6 | Month 12 |
|--------|---------|---------|---------|---------|---------|----------|
| Jan    | 100%    | 62%     | 48%     | 41%     | 35%     | 30%      |
| Feb    | 100%    | 58%     | 44%     | 38%     | 31%     | 27%      |
| Mar    | 100%    | 55%     | 40%     | 33%     | 26%     | —        |
| Apr    | 100%    | 51%     | 37%     | 29%     | —       | —        |
| May    | 100%    | 48%     | 33%     | —       | —       | —        |

How to read this table:

- **Rows** represent cohorts (grouped by signup month)
- **Columns** represent time elapsed since signup
- **Diagonals** show the same calendar period across cohorts — useful for spotting product or market changes
- **Empty cells** represent time periods that haven't elapsed yet

## What Good vs. Bad Retention Curves Look Like

When you plot retention over time for a cohort, the curve shape tells you whether you have product-market fit:

**Smiling curve (retention floors and holds):** The retention curve drops steeply in the first few periods, then flattens. The flat portion indicates a retained core of users who find genuine value. This is the PMF signal. The higher and sooner the floor, the stronger the fit.

**Still-declining curve (no floor):** Retention keeps declining toward zero. Every month you lose a percentage of whoever is left. This means the product has not yet found its core audience — there is no group of users for whom it is indispensable.

As a benchmark for B2B SaaS:

| Retention at Month 12 | Assessment |
|-----------------------|------------|
| > 70% | Excellent — strong PMF signal |
| 50–70% | Healthy — good product, room to improve |
| 30–50% | Concerning — churn is a real problem |
| < 30% | Critical — the product is not retaining users |

Consumer apps run significantly lower due to more casual usage patterns.

## How to Build a Cohort in Analytics Tools

**Amplitude:**
1. Navigate to Retention Analysis
2. Define the "new user" event (e.g., `Account Created`)
3. Define the "return" event (e.g., `Session Started` or a core action like `Report Generated`)
4. Set the time granularity (weekly or monthly)
5. Segment by acquisition channel, plan type, or geography to compare cohorts

**Mixpanel:**
1. Use the Retention report
2. Set "First time event" and "Return event"
3. Filter to specific time windows
4. Use the "Compare" feature to overlay cohorts from different acquisition channels

Both tools will render the retention table and the curve automatically. The harder work is defining what "retained" means for your product — a login is not the same as a user deriving value.

## Using Cohort Analysis to Diagnose Churn

When retention is poor, cohort analysis helps you ask the right diagnostic questions:

- **Are newer cohorts worse than older ones?** If yes, a recent product or channel change broke something.
- **Does retention differ by acquisition channel?** Users from organic search often retain better than users from paid campaigns, because they have higher intent.
- **Does retention differ by activation behavior?** Users who completed onboarding in the first session almost always retain dramatically better than those who didn't. This tells you where to focus activation investment.
- **Is there a specific drop-off point?** If 40% of users churn at exactly day 14, that is a product event to investigate — trial expiry, a paywall, a notification behavior.

## Key Takeaway

Cohort analysis is the most important analytical tool for understanding whether your product is retaining value over time. Aggregate metrics tell you where you are; cohort analysis tells you whether you are getting better or worse — and for which users, from which channels, in which time periods. If your retention curves are not flattening, no amount of acquisition spend will build a sustainable business.
