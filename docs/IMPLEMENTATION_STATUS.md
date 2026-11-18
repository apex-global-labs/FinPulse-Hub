# FinPulse Hub — Project State

- **Last updated:** 2026-11-18
- **Repository:** https://github.com/apex-global-labs/FinPulse-Hub
- **Production branch:** `main`
- **Implementation branch:** `feat/first-12-calculators`
- **Pull request:** https://github.com/apex-global-labs/FinPulse-Hub/pull/1 (validation refresh pending)
- **Current stage:** First 12 calculators implemented; automated verification added; final CI/browser result pending
- **Live website:** Not deployed / not verified
- **GitHub Pages:** Not yet configured or verified

## First 12 calculators

1. Currency Converter — Frankfurter v2 latest published reference rate, rate date, one-hour in-memory cache and manual-rate action
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

Each calculator view includes **بِسْمِ اللَّهِ**. Calculations are performed in the browser. Time-series views include SVG charts; one-step calculators explain when a chart is unnecessary.

## Implementation structure

- `index.html` — page shell, metadata and restrictive Content Security Policy
- `styles.css` — responsive layout, mobile action-button wrapping, system fonts and improved text contrast
- `finance-core.js` — shared pure calculation functions used by the UI and numeric reference tests
- `app.js` — calculator registry, input validation, currency API, results and chart rendering
- `tests/smoke.test.cjs` — UI, API, structure and security smoke checks
- `tests/formula.test.cjs` — 13 numeric reference and edge-case tests covering all 12 calculators
- `tests/browser.test.cjs` — Playwright desktop/mobile interaction tests and axe WCAG checks on all calculator views
- `.github/workflows/ci.yml` — syntax, formula, smoke, Chromium browser and accessibility checks

## Verification evidence

- [x] All 12 calculator implementations and the shared calculation core committed to the feature branch.
- [x] Numeric reference vectors and edge cases added for all 12 calculators.
- [x] Manual exchange-rate entry is an explicit action; currency codes are validated before display.
- [x] Static security checks and a restrictive CSP added; external font dependency removed.
- [x] Desktop/mobile Playwright test and axe WCAG audit added.
- [x] Latest observed Node CI stage: syntax check passed and all 22 Node smoke/formula tests passed on commit `456b97b6794606efbaf1598e274fe8a89808f836`.
- [x] CI runner changed from unsupported `ubuntu-latest` image (Ubuntu 26.04) to `ubuntu-24.04`.
- [ ] Re-run complete CI against the final branch head, including live API, Chromium and all 12 accessibility views.
- [ ] Confirm live Frankfurter API request in a real browser (browser test currently uses a deterministic mocked API response).
- [ ] Final manual visual check in additional browsers (Firefox/Safari) and real mobile devices.
- [ ] Review GitHub Actions final logs and confirm no outstanding failures.
- [ ] Merge the validated PR to `main`.
- [ ] Enable/configure GitHub Pages and verify the public URL.

## Accuracy and scope notes

- Frankfurter provides latest published reference rates, not real-time market quotes or bank transaction rates.
- Loan, mortgage and EMI use fixed-rate monthly reducing-balance estimates. Lender fees, day-count conventions and payment dates may change actual results.
- Compound-growth and savings-goal results assume a constant user-entered rate and end-of-month deposits; they are scenarios, not guaranteed returns.
- Freelance hourly rate is a planning estimate; tax rules vary by location.
- No trading, leverage, investment recommendations, crypto trading, payments or financial-provider execution is included.
- Do not call the release production-ready until final CI, browser, accessibility, deployment and public URL checks are verified.
