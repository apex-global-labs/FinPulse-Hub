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
| Playwright browser suite before full Date & Time browser expansion | 5 / 5 passed |
| Formula/default-value and guide coverage | All 115 tools covered by registry/smoke/formula assertions |
| WCAG browser checks | 45 Finance + 45 Math & Statistics views; full 25 Date & Time browser audit added in Batch 5 verification PR |
| GitHub Pages deployment | Success |
| Lighthouse mobile + desktop | Success |

The final Batch 5 browser-coverage PR adds an axe WCAG 2.1 A/AA audit and formula-guide assertion for each of the 25 Date & Time views. Its final CI result is recorded in the PR and supersedes the pre-expansion browser count above.

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
