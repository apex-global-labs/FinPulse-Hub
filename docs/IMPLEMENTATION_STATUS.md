# FinPulse Hub — Project State

- **Last updated:** 2026-11-18
- **Repository:** https://github.com/apex-global-labs/FinPulse-Hub
- **Production branch:** `main`
- **Calculator implementation PR:** [#4 — merged](https://github.com/apex-global-labs/FinPulse-Hub/pull/4)
- **Pages deployment PR:** [#5 — merged](https://github.com/apex-global-labs/FinPulse-Hub/pull/5)
- **Current stage:** First 12 calculators implemented, tested and merged; waiting for one-time GitHub Pages source setting
- **Live website:** Not yet deployed / public URL not verified
- **GitHub Pages:** Deployment workflow merged; GitHub currently reports Pages is not enabled for this repository

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

## Implementation structure

- `index.html` — page shell, metadata and restrictive Content Security Policy
- `styles.css` — responsive layout, mobile action-button wrapping, system fonts and improved text contrast
- `finance-core.js` — shared pure calculation functions used by the UI and numeric reference tests
- `app.js` — calculator registry, input validation, currency API, results and chart rendering
- `tests/smoke.test.cjs` — UI, API, structure and security smoke checks
- `tests/formula.test.cjs` — 13 numeric reference and edge-case tests covering all 12 calculators
- `tests/api.test.cjs` — live Frankfurter USD/EUR API integration test
- `tests/browser.test.cjs` — Playwright desktop/mobile interaction tests and axe WCAG checks on all 12 calculator views
- `.github/workflows/ci.yml` — syntax, formula, smoke, live API, Chromium browser and accessibility checks
- `.github/workflows/deploy.yml` — automatic GitHub Pages deployment after main-branch updates

## Verification evidence

- [x] All 12 calculator implementations merged into `main`.
- [x] Formula Reference Tests: 13 passed, 0 failed.
- [x] Smoke + formula CI tests: 23 passed, 0 failed.
- [x] Live Frankfurter USD/EUR API integration test: 1 passed, 0 failed.
- [x] Desktop browser interaction test passed.
- [x] Mobile browser viewport and horizontal-overflow test passed.
- [x] axe WCAG checks passed on all 12 calculator views with 0 reported violations.
- [x] Static security checks passed; CSP limits scripts, styles, fonts and network access.
- [x] Calculator implementation CI run #73 passed; deployment-workflow PR CI run #78 passed.
- [x] Both implementation and deployment workflow PRs merged.
- [ ] GitHub Pages source setting: repository Settings → Pages → Build and deployment → Source → GitHub Actions.
- [ ] Re-run/confirm the Pages deployment workflow after Pages is enabled.
- [ ] Verify the public URL: https://apex-global-labs.github.io/FinPulse-Hub/
- [ ] Optional manual checks on physical iOS/Android devices and Firefox/Safari; current automated browser coverage is Chromium desktop/mobile viewports.

## Current deployment blocker

The deployment workflow started after PR #5 merged, but `actions/configure-pages@v5` returned 404 because the repository has no Pages site enabled yet. The repository metadata reports `has_pages: false`. The GitHub connector available in this session can read repository settings but cannot change the Pages source setting. Once the source is set to **GitHub Actions** in repository Settings → Pages, the workflow can be rerun and the public URL verified.

## Accuracy and scope notes

- Frankfurter provides latest published reference rates, not real-time market quotes or bank transaction rates.
- Loan, mortgage and EMI use fixed-rate monthly reducing-balance estimates. Lender fees, day-count conventions and payment dates may change actual results.
- Compound-growth and savings-goal results assume a constant user-entered rate and end-of-month deposits; they are scenarios, not guaranteed returns.
- Freelance hourly rate is a planning estimate; tax rules vary by location.
- No trading, leverage, investment recommendations, crypto trading, payments or financial-provider execution is included.
- Do not call the website live or production-ready until GitHub Pages deployment and the public URL are verified.
