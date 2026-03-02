---
title: "How to Build Your First MVP"
description: "A practical guide to building your first MVP — how to scope it correctly, what to cut, and how to launch in a way that generates real, actionable learning."
locale: "en"
category: "product"
tags: ["product", "mvp", "building", "lean startup", "launch"]
difficulty: "beginner"
publishedDate: 2024-05-24
primaryKeyword: "build an MVP"
readingTime: 14
seoKeywords: ["how to build MVP", "build minimum viable product", "MVP development guide", "launch startup MVP"]
steps:
  - name: "Define What You Need to Validate"
    text: "Before writing a line of code, answer: What is the single most important assumption I need to validate? What is the minimum test I need to run? What would 'validated' look like specifically? If your core assumption is 'people will pay for this,' a landing page with a payment CTA might be your MVP — no product needed."
  - name: "Distill Your Core Value Hypothesis"
    text: "Write one sentence: '[User type] who wants to [desired outcome] can use [your product] to [how you deliver that outcome].' Everything in your MVP should serve this sentence. If a feature does not help users achieve the core outcome, it does not belong in the MVP."
  - name: "Scope Ruthlessly — Cut Everything Non-Essential"
    text: "List every feature you could build. For each one, ask: is it essential (core value cannot be delivered without it), nice-to-have (improves experience but not required), or not now? Build only the essential features. Move everything else to a V2 list. Common cuts: user roles, mobile app, API integrations, admin dashboard, multi-language support."
  - name: "Choose the Right MVP Type"
    text: "Match the MVP format to the assumption you are testing. Use a landing page to test demand. Use a Figma prototype to test UX. Use a concierge MVP (manual service delivery) to test whether customers value the outcome before automating it. Use a Wizard of Oz MVP to fake automation while validating the experience. Only build software if a simpler test cannot answer your question."
  - name: "Build and Launch to Early Adopters"
    text: "Build the essential features only. When you are embarrassed by the product — but it delivers the core value — it is ready to launch. Recruit 10–20 early adopters manually, not through paid ads. These users should be your ideal customer profile, not everyone. Give them direct access to you for feedback."
  - name: "Run the Learning Loop"
    text: "After launch, talk to every user. Track the one metric that proves your core value hypothesis — activation rate, retention after day 7, or willingness to pay. Distinguish between 'they used it' and 'they got value from it.' Use what you learn to decide whether to iterate on the same hypothesis or pivot to a new one."
faqs:
  - question: "How do you decide what to include in an MVP?"
    answer: "Apply one test to every potential feature: without this, can the core value still be delivered? If yes, cut it. The MVP should include only features that are essential to demonstrating value — everything else is scope creep. Common mistakes include adding user roles, mobile support, integrations, and analytics dashboards to a product that has not yet proven its core value."
  - question: "What are the different types of MVPs a startup can build?"
    answer: "The main types are: Landing Page (test demand via sign-ups or payment), Concierge (manually deliver the service before automating it), Wizard of Oz (simulate automation while humans do the work behind the scenes), Piecemeal (assemble from existing tools like Zapier and Airtable), and Single Feature (ship only the core differentiator). The right type depends on what assumption you are testing."
  - question: "When is an MVP ready to launch?"
    answer: "Your MVP is ready when it delivers enough value for your specific early adopter to choose it over doing nothing — and you have a mechanism to collect behavioral feedback. The rule of thumb: launch when you are embarrassed by it. If every feature feels polished and complete, you have built too much and delayed learning by weeks or months."
  - question: "How do you know if your MVP is working?"
    answer: "Look for behavioral signals, not vanity metrics. Signs it is working: users return without being prompted, they find workarounds when features are missing (indicating high motivation), they refer others unprompted, and at least some are willing to pay before the product is complete. Signs it is not working: users try it once and do not return, engagement requires constant manual prompting, and no one complains when you turn it off."
---

## Before You Build Anything

The biggest MVP mistake is treating "MVP" as a technical milestone rather than a learning milestone.

An MVP is not the first version of your product. It's the **cheapest, fastest test of your most important assumption.**

Before writing a line of code, answer these questions:

1. **What is the single most important assumption I need to validate?**
2. **What is the minimum test I need to run to validate it?**
3. **What would "validated" look like, specifically?**

If your most important assumption is "people will pay for this," a landing page with a payment CTA might be your MVP — no product needed. If it's "people can successfully complete this workflow," you need a working prototype.

## Define Your Core Value Hypothesis

Every MVP should test one thing: **does this product deliver value to this specific user?**

Distill your product into a single sentence:

> "[User type] who wants to [desired outcome] can use [your product] to [how you deliver that outcome]."

Example: *"Freelance designers who want to get paid faster can use [X] to create professional invoices and track payments in under 2 minutes."*

Everything in your MVP should serve this sentence. If a feature doesn't help users achieve the core outcome, it doesn't belong in the MVP.

## The Scoping Process: Cut Mercilessly

The process of defining your MVP is 80% about what you *don't* build.

### Feature Prioritization

List every feature you could possibly build. For each one, ask:

- **Essential**: Without this, the core value can't be delivered
- **Nice-to-have**: Improves the experience but doesn't change whether value is delivered
- **Not now**: Could be valuable later but adds no learning now

Only build the "essential" features. Ship everything else later.

### The "Version 2" Rule

Every feature that isn't strictly essential gets moved to a V2 list. This list will grow. That's fine — it means you have ideas for after you launch. But it also means your V1 stays lean.

### Common Features to Cut from an MVP

- User roles and permissions (usually only needed when you have multiple users)
- Mobile app (most B2B products can start web-only)
- API / integrations (unless they're core to the value proposition)
- Admin dashboard (use a spreadsheet + Zapier)
- Multi-language support (launch in one language first)
- Complex analytics (use Mixpanel or Amplitude, not a custom dashboard)
- Payment logic complexity (start with Stripe + one pricing tier)

## Choosing What to Build

Sometimes the best MVP is not a software product at all.

### MVP Type Decision Tree

**Do you need to prove demand exists?**
→ Landing page with email capture or payment CTA

**Do you need to prove the user experience works?**
→ Figma prototype or clickable mockup

**Do you need to prove someone will pay?**
→ Pre-sell (deposit or full payment) before building

**Do you need to prove the workflow works?**
→ Concierge MVP (do it manually first)

**Do you need to prove a technical hypothesis?**
→ Build the smallest possible working version of the risky technical component

**Do you need to prove end-to-end flow for your first customer?**
→ Build the product (but scope it to one use case only)

## The Build Phase

Once scope is locked, build with speed over polish as the priority — but not at the cost of stability.

### Principles for MVP Engineering

**Hardcode everything you can.** Don't build a configuration system — hardcode the one value. Don't build a permission system — hardcode one role. Generalize later.

**Use third-party services for non-core functionality.** Auth (Auth0, Clerk), payments (Stripe), email (Resend, Postmark), analytics (Mixpanel), support (Intercom) — these are solved problems. Don't rebuild them.

**Choose boring technology.** The MVP is not the place to experiment with a new framework. Use what your team builds fastest in.

**Build a functional loop, not polish.** Users must be able to complete the core workflow end to end. Beautiful UI can come after you confirm the workflow is valuable.

### The Two-Week Check

Every two weeks, ask: "If we stopped building right now and put this in front of 10 users, what would we learn?" If the answer is "nothing useful yet," you're probably overbuilding.

## Preparing to Launch

Before you launch, set up the measurement infrastructure:

- **Activation metric**: what action means a user has received value? (created first X, completed first Y)
- **Retention metric**: what does "came back" look like? (logged in again? used core feature again?)
- **Primary success metric**: what number, if it moves, tells you the MVP is working?

Don't launch without knowing these numbers — otherwise you'll launch and not know what you learned.

## The Soft Launch

Don't announce publicly on day one. Start with 10–20 users you can have direct conversations with.

**Who to invite first:**
- Your best conversations from discovery interviews
- People who told you "let me know when it's ready"
- Relevant communities where your target users congregate (Reddit, Slack, forums)

Get on calls with your first users. Watch them use the product over video — don't just send a link and wait. Watching someone get confused is worth more than 10 survey responses.

## After Launch: The Learning Loop

The MVP isn't done when you launch. It's done when you've validated (or invalidated) your core hypothesis.

### The Learning Loop

1. **Observe**: Watch users in the product (session recordings, analytics)
2. **Ask**: Talk to active users (what's working?) and churned users (why did they leave?)
3. **Hypothesize**: Form a theory about why things are or aren't working
4. **Test**: Make the smallest change that would prove or disprove the theory
5. **Repeat**

Track your iterations. Write down what you expected to happen vs. what actually happened. This is the validated learning that accumulates into product-market fit.

## Signs Your MVP Is Working

- Users come back without being nudged
- Users refer other users without being asked
- Users complain when a feature is down
- Users pay (if you've asked them to)

## Signs Your MVP Is Not Working

- Users try it once and don't return
- Low activation (they sign up but don't complete the core action)
- You're getting vague positive feedback but no one pays or returns
- You're making constant feature additions but retention isn't improving

If retention is flat or declining, adding features won't fix it. Go back to discovery and understand *why* they're not coming back.

## Key Takeaway

The goal of an MVP is not to launch a product. It's to run a learning experiment as fast as possible. Build the minimum needed to test your most important assumption, measure the result honestly, and use what you learn to decide whether to double down or change direction.

Speed of learning beats speed of shipping.
