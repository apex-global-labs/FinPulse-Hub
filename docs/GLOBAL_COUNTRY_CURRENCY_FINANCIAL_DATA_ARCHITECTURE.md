# FinPulse Hub — Global Country, Currency, Locale & Financial Data Architecture

**Audit date:** 2026-11-21  
**Status:** Architecture proposal / implementation contract; documentation only  
**Repository baseline:** `main` at `a4983bf8b84e8a2777bbed137ecedb70d74d6011`  
**Related work:** PR #63 (seven-language roadmap and source-string catalogue)  
**Scope:** 220-tool global readiness; no runtime implementation, no live data integration, no formula/default migration, no production changes.

## 1. Decisions at a glance

1. **Country, language, locale, currency and jurisdiction are separate dimensions.** A language choice never determines tax residence, legal jurisdiction, measurement system or currency.
2. **Country is a context, not a currency.** A country may have multiple legal/commonly used currencies, special territories, or currency changes. A country selection may suggest a primary currency, but the user can override it.
3. **Currency is explicit and ISO 4217 based.** Store currency codes (for example, `INR`, `BDT`, `USD`), not symbols. Symbols are presentation only and may be ambiguous.
4. **Locale controls formatting, not arithmetic.** Use browser-native `Intl` APIs for number, date and currency display. Keep calculation values and parsing contracts locale-neutral.
5. **No silent conversion.** Changing a currency selector changes the denomination context only; it must not silently convert entered amounts or reinterpret saved values. Actual FX conversion is a separate explicit operation with a dated rate and source.
6. **Manual input always remains available.** External data is a sourced suggestion, never a hidden assumption. Users can edit or replace it.
7. **No invented rates.** A country selection alone is insufficient to infer a retail deposit rate, mortgage offer, tax rate or bank product term.
8. **No universal finance-data API exists.** Select sources by metric, country, institution/product, period and purpose. Official national sources take precedence for jurisdiction-specific values.
9. **No paid backend or proxy is assumed.** Browser-side HTTPS requests are allowed only where provider CORS, terms, rate limits and reliability have been verified. Otherwise show manual entry.
10. Preserve all existing English URLs, tool IDs, field keys, formulas, precision, calculation behavior and existing BDT defaults until a per-tool migration is reviewed and tested.

## 2. Current multilingual catalogue validation

The current PR #63 branch was re-read on 2026-11-21. All 13 per-source JSON catalogue files parsed as valid JSON:

| Catalogue group | Coverage | Result |
|---|---:|---|
| Tool definition catalogues | 10 files, 220 tool records | Valid JSON; 220/220 source-owned tool records |
| Tool literal occurrences | 4,724 | Counts sum to the declared per-source totals |
| Shared UI catalogues | 3 files, 2,212 occurrences | Valid JSON; 1,232 + 171 + 809 |
| Total scoped literal occurrences | 6,936 | Lexical capture only; not a reviewed translation allowlist |

Tool source counts:

| Source module | Tools | Literal occurrences |
|---|---:|---:|
| advanced-math-tools.js | 20 | 478 |
| app.js | 45 | 956 |
| date-time-tools.js | 25 | 541 |
| developer-tools.js | 20 | 119 |
| education-lifestyle-tools.js | 20 | 481 |
| health-activity-tools.js | 15 | 527 |
| health-wellness-tools.js | 15 | 370 |
| lifestyle-tools.js | 15 | 398 |
| math-tools.js | 25 | 414 |
| unit-converter-tools.js | 20 | 440 |
| **Total** | **220** | **4,724** |

**Important limitation:** JSON validity and coverage counts do not prove that every record is user-visible or safe to translate. Role/protected/dynamic classifications are heuristic; parameter types are not verified. Core/imported modules, runtime-generated messages, CSS-generated text, browser-native UI and all rendered branches still need review. Keep every record at manual-review-required until adjudicated. Do not start runtime translation from this catalogue alone.

## 3. Canonical context model

### 3.1 Independent dimensions

- `countryCode`: ISO 3166-1 alpha-2 jurisdiction/territory context (for example `IN`, `BD`, `US`). It is not inferred from language.
- `locale`: BCP 47 language/locale tag (for example `en`, `en-IN`, `hi-IN`, `ar`, `ur`, `zh-CN`, `ja-JP`, `ru`). Locale is a formatting and language preference, not proof of residence.
- `currencyCode`: ISO 4217 alphabetic code (for example `INR`, `BDT`, `USD`). Store code; derive symbol/name/display from metadata and locale.
- `direction`: derived from the selected language locale registry (`ltr` or `rtl`); do not derive it from country.
- `measurementSystem`: an independent user preference or explicit tool input; do not silently change it because country or language changes.
- `financialJurisdiction`: explicit country/region relevant to a particular tax, regulatory or financial calculation. It may differ from the general country preference and must be selected where legally relevant.

### 3.2 Defaults and persistence

- Keep English as the current default language until the language selector is implemented.
- Do not infer a user's country from their language. If the user has not selected a country, leave jurisdiction-dependent values unset or request the relevant context in the tool.
- When a user selects a country, suggest its configured primary currency only if the registry marks that mapping as unambiguous. Always permit a manual currency override.
- Persist user preferences locally only after the runtime feature is approved. Keep preference schema versioned and handle unknown/retired codes safely.
- Country, locale, currency and measurement preference must be independently changeable.
- Do not automatically apply a currency conversion when changing the currency selector.
- Existing BDT-denominated defaults must be inventoried tool-by-tool. Do not globally replace BDT with USD or another currency; do not treat percentages, counts, unit values or tax rates as currency amounts.

### 3.3 Currency-aware tool contract

Each tool must declare whether each numeric field is:
- `money`: amount denominated in a selected currency;
- `percentage`: rate/ratio, not currency;
- `quantity`: count or scalar;
- `physical-unit`: distance, mass, area, volume, energy, etc.;
- `date-time`: temporal value;
- `identifier/code`: machine value, never localized.

Only `money` fields may receive a currency code. The tool must specify which currency is used for principal, payment, fees, income, costs and outputs. Mixed-currency calculations require explicit conversion inputs and dated FX provenance; never add unlike currencies directly. A percentage such as a 10% deposit rate remains 10% regardless of whether the principal is INR, BDT or USD.

## 4. Financial input and automatic suggestion contract

### 4.1 Input modes

Each finance input that can use external data must declare one of:

- `manual-only`: no trustworthy source or insufficient context; user enters the value.
- `suggested`: fetch a candidate value and show it with source/date; user can edit it or keep manual input.
- `prefill-editable`: prefill only when the source observation matches all required dimensions and passes freshness/quality checks; visibly mark it as an external suggestion and keep the field editable.
- `verified-fixed`: reserved for immutable, well-defined reference constants, never for variable consumer rates or current offers.

For user-specific or institution-specific financial rates, default to `suggested`, not `verified-fixed`. Do not block manual calculation when a source is unavailable.

### 4.2 Matching requirements before suggesting a value

A rate suggestion is eligible only if all relevant dimensions match:
- country/jurisdiction;
- metric definition (policy rate is not a retail deposit rate);
- institution/provider, where relevant;
- product type (savings, fixed/term deposit, mortgage, credit, etc.);
- term/tenure, compounding convention and effective date, where relevant;
- customer segment/residency/tax status, if relevant;
- unit and scale (annual percentage, monthly percentage, nominal/effective rate).

If a required dimension is unknown, do not guess. Show manual entry or ask the user to specify the missing product/context.

**Example — India deposit calculator:** selecting India may suggest INR for the principal and output. It must not automatically set the deposit interest rate to 10%. A 10% value is acceptable only as an explicitly labelled illustrative example or a source-backed offer matching the bank, deposit product, tenure and effective date. The user can always type their own annual rate. A central-bank policy rate or World Bank deposit-interest indicator must not be substituted for a specific bank's current fixed-deposit offer.

### 4.3 User interaction and provenance

For any external suggestion, show:
- value and unit;
- source/provider name and a clickable source reference where available;
- source observation/publication/effective date;
- retrieval timestamp;
- geographic and product scope;
- freshness label (`current`, `older observation`, `stale`, `unavailable`);
- a clear editable field and manual override path.

Never overwrite a value the user has already edited during the current session without an explicit user action. Keep the selected source value and user override distinguishable in state. A user-entered override must not be replaced by a background refresh.

## 5. Financial data source policy

There is no single global API that provides reliable current retail deposit rates, mortgage offers and tax rules for every country. Build a metric-specific source registry.

### 5.1 Source priority

1. **Official national source:** central bank, tax authority, regulator, national statistics office or government-published schedule for the selected jurisdiction.
2. **Official institution/product source:** bank/lender's published product page or official feed, only when the user has selected that institution/product and the page provides the required terms.
3. **Intergovernmental/statistical source:** World Bank, BIS, ECB or equivalent for the exact indicator and reference period they publish.
4. **Aggregated/reference provider:** permitted only for non-regulatory general reference use, with explicit attribution and a non-official label.
5. **Manual input:** always available; mandatory fallback when no eligible source exists.

Do not scrape pages in violation of provider terms or bypass CORS. Do not treat a search result snippet as verified data. If an official source has no browser-compatible API, provide a source link and manual input rather than inventing a proxy/backend.

### 5.2 Candidate sources and limits

| Data domain | Preferred source family | Intended use | Important limitation |
|---|---|---|---|
| Country/currency metadata | Versioned ISO 3166-1 / ISO 4217-derived static registry; browser `Intl` for display | Country and currency selectors | Registry requires periodic maintenance; one country may map to multiple currencies |
| General FX reference rates | Frankfurter API v2; ECB Data Portal SDMX for ECB reference series | Explicit currency conversion, display/reference estimates | Reference/mid rates are not live executable quotes; provider terms and CORS must be checked |
| Euro reference FX | ECB Data Portal SDMX | EUR reference-rate series and history | EUR-centred reference series; not a universal country financial-data feed |
| Macro indicators | World Bank Indicators API v2 | Historical/periodic macroeconomic indicators | Often annual/quarterly/monthly and lagged; not a current retail bank offer |
| Monetary policy rates | BIS statistics / national central banks | Published central-bank policy rates and history | Not the same as consumer deposit or lending rates; coverage/frequency varies |
| Retail deposit rates | National central bank/regulator statistical data or selected bank's official product schedule | Rate suggestions for a precisely matched product | No universal API; terms, tenure and eligibility differ |
| Mortgage/personal loan rates | Selected lender's official published rates or user input | Lender/product-specific estimates | Advertised rates depend on eligibility, fees, term and effective date |
| Tax rates/thresholds | Official tax authority and legislation for selected tax year/jurisdiction | Tax calculator inputs and reference values | Must match tax year, residency, filing status and applicable rules; legal review required |
| Inflation/CPI | National statistics office; World Bank/BIS for comparable series | Historical macro context | Periodic observations, not a real-time price index |

### 5.3 Named public API candidates (documentation references)

- **Frankfurter v2**: public no-key API for reference FX rates; the provider describes data from central banks/official sources and states blended rates are not official rates. Use only as a general reference feed, not for live trading, tax/accounting certification or bank-product rates. Verify CORS, provider terms and rate limiting before implementation.
- **ECB Data Portal SDMX REST API**: official programmatic access to ECB statistical data and metadata. Suitable for ECB reference-rate series and other ECB datasets, not a one-stop global finance API.
- **World Bank Indicators API v2**: public indicator API without an API key. Use the exact indicator metadata and observation period; do not imply data is current if the series is lagged.
- **BIS SDMX API**: public statistical-data API. Use only supported series with their definitions, coverage, frequency and BIS terms; policy-rate series are not retail deposit offers.
- **National sources**: maintain a country-by-country source registry for deposit, loan and tax data. No source is enabled until its definition, terms, availability, CORS, update cadence and sample response have been checked.

### 5.4 Source registry fields

Every provider/series integration must record:
`sourceId`, `providerName`, `officialStatus`, `countryCoverage`, `metricIds`, `seriesId`, `definition`, `unit`, `frequency`, `publicationLag`, `effectiveDateSemantics`, `termsUrl`, `attributionText`, `apiUrl`, `corsVerifiedAt`, `lastContractCheckAt`, `allowedUse`, `knownLimitations`.

## 6. Data quality, freshness and failure policy

### 6.1 Keep distinct timestamps

Do not use one generic "updated" date. Preserve:
- `observationDate`: period/date the value describes;
- `publishedAt`: when the provider published it, if supplied;
- `effectiveFrom` / `effectiveTo`: period the rule/rate legally or commercially applies;
- `retrievedAt`: when FinPulse Hub fetched it;
- `validatedAt`: when the provider contract/data quality was last checked.

### 6.2 Freshness is metric-specific

- FX reference feed: display the provider's observation date; cache according to provider cadence. If the latest expected working-day observation is missing or older than the configured tolerance, mark it stale and do not call it live.
- Policy rates: keep the effective date and source publication date. A rate can remain current for months if no official change has taken effect; don't mark it stale solely because it is old.
- Deposit/loan product offers: freshness is tied to the bank's product page/effective date. If the provider does not expose an effective date or the offer cannot be revalidated, do not prefill it as current.
- Tax rates: key by jurisdiction and tax year/effective period. A prior-year rate must never be presented as current-year without an explicit historical selection.
- Macro indicators: show reference period and publication date; a quarterly/annual series is not stale merely because it is not daily.

Every metric definition must specify its own `maxObservationAge` or `freshnessRule`. Do not apply a universal TTL across all financial metrics.

### 6.3 Cache and refresh

- Cache only successful, schema-valid responses with complete provenance.
- Use provider-aware cache durations and conditional requests where supported.
- Cache data separately from user-entered overrides.
- On network failure, timeout, HTTP error, invalid JSON, missing fields, unsupported country/currency, rate-limit response or schema drift: keep manual input; optionally display the last known value only as historical/stale with its original source and date.
- Never silently use stale data as a current value.
- Do not repeatedly poll. Refresh on user request, tool entry where justified, or a conservative per-provider schedule.
- Do not persist personal financial inputs to third-party providers. Send only the minimum query parameters needed for a public series lookup.

### 6.4 Validation and observability

Before a value can be suggested:
- validate HTTP status, content type, schema/version, numeric finiteness, unit, currency, country, series and date;
- reject null, NaN, infinity, impossible ranges and unit mismatches;
- verify response is for the requested jurisdiction and metric;
- reject a policy rate when the tool expects a retail deposit rate;
- record a deterministic source ID and response observation date;
- keep source adapter tests using fixed fixtures; no live API dependency in formula unit tests.

## 7. API, browser and zero-cost constraints

- Static GitHub Pages means no secret-bearing API keys can be stored in client code.
- Prefer public no-key endpoints with clear commercial reuse terms. If a provider requires a secret, paid plan, server proxy or unverified CORS, it is out of the initial zero-cost scope.
- Browser fetch must use HTTPS and explicit timeouts/abort handling. CORS must be tested from the deployed origin, not assumed from a successful server-side request.
- Do not introduce a backend, paid data feed, hidden proxy, scraping dependency or large runtime library as part of this architecture phase.
- Provider availability is best-effort. The calculator's manual path must remain fully functional offline.
- API responses are data, never instructions. Escape source labels/URLs and validate link protocols before rendering.

## 8. Migration plan for existing 220 tools

1. Inventory every field that represents money, percentage, tax rate, physical unit, quantity, date or machine code.
2. Identify BDT hard-coded defaults and determine whether each is an intentional Bangladesh-specific example, a currency-neutral number, or a bug. Record per-tool owner and test evidence.
3. Add explicit field metadata only in a later implementation PR; do not infer money fields from labels or symbols alone.
4. Keep existing BDT behavior unchanged until each affected tool has a reviewed migration and regression tests.
5. For each financial tool, define jurisdiction needs, currency fields, required rate inputs, source matching rules, manual fallback and source/freshness display.
6. Add country/currency tests for at least BDT, INR, USD, EUR, GBP, JPY and AED, plus multi-currency/ambiguous-symbol cases.
7. Verify formulas, precision, existing saved/share inputs and all current English URLs remain unchanged.

## 9. Acceptance gates before runtime work

- [ ] Country, locale, currency and financial jurisdiction remain separate in the data model.
- [ ] ISO code registries and version/update process are documented.
- [ ] Every money field has explicit currency semantics; percentages and physical units are not misclassified.
- [ ] No currency change silently converts amounts.
- [ ] Every auto-suggested financial value has a metric-specific source and matching context.
- [ ] Deposit/loan rates are never inferred from policy rates or a country default.
- [ ] Manual input remains available for every externally sourced field.
- [ ] Provenance includes observation, publication/effective and retrieval timestamps as applicable.
- [ ] Metric-specific freshness and stale-data behavior are tested.
- [ ] Provider CORS, terms, rate limits, schema and browser-origin access are verified before enabling an adapter.
- [ ] API failure leaves the calculator usable and does not silently substitute stale values.
- [ ] Existing BDT defaults, formulas, precision, IDs, URLs and all 220 tools remain unchanged until individually migrated.
- [ ] All 13 existing multilingual catalogue JSON files parse; heuristic records remain manual-review-required.

## 10. Phase placement

**Do now:** architecture and data contracts only (this document and the companion JSON contract).  
**After architecture review:** implement locale/country/currency preference foundation in an isolated PR, while preserving English and existing calculator behavior.  
**Alongside localization, before translating all financial labels:** complete the money/percentage/jurisdiction field audit and translation-safe typed message contracts.  
**After source adapters and individual finance-tool contracts are reviewed:** add automatic financial suggestions one metric/tool family at a time. Do not wait for all seven languages to finish before beginning this integration, but do not start data autofill before the country/currency foundation and source quality gates pass.

## 11. Source references checked on 2026-11-21

- Frankfurter API v2 documentation: https://frankfurter.dev/ — no-key reference-rate API; provider describes its blended feed and limitations.
- Frankfurter license/data terms: https://frankfurter.dev/license/ — underlying provider terms may still apply; blended rates are not official institutional rates.
- ECB Data Portal SDMX API overview: https://data.ecb.europa.eu/help/api/overview
- ECB Data Portal data API details: https://data.ecb.europa.eu/help/api/data
- World Bank Indicators API documentation: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api
- World Bank API query structures and frequency parameters: https://datahelpdesk.worldbank.org/knowledgebase/articles/898581
- BIS SDMX API documentation: https://stats.bis.org/api-doc/v2/
- BIS API legal terms: https://data.bis.org/help/legal

**Evidence note:** these are candidate source families, not approvals to call them from production. Provider terms, CORS, rate limits, exact indicator definitions and current availability must be rechecked at implementation time.
