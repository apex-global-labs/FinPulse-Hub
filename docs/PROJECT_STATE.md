# FinPulse Hub — Project State

- **Last verified:** 2026-11-19
- **Repository:** https://github.com/apex-global-labs/FinPulse-Hub
- **Production branch:** `main`
- **Production website:** https://apex-global-labs.github.io/FinPulse-Hub/
- **Runtime release commit:** `da94f90328c80f557a98b08fa889d4c429046348`
- **Batch 4 PR #30:** merged as `af4abacd21f80be3b14c05a4e8d8f8b838e8dfbf`
- **Batch 5 CLS correction PR #32:** merged as `da94f90328c80f557a98b08fa889d4c429046348`
- **Main CI:** [Run #44482378369](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44482378369) — success
- **Pages deployment:** [Run #44482378411](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44482378411) — success
- **Lighthouse:** [Run #44482429197](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44482429197) — success; report artifact retained by GitHub Actions

## Production inventory

| Family | Active tools | Registry module |
|---|---:|---|
| Financial calculators | 45 | `app.js` |
| Basic mathematics | 25 | `math-tools.js` |
| Advanced mathematics & statistics | 20 | `advanced-math-tools.js` |
| Date & time | 25 | `date-time-tools.js` |
| **Total** | **115** | |

All 115 tools are registered, the homepage directory contains 115 unique links, and the sitemap has a corresponding unique route for each tool.

## Final verification evidence

| Check | Latest result |
|---|---:|
| JavaScript syntax checks | Passed |
| Formula + smoke + regression suite | 198 / 198 passed |
| Frankfurter reference-rate API test | 1 / 1 passed |
| Playwright browser suite (all 115 tool views) | 6 / 6 passed |
| Formula/default-value and guide coverage | All 115 tools covered by registry/smoke/formula assertions |
| WCAG browser checks | 45 Finance + 45 Math & Statistics views; full 25 Date & Time browser audit added in Batch 5 verification PR |
| GitHub Pages deployment | Success |
| Lighthouse mobile + desktop | Success |

The final Batch 5 browser suite iterates all 45 Finance, 45 Math & Statistics and 25 Date & Time views. Each Date & Time view must render its formula/step guide and pass axe WCAG 2.1 A/AA checks.

## Lighthouse — runtime commit da94f903

| Category | Mobile | Desktop |
|---|---:|---:|
| Performance | 97 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |

| Metric | Mobile | Desktop |
|---|---:|---:|
| LCP | 1,261.4 ms | 351.1 ms |
| CLS | **0.000** | **0.0102** |
| Total Blocking Time | 182 ms | 0 ms |
| First Contentful Paint | 819.4 ms | 311.1 ms |
| Speed Index | 1,040.7 ms | 311.1 ms |

### CLS investigation and correction

- Initial desktop Lighthouse run identified `body > section#tool-directory` as the shifted element (CLS 0.142).
- A directory-grid-only height reservation did not address the cause and was superseded.
- The root cause was the first calculator view expanding `#app` after deferred JavaScript initialization, moving the directory below it.
- PR #32 reserves the desktop calculator workspace before that render and removes the unnecessary directory-grid workaround.
- Re-audit after deployment measured mobile CLS 0.000 and desktop CLS 0.0102.

## Test coverage notes

- `npm test` runs 198 Node.js formula, smoke and regression assertions across finance, basic math, advanced math/statistics and date/time.
- The smoke suite checks the 115-tool registry, unique IDs, homepage links, sitemap parity, security contract, required runtime modules and deployment files.
- Date & Time formula tests verify that all 25 tools calculate from defaults and expose formula/step metadata.
- The API test applies only to the Currency Converter's optional Frankfurter rate source; other tools are browser-side and do not require external APIs.
- Browser tests use Playwright and axe. Finance and Math tool families are iterated across their full registries; Batch 5 adds the same full-view browser/accessibility loop for all 25 Date & Time tools.

## Product and privacy boundaries

- Static browser-side application; no required backend, paid service or account system.
- User-entered calculator values are processed locally; the app's calculation history is stored on the user's device.
- Currency reference rates are published rates, not live transaction quotes.
- Tax/payroll outputs are estimates with explicit jurisdiction and scope limitations.
- Financial projections are scenario illustrations, not guarantees or personal financial advice.


## Batch 6 — Unit, Measurement & Data Converters (PR candidate)

- **Branch:** `feat/batch-6-unit-measurement-converters`
- **Base commit:** `219399ed588c26885d8902a3c1237c63c91d9c87`
- **Candidate inventory:** 135 tools (115 preserved + 20 new); production remains 115 until PR merge and Pages deployment.
- **New runtime modules:** `unit-converter-core.js`, `unit-converter-tools.js`
- **New IDs:** `length-converter`, `mass-converter`, `temperature-converter`, `area-converter`, `volume-converter`, `speed-converter`, `pressure-converter`, `energy-converter`, `power-converter`, `frequency-converter`, `angle-converter`, `fuel-economy-converter`, `density-converter`, `cooking-measurement-converter`, `data-storage-converter`, `data-transfer-speed-converter`, `download-time-estimator`, `number-base-converter`, `roman-numeral-converter`, `paper-size-converter`.
- **Sitemap candidate:** 135 unique tool routes.
- **PR:** [#34](https://github.com/apex-global-labs/FinPulse-Hub/pull/34), open and mergeable; awaiting explicit user approval.
- **CI:** [Run #44491064031](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44491064031) — success; syntax passed, Formula + Smoke + Regression 214/214, API 1/1, Browser 7/7. All 20 converter views passed WCAG 2.1 A/AA axe checks.
- **QA state:** PR CI green; main CI and Pages deployment remain pending merge. Do not count these tools as production-delivered until merge and deployment succeed.

## Latest Lighthouse rerun — production baseline commit 219399ed

- [Run #44483331679](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44483331679) completed successfully and uploaded artifact `finpulse-lighthouse-reports`.
- Mobile: Performance 98, Accessibility 100, Best Practices 96, SEO 100; LCP 1,348 ms, TBT 175 ms, CLS 0.000.
- Desktop: Performance 100, Accessibility 100, Best Practices 96, SEO 100; LCP 623 ms, TBT 0 ms, CLS 0.000.
- Both viewport audits recorded zero CLS.
