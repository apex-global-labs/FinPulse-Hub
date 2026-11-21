# Financial Input Globalization Audit — Phase 2

**Audit date:** 2026-11-21  
**Production baseline:** `main` (220-tool release; 45 finance tools)  
**Audit branch:** `feat/financial-globalization-phase-2`  
**Scope:** Read-only audit of monetary inputs/outputs, currency assumptions, financial jurisdiction and source/freshness behavior. No formulas, defaults or production files changed in this audit.

## 1. Executive summary

- Canonical tool directory: **220 unique tools** (validated in the source inventory).
- Finance category: **45 tools**.
- Monetary finance tools: **44**. The Percentage Calculator is the only finance tool whose inputs/outputs are dimensionless and should not receive currency formatting.
- Additional monetary tools outside the Finance category: **5** (Fuel Cost, Electricity Bill, Bill Split, Unit Price Comparator, Sales Commission).
- Total identified monetary tools: **49**.
- Existing display currency catalog: **15 codes** (USD, EUR, GBP, BDT, CAD, AUD, INR, JPY, CHF, SGD, AED, SAR, NZD, ZAR, CNY).
- The general financial output formatter initializes `activeCurrency` to **USD**. A `display-currency` change handler exists, but the production `app.js` source contains no `id="display-currency"` element or corresponding rendered form control. Therefore the expected user-selectable display currency control is not wired into the live finance tool form. Of the 44 monetary Finance tools, 39 rely on the shared USD formatter for their outputs; Income Tax and Salary Take-Home use the selected tax profile currency; Currency Converter, Exchange Fee & Markup and International Money Transfer use explicit destination formatting in some outputs but still format some source amounts with the USD fallback. Currency Converter's source-amount breakdown specifically calls `fmt(v.amount)` without passing the selected `from` currency.
- Currency code coverage is limited to the above 15 choices, not the global currency registry.
- Country presets are limited to Sales Tax, VAT/GST and Inflation. Tax profile selection for Income Tax and Salary currently has 4 country tax profile families (US, UK, Canada, Bangladesh) and US state add-ons.
- Phase 1 global context module is on unmerged PR #64 and is not in production `main`; it must not be treated as live or as already connected to the finance engine.

## 2. Tool-by-tool inventory

### 2.1 Existing 45 Finance tools

| Tool ID | Tool | Monetary treatment | Initial finding |
|---|---|---|---|
| `currency` | Currency Converter | Monetary | Explicit source/target currency fields; source amount breakdown still uses USD fallback. |
| `mortgage` | Mortgage Calculator | Monetary | No currency field; uses shared USD default. |
| `loan` | Loan Calculator | Monetary | No currency field; uses shared USD default. |
| `emi` | EMI Calculator | Monetary | No currency field; uses shared USD default. |
| `compound` | Compound Interest Calculator | Monetary | No currency field; uses shared USD default. |
| `percentage` | Percentage Calculator | Non-monetary | Dimensionless percentage operations; no currency formatting. |
| `tip` | Tip Calculator | Monetary | No currency field; uses shared USD default. |
| `car` | Auto / Car Loan Calculator | Monetary | No currency field; uses shared USD default. |
| `amortization` | Loan Amortization Calculator | Monetary | No currency field; uses shared USD default. |
| `savings` | Savings Goal Calculator | Monetary | No currency field; uses shared USD default. |
| `freelance` | Freelance Hourly Rate Calculator | Monetary | No currency field; uses shared USD default. |
| `margin` | Profit Margin Calculator | Monetary | No currency field; uses shared USD default. |
| `affordability` | Mortgage Affordability Calculator | Monetary | No currency field; uses shared USD default. |
| `payoff` | Mortgage Payoff & Extra Payment Calculator | Monetary | No currency field; uses shared USD default. |
| `refinance` | Mortgage Refinance Comparison | Monetary | No currency field; uses shared USD default. |
| `personal-loan` | Personal Loan Calculator | Monetary | No currency field; uses shared USD default. |
| `student-loan` | Student Loan Repayment Calculator | Monetary | No currency field; uses shared USD default. |
| `simple-interest` | Simple Interest Calculator | Monetary | No currency field; uses shared USD default. |
| `retirement` | Retirement Savings Calculator | Monetary | No currency field; uses shared USD default. |
| `401k` | 401k Contribution Calculator | Monetary | No currency field; uses shared USD default; US-specific plan. |
| `ira` | Roth vs Traditional IRA Comparison | Monetary | No currency field; uses shared USD default; US-specific accounts. |
| `inflation` | Inflation Calculator | Monetary | No currency field; uses shared USD default; inflation presets are country-specific. |
| `cd` | CD Calculator | Monetary | No currency field; uses shared USD default. |
| `apy` | APY Calculator | Monetary | No currency field; uses shared USD default. |
| `tax` | Tax Calculator | Monetary | No currency field; uses shared USD default; tax rate is manual. |
| `income-tax` | Income Tax Calculator | Monetary | Currency comes from selected tax profile; country/tax year required. |
| `sales-tax` | Sales Tax Calculator | Monetary | No currency field; uses shared USD default; tax preset needs jurisdiction. |
| `vat-gst` | VAT / GST Calculator | Monetary | No currency field; uses shared USD default; tax preset needs jurisdiction. |
| `tax-refund` | Tax Refund Estimator | Monetary | No currency field; uses shared USD default. |
| `salary` | Salary Take-Home Calculator | Monetary | Currency comes from selected tax profile; country/tax year required. |
| `paycheck` | Paycheck Calculator | Monetary | No currency field; uses shared USD default; withholding is manual. |
| `payroll` | Payroll Calculator | Monetary | No currency field; uses shared USD default; employer tax is manual. |
| `overtime` | Overtime Pay Calculator | Monetary | No currency field; uses shared USD default. |
| `discount` | Discount Calculator | Monetary | No currency field; uses shared USD default. |
| `exchange-fees` | Exchange Fee & Markup Calculator | Monetary | Recipient currency is explicit; source amount remains shared USD fallback. |
| `transfer-compare` | International Money Transfer Cost Calculator | Monetary | Recipient currency is explicit; source amount remains shared USD fallback. |
| `freelance-project` | Freelance Project Pricing Calculator | Monetary | No currency field; uses shared USD default. |
| `freelancer-net-income` | Freelancer Net Income After Costs Calculator | Monetary | No currency field; uses shared USD default. |
| `markup` | Markup Calculator | Monetary | No currency field; uses shared USD default. |
| `break-even` | Break-even Calculator | Monetary | No currency field; uses shared USD default. |
| `business-roi` | Business ROI Calculator | Monetary | No currency field; uses shared USD default. |
| `cash-flow` | Cash Flow Projection Calculator | Monetary | No currency field; uses shared USD default. |
| `rental-yield` | Rental Yield Calculator | Monetary | No currency field; uses shared USD default. |
| `emergency-fund` | Emergency Fund Calculator | Monetary | No currency field; uses shared USD default. |
| `net-worth` | Net Worth Calculator | Monetary | No currency field; uses shared USD default. |

**Important:** The monetary classification above identifies money-valued inputs/results, not proof that each calculator has a correct currency selector. All monetary fields in these calculators are plain numeric values. The current global display currency is a separate presentation concern and must be explicitly connected before it can be trusted.

### 2.2 Additional 5 monetary tools outside Finance

| Tool ID | Tool | Current currency behavior | Required correction |
|---|---|---|---|
| `fuel-cost-calculator` | Fuel Cost Calculator | Manually entered fuel price; output is an unlabelled number | Add explicit currency selection/label; do not fetch or infer local fuel price |
| `electricity-bill-estimator` | Electricity Bill Estimator | Currency field defaults to USD; limited options USD/BDT/EUR/GBP/INR | Keep manual tariff/fixed charge; expand validated currency codes; output currency-aware |
| `bill-split-calculator` | Bill Split Calculator | Numeric bill amount and unlabelled result | Add explicit currency context; split arithmetic unchanged |
| `unit-price-comparator` | Unit Price Comparator | Assumes both prices use the same currency; no currency selector | Add one shared currency selector and disclose same-currency requirement |
| `sales-commission-calculator` | Sales Commission Calculator | Monetary sales and bonus amounts; unlabelled result | Add currency context; commission formula unchanged |

The five tools above are the only non-Finance money-related tools found in the lifestyle/home modules. The remaining 175-tool portfolio is not assumed to be financial solely because a number or quantity is present.

## 3. Currency assumptions and gaps

### 3.1 Shared finance formatter
- `activeCurrency` is initialized to `USD`.
- `fmt(value, currency?)` formats using the passed currency or `activeCurrency`.
- The currency selector event listener expects `#display-currency`, but the production form markup does not render that element.
- Result: non-converter finance tools default to USD formatting in the current implementation; there is no reliable per-tool currency selection control.
- A display currency is presentation metadata only. It must never silently convert an entered amount or change the numerical value.

### 3.2 Currency converter
- Separate `from` and `to` ISO-like 3-letter inputs; default pair USD → EUR.
- Existing reference-rate source: Frankfurter API v2, with a 10-second abort timeout and 1-hour in-memory cache.
- Manual rate path exists.
- API response is checked for HTTP success, positive numeric rate, and matching base/quote codes.
- The converter's 15-code dropdown is not a complete global ISO 4217 catalogue.
- Keep this rate source isolated from ordinary finance calculators. Never use an FX rate to convert calculator input automatically.

### 3.3 Existing currency choices
`USD, EUR, GBP, BDT, CAD, AUD, INR, JPY, CHF, SGD, AED, SAR, NZD, ZAR, CNY`

Gap: 139 currency codes present in the Phase 1 candidate registry are absent from this 15-code dropdown. This is a comparison against the candidate registry, not a claim that all 154 are equally used everyday tender. Recompute against a versioned ISO 4217 current-currency dataset before implementation; historical, fund, precious-metal and non-circulating codes should not be treated as everyday tender.

## 4. Financial jurisdiction and regional applicability

| Tool / group | Existing behavior | Jurisdiction need | Audit classification |
|---|---|---|---|
| Income Tax Calculator | Tax profile selector, 2026 profiles for US, UK, Canada, Bangladesh; US state selector | Country, tax year, filing status; US state where relevant | High — tax jurisdiction is mandatory |
| Salary Take-Home Calculator | Same tax profiles plus user-entered deductions/benefits; US state selector | Country, tax year, filing status, pay frequency; state for US | High — tax jurisdiction is mandatory |
| Sales Tax Calculator | Country preset list with US local-rate placeholder, GB, BD and Canadian provinces | Place of supply, country and subnational jurisdiction where applicable | High — rate cannot be inferred from country alone |
| VAT / GST Calculator | Same limited country/province preset family | Country, product/service tax treatment, place of supply | High — product and jurisdiction context required |
| Tax Calculator | User-entered flat estimated rate | User must supply applicable effective rate/jurisdiction | Medium — do not infer statutory tax |
| Payroll / Paycheck / Overtime | User-entered withholding or employer contribution assumptions | Employment jurisdiction, tax year, pay frequency and worker classification if rules are automated | High before any automatic withholding logic |
| 401(k) Contribution Calculator | US-specific account label and employer-match assumptions | United States plan/tax limits and tax year | High — explicitly US-specific product |
| Roth vs Traditional IRA Comparison | US-specific account types and tax-rate assumptions | United States eligibility/limits and tax year | High — explicitly US-specific product |
| Mortgage Affordability | Property tax and HOA entered manually | Property location if property-tax estimates are automated | Medium; currently manual |
| CD Calculator | Certificate of Deposit terminology and user-entered APY/term | Product naming varies by country; bank product terms | Medium — localize terminology, keep rate manual |
| Inflation Calculator | Published country inflation presets | Country, indicator series and reference period | Medium — macroeconomic series, not personal tax jurisdiction |
| Remaining lending, savings, investment and business tools | Rates/fees/amounts are primarily user-entered | Country only where local law/product rules are introduced | Manual-first; do not silently supply local rates |

### Current tax profile coverage
- `US-2026-single` — United States — Federal · Single · 2026 (USD)
- `US-2026-joint` — United States — Federal · Married filing jointly · 2026 (USD)
- `US-2026-separate` — United States — Federal · Married filing separately · 2026 (USD)
- `US-2026-hoh` — United States — Federal · Head of household · 2026 (USD)
- `UK-2026-eng` — United Kingdom — England, Wales & Northern Ireland · 2026–27 (GBP)
- `UK-2026-sct` — United Kingdom — Scotland · 2026–27 (GBP)
- `BD-2026-general` — Bangladesh — General individual · AY 2026–27 (BDT)
- `BD-2026-women-senior` — Bangladesh — Women / age 65+ · AY 2026–27 (BDT)
- `BD-2026-third-gender-disability` — Bangladesh — Third gender / disability · AY 2026–27 (BDT)
- `BD-2026-freedom-fighter` — Bangladesh — Gazetted freedom fighter / July fighter · AY 2026–27 (BDT)

The tax profile catalogue has four jurisdiction families: US, UK, Canada and Bangladesh. Canada profiles include federal plus provincial/territorial brackets; US profiles include filing-status variants and a separate state dataset. This is not worldwide tax coverage.

### Existing sales/VAT/inflation preset coverage
- `US` — United States — local rate required; preset rate 0
- `GB` — United Kingdom — standard VAT; preset rate 20
- `BD` — Bangladesh — standard VAT; preset rate 15
- `CA-AB` — Canada — Alberta (GST); preset rate 5
- `CA-BC` — Canada — British Columbia (GST + PST); preset rate 12
- `CA-MB` — Canada — Manitoba (GST + PST); preset rate 12
- `CA-NB` — Canada — New Brunswick (HST); preset rate 15
- `CA-NL` — Canada — Newfoundland and Labrador (HST); preset rate 15
- `CA-NS` — Canada — Nova Scotia (HST); preset rate 14
- `CA-ON` — Canada — Ontario (HST); preset rate 13
- `CA-QC` — Canada — Quebec (GST + QST); preset rate 14.975
- `CA-PE` — Canada — Prince Edward Island (HST); preset rate 15
- `CA-SK` — Canada — Saskatchewan (GST + PST); preset rate 11
- `CA-TERR` — Canada — Territories (GST); preset rate 5

The US preset is a zero placeholder explicitly requiring a local rate, not a general nationwide tax claim. Presets are starting points only; actual applicability can depend on place of supply, goods/services, exemptions and date.

## 5. Input / display / conversion contract recommendations

1. **Currency is explicit per calculation context.** Every money-valued input and output in the 49 identified tools must carry one ISO 4217 currency context, either selected by the user or explicitly stated as an existing legacy default until the user chooses.
2. **No silent conversion.** Changing the display currency changes labels/formatting only; it must not convert input values, results, thresholds, historical records or shared URLs.
3. **Manual-first for rates and prices.** Interest rates, tax rates, fees, tariffs, fuel prices, rents, insurance, salary assumptions and investment returns remain user-entered unless a named, jurisdiction-specific, dated source is intentionally integrated.
4. **Tax rules are jurisdiction-bound.** Require country + subnational region where needed + tax year + relevant filing/product context. Unsupported jurisdictions use manual mode, never a nearest-country proxy.
5. **Currency formatting is not FX conversion.** Use `Intl.NumberFormat(locale, {style:"currency", currency})`; preserve currency-specific fraction digits and avoid hard-coded two-decimal rounding where it changes the underlying calculation.
6. **Unit Price Comparator requires same currency.** Do not compare across currencies unless a separately dated FX conversion is explicitly selected and disclosed.
7. **Record provenance.** Automatic values must carry source ID/URL, series or product, observation/effective date, retrieval timestamp, currency, jurisdiction, freshness state and fallback mode.
8. **User override wins.** A manually edited value must not be overwritten by refresh or a country/currency preference change.
9. **Legacy values are not relabelled as local.** Existing numeric defaults have no evidenced country/currency semantics. Preserve formulas and values during the first migration; clearly mark legacy assumptions pending product-owner approval instead of pretending 250000 USD is 250000 BDT or INR.
10. **No country auto-detection as a legal or currency fact.** A selected country can suggest a currency; user confirms it. Tax jurisdiction must be selected explicitly.

## 6. Priority implementation plan (formula-preserving)

### P0 — Shared currency context
- Connect the Global Settings currency preference from PR #64 to the finance runtime only after that PR's CI/browser/Lighthouse checks pass and it is merged.
- Add a real accessible currency control to the finance tool form, with a safe migration/default policy.
- Add per-tool explicit currency context to the five lifestyle money tools.
- Keep the currency converter's from/to pair independent from display currency.
- Ensure share URLs and history preserve the currency context alongside numeric inputs.

### P1 — Regional/tax controls
- Make tax profile/jurisdiction explicit and clearly label supported years.
- Distinguish US state from country-level selection; reset irrelevant state choices when leaving US.
- Make unsupported country paths manual-only.
- Add data effective-date and source disclosure to tax presets.
- Avoid claiming universal VAT/GST or sales-tax rates.

### P2 — Automated data sources
- Keep Frankfurter limited to explicit FX conversion.
- Do not introduce automatic rates/tax/tariff/interest inputs until CORS, source licensing/terms, schema, rate limits, observation dates, freshness and fallback are verified.
- Add source adapter tests with invalid, stale, unavailable and mismatched-currency fixtures.

## 7. Regression and release safeguards

- Do not modify `finance-core.js`, `tax-engine.js` or any formula function as part of currency display wiring unless a separate mathematical defect is found and approved.
- Preserve all 220 IDs/routes, sitemap and canonical URLs.
- Before merge, run existing Node formula/smoke/regression, API, browser, accessibility and Lighthouse workflows plus new currency-context tests.
- Explicitly compare representative outputs before/after currency UI changes: same numeric values, same formulas, same rounding precision, only currency label/symbol differs.
- Phase 1 PR #64 remains unmerged at audit time; this Phase 2 branch is stacked on its head and must not be merged independently ahead of Phase 1.

## 8. Audit conclusion

The principal globalization gap is not that 220 tools need currency fields. It is that **49 tools carry monetary meaning, but their currency semantics are not consistently explicit**. Thirty-nine monetary Finance tools rely on the shared USD default; two tax tools use the selected jurisdiction's currency; three transfer/conversion tools have mixed source/target currency formatting and source-side USD fallback. The Electricity Bill Estimator defaults to USD; four other non-Finance money tools have absent currency labels/selectors. Finance output formatting currently defaults to USD and the expected display-currency control is not rendered. Tax and regulated financial calculations are only partially jurisdiction-aware.

The safe next change is a narrow, formula-preserving currency-context integration, not an indiscriminate conversion of every numeric field or every tool.
