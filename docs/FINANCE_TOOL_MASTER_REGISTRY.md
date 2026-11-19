# FinPulse Hub — Master Tool Registry

- **Version:** 3.0
- **Updated:** 2026-11-19
- **Verified production portfolio:** 220 active tools (Batches 1–11 deployed)
- **Latest production commit:** `63822f8f43e0e1eb21ca85d0969b7ecb05e52313` (Batch 11 deployed)
- **Repository:** apex-global-labs/FinPulse-Hub

> This file retains its historical filename for compatibility. It is now the master registry for all FinPulse Hub tools, not only finance calculators.

## Portfolio summary

| Family | Count | Registry source |
|---|---:|---|
| Financial calculators | 45 | `app.js` |
| Basic mathematics | 25 | `math-tools.js` |
| Advanced mathematics & statistics | 20 | `advanced-math-tools.js` |
| Date & time | 25 | `date-time-tools.js` |
| Unit & data converters | 20 | `unit-converter-tools.js` |
| Developer & Text utilities | 20 | `developer-tools.js` |
| Batch 8 Developer wrap-up | 5 | `education-lifestyle-tools.js` |
| Education & Study | 12 | `education-lifestyle-tools.js` |
| Home & Construction | 3 | `education-lifestyle-tools.js` |
| Lifestyle & Construction Part 2 | 15 | `lifestyle-tools.js` |
| Health & Wellness Part 1 | 15 | `health-activity-tools.js` |
| Health & Wellness Part 2 | 15 | `health-wellness-tools.js` |
| **Verified production total** | **220** | |

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
- PR #34 CI Run #44491064031: Formula + Smoke + Regression 214/214 passed; API 1/1 passed; Playwright Browser 7/7 passed.
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

These 20 entries were merged in PR #34 as `54539bb522743a627f154708d496c87233619334` and are active in production. Main CI #44492089059 and Pages deployment #44492088958 succeeded.


## 6. Developer & Text Utilities — 20 (Batch 7 PR candidate)

| # | Tool | Stable ID |
|---:|---|---|
| 1 | Word Counter | `word-counter` |
| 2 | Character Counter | `character-counter` |
| 3 | Sentence Counter | `sentence-counter` |
| 4 | Paragraph Counter | `paragraph-counter` |
| 5 | Reading Time Calculator | `reading-time-calculator` |
| 6 | Case Converter | `case-converter` |
| 7 | Text Reverser | `text-reverser` |
| 8 | Duplicate Line Remover | `duplicate-line-remover` |
| 9 | Text Compare / Diff Tool | `text-compare-diff` |
| 10 | Whitespace Cleaner | `whitespace-cleaner` |
| 11 | Line Sorter | `line-sorter` |
| 12 | Text-to-Slug Generator | `text-to-slug-generator` |
| 13 | HTML Entity Encoder / Decoder | `html-entity-encoder-decoder` |
| 14 | URL Encoder / Decoder | `url-encoder-decoder` |
| 15 | Base64 Encoder / Decoder | `base64-encoder-decoder` |
| 16 | JSON Formatter & Validator | `json-formatter-validator` |
| 17 | HTML Formatter | `html-formatter` |
| 18 | CSS Formatter | `css-formatter` |
| 19 | JavaScript Formatter | `javascript-formatter` |
| 20 | HTML/CSS/JS Minifier | `html-css-js-minifier` |

These 20 tools are on `feat/batch-7-developer-text-utilities`, based on production commit `54539bb522743a627f154708d496c87233619334`. They are a PR candidate only until checks, merge and deployment succeed. They do not overlap with the existing date/time timestamp converters or Batch 6 converter IDs.


## Batch 7 — Developer & Text Utilities (production)

PR #35 merged and deployed. Production count is 155, including 20 Developer & Text utilities registered by `developer-tools.js`.

## Batch 8 — Developer wrap-up + Education & Everyday Lifestyle Part 1 (production)

| # | Tool | Stable ID |
|---:|---|---|
| 1 | UUID Generator | `uuid-generator` |
| 2 | Regex Tester (safe local matching) | `regex-tester` |
| 3 | Color Code Converter (HEX/RGB/HSL) | `color-code-converter` |
| 4 | Unix Timestamp Unit Helper | `unix-timestamp-unit-helper` |
| 5 | Markdown Previewer | `markdown-previewer` |
| 6 | GPA Calculator | `gpa-calculator` |
| 7 | CGPA Calculator | `cgpa-calculator` |
| 8 | Grade Calculator | `grade-calculator` |
| 9 | Exam Percentage Calculator | `exam-percentage-calculator` |
| 10 | Marks Required Calculator | `marks-required-calculator` |
| 11 | Weighted Grade Calculator | `weighted-grade-calculator` |
| 12 | Final Exam Grade Calculator | `final-exam-grade-calculator` |
| 13 | Semester GPA Planner | `semester-gpa-planner` |
| 14 | Attendance Percentage Calculator | `attendance-percentage-calculator` |
| 15 | Study Time Planner | `study-time-planner` |
| 16 | Reading Schedule Planner | `reading-schedule-planner` |
| 17 | Assignment Grade Tracker | `assignment-grade-tracker` |
| 18 | Concrete Volume Calculator | `concrete-volume-calculator` |
| 19 | Brick Quantity Estimator | `brick-quantity-estimator` |
| 20 | Cement / Sand / Aggregate Estimator | `cement-sand-aggregate-estimator` |

Batch 8 adds exactly 20 unique IDs in `education-lifestyle-tools.js`: 5 developer wrap-up tools, 12 education/study tools and 3 construction estimators. PR #39 merged as `ee06c524c7f4ce77109881d6fa877991c5d7851a`; main CI #44497401581 and Pages deployment #44497401612 succeeded. Production total is 175.


## Batch 9 — Lifestyle, Construction, Energy & Misc Part 2 (candidate)

| # | Tool | Stable ID |
|---:|---|---|
| 1 | Paint Quantity Calculator | `paint-quantity-calculator` |
| 2 | Tile Quantity Calculator | `tile-quantity-calculator` |
| 3 | Flooring Material Estimator | `flooring-material-estimator` |
| 4 | Roofing Area Calculator | `roofing-area-calculator` |
| 5 | Room Area Calculator | `room-area-calculator` |
| 6 | Wall Area Calculator | `wall-area-calculator` |
| 7 | Gravel Volume Calculator | `gravel-volume-calculator` |
| 8 | Fence Material Estimator | `fence-material-estimator` |
| 9 | Fuel Cost Calculator | `fuel-cost-calculator` |
| 10 | Electricity Bill Estimator (manual tariff) | `electricity-bill-estimator` |
| 11 | Bill Split Calculator | `bill-split-calculator` |
| 12 | Unit Price Comparator | `unit-price-comparator` |
| 13 | Sales Commission Calculator | `sales-commission-calculator` |
| 14 | Study Topic Organizer (classroom use) | `study-topic-organizer` |
| 15 | QR Code Generator | `qr-code-generator` |

Batch 9 adds 15 unique IDs through `lifestyle-tools.js`; the QR generator uses the vendored MIT-licensed qrcodejs library and produces the image locally. Electricity pricing is manual only; construction quantities are estimates; Study Topic Organizer groups topics deterministically without random selection. Production total after Batch 9: 190; Batch 10 candidate total: 205.


## Batch 10 — Health & Wellness Part 1 (15)

| # | Tool | Stable ID |
|---:|---|---|
| 1 | Sleep Duration Calculator | `sleep-duration-calculator` |
| 2 | Bedtime Planner | `bedtime-planner` |
| 3 | Wake-up Time Planner | `wake-up-time-planner` |
| 4 | Sleep Schedule Consistency Tracker | `sleep-schedule-consistency-tracker` |
| 5 | Sleep Log Summary | `sleep-log-summary` |
| 6 | Running Pace Calculator | `running-pace-calculator` |
| 7 | Running Speed Calculator | `running-speed-calculator` |
| 8 | Distance-Time-Pace Calculator | `distance-time-pace-calculator` |
| 9 | Race Finish Time Predictor | `race-finish-time-predictor` |
| 10 | Race Split Calculator | `race-split-calculator` |
| 11 | Walking Pace Calculator | `walking-pace-calculator` |
| 12 | Hiking Time Estimator | `hiking-time-estimator` |
| 13 | Cycling Speed Calculator | `cycling-speed-calculator` |
| 14 | Cycling Time & Distance Calculator | `cycling-time-distance-calculator` |
| 15 | Swimming Pace Calculator | `swimming-pace-calculator` |

All Batch 10 tools provide informational time, distance, pace, speed and schedule arithmetic only. Each page discloses assumptions, scientific limitations and a medical disclaimer; no diagnosis, treatment, weight goal or calorie target is provided.


## Batch 11 — Health & Wellness Part 2 (candidate; 15)

| # | Tool | Stable ID |
|---:|---|---|
| 1 | Swimming Split Calculator | `swimming-interval-planner` |
| 2 | Rowing Pace Calculator | `rowing-pace-calculator` |
| 3 | Session Duration Calculator | `exercise-session-duration-calculator` |
| 4 | Interval Schedule Calculator (time arithmetic only) | `interval-training-timer` |
| 5 | Gap Duration Calculator | `rest-interval-planner` |
| 6 | Time Block Planner | `workout-session-planner-time-only` |
| 7 | Weekly Time Log Summary | `weekly-activity-minutes-tracker` |
| 8 | User-Defined Progress Calculator | `activity-goal-progress-tracker` |
| 9 | Step-to-Distance Converter | `step-to-distance-converter` |
| 10 | Distance-to-Step Estimator | `distance-to-step-estimator` |
| 11 | Elevation Gain Rate Calculator | `elevation-gain-rate-calculator` |
| 12 | Hiking Elevation Pace Calculator | `hiking-elevation-pace-calculator` |
| 13 | Pattern Duration Calculator | `breathing-exercise-timer` |
| 14 | Meditation Session Planner | `meditation-session-planner` |
| 15 | Hydration Log Tracker (user-entered records only) | `hydration-log-tracker` |

Batch 11 tools use user-entered values only. No activity, breathing or hydration target is recommended; no medical assessment is provided. The interval and breathing tools calculate a schedule duration and do not operate a live timer or provide technique instructions.


## Batch 10 production evidence — 2026-11-19

- Main CI #44504320519: 261/261 formula/smoke/regression, API 1/1, Browser 11/11.
- Pages deployment #44504320744: success. Its published artifact has homepage count 205 and 205 sitemap URLs.
- Production Lighthouse #44504380240: mobile Performance 83, desktop 100, Accessibility 100, SEO 100, CLS 0.000 / 0.0089.


**Batch 11 display-label safety note:** Activity-adjacent roadmap entries are exposed as neutral time, measurement and record utilities. They do not provide workout programming, exercise targets, breathing techniques or live countdowns; stable route IDs are preserved.


## Final Batch 11 production release — 2026-11-19

- PR #42 merged by squash as production commit `63822f8f43e0e1eb21ca85d0969b7ecb05e52313`.
- Candidate Finance CI [#44510604397](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44510604397) and Candidate Lighthouse [#44510604392](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44510604392) both succeeded.
- Main CI [#44511324462](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44511324462) succeeded: syntax checks passed; 275/275 formula, smoke and regression tests; Frankfurter API 1/1; Playwright browser suite 13/13. The final browser audit rendered all 220 unique routes and passed axe WCAG 2.1 A/AA checks.
- GitHub Pages deployment [#44511324424](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44511324424) succeeded. Published artifact `github-pages` (artifact ID `14522372777`) was inspected: it contains 220 sitemap tool URLs, a homepage with the 220-tool counter, and `health-wellness-tools.js`.
- Production Lighthouse [#44511405172](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44511405172) succeeded. Mobile: Performance 95, Accessibility 100, Best Practices 96, SEO 100, CLS 0.000, LCP 1,539.8 ms, TBT 253 ms. Desktop: Performance 100, Accessibility 100, Best Practices 96, SEO 100, CLS 0.0094, LCP 384.3 ms, TBT 0 ms.
- Verified portfolio: 220/220 unique tools; homepage counter, registry and canonical sitemap all align. Latest verified production commit: `63822f8f43e0e1eb21ca85d0969b7ecb05e52313`.
