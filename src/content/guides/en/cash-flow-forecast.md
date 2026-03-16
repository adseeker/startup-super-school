---
title: "How to Build a Cash Flow Forecast"
description: "Build a 12-month cash flow forecast from scratch: direct method, inflows, outflows, runway management, and common mistakes to avoid."
locale: "en"
category: "finance"
tags: ["finance", "cash flow", "forecasting", "runway", "accounting"]
difficulty: intermediate
publishedDate: 2026-03-16
readingTime: 10
primaryKeyword: "cash flow forecast startup"
seoKeywords: ["cash flow forecast", "how to forecast cash flow", "startup cash flow", "12 month cash flow"]
steps:
  - name: "Separate profit from cash flow"
    text: "Understand why net profit and net cash position are different numbers. Revenue is recognized when invoiced, not when collected. Expenses hit P&L when incurred, not when paid. Your forecast tracks actual money moving in and out of the bank account."
  - name: "Choose the direct method"
    text: "Use the direct method: list every real cash inflow and outflow by month. This is the clearest approach for early-stage startups and requires no accounting adjustments. The indirect method (starting from net income) is useful for established businesses with complex accruals."
  - name: "Map your cash inflows"
    text: "List every source of cash arriving in your bank: customer payments (not invoices raised), investor capital, grants, loan drawdowns, and any other receipts. For B2B businesses, model payment timing realistically — net-30 or net-60 terms mean revenue booked in month 1 may not arrive until month 2 or 3."
  - name: "Map your cash outflows"
    text: "List every cash leaving the business: payroll (include employer taxes and benefits), rent, software subscriptions, marketing spend, COGS payments, loan repayments, VAT/GST settlements, and one-off capital expenditures. Be exhaustive — most forecast errors are outflows that were forgotten, not revenue that was missed."
  - name: "Build the monthly grid"
    text: "Create a spreadsheet with months as columns and rows for: Opening Balance, Total Inflows, Total Outflows, Net Cash, Closing Balance. Closing Balance = Opening Balance + Net Cash. The next month's Opening Balance equals the prior month's Closing Balance. Validate that your formula chain is intact before filling in numbers."
  - name: "Stress-test with scenarios"
    text: "Build three versions: base case (most likely), downside (revenue 30% lower, costs same), and upside (revenue 20% higher). The downside case is what you actually manage to. If the downside scenario runs the bank to zero before month 12, you need to adjust burn, accelerate revenue, or raise capital before that date."
  - name: "Use the forecast to manage runway"
    text: "Runway = months until the Closing Balance hits zero in your base case. Revisit the forecast monthly, replacing estimates with actuals. Track forecast vs actual variance by line item. A 15–20% variance on any single outflow line warrants investigation. Set a rule: if downside runway drops below 6 months, trigger a review meeting immediately."
faqs:
  - question: "What is the difference between a cash flow forecast and a P&L forecast?"
    answer: "A P&L (profit and loss) forecast shows revenue and expenses on an accrual basis — revenue is recorded when earned, expenses when incurred. A cash flow forecast tracks actual cash moving in and out of your bank account. A company can be profitable on paper but cash-negative if customers pay late or if large deposits were paid upfront for future services. Startups need both, but the cash flow forecast is more critical for survival."
  - question: "How far ahead should a startup forecast cash flow?"
    answer: "12 months is the standard minimum. Investors expect to see at least 18 months of projections in a fundraise, with the first 3 months being highly detailed and the remainder at a monthly level. Beyond 18 months, forecasts become speculative for most early-stage companies. The key is to update the rolling forecast every month with actuals."
  - question: "What are the most common cash flow forecasting mistakes?"
    answer: "The top mistakes are: (1) modeling revenue on invoice date rather than payment date, ignoring 30–60 day collection lag; (2) forgetting periodic outflows like annual software renewals, quarterly tax payments, or VAT settlements; (3) using a single scenario instead of base/downside/upside; (4) not updating the forecast monthly against actuals, which causes it to diverge from reality within weeks."
  - question: "What is a safe minimum runway for a startup?"
    answer: "Most advisors recommend maintaining at least 12 months of runway at all times. Fundraising typically takes 3–6 months, so if you drop below 9 months you should already be talking to investors. Exceptional circumstances aside, running a process with less than 6 months of runway severely weakens your negotiating position and risks a distressed close — or no close at all."
  - question: "Should I use the direct or indirect method for a startup cash flow forecast?"
    answer: "Use the direct method. It lists actual cash receipts and payments, making it immediately legible to founders, operators, and investors without accounting knowledge. The indirect method, which reconciles from net income using adjustments for depreciation, working capital changes, and accruals, is better suited to mature companies with an experienced CFO producing GAAP-compliant statements."
---

A cash flow forecast answers one question that matters more than any other in a startup: **how many months until the bank account hits zero?**

Profit is an accounting construct. Cash is oxygen. A company can show a healthy P&L while running out of money — because customers haven't paid yet, because a tax bill lands in Q3, or because a single month of high hiring cost more than projected. This guide shows you how to build a 12-month cash flow forecast from scratch, with real numbers and the discipline to keep it accurate over time.

## Profit vs Cash Flow: Why They Differ

Before building the model, understand why profit and cash are different.

| Metric | What it measures | When it moves |
|--------|-----------------|---------------|
| Revenue (P&L) | Value of goods/services invoiced | When invoice is raised |
| Cash received | Money arriving in your bank | When customer pays |
| Expense (P&L) | Cost incurred | When service is used |
| Cash paid | Money leaving your bank | When invoice is settled |

**Example**: In January you close a €20,000 contract with net-60 payment terms. Your P&L shows €20,000 revenue in January. Your bank account shows €0 additional cash in January and €20,000 in March. If your payroll is due in February, the P&L says you're profitable; the bank says you're short.

This gap — known as the cash conversion cycle — is why profitable startups go bankrupt every year.

## Direct vs Indirect Method

There are two ways to build a cash flow forecast:

| Method | Starting point | Best for |
|--------|---------------|---------|
| **Direct** | List every real cash receipt and payment | Startups, SMEs, any company without a full accrual accounting system |
| **Indirect** | Start from net income, then adjust for non-cash items | Mature companies producing GAAP/IFRS financials |

Use the **direct method**. It is transparent, requires no accounting knowledge to read, and maps directly to your bank statements. Every number in a direct forecast answers: "Did cash go in or out of the account, and when?"

## Step 1 — Separate Profit from Cash Flow

Write down your last three months of bank statements alongside your P&L. Identify every line that differs between them. Common sources of divergence:

- **Accounts receivable**: Invoices raised but not yet collected
- **Accounts payable**: Bills received but not yet paid
- **Deferred revenue**: Customers who prepaid (common in SaaS)
- **Payroll timing**: Salary costs hit P&L in the month worked but may be paid on the 25th or last day
- **Tax deposits**: VAT/GST collected from customers and held until the quarterly filing

Once you can explain the reconciliation between profit and cash, you understand the model you're about to build.

## Step 2 — Choose the Direct Method

Open a spreadsheet. Create the following structure:

```
Row 1:  Opening Balance
Row 2:  --- INFLOWS ---
Row 3:  Customer receipts
Row 4:  Investor capital
Row 5:  Grants / other receipts
Row 6:  TOTAL INFLOWS  (sum rows 3–5)
Row 7:  --- OUTFLOWS ---
Row 8:  Payroll (salaries + employer taxes)
Row 9:  Rent & facilities
Row 10: Software & subscriptions
Row 11: Marketing & paid acquisition
Row 12: COGS / cost of delivery
Row 13: Loan repayments
Row 14: VAT / tax settlements
Row 15: Capex / one-off purchases
Row 16: TOTAL OUTFLOWS (sum rows 8–15)
Row 17: NET CASH  (row 6 minus row 16)
Row 18: Closing Balance  (row 1 + row 17)
```

Columns are months: Jan, Feb, Mar … Dec.

**Key formula**: `Closing Balance = Opening Balance + Total Inflows − Total Outflows`. The next month's Opening Balance = prior month's Closing Balance. This chain must be unbroken.

## Step 3 — Map Your Cash Inflows

For each month, estimate the cash that will actually land in the bank.

**Customer receipts** — the most important line. Do not use your revenue forecast directly. Apply your payment lag:

- If you invoice net-30, month 1 revenue arrives in month 2
- If you invoice net-60, month 1 revenue arrives in month 3
- SaaS subscriptions billed upfront arrive in the same month

**Example** (B2B SaaS, net-30 invoicing):

| Month | New ARR signed | MRR invoiced | Cash received |
|-------|---------------|-------------|---------------|
| Jan | €10,000 | €5,000 | €4,200 (Dec invoices) |
| Feb | €8,000 | €5,833 | €5,000 (Jan invoices) |
| Mar | €6,000 | €6,500 | €5,833 (Feb invoices) |

**Investor capital** — enter the exact expected wire date. If a round is expected to close in April, model the cash arriving in April, not March. Fundraising timelines slip; build in a one-month buffer.

**Grants** — enter the disbursement schedule from the grant agreement, not the award date. Governments routinely take 60–120 days to transfer approved funds.

## Step 4 — Map Your Cash Outflows

This is where most forecasts fail. Founders model the obvious monthly costs and forget the lumpy ones. Work through every category:

**Payroll** — the biggest outflow for most startups. Include:
- Gross salaries
- Employer social security / payroll taxes (typically 15–30% on top of gross depending on jurisdiction)
- Pension contributions
- Any bonus payments (quarterly or annual)

**Example** at a 12-person team with €60,000 avg salary: monthly gross payroll ≈ €60,000. Add 20% employer taxes → €72,000 cash out per month.

**Periodic outflows to model explicitly**:

| Outflow | Typical timing |
|---------|---------------|
| Annual software renewals (AWS, Salesforce, etc.) | Month of renewal |
| VAT / GST settlement | Monthly or quarterly depending on jurisdiction |
| Corporation tax | Annual, varies by country |
| Quarterly board/advisor fees | Q1, Q2, Q3, Q4 |
| Insurance renewals | Annual |
| Office lease deposit | One-off at signing |

**Rule of thumb**: your first draft will miss 15–20% of outflows. After you build the model, ask your accountant or CFO to review it line by line before you use it for decisions.

## Step 5 — Build the Monthly Grid

Here is an illustrative 3-month extract from a 12-person SaaS startup:

| Line | Jan | Feb | Mar |
|------|-----|-----|-----|
| Opening Balance | €180,000 | €112,000 | €88,000 |
| Customer receipts | €32,000 | €38,000 | €44,000 |
| Investor capital | — | — | €500,000 |
| **Total Inflows** | **€32,000** | **€38,000** | **€544,000** |
| Payroll (incl. taxes) | €72,000 | €72,000 | €72,000 |
| Rent | €6,500 | €6,500 | €6,500 |
| Software & subscriptions | €4,200 | €4,200 | €24,200 |
| Marketing | €12,000 | €15,000 | €18,000 |
| VAT settlement | €5,300 | — | €5,800 |
| **Total Outflows** | **€100,000** | **€97,700** | **€126,500** |
| **Net Cash** | **-€68,000** | **-€59,700** | **€417,500** |
| **Closing Balance** | **€112,000** | **€52,300** | **€469,800** |

Note: the February software line includes a €20,000 annual AWS renewal. Without it explicitly modeled, February shows €4,200 — a €20,000 blind spot.

## Step 6 — Stress-Test with Scenarios

Never present or manage to a single scenario. Build three:

| Scenario | Revenue assumption | Cost assumption | When to use |
|----------|-------------------|----------------|-------------|
| **Base case** | Most likely conversion rate + pipeline | Full headcount plan | Internal planning default |
| **Downside** | Revenue 25–35% below base | Same cost base | Fundraise safety test, board reporting |
| **Upside** | Revenue 20% above base | Costs grow proportionally | Hiring plan trigger |

The downside case is the most important. If downside runway drops below 6 months, that is a crisis signal — not a planning footnote.

**Typical downside lever**: if you model 20 new customers/month in base, use 13 in downside. Keep COGS and fixed costs constant — they don't compress automatically when revenue disappoints.

## Step 7 — Use the Forecast to Manage Runway

Runway = `Closing Balance in month N ÷ average monthly burn`.

More precisely: count the month at which Closing Balance first goes negative. That is your runway.

**Updating the forecast**:
1. At month-end, replace forecast figures with actuals from your bank statement
2. Reforecast the remaining months with updated assumptions
3. Calculate forecast vs actual variance for every line item
4. Investigate any line with >15% variance — either your assumption was wrong or something unexpected happened

**Warning thresholds**:

| Runway remaining | Action |
|-----------------|--------|
| > 18 months | Healthy; focus on growth |
| 12–18 months | Begin investor conversations if raising |
| 6–12 months | Active fundraise underway; consider cost reductions |
| < 6 months | Emergency — cut burn immediately and/or run a bridge process |

## Common Mistakes to Avoid

1. **Booking revenue on invoice date, not collection date** — your cash forecast will overstate cash for weeks or months
2. **Forgetting VAT/GST** — if you're VAT-registered, the money you collect from customers includes tax you owe to the government; it is not your cash
3. **Ignoring annual renewals** — a €50,000 AWS or Salesforce renewal in month 7 can flip a comfortable month into a cash crunch
4. **Building one scenario** — a single-scenario forecast provides no information about risk; you don't know if the business survives a 30% revenue miss
5. **Not updating monthly** — a forecast built in January and never touched is fiction by April. Actuals must replace estimates as they come in

## Key Takeaway

A 12-month cash flow forecast built with the direct method — mapping actual receipts and payments by month, modeled in three scenarios, updated monthly against actuals — is the most important financial tool a startup founder can maintain. It tells you precisely how much time you have, gives you enough lead time to respond to a deteriorating situation, and demonstrates financial discipline to every investor, board member, and lender you will ever work with. Build it before you need it; the time to understand your runway is not when you have three months left.
