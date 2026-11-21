# Financial Input Globalization — Phase 2A–2C

**Date:** 2026-11-21  
**Branch:** feat/financial-input-globalization-phase-2a-2c  
**Base:** Phase 1 Global Context candidate, PR #64 head 51da53929a6cc4083c98a1e4ba02bef2571b519b  
**Status:** Implementation candidate; CI/browser/Lighthouse validation pending; not merged or deployed. PR #66 targets main so the repository's main-targeted pull-request workflows can validate the combined Phase 1 + Phase 2 change set.

## Scope delivered in this candidate

### Phase 2A — Shared currency context

- The global currency preference initializes the shared financial display formatter.
- Currency formatting uses the selected locale and selected ISO 4217 code; symbol display uses the existing symbol map plus the browser's narrow-currency-symbol fallback.
- Currency dropdowns in tools now read the Phase 1 currency registry (154 mapped current-tender codes), instead of being limited to the original 15-code list.
- The electricity-bill tool's currency field follows the global preference and can also update that preference.
- Financial tools disclose the display currency and explicitly state that changing it does not convert or rewrite numeric inputs.
- Locale-aware numeric formatting is applied through the global context formatter.

### Phase 2B — Finance tool integration

- 37 Finance tools use the global currency preference for presentation.
- 401(k) and Roth vs Traditional IRA remain explicitly US-specific and display USD because their contribution rules/limits are USD-denominated; the global currency preference does not relabel them.
- Income Tax and Salary Take-Home retain the currency supplied by the selected tax profile; jurisdiction-specific tax output is not overwritten by a display preference.
- Percentage Calculator remains dimensionless.
- Currency Converter, Exchange Fee & Markup, and International Money Transfer retain separate source/recipient currency semantics.
- Automatic reference rates remain limited to currency pairs supported by the existing Frankfurter service. Unsupported pairs show an explicit rate error and leave the manual rate field available; the existing 10-second timeout and one-hour in-memory cache remain unchanged.
- Currency Converter source amount is formatted using its selected From currency.
- Exchange Fee & Markup and International Money Transfer now expose an explicit source-currency selector; source-side fees/costs are formatted in that currency and recipient amounts in the destination currency.

### Phase 2C — Five additional monetary lifestyle tools

- Fuel Cost, Electricity Bill, Bill Split, Unit Price Comparator and Sales Commission use the selected currency for monetary presentation.
- Unit Price Comparator applies one selected currency to both product prices and states the same-currency comparison assumption.
- Fuel price, utility tariff, bill amount, product prices and commission inputs remain user-entered values; no live price/tariff feed or FX conversion was added.

## Non-negotiable calculation contract

- No finance/lifestyle formula or numeric input is converted when the display currency changes.
- No exchange rate is fetched or applied outside the Currency Converter's existing Frankfurter/manual-rate flow.
- Country selection remains independent from currency selection; applying a country suggestion remains an explicit action.
- Income tax and salary outputs remain tied to the selected tax profile currency.
- Jurisdiction-specific tax coverage, VAT/GST presets, payroll rules, and legal assumptions are intentionally unchanged and remain Phase 2D work.
- No currency default is claimed to represent a user's country or legal tender unless they explicitly select/apply it.

## Validation plan

- Node syntax and full existing test suite, including the new global currency integration and lifestyle currency presentation assertions.
- Finance API contract and live Frankfurter verification.
- Desktop/mobile Playwright functional checks for global settings, all monetary tool classes, currency dropdown coverage, history/reset/share behavior, and source/destination formatting.
- WCAG 2.1 A/AA checks for currency selectors and live status text.
- Candidate Lighthouse and CLS budget checks.
- Confirm no production branch, sitemap, canonical route, SEO metadata or Pages deployment changes.

## Release boundary

PR #64 remains a prerequisite candidate. This branch is stacked on PR #64's current head. Do not merge or deploy either PR without explicit approval. Phase 2D Tax Jurisdiction is a separate full audit and implementation gate.
