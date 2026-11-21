# 220-Tool Exact String Catalogue

- Audit date: 2026-11-21
- Baseline: current `main` and canonical `tool-category-mapping.json`.
- Canonical tool coverage: **220/220 unique IDs**; source ownership: **220/220**.
- Exact quoted/template literal occurrences extracted (comments excluded): **4724**.
- Machine-readable full catalogue: `MULTILINGUAL_TOOL_STRING_CATALOGUE.json`.

## Source ownership

| Source file | Tools |
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

## Classification counts

| Classification | Occurrences |
|---|---:|
| protected/review-required | static-literal | 1581 |
| visible-candidate/review-required | static-literal | 1879 |
| visible-candidate/review-required | dynamic-fragment | 804 |
| protected/review-required | dynamic-fragment | 460 |

## Record fields

Every extracted occurrence records exact literal text, Tool ID/name, source file, absolute line number, static-literal or dynamic-fragment status, a heuristic role/classification, protected-parameter placeholder and nearby source context. The JSON file groups records under all 220 Tool IDs.

## Important limitations

This is an exhaustive lexical capture of quoted/template literal occurrences in the 220 tool-definition source segments, excluding comments. It is **not yet a certified translation allowlist**: a literal may be a user-facing label, machine key, formula token, unit code or internal implementation value. Candidate/protected labels are heuristic and must be reviewed against runtime rendering. Concatenated fragments are flagged where local context suggests dynamic assembly, but runtime parameter values are not inferred; `protectedParameters` remains empty pending typed interpolation review.

Shared strings outside per-tool definition segments still need their own catalogue: `app.js` shared form/result/validation/history/copy/share/export/guide/graph rendering; `index.html` homepage/navigation/SEO shell; `home-calculator.js` keypad/status/history; core modules; imported constants; CSS accessible/generated content; runtime exceptions and messages assembled from variables. Therefore this catalogue does not yet certify all user-visible text across the entire application.

## Protected-value policy

Never translate stable Tool IDs, field keys, machine-valued options, formulas, operators, numeric defaults/results, timestamps, currency/unit codes, API endpoints, URL/query/share parameters, DOM selectors or validation thresholds. Translate only the visible text surrounding those values. Locale formatting is display-only and must not alter calculations or imply a different currency, tax jurisdiction or unit system.

## Required next gate

Review every candidate against actual rendering; classify all strings as translatable or protected; extract shared sources; and define named typed interpolation parameters for dynamic messages. Runtime translation implementation remains blocked until reviewed coverage includes all 220 tools and shared UI paths.
