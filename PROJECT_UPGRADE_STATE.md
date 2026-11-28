# FinPulse Hub — Project Upgrade State

**Last updated:** 2026-11-28 05:00 UTC  
**Repository:** apex-global-labs/FinPulse-Hub  
**Production branch:** main  
**Baseline main:** 240256f65f6cd69a154f1f81330d8f1002ef01d7  
**Policy:** Draft PRs only; no merge or deployment without explicit user approval.

## Objective
Upgrade the existing 220-tool application with (1) seven-locale UI and tool-content localization and (2) country-aware data suggestions with persistent manual override/fallback. Reuse existing Registry, Global Context, Tax Data/Engine, Date & Time runtime, translation schema and translation runtime. Do not create duplicate engines or registries.

## Architecture decisions
- Seven locales: en (source), hi, ar, ur, zh-CN, ja, ru. Arabic and Urdu are RTL.
- Translation source of truth: `translations/content-schema.json`, `translations/tool-content.json`, `translations/tool-catalogue.json`, and `translations/catalogue.json` on PR #73.
- Translation status remains `draft` until all required fields, keys, token and numeric integrity checks pass. No auto-promotion to approved/published.
- Country/currency uses `global-context.js`; preserve explicit manual currency mode.
- Tax profiles reuse `tax-data.js`, `tax-state-data.js`, `tax-engine.js` and existing selectors. Never infer unsupported rates.
- Holiday support reuses Date & Time tools and manual holiday input. Country API data must be identified by country/year and optional selected subdivision; API failure must leave manual entry usable.
- Auto-fetch state contract: auto value is replaceable only while source=auto; a user edit switches source=manual and cannot be overwritten by background responses. Country change/reset-to-auto explicitly re-arms fetching. Stale responses must be ignored using request identity/version.

## Verified baseline
- Canonical inventory: 220 unique tool IDs.
- Existing global context: 249 country/territory rows; 154 currency codes.
- Existing shared currency display integration: 37 Finance + 5 Lifestyle tools; display formatting is not FX conversion.
- Existing tax data: 23 profiles; 50 US state rows.
- Existing shared locale catalogue on PR #73: 82 keys in each of seven locales.
- PR #73: open, Draft, unmerged. Tool-content candidate had 46/220 tools with six-locale Draft records; 174/220 not started; 0 approved/published. These are candidate-branch facts, not main/production behavior.
- Country coverage matrix PR #76: 49 Partial, 2 Missing (business-days and working-days holiday calendars), 169 Not Applicable, 0 Complete.
- PR #77: open, Draft, unmerged. Country/currency, tax profile and Nager.Date holiday integration candidate. Its Finance CI failed at test #163 due fallback copy not matching the asserted contract; Lighthouse/CLS passed on the prior head.

## Active workstreams and exact resume points

### Workstream A — Country automation, Batch C1
- PR: #77 — `feat/country-currency-tax-holiday-linkage-2026-11-28`
- Base: main baseline above.
- Resume point: `tests/global-currency-integration.test.cjs`, test "country context selects only supported existing tax profiles and leaves unsupported countries manual".
- Evidence: Finance CI run 46109137877 failed at test #163. The test expected the user-facing phrase "No mapped tax profile is available"; current app copy used "No exact tax profile is mapped". The candidate has been changed to align the copy with the contract. Next: re-run Finance CI and Lighthouse/CLS on the new exact head, inspect all remaining failures, then browser-test Country → Currency, Tax Profile, Holiday fetch/fallback, manual override and stale-request behavior.
- No merge/deploy.

### Workstream B — Localization, Batch L1
- PR: #73 — `feat/seven-language-translation-engine-phase-1`
- Resume point: tool #53, `percentage-change`, source `math-tools.js`.
- Batch 1 scope: #53–60 (8 tools × 6 target locales = 48 locale records): Percentage Change, Percent Error, Rounding, Significant Figures, Scientific Notation, Exponent, Square Root, Cube Root.
- Source/schema readiness audit exists at `docs/BATCH_51_60_SOURCE_SCHEMA_READINESS_AUDIT_2026-11-27.md`; all ten source records #51–60 are complete and stable-keyed. #53–60 locale records were previously Not Started.
- Required fields: metadata, inputs/options, actions, results, explanations, errors, FAQs, guide, SEO, accessibility. Preserve exact stable keys, placeholders (notably `{field}`), formula semantics, numeric constraints and source step counts.
- Status remains Draft; no translation activation.
- After Batch 1: validate JSON/schema completeness, exact key parity, placeholder parity, protected formula/numeric content, source calculation parity, seven-locale browser/RTL/LTR and accessibility tests, then latest-head Finance CI and Lighthouse/CLS.

## Batch progress
| Batch | Scope | Status |
|---|---|---|
| C1 | Fix PR #77 test #163 and revalidate country integration | In progress |
| L1 | #53–60, 48 locale Draft records | Not started |
| Next | #61 onward, fixed inventory order | Blocked until L1 verification |

## Release and safety gates
1. Inspect current exact PR head and branch CI before each batch.
2. No formulas, runtime calculation functions, numeric constraints, IDs, currency codes or jurisdiction identifiers may be altered by translation.
3. No unsupported/unverified country rate may be activated.
4. Manual overrides must survive background refresh; stale requests cannot overwrite current-country data.
5. API failure or missing data must preserve manual entry.
6. Keep candidate branches/PRs Draft. Do not merge, close or deploy without explicit user approval.
7. Report exact commit SHA, test pass/fail counts, workflow run IDs, and any remaining blocker. Never claim CI success based on an earlier head.
