# Batch 2 (#41–50) Source Schema, Runtime Parity & Numerical Regression — 2026-11-27

**Repository:** apex-global-labs/FinPulse-Hub  
**Branch:** `feat/seven-language-translation-engine-phase-1`  
**PR:** #73 — Open / Draft / Unmerged  
**Production main:** `240256f65f6cd69a154f1f81330d8f1002ef01d7` (unchanged)  
**Audit baseline:** `dade490de186106a2076ef862dae14d4b64353d3`

## Scope and source schema

| # | Tool ID | Source module | Runtime function |
|---:|---|---|---|
| 41 | `business-roi` | `app.js` | `Core.businessROI` |
| 42 | `cash-flow` | `app.js` | `Core.cashFlowProjection` |
| 43 | `rental-yield` | `app.js` | `Core.rentalYieldCalculator` |
| 44 | `emergency-fund` | `app.js` | `Core.emergencyFundCalculator` |
| 45 | `net-worth` | `app.js` | `Core.netWorthCalculator` |
| 46 | `basic-arithmetic` | `math-tools.js` | `FinPulseMath.arithmetic` |
| 47 | `fraction` | `math-tools.js` | `FinPulseMath.fraction` |
| 48 | `mixed-number` | `math-tools.js` | `FinPulseMath.mixed` |
| 49 | `decimal-fraction` | `math-tools.js` | `FinPulseMath.decimalFraction` |
| 50 | `ratio` | `math-tools.js` | `FinPulseMath.ratio` |

- All 10 authoritative English source records are marked `source-record-complete` / `complete`.
- Six target locales (`hi`, `ar`, `ur`, `zh-CN`, `ja`, `ru`) have **60/60 slots still `not-started`**. No translation was drafted, approved or activated in this audit.
- Stable IDs, source input order, formula text, units, numeric constraints and source strings are preserved.

## Runtime and Registry parity

- Compared canonical Catalogue order and source module with the calculation registry.
- Checked all 10 runtime function names against the actual app/tool registration and engine call sites.
- Checked registry input key order against source tool input definitions.
- Confirmed formula, constraints and output declarations exist for each registry record.
- Finance tools #41–45 are wired through `app.js` to `finance-core.js`; math tools #46–50 are registered in `math-tools.js` and call `math-core.js`.
- No calculation function, numeric default, formula or locale activation was changed.

## Numerical regression coverage added

Added `tests/calculation-batch-41-50.test.cjs` and included it in `npm test`:
- Catalogue order, source module, runtime mapping, input key order and registry completeness for all 10 tools.
- Independent reference arithmetic for ROI, monthly cash compounding, rental yield and emergency-fund targets.
- Net-worth asset/liability totals, negative net worth and invalid balances.
- Arithmetic operations and divide-by-zero rejection.
- Fraction sign normalization, negative mixed-number values, bounded decimal-to-fraction approximation and zero-term ratio behavior.
- Invalid, non-finite, out-of-range and boundary inputs.

The first CI attempt exposed a strict floating-point assertion (`27.500000000000004` versus `27.5`). It was corrected to use a numerical tolerance in commit `dade490de186106a2076ef862dae14d4b64353d3`. On that head, `npm run check`, `npm test`, and the live Frankfurter API step completed successfully. Browser tests and Lighthouse/CLS were still running when this report was prepared.

The 10 registry entries are marked `regression-verified` based on the successful Node regression step. This status records calculation-source and numerical regression evidence only; it does not mean six-locale translations are complete or that the full browser/performance Release Gate is complete.

## Release boundary

PR #73 remains Draft and unmerged. No locale activation, merge or production deployment was performed. Production `main` and GitHub Pages remain unchanged. Continue with six-locale translation drafts and schema completeness for #41–50, followed by seven-locale RTL/LTR browser rendering, accessibility audits, fresh Finance CI and Lighthouse/CLS on the exact resulting head.
