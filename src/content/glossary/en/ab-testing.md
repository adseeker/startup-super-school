---
title: "A/B Testing"
description: "A/B testing splits traffic between two variants to measure which performs better. A guide to running valid experiments with statistical significance."
locale: "en"
category: "product"
tags: ["a/b testing", "experimentation", "product", "conversion", "statistics", "growth"]
difficulty: "intermediate"
publishedDate: 2026-03-10
primaryKeyword: "a/b testing startup"
seoKeywords: ["a/b testing startup", "what is a/b testing", "how to run ab test"]
relatedTerms: ["feature-flag", "conversion-rate-optimization"]
faqs:
  - question: "What is A/B testing and how does it work?"
    answer: "A/B testing is a controlled experiment in which you split your audience randomly into two groups. Group A sees the current version (the control) and Group B sees a changed version (the variant). You then measure a defined metric — such as click-through rate or sign-up conversion — for both groups over the same time period and use statistics to determine whether any difference is real or due to chance."
  - question: "What does statistical significance mean in an A/B test?"
    answer: "Statistical significance measures the probability that the observed difference between control and variant did not happen by chance. The industry standard threshold is 95% confidence (p-value < 0.05), meaning there is less than a 5% probability the result is a false positive. Running a test below this threshold — or stopping early when you see a positive result — is one of the most common and costly mistakes in experimentation."
  - question: "How much traffic do you need to run a valid A/B test?"
    answer: "The required sample size depends on your baseline conversion rate, the minimum effect you want to detect, and your confidence threshold. As a rough guide, you typically need at least 1,000 conversions per variant — not visits, conversions — to detect a meaningful lift of 10–20%. Sites with fewer than a few thousand monthly conversions rarely have enough traffic to run statistically valid A/B tests and should focus on qualitative research instead."
  - question: "What are the most common A/B testing mistakes?"
    answer: "The three most damaging mistakes are: (1) stopping the test early when you see a winning result — this inflates false positives dramatically; (2) running too many simultaneous tests that interact with each other; and (3) ignoring the novelty effect, where users click a new element simply because it is different, causing inflated short-term results that fade after a week. Always set your test duration and sample size before you start, and do not look at results until the test is complete."
---

## What Is A/B Testing?

A/B testing — also called split testing — is a controlled experiment in which two versions of something (a webpage, an email subject line, a call-to-action button, a pricing page) are shown to randomly divided audiences simultaneously. The goal is to measure which version produces a better outcome on a specific metric and to determine, with statistical confidence, whether that difference is real.

The "A" is the control: the existing version. The "B" is the variant: the version with one change. Users are randomly assigned to see one or the other, and their behavior is tracked. At the end of the experiment, statistics tell you whether the variant genuinely outperformed the control or whether the observed difference was just noise.

## Key Concepts

### Control vs. Variant

The control is your baseline — whatever you currently have. The variant is the thing you changed. Best practice is to change only one variable per test (headline, button color, layout, copy). Testing multiple changes simultaneously makes it impossible to know which change caused the result; that is a separate technique called multivariate testing, which requires substantially more traffic.

### Statistical Significance and p-Values

Statistical significance tells you the probability that your result is not due to random chance. The standard threshold used in industry is **95% confidence**, which corresponds to a p-value below 0.05. At p < 0.05, there is less than a 5% chance the observed difference is a false positive.

A common trap: many tools show a "winner" the moment they detect a difference, regardless of significance. Do not read results mid-test. The p-value is only meaningful once you have reached your pre-determined sample size.

### Sample Size

Sample size is calculated before the test starts, using a power analysis. The inputs are:

- **Baseline conversion rate**: your current rate (e.g., 3.2%)
- **Minimum detectable effect (MDE)**: the smallest lift worth detecting (e.g., 10% relative improvement, meaning 3.5%)
- **Confidence level**: typically 95%
- **Statistical power**: typically 80%

Use a free sample size calculator (Evan Miller's is the standard) and commit to running the test until you hit that number. A test ended early — even when results look good — dramatically inflates false positives.

## The Metric Hierarchy

Every A/B test needs a **primary metric** (the one thing you are optimizing) and **guardrail metrics** (metrics that must not deteriorate as a side effect).

| Metric Type | Example | Purpose |
|-------------|---------|---------|
| Primary metric | Sign-up conversion rate | What you are trying to improve |
| Guardrail metric | Revenue per user | Ensure improvement is not at a cost |
| Secondary metric | Time to first action | Additional signal, not decision-making |

A test that improves sign-up conversion by 15% but reduces average revenue per user by 20% is a net loss. Guardrail metrics catch these traps.

## When A/B Testing Is (and Is Not) Appropriate

**Good candidates for A/B testing:**
- High-traffic pages (landing pages, sign-up flows, pricing pages)
- Any change where you are genuinely uncertain which version wins
- Changes where a quantitative outcome metric is clearly defined

**Poor candidates for A/B testing:**
- Low-traffic pages where reaching statistical significance would take months
- Radical redesigns (too many variables change at once)
- Features that need time to demonstrate value (novelty effect contaminates early results)

If you have fewer than 1,000 monthly conversions per variant, you likely cannot run valid A/B tests. Use user interviews, session recordings, and qualitative methods instead.

## Common Mistakes

**Stopping early.** The single most common mistake. Checking results daily and stopping when you see a "winner" causes false positive rates to spike above 50% in practice.

**The novelty effect.** Users click new things because they are new. A variant that looks dramatically different may win short-term purely because of novelty, then revert to baseline after a week. Run tests for at least one to two full business cycles.

**Testing too many things at once.** Multiple simultaneous tests on overlapping user populations interact with each other and corrupt results. Use a proper experimentation platform that handles traffic allocation carefully if you run more than one test at a time.

**Ignoring segment effects.** An overall neutral result can mask a large positive effect for one user segment and a large negative effect for another. Always check results broken down by key segments (mobile vs. desktop, new vs. returning users) after the experiment concludes.

## A/B Testing Tools

| Tool | Best For |
|------|----------|
| Optimizely | Enterprise, full-stack experimentation |
| VWO | Mid-market, visual editor, lower setup friction |
| Statsig | Combined feature flags + experimentation |
| Amplitude Experiment | Teams already using Amplitude analytics |
| Google Optimize | Deprecated in 2023 — do not use |

## Key Takeaway

A/B testing is the most rigorous way to make product decisions — but only when done correctly. Calculate your sample size before you start, define your primary and guardrail metrics upfront, never stop early, and resist the urge to check results until the test is complete. For startups without sufficient traffic, qualitative research delivers faster and more reliable insights than underpowered experiments. When you do have the traffic, A/B testing transforms gut-feel decisions into evidence-backed ones, compounding over time into a measurable product advantage.
