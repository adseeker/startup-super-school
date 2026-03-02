---
title: "NRR — Net Revenue Retention"
description: "NRR measures how much recurring revenue is retained and grown from existing customers. Above 100% means the company grows revenue without any new customers."
locale: "en"
category: "metrics"
tags: ["metrics", "revenue", "SaaS", "retention", "growth"]
difficulty: "intermediate"
publishedDate: 2024-01-01
primaryKeyword: "net revenue retention"
relatedTerms: ["mrr", "arr", "churn-rate", "ltv"]
seoKeywords: ["net revenue retention", "NRR startup", "what is NRR", "net dollar retention SaaS"]
---

## What Is NRR (Net Revenue Retention)?

Net Revenue Retention (NRR) — also called Net Dollar Retention (NDR) — is a metric that measures how much recurring revenue a SaaS company retains and grows from its existing customer base over a given period, typically 12 months. It captures the combined effect of customer churn, plan downgrades, and plan upgrades or expansions on revenue from a fixed cohort of customers.

NRR answers a deceptively powerful question: **If this company never signed another new customer, would its revenue grow, shrink, or stay flat?**

An NRR above 100% means that expansion from existing customers (through upgrades, seat additions, usage growth) more than compensates for revenue lost to churn and downgrades. The company grows revenue from its installed base alone. This is sometimes called **negative net churn** — and it is one of the most coveted properties in all of SaaS finance.

## The NRR Formula

```
NRR = (Starting MRR + Expansion MRR - Contraction MRR - Churned MRR) / Starting MRR × 100
```

The calculation uses a **fixed cohort**: you take the customers who were active at the start of the period, then measure how their collective revenue has changed by the end of the period. New customers signed during the period are excluded — they would artificially inflate the metric.

**Example:**
- Starting MRR from existing customers: $100,000
- Expansion MRR (upgrades, upsells): +$18,000
- Contraction MRR (downgrades): -$4,000
- Churned MRR (cancellations): -$8,000
- **Ending MRR from same cohort: $106,000**

```
NRR = $106,000 / $100,000 × 100 = 106%
```

This company retains and grows 106% of its existing revenue annually — even accounting for churn and downgrades, the expansion more than covers the losses.

## What NRR Above 100% Means in Practice

A company with 110% NRR that currently generates $5M ARR will grow to $5.5M ARR in 12 months from its existing customer base alone — before adding a single new customer. Every new customer signed becomes pure incremental growth on top of an already-expanding base.

This dynamic fundamentally changes the economics of growth:

- At **NRR = 80%**: The company loses 20% of its revenue base annually to churn and downgrades. Every $1M in new ARR signed partially backfills this loss rather than growing the total.
- At **NRR = 100%**: Churn and expansion exactly cancel out. New ARR translates directly to ARR growth.
- At **NRR = 120%**: The existing customer base expands the revenue base by 20% annually. New ARR growth compounds on top of this organic expansion — the company has a structural growth advantage.

The compounding effect of high NRR over several years is extraordinary. A company with 120% NRR and $10M ARR will grow to $24.9M ARR from its existing base over five years, even with zero new customers — a 2.5x increase from retention and expansion alone.

## NRR Benchmarks

| NRR Range | Assessment |
|---|---|
| > 130% | World-class; rare; typically usage-based or deeply embedded platforms |
| 120–130% | Excellent; top-tier enterprise or infrastructure SaaS |
| 110–120% | Very strong; well above average; typical of leading growth-stage SaaS |
| 100–110% | Good; healthy business; customers expand slightly more than they churn |
| 90–100% | Acceptable at early stage; needs improvement; churn outpaces expansion |
| < 90% | Concerning; severe churn problem or product-market fit issues |

These benchmarks reflect the broader SaaS market as of 2023. The threshold for "world-class" has risen as the asset class has matured and investors have become more sophisticated in their comparisons.

## Real-World NRR Examples

**Snowflake** reported an NRR of **158%** in its fiscal year 2021 S-1 filing — one of the highest ever disclosed by a public SaaS company at the time. This was driven by Snowflake's consumption-based pricing model: as customers stored and queried more data, their spending grew automatically. Every new workload, every additional user, every additional data source directly translated into higher revenue from the same customer.

**Twilio** maintained NRR above 120% for multiple years during its growth phase, reflecting its usage-based model where developers who embed Twilio's APIs into growing applications generate more API calls — and more revenue — over time.

**Zoom** peaked at NRR above 130% during the pandemic growth period when existing enterprise customers rapidly expanded licenses across entire organizations.

By contrast, companies with predominantly monthly subscriptions at fixed price points and limited upsell paths (simple productivity tools, for example) more typically report NRR in the 95–105% range — not because they are bad businesses, but because their pricing structure limits expansion from existing customers.

## Why NRR Is the Most Important Metric at Growth Stage

At seed and Series A, investors focus primarily on growth rate, product-market fit signals, and early retention. But at Series B and beyond, **NRR becomes arguably the single most important metric** that investors evaluate. Here is why:

**NRR proves product-market depth, not just fit.** It is relatively easy to get customers to try a product. Getting them to expand their usage and spending over time proves the product is embedded in their workflows, delivering ongoing value proportional to their investment.

**NRR determines capital efficiency.** A company with 120% NRR needs far less new-customer acquisition spend to hit its growth targets than a company with 85% NRR. The math: a company at 85% NRR must spend aggressively on new customer acquisition just to backfill the revenue base being eroded by churn.

**NRR is highly predictive of long-term outcomes.** Historical analysis of SaaS companies shows that NRR is more predictive of 5-year revenue trajectories than any single sales growth metric. A slower-growing company with exceptional NRR frequently outperforms a faster-growing company with poor retention over a 5–7 year time horizon.

## NRR and Valuation Multiples

NRR has a direct and significant impact on the revenue multiples that investors and acquirers assign to SaaS companies. Higher NRR companies command higher multiples because:

1. Their future revenue is more predictable (existing customers are growing, not shrinking)
2. Their growth is more capital-efficient (less new-customer acquisition spend required)
3. Their customer relationships signal a durable competitive position (customers don't expand with vendors they plan to replace)

In public SaaS markets, companies with NRR > 120% have historically traded at **2–3x higher revenue multiples** than otherwise comparable companies with NRR < 100%. In private markets, NRR is one of the first metrics top-tier growth VCs calculate when evaluating a Series B investment.

## How to Improve NRR

Improving NRR requires addressing both the churn/contraction side and the expansion side simultaneously:

**Reduce churn and contraction:**
- Invest in customer success and proactive account management
- Build early warning systems that flag at-risk accounts (low login frequency, declining usage, support ticket patterns)
- Identify and address product gaps that cause customers to downgrade
- Price entry-level tiers correctly so customers do not over-purchase and then contract

**Drive expansion:**
- Design pricing that scales naturally with customer success — usage-based, seat-based, or outcome-based models all expand automatically as customers get more value
- Build a structured upsell motion: identify customers at the ceiling of their current tier and offer timely, relevant upgrades
- Create product-led expansion paths — in-product prompts, usage notifications, and feature gates that trigger upgrade conversations at the right moment
- Expand the number of use cases and integrations that increase a product's footprint within a customer account

## NRR vs. Gross Revenue Retention

NRR is frequently confused with **Gross Revenue Retention (GRR)** — they are distinct metrics that answer different questions:

| Metric | Formula | What It Measures | Maximum Value |
|---|---|---|---|
| NRR | (Starting + Expansion - Contraction - Churn) / Starting × 100 | Retention AND expansion | No ceiling (can exceed 100%) |
| GRR | (Starting - Contraction - Churn) / Starting × 100 | Pure retention only (no expansion) | Capped at 100% |

GRR tells you how good the company is at keeping revenue from existing customers. NRR tells you how good the company is at both keeping and growing that revenue. A company with excellent GRR but poor NRR is retaining customers but failing to expand them — often a sign of pricing or product scope limitations.

World-class GRR for enterprise SaaS is typically 90–95%. World-class NRR, as noted above, is 120%+.

## Key Takeaway

Net Revenue Retention is the metric that reveals whether a SaaS business has true product-market depth — not just initial fit. Calculated as the change in revenue from a fixed cohort of existing customers over 12 months, NRR above 100% means the company grows revenue without adding a single new customer. World-class NRR is above 120% (Snowflake reached 158%); anything below 90% signals a serious retention problem. At growth stage, NRR is the metric most closely scrutinized by investors, because it determines valuation multiples, long-term capital efficiency, and the ultimate durability of the business. A company with exceptional NRR has an embedded, expanding customer base that funds its own growth — the most sustainable competitive position in SaaS.
