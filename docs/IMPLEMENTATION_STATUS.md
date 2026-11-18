# FinPulse Hub — Project State

- **Last updated:** 2026-11-18
- **Repository:** https://github.com/apex-global-labs/FinPulse-Hub
- **Production branch:** `main`
- **Live website:** https://apex-global-labs.github.io/FinPulse-Hub/
- **Current stage:** 36 of 45 calculators merged into `main`.
- **PR #11:** Tax and salary calculators merged as `c24b2929ebe8f324bdfcd8ea7e477e523f56cba5`.
- **PR #12:** Payroll, pricing and money-transfer calculators merged as `6545530e651c36f37632ab29f68344655dfee18f`.
- **PR #12 branch CI:** Run #44295089541 succeeded, including formula/smoke, live API, desktop/mobile browser and axe accessibility checks.
- **PR #12 main CI:** Run #44295168596 succeeded.
- **PR #12 Pages deployment:** Run #44295168569 succeeded. The deployment workflow is confirmed; independent HTTP retrieval from the assistant environment was blocked by a DNS/network resolution error.

## Calculator inventory

1. Currency Converter
2. Mortgage Calculator
3. Loan Calculator
4. EMI Calculator
5. Compound Interest Calculator
6. Percentage Calculator
7. Tip Calculator
8. Auto / Car Loan Calculator
9. Loan Amortization Calculator
10. Savings Goal Calculator
11. Freelance Hourly Rate Calculator
12. Profit Margin Calculator
13. Mortgage Affordability Calculator
14. Mortgage Payoff & Extra Payment Calculator
15. Mortgage Refinance Comparison
16. Personal Loan Calculator
17. Student Loan Repayment Calculator
18. Simple Interest Calculator
19. Retirement Savings Calculator
20. 401(k) Contribution Calculator
21. Roth vs Traditional IRA Comparison
22. Inflation Calculator
23. CD Calculator
24. APY Calculator
25. Tax Calculator
26. Income Tax Calculator
27. Sales Tax Calculator
28. VAT / GST Calculator
29. Tax Refund Estimator
30. Salary Take-Home Calculator
31. Paycheck Calculator
32. Payroll Calculator
33. Overtime Pay Calculator
34. Discount Calculator
35. Exchange Fee & Markup Calculator
36. International Money Transfer Cost Calculator

## Remaining 9 planned calculators

37. Freelance Project Pricing Calculator
38. Freelancer Net Income After Costs Calculator
39. Markup Calculator
40. Break-even Calculator
41. Business ROI Calculator
42. Cash Flow Projection Calculator
43. Rental Yield Calculator
44. Emergency Fund Calculator
45. Net Worth Calculator

The remaining list is a planning inventory and can be refined to avoid overlap or low-value tools before implementation.

## Implementation and validation

- Static HTML, CSS and vanilla JavaScript; no paid service, backend or runtime framework.
- `finance-core.js` contains pure calculation functions.
- `app.js` contains the calculator registry, accessible inputs, result rendering and SVG graphs.
- `tests/formula.test.cjs` covers numeric reference values and edge cases.
- `tests/smoke.test.cjs` checks registration, structure, CSP and security contracts.
- `tests/browser.test.cjs` uses Playwright and axe for desktop/mobile behavior and WCAG 2.1 A/AA checks across all 36 calculators.
- GitHub Actions runs syntax, formula/smoke, Frankfurter API, Chromium browser and accessibility checks.
- GitHub Pages deploys automatically after successful main-branch updates.

## Scope and accuracy notes

- Frankfurter supplies published reference rates, not live market quotes or bank transaction rates.
- Tax, payroll, overtime and provider-fee tools use values entered by the user; no country-specific tax tables, statutory overtime thresholds or provider fee schedules are embedded.
- Loan and savings projections are estimates based on stated assumptions, not guaranteed outcomes.
- All outputs are educational estimates, not personalized financial advice.
- Lighthouse baseline for the original 12-tool site: mobile Performance 88, Accessibility 100, Best Practices 93, SEO 100; desktop Performance 100, Accessibility 100, Best Practices 96, SEO 100. A fresh audit of the 36-tool site remains a performance follow-up.


## Smart Calculator Architecture migration (started 2026-11-18)

- Migration branch: `feat/smart-calculator-architecture`.
- Central UI configuration module: `smart-ui.js` (currency list, currency labels, slider bounds, tax preset registry, common asset selector list).
- Shared calculator renderer: currency selector, numeric input + range slider, instant input-driven recalculation, country/region VAT/GST preset selector where a defensible standard rate exists, and currency-aware result/chart formatting.
- Currency Converter uses selectable currency codes rather than free-text ISO codes; selecting a pair fetches a published Frankfurter reference rate.
- Initial official consumption-tax presets are limited to clearly scoped standard rates: UK standard VAT, Bangladesh standard VAT, and Canadian province/territory GST/HST/PST combinations. US is explicitly a local-rate-required placeholder, not a nationwide tax claim.
- Presets are starting estimates only. Product exemptions, reduced rates, place-of-supply, fiscal-year and local rules can differ; manual override remains available.
- Progressive income tax and personal income-tax withholding are intentionally not assigned simplistic country defaults: their values depend on tax year, filing status, income bands and other jurisdictional rules. User-configurable inputs remain.
- Crypto asset selector options (BTC, ETH, USDT) are registered for future crypto tools; no live prices are claimed or embedded.
- Migration is not production-ready until CI, Playwright desktop/mobile, axe accessibility and formula regression all pass. Remaining future work includes currency formatting in every metric/chart edge case, presets for other relevant calculators, and crypto calculator implementation.


## Smart UI production migration update (2026-11-18)

- **PR #14 merged:** `4ef77e62ccde2e2b4a80ef47e2b6bd7554fa33af`.
- PR #14 branch CI #44296831348 passed; main CI #44296925160 passed; GitHub Pages deployment #44296925118 passed.
- Shared currency dropdown, number + range slider controls, instant recalculation, currency-aware result/metric/chart formatting and currency pair dropdowns are now in the production renderer for all 36 existing calculators.
- Country/region starting presets are active for Sales Tax, VAT/GST and Inflation. The inflation presets use IMF October 2026 WEO estimates for Bangladesh, United States, Canada and United Kingdom.
- Remaining country-specific income-tax presets are not hard-coded until tax year, filing status, national/provincial scope and official bracket sources are modelled correctly.
- No current calculator is a crypto calculator. BTC, ETH and USDT are registered as future asset selector choices only; no live/mock price feed is claimed.


## Smart UI migration — latest verified state (2026-11-18)

- **PR #14** introduced the shared renderer and was merged as `4ef77e62ccde2e2b4a80ef47e2b6bd7554fa33af`.
- **PR #15** added country inflation presets and was merged as `5746b0c8f850c35332c14bb4eca8822734b04b32`.
- PR #14 CI #44296831348 passed; main CI #44296925160 passed; Pages deployment #44296925118 passed.
- PR #15 CI #44297450264 passed; main CI #44297552509 passed; Pages deployment #44297552650 passed.
- The shared renderer now gives all 36 existing calculators a display-currency dropdown, currency-aware monetary formatting, synchronized number/range controls and instant recalculation.
- Currency Converter uses From/To currency dropdowns and automatically requests published Frankfurter reference rates when the pair changes.
- Money-transfer comparison tools include a recipient-currency selector.
- Country presets are active for Sales Tax and VAT/GST (UK, Bangladesh, Canadian provinces/territories; US explicitly requires local rates) and Inflation (2026 IMF annual average CPI estimates for Bangladesh 8.7%, US 3.6%, Canada 2.8%, UK 3.3%). These are editable starting assumptions, not personalized rates.
- Progressive income-tax and salary-withholding presets remain manual because a valid country preset requires tax year, filing status, province/state, deductions and current official tax-band rules. Do not insert a single flat rate as if it represented a country's full income-tax system.
- The current 36-tool inventory has no dedicated crypto calculator. BTC, ETH and USDT are present in the shared asset option registry for future tool work; there is no live price feed or mock price claim. Existing retirement/401(k)/IRA tools continue to use user-entered return assumptions and do not yet expose asset-class selectors.
- The next architecture tasks are: add suitable asset-class/token selectors when a crypto or investment-specific calculator is added; extend verified country presets only where official data is sufficiently scoped; and run a fresh Lighthouse audit after the UI migration.


## Jurisdiction tax engine — merged and deployed (2026-11-18)

- **PR #17 merged:** https://github.com/apex-global-labs/FinPulse-Hub/pull/17
- Production commit: `9a54d81c8ca39943fbe9e12666d60eafc461309b`.
- PR branch CI #44299275113 passed; main CI #44299408097 passed; GitHub Pages deployment #44299408080 passed.
- Syntax checks passed; formula/smoke tests 72/72, Frankfurter API test 1/1, Playwright/axe desktop/mobile suite 3/3 passed.
- Added a shared, browser-only tax data registry and progressive calculation engine.
- Income Tax Calculator and Salary Take-Home Calculator now use a selectable 2026 jurisdiction profile rather than the previous generic four-band example / flat tax percentage.
- Initial 2026 profiles: US federal (single, married filing jointly, married filing separately, head of household); UK England/Wales/Northern Ireland and Scotland; Canada federal plus 12 provinces/territories with published 2026 marginal brackets; Bangladesh AY 2026–27 general and selected higher tax-free allowance categories.
- Bangladesh profile includes the BDT 5,000 minimum tax floor when income exceeds the applicable basic exemption.
- Important scope limits: US state income tax is not yet calculated from state-specific progressive brackets; the salary tool exposes an optional manual state/local withholding percentage. Quebec is not yet included in the Canadian provincial bracket dataset. Canadian personal credits, surtaxes and payroll deductions are excluded. UK National Insurance and US Social Security/Medicare are not included in take-home estimates. The UI and notes disclose these exclusions.
- Asset registry added for BTC, ETH and USDT plus generic asset-class scenarios. Prices are intentionally null and user-entered only; there is no live exchange feed or fabricated market quote. Registry marks every baseline as hypothetical and non-real-time. No crypto-specific calculator exists yet, so the selector is not presented as a trading feature.
- Official tax references: IRS Publication 505 (2026); GOV.UK 2026–27 income tax rates and Scottish rates; CRA 2026 tax brackets; Bangladesh NBR 2025–26 income-tax circular covering AY 2026–27 and 2027–28.
- New formula, integration-contract and Playwright coverage is included in the branch. Merge only after CI, browser E2E and axe checks pass.


## PR #19 — 2026 state tax and payroll work (in review)

- Branch: `feat/us-state-quebec-payroll-2026`.
- Added a 50-state US state tax registry with single and married-filing-jointly schedules; nine states with no wage income tax are explicitly marked. The state dataset incorporates 2026 changes verified from official sources for Arkansas, South Carolina and West Virginia; Arkansas high-income transition adjustment is disclosed as not modeled.
- State estimates are layered on top of the selected US federal profile. State standard deductions are included where published in the comparative dataset; local taxes, personal exemptions/credits, tax-benefit recapture and special surtaxes are not comprehensively modeled. Several 2026 rate changes were announced after the early-year comparative bracket publication; rate/threshold pairs must be checked against the linked official state publications before claiming filing-grade accuracy. This is an educational estimate only.
- Added 2026 Québec progressive tax profile using Revenu Québec brackets and its basic personal amount credit.
- Added employee payroll deductions: US Social Security (6.2% to $184,500), Medicare (1.45%) and Additional Medicare (0.9% above filing-status threshold); UK Class 1 NI (8% between £12,570 and £50,270; 2% above); Canada CPP/CPP2/EI; Québec QPP/QPP2/EI/QPIP.
- Payroll is annualized and does not model prior-employer year-to-date earnings, pay-period rounding, exemptions or employer-side contributions.
- Sources: Tax Foundation 2026 state brackets (threshold reference), StateWise 2026 state change audit (official state sources linked per state), IRS Publication 15, HMRC Budget 2026 Annex A, CRA T4032 2026, Revenu Québec 2026 rates and employer changes.
- Formula, smoke and Playwright checks added. Do not merge until branch CI, browser/axe and regression suites pass.


## PR #20 — Crypto and investment asset selector (in progress, 2026-11-18)

- Integrates the existing `asset-data.js` shared registry into Retirement Savings, 401(k), and Roth vs Traditional IRA calculators.
- Adds BTC, ETH, USDT and generic asset-class selectors. Crypto selections reveal an optional user-entered hypothetical baseline price in the selected display currency.
- When a valid baseline is entered, the selected calculator result also shows a hypothetical asset-unit equivalent and its chart series switches to that unit basis. Without a baseline, the ordinary currency projection remains visible and no quote is fabricated.
- Every investment selector visibly states: “Hypothetical / Baseline Input — Not Live Exchange Data.” No exchange API, market feed, or automatic price is used.
- Asset selection changes only the illustrative unit denomination, not the assumed return. Outputs remain educational scenarios.
- Validation: pending PR branch CI, formula/smoke tests, desktop/mobile Playwright and axe checks.
