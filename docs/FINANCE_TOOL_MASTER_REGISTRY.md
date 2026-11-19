# FinPulse Hub — Master Tool Registry

- **Version:** 3.0
- **Updated:** 2026-11-19
- **Production portfolio:** 115 active tools
- **Runtime release:** `da94f90328c80f557a98b08fa889d4c429046348`
- **Repository:** apex-global-labs/FinPulse-Hub

> This file retains its historical filename for compatibility. It is now the master registry for all FinPulse Hub tools, not only finance calculators.

## Portfolio summary

| Family | Count | Registry source |
|---|---:|---|
| Financial calculators | 45 | `app.js` |
| Basic mathematics | 25 | `math-tools.js` |
| Advanced mathematics & statistics | 20 | `advanced-math-tools.js` |
| Date & time | 25 | `date-time-tools.js` |
| Unit & data converters (PR #34 candidate) | 20 | `unit-converter-tools.js` |
| **Production total** | **115** | |
| **Release-candidate total** | **135** | |

Every tool has a stable registry ID used by the `?tool=` route, homepage directory and sitemap. Do not rename an ID without an explicit migration and route regression.

## 1. Financial calculators — 45

| # | Tool | Stable ID |
|---:|---|---|
| 1 | Currency Converter | `currency` |
| 2 | Mortgage Calculator | `mortgage` |
| 3 | Loan Calculator | `loan` |
| 4 | EMI Calculator | `emi` |
| 5 | Compound Interest Calculator | `compound` |
| 6 | Percentage Calculator | `percentage` |
| 7 | Tip Calculator | `tip` |
| 8 | Auto / Car Loan Calculator | `car` |
| 9 | Loan Amortization Calculator | `amortization` |
| 10 | Savings Goal Calculator | `savings` |
| 11 | Freelance Hourly Rate Calculator | `freelance` |
| 12 | Profit Margin Calculator | `margin` |
| 13 | Mortgage Affordability Calculator | `affordability` |
| 14 | Mortgage Payoff & Extra Payment Calculator | `payoff` |
| 15 | Mortgage Refinance Comparison | `refinance` |
| 16 | Personal Loan Calculator | `personal-loan` |
| 17 | Student Loan Repayment Calculator | `student-loan` |
| 18 | Simple Interest Calculator | `simple-interest` |
| 19 | Retirement Savings Calculator | `retirement` |
| 20 | 401k Contribution Calculator | `401k` |
| 21 | Roth vs Traditional IRA Comparison | `ira` |
| 22 | Inflation Calculator | `inflation` |
| 23 | CD Calculator | `cd` |
| 24 | APY Calculator | `apy` |
| 25 | Tax Calculator | `tax` |
| 26 | Income Tax Calculator | `income-tax` |
| 27 | Sales Tax Calculator | `sales-tax` |
| 28 | VAT / GST Calculator | `vat-gst` |
| 29 | Tax Refund Estimator | `tax-refund` |
| 30 | Salary Take-Home Calculator | `salary` |
| 31 | Paycheck Calculator | `paycheck` |
| 32 | Payroll Calculator | `payroll` |
| 33 | Overtime Pay Calculator | `overtime` |
| 34 | Discount Calculator | `discount` |
| 35 | Exchange Fee & Markup Calculator | `exchange-fees` |
| 36 | International Money Transfer Cost Calculator | `transfer-compare` |
| 37 | Freelance Project Pricing Calculator | `freelance-project` |
| 38 | Freelancer Net Income After Costs Calculator | `freelancer-net-income` |
| 39 | Markup Calculator | `markup` |
| 40 | Break-even Calculator | `break-even` |
| 41 | Business ROI Calculator | `business-roi` |
| 42 | Cash Flow Projection Calculator | `cash-flow` |
| 43 | Rental Yield Calculator | `rental-yield` |
| 44 | Emergency Fund Calculator | `emergency-fund` |
| 45 | Net Worth Calculator | `net-worth` |

## 2. Basic Mathematics — 25

| # | Tool | Stable ID |
|---:|---|---|
| 1 | Basic Arithmetic Calculator | `basic-arithmetic` |
| 2 | Fraction Calculator | `fraction` |
| 3 | Mixed Number Calculator | `mixed-number` |
| 4 | Decimal to Fraction Converter | `decimal-fraction` |
| 5 | Ratio Calculator | `ratio` |
| 6 | Proportion Calculator | `proportion` |
| 7 | Average Calculator | `average` |
| 8 | Percentage Change Calculator | `percentage-change` |
| 9 | Percent Error Calculator | `percent-error` |
| 10 | Rounding Calculator | `rounding` |
| 11 | Significant Figures Calculator | `significant-figures` |
| 12 | Scientific Notation Converter | `scientific-notation` |
| 13 | Exponent Calculator | `exponent` |
| 14 | Square Root Calculator | `square-root` |
| 15 | Cube Root Calculator | `cube-root` |
| 16 | Nth Root Calculator | `nth-root` |
| 17 | Factorial Calculator | `factorial` |
| 18 | GCD Calculator | `gcd` |
| 19 | LCM Calculator | `lcm` |
| 20 | Prime Number Checker | `prime-checker` |
| 21 | Prime Factorization Calculator | `prime-factorization` |
| 22 | Modulo / Remainder Calculator | `modulo` |
| 23 | Pythagorean Theorem Calculator | `pythagorean` |
| 24 | Circle Calculator | `circle` |
| 25 | Triangle Area Calculator | `triangle-area` |

## 3. Advanced Mathematics & Statistics — 20

| # | Tool | Stable ID |
|---:|---|---|
| 1 | Linear Equation Solver | `linear-equation` |
| 2 | Quadratic Equation Solver | `quadratic-equation` |
| 3 | Simultaneous Equations Solver | `simultaneous-equations` |
| 4 | Polynomial Calculator | `polynomial-calculator` |
| 5 | Logarithm Calculator | `logarithm` |
| 6 | Matrix Operations Calculator | `matrix-operations` |
| 7 | Matrix Determinant Calculator | `matrix-determinant` |
| 8 | Matrix Inverse Calculator | `matrix-inverse` |
| 9 | Complex Number Calculator | `complex-number` |
| 10 | Arithmetic & Geometric Sequence Calculator | `sequence-calculator` |
| 11 | Series Sum Calculator | `series-sum` |
| 12 | Permutation Calculator | `permutation` |
| 13 | Combination Calculator | `combination` |
| 14 | Probability Calculator | `probability` |
| 15 | Mean Median Mode Calculator | `mean-median-mode` |
| 16 | Variance & Standard Deviation Calculator | `variance-standard-deviation` |
| 17 | Z-Score Calculator | `z-score` |
| 18 | Correlation Calculator | `correlation` |
| 19 | Linear Regression Calculator | `linear-regression` |
| 20 | Confidence Interval Calculator | `confidence-interval` |

## 4. Date & Time — 25

| # | Tool | Stable ID |
|---:|---|---|
| 1 | Age Calculator | `age-calculator` |
| 2 | Date Difference Calculator | `date-difference` |
| 3 | Add Days Calculator | `add-days` |
| 4 | Subtract Days Calculator | `subtract-days` |
| 5 | Business Days Calculator | `business-days` |
| 6 | Working Days Calculator | `working-days` |
| 7 | ISO Week Number Calculator | `iso-week` |
| 8 | Day of Year Calculator | `day-of-year` |
| 9 | Days in Month Calculator | `days-in-month` |
| 10 | Leap Year Checker | `leap-year` |
| 11 | Calendar Month View | `calendar-month` |
| 12 | Recurring Date Calculator | `recurring-date` |
| 13 | Term Duration Calculator | `term-duration` |
| 14 | Time Duration Calculator | `time-duration` |
| 15 | Time Difference Calculator | `time-difference` |
| 16 | Add Time Calculator | `add-time` |
| 17 | Subtract Time Calculator | `subtract-time` |
| 18 | Countdown Timer | `countdown-timer` |
| 19 | Event Date Countdown | `event-countdown` |
| 20 | Date to Unix Timestamp | `date-to-unix` |
| 21 | Unix Timestamp to Date | `unix-to-date` |
| 22 | World Clock | `world-clock` |
| 23 | Time Zone Converter | `timezone-converter` |
| 24 | UTC Offset Calculator | `utc-offset` |
| 25 | Meeting Time Planner | `meeting-time-planner` |

## Shared implementation and boundaries

- The shared renderer provides live calculations, validation, formula/step panels, copy/export/print, URL state, history restore, theme, keyboard shortcuts and related-tool links.
- Relevant financial tools expose monthly/yearly schedules and detailed breakdowns. Date/time tools use semantic calendar tables, recurrence breakdowns and time-zone conversion where appropriate.
- Chart.js is optional and has an accessible SVG fallback. Charts are not forced onto tools that do not benefit from them.
- The Currency Converter uses Frankfurter published reference rates with manual fallback. Rates are not guaranteed live transaction quotes.
- Tax/payroll profiles are jurisdiction- and year-specific estimates with disclosed exclusions.
- No trading execution, brokerage, wallet, live crypto quote or investment recommendation is implemented.

## Verification state

- Active registry counts: 45 + 25 + 20 + 25 = 115.
- Formula/smoke/regression suite: 198/198 passed on the runtime release.
- Frankfurter API contract: 1/1 passed.
- Browser suite: all 115 Finance, Math & Statistics and Date & Time views are iterated; all Date & Time views assert guide presence and axe WCAG 2.1 A/AA compliance. Latest result: 6/6 browser tests passed.
- Homepage directory and sitemap parity are enforced by smoke tests.
- Main CI, Pages deployment and Lighthouse are recorded in `docs/PROJECT_STATE.md`.


## Verification state

- Production registry remains 115 tools on `main` until PR #34 is merged and deployed.
- Batch 6 candidate registry contains 20 additional unique IDs; the candidate homepage and sitemap each contain 135 unique tool routes.
- PR #34 CI Run #44488033568: Formula + Smoke + Regression 213/213 passed; API 1/1 passed; Playwright Browser 7/7 passed.
- Browser/axe audit covered all 20 converter views against WCAG 2.1 A/AA; no violations were reported by the automated suite.
- This is PR-candidate evidence, not production deployment evidence.

## 5. Unit, Measurement & Data Converters — 20 (Batch 6 PR candidate)

| # | Tool | Stable ID |
|---:|---|---|
| 1 | Length Converter | `length-converter` |
| 2 | Weight / Mass Converter | `mass-converter` |
| 3 | Temperature Converter | `temperature-converter` |
| 4 | Area Unit Converter | `area-converter` |
| 5 | Volume Unit Converter | `volume-converter` |
| 6 | Speed Converter | `speed-converter` |
| 7 | Pressure Converter | `pressure-converter` |
| 8 | Energy Converter | `energy-converter` |
| 9 | Power Converter | `power-converter` |
| 10 | Frequency Converter | `frequency-converter` |
| 11 | Angle Converter | `angle-converter` |
| 12 | Fuel Economy Converter | `fuel-economy-converter` |
| 13 | Density Converter | `density-converter` |
| 14 | Cooking Measurement Converter | `cooking-measurement-converter` |
| 15 | Data Storage Converter | `data-storage-converter` |
| 16 | Data Transfer Speed Converter | `data-transfer-speed-converter` |
| 17 | Download Time Estimator | `download-time-estimator` |
| 18 | Number Base Converter | `number-base-converter` |
| 19 | Roman Numeral Converter | `roman-numeral-converter` |
| 20 | Paper Size Converter | `paper-size-converter` |

These 20 entries are a Batch 6 release candidate on `feat/batch-6-unit-measurement-converters`; they become active production tools only after merge and deployment. Release-candidate total: 135; current production main remains 115 until release.
