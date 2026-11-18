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
