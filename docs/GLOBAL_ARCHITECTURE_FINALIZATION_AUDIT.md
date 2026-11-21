# FinPulse Hub — Global Architecture Finalization Audit

**Audit date:** 2026-11-21  
**Repository:** `apex-global-labs/FinPulse-Hub`  
**Working PR:** [#63 — docs: plan seven-language multilingual system](https://github.com/apex-global-labs/FinPulse-Hub/pull/63)  
**Branch:** `docs/multilingual-seven-language-roadmap`  
**Scope:** Documentation and contract validation only. No runtime, calculator, formula, default, SEO route, sitemap, API adapter, or production deployment changes.

## 1. Catalogue verification

Re-fetched all 13 JSON catalogue files from the PR branch and parsed each with JSON.parse.

| Group | Files | Records / tools | Literal occurrences | Result |
|---|---:|---:|---:|---|
| Tool catalogues | 10 | 220 tools | 4,724 | 10/10 valid JSON |
| Shared UI catalogues | 3 | 2,212 entries | 2,212 | 3/3 valid JSON |
| **Total** | **13** | **220 tools** | **6,936** | **13/13 valid JSON** |

The 6,936 count is a lexical extraction inventory, not a translation allowlist. Dynamic placeholders, protected values, imported/core modules, runtime-generated messages, CSS-generated content and browser-native UI still require manual review. No translation is approved solely because a string appears in this catalogue.

## 2. Global context contract

The machine-readable contract is `docs/globalization-contracts/global-context-contract.json`, schema version **1.0.1**.

Independent dimensions:
- `countryCode`: ISO 3166-1 alpha-2 country/territory context.
- `locale`: BCP 47 language and formatting preference.
- `currencyCode`: ISO 4217 currency denomination.
- `direction`: derived from locale registry, LTR or RTL.
- `measurementSystem`: independently selected measurement preference.
- `financialJurisdiction`: explicit legal/tax jurisdiction for the calculation.

Invariant: language does not infer country, currency, tax residence or measurement system. Country may suggest a primary currency, but the user can override it. Changing currency does not convert the numeric amount.

Financial value contract refinement:
- Manual values do not require an external `sourceId`; they carry `inputOrigin=user-manual`, `enteredAt`, and `freshnessState=not-applicable`.
- External values require source provenance and retrieval timestamp.
- Currency-denominated amounts require `currencyCode`.
- FX rates require distinct base and quote currency codes.
- Jurisdiction-specific metrics require an explicit jurisdiction; global/multi-country series may use a geographic scope instead of a single country code.
- Illustrative examples must be labelled and must never be represented as current sourced rates.

## 3. Financial input policy

Supported modes: `manual-only`, `suggested`, `prefill-editable`, `verified-fixed`.

- Manual entry remains available when a source is absent, stale, unavailable or unsuitable.
- External values are suggestions, not hidden assumptions.
- A user-edited value is never overwritten by background refresh.
- Country/currency alone cannot determine a retail deposit, loan, mortgage or tax rate.
- A policy rate is not a retail bank product rate.
- A value must match metric definition, jurisdiction, institution/product, tenure, compounding, effective date, customer segment and unit where relevant.

## 4. Source, fallback and freshness policy

Source priority:
1. Official national authority/regulator/statistics source.
2. Official institution/product source for the selected product.
3. Intergovernmental/statistical source for its exact published indicator.
4. Permitted aggregated reference provider, clearly labelled non-official.
5. Manual input.

Candidate source families (not production-enabled):
- Frankfurter v2 for general reference FX only; rates are reference data, not executable market quotes. Provider and underlying-source terms apply.
- ECB Data Portal SDMX for ECB statistical series and EUR-centred reference FX.
- World Bank Indicators API v2 for periodic/historical macro indicators, not current retail product offers.
- BIS SDMX for published statistical series; definitions, terms, coverage and frequency must be checked.
- National central banks, regulators, tax authorities and selected institutions for jurisdiction/product-specific data.

No candidate source is enabled by this architecture. Before enabling any exact series, verify the metric definition, provider and underlying-source reuse terms, attribution, CORS from the deployed GitHub Pages origin, rate limits, response schema, geographic/product coverage and metric-specific freshness. A successful CI reachability probe alone does not pass this gate.

Keep separate timestamps: observation, publication, effective period, retrieval and validation. Freshness is metric-specific; there is no universal TTL. On timeout, network error, HTTP error, invalid schema, missing fields, rate limit, unsupported jurisdiction or stale data, retain manual input. A last-known value may be shown only as explicitly historical/stale with its original source and date.

Official source references:
- Frankfurter: https://frankfurter.dev/ and https://frankfurter.dev/license/
- ECB SDMX: https://data.ecb.europa.eu/help/api/overview
- World Bank Indicators API: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation
- BIS SDMX API: https://stats.bis.org/api-doc/v2/
- BIS permitted-use terms: https://www.bis.org/about/legal/permitted-use-statistics

## 5. CI evidence observed for the PR head at audit time

PR-head workflow runs associated with commit `efa527018e0bd4c91baabd182ad22bafc17a528b`:

| Workflow | Run ID | Result |
|---|---:|---|
| Finance Calculator CI | 44905650691 | Success |
| Candidate Lighthouse and CLS Audit | 44905650686 | Success |

Finance CI job steps passed: syntax check, test suite, live Frankfurter reference-rate API probe, Playwright setup, desktop/mobile browser tests and 220-tool functional audit artifact upload.

Candidate Lighthouse job steps passed: mobile homepage/final-tool audit, desktop homepage/final-tool audit, CLS budget enforcement and report upload.

These runs predate the final documentation-only contract refinements in this audit. Re-run/verify checks on the updated PR head before merge. The combined commit-status endpoint returned no status entries; the workflow-run records above are the evidence for the two successful runs.

## 6. Release state and limitations

- PR #63 was observed as **open, draft, mergeable** and targeting `main`.
- The architecture and catalogue files are on the PR branch; the architecture file was not present on `main` at audit time.
- No merge, production API integration, locale selector, currency selector, auto-prefill, SEO localization, or deployment is claimed.
- Existing BDT defaults, all 220 tools, formulas, precision, English URLs and production behavior remain unchanged.
- Do not merge until updated-head CI passes and the documentation review is accepted.

## 7. Next implementation gates

1. Complete manual review of all extracted visible strings and dynamic placeholders; establish an approved translation allowlist.
2. Build and validate versioned ISO country/currency and BCP 47 locale registries, including territories and multi-currency cases.
3. Inventory every numeric field across 220 tools and explicitly classify money, percentage, quantity, physical unit, date-time and identifier.
4. Test locale formatting and parsing separately from arithmetic; add BDT, INR, USD, EUR, GBP, JPY and AED regression cases.
5. Verify each candidate API from the deployed browser origin and record exact series, terms, attribution, freshness and fixture tests before enabling it.
6. Implement runtime changes in separate reviewable PRs; preserve the zero-cost static-hosting constraint and all existing formulas/routes.
