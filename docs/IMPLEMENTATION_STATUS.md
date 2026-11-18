# FinPulse Hub — Project State

- **Last updated:** 2026-11-18
- **Repository:** https://github.com/apex-global-labs/FinPulse-Hub
- **Production branch:** `main`
- **Live website:** https://apex-global-labs.github.io/FinPulse-Hub/
- **Current stage:** 30 calculators merged and deployed; calculators 31–36 are in feature development on `feat/payroll-money-transfer-tools`.
- **Latest merge:** PR #11 — tax and salary calculators; commit `c24b2929ebe8f324bdfcd8ea7e477e523f56cba5`.
- **PR #11 validation:** branch CI #44294149951 passed syntax, formula/smoke, live API, Playwright desktop/mobile and axe checks. Main CI #44294693366 passed. Pages deployment #44294693380 succeeded. An external HTTP fetch of the published site could not be completed from the tool environment, so the deployment workflow is confirmed but independent live-page fetch remains unverified.

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

## Next six calculators — in development

31. Paycheck Calculator — gross pay from hourly work, overtime, bonus and entered deductions
32. Payroll Calculator — employer monthly and annual payroll cost, including user-entered employer contributions and benefits
33. Overtime Pay Calculator — regular and overtime earnings using a user-entered multiplier
34. Discount Calculator — sequential discount/coupon, estimated tax and shipping
35. Exchange Fee & Markup Calculator — exchange-rate markup and fixed/percentage transfer fees
36. International Money Transfer Cost Calculator — compare two hypothetical providers by recipient amount

All new calculators use user-entered assumptions and generic educational estimates. They do not infer jurisdiction-specific payroll, tax, overtime or transfer rules.

## Implementation and validation

- Static HTML, CSS and vanilla JavaScript; no paid service, backend or runtime framework.
- `finance-core.js` contains pure calculation functions.
- `app.js` contains the calculator registry, accessible inputs, result rendering and SVG graphs.
- `tests/formula.test.cjs` covers numeric reference and edge cases.
- `tests/smoke.test.cjs` checks registration, structure, CSP and security contracts.
- `tests/browser.test.cjs` uses Playwright and axe for desktop/mobile behavior and WCAG 2.1 A/AA checks.
- GitHub Actions runs syntax, formula/smoke, Frankfurter API, browser and accessibility checks.
- GitHub Pages deploys automatically after successful main-branch updates.

## Scope and accuracy notes

- Frankfurter supplies published reference rates, not live market quotes or bank transaction rates.
- Tax, payroll, overtime and transfer tools use values entered by the user; no country-specific tax tables, statutory overtime thresholds or provider fee schedules are embedded.
- Loan and savings projections are estimates based on stated assumptions, not guaranteed outcomes.
- All outputs are educational estimates, not personalized financial advice.
- Lighthouse baseline for the original 12-tool site: mobile Performance 88, Accessibility 100, Best Practices 93, SEO 100; desktop Performance 100, Accessibility 100, Best Practices 96, SEO 100. A fresh 36-tool Lighthouse audit is still required.
