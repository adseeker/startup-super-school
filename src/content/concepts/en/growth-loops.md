---
title: "Growth Loops"
description: "Growth loops are self-reinforcing systems where each cycle's output becomes the next cycle's input, generating compounding rather than linear growth."
locale: "en"
category: "growth"
tags: ["growth", "product", "acquisition", "retention", "strategy"]
difficulty: "intermediate"
publishedDate: 2024-01-01
primaryKeyword: "growth loops"
origin: "Reforge, Brian Balfour, 2018"
relatedConcepts: ["network-effects", "flywheel-effect", "jobs-to-be-done"]
seoKeywords: ["growth loops startup", "what are growth loops", "growth loops vs funnels", "product growth loop examples"]
---

## Origins

The growth loops framework was formalized by **Brian Balfour** and the team at **Reforge** around 2018, drawing from Balfour's earlier writing on growth systems at HubSpot. The core argument was a direct challenge to the dominant "funnel" mental model of growth: funnels are a useful accounting tool, but they fundamentally misrepresent how the best growth engines actually work.

Rather than a linear conversion sequence from awareness to revenue, the most durable growth systems are **circular**: the output of one cycle of activity feeds back in as the input to the next cycle, with the potential to compound over time.

## The Core Idea: Loops, Not Funnels

A **growth loop** is a closed system in which users or customers, through their normal behavior, generate the inputs that acquire or retain more users or customers.

The distinction from a funnel is fundamental:

| Funnel | Growth Loop |
|--------|-------------|
| Linear (awareness → consideration → purchase) | Circular (output becomes next input) |
| Diminishing: same input required for each new user | Compounding: each cycle can be larger than the last |
| Owned by marketing | Cross-functional: product, marketing, data |
| Measures conversion at each stage | Measures loop efficiency and cycle time |
| Does not distinguish between growth sources | Forces you to identify the mechanism |

A funnel can still be useful for measuring the efficiency of a specific channel. But it cannot represent compounding growth, because it has no feedback mechanism. If you stop pouring users in at the top, the funnel produces nothing. A loop, by contrast, generates outputs from within the system.

## The Three Types of Growth Loops

### 1. Viral / Sharing Loops

Users take an action within the product that directly exposes it to new potential users. The new users who convert become the next cohort to take that same action.

**Structure**: User → Uses product → Shares or invites → New user sees product → Converts → Repeat

**Examples**:
- **Dropbox**: User uploads a file → Shares the link with a non-user → Non-user needs an account to access or edit → Signs up → Shares their own files → Loop repeats
- **Calendly**: User books a meeting → Recipient receives a Calendly link with branding → Recipient discovers product → Signs up → Loop repeats
- **Slack**: Team adopts Slack → Communicates with external partners via Slack Connect → Partners create accounts → Loop repeats

The key metric for viral loops is the **K-factor**: `K = invitations sent per user × conversion rate of those invitations`. If K > 1, the loop is growing. If K = 0.5, each cohort is half the size of the previous one.

### 2. Retention / Engagement Loops

Users return repeatedly, and each return visit either deepens their engagement or generates content and behavior that attracts others.

**Structure**: User → Engages with product → Receives value → Returns → Engages more deeply → Loop repeats

**Examples**:
- **Duolingo**: User completes a lesson → Earns a streak → Streak creates loss aversion → User returns tomorrow → Completes more lessons → Loop repeats
- **Twitter/X**: User reads content → Follows interesting accounts → Feed becomes more relevant → User returns → Loop repeats
- **LinkedIn**: User views job postings → Updates profile → More recruiters find them → User gets value from the network → Returns more frequently → Loop repeats

Retention loops are measured by **cycle return rate** and **session depth per return visit**.

### 3. User-Generated Content (UGC) / SEO Loops

Users create content within the product. That content is indexed and discovered by external users (typically via search), who convert and then create more content.

**Structure**: User creates content → Content is indexed → New user discovers via search → Converts → Creates more content → Loop repeats

**Examples**:
- **Pinterest**: User creates a pin board → Pinterest indexes the board → Search user finds the pin → Clicks through → Creates a Pinterest account → Creates their own pins → Loop repeats
- **Yelp**: User writes a restaurant review → Review ranks on Google → Searcher reads review → Creates a Yelp account → Writes their own review → Loop repeats
- **Stack Overflow**: Developer asks a question → Gets answered → Page ranks on Google → New developer finds the answer → Joins the community → Answers questions → Loop repeats

UGC loops are measured by **content creation rate per user** and **search-to-signup conversion rate**.

## How to Map a Growth Loop

Every growth loop can be mapped with four components:

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   INPUT ──→ USER ACTION ──→ OUTPUT ──→ REINVEST    │
│      ↑                                    │         │
│      └────────────────────────────────────┘         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- **Input**: The starting resource (new user, existing user, piece of content)
- **User action**: The specific behavior that drives the loop (sharing a file, writing a review, inviting a teammate)
- **Output**: What that action produces (new leads, SEO content, referrals, data)
- **Reinvestment**: How the output feeds back into the system as a new input

When mapping your loop, be specific. "Users share the product" is not a loop map. "User completes onboarding → sees value in sharing a report → sends report link to manager → manager clicks link → manager sees product → manager requests team access → new users onboard → loop repeats" is a loop map.

## Building Your First Growth Loop

1. **Identify your most common user behavior** that could generate an output with acquisition or retention value. Look for actions users already take, not ones you wish they would take.
2. **Trace where that output goes**. Does it reach non-users? Does it create indexable content? Does it bring the user back?
3. **Find the friction points**. Where in the loop do users drop off? Where does the output fail to convert into new inputs?
4. **Instrument each step**. Assign a metric to each node in the loop. You cannot optimize what you cannot measure.
5. **Reduce cycle time**. The faster a loop completes one cycle, the more times it can compound in a given period.

## Measuring Loop Efficiency

| Loop Type | Primary Metric | Target |
|-----------|----------------|--------|
| Viral | K-factor | > 0.5 for meaningful contribution; > 1 for virality |
| Retention | D30 retention, cycle return rate | Varies by category |
| UGC/SEO | Search-driven signups / total signups | > 20% for SEO to matter |

**Cycle time** matters as much as efficiency. A viral loop with K = 0.8 that completes in 3 days will grow faster over a month than a loop with K = 0.9 that takes 2 weeks per cycle.

## Why Paid Acquisition Does Not Compound

Paid channels (Google Ads, Meta, LinkedIn) are powerful for generating users, but they are fundamentally anti-compounding: the day you stop paying, the input stops. Every new user requires the same per-unit spend.

Growth loops do not replace paid acquisition. They determine whether paid acquisition is worth doing. If you have a working viral loop, every dollar spent on paid acquisition generates more than one acquired user. If you have no loop, paid acquisition is simply renting attention.

The question to ask before scaling paid is: **do acquired users generate more acquired users?** If yes, paid is an accelerant. If no, paid is a treadmill.

## Multiple Loops and Prioritization

Most successful products at scale run more than one loop simultaneously. Airbnb runs a word-of-mouth loop (guests tell friends), an SEO loop (host listings rank on Google), and a re-engagement loop (past guests return for future trips).

When prioritizing which loop to build first, use these criteria:
- **Which loop is already nascent?** Build on behavior users are already taking.
- **Which loop has the shortest cycle time?** Faster loops compound faster.
- **Which loop is hardest for competitors to replicate?** Proprietary data loops and community loops are more defensible than pure viral.

## Limitations

- **Loops take time to compound**: A loop with K = 0.7 still grows, but slowly. Founders often abandon working loops too early because the compounding is not yet visible.
- **Mapping is easier than building**: Identifying a loop on a whiteboard is straightforward. Getting users to actually complete each step requires significant product investment.
- **Loops can collapse**: A viral loop where the content becomes spammy, or a UGC loop where content quality degrades, can reverse and actively damage growth.
- **Not every business has a natural loop**: Some products — particularly niche B2B tools — have no inherent loop mechanism. Forcing loop thinking onto a business without genuine circular dynamics leads to artificial features users do not want.
- **Measurement complexity**: Attributing growth to a specific loop, rather than multiple overlapping channels, requires careful instrumentation that many early-stage teams lack.

## Key Takeaway

Growth loops replace the funnel model with a compounding one: rather than asking "how do we move users from awareness to purchase?" they ask "how does each new user help us acquire the next user?" The practical result is that the same product investment generates increasing returns over time rather than linear ones. For founders, the most valuable early work is not optimizing a paid acquisition channel but identifying which natural user behaviors — sharing, creating content, inviting colleagues — can be turned into a loop, and then removing every point of friction that prevents the loop from closing.
