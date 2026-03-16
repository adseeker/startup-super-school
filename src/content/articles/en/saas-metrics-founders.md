---
title: "The 10 SaaS Metrics Every Founder Should Track"
description: "Most founders track vanity metrics. Here are the 10 SaaS metrics that actually predict growth, retention, and unit economics — with benchmarks."
locale: "en"
category: "metrics"
tags: ["metrics", "SaaS", "finance", "analytics", "growth"]
difficulty: "intermediate"
publishedDate: 2024-12-21
primaryKeyword: "SaaS metrics for founders"
readingTime: 14
author: "Startup Super School"
seoKeywords: ["SaaS metrics for founders", "SaaS KPIs", "startup metrics to track", "SaaS dashboard metrics"]
faqs:
  - question: "What is net revenue retention (NRR) and why do SaaS investors care about it so much?"
    answer: "Net Revenue Retention (NRR) measures how much revenue you retain from your existing customer base after accounting for expansions, contractions, and cancellations. The formula is: (Starting MRR + Expansion MRR - Contraction MRR - Churned MRR) / Starting MRR × 100. NRR above 100% means your existing customers are growing as a revenue base without any new customer acquisition. Elite SaaS companies like Snowflake have reported NRR above 130%. NRR below 100% is a structural problem — no amount of new customer acquisition can permanently overcome a shrinking existing base."
  - question: "What is a healthy LTV to CAC ratio for a SaaS startup?"
    answer: "A healthy SaaS business targets an LTV:CAC ratio of 3:1 or higher, meaning for every $1 spent acquiring a customer, the business earns $3 in gross profit over that customer's lifetime. Below 1:1, you are destroying value with every new customer acquired. Above 5:1 may indicate underinvestment in growth. Founders frequently make the mistake of calculating blended CAC rather than separating organic from paid channel economics, which can hide a very expensive paid acquisition cost behind a low organic CAC."
  - question: "What is the payback period metric and what is a good benchmark for SaaS?"
    answer: "Payback period measures how many months it takes to recover the cost of acquiring a customer through their gross profit contribution. The formula is CAC divided by (ARPA × Gross Margin). Best-in-class B2B SaaS achieves payback under 12 months. 12–18 months is acceptable. Above 24 months requires significant capital to fund growth because you are waiting two years before each customer becomes profitable. Even a healthy LTV:CAC ratio can be problematic if the payback period is 36 months, since the cash flow burden is severe."
  - question: "Which SaaS metrics matter most at each stage of growth?"
    answer: "Before $100K ARR, focus on activation rate and qualitative engagement — the signal-to-noise ratio on financial metrics is too low. From $100K to $1M ARR, add gross revenue churn, NRR, and CAC by channel; you now have enough data to see retention patterns. From $1M to $10M ARR, all 10 metrics matter. Add formal payback period tracking as you begin scaling paid acquisition, and prioritize gross margin analysis before a Series A, since investors will build their entire model on NRR, CAC, and payback period."
---

## Why Most Founders Track the Wrong Things

Total registered users. App downloads. Monthly page views. These numbers are comfortable to report because they almost always go up. They require no uncomfortable explanation. They look good in investor updates.

They tell you almost nothing about the health of your business.

The problem with vanity metrics is not that they're false — it's that they're decoupled from the outcomes that determine whether a SaaS company survives. A product can have 50,000 registered users and be three months from shutting down. What matters is not how many people showed up once — it's how many people keep coming back and paying you more over time.

The 10 metrics below are the ones that actually predict that. Each includes a definition, the exact formula, a benchmark drawn from industry data, and the red flag threshold that should trigger an immediate investigation.

## The 10 Metrics That Actually Matter

### 1. MRR — Monthly Recurring Revenue (and Its Components)

**Definition**: The normalized, predictable revenue your business generates each month from active subscriptions.

**Formula**: Sum of all active monthly subscription values. For annual plans, divide total contract value by 12.

MRR is not just a top-line number — it's a decomposition. Every founder should track MRR by type:

- **New MRR**: Revenue from new customers acquired this month
- **Expansion MRR**: Additional revenue from existing customers (upgrades, add-ons)
- **Contraction MRR**: Lost revenue from customers who downgraded
- **Churned MRR**: Revenue lost from cancellations
- **Net New MRR** = New + Expansion - Contraction - Churned

**Benchmark**: At $1M ARR, expansion MRR should be at least 20–30% of new MRR for a healthy B2B SaaS business.

**Red flag**: If churned + contraction MRR consistently exceeds expansion MRR, you are not growing — you are leaking.

### 2. ARR and ARR Growth Rate

**Definition**: Annual Recurring Revenue — MRR × 12. The primary scale metric for SaaS.

**Formula**: MRR × 12 (or the sum of all annual contract values currently active)

ARR matters most in the context of its growth rate. A company at $2M ARR growing 150% year-over-year is in a fundamentally different position than one at $5M ARR growing 30%.

**Benchmark**: The "T2D3" framework (Triple, Triple, Double, Double, Double) — popularized by Bessemer Venture Partners — describes a path from ~$2M ARR to $100M ARR in five years. Sub-$1M ARR startups should target 3x annual growth; post-$1M ARR, 2x is the floor for venture-scale.

**Red flag**: ARR growth rate declining by more than 20 percentage points year-over-year without a strategic reason signals deepening distribution or retention problems.

### 3. Gross and Net Churn Rate

**Definition**: Gross Revenue Churn measures revenue lost to cancellations and downgrades, independent of expansion. Logo Churn (Customer Churn) measures the percentage of customers who cancel entirely.

**Formula (Gross Revenue Churn)**: (Churned MRR + Contraction MRR) / MRR at start of period

**Formula (Logo Churn)**: Customers lost / Customers at start of period

These are not interchangeable. A SaaS company can have 5% logo churn but 2% net revenue churn if the customers who stay are expanding. Gross revenue churn reveals the quality of your book of business.

**Benchmark**: Best-in-class B2B SaaS: gross revenue churn under 5% annually. SMB-focused SaaS: under 10% annually. Consumer SaaS: 3–7% monthly logo churn is typical.

**Red flag**: Monthly gross revenue churn above 3% in B2B. At that rate, you need to replace 30%+ of your book every year just to stay flat.

### 4. Net Revenue Retention (NRR)

**Definition**: NRR measures how much revenue you retain from your existing customer base after accounting for expansions, contractions, and churn. It is the single most important metric for understanding the long-term trajectory of a SaaS business.

**Formula**: (Starting MRR + Expansion MRR - Contraction MRR - Churned MRR) / Starting MRR × 100

**Benchmark**: Elite SaaS companies — Snowflake, Twilio in its early growth phase, Datadog — have reported NRR above 130%. A strong B2B SaaS target is NRR > 110%. Below 100% means your existing customers are shrinking as a revenue base, and every dollar of new revenue is just replacing what you're losing.

**Red flag**: NRR below 100% is a structural problem. No amount of new customer acquisition can permanently overcome a sub-100% NRR base.

### 5. CAC — Customer Acquisition Cost, by Channel

**Definition**: The fully-loaded cost to acquire one new paying customer.

**Formula**: Total sales + marketing spend in period / New customers acquired in that period

The crucial mistake founders make is calculating blended CAC. A $300 blended CAC might hide a $50 organic CAC and a $1,200 paid CAC. When you scale, you scale the channel — so you need channel-level economics. Attribution is imperfect, but directionally separating organic (SEO, word of mouth, referral) from paid (Google Ads, LinkedIn, outbound SDR) is essential.

**Benchmark**: Widely varies by segment. SMB SaaS: $200–$1,500 typical. Mid-market: $5,000–$25,000. Enterprise: $50,000+.

**Red flag**: If you cannot calculate CAC by channel, you are flying blind on your growth model.

### 6. LTV and the LTV:CAC Ratio

**Definition**: Lifetime Value is the total gross profit expected from a customer over their relationship with you.

**Formula (simple)**: (Average Revenue Per Account × Gross Margin) / Churn Rate

**Formula (LTV:CAC ratio)**: LTV / CAC

**Benchmark**: A healthy SaaS business targets LTV:CAC of 3:1 or higher. Meaning: for every $1 spent acquiring a customer, you earn $3 in gross profit over their lifetime. Below 1:1, you are destroying value with every new customer you acquire. Above 5:1, you may be underinvesting in growth.

**Red flag**: LTV:CAC below 3:1 in a mature go-to-market motion. Below 1:1 is existentially urgent.

### 7. Payback Period

**Definition**: How many months does it take to recover the cost of acquiring a customer through their gross profit contribution?

**Formula**: CAC / (ARPA × Gross Margin)

Payback period is a cash flow metric. Even a healthy LTV:CAC of 4:1 is stressful if the payback period is 36 months — you are funding years of operations before each customer becomes profitable.

**Benchmark**: Best-in-class: under 12 months. Acceptable: 12–18 months. For enterprise SaaS with annual prepay, 18–24 months is workable if NRR is strong. Above 24 months requires significant capital to fund growth.

**Red flag**: Payback period extending without a corresponding improvement in LTV or NRR signals a deteriorating unit economics story.

### 8. Activation Rate

**Definition**: The percentage of new signups who complete the core "aha moment" action — the specific in-product event that is your strongest predictor of long-term retention.

**Formula**: Users who complete aha-moment action / Total signups × 100

Activation is product-specific. For Slack, it was sending 2,000 messages as a team. For Dropbox, it was adding at least one file. For a project management tool, it might be inviting a second user and creating a first project. The aha moment is not what you think users should do — it's what the data says retained users actually did in their first session.

**Benchmark**: There is no universal number. Track cohort retention by activation status — if activated users retain at 2–3× the rate of non-activated users, you've identified the right aha moment.

**Red flag**: Activation rates below 20–25% in a product requiring minimal onboarding friction suggest a mismatch between what users expect and what the product delivers in the first session.

### 9. DAU/MAU Ratio — Engagement Stickiness

**Definition**: The ratio of daily active users to monthly active users, expressing how frequently users engage with your product within a month.

**Formula**: DAU / MAU

A DAU/MAU of 0.5 means the average user engages with the product 15 days out of 30. A ratio of 0.2 means 6 days out of 30. Facebook has historically been at ~0.65. Slack has reported DAU/MAU above 0.5 for its most active teams.

This metric is only meaningful for products where daily use is the intended behavior. A tax-filing tool is not failing if its DAU/MAU is 0.03. For a communication tool, CRM, or analytics dashboard used daily, DAU/MAU below 0.2 is a warning sign.

**Benchmark**: Consumer social: 0.5+ is excellent. B2B daily-use tools: 0.25–0.4 is healthy. Occasional-use SaaS: not relevant.

**Red flag**: DAU/MAU trending down over consecutive months without a product or seasonal explanation.

### 10. Gross Margin

**Definition**: Revenue minus Cost of Goods Sold (COGS), expressed as a percentage of revenue. COGS for SaaS includes hosting, infrastructure, customer support, and third-party API costs directly tied to delivering the product.

**Formula**: (Revenue - COGS) / Revenue × 100

**Benchmark**: Pure software SaaS: 70–85% gross margin is the expectation. AI-native products (using large language models at inference costs) are structurally lower — often 50–65% — because per-query compute costs are significant. Below 50% gross margin in software suggests COGS contain either excessive support overhead or expensive human-in-the-loop operations that need to be productized away.

**Red flag**: Gross margin declining as you scale. In SaaS, unit economics should improve at scale. If COGS are growing faster than revenue, the business model has an architectural problem.

## What to Track at Each Stage

Different metrics matter at different stages of growth. Trying to track all 10 equally at pre-revenue is a distraction.

**Pre-revenue to $100K ARR**: Focus on Activation Rate and qualitative engagement signals. MRR matters but is so small that the signal-to-noise ratio is low. The real question is: are users getting value?

**$100K to $1M ARR**: Add Gross Revenue Churn, NRR, and CAC by channel. You have enough data to see retention patterns. Now you need to understand whether the engine can run without heroic founder effort.

**$1M to $10M ARR**: All 10 metrics matter. Add formal Payback Period tracking as you begin scaling paid acquisition. Gross Margin becomes critical before a Series A. Investors will build their entire model on NRR, CAC, and Payback Period.

## The Metrics Stack

You do not need to build custom dashboards from scratch. The right toolset for most SaaS companies at growth stage:

- **Revenue data**: Stripe (source of truth) → **Baremetrics** or **ChartMogul** for MRR/ARR/Churn/NRR visualization
- **Product analytics**: **Mixpanel** or **Amplitude** for Activation Rate, DAU/MAU, feature-level retention
- **Customer pipeline**: Your CRM (HubSpot, Salesforce, or Attio for seed-stage) for CAC by channel
- **Finance**: **Causal** or a well-maintained spreadsheet for Gross Margin and unit economics modeling

The goal is not beautiful dashboards — it's a weekly ritual where you review the numbers that tell you whether the business is getting healthier or sicker.

## Key Takeaway

Vanity metrics feel good and measure nothing. The 10 metrics above — especially NRR, CAC by channel, Payback Period, and Activation Rate — are the instruments that tell you whether your SaaS business has the structural health to scale. A company with 120% NRR and a 10-month payback period has an engine. A company with 90% NRR and a 30-month payback period has a problem that no amount of new customer acquisition can fix permanently.
