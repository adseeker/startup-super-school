---
title: "How to Write a PRD"
description: "Learn how to write a Product Requirements Document that drives alignment without becoming a bureaucratic burden—with a lean template and real examples."
locale: "en"
category: "product"
tags: ["product", "prd", "product management", "documentation", "roadmap"]
difficulty: intermediate
publishedDate: 2026-03-16
readingTime: 9
primaryKeyword: "how to write a PRD startup"
seoKeywords: ["how to write a PRD", "product requirements document", "PRD template startup", "product spec document"]
faqs:
  - question: "What is a PRD and what is it used for?"
    answer: "A PRD (Product Requirements Document) is a written document that defines what a product feature or initiative should do, why it matters, how success will be measured, and what is explicitly out of scope. It is used to align engineering, design, and stakeholders before development begins—reducing rework caused by different people having different assumptions about what is being built."
  - question: "How long should a PRD be?"
    answer: "For most startup features, a 1-page PRD is the right target. Reserve longer documents (3–5 pages) for major platform changes, new product lines, or anything requiring significant cross-team coordination. If your PRD is getting long, it usually means the scope is too large or the problem is not well enough defined to start building."
  - question: "What is the difference between a PRD and a user story?"
    answer: "User stories are individual units of work scoped for a single sprint: 'As a [user], I want [action] so that [benefit].' A PRD is a higher-level document that defines an entire feature or initiative, explains the problem being solved, sets success metrics, and contains multiple user stories. PRDs drive prioritization decisions; user stories drive sprint execution."
  - question: "When should you NOT write a PRD?"
    answer: "Skip the PRD for small, low-risk changes—bug fixes, minor UI tweaks, copy changes, A/B tests with limited scope. A PRD is most valuable when the work involves multiple stakeholders, spans more than one sprint, or requires trade-off decisions that need to be visible to the broader team. Forcing a PRD process on every task creates overhead that slows small teams down."
  - question: "Who should write the PRD?"
    answer: "The product manager (or founder acting as PM) owns the PRD, but it should be a collaborative document. Engineering input on feasibility, design input on user experience, and data or analytics input on success metrics should all happen before the PRD is considered final. A PRD written in isolation by the PM without input from the build team is a common source of rework and resentment."
steps:
  - name: "Define the problem statement"
    text: "Write one paragraph that describes the user problem, who has it, how frequently they encounter it, and what the current workaround looks like. Include any quantitative evidence—support ticket volume, NPS verbatims, user interview quotes, drop-off rates. If you cannot write this paragraph clearly, you are not ready to write a PRD."
  - name: "Write user stories and acceptance criteria"
    text: "List the primary user actions the feature must support using 'As a [user type], I want [action] so that [benefit]' format. For each story, write 2–4 acceptance criteria that define done. Acceptance criteria prevent the 'it works on my machine' problem and give QA a clear checklist."
  - name: "Define success metrics"
    text: "Name 1–3 measurable outcomes that would tell you the feature succeeded. Separate leading indicators (e.g., feature adoption rate at 30 days) from lagging indicators (e.g., impact on retention at 90 days). Define your baseline and your target. If you cannot define success metrics, you cannot evaluate whether shipping was the right call."
  - name: "Document what is out of scope"
    text: "List explicitly what you are NOT building in this version. An out-of-scope section is one of the most valuable parts of a PRD—it preempts scope creep, gives you language to decline feature requests gracefully, and speeds up reviews by addressing anticipated questions before they are asked."
  - name: "Surface open questions"
    text: "Add a section listing unresolved questions that need an answer before or during development. Assign an owner and a due date to each. Open questions left unresolved delay launches; making them visible accelerates resolution."
  - name: "Review with engineering and design before freezing"
    text: "Share the draft PRD with engineering and design leads before marking it final. Ask explicitly: 'Is anything here technically infeasible at this scope?', 'Are there UX implications we haven't considered?', 'Does the success metric require instrumentation that doesn't exist yet?' Incorporate their feedback, then lock the document."
---

## What a PRD Is (and Is Not)

A Product Requirements Document defines **what** should be built and **why**, not **how** to build it. The how belongs to engineering. A PRD that dictates implementation details is a design document or a technical spec—not a PRD—and it undermines the engineering team's autonomy.

A good PRD does four things:
1. Makes the user problem undeniable
2. Defines success in measurable terms
3. Draws a clear line around what is in and out of scope
4. Surfaces the questions that need answers before or during development

A PRD is not a backlog. It is not a Jira epic. It is not a design brief. It is the document that makes all of those downstream artifacts possible by first establishing shared context.

---

## When to Write a PRD

Not every feature needs a PRD. Use this filter:

| Scenario | PRD needed? |
|---|---|
| Bug fix or minor UI change | No |
| A/B test with limited scope | No |
| Single sprint feature, one team | Optional (1-pager) |
| Feature spanning 2+ sprints | Yes |
| New product surface or platform change | Yes |
| Work requiring cross-team coordination | Yes |
| Decision requiring leadership sign-off | Yes |

If in doubt: a 1-page PRD takes 1–2 hours to write and can save a 2-week sprint. The asymmetry favors writing it.

---

## Step 1: Define the Problem Statement

The problem statement is the most important part of the PRD. Everything else flows from it.

**A strong problem statement includes**:
- **Who** has the problem (be specific: "enterprise admins managing >50 seats," not "users")
- **What** the problem is, described in the user's language
- **How often** they encounter it (frequency matters for prioritization)
- **What they currently do** instead (workarounds reveal how painful the problem is)
- **Evidence** that this is real and widespread (tickets, interviews, analytics)

**Weak**: "Users can't find their settings."

**Strong**: "Enterprise admins managing >50 seats spend an average of 12 minutes per week navigating to user management settings—confirmed by session recordings and 34 Intercom tickets in Q3. The current workaround is bookmarking a direct URL shared informally in Slack, which breaks on re-login. This is the third most common complaint from the >$10k ARR segment."

---

## Step 2: Write User Stories and Acceptance Criteria

User stories translate the problem into specific units of user value.

**Format**: As a [user type], I want [action] so that [benefit].

**Example**:
- As an enterprise admin, I want to access user management from the top navigation so that I can add or remove users without knowing the direct URL.

For each user story, write 2–4 acceptance criteria:

- Admin can access User Management from any page via the top nav
- Click-through to User Management takes ≤2 seconds on a standard connection
- Access is restricted to accounts with Admin role; standard users see no link
- State persists after logout/login

Acceptance criteria are the handoff between PM and QA. Without them, "done" is subjective.

---

## Step 3: Define Success Metrics

You need to know whether shipping the feature was the right call. Define this before you build, not after.

### The metric framework

| Metric type | Example | Timeframe |
|---|---|---|
| Adoption | % of target users who used feature at least once | 30 days post-launch |
| Engagement | Average sessions per week in new surface | 30–60 days |
| Problem resolution | % drop in related support tickets | 60 days |
| Business impact | Retention rate of enterprise segment | 90 days |

**Pick 1–3 metrics**. More than three and accountability becomes diffuse.

**Define baseline and target**:
- Baseline: enterprise admin support tickets re: navigation = 34/month (Q3 average)
- Target: reduce to <10/month within 60 days of launch

If you cannot define a measurable target before shipping, you are building on faith. That is occasionally acceptable; it should be an explicit decision, not a default.

---

## Step 4: Document What Is Out of Scope

This section pays for the time you spent writing the PRD.

List the things you considered and explicitly decided not to include in this version. This section:
- Preempts the "why didn't you also add X?" question in review
- Gives you defensible language when stakeholders request additions mid-sprint
- Creates a backlog of future opportunities in a visible place

**Out of scope (example)**:
- Bulk user import via CSV (deprioritized; affects <5% of accounts; will revisit in Q2)
- Role-based access within admin (requires auth refactor; separate initiative)
- Email notifications when users are added/removed (no user demand evidence yet)

---

## Step 5: Surface Open Questions

Every PRD has unresolved questions. Making them invisible creates risk; making them explicit creates accountability.

**Format**:

| Question | Owner | Due |
|---|---|---|
| Does the nav change break any existing deep links in the marketing site? | [Eng lead name] | [Date] |
| Should guest users see the nav item at all? | [Design lead name] | [Date] |
| Is session recording data sufficient to define the "12 min" baseline or do we need additional instrumentation? | [Data analyst name] | [Date] |

Questions that remain unanswered after the PRD is frozen become risks. Flag them explicitly in your launch checklist.

---

## Step 6: Review with Engineering and Design

A PRD written without engineering and design input is a wish document. A PRD reviewed with them becomes a contract.

**What to ask in the review**:
- "Is anything here technically infeasible within a reasonable sprint count?"
- "Are there UX implications we haven't surfaced yet?"
- "Does our success metric require instrumentation we don't have?"
- "Are there security or privacy implications we need to address?"

Incorporate their feedback, then mark the PRD as final and date it. Changes after it is frozen go through a lightweight change log at the bottom of the document—not silent edits that confuse anyone who read an earlier version.

---

## The 1-Pager vs Full PRD

For most startup features, a 1-page PRD is the right target. A 1-pager covers:
- Problem statement (1 paragraph)
- User stories (3–5 bullets)
- Success metric (1–2 metrics with baseline and target)
- Out of scope (3–5 bullets)
- Open questions (table)

A full PRD (3–5 pages) is warranted when:
- The initiative spans multiple teams or quarters
- The trade-offs are complex enough that leadership sign-off is required
- The feature introduces new data flows, privacy implications, or third-party integrations
- You are entering a new market or launching a new product line

If you are a founding team of under 15 people and writing 4-page PRDs for routine features, your process is too heavy. Default to 1-pagers and add detail only when complexity demands it.

---

## Key Takeaway

A PRD earns its place by preventing expensive misalignment—not by documenting every requirement imaginable. Keep it lean: a clear problem statement, a handful of user stories with acceptance criteria, 1–3 success metrics with baselines and targets, an explicit out-of-scope list, and a table of open questions. Review it with engineering and design before freezing, and you will cut rework, speed up reviews, and ship features that actually solve the problem they set out to solve.
