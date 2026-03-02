---
title: "Gross Margin"
description: "Revenue minus Cost of Goods Sold, divided by revenue. The foundational profitability metric that drives SaaS valuation multiples and unit economics."
locale: "en"
category: "finance"
tags: ["finance", "metrics", "SaaS", "profitability", "unit economics"]
difficulty: "beginner"
publishedDate: 2024-01-01
primaryKeyword: "gross margin"
relatedTerms: ["unit-economics", "burn-rate", "arr", "ltv"]
seoKeywords: ["gross margin startup", "what is gross margin", "SaaS gross margin", "gross margin formula startup"]
---

## What Is Gross Margin?

Gross margin is the percentage of revenue that remains after subtracting the direct costs of delivering the product or service — the Cost of Goods Sold (COGS). It answers the question: "For every dollar of revenue we bring in, how many cents remain after we pay for the cost of delivering it?"

Gross margin is the foundation of every financial model for a startup. It determines how much of each dollar of revenue is available to fund sales, marketing, research and development, and general administration. A business with a 20% gross margin is structurally very different from one with an 80% gross margin, even if their revenue is identical — the high-margin business can invest far more aggressively in growth for the same burn rate.

## The Gross Margin Formula

```
Gross Profit = Revenue - COGS
Gross Margin (%) = (Revenue - COGS) / Revenue × 100
```

**Worked example:**
- Monthly revenue: $500,000
- Monthly COGS: $100,000
- Gross Profit: $400,000
- Gross Margin: ($400,000 / $500,000) × 100 = **80%**

## What Counts as COGS

The definition of COGS varies by business model, and getting it right matters for accurate benchmarking. The core principle: COGS includes only the direct costs of delivering the product to a paying customer. It does not include costs that would exist whether or not you served any customers.

### COGS in a SaaS Business

**Typically included in COGS:**
- Cloud infrastructure and hosting costs (AWS, GCP, Azure) directly attributable to running the product
- Third-party API costs billed per usage (payment processing, data providers, mapping services)
- Customer support costs directly tied to servicing customers (support team salaries, helpdesk software)
- Amortization of capitalized software development costs (for software used to deliver the product)
- Managed services or professional services costs when those services are bundled into the subscription

**Typically NOT included in COGS (belongs in OpEx):**
- Sales and marketing expenses
- Research and development (building new features)
- General and administrative costs (legal, finance, HR, office)
- Customer success costs focused on expansion (not delivery)

### COGS in Other Business Models

| Business Type | Typical COGS Components |
|---|---|
| Pure SaaS | Hosting, APIs, support labor, amortized dev costs |
| AI / LLM products | GPU compute costs (can be very significant), model API fees, inference infrastructure |
| Marketplace | Payment processing, fraud prevention, seller support, infrastructure |
| E-commerce | Product cost, shipping, fulfillment, packaging |
| Services / Consulting | Direct labor hours billed to clients, subcontractors |
| Hardware + Software | Physical component cost, manufacturing, firmware support |

## Gross Margin Benchmarks by Business Type

Industry benchmarks provide the reference point for evaluating whether a company's gross margin is strong, average, or below expectations:

| Business Model | Typical Gross Margin Range | Notes |
|---|---|---|
| Pure SaaS | 70–85% | Best-in-class approaching 85%+ |
| AI / LLM-native products | 50–65% | GPU and inference costs compress margins vs. traditional SaaS |
| Marketplace | 50–70% | Varies widely based on take rate and infrastructure intensity |
| Services-augmented SaaS | 40–60% | Implementation and CS labor drags on margin |
| Pure professional services | 25–45% | Labor-intensive; hard to scale without hiring |
| E-commerce | 30–50% | Physical goods erode margin significantly |
| Hardware | 20–45% | Manufacturing costs and supply chain make high margins rare |

These are ranges, not targets. A company with 60% gross margin in a market that typically sees 75% needs to understand and address the gap. A marketplace with 65% gross margin may be exceptional given the business model.

## Why Gross Margin Drives Valuation Multiples

Investors and acquirers apply higher revenue multiples to businesses with higher gross margins because gross margin determines the theoretical ceiling on profitability. Two SaaS companies at $10M ARR growing at the same rate will be valued very differently if one has 80% gross margins and the other has 45% gross margins.

The reason: a company with 80% gross margins retains $8 of every $10 in revenue to spend on growing the business. A company with 45% gross margins retains only $4.50. At scale, the high-margin company can generate significantly more operating leverage — meaning profits grow faster than revenue as it scales past the point where sales, marketing, and R&D costs are covered.

As a rough rule of thumb, software businesses below 60% gross margin face meaningful valuation discounts relative to SaaS peers because the business is structurally more like a services company than a pure software company.

## The Relationship Between Gross Margin and LTV

Customer Lifetime Value (LTV) is calculated on a gross margin basis, not a revenue basis:

```
LTV = ARPA × Gross Margin (%) × Average Customer Lifetime
```

This means that a business with lower gross margins has a proportionally lower LTV for the same contract value. A $1,000/month customer with 80% gross margin contributes $800/month in gross profit. The same $1,000/month customer with 40% gross margin contributes only $400/month. If both companies have the same CAC, the high-margin company has twice the LTV:CAC ratio — a dramatically better unit economics profile.

## How to Improve Gross Margin

Gross margin improvement is one of the highest-leverage activities for a scaling startup:

**Reduce infrastructure costs:** Renegotiate cloud contracts at scale, implement more efficient caching and database query optimization, move workloads to reserved instances or committed use discounts. Companies moving from on-demand to reserved AWS instances often see 30–40% infrastructure cost reduction.

**Reduce third-party API dependency:** APIs billed per call (LLM inference, data enrichment, payment processing) can become a significant COGS line as volume scales. Bringing capabilities in-house or negotiating volume pricing reduces variable COGS.

**Improve support efficiency:** As the product matures, self-service documentation, in-app guidance, and community support can reduce the cost per customer of support without degrading the experience.

**Pricing discipline:** Pricing below market rates reduces revenue without reducing COGS, compressing gross margins mechanically. Aligning pricing to the value delivered improves the revenue side of the equation.

## Gross Margin vs. Net Margin

Gross margin and net margin are often confused. They measure fundamentally different things:

| Metric | What It Measures | Formula |
|---|---|---|
| Gross Margin | Profitability after direct delivery costs only | (Revenue - COGS) / Revenue |
| Operating Margin | Profitability after all operating costs (COGS + S&M + R&D + G&A) | Operating Income / Revenue |
| Net Margin | Bottom-line profitability after all costs including taxes and interest | Net Income / Revenue |

Most early-stage SaaS companies have positive gross margins but deeply negative net margins and operating margins. This is expected — they are investing heavily in growth. Investors evaluate gross margin as the structural health check, and operating/net margin as the efficiency check.

## Key Takeaway

Gross margin — calculated as (Revenue - COGS) / Revenue — is the foundational metric that determines how much of each revenue dollar is available to invest in growth, R&D, and operations. For SaaS, best-in-class gross margins run 70–85%; AI-native products often see 50–65% due to compute costs; services businesses typically land at 30–50%. Gross margin directly sets the ceiling on LTV, determines valuation multiples, and reveals whether a business model is structurally scalable. Improving gross margin through infrastructure optimization, reduced API dependency, and pricing discipline is one of the highest-leverage moves a scaling startup can make before raising growth capital.
