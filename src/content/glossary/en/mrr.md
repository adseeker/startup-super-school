---
title: "MRR - Monthly Recurring Revenue"
description: "MRR is the total recurring subscription revenue a SaaS company earns each month. It is the operational heartbeat metric for tracking short-term growth."
locale: "en"
category: "metrics"
tags: ["metrics", "revenue", "SaaS", "finance"]
difficulty: "beginner"
publishedDate: 2024-09-25
primaryKeyword: "monthly recurring revenue"
relatedTerms: ["arr", "churn-rate", "ltv", "burn-rate"]
seoKeywords: ["monthly recurring revenue", "MRR startup", "what is MRR", "how to calculate MRR"]
---

## What Is MRR (Monthly Recurring Revenue)?

Monthly Recurring Revenue (MRR) is the total amount of recurring subscription revenue that a SaaS (Software as a Service) company generates in a single month. It represents only the predictable, recurring portion of revenue - not one-time fees, setup charges, or professional services. MRR is the operational pulse of a subscription business: it tells you, right now, how much reliable revenue the company is generating on a monthly basis.

MRR is the metric that founders, finance teams, and growth teams check most frequently in the early stages of a company's life. Because it updates monthly, it provides near-real-time feedback on whether the business is growing, shrinking, or holding steady. It is the foundation from which almost all other SaaS financial metrics are derived.

## The MRR Formula

At its simplest:
```
MRR = Sum of all active subscriptions normalized to a monthly value
```

For **monthly subscribers**, the calculation is straightforward - add up each customer's monthly payment.

For **annual subscribers**, divide the annual contract value by 12 and count that amount toward each month of the contract. This is the most important rule in MRR calculation.

**Example:**
- Customer A pays $200/month - contributes $200 to MRR
- Customer B pays $1,200/year - contributes $100 to MRR (not $1,200 in month 1)

The normalization rule is critical. Counting an annual contract's full value in the month it closes dramatically overstates MRR in strong sales months and understates it in quieter ones - destroying the metric's value as a reliable trend indicator.

## The Five Components of MRR

MRR is not a single-dimensional number. It is the net result of five distinct flows, each of which carries strategic meaning:

**1. New MRR**
Revenue from customers who are signing up for the first time this month. This is the primary output of marketing and sales. New MRR growth is the most fundamental signal that the top of the funnel is working.

**2. Expansion MRR (also called Upsell MRR)**
Additional revenue from existing customers who upgraded their plan, added more seats, or increased their usage tier this month. Expansion MRR is a powerful signal of product value - customers are paying more because they are getting more value. Top-quartile SaaS companies generate 25–40% of their MRR growth from expansion.

**3. Contraction MRR (also called Downgrade MRR)**
Revenue lost from existing customers who downgraded to a lower plan or reduced their usage. The customer has not left, but they are paying less. Contraction MRR is a leading warning signal: customers who downgrade often churn in subsequent months.

**4. Churned MRR**
Revenue lost from customers who cancel their subscription entirely this month. Churned MRR is the most damaging negative force in a subscription business. At a 3% monthly churn rate (which sounds small), a company loses roughly 30% of its revenue base every year to churn alone - meaning it must grow by 30% just to stay flat.

**5. Reactivation MRR**
Revenue from previously churned customers who have returned and resubscribed. Reactivation MRR is often overlooked but can be a meaningful contributor in more mature companies with large former-customer bases.

## Net New MRR Formula

The most important derived metric from these five components is **Net New MRR** - the net change in MRR from one month to the next:

```
Net New MRR = New MRR + Expansion MRR + Reactivation MRR - Contraction MRR - Churned MRR
```

If Net New MRR is positive, the business is growing. If it is zero, the business is flat (existing customers are replacing lost revenue exactly). If it is negative, the business is in contraction.

A healthy SaaS growth engine ideally has: New MRR as the primary driver, Expansion MRR as a meaningful secondary contributor, and Churned + Contraction MRR well controlled. A business where expansion alone covers all churn - meaning Expansion MRR > Churned MRR + Contraction MRR - has achieved **negative net churn**, one of the most valuable properties a SaaS company can have.

## Common MRR Calculation Mistakes

**Mistake 1: Counting annual contracts in full at signing.** If a customer signs a $12,000 annual contract in January, it contributes $1,000/month to MRR for the next 12 months - not $12,000 to January's MRR. Failing to normalize inflates MRR in close-heavy months and creates volatile, misleading reporting.

**Mistake 2: Including non-recurring revenue.** One-time setup fees, implementation services, consulting engagements, and training revenue should never enter MRR. They are not recurring and their inclusion misrepresents the durability of the revenue base.

**Mistake 3: Ignoring contraction.** Many early-stage founders track new signups and cancellations but miss the middle layer of customers who quietly downgrade. Contraction MRR that goes untracked means the MRR dashboard overstates actual business health.

**Mistake 4: Not segmenting MRR by cohort.** Tracking total MRR without understanding which customer cohorts are expanding vs. contracting hides important retention and product-fit signals. Monthly cohort MRR analysis is the foundation of good SaaS operations.

## MRR as Operational Heartbeat vs. ARR as Strategic Metric

MRR and ARR convey the same underlying information (ARR = MRR × 12) but are used in different contexts and for different audiences:

| Context | Preferred Metric | Why |
|---|---|---|
| Weekly growth team standup | MRR | Fast feedback, operational granularity |
| Board meeting | ARR | Standard investor communication |
| Fundraising deck | ARR | Benchmarking against industry norms |
| Sales team quota | ARR (or ACV) | Annual deal values map to ARR impact |
| Monthly finance review | Both | Operational tracking + strategic framing |
| Cash flow planning | MRR | Monthly cash inflows drive burn math |

The simplest rule: use MRR when you want to track what is happening right now; use ARR when you want to communicate scale and trajectory to investors or partners.

## MRR Growth Benchmarks

How fast should MRR grow? It depends heavily on stage, but some reference points from the SaaS industry:

- **Top-quartile early-stage SaaS (pre-$1M ARR)**: 15–25% month-over-month MRR growth
- **Seed to Series A stage ($1M–$3M ARR)**: 10–20% MoM, with a goal of ~3x year-over-year
- **Series A to Series B ($3M–$10M ARR)**: 8–15% MoM, with year-over-year growth of 150–200%+
- **At scale ($10M+ ARR)**: 5–10% MoM is considered strong; the law of large numbers makes high MoM rates increasingly difficult to sustain

Investors at seed and Series A stages typically expect to see at least 3x year-over-year ARR growth, which corresponds to roughly 10% month-over-month MRR growth sustained consistently.

## Example: MRR Breakdown with 5 Customers

To make the components concrete, consider a company at the start and end of a single month:

**Beginning of Month MRR: $8,500**

| Customer | Beginning MRR | Event | Ending MRR |
|---|---|---|---|
| Acme Corp | $2,000 | No change | $2,000 |
| Beta LLC | $1,500 | Upgraded to $2,500 | $2,500 |
| Gamma Inc | $3,000 | Cancelled | $0 |
| Delta Co | $2,000 | Downgraded to $1,500 | $1,500 |
| New Customer (Epsilon) | $0 | New signup at $1,800 | $1,800 |

**End of Month MRR: $7,800**

MRR Component Breakdown:
- New MRR: +$1,800 (Epsilon)
- Expansion MRR: +$1,000 (Beta upgrade)
- Churned MRR: -$3,000 (Gamma cancellation)
- Contraction MRR: -$500 (Delta downgrade)
- **Net New MRR: -$700**

Despite adding a new customer and a meaningful upsell, this company shrank in MRR because of one large churn event. This illustrates why tracking churned MRR separately from new MRR is essential - headline "growth" can mask serious retention problems.

## Key Takeaway

Monthly Recurring Revenue is the operational heartbeat of a SaaS business - the normalized, monthly sum of all active recurring subscriptions. MRR must be calculated correctly (annual contracts divided by 12, no one-time fees) and tracked in its five components (new, expansion, reactivation, contraction, churned) to be meaningful. Net New MRR is the most actionable summary of all five components, and achieving negative net churn - where expansion covers all churn - is one of the most powerful financial properties a SaaS startup can develop. Top-quartile early-stage companies grow MRR at 15–25% month-over-month; sustained 10%+ MoM growth is the threshold most Series A investors look for.
