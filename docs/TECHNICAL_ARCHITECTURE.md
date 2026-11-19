# FinPulse Hub — Technical Architecture (As Built)

- **Version:** 2.0
- **Verified:** 2026-11-19
- **Status:** Implemented production architecture
- **Production:** https://apex-global-labs.github.io/FinPulse-Hub/

## 1. Architecture summary

FinPulse Hub is a static-first single-page calculator library hosted on GitHub Pages. The production application uses semantic HTML, CSS and vanilla JavaScript. Calculation logic is separated from the DOM and tool presentation. There is no required backend, database, account service or paid runtime dependency.

The production release now registers 205 tools (Batch 10); the final Batch 11 release candidate registers 220:

- 45 financial calculators
- 25 basic mathematics tools
- 20 advanced mathematics and statistics tools
- 25 date and time tools
- 20 unit, measurement and data converters
- 20 developer and text utilities
- 20 education and home tools
- 15 lifestyle and construction tools
- 15 Health & Wellness tools (Batch 10 production)
- 15 additional Health & Wellness tools (Batch 11 candidate)

## 2. Runtime modules

| File | Responsibility |
|---|---|
| `index.html` | Static shell, metadata, navigation, calculator workspace, directory and script loading |
| `styles.css` | Responsive layout, shared components, theme tokens, calculator and table styles |
| `app.js` | Finance tool registry, routing, shared renderer, input handling, results and workspace orchestration |
| `finance-core.js` | Finance calculation functions and schedules |
| `math-core.js` | Basic math calculation functions |
| `math-tools.js` | 25 basic math tool definitions, input metadata and SEO/guide content |
| `advanced-math-core.js` | Advanced equation, matrix, statistics and probability functions |
| `advanced-math-tools.js` | 20 advanced math/statistics tool definitions |
| `date-time-core.js` | Gregorian date, calendar, recurrence and time-zone calculation logic |
| `date-time-tools.js` | 25 date/time tool definitions and formula/step metadata |
| `unit-converter-core.js` | SI/imperial, temperature, fuel economy, storage, throughput, Roman numeral, base and paper-size conversion functions |
| `unit-converter-tools.js` | 20 converter definitions, reverse direction, presets, formulas, steps and FAQs |\n| `developer-tools.js` | 20 local text, encoding, formatting and minification utilities with validation and guides |
| `smart-ui.js` | Shared currency metadata, synchronized controls, presets and UI helpers |
| `tax-data.js`, `tax-state-data.js`, `tax-engine.js` | Versioned jurisdiction data and tax/payroll calculations |
| `asset-data.js` | User-selected hypothetical asset/scenario labels and baseline-only metadata |

Tool registries carry stable IDs, names, categories, field definitions, calculation functions and relevant explanatory content. The central renderer composes the registries into one searchable application and homepage directory.

## 3. Calculation and validation design

- Core calculation modules expose deterministic functions that accept numeric/date inputs and return structured results.
- Input boundaries validate finite numbers, allowed ranges, supported date/time formats, IANA time-zone identifiers and domain-specific constraints.
- Unsupported or undefined operations return clear validation errors rather than plausible-looking invalid values.
- Rounding is applied for display at the presentation layer where possible; calculations retain intermediate precision.
- Financial schedules expose monthly rows and yearly aggregates only where a schedule is meaningful.
- Calendar and date tools use semantic tables/grids; charts are not forced onto non-chart tasks.
- Date/time behavior includes leap-day handling, month-end anchored recurrence, timestamp bounds and rejection of nonexistent DST spring-forward local times.

## 4. Shared user interface

The shared workspace provides, where relevant:

- Live input-driven calculation and synchronized numeric/range controls
- Formula and step-by-step calculation panels
- Relevant graph, geometry diagram, calendar grid, schedule and breakdown renderers
- Strict empty/invalid numeric input handling
- Copy, CSV/JSON export, print, shareable URL parameters and reset
- Local recent-calculation history with restore
- Light/dark theme and keyboard shortcuts
- Related tools, embed-code generation and reserved ad-safe slots

Chart.js is loaded asynchronously from a pinned jsDelivr distribution with subresource integrity where applicable; an accessible SVG fallback keeps the relevant visual output available when the CDN is unavailable.

## 5. Routing, SEO and directory

- Stable tool IDs are used by the `?tool=` query route.
- Each tool has its own metadata and explanatory content where implemented.
- Batch 10 merge updates the main source homepage and sitemap to 205 unique routes; Batch 11 candidate branch targets 220. Public deployment must be verified independently before the production count is updated.
- Canonical/title metadata is updated for selected tool routes.
- `robots.txt` points to the XML sitemap.
- The production deployment copies every runtime module and discovery file into the Pages artifact.

## 6. Privacy and security

- No account system or backend is required.
- Calculator inputs are processed in the browser; recent calculation history is local to the device.
- Content Security Policy restricts script, style, font, connection, image and frame sources.
- External network access is limited to the published currency reference-rate source and pinned chart library where used.
- Untrusted text is escaped before being inserted into the UI.
- No API keys or private credentials are shipped in browser code.

## 7. Automated verification

### Commands

```bash
npm run check
npm test
npm run test:api
npm run test:browser
```

### Current suites

| Suite | Purpose |
|---|---|
| `tests/formula.test.cjs` | Finance formulas, schedules, math/statistics and date/time boundaries |
| `tests/smoke.test.cjs` | Registry uniqueness, tool count, runtime loading, directory/sitemap parity, CSP and deployment contract |
| `tests/api.test.cjs` | Live Frankfurter v2 reference-rate response contract |
| `tests/browser.test.cjs` | Playwright desktop/mobile interactions, routes, accessibility and family-specific visual/guide rendering |

The previous Batch 5 CI run recorded 198/198 formula/smoke/regression assertions, 1/1 API assertion and 6/6 browser tests. Batch 6 adds a dedicated deterministic converter formula suite and a Playwright/axe loop over all 20 converter views; Run #44491064031 passed: 214/214 formula/smoke/regression assertions, 1/1 API assertion and 7/7 browser tests. The Batch 6 browser loop opens all 20 converter views and each passed axe WCAG 2.1 A/AA. Main CI and Pages deployment for Batch 6 succeeded; Batch 7 PR #35 CI is green (Run #44493842731); merge and production deployment await approval. The Playwright/axe suite iterates the registered tool families, including Batch 10 and the final Batch 11 candidate views.

### CI workflow

`.github/workflows/ci.yml` runs syntax checks, Node tests, the live reference-rate API check and Playwright/axe Chromium tests on pull requests and main pushes.

## 8. Deployment and performance

- `.github/workflows/deploy.yml` publishes the static site to GitHub Pages on pushes to `main`.
- The deployment artifact includes `index.html`, CSS, all runtime JavaScript modules, `sitemap.xml`, `robots.txt` and `.nojekyll`.
- `.github/workflows/lighthouse.yml` runs mobile and desktop Lighthouse after successful Pages deployment and uploads JSON reports.
- The desktop calculator workspace reserves initial layout height to prevent the deferred first-tool render from shifting the directory below it.

## 9. Latest measured Lighthouse results

Measured on production runtime commit `da94f90328c80f557a98b08fa889d4c429046348`:

| Category | Mobile | Desktop |
|---|---:|---:|
| Performance | 97 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |

| Metric | Mobile | Desktop |
|---|---:|---:|
| LCP | 1,261.4 ms | 351.1 ms |
| CLS | 0.000 | 0.0102 |
| TBT | 182 ms | 0 ms |
| FCP | 819.4 ms | 311.1 ms |
| Speed Index | 1,040.7 ms | 311.1 ms |

## 10. Product boundaries

- Financial tools are educational estimates and scenario calculators, not individualized financial advice.
- Tax/payroll calculations are limited to the data and jurisdiction profiles explicitly shown.
- Currency reference rates are not live trading or bank settlement quotes.
- No trading execution, brokerage, exchange, wallet or financial product recommendation is implemented.
- New paid APIs, backend services, frameworks or dependencies require explicit approval and a cost/privacy/reliability review.


## Batch 11 module

`health-wellness-tools.js` adds the final 15 user-entered Health & Wellness calculators. The module exposes a separate registry consumed by `app.js`. The tools use deterministic arithmetic and log summaries; no health target is recommended. Interval and breathing tools only calculate schedule durations, not live timers or technique instructions. Hydration tracking does not infer or recommend intake.


## Batch 10 production verification

Main CI #44504320519 passed 261/261 tests, API 1/1 and Browser 11/11. Pages deployment #44504320744 succeeded; its published artifact contains 205 homepage entries and 205 sitemap URLs. Production Lighthouse #44504380240 measured mobile Performance 83 / desktop 100, Accessibility 100, SEO 100, CLS 0.000 / 0.0089, LCP 1,534.7 ms / 384.1 ms and TBT 699 ms / 0 ms.
