---
title: "Startup Legal Basics for Founders"
description: "Four legal decisions - incorporation, co-founder equity, IP assignment, and the 83(b) election - can make or break your company. Get them right early."
locale: "en"
category: "operations"
tags: ["legal", "operations", "founders", "incorporation", "equity"]
difficulty: "beginner"
publishedDate: 2024-12-30
primaryKeyword: "startup legal checklist"
readingTime: 14
author: "Startup Super School"
seoKeywords: ["startup legal checklist", "startup legal basics", "startup incorporation advice", "legal checklist for founders"]
faqs:
  - question: "Should I incorporate my startup as an LLC or a C-Corporation?"
    answer: "If you plan to raise venture capital, accept employee stock options, or pursue an acquisition, incorporate as a Delaware C-Corporation. Every institutional investor, startup lawyer, and stock option plan is optimized for this structure. LLCs cannot issue options through standard plans and venture investors generally will not invest without a conversion. LLCs are appropriate for bootstrapped businesses without equity fundraising plans - they offer simpler governance, pass-through taxation, and fewer ongoing filing requirements."
  - question: "What is an IP Assignment Agreement and why does every startup need one?"
    answer: "An IP Assignment Agreement (also called a PIIA or CIIAA) transfers ownership of all work product created by founders, employees, and contractors to the company. By default, the person who creates something owns it. If a co-founder writes core code before signing an IP assignment, they personally own that code. If a contractor builds your MVP without signing, they can argue they retain rights. These gaps surface routinely in Series A diligence and have delayed or killed funding rounds. Every person who touches your product must sign one before they start work."
  - question: "What is co-founder vesting and why do investors require it?"
    answer: "Co-founder vesting is a schedule under which founder equity is earned over time - typically 4 years with a 1-year cliff. If a co-founder leaves in month 6, they receive no shares. At month 12, they receive 25%, then the remainder monthly over 3 more years. Investors require this to prevent a departed co-founder from retaining a large ownership stake without contributing to building the company. Without vesting, a co-founder who leaves after 6 months might hold 30–40% of the cap table, making the company effectively unfundable."
  - question: "What legal work can startup founders do themselves versus what requires a lawyer?"
    answer: "DIY is acceptable for entity formation through services like Stripe Atlas or Clerky, signing standard YC SAFE notes (which are publicly available and legally sound), and routine NDAs with contractors using standard templates. Always use a lawyer for co-founder equity agreements, employee stock option plans (which require 409A valuations and plan documents), any priced funding round where term sheet terms have long-term consequences, and any acquisition. The rule of thumb: if the document governs a relationship lasting more than 12 months or involves equity, use a lawyer."
---

## Why Legal Gets Ignored Until It Explodes

Legal matters rank low on most founders' priority lists. There is a product to build, customers to talk to, and a runway that is visibly shrinking. Legal work feels expensive, slow, and abstract - the kind of thing you can deal with later.

The problem is that legal mistakes are silent until they are catastrophic. You can operate for two years without a proper IP assignment agreement, and nothing will go wrong. Then a Series A investor's lawyers find the gap during diligence, the investor gets nervous, the deal pauses, and suddenly a missing signature from 2021 is threatening a $5M raise in 2024. The cost of fixing legal problems grows non-linearly over time: a $500 lawyer conversation in year one becomes a $50,000 restructuring in year three.

This article covers the four legal decisions that matter most in the first twelve months, what you can do yourself, and what requires professional help.

## Decision 1: How You Incorporate

Incorporation is the first legal choice and the one with the longest-lasting structural consequences.

**Delaware C-Corporation** is the standard choice for VC-backed startups, and not arbitrarily. Delaware's corporate law is the most developed in the country - its Court of Chancery has 200+ years of precedent on shareholder rights, board fiduciary duties, and merger mechanics. Every institutional investor, startup lawyer, and stock option plan is optimized for this structure. If you expect to raise venture capital, accept employee stock options, or pursue an acquisition, Delaware C-Corp is the correct answer.

**LLC** (Limited Liability Company) is a viable choice for bootstrapped businesses or companies that do not anticipate raising institutional equity. LLCs have simpler governance, pass-through taxation (partners report income directly rather than paying corporate tax then personal tax), and fewer ongoing filing requirements. The tradeoff: LLCs cannot issue stock options through standard plans, and venture investors generally will not invest in an LLC without a conversion - which is expensive and time-consuming.

One practical note: where you incorporate and where you operate are different questions. Most US startups incorporate in Delaware and operate their actual business (office, employees, tax filings) in the state where they are physically located. This requires registering as a "foreign corporation" in your home state, which is a minor administrative step.

## Decision 2: Co-Founder Equity and Vesting

This is the legal issue that destroys more companies than any other, and it is almost entirely preventable.

Every co-founder agreement should cover three things in writing before you raise a dollar:

**Equity split**: How is ownership divided? There is no universally correct answer - equal splits are common but not always appropriate. What matters is that the split reflects the actual contributions (past work, ongoing role, risk taken) and is agreed upon in writing before the company has value worth fighting over.

**Vesting schedule**: Standard founder vesting is 4 years with a 1-year cliff. This means founders earn nothing if they leave within the first year, then vest 25% at the 1-year mark, then vest the remaining 75% monthly over the following three years. The purpose is to prevent a co-founder from leaving after six months and retaining a large ownership stake without contributing to building the company. Skipping vesting is a common early mistake. If a co-founder departs and holds 35% of the company unvested, your cap table becomes a deal-killer for investors.

**Departure provisions**: What happens to unvested shares if a co-founder leaves voluntarily? If they are fired for cause? If the company is acquired while shares are still vesting? These scenarios should be defined in advance, not litigated in the middle of a fundraise.

The legal instrument for all of this is a **Founders' Stock Purchase Agreement** (FSPA). Get one. Have a lawyer review it. It costs $500–$2,000 to do this right and potentially millions to do it wrong.

## Decision 3: Intellectual Property Assignment

Every founder, every early employee, every contractor who touches your code, design, or product must sign an **IP Assignment Agreement** (also called a PIIA - Proprietary Information and Inventions Agreement - or CIIAA).

Here is why this matters: by default, the person who creates something owns it. If your co-founder writes the core algorithm before signing an IP assignment, they own that algorithm, not the company. If a contractor builds your MVP and did not sign an IP agreement, they can argue they retain rights to the code. If a founding engineer previously worked at a big tech company under a broad IP assignment covering "any work related to technology," that company may have a claim on code your engineer wrote for you.

These scenarios are not hypothetical. They surface routinely in Series A diligence, where investors' lawyers specifically look for IP ownership gaps. In multiple documented cases, missing IP assignment agreements have delayed or killed funding rounds. One particularly expensive pattern: founding engineers who left before signing an IP agreement, leaving the company unable to prove it owns its own product.

The IP assignment must cover:
- All work product created in connection with the company
- Work created prior to employment that is incorporated into the company's product
- Moral rights waivers (relevant in some jurisdictions)

This is not a document you can confidently DIY. Use an established template (YC's PIIA is publicly available and widely used) but have a lawyer confirm it is appropriate for your jurisdiction and situation.

## Decision 4: The 83(b) Election

The 83(b) election is a US tax provision that many founders miss simply because no one tells them about it. Missing it costs real money.

Here is the situation: when founders receive **restricted stock subject to vesting**, the IRS treats each vesting event as taxable income equal to the fair market value of the shares on the vesting date. If your company increases in value over your vesting period - which is the point - you will owe ordinary income tax on the difference between your original cost and the current value when each tranche vests. For a successful company, this can mean a large, unexpected tax bill at a time when you may have no liquidity to pay it.

The 83(b) election solves this by treating the entire grant as taxable income at the time of grant - when the shares are worth almost nothing, typically a fraction of a cent each. You pay taxes now on a small amount instead of paying taxes later on a large amount.

**The deadline is 30 days from the date of the stock grant.** No exceptions. The IRS does not grant extensions. If you miss this window, you cannot file later. Given that this is a one-time, time-sensitive, easy-to-miss filing with potentially large financial consequences, it belongs in the first-week checklist for every founder who receives restricted stock.

## What Lives in Your Legal Foundation from Day 1

Beyond the four critical decisions above, every startup should have these basic instruments in place before they have employees or customers:

- **Cap table**: Carta's free tier handles up to 25 stakeholders and is the industry standard. A spreadsheet cap table is acceptable in month one; it is a liability by month six when terms and instruments get complex.
- **Standard offer letter template**: Establishes at-will employment (in US at-will states), compensation, IP assignment reference, and confidentiality obligations. Do not improvise these.
- **NDA template**: A mutual NDA for conversations with potential partners, contractors, and hires. One-page, two-way, standard terms. Do not share confidential information without one.
- **Privacy policy and Terms of Service**: Required for any product with users. Privacy policies are legally mandated in California (CCPA) and Europe (GDPR) and are enforced. Templates exist (Termly, Iubenda) for simple products; more complex data handling needs a lawyer.
- **Data Processing Agreement (DPA)**: Required for any EU users under GDPR if you process personal data on behalf of customers. Enterprise customers will ask for this; not having one will slow or kill deals.

## What You Can DIY vs. What Needs a Lawyer

The cost of legal services is real, and founders correctly look for ways to reduce it. Here is a clear-eyed assessment of where DIY is acceptable and where it is not.

**DIY is acceptable for:**
- Entity formation - Stripe Atlas ($500 all-in for a Delaware C-Corp), Clerky, and Firstbase handle this reliably and cheaply. The paperwork is well-understood and standardized.
- SAFE notes - Y Combinator's standard SAFE is publicly available, legally sound, and used in thousands of deals annually. You do not need a lawyer to understand or sign a standard YC SAFE.
- NDA templates - Use standard templates for routine NDAs with contractors and partners.

**Always use a lawyer for:**
- Co-founder agreements and equity splits - the stakes are too high and the document is too consequential.
- Employee stock option plans - 409A valuations, plan documents, and grant agreements require expertise.
- Any priced funding round - term sheet negotiation, investor rights agreements, and pro-rata provisions have long-term consequences that require professional review.
- Acquisitions - every word matters in an M&A transaction; do not negotiate these without counsel.

A useful rule of thumb: if the document governs a relationship that lasts longer than 12 months or involves equity, use a lawyer.

## The Cost of Getting It Wrong

The cautionary data here is consistent. IP ownership issues discovered in Series A diligence have killed or delayed deals at the term sheet stage - one of the most demoralizing experiences a founding team can have. Co-founder equity disputes without vesting agreements have destroyed companies that were otherwise working: the cap table becomes so contested that investors walk, acquirers pass, and the business becomes effectively unfundable.

A missed 83(b) election at a company that later raises a Series B at a $50M valuation can generate a six-figure personal tax liability for a founder who, at the time of vesting, may still be taking a below-market salary. This is not a theoretical scenario.

The pattern in all of these cases is the same: the legal cost was deferred, it compounded silently, and it surfaced at the worst possible moment - during a raise, an acquisition, or a co-founder departure. Every case was preventable with work that takes a day and costs less than $5,000 in total.

## Key Takeaway

Most legal disasters at startups are not the result of bad luck - they are the result of deferring four decisions that should have been made in the first 90 days: incorporation structure, co-founder equity and vesting, IP assignment from everyone who touches the product, and the 83(b) election for founders receiving restricted stock. Get these right and you remove the most common legal landmines before they arm themselves. Miss them and you may spend $100,000 and six months cleaning up what would have cost $2,000 to get right the first time.
