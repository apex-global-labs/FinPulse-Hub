# Calculation Batch 37–40 QA Report — 2026-11-26

**Repository:** `apex-global-labs/FinPulse-Hub`  
**Branch:** `feat/seven-language-translation-engine-phase-1`  
**Source files:** `app.js`, `finance-core.js`  
**Registry:** `data/calculation-registry.json`  
**Regression test:** `tests/calculation-batch-37-40.test.cjs`

## Scope and exact runtime mapping

| Tool # | Tool ID | Runtime function | Status |
|---:|---|---|---|
| 37 | `freelance-project` | `Core.freelanceProjectPricing` | Extracted |
| 38 | `freelancer-net-income` | `Core.freelancerNetIncome` | Extracted |
| 39 | `markup` | `Core.markupCalculator` | Extracted |
| 40 | `break-even` | `Core.breakEvenCalculator` | Extracted |

Function names were checked against the registered handlers in `app.js` and implementation bodies in `finance-core.js`. These mappings are source-grounded; no function was inferred from the tool title.

## Extracted calculation rules

- **#37 Freelance Project Pricing:** labor = hours × hourly rate; base = labor + expenses; contingency = base × rate; total cost = base + contingency; quote = total cost ÷ (1 − target margin); profit = quote − total cost. Margin must be below 90%; contingency must not exceed 100%.
- **#38 Freelancer Net Income:** profit = revenue − expenses; reserve = profit × tax-reserve rate; net income = profit − reserve. Expenses cannot exceed revenue; reserve rate is 0–100%.
- **#39 Markup:** markup amount = cost × markup rate; selling price = cost + markup; gross margin = markup amount ÷ selling price. Markup is capped at 10,000%.
- **#40 Break-even:** contribution = selling price − variable cost; exact units = fixed costs ÷ contribution; required units = ceiling(exact units); revenue and total costs use whole units. Selling price must exceed variable cost.

## Regression coverage added

Five test cases were added:
1. Project quote, contingency and target-margin arithmetic.
2. Freelancer reserve applied to post-expense profit.
3. Markup percentage versus gross margin.
4. Break-even unit rounding and totals.
5. Invalid-input rejection for all four engines.

**Execution status:** Pending the Finance CI run for the resulting latest PR head. No test pass count is claimed until that run completes.

## Boundaries
- These four tools are calculation-metadata extracted, not parity-verified or release-approved.
- No calculation formulas or runtime code were changed.
- No translations were activated.
- No merge or production deployment was performed.

## Next
Run CI and confirm all five regression cases. Then continue calculation extraction with tools #41–45, while the separate Translation Workstream starts its not-started range #37–60.
