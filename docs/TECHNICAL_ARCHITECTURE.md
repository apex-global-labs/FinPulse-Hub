# FinPulse Hub — Technical Architecture

- **Version:** 1.0
- **Date:** 2026-11-18
- **Status:** Proposed architecture; implementation not started

## 1. Architecture decision

Use a static-first website hosted on GitHub Pages. Initial stack:

- Semantic HTML
- Modern CSS
- Vanilla JavaScript (ES modules)
- JSON for static calculator metadata and test fixtures
- Node.js built-in test runner for formula and data tests
- GitHub Actions for automated checks and deployment

Avoid a required backend, paid database, paid framework, paid build service or paid API. A framework may be reconsidered only if measured needs justify it and the free deployment path remains reliable.

## 2. Proposed project structure

```text
/
├── index.html
├── calculators/
│   ├── loan-emi/
│   ├── mortgage/
│   └── ...
├── assets/
│   ├── css/
│   ├── icons/
│   └── images/
├── src/
│   ├── app/
│   ├── core/
│   │   ├── finance/
│   │   ├── money/
│   │   └── validation/
│   ├── calculators/
│   ├── data/
│   └── ui/
├── tests/
│   ├── unit/
│   ├── fixtures/
│   └── browser/
├── docs/
└── .github/
    └── workflows/
```

This is a target structure, not a statement that these paths already exist. Final routing and structure will be chosen before code implementation.

## 3. Calculation engine

Keep formulas separate from the DOM and page layout. A formula module should accept validated plain data and return a predictable result object.

Illustrative result shape:

```js
{
  value: 1234.56,
  currency: "USD",
  period: "month",
  breakdown: {},
  assumptions: [],
  warnings: []
}
```

Rules:
- Formula functions must be deterministic and side-effect free.
- Validate types, finite numbers, ranges and units at the boundary.
- Never parse locale-formatted display strings as calculation inputs.
- Keep intermediate precision; round only at documented display or contractual steps.
- Treat currency, rate period and payment frequency as explicit values.
- Do not assume all currencies have two decimal places.
- Do not silently convert annual rates to monthly rates without specifying the convention.
- Handle zero interest, zero term, zero principal and boundary conditions intentionally.
- Reject unsupported combinations rather than returning plausible-looking numbers.
- Each formula must have documented examples and independent test vectors.

For amortizing loans, document the payment convention and compounding assumptions. If periodic rate is zero, payment is principal divided by number of periods. For positive periodic rate (r), principal (P), and number of payments (n), the standard fixed-payment formula is:

`payment = P * r / (1 - (1 + r)^(-n))`

The formula is valid only when the stated fixed-rate, equal-period assumptions apply. Fees, taxes, variable rates, lender rules and payment timing can change real contracts.

## 4. Money and rounding

Use a deliberate precision policy. Prefer integer minor units for final currency posting-style arithmetic where the currency's minor unit is known, or a decimal-safe approach where intermediate precision matters. Do not rely on repeated binary floating-point rounding for financial ledgers. For general estimates, document the precision and final rounding convention.

Currency metadata must include currency code and minor-unit precision where applicable. Display formatting must be locale-aware but must not change the underlying numerical value.

## 5. Market data and external dependencies

Core calculators must work without live external data. Rates or tax tables may be optional enhancements only.

- Currency converter: allow manual reference rate entry as a reliable fallback. If a free public rate source is added, display provider, timestamp, update frequency and limitations.
- Do not scrape exchanges or financial websites.
- Do not embed exchange/broker/wallet connectivity.
- Do not promise real-time rates unless the source actually provides them.
- Do not put private API keys in browser code or commit secrets.
- A failed or stale data request must show a clear warning and preserve manual calculation mode.

Free API tiers may change or impose limits; the core product must not fail when an optional endpoint is unavailable.

## 6. Country-specific tax and salary data

Tax, payroll, VAT/GST and statutory overtime rules must be data-driven and versioned by jurisdiction and effective date. Each rule set needs:
- Country/region and tax year.
- Official or authoritative source URL.
- Effective date and last-checked date.
- Formula notes and test examples.
- Reviewer/status and known exclusions.

Do not launch an unsupported country. A generic percentage example must be labelled as an illustration, not that country's tax calculation.

## 7. User interface and routing

- Mobile-first, responsive layouts.
- Shared header, navigation, category cards, search and calculator template.
- Each calculator has a stable, readable route and canonical URL.
- Labels, help, errors and result summaries are accessible.
- Prefer progressive enhancement; calculator logic should remain understandable without a large client framework.
- Avoid layout shifts and unnecessary animation.
- Provide a visible disclaimer and link to methodology/assumptions.

## 8. SEO and metadata

- Static, crawlable HTML content for important calculator pages.
- Unique title, description, H1 and canonical URL.
- XML sitemap generated from actual published pages.
- Correct robots directives.
- Open Graph metadata for sharing.
- Structured data only when it matches visible, eligible page content.
- No duplicate canonical variants, empty calculator pages or auto-generated thin content.

## 9. Testing strategy

### Unit tests
Test formula outputs, rounding, zero-rate cases, boundaries, invalid values and currency precision.

### Cross-checks
Compare selected examples with an independently calculated expected result. Preserve source and calculation notes in fixtures.

### UI tests
Test form labels, error states, reset, result display, mobile layouts, keyboard use and screen-reader announcements.

### Regression tests
Every formula defect becomes a permanent test. Run the complete suite on each pull request and before deployment.

### Browser and accessibility checks
Verify current Chromium-based browser and at least one additional browser where free automation is available. Check keyboard navigation, contrast, headings, labels and responsive behavior.

## 10. Security and privacy

- No account system or collection of sensitive financial information in the MVP.
- Do not log input values, full calculation payloads or personal data.
- Escape untrusted strings before rendering.
- Validate and constrain every input.
- Use restrictive, reviewed external-script policy; minimise third-party scripts.
- Keep dependencies minimal and review any introduced dependency.
- Never commit tokens, passwords, private keys or personal information.
- Add a privacy notice explaining any analytics or external data requests before enabling them.

## 11. Performance

- Keep initial page payload small.
- Load calculator-specific code only where needed.
- Optimise images and use modern formats.
- Avoid unnecessary libraries and network requests.
- Measure actual performance after the UI exists; do not claim a score before measurement.

## 12. CI and deployment

GitHub Actions should, at minimum:
1. Check repository structure and required files.
2. Run formula/unit tests.
3. Run lint or static checks if configured.
4. Build/validate the static site.
5. Deploy only from the approved production branch after required checks pass.

The deployment workflow and GitHub Pages source must be verified before announcing a live site. The target URL is `https://apex-global-labs.github.io/FinPulse-Hub/`; it is not live until a successful deployment and public URL check are recorded.

## 13. Free-service policy

Initial launch must not depend on paid hosting, a paid domain, paid API, paid analytics, premium package, or subscription. GitHub Pages is the intended free hosting route for a public static repository. Service terms, limits and availability may change, so verify them at the time of deployment.

## 14. Architecture change control

Any new framework, backend, API or data provider requires a short written justification covering user value, cost, privacy, reliability, maintenance and whether the project can remain fully free. Do not introduce a paid dependency without explicit user approval.
