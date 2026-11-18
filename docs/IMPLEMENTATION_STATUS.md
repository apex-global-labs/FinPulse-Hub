# FinPulse Hub — Project State

- **Last updated:** 2026-11-18
- **Repository:** https://github.com/apex-global-labs/FinPulse-Hub
- **Production branch:** `main`
- **Implementation branch:** `feat/first-12-calculators`
- **Pull request:** https://github.com/apex-global-labs/FinPulse-Hub/pull/1
- **Current stage:** First 12 calculator UI and browser-side calculation implementation under review
- **Live website:** Not deployed / not verified
- **GitHub Pages:** Not yet configured or verified

## First 12 calculator implementation

The implementation branch adds:
1. Currency Converter (manual exchange rate; not live data)
2. Mortgage Calculator
3. Loan Calculator
4. EMI Calculator
5. Compound Interest Calculator
6. Percentage Calculator (three modes)
7. Tip Calculator
8. Auto / Car Loan Calculator
9. Loan Amortization Calculator
10. Savings Goal Calculator
11. Freelance Hourly Rate Calculator
12. Profit Margin Calculator

Each calculator view includes the requested **بِسْمِ اللَّهِ** heading. Results include a primary figure, supporting metrics and explanatory assumptions. A responsive SVG trend chart is rendered when a time series is supplied; simple one-step calculations explain why no graph is needed.

## Files added on implementation branch

- `index.html` — page shell and navigation
- `styles.css` — responsive visual system
- `app.js` — calculator registry, calculations, results and SVG graph rendering
- `package.json` — Node check/test scripts
- `tests/smoke.test.cjs` — static smoke checks
- `.github/workflows/ci.yml` — Node syntax and smoke-test workflow

## Verification status

- [x] Implementation branch created from main.
- [x] Three application files committed and fetched back from GitHub.
- [x] JavaScript syntax parse check passed in the development tool.
- [x] Pull request opened.
- [x] Smoke tests and GitHub Actions workflow added to the PR.
- [ ] GitHub Actions CI green.
- [ ] Formula reference-vector and edge-case verification.
- [ ] Browser interaction tests across desktop and mobile.
- [ ] Accessibility and security review.
- [ ] Merge to main.
- [ ] GitHub Pages deployment and public URL verification.

## Important accuracy notes

- Currency conversion requires a user-supplied rate. No live FX data provider is connected.
- Loan, mortgage and EMI figures are estimates using fixed-rate monthly amortization; lender-specific fees and payment conventions may differ.
- Tax, investment recommendations, trading execution, leverage and crypto trading features are out of scope.
- Savings and compound growth use user-entered assumptions and are not guaranteed returns.
- Do not call this release production-ready until CI, formula vectors, browser checks and deployment are verified.
