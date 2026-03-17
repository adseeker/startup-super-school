---
title: "How to Set Up Analytics for Your Startup"
description: "Set up a three-layer analytics stack for your startup - product, revenue, and marketing analytics - and avoid the data traps that waste founder time."
locale: "en"
category: "product"
tags: ["analytics", "metrics", "product", "data", "tools"]
difficulty: "beginner"
publishedDate: 2024-12-27
primaryKeyword: "startup analytics setup"
readingTime: 12
seoKeywords: ["startup analytics setup", "how to set up startup analytics", "analytics tools for startups", "startup metrics tracking"]
---

## The Two Ways Founders Get Analytics Wrong

There are two failure modes, and most early-stage startups fall into one of them.

**Failure mode 1: Set up everything, measure nothing actionable.** The founder installs Google Analytics, Mixpanel, Hotjar, Segment, Intercom, and a custom database dashboard in the first month. Data flows into five different tools, no one has defined what success looks like, and every weekly review ends with "interesting, but what does it mean?" Six months later, the analytics stack costs $800/month and has produced zero behavior changes.

**Failure mode 2: Measure nothing until it's too late.** The founder skips analytics entirely in the early days to focus on building. By the time they raise a Series A, they have no historical data on activation rates, no cohort retention analysis, and no evidence of the trends they're claiming in investor conversations. They're running the business on gut feel and can't defend it with numbers.

The correct approach is neither of these. It's a minimal, deliberate analytics stack built in three layers - installed at the right time, tracking the right events, connected to a North Star Metric your team actually looks at.

## The Three-Layer Analytics Stack

Every startup needs three types of analytics data. Each layer answers a different question, uses different tools, and gets prioritized at a different stage.

### Layer 1: Product Analytics

**What it answers:** What are users doing inside the product?

**Tools:** Mixpanel, Amplitude, or PostHog. PostHog is open-source and self-hostable (strong privacy story; good free tier). Mixpanel's free tier handles up to 20 million monthly events and is excellent for early stage. Amplitude is powerful but tends to be overkill until you have significant scale.

**What you get:** Event tracking (every user action), funnel analysis (where users drop off), retention curves (who comes back, and when), cohort analysis (do users who came from channel X retain better than channel Y?), and user-level activity timelines.

This is the layer that tells you whether your product is actually working - not whether revenue is growing, but whether users are doing the things that create value.

### Layer 2: Revenue Analytics

**What it answers:** What is happening to your revenue, and why?

**Tools:** Stripe (as your payment processor) combined with ChartMogul or Baremetrics (both integrate directly with Stripe and auto-calculate your SaaS metrics).

**What you get:** MRR and ARR in real time, month-over-month growth rate, net revenue churn, customer churn, lifetime value (LTV), average revenue per user (ARPU), and cohort revenue retention. Both ChartMogul and Baremetrics have free tiers suitable for companies under $10K MRR.

This layer answers the questions your board and investors care about most, but it also answers the questions founders should care about most: are we retaining revenue? Which customer segment churns least? Does LTV justify our current acquisition spend?

### Layer 3: Marketing Analytics

**What it answers:** Where are your customers coming from, and which sources convert best?

**Tools:** Google Analytics 4 (free, industry standard), Plausible (privacy-first, €9/month, excellent UX), or Fathom (similar to Plausible, privacy-focused). For early-stage B2B, Plausible or Fathom are often preferable to GA4 because they're simpler and require no cookie consent for most use cases.

**What you get:** Website traffic by source, landing page conversion rates, geographic distribution, and device breakdown. Connected to your product analytics and revenue analytics, this layer tells you which acquisition channels produce the users who actually activate and pay - not just the users who click.

## When to Set Up Each Layer

Timing matters. Installing all three layers on day one is waste. Installing them too late means gaps in your historical data.

**Pre-launch (0 customers):** Install Layer 2 (Stripe + revenue analytics) and basic Layer 3 (at minimum, Google Analytics 4 or Plausible on your marketing site). You need to know where signups come from from the very first user, and your revenue metrics need historical data from the first dollar.

**At first users (1–50 customers):** Add Layer 1 (product analytics). You now have real users doing real things in your product. Track the key events in your onboarding flow from day one so you can see where users drop off before you have a retention problem.

**At $10K MRR:** Invest in the full stack. Connect your product analytics to your revenue analytics (most tools allow this via a customer ID field). Start running cohort analyses. This is when the connections between acquisition channels, user behavior, and revenue retention become visible - and actionable.

## Event Tracking Architecture

The most important decision in your product analytics setup is not which tool to use - it's what to track and how to name it.

An **event** is any user action you want to measure. Examples: `signed_up`, `completed_onboarding`, `created_first_project`, `invited_teammate`, `upgraded_plan`, `exported_report`.

**Name events around outcomes, not UI interactions.** `clicked_create_button` tells you very little. `created_first_project` tells you that a user reached a meaningful milestone. The difference is whether you're tracking what users clicked or what users accomplished.

**Naming convention that scales:**

Use `noun_verb` format for consistency: `project_created`, `plan_upgraded`, `teammate_invited`, `onboarding_completed`. Agree on the convention before you start tracking. Inconsistent naming (some events as `verb_noun`, others as `noun_verb`, others as complete phrases) creates a tracking architecture that becomes unusable as your event volume grows.

**The essential events to track from day one:**

- `signed_up` (user created an account)
- `onboarding_completed` (user reached your defined "activated" state)
- `core_action_performed` (whatever the key value-delivery action in your product is - replace with your specific event name)
- `plan_upgraded` (free to paid, or tier upgrade)
- `session_started` (user returned to the product)

These five events, tracked consistently from your first user, give you activation rate, retention rate, conversion rate, and the ability to analyze all of them by cohort.

## Setting Up Your North Star Metric Dashboard

Your North Star Metric (NSM) is the single number that best represents the value your product delivers to customers. It should be visible to your entire team, updated in real time or at minimum daily, and the one number everyone in the company is trying to move.

Examples by product type:
- B2B SaaS: Weekly Active Users, or "Projects completed per week"
- Marketplace: "Successful transactions per week"
- Consumer: "Daily Active Users," or more specifically the core action (songs played, photos edited, routes run)

**How to set up your NSM dashboard:**

Most product analytics tools have a "dashboards" feature where you can pin a single metric as the hero number. Create a simple dashboard with your NSM at the top, followed by three to five supporting metrics that explain why the NSM is moving.

Make this dashboard the opening slide of every company all-hands and every team sync. The single most powerful thing you can do for your growth culture is make the NSM visible, shared, and discussed consistently.

## The Weekly Metrics Review

Analytics data without a regular review ritual produces no behavior change. Build a 30-minute weekly review into your team calendar.

**The format:**

1. **NSM vs. last week** (2 minutes): Is it up or down? How much?
2. **Top acquisition channel** (3 minutes): Where did new users come from this week? Any anomalies?
3. **Activation rate** (5 minutes): What percentage of users who signed up this week completed onboarding? Compare to the previous four weeks.
4. **Retention check** (5 minutes): What does the day-7 and day-30 retention look like for cohorts from 4 and 8 weeks ago?
5. **Anomalies** (10 minutes): Anything unexpected in the data this week? A spike, a drop, an unusual source?
6. **One action** (5 minutes): Based on this review, what is the one thing we're doing differently next week?

Thirty minutes, every week, with the same format. Within three months, this ritual will surface more actionable insights than any analytics audit or data science project.

## GDPR and Privacy Compliance Basics

If you have users in the European Union, you have legal obligations around data collection. Non-compliance carries real fines and reputational risk.

**The minimum requirements:**

- **Cookie consent:** If you use tracking cookies (Google Analytics, most ad platforms), you need a cookie consent banner and must respect opt-outs. Tools like Cookiebot, Osano, or CookieYes handle this with minimal integration effort.
- **Data retention policy:** Define how long you retain user data and configure your analytics tools accordingly. Most tools allow you to set a data retention window (typically 12 to 26 months).
- **User deletion:** You must be able to delete all data associated with a specific user upon request. Verify that your analytics tools support user deletion via API or admin UI before you rely on them.
- **Privacy policy:** Disclose what data you collect, how it's used, and who it's shared with. This is a legal requirement, not a formality.

PostHog and Plausible have significantly lighter privacy footprints than Google Analytics 4 and Mixpanel, which is one reason they're popular with European founders and privacy-conscious products.

## Analytics for Non-Technical Founders

If you're a non-technical founder, the analytics setup can feel intimidating. It doesn't need to be.

**PostHog** is the most founder-friendly option for product analytics. The cloud version requires no infrastructure management. The event autocapture feature means you can get basic behavioral data with a single line of script installed on your site - no custom event code required to start. You can add specific event tracking incrementally as you understand your product better.

**Baremetrics** is the simplest revenue analytics layer if you're on Stripe. Connect your Stripe account and your MRR, churn, and LTV metrics are live within minutes. No configuration required.

**Plausible** replaces Google Analytics with a dashboard that shows you everything you actually need in a single screen, with no configuration, no cookie consent complexity for most use cases, and no data sold to third parties.

This three-tool stack (PostHog + Baremetrics + Plausible) covers all three layers for approximately $30 to $50/month at early stage and requires zero data engineering.

## The Most Common Analytics Mistakes

**Tracking vanity events.** Page views, total signups, and total registered users are easy to report but hard to act on. Track activation, retention, and revenue. Those are the metrics that tell you if the product is working.

**Not instrumenting the onboarding flow.** The most important funnel in your product is the path from signup to first value. If you don't track every step of that funnel from day one, you'll spend months guessing why users don't come back instead of knowing exactly where they drop off.

**Not connecting product analytics to revenue data.** Knowing that users do X inside your product is interesting. Knowing that users who do X are 3x more likely to upgrade to a paid plan is actionable. Connect these layers by passing a consistent customer ID across tools.

**Measuring weekly instead of by cohort.** Weekly active users can go up even as retention declines, if new signups are masking churn. Cohort analysis - looking at a group of users who joined in the same week and tracking their retention over time - gives you the true retention picture that weekly aggregates hide.

## Key Takeaway

A startup analytics stack is not about collecting as much data as possible - it is about having the right three layers in place at the right time, tracking events that correspond to outcomes rather than clicks, and reviewing the numbers on a consistent weekly cadence. Install revenue and marketing analytics before your first user, add product analytics at first users, and connect all three layers at $10K MRR. The tools are secondary; what matters is consistent event naming, a visible North Star Metric, and the discipline to act on what the data tells you.
