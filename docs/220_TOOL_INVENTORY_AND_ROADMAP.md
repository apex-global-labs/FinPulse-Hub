# FinPulse Hub — 220-Tool Inventory & Batch Implementation Roadmap

- **Decision:** Approved target of 220 total tools on 2026-11-19
- **Baseline:** Preserve all 45 existing financial calculators without renaming or removing their stable route IDs
- **Expansion:** 175 new tools across four new top-level categories
- **Hosting / stack:** GitHub Pages, static HTML/CSS/Vanilla JS, free-first, no paid backend or mandatory paid APIs
- **Status:** In progress — 90 of 175 expansion tools are implemented and deployed; 85 planned additions remain

## 1. Target portfolio

| Category | Existing | New | Final total |
|---|---:|---:|---:|
| Financial Calculators | 45 | 0 | 45 |
| Health & Wellness | 0 | 30 | 30 |
| Math & Statistics | 0 | 45 | 45 |
| Date, Time & Converters | 0 | 45 | 45 |
| Developer, Education & Lifestyle | 0 | 55 | 55 |
| **Total** | **45** | **175** | **220** |

The 45 financial calculators remain the production baseline. A further 90 tools are implemented and deployed (25 Basic Mathematics, 20 Advanced Mathematics & Statistics, 25 Date & Time, 20 Unit & Data Converters). The remaining 85 expansion tools are planned additions only. A tool is counted as delivered only after implementation, formula/behavior tests, browser and accessibility checks, SEO metadata, sitemap registration and successful production deployment.

## 2. Existing 45 — preserve exactly

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
20. 401k Contribution Calculator
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
37. Freelance Project Pricing Calculator
38. Freelancer Net Income After Costs Calculator
39. Markup Calculator
40. Break-even Calculator
41. Business ROI Calculator
42. Cash Flow Projection Calculator
43. Rental Yield Calculator
44. Emergency Fund Calculator
45. Net Worth Calculator

**Preservation rules**
- Keep all current IDs/routes stable, including `?tool=` route keys.
- Do not replace or silently rename an existing calculator.
- Avoid counting overlapping modes as separate tools. For example, Tip, Discount, Percentage, Currency Converter and the existing financial calculators remain single existing entries.
- Any future refactor must pass the full 115-tool formula, smoke, browser and regression suite.

## 3. New 175-tool inventory by batch

### Batch 1 — Basic Mathematics (25)

- Basic Arithmetic Calculator
- Fraction Calculator
- Mixed Number Calculator
- Decimal ↔ Fraction Converter
- Ratio Calculator
- Proportion Calculator
- Average Calculator
- Percentage Change Calculator
- Percent Error Calculator
- Rounding Calculator
- Significant Figures Calculator
- Scientific Notation Converter
- Exponent Calculator
- Square Root Calculator
- Cube Root Calculator
- Nth Root Calculator
- Factorial Calculator
- GCD Calculator
- LCM Calculator
- Prime Number Checker
- Prime Factorization Calculator
- Modulo / Remainder Calculator
- Pythagorean Theorem Calculator
- Circle Calculator
- Triangle Area Calculator

### Batch 2 — Advanced Math & Statistics (20)

- Linear Equation Solver
- Quadratic Equation Solver
- Simultaneous Equations Solver
- Polynomial Calculator
- Logarithm Calculator
- Matrix Operations Calculator
- Matrix Determinant Calculator
- Matrix Inverse Calculator
- Complex Number Calculator
- Arithmetic & Geometric Sequence Calculator
- Series Sum Calculator
- Permutation Calculator
- Combination Calculator
- Probability Calculator
- Mean / Median / Mode Calculator
- Variance & Standard Deviation Calculator
- Z-Score Calculator
- Correlation Calculator
- Linear Regression Calculator
- Confidence Interval Calculator

### Batch 3 — Date & Time (25)

- Age Calculator (calendar age)
- Date Difference Calculator
- Add Days to Date Calculator
- Subtract Days from Date Calculator
- Business Days Calculator
- Working Days Calculator
- Week Number Calculator
- Day of Year Calculator
- Days in Month Calculator
- Leap Year Checker
- Time Duration Calculator
- Time Difference Calculator
- Add Time Calculator
- Subtract Time Calculator
- Countdown Calculator
- Event Date Countdown
- Date to Unix Timestamp Converter
- Unix Timestamp to Date Converter
- World Clock Converter
- Time Zone Converter
- UTC Offset Converter
- Meeting Time Planner
- Calendar Month View Tool
- Recurring Date Calculator
- School / Work Term Duration Calculator

### Batch 4 — Unit, Measurement & Data Converters (20)

- Length Converter
- Weight / Mass Converter
- Temperature Converter
- Area Unit Converter
- Volume Unit Converter
- Speed Converter
- Pressure Converter
- Energy Converter
- Power Converter
- Frequency Converter
- Angle Converter
- Fuel Economy Converter
- Density Converter
- Cooking Measurement Converter
- Data Storage Converter (B/KB/MB/GB/TB)
- Data Transfer Speed Converter
- Download Time Estimator
- Number Base Converter (binary/octal/decimal/hex)
- Roman Numeral Converter
- Paper Size Converter

### Batch 5 — Developer & Text Tools (25)

- Word Counter
- Character Counter
- Sentence Counter
- Paragraph Counter
- Reading Time Calculator
- Case Converter
- Text Reverser
- Duplicate Line Remover
- Text Compare / Diff Tool
- Whitespace Cleaner
- Line Sorter
- Text-to-Slug Generator
- HTML Entity Encoder / Decoder
- URL Encoder / Decoder
- Base64 Encoder / Decoder
- JSON Formatter & Validator
- HTML Formatter
- CSS Formatter
- JavaScript Formatter
- HTML/CSS/JS Minifier
- UUID Generator
- Regex Tester (safe local matching)
- Color Code Converter (HEX/RGB/HSL)
- Unix Timestamp Helper
- Markdown Previewer

### Batch 6 — Health & Wellness (30)

- Sleep Duration Calculator
- Bedtime Planner
- Wake-up Time Planner
- Sleep Schedule Consistency Tracker
- Sleep Log Summary
- Running Pace Calculator
- Running Speed Calculator
- Distance-Time-Pace Calculator
- Race Finish Time Predictor
- Race Split Calculator
- Walking Pace Calculator
- Hiking Time Estimator
- Cycling Speed Calculator
- Cycling Time & Distance Calculator
- Swimming Pace Calculator
- Swimming Interval Planner
- Rowing Pace Calculator
- Exercise Session Duration Calculator
- Interval Training Timer
- Rest Interval Planner
- Workout Session Planner (time only)
- Weekly Activity Minutes Tracker
- Activity Goal Progress Tracker
- Step-to-Distance Converter (user-entered stride)
- Distance-to-Step Estimator (user-entered stride)
- Elevation Gain Rate Calculator
- Hiking Elevation Pace Calculator
- Breathing Exercise Timer
- Meditation Session Planner
- Hydration Log Tracker (user-entered records only)

### Batch 7 — Education, Home & Lifestyle (30)

- GPA Calculator
- CGPA Calculator
- Grade Calculator
- Exam Percentage Calculator
- Marks Required Calculator
- Weighted Grade Calculator
- Final Exam Grade Calculator
- Semester GPA Planner
- Attendance Percentage Calculator
- Study Time Planner
- Reading Schedule Planner
- Assignment Grade Tracker
- Concrete Volume Calculator
- Brick Quantity Estimator
- Cement / Sand / Aggregate Estimator
- Paint Quantity Calculator
- Tile Quantity Calculator
- Flooring Material Estimator
- Roofing Area Calculator
- Room Area Calculator
- Wall Area Calculator
- Gravel Volume Calculator
- Fence Material Estimator
- Fuel Cost Calculator
- Electricity Bill Estimator (manual tariff)
- Bill Split Calculator
- Unit Price Comparator
- Sales Commission Calculator
- Random Number Generator (non-gambling use)
- QR Code Generator

## 4. Batch schedule

| Batch | Scope | New tools | Running total |
|---|---|---:|---:|
| 1 | Basic Mathematics | 25 | 70 |
| 2 | Advanced Math & Statistics | 20 | 90 |
| 3 | Date & Time | 25 | 115 |
| 4 | Unit, Measurement & Data Converters | 20 | 135 |
| 5 | Developer & Text Tools | 25 | 160 |
| 6 | Health & Wellness | 30 | 190 |
| 7 | Education, Home & Lifestyle | 30 | 220 |

This order starts with deterministic, low-dependency tools, then adds more complex math, converters, developer utilities and finally wellness/lifestyle estimators. The sequence can be adjusted only when a real dependency or quality issue requires it; the approved final portfolio count remains 220.

## 5. Required implementation standard for every tool

1. **Unique task and route:** one distinct user task per tool; stable unique ID; no duplicate search-intent pages.
2. **Formula/logic specification:** definition, inputs, units, formula or algorithm, worked example, edge cases, rounding and limitations documented before coding.
3. **Input validation:** finite values, sensible ranges, empty/invalid states, zero and boundary cases, keyboard support and reset.
4. **Useful output:** primary result, detailed breakdown where appropriate, copy action, clear/reset action, and chart only when it improves understanding.
5. **Responsive accessible UI:** mobile-first layout, semantic labels, keyboard navigation, visible focus, accessible result announcements and WCAG 2.1 A/AA automated checks.
6. **SEO:** unique title, description, H1, canonical URL, helpful instructions, examples, formula/assumptions, FAQs and internal links. Avoid thin template pages.
7. **Automated tests:** deterministic unit tests, edge-case tests, registry uniqueness, route/sitemap parity, browser smoke tests and regression tests.
8. **Privacy/security:** calculations run locally where possible; never transmit calculator inputs to analytics; escape user-controlled text; no secrets in client code.
9. **Release evidence:** branch CI green, PR review, merge, main CI green, Pages deployment success, production route check and updated project status.

## 6. Technical architecture

- Retain the existing static site and shared UI architecture. Do not introduce a framework or backend merely to increase tool count.
- Keep pure calculation/utility functions separate from DOM rendering.
- Use small shared modules by domain: math, statistics, dates, units, text/developer, wellness, education and home estimates.
- Store tool metadata in one registry and derive homepage cards, category filters, search, route validation and sitemap from that source where practical.
- Lazy-load domain modules when needed; keep the initial page light.
- External data is optional only. Every dependent feature needs a free/manual fallback, visible source and update timestamp. Core functionality must survive API outages.
- Use no mandatory paid APIs, paid hosting, paid database or paid runtime service.

## 7. Category-specific safeguards and limits

- **Financial:** preserve current educational-estimate disclaimers. Jurisdictional tax and payroll data must remain dated, sourced and versioned.
- **Health & Wellness:** non-diagnostic and informational only. Do not add BMI, body-fat, ideal-weight, weight-loss, calorie-restriction, body-comparison or medical-diagnosis tools. Do not present hydration logs or exercise estimates as medical prescriptions. Do not add medication dosing or alcohol/substance calculators.
- **Math & Statistics:** disclose assumptions and distinguish population/sample formulas; test numerical stability and domain errors.
- **Date & Time / Converters:** explicitly handle leap years, daylight-saving transitions, time zones, locale and unit precision. Do not claim a time zone is fixed year-round.
- **Developer tools:** process user text locally; do not send pasted code or data to third-party services. Regex testing must avoid unsafe catastrophic patterns where feasible.
- **Education:** show formula/grade assumptions; do not imply a grade prediction is guaranteed.
- **Home & Lifestyle:** label quantities as estimates and expose waste/coverage assumptions; electricity estimator requires user-entered tariff and must not invent a tariff.
- Random number utility is for ordinary non-gambling use only.

## 8. Batch execution workflow

For each batch:
1. Re-check latest `main`, open PRs, branch status and current workflows.
2. Confirm the planned IDs do not already exist in the live registry, sitemap or another open branch.
3. Write concise specifications and independent expected-value fixtures.
4. Implement the batch in a dedicated branch and PR; do not push unreviewed feature work straight to production.
5. Run syntax/static checks, domain unit tests, complete existing 45-tool regression suite, registry/sitemap parity, Playwright desktop/mobile and axe checks.
6. Fix every blocker before merge. Do not merge a failing or stale PR.
7. After merge, verify main CI, GitHub Pages deployment and live routes; record exact commit/run IDs and test counts.
8. Update the registry, sitemap, category navigation, SEO content and project status together.
9. Begin the next batch only after the previous batch is stable.

## 9. Proposed milestones and exit criteria

- **M0 — Planning baseline:** this inventory reviewed; existing 45 verified and frozen.
- **M1 — Batches 1–2:** 45 math/statistics tools added; all formula and numerical edge-case tests pass.
- **M2 — Batches 3–4:** 45 date/time/converter tools added; time-zone and unit conversion fixtures pass.
- **M3 — Batch 5:** 25 developer/text tools added; local processing and security contracts pass.
- **M4 — Batch 6:** 30 wellness tools added; safety review and non-diagnostic wording pass.
- **M5 — Batch 7:** 30 education/home/lifestyle tools added; estimate assumptions and test fixtures pass.
- **M6 — Final 220 audit:** exactly 220 unique active tools; all routes, homepage links, categories and sitemap match; full regression, browser, accessibility, SEO and deployment checks pass.

## 10. Acceptance checklist

- [ ] Exactly 220 active, unique tool IDs (45 preserved + 175 new).
- [ ] No duplicate tool or near-duplicate canonical search intent.
- [ ] Every tool has a documented calculation/behavior specification.
- [ ] Every formula/algorithm has expected-value and edge-case tests.
- [ ] Homepage, category navigation, search and direct routes work.
- [ ] Sitemap has exactly the published canonical tool routes.
- [ ] Desktop/mobile browser tests pass.
- [ ] Accessibility checks pass across all tool views.
- [ ] No serious console errors, broken links or unsafe external data handling.
- [ ] GitHub Pages deployment succeeds and public routes are verified.
- [ ] Project state and implementation records include exact commit and workflow evidence.

## 11. Baseline audit notes (2026-11-19)

The planning review found that the production code's `app.js` contains 45 unique calculator registry entries. The repository is public, `main` is the default branch, and the connected GitHub account has admin/push/pull permissions. No open pull requests were returned by the repository-scoped open-PR search.

Documentation needs a separate consistency pass before or alongside the first implementation batch:
- `README.md` still describes 36 production calculators and says PR #21 is pending.
- `docs/FINANCE_TOOL_MASTER_REGISTRY.md` still says PR #21 merge/deployment is pending and has stale QA counts.
- `docs/PROJECT_STATE.md` has a stale Lighthouse sentence/metric block despite the newer metrics recorded in `docs/IMPLEMENTATION_STATUS.md`.
- `docs/TECHNICAL_ARCHITECTURE.md` still labels its architecture as proposed/not started, although the shared static architecture is already implemented.

These are documentation inconsistencies, not evidence that the production calculator set is missing. Reconcile them with current main/workflow evidence before making release claims.

## 12. Count validation

- Existing inventory: 45
- Planned new inventory: 175
- Planned final portfolio: 220


## 13. Updated execution order approved 2026-11-19

The following batch boundaries supersede the earlier batch numbering for execution. Keep all 115 current tools unchanged. Count each new tool only after its PR is approved, merged, main CI succeeds and Pages deployment is verified.

| New execution batch | Scope | New tools | Running total |
|---|---|---:|---:|
| Batch 6 | Unit, Measurement & Data Converters | 20 | 135 |
| Batch 7 | Developer & Text/Encoding Utilities | 20 | 155 |
| Batch 8 | Education & Everyday Lifestyle — Part 1 | 20 | 175 |
| Batch 9 | Lifestyle, Construction, Energy & Misc — Part 2 | 15 | 190 |
| Batch 10 | Health & Wellness — Part 1 | 15 | 205 |
| Batch 11 | Health & Wellness — Part 2 + final verification and doc sync | 15 | 220 |

**Batch 6 candidate IDs:** `length-converter`, `mass-converter`, `temperature-converter`, `area-converter`, `volume-converter`, `speed-converter`, `pressure-converter`, `energy-converter`, `power-converter`, `frequency-converter`, `angle-converter`, `fuel-economy-converter`, `density-converter`, `cooking-measurement-converter`, `data-storage-converter`, `data-transfer-speed-converter`, `download-time-estimator`, `number-base-converter`, `roman-numeral-converter`, `paper-size-converter`.

Every batch uses a dedicated feature branch and PR. Do not merge without the user's explicit approval. No unrelated side tasks or experiments are in scope until the 220-tool production release is complete.

### Batch 7–11 — Exact remaining 85-tool allocation

Batch 6 is now deployed and the 20-tool Batch 7 candidate below accounts for the next 20 of the remaining 85 planned additions. Once Batch 6 is merged and deployed, the remaining 85 tools below are divided into five batches of 15–20. Each roadmap item appears exactly once; IDs are to be assigned and checked against the live registry before implementation.

**Batch 7 — Developer & Text/Encoding Utilities (20; target total 155)**

1. Word Counter
2. Character Counter
3. Sentence Counter
4. Paragraph Counter
5. Reading Time Calculator
6. Case Converter
7. Text Reverser
8. Duplicate Line Remover
9. Text Compare / Diff Tool
10. Whitespace Cleaner
11. Line Sorter
12. Text-to-Slug Generator
13. HTML Entity Encoder / Decoder
14. URL Encoder / Decoder
15. Base64 Encoder / Decoder
16. JSON Formatter & Validator
17. HTML Formatter
18. CSS Formatter
19. JavaScript Formatter
20. HTML/CSS/JS Minifier

**Batch 8 — Developer wrap-up + Education & Everyday Lifestyle Part 1 (20; target total 175)**

1. UUID Generator
2. Regex Tester (safe local matching)
3. Color Code Converter (HEX/RGB/HSL)
4. Unix Timestamp Unit Helper (seconds ↔ milliseconds only; no date-string conversion)
5. Markdown Previewer
6. GPA Calculator
7. CGPA Calculator
8. Grade Calculator
9. Exam Percentage Calculator
10. Marks Required Calculator
11. Weighted Grade Calculator
12. Final Exam Grade Calculator
13. Semester GPA Planner
14. Attendance Percentage Calculator
15. Study Time Planner
16. Reading Schedule Planner
17. Assignment Grade Tracker
18. Concrete Volume Calculator
19. Brick Quantity Estimator
20. Cement / Sand / Aggregate Estimator

**Batch 9 — Lifestyle, Construction, Energy & Misc Part 2 (15; target total 190)**

1. Paint Quantity Calculator
2. Tile Quantity Calculator
3. Flooring Material Estimator
4. Roofing Area Calculator
5. Room Area Calculator
6. Wall Area Calculator
7. Gravel Volume Calculator
8. Fence Material Estimator
9. Fuel Cost Calculator
10. Electricity Bill Estimator (manual tariff)
11. Bill Split Calculator
12. Unit Price Comparator
13. Sales Commission Calculator
14. Random Number Generator (non-gambling use)
15. QR Code Generator

**Batch 10 — Health & Wellness Part 1 (15; target total 205)**

1. Sleep Duration Calculator
2. Bedtime Planner
3. Wake-up Time Planner
4. Sleep Schedule Consistency Tracker
5. Sleep Log Summary
6. Running Pace Calculator
7. Running Speed Calculator
8. Distance-Time-Pace Calculator
9. Race Finish Time Predictor
10. Race Split Calculator
11. Walking Pace Calculator
12. Hiking Time Estimator
13. Cycling Speed Calculator
14. Cycling Time & Distance Calculator
15. Swimming Pace Calculator

**Batch 11 — Health & Wellness Part 2 + Final Verification (15; target total 220)**

1. Swimming Interval Planner
2. Rowing Pace Calculator
3. Exercise Session Duration Calculator
4. Interval Training Timer
5. Rest Interval Planner
6. Workout Session Planner (time only)
7. Weekly Activity Minutes Tracker
8. Activity Goal Progress Tracker
9. Step-to-Distance Converter (user-entered stride)
10. Distance-to-Step Estimator (user-entered stride)
11. Elevation Gain Rate Calculator
12. Hiking Elevation Pace Calculator
13. Breathing Exercise Timer
14. Meditation Session Planner
15. Hydration Log Tracker (user-entered records only)

**Allocation check:** Batch 7 = 20, Batch 8 = 20, Batch 9 = 15, Batch 10 = 15, Batch 11 = 15; total remaining = 85. Together with the 20 Batch 6 converters, this reconciles the original 105-tool backlog. Health tools retain the safety exclusions in Section 7; no diagnosis, medication dosing, weight-loss or calorie-restriction tools may be introduced.

**Duplicate-intent guard:** The planned Unix Timestamp Unit Helper is limited to seconds↔milliseconds scaling and epoch-unit validation. It must not duplicate the existing Date to Unix Timestamp or Unix Timestamp to Date tools; if the distinction cannot be maintained, absorb it into the existing date/time tools and replace it only with an unused roadmap item after a documented duplicate audit.


## Release status update — 2026-11-19

Batch 7 (PR #35) is merged and deployed; current production count is 155. Batch 8 feature branch `feat/batch-8-education-everyday-lifestyle` implements the 20 approved items in Section 13 and targets 175. It remains a release candidate until automated CI and PR review complete.
