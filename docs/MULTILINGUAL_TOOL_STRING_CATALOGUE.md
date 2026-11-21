# 220-Tool Exact String Catalogue

- Audit date: 2026-11-21
- Baseline: current `main` and canonical `tool-category-mapping.json`.
- Canonical tool coverage: **220/220 unique IDs**; source ownership: **220/220**.
- Exact quoted/template literal occurrences extracted from tool-definition segments (comments excluded): **4,724**.
- Files are split by source module so they remain inspectable and reviewable.

## Per-source catalogues

| Source file | Tools | Exact literal occurrences | Catalogue |
|---|---:|---:|---|
| `app.js` | 45 | 1,? | [app.json](./multilingual-string-catalogue/app.json) |
| `math-tools.js` | 25 | see JSON | [math-tools.json](./multilingual-string-catalogue/math-tools.json) |
| `advanced-math-tools.js` | 20 | see JSON | [advanced-math-tools.json](./multilingual-string-catalogue/advanced-math-tools.json) |
| `date-time-tools.js` | 25 | see JSON | [date-time-tools.json](./multilingual-string-catalogue/date-time-tools.json) |
| `unit-converter-tools.js` | 20 | see JSON | [unit-converter-tools.json](./multilingual-string-catalogue/unit-converter-tools.json) |
| `developer-tools.js` | 20 | see JSON | [developer-tools.json](./multilingual-string-catalogue/developer-tools.json) |
| `education-lifestyle-tools.js` | 20 | see JSON | [education-lifestyle-tools.json](./multilingual-string-catalogue/education-lifestyle-tools.json) |
| `lifestyle-tools.js` | 15 | see JSON | [lifestyle-tools.json](./multilingual-string-catalogue/lifestyle-tools.json) |
| `health-activity-tools.js` | 15 | see JSON | [health-activity-tools.json](./multilingual-string-catalogue/health-activity-tools.json) |
| `health-wellness-tools.js` | 15 | see JSON | [health-wellness-tools.json](./multilingual-string-catalogue/health-wellness-tools.json) |

Each JSON records the exact literal, stable Tool ID/name, source file, absolute line number, static/dynamic-fragment classification, heuristic classification, protected-parameter placeholder and surrounding code context.

## Classification and review limits

Candidate/protected classification and role labels are **heuristic**, not a certified translation allowlist. Literal strings may include machine keys, formula fragments, unit codes, internal values or user-visible text. Concatenated fragments are flagged when local context suggests dynamic assembly, but runtime interpolation contracts are not inferred automatically. `protectedParameters` remains empty until reviewed and typed.

Shared renderer/homepage strings are catalogued separately in [the shared UI catalogue](./MULTILINGUAL_SHARED_UI_STRING_CATALOGUE.md). That set includes 2,212 literal/text-node occurrences across shared `app.js`, `home-calculator.js` and `index.html`.

## Protected-value policy

Never translate stable Tool IDs, field keys, machine-valued options, formulas, operators, numeric defaults/results, timestamps, currency/unit codes, API endpoints, URL/query/share parameters, DOM selectors or validation thresholds. Translate only visible text around these values. Locale formatting must remain display-only and must not alter calculations or silently imply a currency, tax jurisdiction or unit system.

## Remaining gate

Review every candidate against actual rendering; classify all strings as translatable or protected; extract/trace messages originating in core modules, imported constants, CSS-generated content and runtime exceptions; and define named typed interpolation parameters for dynamic messages. Runtime translation implementation remains blocked until this review is complete.
