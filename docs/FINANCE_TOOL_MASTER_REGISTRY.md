# FinPulse Hub — Production Calculator Registry

- Version: 2.0
- Updated: 2026-11-18
- Portfolio: 45 active calculators
- Repository: apex-global-labs/FinPulse-Hub
- Release: PR #21 (branch verification passed; merge/deployment pending)

## Active calculator inventory

The following list is extracted from the current application registry. IDs are the stable query-route keys used by the homepage directory and sitemap. Each calculator uses the shared display-currency selector, synchronized numeric/range controls and instant recalculation.

### Everyday finance

| # | Calculator | Route key |
|---:|---|---|
| 1 | Currency Converter | currency |
| 6 | Percentage Calculator | percentage |
| 7 | Tip Calculator | tip |
| 22 | Inflation Calculator | inflation |

### Loans & housing

| # | Calculator | Route key |
|---:|---|---|
| 2 | Mortgage Calculator | mortgage |
| 3 | Loan Calculator | loan |
| 4 | EMI Calculator | emi |
| 8 | Auto / Car Loan Calculator | car |
| 9 | Loan Amortization Calculator | amortization |
| 13 | Mortgage Affordability Calculator | affordability |
| 14 | Mortgage Payoff & Extra Payment Calculator | payoff |
| 15 | Mortgage Refinance Comparison | refinance |
| 16 | Personal Loan Calculator | personal-loan |
| 17 | Student Loan Repayment Calculator | student-loan |

### Savings & growth

| # | Calculator | Route key |
|---:|---|---|
| 5 | Compound Interest Calculator | compound |
| 10 | Savings Goal Calculator | savings |
| 18 | Simple Interest Calculator | simple-interest |
| 23 | CD Calculator | cd |
| 24 | APY Calculator | apy |
| 44 | Emergency Fund Calculator | emergency-fund |

### Freelance & business

| # | Calculator | Route key |
|---:|---|---|
| 11 | Freelance Hourly Rate Calculator | freelance |
| 12 | Profit Margin Calculator | margin |
| 37 | Freelance Project Pricing Calculator | freelance-project |
| 38 | Freelancer Net Income After Costs Calculator | freelancer-net-income |
| 39 | Markup Calculator | markup |
| 40 | Break-even Calculator | break-even |
| 41 | Business ROI Calculator | business-roi |
| 42 | Cash Flow Projection Calculator | cash-flow |

### Retirement & investing

| # | Calculator | Route key |
|---:|---|---|
| 19 | Retirement Savings Calculator | retirement |
| 20 | 401k Contribution Calculator | 401k |
| 21 | Roth vs Traditional IRA Comparison | ira |

### Tax & income

| # | Calculator | Route key |
|---:|---|---|
| 25 | Tax Calculator | tax |
| 26 | Income Tax Calculator | income-tax |
| 27 | Sales Tax Calculator | sales-tax |
| 28 | VAT / GST Calculator | vat-gst |
| 29 | Tax Refund Estimator | tax-refund |
| 30 | Salary Take-Home Calculator | salary |

### Payroll & pay

| # | Calculator | Route key |
|---:|---|---|
| 31 | Paycheck Calculator | paycheck |
| 32 | Payroll Calculator | payroll |
| 33 | Overtime Pay Calculator | overtime |

### Shopping & pricing

| # | Calculator | Route key |
|---:|---|---|
| 34 | Discount Calculator | discount |

### Currency & transfers

| # | Calculator | Route key |
|---:|---|---|
| 35 | Exchange Fee & Markup Calculator | exchange-fees |
| 36 | International Money Transfer Cost Calculator | transfer-compare |

### Property & planning

| # | Calculator | Route key |
|---:|---|---|
| 43 | Rental Yield Calculator | rental-yield |

### Personal finance

| # | Calculator | Route key |
|---:|---|---|
| 45 | Net Worth Calculator | net-worth |

## Shared implementation and boundaries

- Currency and input behavior: shared display currency, responsive numeric/range pairs and instant calculation.
- Charts: Chart.js 4.5.1 loads asynchronously from the pinned jsDelivr distribution with subresource integrity. The calculator remains usable and falls back to accessible SVG if the CDN is unavailable.
- SEO: the final nine calculators include individual explanatory text and three FAQs. Query routes update the title, description and canonical URL. sitemap.xml contains exactly 45 tool URLs and robots.txt points to the sitemap.
- Deployment: GitHub Pages publishes all runtime files (finance-core.js, smart-ui.js, tax data/engine and asset-data.js) together with index.html, styles, sitemap and robots.
- Tax: 2026 US state and Quebec calculations are estimates with disclosed exclusions; they are not filing-grade tax advice.
- Payroll: employee-side payroll estimates are jurisdiction-specific and omit employer-side costs and some personal/period-specific adjustments.
- Crypto: BTC/ETH/USDT asset selection uses user-entered hypothetical baseline prices only; no live quote, market feed, exchange or trading feature is implied.
- Financial scope: ROI, cash flow, rental yield, emergency fund and net worth are arithmetic/planning tools. They do not recommend products, investments, loans or property purchases.

## Formula definitions for the final nine

| Calculator | Core method | Important exclusions |
|---|---|---|
| Freelance Project Pricing | Labor + expenses + contingency, grossed up to target gross margin | Taxes, scope creep, payment risk and market-rate validation |
| Freelancer Net Income After Costs | Revenue − expenses − user-entered tax reserve on positive profit | Jurisdiction-specific tax calculation |
| Markup | Cost × markup rate; selling price = cost + markup | Does not equate markup and gross margin |
| Break-even | Fixed costs ÷ (selling price − variable cost); whole units rounded up | Product mix, capacity and cost changes |
| Business ROI | (Ending value − initial investment) ÷ initial investment | Not annualized; cash-flow timing excluded |
| Cash Flow Projection | Opening cash + monthly inflows − outflows with user-entered monthly growth | Receivables timing, financing, tax and seasonality |
| Rental Yield | Annual rent, vacancy allowance and operating costs divided by purchase price | Financing, acquisition costs, capex, income tax and appreciation |
| Emergency Fund | Essential monthly expenses × selected months | No savings product recommendation |
| Net Worth | Total assets − total liabilities | Point-in-time user estimates; unlisted obligations excluded |

## Verification state

- Registry uniqueness: 45/45 unique IDs.
- Formula and smoke suite: 99/99 passed.
- Frankfurter API check: 1/1 passed.
- Playwright desktop/mobile suite: 3/3 passed; desktop test audits all 45 calculator views with axe WCAG 2.1 A/AA tags.
- Earlier branch CI run #44312169199 succeeded (99/99 formula/smoke, API 1/1, browser 3/3); a fresh run is required after the latest navigation/sitemap regression assertions.
- PR #21 merge and post-merge GitHub Pages deployment: pending; current PR head is being revalidated after additional route/sitemap tests.
- Final Lighthouse audit: pending after deployment.
