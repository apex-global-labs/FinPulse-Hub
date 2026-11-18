# FinPulse Hub — Project State

- **Last updated:** 2026-11-18
- **Repository:** https://github.com/apex-global-labs/FinPulse-Hub
- **Production branch:** `main`
- **Calculator implementation PR:** [#4 — merged](https://github.com/apex-global-labs/FinPulse-Hub/pull/4)
- **Pages deployment PR:** [#5 — merged](https://github.com/apex-global-labs/FinPulse-Hub/pull/5)
- **Current stage:** First 12 calculators deployed; next six calculators are under development on a feature branch
- **Live website:** https://apex-global-labs.github.io/FinPulse-Hub/
- **GitHub Pages:** Enabled; latest deployment workflow run [#44287351937](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44287351937) completed successfully on 2026-11-18
- **Latest main CI:** [#44287352087](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44287352087) completed successfully on 2026-11-18

## First 12 calculators

1. Currency Converter — Frankfurter v2 latest published reference rate, date display, one-hour in-memory cache and manual-rate action
2. Mortgage Calculator
3. Loan Calculator
4. EMI Calculator
5. Compound Interest Calculator
6. Percentage Calculator — percentage-of, percentage-change and reverse-percentage modes
7. Tip Calculator
8. Auto / Car Loan Calculator — down payment, trade-in and financed fees
9. Loan Amortization Calculator
10. Savings Goal Calculator — includes future value of existing savings and required monthly deposits
11. Freelance Hourly Rate Calculator
12. Profit Margin Calculator — reports margin and markup separately

Each calculator view includes **بِسْمِ اللَّهِ**. Calculations run in the browser. Time-series views include SVG charts; one-step calculators explain when a chart is unnecessary.

## Next six calculators (in development)

13. Mortgage Affordability Calculator — estimates a maximum loan/home-price range using housing-cost and total-debt ratios, taxes, insurance, HOA and down payment
14. Mortgage Payoff & Extra Payment Calculator — compares baseline and extra-principal repayment schedules, interest saved and time saved
15. Mortgage Refinance Comparison — compares existing and refinanced payment, fees, simple break-even and full-term interest
16. Personal Loan Calculator — includes origination-fee deduction, net proceeds, repayment schedule and fee-adjusted annualized cost estimate
17. Student Loan Repayment Calculator — compares standard and extra-payment scenarios; excludes jurisdiction-specific forgiveness and income-driven rules
18. Simple Interest Calculator — selectable 360/365/366 day-count basis and comparison chart

These six tools are in development and are not live until merged and deployed.

## Implementation structure

- `index.html` — page shell, metadata and restrictive Content Security Policy
- `styles.css` — responsive layout, system fonts and mobile-first refinements
- `finance-core.js` — shared pure calculation functions used by the UI and numeric reference tests
- `app.js` — calculator registry, input validation, currency API, results and chart rendering
- `tests/smoke.test.cjs` — UI, API, structure and security smoke checks
- `tests/formula.test.cjs` — numeric reference and edge-case tests covering all 12 calculators
- `tests/api.test.cjs` — live Frankfurter USD/EUR API integration test
- `tests/browser.test.cjs` — Playwright desktop/mobile interaction tests and axe WCAG checks on all 12 calculator views
- `.github/workflows/ci.yml` — syntax, formula, smoke, live API, Chromium browser and accessibility checks
- `.github/workflows/deploy.yml` — automatic GitHub Pages deployment after main-branch updates
- `.github/workflows/lighthouse.yml` — Lighthouse mobile/desktop audit after successful Pages deployment (being added)

## Verification evidence

- [x] All 12 calculator implementations merged into `main`.
- [x] Formula and smoke tests passed; latest recorded combined run reported 23 passed, 0 failed.
- [x] Live Frankfurter USD/EUR API integration test passed.
- [x] Desktop browser interaction test passed.
- [x] Mobile browser viewport and horizontal-overflow test passed.
- [x] axe WCAG checks passed on all 12 calculator views with 0 reported violations.
- [x] Static security checks passed; CSP limits scripts, styles, fonts and network access.
- [x] Latest main CI run #44287352087 succeeded.
- [x] GitHub Pages deployment run #44287351937 succeeded.
- [ ] Lighthouse mobile and desktop scores: pending automated audit workflow; do not claim a measured score until its artifact is available.
- [ ] Optional manual checks on physical iOS/Android devices and Firefox/Safari.

## Quick performance review

- The page uses local HTML, custom CSS, and deferred local JavaScript; no Tailwind CDN, external font request, front-end framework, or image-heavy hero asset is present.
- The current CSS and JavaScript are modest static assets for the first 12 calculators. Avoid adding a framework or a runtime CDN dependency just for speed.
- The two JavaScript files use `defer`, so they do not block HTML parsing.
- The currency-rate API is called only when the user requests a rate; no unnecessary API request is made on initial page load.
- No verified critical rendering or asset-size defect was found in source inspection. Actual Core Web Vitals/Lighthouse performance scores are not yet measured.
- After the 45-tool library is complete, repeat Lighthouse and optimize based on measured bottlenecks rather than premature code splitting or framework changes.

## Accuracy and scope notes

- Frankfurter provides latest published reference rates, not real-time market quotes or bank transaction rates.
- Loan, mortgage and EMI use fixed-rate monthly reducing-balance estimates. Lender fees, day-count conventions and payment dates may change actual results.
- Compound-growth and savings-goal results assume a constant user-entered rate and end-of-month deposits; these are scenarios, not guaranteed returns.
- Freelance hourly rate is a planning estimate; tax rules vary by location.
- No trading, leverage, investment recommendations, crypto trading, payments or financial-provider execution is included.
- Treat calculator outputs as educational estimates, not personalized financial advice.
