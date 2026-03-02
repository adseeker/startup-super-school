---
title: "Unit Economics"
description: "The direct revenues and costs associated with a single unit of a business, used to determine per-unit profitability and scalability."
locale: "en"
category: "finance"
tags: ["finance", "metrics", "profitability", "SaaS", "fundraising"]
difficulty: "intermediate"
publishedDate: 2024-01-01
primaryKeyword: "unit economics"
relatedTerms: ["cac", "ltv", "churn-rate", "burn-rate"]
seoKeywords: ["unit economics startup", "what is unit economics", "LTV CAC ratio startup", "unit economics SaaS"]
---

## What Is Unit Economics?

**Unit economics** refers to the direct revenues and costs associated with a single, specific "unit" of your business model — examined in isolation to determine whether that unit is profitable, and whether profitability will improve or degrade as the business scales.

The critical question unit economics answers is: **does making one more sale make the business more valuable, or does it accelerate losses?**

What constitutes a "unit" depends on the business model:

| Business Model | Unit |
|---------------|------|
| SaaS subscription | One customer (or one seat) |
| E-commerce | One order or one transaction |
| Marketplace | One transaction (buyer + seller pair) |
| On-demand (Uber, DoorDash) | One ride or one delivery |
| Ad-supported | One user (or 1,000 users — CPM basis) |

## The Core Metrics

### Customer Acquisition Cost (CAC)

CAC is the total cost to acquire one paying customer:

```
CAC = Total Sales & Marketing Spend ÷ Number of New Customers Acquired
```

Include all relevant costs: ad spend, sales team salaries, marketing tools, agency fees, and an allocation of relevant overhead. A common mistake is using only ad spend — this understates true CAC significantly.

### Lifetime Value (LTV)

LTV is the total net revenue a business expects to earn from a single customer over the entire duration of the relationship:

```
LTV = Average Revenue Per Account (ARPA) × Gross Margin % × (1 ÷ Monthly Churn Rate)
```

For a SaaS business with $500/month ARPA, 75% gross margin, and 2% monthly churn:

```
LTV = $500 × 0.75 × (1 ÷ 0.02) = $500 × 0.75 × 50 = $18,750
```

### LTV:CAC Ratio

The LTV:CAC ratio is the single most-cited unit economics benchmark. It answers: for every dollar we spend acquiring a customer, how many dollars do we eventually recover?

| LTV:CAC Ratio | Assessment |
|--------------|------------|
| > 5:1 | Excellent — potentially under-investing in growth |
| 3:1 – 5:1 | Healthy — the benchmark most investors target |
| 1:1 – 3:1 | Marginal — acquisition is expensive relative to value |
| < 1:1 | Burning money — each customer destroys value |

The 3:1 benchmark was popularized by David Skok and has become a widely used rule of thumb in SaaS investing.

### Payback Period

Payback period measures how many months it takes to recover the CAC from a single customer's gross profit contribution:

```
Payback Period (months) = CAC ÷ (ARPA × Gross Margin %)
```

Using the example above with CAC of $3,000:

```
Payback Period = $3,000 ÷ ($500 × 0.75) = $3,000 ÷ $375 = 8 months
```

Benchmarks for B2B SaaS:

| Payback Period | Assessment |
|----------------|------------|
| < 12 months | Excellent — fast capital recycling |
| 12–18 months | Healthy — the common investor threshold |
| 18–24 months | Acceptable in enterprise, concerning in SMB |
| > 24 months | Problematic — high capital requirements, fundraising dependency |

## A Worked Example: B2B SaaS

Assume a B2B SaaS company selling project management software to teams:

- **ARPA**: $400/month
- **Gross Margin**: 80%
- **Monthly Churn**: 1.5%
- **Monthly Sales & Marketing Spend**: $120,000
- **New Customers Acquired (monthly)**: 40

**CAC** = $120,000 ÷ 40 = **$3,000**

**LTV** = $400 × 0.80 × (1 ÷ 0.015) = $400 × 0.80 × 66.7 = **$21,333**

**LTV:CAC** = $21,333 ÷ $3,000 = **7.1:1** (excellent)

**Payback Period** = $3,000 ÷ ($400 × 0.80) = $3,000 ÷ $320 = **9.4 months** (excellent)

This company has strong unit economics. The risk areas to watch: if churn rises from 1.5% to 3%, LTV drops to $10,667 and the LTV:CAC ratio falls to 3.6:1 — still acceptable, but the margin of safety has shrunk considerably.

## How to Improve Unit Economics

### Reduce CAC
- Invest in organic channels (SEO, content, community) which have near-zero marginal cost per lead
- Improve conversion rates at each funnel stage — halving churn-to-trial reduces CAC without spending less
- Build referral and partner programs — referred customers typically have 20–30% lower CAC
- Focus sales effort on segments with shorter sales cycles

### Improve LTV
- Reduce churn through better onboarding, customer success, and product stickiness
- Expand revenue through upsells, seat expansion, and add-on modules
- Increase ARPA through annual contracts (which also reduce churn) or pricing tier restructuring
- Improve gross margin by optimizing hosting costs, reducing support load per customer

## How Investors Use Unit Economics

Unit economics are scrutinized at every stage of due diligence. What investors are assessing:

- **Is the business fundamentally profitable at the unit level?** A company can have negative net income and still have excellent unit economics — the loss is from growth investment, not from a broken business model.
- **Does LTV:CAC improve with scale?** Improving ratios signal that the team is learning and the market is becoming more efficient to reach.
- **Is payback period compatible with available capital?** A 36-month payback period with 12 months of runway is a structural problem, not a metrics problem.

## Key Takeaway

Unit economics reveal whether your business model makes economic sense before you scale it. Strong LTV:CAC ratios and short payback periods mean that deploying more capital into growth will create more value than it consumes — which is the fundamental prerequisite for venture-scale growth. Before obsessing over top-line metrics, founders should be able to answer one question clearly: does making one more sale make us stronger or weaker?
