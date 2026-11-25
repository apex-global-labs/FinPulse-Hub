# Batch 31–60 Source Extraction, Runtime Parity & Completeness Audit

**Audit date:** 2026-11-25  
**Branch:** `feat/seven-language-translation-engine-phase-1`  
**Source-data commit:** `1ecf5d633b64a3c62a14beb8f0e7fd4097a72ca8`  
**PR:** #73 (open, draft, unmerged)

## Result

**Source extraction: COMPLETE (30/30). Runtime parity: COMPLETE (10/10 for tools 31–40).** This is an English-source completeness milestone, not translation or release acceptance.

The 20 previously incomplete records (41–60) have now been populated in `translations/tool-content.json` with description, input labels, result heading/summary/metrics/breakdown, formula explanation, ordered steps, assumptions, limitations, FAQs, SEO title/meta/H1/introduction/FAQ, error messages and recovery hints, accessibility labels, and guide steps/sections. All six target locale records remain `not-started` and empty; English fallback remains active.

## Tools 41–60 extracted

| # | Tool ID | Runtime / calculation evidence |
|---:|---|---|
| 41 | business-roi | `app.js` → `Core.businessROI`; `finance-core.js` |
| 42 | cash-flow | `app.js` → `Core.cashFlowProjection`; `finance-core.js` |
| 43 | rental-yield | `app.js` → `Core.rentalYieldCalculator`; `finance-core.js` |
| 44 | emergency-fund | `app.js` → `Core.emergencyFundCalculator`; `finance-core.js` |
| 45 | net-worth | `app.js` → `Core.netWorthCalculator`; `finance-core.js` |
| 46 | basic-arithmetic | `math-tools.js` → `FinPulseMath.arithmetic`; `math-core.js` |
| 47 | fraction | `math-tools.js` → `FinPulseMath.fraction`; `math-core.js` |
| 48 | mixed-number | `math-tools.js` → `FinPulseMath.mixed`; `math-core.js` |
| 49 | decimal-fraction | `math-tools.js` → `FinPulseMath.decimalFraction`; `math-core.js` |
| 50 | ratio | `math-tools.js` → `FinPulseMath.ratio`; `math-core.js` |
| 51 | proportion | `math-tools.js` → `FinPulseMath.proportion`; `math-core.js` |
| 52 | average | `math-tools.js` → `FinPulseMath.average`; `math-core.js` |
| 53 | percentage-change | `math-tools.js` → `FinPulseMath.percentageChange`; `math-core.js` |
| 54 | percent-error | `math-tools.js` → `FinPulseMath.percentError`; `math-core.js` |
| 55 | rounding | `math-tools.js` → `FinPulseMath.roundTo`; `math-core.js` |
| 56 | significant-figures | `math-tools.js` → `FinPulseMath.significant`; `math-core.js` |
| 57 | scientific-notation | `math-tools.js` → `FinPulseMath.scientific`; `math-core.js` |
| 58 | exponent | `math-tools.js` → `FinPulseMath.power`; `math-core.js` |
| 59 | square-root | `math-tools.js` → `FinPulseMath.nthRoot(value, 2)`; `math-core.js` |
| 60 | cube-root | `math-tools.js` → `FinPulseMath.nthRoot(value, 3)`; `math-core.js` |

The Math source guide/formula descriptions were cross-checked against the actual calculation implementations, including integer/range checks, denominator handling, zero-denominator behavior, finite-number checks, rounding modes and negative-root domain rules. The business/finance source records were cross-checked against the runtime input keys, output metrics and the corresponding Finance Core function signatures and calculation notes.

## Runtime parity: tools 31–40

| # | Tool ID | Runtime function | Parity result / material constraints |
|---:|---|---|---|
| 31 | paycheck | `Core.paycheck` | Input keys and gross/net formula align. Runtime also enforces positive overtime multiplier, rates ≤100%, and fixed deductions ≤ gross pay. |
| 32 | payroll | `Core.payroll` | Employee × average gross pay, employer tax, per-employee benefits and other costs align. Employee count must be a positive integer; employer tax ≤100%. |
| 33 | overtime | `Core.overtimePay` | Regular/overtime earnings and blended-rate outputs align. Overtime multiplier must be positive; legal eligibility is not determined. |
| 34 | discount | `Core.discountCalculator` | Sequential first discount → coupon → tax on discounted subtotal → shipping aligns. Discount/coupon/tax rates are each capped at 100%. |
| 35 | exchange-fees | `Core.exchangeFeeMarkup` | Fixed + percentage fee, customer rate after markup, recipient amount and FX spread align. Fee must remain below send amount; markup/fee rates ≤100%. |
| 36 | transfer-compare | `Core.internationalTransferCompare` | Both provider scenarios call the same fee/markup calculation; recipient amounts and absolute difference align. This compares hypothetical inputs, not live provider quotes. |
| 37 | freelance-project | `Core.freelanceProjectPricing` | Labor, base cost, contingency, gross-margin quote and profit align. Hourly rate positive; contingency ≤100%; target margin <90%. |
| 38 | freelancer-net-income | `Core.freelancerNetIncome` | Revenue less expenses, reserve on profit and net income align. Expenses cannot exceed revenue; reserve ≤100%; not jurisdiction-specific tax. |
| 39 | markup | `Core.markupCalculator` | Markup amount, selling price and equivalent gross margin align. Markup is capped at 10,000%. |
| 40 | break-even | `Core.breakEvenCalculator` | Contribution, exact units, ceiling to whole units, revenue and total costs align. Selling price must exceed variable cost. |

## Completeness and protected-data checks

- Catalogue inventory remains 220 tools; Batch 31–60 contains the expected 30 unique IDs in order.
- Structural completeness check: **30/30** records contain all 13 source sections: metadata, description, inputs, results, explanations, FAQs, SEO, errors, accessibility and guide (plus the source identity fields).
- Each record includes a non-empty formula, ordered steps, FAQ, SEO meta description, accessibility control labels, guide steps and actionable error recovery.
- All six target locales remain draft-pending: **180/180 locale records are `not-started`**; no locale was activated or published.
- No calculation implementation, formula code, numeric defaults, currency codes, stable input IDs, tax data or runtime behavior was edited in the source-extraction commit. Only `translations/tool-content.json` changed.
- No merge or production deployment was performed.

## CI and remaining release gates

The prior audited head `1eb2643e7faac8fc31bd787dc0a83cb44725fb27` had successful Finance CI run #846 (run ID `45575201907`) and Candidate Lighthouse/CLS run #491 (run ID `45575201857`). Both jobs completed successfully, including desktop/mobile browser tests and mobile/desktop Lighthouse route audits. **These runs predate the source-data commit above and do not validate it.**

The source-data commit must receive its own Finance CI and Lighthouse/CLS runs. The full six-locale translation drafts, schema validator, protected-data regression, seven-locale browser/RTL/LTR/accessibility checks, and latest-head Lighthouse evidence remain pending. Do not treat this audit as release approval.

## Next sequence

1. Verify current-head Finance CI and Lighthouse/CLS after commit `1ecf5d6`; inspect test totals and failures.
2. Run the canonical schema validator and protected-data/completeness checks against the updated 220-tool catalogue.
3. Prepare complete six-locale drafts for Batch 31–60 while keeping every locale status at `draft` and preserving numeric/code fields.
4. Run seven-locale browser tests, Arabic/Urdu RTL, other locales LTR, accessibility audits and mobile/desktop Lighthouse/CLS.
5. Append exact current-head run IDs, test counts, failures and artifacts here.

**Status: Source content complete; translation and release validation pending.**


## Updated validation evidence — 2026-11-25 08:30 UTC

- Candidate Lighthouse/CLS run **#493** (run ID `45576550328`) completed successfully on the source-data commit `1ecf5d633b64a3c62a14beb8f0e7fd4097a72ca8`. All four audited routes passed the configured CLS ≤ 0.10 budget. Results:
  - Mobile homepage: Performance 96, Accessibility 96, Best Practices 96, SEO 100; CLS 0.000; LCP 2,722.9 ms; TBT 94 ms.
  - Mobile tool route: Performance 86, Accessibility 100, Best Practices 96, SEO 100; CLS 0.0307; LCP 4,229.8 ms; TBT 18 ms.
  - Desktop homepage: Performance 100, Accessibility 100, Best Practices 96, SEO 100; CLS 0.000; LCP 667.9 ms; TBT 0 ms.
  - Desktop tool route: Performance 99, Accessibility 100, Best Practices 96, SEO 100; CLS 0.0087; LCP 950.5 ms; TBT 0 ms.
  - Lighthouse report artifact ID: `15003932987`.
- Finance CI run **#848** (run ID `45576550639`) is still in progress. `npm run check`, `npm test`, Frankfurter API check and Playwright installation steps completed successfully; desktop/mobile browser tests remain in progress. No final CI pass or browser test total is claimed yet.
- The source extraction commit itself is the tested code/data head. Documentation-only follow-up commits do not change the calculator or translation JSON. The PR remains Draft/unmerged.
