---
title: "Feature Flag"
description: "A feature flag is a code switch that enables or disables a feature at runtime without deploying new code, enabling safer releases and gradual rollouts."
locale: "en"
category: "product"
tags: ["feature flag", "feature toggle", "product", "engineering", "continuous delivery", "a/b testing"]
difficulty: "intermediate"
publishedDate: 2026-03-10
primaryKeyword: "feature flag startup"
seoKeywords: ["feature flag", "feature toggle startup", "what is a feature flag"]
relatedTerms: ["ab-testing"]
faqs:
  - question: "What is a feature flag in software development?"
    answer: "A feature flag (also called a feature toggle) is a conditional code branch that lets you enable or disable a specific feature at runtime, without deploying new code. Teams use flags to release features to a subset of users, run experiments, or act as kill switches when something goes wrong in production."
  - question: "What is the difference between a feature flag and a code deployment?"
    answer: "A deployment ships new code to production servers. A feature flag controls whether that code is active for any given user or environment. This separation means you can deploy code that is 'dark' — present in production but invisible to users — and then activate it instantly for any audience segment without a new deployment."
  - question: "What types of feature flags exist?"
    answer: "There are four main types: release flags (dark launches that hide a feature until it is ready), experiment flags (used to run A/B tests between variants), ops flags (kill switches that can disable a feature instantly during an incident), and permission flags (grant access to beta features for specific user segments or plans)."
  - question: "What is flag debt and why does it matter?"
    answer: "Flag debt refers to the accumulation of old, unused feature flags left in the codebase after the feature ships. Each unused flag adds dead code paths, makes logic harder to read, and slows down new engineers trying to understand the system. Best practice is to set a removal date for every flag at creation time and delete it within one to two sprints of full rollout."
---

## What Is a Feature Flag?

A feature flag — also called a feature toggle — is a conditional statement in your codebase that lets you turn a feature on or off at runtime, without shipping new code. Instead of coupling a feature's existence to a deployment, you gate it behind a boolean value that your configuration system controls. The result: you can deploy code at any time and choose independently when (and for whom) that code becomes active.

Feature flags are standard practice at companies like Facebook, Netflix, and GitHub. Facebook's deployment infrastructure, for example, allows the company to ship code to production thousands of times per day while only gradually activating new features for users.

## The Four Types of Feature Flags

Not all flags serve the same purpose. Understanding the types prevents overuse and misuse.

### Release Flags (Dark Launches)

Release flags hide finished or partially finished features from end users while engineers validate them in production. The code is live and running — it just serves no traffic. Teams use dark launches to test performance under real production load before anyone sees the UI.

### Experiment Flags

Experiment flags split traffic between variants to measure which version of a feature produces better outcomes. They are the infrastructure behind A/B testing. Unlike release flags, experiment flags need a analytics system attached to track which variant a user saw and what they did next.

### Ops Flags (Kill Switches)

Ops flags are circuit breakers. If a new feature causes elevated error rates or degrades database performance, an on-call engineer can disable it in seconds by flipping a flag — no rollback, no deployment, no war room needed. Every high-risk feature that touches shared infrastructure should ship with an ops flag.

### Permission Flags

Permission flags grant feature access to specific user groups: beta testers, paying customers on a higher plan, or internal employees. Canary releases — shipping to 1% of users, then 10%, then 100% — are a common pattern built on permission flags.

## Why Feature Flags Matter for Startups

**Decouple deployment from release.** Your engineers can merge to main at any time. QA can test in production behind a flag. Marketing can decide the launch date independently from the engineering cycle.

**Enable instant rollback.** A bad deployment traditionally requires a hotfix branch, review, merge, and redeploy — often 30 to 60 minutes under stress. Flipping a flag takes seconds.

**Support gradual rollouts.** Roll out to 1% of users, watch your error dashboards and conversion metrics for 24 hours, then expand. This is safer than big-bang launches and provides real production data before full exposure.

**Unlock targeted user research.** Show a new onboarding flow only to users who signed up in the last 30 days. Sell early access to the feature as a premium beta. Permission flags make segmentation a product decision, not an engineering project.

## Feature Flag Tools

| Tool | Best For | Pricing Model |
|------|----------|---------------|
| LaunchDarkly | Enterprise, complex targeting | Per-seat SaaS |
| Unleash | Self-hosted, open source | Free (self-host) / SaaS |
| Flagsmith | Open source alternative to LaunchDarkly | Free tier / SaaS |
| Statsig | Combined flags + experimentation | Usage-based |
| Homegrown flags | Very early stage, simple booleans | Free (engineering time) |

Many early-stage startups start with a simple database table or environment variable. That works fine for a handful of flags. The moment you need per-user targeting, audit logs, or percentage rollouts, move to a dedicated tool.

## The Flag Debt Problem

Every feature flag is a liability. Left in place after a feature fully ships, flags accumulate as dead code paths that confuse engineers, complicate testing, and bloat configuration systems.

The discipline required:

1. Every flag gets a **removal date** written in a comment or ticket at creation time — typically two sprints after full rollout.
2. A quarterly "flag audit" removes anything older than 90 days with 100% traffic.
3. Flags are never reused for a different feature — create a new one with a descriptive name.

Teams that skip this discipline end up with hundreds of flags, no documentation of what each does, and a codebase that is genuinely dangerous to refactor.

## Key Takeaway

Feature flags are one of the highest-leverage engineering practices available to a startup. They let you deploy continuously without the risk of big-bang releases, test in production safely, and give your product team control over rollout without depending on engineering cycles. The cost is discipline: every flag introduced must eventually be removed. Build a cleanup habit from day one, and feature flags become a durable competitive advantage rather than a source of technical debt.
