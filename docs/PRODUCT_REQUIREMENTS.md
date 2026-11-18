# FinPulse Hub — Product Requirements Document

- **Document version:** 1.0
- **Date:** 2026-11-18
- **Status:** Initial product blueprint; implementation not started
- **Repository:** `apex-global-labs/FinPulse-Hub`

## 1. Product definition

FinPulse Hub is a free-first, finance-only website that helps people understand common personal, household, freelance and small-business calculations. It will combine the former **Financial Intelligence Hub** and **Business & Professional Suite** concepts into one coherent product.

The former **Universal Online Tools** division is removed. Generic PDF, image, QR, developer, file-conversion and unrelated utility tools are not part of this product.

The product is a calculator and financial-education resource, not a bank, lender, broker, exchange, wallet, tax preparer or financial adviser.

## 2. Goals

1. Publish accurate, understandable calculators for common financial tasks.
2. Prioritise topics with demonstrable search demand and clear user intent.
3. Make every calculator usable on mobile, tablet and desktop.
4. Explain formulas, assumptions, units and limitations alongside results.
5. Keep the first version deployable on free static hosting without a required backend.
6. Build SEO pages that answer distinct needs rather than generating thin duplicate pages.
7. Establish automated formula, interface, accessibility and deployment checks.

## 3. Non-goals and product boundaries

- No generic universal-tool catalogue.
- No bank login, account aggregation, payment processing or storage of financial account credentials.
- No loan applications, credit decisions, financial product sales or lender lead-generation in the MVP.
- No brokerage, exchange or wallet connections.
- No trading execution, signals, copy trading, leverage/margin, liquidation guidance, forex pip/lot/position sizing or trade recommendations.
- No cryptocurrency buy/sell recommendations, return forecasts or portfolio recommendations.
- No claim that a calculation guarantees a financial outcome.
- No country-specific tax/legal advice without verified jurisdiction, tax year, source and review.
- No paid APIs, paid hosting, paid analytics or paid dependencies in the initial launch.

Forex and cryptocurrency coverage is restricted to educational currency/value conversion and transparent fee arithmetic using user-entered or clearly attributed reference values. It must not support speculative trading workflows.

## 4. Audience and primary jobs

The intended audience is general users who need to understand a number before making or discussing a financial decision:

- Borrowers comparing repayment scenarios.
- Households planning savings and budgets.
- Employees and freelancers estimating income and pricing work.
- Small businesses checking margins, break-even and cash flow.
- People comparing currency conversion costs for ordinary payments.
- Learners studying interest, inflation, percentages and financial ratios.

The site must use plain language, show the calculation steps and avoid persuasive financial advice.

## 5. Information architecture

The home page will group tools by task, with search and filters.

1. **Loans & EMI:** general, personal, vehicle and education loan calculations; repayment schedules.
2. **Mortgage & Property:** mortgage payments, affordability, down payment, refinance scenarios, rent-vs-buy assumptions and rental yield.
3. **Savings & Financial Planning:** simple/compound interest, savings goals, recurring contributions, inflation, budgeting and CAGR.
4. **Freelancer & Professional Income:** hourly-rate planning, project pricing, billable hours and income-after-costs.
5. **Business Finance:** profit, margin, markup, break-even, revenue, cash flow and business-loan arithmetic.
6. **Tax, Salary & VAT/GST:** jurisdiction- and tax-year-specific estimates only after research and validation.
7. **Currency & Transfer Costs:** currency conversion, fees and exchange-rate markup.
8. **Crypto Education:** manually supplied reference-value conversion and clearly labelled fee arithmetic only.
9. **Accounting Basics:** selected financial ratios with definitions and formula explanations.

## 6. Calculator experience requirements

Every calculator must include:

- A clear title, one-sentence purpose and appropriate category.
- Labeled inputs with units, sensible examples and accessible help text.
- Validation for missing, invalid, negative or impossible values.
- A clearly presented primary result.
- Supporting breakdowns (for example, principal, interest and total paid).
- Formula explanation and all material assumptions.
- Currency, date, rate period and rounding labels where relevant.
- Reset and, where useful, copy/share-friendly result summary.
- A concise limitations note; country-specific tools must show jurisdiction and effective date.
- No fabricated defaults that can materially change the answer.

Inputs should be editable without losing unrelated values. Results should update predictably and must not imply certainty where the inputs are estimates.

## 7. Accuracy and financial calculation rules

1. Each formula must have a written specification before implementation.
2. Every formula must have normal, boundary, zero-rate, zero-term and invalid-input tests where applicable.
3. Cross-check representative cases against an independent calculation or trusted reference.
4. Document whether rates are annual, monthly, nominal, effective, fixed or variable.
5. Distinguish payment frequency from compounding frequency.
6. Use explicit rounding rules and avoid repeated rounding during intermediate calculations.
7. Show the unrounded calculation policy and final display precision.
8. For country-specific tax calculations, record jurisdiction, tax year, source URL, effective date and last review date.
9. If rules or a source cannot be verified, label the tool as an educational estimate or keep it unpublished.
10. Never advertise a formula as universally applicable when lender, jurisdiction or contract terms can change it.

## 8. Geographic and localisation strategy

The first release should not pretend that one tax, mortgage or salary formula applies worldwide. General mathematical calculators may be global. Tax, payroll, VAT/GST and regulated fees must be delivered as separately scoped country versions after authoritative research.

Initial research candidates: global English search demand and country-specific validation for the United States, United Kingdom, Canada, Australia, India and Bangladesh. This is a research shortlist, not a final market commitment.

Currency values must always identify the source and retrieval timestamp if a live/reference rate is used. If no free reliable source is available, provide a manual-rate mode rather than inventing a rate.

## 9. Privacy, security and trust

- Prefer browser-local calculations; do not transmit user-entered financial values by default.
- Do not request bank passwords, card numbers, identity documents or account credentials.
- Do not store calculator inputs in analytics.
- Do not embed third-party scripts without reviewing their privacy and performance impact.
- Keep API keys and secrets out of client-side code and the public repository.
- Use HTTPS through the hosting platform.
- Provide privacy, disclaimer and contact/about pages before public launch.
- Make clear that results are educational estimates and are not professional financial, tax or legal advice.

## 10. SEO requirements

- One canonical page per distinct calculator task and search intent.
- Unique title, meta description, H1 and useful explanatory content per page.
- Helpful formula, worked example, assumptions and FAQ content.
- Valid canonical URLs, internal links, sitemap and robots directives.
- Structured data only when the page visibly supports the marked-up content.
- Avoid doorway pages, keyword stuffing, thin templates and unverified volume claims.
- Measure indexing and search performance after launch; rankings and traffic are not guaranteed.

## 11. Accessibility and performance

- Semantic HTML and keyboard-operable controls.
- Visible focus indicators and sufficient contrast.
- Programmatic labels and understandable validation messages.
- Results announced appropriately to assistive technology.
- Responsive layouts and readable tables on narrow screens.
- No unnecessary framework or large runtime dependency in the initial build.
- Keep core calculations functional without third-party data services.

## 12. Release strategy

### Release 0 — Foundation
Approve the blueprint, research the keywords, settle the initial tool set, define formula specifications and establish project standards.

### Release 1 — Core calculators
Build and test the highest-value loan/EMI, mortgage, compound-interest, savings, budget, freelancer and business calculations. Launch only after CI and browser checks pass.

### Release 2 — Expansion
Add more loan, property, accounting and country-specific tax/salary tools after evidence and formula review.

### Release 3 — Currency and crypto education
Add currency conversion, transfer-cost math and restricted crypto educational converters with clear reference-rate provenance and no trading features.

### Release 4 — Optimisation
Improve content based on real Search Console data, user feedback, accessibility audits and performance measurements.

## 13. Launch acceptance criteria

The first public release is acceptable only when:

- Every advertised calculator is implemented and has formula tests.
- No placeholder, broken or misleading calculator is exposed.
- All pages work at mobile and desktop widths.
- Keyboard navigation and core accessibility checks pass.
- There are no serious console errors or broken internal links.
- SEO metadata, canonical rules, sitemap and robots directives are verified.
- Privacy, disclaimer and about/contact pages are present.
- CI passes on the exact commit being deployed.
- GitHub Pages deployment succeeds and the public URL is verified in a browser.
- Project status is updated with commit, test counts and deployment evidence.

## 14. Success measures

Track useful outcomes rather than promising a traffic number: indexed eligible pages, organic clicks/impressions, calculator completion, returning visitors, page performance, formula defect rate, accessibility defects and user-reported issues. Analytics must not collect calculator input values.
