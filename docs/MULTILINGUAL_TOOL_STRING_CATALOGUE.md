# 220-Tool Exact String Catalogue

- Audit date: 2026-11-21
- Baseline: current `main` (canonical mapping and ten source files).
- Canonical tool coverage: **220/220 unique IDs**; source ownership: **220/220**.
- Literal occurrences extracted: **4724**.
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

## What each record contains

Each occurrence records exact literal text, stable Tool ID, English Tool name, source file, absolute line number, static-literal/dynamic-fragment classification, heuristic role, protected/review status and surrounding source context. All 220 tools have at least one extracted literal occurrence.

## Accuracy and safety limits

This is an **exhaustive lexical capture of quoted/template literal occurrences in the 220 tool-definition source segments**, not a final translation allowlist. Role classification is heuristic. A literal can be a human label, machine key, formula token, unit code or an internal implementation string; the context is retained for manual adjudication. Concatenated strings are marked as dynamic fragments when their local context suggests assembly, but their runtime parameter values are not inferred automatically. `protectedParameters` is intentionally empty until each dynamic message is reviewed and its typed interpolation contract is established.

The following shared sources are outside the per-tool definition segments and still require separate catalogue coverage: `app.js` shared renderer and error handling; `index.html` homepage/static SEO shell; `home-calculator.js` keypad/status/history; core calculation/formatting modules; CSS accessible/generated content; imported constants; runtime exceptions and messages assembled from variables. The current source scan therefore does **not** certify that every user-visible string in the entire application is captured.

## Translation protection rules

Never translate stable Tool IDs, field keys, option machine values, formula expressions, operators, numeric defaults/results, timestamps, currency/unit codes, API endpoints, query/share parameters, DOM selectors or validation thresholds. Translate only the visible label/copy surrounding those values. Numeric/currency/date formatting is display-only and must not alter calculations or silently select a jurisdiction/currency/unit system.

## Next gate

Review all candidate entries against actual rendering, explicitly classify every string as translatable/protected, extract the shared sources above, and add named typed interpolation parameters for dynamic messages. Do not implement the runtime translation engine until the reviewed catalogue covers all 220 tools plus shared UI paths.
