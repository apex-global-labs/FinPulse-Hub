# FinPulse Hub — Project Upgrade State

**Last updated:** 2026-11-28 05:20 UTC  
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
- Evidence: original Finance CI run 46109137877 failed at test #163 due fallback copy mismatch. App copy was aligned. Re-run `46110215731` passed `npm run check`, `npm test`, Frankfurter API and Lighthouse/CLS but exposed a functional-audit fixture omission: it did not choose a tax profile for Income Tax/Salary. The fixture now explicitly selects a supported profile. Latest head `feffe7654ba9020960d6c739cbbdad999d693062`: Finance CI `46110910866` and Lighthouse `46110910908` both completed successfully. Browser functional audit: 15 tests passed, 0 failed; all 220 tools passed representative calculations at desktop and mobile viewports (440 executions).
- No merge/deploy.

### Workstream B — Localization, Batch L1
- PR: #73 — `feat/seven-language-translation-engine-phase-1`
- Resume point: tool #53, `percentage-change`, source `math-tools.js`. **Batch 1 Draft commit:** `274474d3a6247b25d92fdda942d4bf7f5b2a1b3e` (follow-up test commits: `38f4475caeadc2d01b0c8fce6f5340b71a45243b`, `56532b40847465feeece108415425aacbf325511`).
- Batch 1 scope: #53–60 (8 tools × 6 target locales = 48 locale records): Percentage Change, Percent Error, Rounding, Significant Figures, Scientific Notation, Exponent, Square Root, Cube Root.
- Source/schema readiness audit exists at `docs/BATCH_51_60_SOURCE_SCHEMA_READINESS_AUDIT_2026-11-27.md`; all ten source records #51–60 are complete and stable-keyed. #53–60 locale records were previously Not Started.
- Required fields: metadata, inputs/options, actions, results, explanations, errors, FAQs, guide, SEO, accessibility. Preserve exact stable keys, placeholders (notably `{field}`), formula semantics, numeric constraints and source step counts.
- Status remains Draft; no translation activation.
- Draft creation: 8 tools × 6 locales = 48 Draft records committed in `274474d3a6247b25d92fdda942d4bf7f5b2a1b3e`; action labels and Batch 1 integrity tests were subsequently committed. Current PR #73 head: `eeef5fe5a44d8c0cbad2ef2d1702818e1838bda0`. Independent audit: 48/48 Draft records, 0 formula mismatches, 0 stable-key mismatches, 0 `{field}` token mismatches, 0 empty field groups, 0 untranslated action labels. `npm run check` and `npm test` passed. Finance CI `46111131323` completed with failure: browser suite reported 45 passed / 9 failed out of 54; all 9 failures were within the eight new Batch 1 tools and arose from exact string assertions comparing source strings containing repeated spaces against browser-rendered `innerText`/`allInnerTexts` values, which normalize/collapse whitespace. No calculation, locale-direction, API or runtime error was reported in these failures. Lighthouse/CLS `46111130196` passed. A test-only normalizer was added in commits `eb952c00b653fa98303b65a1617f321135cdd793` and `9bb5bf533b0a7fb95f576947b2f5e450bbaa158a`; latest PR #73 head must be re-read and its new Finance CI + Lighthouse runs verified before declaring L1 complete. Draft translations are AI-generated and require native-language review; they are not approved/published.

## Batch progress
| Batch | Scope | Status |
|---|---|---|
| C1 | Fix PR #77 test #163 and revalidate country integration | Complete on candidate head `feffe765`; Finance CI + Lighthouse green; 15 browser audit tests passed, 0 failed; 220 tools × 2 viewports = 440 successful executions |
| L1 | #53–60, 48 locale Draft records | Draft records created; stable-key/token/formula checks added; Finance CI unit suite passed; seven-locale Browser regression in progress |
| Next | #61 onward, fixed inventory order | Blocked until L1 verification |

## Release and safety gates
1. Inspect current exact PR head and branch CI before each batch.
2. No formulas, runtime calculation functions, numeric constraints, IDs, currency codes or jurisdiction identifiers may be altered by translation.
3. No unsupported/unverified country rate may be activated.
4. Manual overrides must survive background refresh; stale requests cannot overwrite current-country data.
5. API failure or missing data must preserve manual entry.
6. Keep candidate branches/PRs Draft. Do not merge, close or deploy without explicit user approval.
7. Report exact commit SHA, test pass/fail counts, workflow run IDs, and any remaining blocker. Never claim CI success based on an earlier head.


## User authorization and active execution — 2026-11-28 06:12 UTC

- User explicitly authorized starting Batch 1 ("হ্যাঁ, শুরু করো").
- No PR merge or production deployment is authorized by this confirmation; all work remains Draft.
- Latest inspected PR #73 CI run `46111131323` completed **failure**: browser tests 45 passed, 9 failed (54 total). Failures were localized to Hindi text comparisons in #53–60 and caused by browser whitespace collapsing versus unnormalized expected strings. Test-only normalization was added; no translations, formula code, numeric data, or runtime behavior was modified.
- Test fix commits: `eb952c00b653fa98303b65a1617f321135cdd793` (initial) and `9bb5bf533b0a7fb95f576947b2f5e450bbaa158a` (corrected normalizer).
- Fix verification: latest PR #73 head `9bb5bf533b0a7fb95f576947b2f5e450bbaa158a`; confirmed normalizer syntax is valid (`replace(/\\s+/g, " ").trim()`) and all browser text assertions affected by rendered whitespace now normalize both sides. New Finance CI run `46115532262` and Lighthouse/CLS run `46115532274` are running on this exact head. `npm run check`, `npm test`, and Frankfurter API step have passed in Finance CI; desktop/mobile browser tests remain in progress. Next: inspect final logs/artifacts and update exact totals.
- Batch L1 remains **IN PROGRESS / NOT RELEASE-ACCEPTED** until latest-head CI, browser, RTL/LTR, accessibility and numerical parity gates pass.


## Finance CI failure diagnosis and follow-up — 2026-11-28 06:19 UTC

- Finance CI run `46115532262` completed **failure** on tested PR merge SHA `f88b727504f3d45a6f934ac7fe1eba77740f3d53` (PR head before follow-up: `9bb5bf533b0a7fb95f576947b2f5e450bbaa158a`).
- CI steps: `npm run check` PASS; `npm test` PASS (420 tests, 0 failed); Frankfurter API PASS (1/1); Browser suite **50 passed, 4 failed / 54 total**; functional audit artifact uploaded (ID `15252230094`).
- Three actual failing child cases: `significant-figures / ru`, `scientific-notation / ru`, `exponent / ru`. The parent suite is counted as the fourth failure. All failures occur in the test's numeric-output normalization, not in locale text, direction, accessibility labels or formulas.
- Root cause identified from source: `math-tools.js` formats numeric output with `new Intl.NumberFormat(undefined)` (the browser's resolved formatting locale), while test helper `numberSnapshot` incorrectly parsed the same rendered string using the selected translation locale (Russian). Thus an English-formatted grouped value such as `12,350` was interpreted as Russian decimal `12.35`. This is a test-parser locale mismatch; no runtime calculation or numeric data was changed.
- Test-only correction committed: `599912c77fb871766ade3df84c039d29c0a6da95`. Browser snapshot now captures `new Intl.NumberFormat().resolvedOptions().locale` and parses rendered numeric output using that actual display locale, independently of translated copy locale.
- Latest PR #73 head: `599912c77fb871766ade3df84c039d29c0a6da95`. New Finance CI run `46115994932` (#1076) and Lighthouse/CLS run `46115994929` (#721) are running on this exact head. Do not infer pass from the previous run.
- Lighthouse/CLS run `46115532274` (#718) passed: mobile/desktop homepage and final tool route audits, CLS enforcement, and report upload all succeeded.
- L1 remains **IN PROGRESS / NOT RELEASE-ACCEPTED** until the latest-head Finance CI and Lighthouse/CLS complete and all seven-locale browser, RTL/LTR, accessibility and numeric parity checks pass. No merge or deployment.


## Latest-head browser parity diagnosis — 2026-11-28 06:25 UTC

- Finance CI run `46115994932` completed **failure** on PR #73 head `599912c77fb871766ade3df84c039d29c0a6da95`. `npm run check`, `npm test`, and Frankfurter API passed; browser tests were **34 passed, 20 failed / 54 total**. Functional audit artifact uploaded successfully.
- The previous three Russian numeric-parsing failures in Math & Statistics tools are now **passing**: `significant-figures`, `scientific-notation`, and `exponent`.
- The remaining 19 child failures were on the first tested locale (Arabic) across app.js finance/Overtime tools. Example: `freelance / ar` expected five numeric values but parser returned five nulls. Source inspection confirms a mixed formatting contract: app.js uses `FinPulseGlobalContext.formatNumber/formatMoney` and therefore renders selected-locale digits/separators; Math & Statistics `math-tools.js` uses `Intl.NumberFormat(undefined)` and retains browser-default formatting. A single parser locale is incorrect for both groups.
- Test-only correction committed on PR #73: `f52351ac1d6bc6142aaf864039be0912a06285c1`. The browser snapshot now selects the UI locale for app.js finance/Overtime tools and the browser-resolved locale for the 15 Math & Statistics tools. No runtime, calculation, formula, translation, or numeric defaults were changed.
- New latest-head Finance CI run: `46116447943` (#1078). New candidate Lighthouse/CLS run: `46116447957` (#723). Both are running on exact head `f52351ac1d6bc6142aaf864039be0912a06285c1`.
- The prior latest-head Lighthouse/CLS run `46115994929` (#721) completed successfully: all four mobile/desktop homepage/tool audits passed the CLS ≤ 0.10 budget. Scores: mobile home P95/A96/SEO100, mobile tool P81/A100/SEO100, desktop home P100/A100/SEO100, desktop tool P98/A100/SEO100. CLS values: 0.00011, 0.03039, 0, 0.00868 respectively. Mobile tool LCP was 5.13 s and remains a performance improvement opportunity.
- Batch L1 remains **IN PROGRESS / NOT RELEASE-ACCEPTED** until Finance CI #1078 completes with all browser tests green and all seven-locale RTL/LTR, accessibility and numerical-parity assertions pass. No Batch 2, merge, or deployment.
