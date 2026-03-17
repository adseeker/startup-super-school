---
title: "Stock Options"
description: "Stock options give employees the right to buy company shares at a fixed strike price. ISOs and NSOs are the two main types used by startups."
locale: "en"
category: "equity"
tags: ["equity", "compensation", "team", "hiring", "incentives"]
difficulty: "beginner"
publishedDate: 2025-01-03
primaryKeyword: "stock options startup"
relatedTerms: ["vesting", "vesting-cliff", "cap-table", "equity-dilution"]
seoKeywords: ["stock options startup", "what are stock options", "employee stock options", "startup equity options"]
---

## What Are Stock Options?

**Stock options** are a contract that gives the holder the **right - but not the obligation** - to purchase a specific number of company shares at a fixed price, called the **strike price** (also called the exercise price or grant price), at any time during a defined period. They are the most common form of equity compensation used by startups in the United States.

Options are not shares. When you receive a stock option grant, you do not own anything yet. You own the right to buy shares in the future, at a price set today. The value of that right depends entirely on whether the company's share price rises above the strike price before the options expire or are forfeited.

## Why Startups Use Options Instead of Direct Equity Grants

Startups use options rather than direct share grants for two main reasons:

1. **Accounting treatment**: Options have specific, well-established accounting rules (ASC 718) that allow them to be expensed over the vesting period. Direct share grants can create more complex and sometimes more burdensome tax events at the time of grant.
2. **Retention mechanics**: Options vest over time (typically 4 years), which means an employee who leaves early forfeits unvested options. This creates a structural retention incentive without requiring the company to claw back already-issued shares.

## How Stock Options Work: Step by Step

1. **Grant**: The company issues you a grant of, say, 10,000 options with a $0.10 strike price. The grant is documented in an option agreement and tracked in the cap table.
2. **Vest**: Options vest over time according to a schedule. The standard is a **4-year vest with a 1-year cliff** - meaning no options vest in the first 12 months, then 25% vest on the cliff date, then the remaining 75% vest monthly over the following 36 months.
3. **Exercise**: Once vested, you can choose to exercise your options by paying the strike price to the company in exchange for actual shares. 10,000 options at $0.10 = $1,000 to exercise.
4. **Own shares**: After exercising, you own real shares of the company. These shares can then be sold in a secondary transaction, tender offer, or eventually at an IPO or acquisition.

## The Two Types of Stock Options

### ISO - Incentive Stock Option

ISOs are available **only to employees** (not contractors or advisors). They carry the most favorable US tax treatment:

- **No ordinary income tax at exercise**: The spread between the strike price and the current FMV is not taxed as ordinary income when you exercise (though it may trigger the Alternative Minimum Tax - see below)
- **Long-term capital gains treatment**: If you hold the shares for at least **2 years from the grant date** and **1 year from the exercise date**, any gain is taxed at long-term capital gains rates (15–20%) rather than ordinary income rates (up to 37%)
- **ISO limit**: Only the first $100,000 of options that become exercisable in a single year qualify as ISOs; anything above automatically converts to NSO treatment

### NSO - Non-Qualified Stock Option

NSOs can be granted to **employees, contractors, advisors, and board members**. Their tax treatment is less favorable:

- **Ordinary income tax at exercise**: The spread (current FMV minus strike price) is taxed as ordinary income in the year you exercise, regardless of whether you sell the shares
- **Employer withholding required**: The company must withhold payroll taxes on the spread for employees receiving NSOs

**Example**: You exercise 10,000 NSOs with a $0.10 strike price when the company's 409A valuation is $5.00 per share. The spread is $4.90 per share × 10,000 shares = $49,000 of ordinary income recognized in that tax year.

## Key Terms You Need to Know

| Term | Definition |
|------|-----------|
| **Strike price / exercise price** | The fixed price at which you can buy shares, set at FMV on the grant date |
| **Grant price** | Same as strike price for ISOs; must equal FMV at grant |
| **409A valuation** | Independent third-party appraisal required by the IRS to establish FMV for private company stock; companies must update it at least every 12 months or after a material funding event |
| **Spread** | The difference between current FMV and your strike price at time of exercise |
| **Vesting schedule** | The timeline over which your options become exercisable |
| **Post-termination exercise window** | The period after you leave the company during which you can still exercise vested options |
| **Early exercise** | Some companies allow exercising unvested options immediately; can trigger Section 83(b) election to start capital gains holding period clock |

## The Exercise Decision: When and Whether to Exercise

Exercising options is an active financial decision with real tax consequences and real cash requirements. Key considerations:

- **You need cash** to exercise (strike price × number of options). At $0.10/share × 50,000 options, that is $5,000. At $2.00/share for a later-stage grant, that could be $100,000.
- **Exercising does not guarantee a profit.** If you exercise and the company fails, you lose the money paid to exercise plus the tax liability incurred (for NSOs)
- **Cashless exercise** is common at IPO: the brokerage simultaneously exercises options and sells shares, netting the spread without requiring upfront cash

## The 90-Day Post-Termination Exercise Window: A Hidden Trap

Most standard option agreements give departing employees **90 days** after their last day to exercise all vested options. After 90 days, unexercised options expire worthless.

This creates a painful situation at high-valuation companies: an employee who leaves after 3 years may have options with significant paper value, but exercising them requires:

1. **Cash** to pay the strike price
2. **Tax liability** on the spread (for NSOs) even though no liquidity event has occurred
3. **Risk** that the company never reaches an exit, leaving them with illiquid shares and a tax bill

Some companies (notably Stripe, Pinterest, and Quora) have extended their exercise windows to 5–10 years after termination for long-tenure employees. This is not the industry standard but is increasingly considered a founder-friendly practice.

## AMT Risk with ISOs

The Alternative Minimum Tax (AMT) is a parallel tax system that can apply to ISO exercises. The spread on exercising ISOs (which avoids regular income tax) is an **AMT preference item** - meaning it can trigger an AMT liability even if no shares are sold.

In practice: if you exercise a large number of ISOs in a year when the company's 409A valuation is high, you may owe AMT on the spread even if the stock is illiquid and you have received no cash. This is one of the most common financial mistakes made by early startup employees.

## Stock Options vs. RSUs

At later-stage companies (typically post-Series C and especially post-IPO), **Restricted Stock Units (RSUs)** become more common than options:

| Dimension | Stock Options | RSUs |
|-----------|--------------|------|
| What you receive | Right to buy shares | Actual shares (delivered on vest) |
| Strike price | Required | None |
| Tax at vest | None (ISOs); ordinary income on spread (NSOs) | Ordinary income on FMV at vest |
| Upside | Only if FMV > strike price | Always has value if stock has any value |
| Common at | Seed through Series B/C | Series C+, public companies |

RSUs are simpler to understand and always have value as long as the stock has value. Options have more upside potential for early employees who receive them when the strike price is very low relative to eventual exit price.

## A Concrete Example

You join a Series A startup in 2022 and receive **10,000 options at a $0.10 strike price** (the 409A valuation at the time of your grant). Four years later, the company is acquired at **$10.00 per share**.

- Your gross profit: (10.00 - 0.10) × 10,000 = **$99,000**
- If these were ISOs held the required period: taxed at long-term capital gains (~20%) = ~$19,800 in taxes; **net ~$79,200**
- If these were NSOs: the $99,000 spread is ordinary income (~37% federal) = ~$36,630 in taxes; **net ~$62,370**

The difference between ISO and NSO treatment on this single grant is approximately $17,000 - a meaningful gap that compounds significantly with larger grants at higher valuations.

## Key Takeaway

Stock options are one of the most powerful tools for aligning employee incentives with long-term company outcomes, but they come with real complexity around tax treatment, exercise timing, and the 90-day post-termination window. Every employee who receives options should understand the difference between ISOs and NSOs, the role of 409A valuations in determining their strike price, and the financial consequences of exercising - both when the company is doing well and when they leave before an exit.
