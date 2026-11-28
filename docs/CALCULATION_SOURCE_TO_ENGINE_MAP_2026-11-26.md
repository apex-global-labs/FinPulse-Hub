# Calculation Source-to-Engine Mapping — 2026-11-26

**Repository:** apex-global-labs/FinPulse-Hub  
**Branch:** `feat/seven-language-translation-engine-phase-1`  
**Audited candidate commit:** `89107489fcec517a0498a0f2f1dc4cc24d55a4e2`  
**Canonical inventory:** `translations/tool-catalogue.json` (220 IDs, 10 source modules)

## Mapping rules
- `source module` is the exact `sourceFile` value in the canonical 220-tool catalogue.
- A runtime function is recorded only where an audit explicitly names it; no function is inferred from a tool title.
- `function mapping pending` means inspect the tool registration/handler and engine implementation before claiming parity.
- This is a source-location inventory, not proof that all calculations have been extracted, parity-verified or regression-tested.

## Module distribution

| Source module | Tool count |
|---|---:|
| `app.js` | 45 |
| `math-tools.js` | 25 |
| `advanced-math-tools.js` | 20 |
| `date-time-tools.js` | 25 |
| `unit-converter-tools.js` | 20 |
| `developer-tools.js` | 20 |
| `education-lifestyle-tools.js` | 20 |
| `lifestyle-tools.js` | 15 |
| `health-activity-tools.js` | 15 |
| `health-wellness-tools.js` | 15 |

## 220-tool source map

| # | Tool ID | Source module | Runtime function | Mapping status |
|---:|---|---|---|---|
| 1 | `currency` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 2 | `mortgage` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 3 | `loan` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 4 | `emi` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 5 | `compound` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 6 | `percentage` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 7 | `tip` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 8 | `car` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 9 | `amortization` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 10 | `savings` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 11 | `freelance` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 12 | `margin` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 13 | `affordability` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 14 | `payoff` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 15 | `refinance` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 16 | `personal-loan` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 17 | `student-loan` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 18 | `simple-interest` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 19 | `retirement` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 20 | `401k` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 21 | `ira` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 22 | `inflation` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 23 | `cd` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 24 | `apy` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 25 | `tax` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 26 | `income-tax` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 27 | `sales-tax` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 28 | `vat-gst` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 29 | `tax-refund` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 30 | `salary` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 31 | `paycheck` | `app.js` | `Core.paycheck` | Function named in source parity audit |
| 32 | `payroll` | `app.js` | `Core.payroll` | Function named in source parity audit |
| 33 | `overtime` | `app.js` | `Core.overtimePay` | Function named in source parity audit |
| 34 | `discount` | `app.js` | `Core.discountCalculator` | Function named in source parity audit |
| 35 | `exchange-fees` | `app.js` | `Core.exchangeFeeMarkup` | Function named in source parity audit |
| 36 | `transfer-compare` | `app.js` | `Core.internationalTransferCompare` | Function named in source parity audit |
| 37 | `freelance-project` | `app.js` | `Core.freelanceProjectPricing` | Function named in source parity audit |
| 38 | `freelancer-net-income` | `app.js` | `Core.freelancerNetIncome` | Function named in source parity audit |
| 39 | `markup` | `app.js` | `Core.markupCalculator` | Function named in source parity audit |
| 40 | `break-even` | `app.js` | `Core.breakEvenCalculator` | Function named in source parity audit |
| 41 | `business-roi` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 42 | `cash-flow` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 43 | `rental-yield` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 44 | `emergency-fund` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 45 | `net-worth` | `app.js` | Pending exact code inspection | Source module mapped; function pending |
| 46 | `basic-arithmetic` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 47 | `fraction` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 48 | `mixed-number` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 49 | `decimal-fraction` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 50 | `ratio` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 51 | `proportion` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 52 | `average` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 53 | `percentage-change` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 54 | `percent-error` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 55 | `rounding` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 56 | `significant-figures` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 57 | `scientific-notation` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 58 | `exponent` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 59 | `square-root` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 60 | `cube-root` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 61 | `nth-root` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 62 | `factorial` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 63 | `gcd` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 64 | `lcm` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 65 | `prime-checker` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 66 | `prime-factorization` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 67 | `modulo` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 68 | `pythagorean` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 69 | `circle` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 70 | `triangle-area` | `math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 71 | `linear-equation` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 72 | `quadratic-equation` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 73 | `simultaneous-equations` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 74 | `polynomial-calculator` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 75 | `logarithm` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 76 | `matrix-operations` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 77 | `matrix-determinant` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 78 | `matrix-inverse` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 79 | `complex-number` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 80 | `sequence-calculator` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 81 | `series-sum` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 82 | `permutation` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 83 | `combination` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 84 | `probability` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 85 | `mean-median-mode` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 86 | `variance-standard-deviation` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 87 | `z-score` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 88 | `correlation` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 89 | `linear-regression` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 90 | `confidence-interval` | `advanced-math-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 91 | `age-calculator` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 92 | `date-difference` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 93 | `add-days` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 94 | `subtract-days` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 95 | `business-days` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 96 | `working-days` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 97 | `iso-week` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 98 | `day-of-year` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 99 | `days-in-month` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 100 | `leap-year` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 101 | `calendar-month` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 102 | `recurring-date` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 103 | `term-duration` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 104 | `time-duration` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 105 | `time-difference` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 106 | `add-time` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 107 | `subtract-time` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 108 | `countdown-timer` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 109 | `event-countdown` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 110 | `date-to-unix` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 111 | `unix-to-date` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 112 | `world-clock` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 113 | `timezone-converter` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 114 | `utc-offset` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 115 | `meeting-time-planner` | `date-time-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 116 | `length-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 117 | `mass-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 118 | `temperature-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 119 | `area-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 120 | `volume-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 121 | `speed-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 122 | `pressure-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 123 | `energy-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 124 | `power-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 125 | `frequency-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 126 | `angle-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 127 | `fuel-economy-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 128 | `density-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 129 | `cooking-measurement-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 130 | `data-storage-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 131 | `data-transfer-speed-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 132 | `download-time-estimator` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 133 | `number-base-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 134 | `roman-numeral-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 135 | `paper-size-converter` | `unit-converter-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 136 | `word-counter` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 137 | `character-counter` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 138 | `sentence-counter` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 139 | `paragraph-counter` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 140 | `reading-time-calculator` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 141 | `case-converter` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 142 | `text-reverser` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 143 | `duplicate-line-remover` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 144 | `text-compare-diff` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 145 | `whitespace-cleaner` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 146 | `line-sorter` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 147 | `text-to-slug-generator` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 148 | `html-entity-encoder-decoder` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 149 | `url-encoder-decoder` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 150 | `base64-encoder-decoder` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 151 | `json-formatter-validator` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 152 | `html-formatter` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 153 | `css-formatter` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 154 | `javascript-formatter` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 155 | `html-css-js-minifier` | `developer-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 156 | `uuid-generator` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 157 | `regex-tester` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 158 | `color-code-converter` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 159 | `unix-timestamp-unit-helper` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 160 | `markdown-previewer` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 161 | `gpa-calculator` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 162 | `cgpa-calculator` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 163 | `grade-calculator` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 164 | `exam-percentage-calculator` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 165 | `marks-required-calculator` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 166 | `weighted-grade-calculator` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 167 | `final-exam-grade-calculator` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 168 | `semester-gpa-planner` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 169 | `attendance-percentage-calculator` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 170 | `study-time-planner` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 171 | `reading-schedule-planner` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 172 | `assignment-grade-tracker` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 173 | `concrete-volume-calculator` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 174 | `brick-quantity-estimator` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 175 | `cement-sand-aggregate-estimator` | `education-lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 176 | `paint-quantity-calculator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 177 | `tile-quantity-calculator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 178 | `flooring-material-estimator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 179 | `roofing-area-calculator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 180 | `room-area-calculator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 181 | `wall-area-calculator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 182 | `gravel-volume-calculator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 183 | `fence-material-estimator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 184 | `fuel-cost-calculator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 185 | `electricity-bill-estimator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 186 | `bill-split-calculator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 187 | `unit-price-comparator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 188 | `sales-commission-calculator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 189 | `study-topic-organizer` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 190 | `qr-code-generator` | `lifestyle-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 191 | `sleep-duration-calculator` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 192 | `bedtime-planner` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 193 | `wake-up-time-planner` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 194 | `sleep-schedule-consistency-tracker` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 195 | `sleep-log-summary` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 196 | `running-pace-calculator` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 197 | `running-speed-calculator` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 198 | `distance-time-pace-calculator` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 199 | `race-finish-time-predictor` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 200 | `race-split-calculator` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 201 | `walking-pace-calculator` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 202 | `hiking-time-estimator` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 203 | `cycling-speed-calculator` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 204 | `cycling-time-distance-calculator` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 205 | `swimming-pace-calculator` | `health-activity-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 206 | `swimming-interval-planner` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 207 | `rowing-pace-calculator` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 208 | `exercise-session-duration-calculator` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 209 | `interval-training-timer` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 210 | `rest-interval-planner` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 211 | `workout-session-planner-time-only` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 212 | `weekly-activity-minutes-tracker` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 213 | `activity-goal-progress-tracker` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 214 | `step-to-distance-converter` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 215 | `distance-to-step-estimator` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 216 | `elevation-gain-rate-calculator` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 217 | `hiking-elevation-pace-calculator` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 218 | `breathing-exercise-timer` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 219 | `meditation-session-planner` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |
| 220 | `hydration-log-tracker` | `health-wellness-tools.js` | Pending exact code inspection | Source module mapped; function pending |

## Verified function mappings
The following function names are explicitly documented in the Batch 31–60 audit: Tools 31–45 map to Finance Core functions; tools 46–60 map to `FinPulseMath` functions in `math-core.js`. The exact function name is stored in the table above. All other tool IDs remain unverified at function level.

## Next steps
1. Inspect each source module's tool registration and handler wiring to resolve pending function mappings.
2. Trace each mapped handler to the actual calculation implementation (including shared helpers).
3. Record inputs, constraints, formula/dependencies, outputs, units, precision and rounding.
4. Add source references and regression fixtures per tool.
5. Promote a tool to `parity-verified` only after source-to-runtime comparison and tests pass.

## Status vocabulary
`module-mapped` → `function-mapped` → `extracted` → `parity-verified` → `regression-verified`.

No runtime calculation code, translation activation, merge or production deployment is performed by this mapping document.
