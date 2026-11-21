# Global Runtime Implementation — Phase 1 Audit

**Date:** 2026-11-21  
**PR:** [#64 — Global country, currency and locale preferences](https://github.com/apex-global-labs/FinPulse-Hub/pull/64)  
**Branch:** `feat/global-context-runtime-phase-1`  
**Base:** `main` at `a4983bf8b84e8a2777bbed137ecedb70d74d6011`

## Delivered in candidate branch

- `global-context.js`: browser-side UMD module with validated independent country, locale, currency, measurement-system and financial-jurisdiction preferences.
- Country/territory registry: 249 ISO 3166-1 alpha-2 entries, including territories; currency suggestions use a CLDR territory-currency snapshot.
- Currency registry: 154 distinct current tender codes represented in the country mapping, with display names supplied by `Intl.DisplayNames` when available.
- Locale registry: `en`, `hi`, `ar`, `ur`, `zh-CN`, `ja`, `ru`; Arabic and Urdu are RTL.
- Header Global Settings UI: country, language/locale and currency selectors, plus an explicit “Use suggested currency” action.
- Browser persistence: `localStorage` key `finpulse-global-context-v1`; invalid stored values normalize to safe defaults and storage failures leave the in-memory preference functional.
- Deployment copy list includes `global-context.js`.
- Node contract tests cover registry counts, unique codes, currency suggestion vs explicit apply, user override, multi-currency territories, no-currency territories, RTL metadata and formatting.

## Non-negotiable behavior

- Country selection does not silently change currency. A primary-currency suggestion is shown separately and requires explicit user action.
- Locale, country and currency remain independent.
- Changing the currency preference does not convert amounts, rewrite tool inputs or change existing calculator formulas/defaults.
- The selected locale updates the document `lang` and `dir`; translated tool strings are **not** enabled by this phase. The UI explicitly discloses this.
- The global context module makes no network/API calls.
- Existing currency converter Frankfurter flow and its manual fallback are unchanged.

## Registry caveats

- Country names are formatted through the browser's `Intl.DisplayNames` with ISO code fallback.
- Country-to-currency mappings are a static snapshot; multi-currency/ambiguous cases are retained explicitly. Bhutan, Lesotho, Namibia and Zimbabwe primary legal tender ordering was reviewed and corrected; Palestine has no automatic primary-currency suggestion.
- This is a maintained data snapshot, not a live ISO/CLDR feed. Refreshes require source/version review and regression tests.
- The registry intentionally covers current tender currencies used by mapped territories, not every historical, fund, precious-metal or non-circulating ISO 4217 code.

## Validation state

- Local V8 runtime smoke: module and app syntax parsed; 16 registry, locale, currency-suggestion, manual-override, RTL, formatting, UI-wiring, package and Pages-packaging checks passed. This is not a substitute for the repository Node/Playwright CI.
- Static source inspection: script order is `smart-ui.js` → `global-context.js` → `app.js`.
- Package syntax check includes `global-context.js`.
- Package test command includes `tests/global-context.test.cjs`.
- GitHub Pages workflow copies `global-context.js` to the published artifact.
- PR #64 was observed as open, draft and mergeable at the latest check.
- **CI / browser / Lighthouse:** no workflow run was yet returned for the latest PR head during this audit. Do not claim tests passed until GitHub Actions reports completion and the browser/Lighthouse evidence is inspected.

## Release boundary

No merge, production deployment, language translation rollout, financial calculator default change, API integration, tax/jurisdiction logic change, sitemap change or SEO URL change is included. Existing 220-tool formulas and current defaults are intended to remain unchanged. PR #64 must remain unmerged until CI, browser checks and review pass.
