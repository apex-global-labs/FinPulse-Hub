# FinPulse Hub — Project State

- Last verified: 2026-11-19
- Repository: https://github.com/apex-global-labs/FinPulse-Hub
- Production branch: main
- Production commit for the 45-calculator release: 57bd8dbcc013b338cd5c1c543c5498bc0654f070
- Production website: https://apex-global-labs.github.io/FinPulse-Hub/
- PR #21: https://github.com/apex-global-labs/FinPulse-Hub/pull/21 — merged 2026-11-19.
- Final calculator inventory: 45/45 registered, unique and linked from the homepage; sitemap contains 45 unique calculator routes.
- Latest verified main CI: #44454242514 — success.
- GitHub Pages deployment: #44454242457 — success.
- Lighthouse audit: #44454284201 — success; mobile and desktop reports uploaded as artifact.

## Final nine calculators

37. Freelance Project Pricing Calculator
38. Freelancer Net Income After Costs Calculator
39. Markup Calculator
40. Break-even Calculator
41. Business ROI Calculator
42. Cash Flow Projection Calculator
43. Rental Yield Calculator
44. Emergency Fund Calculator
45. Net Worth Calculator

## Final QA results

| Check | Result |
|---|---:|
| Syntax checks | Passed |
| Formula + smoke suite | 100/100 passed |
| Frankfurter API check | 1/1 passed |
| Playwright desktop/mobile | 3/3 passed |
| axe WCAG 2.1 A/AA | Passed across all 45 calculator views |
| Unique calculator IDs | 45/45 |
| Homepage directory links | 45 unique |
| Sitemap routes | 45 unique; exact registry parity |
| Direct query route | Net Worth route/title/canonical verified |
| Pages deployment artifact | All runtime modules + sitemap + robots published |

## Lighthouse (production commit 57bd8db)

| Category | Mobile | Desktop |
|---|---:|---:|
| Performance | 90 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |

| Metric | Mobile | Desktop |
|---|---:|---:|
| LCP | 1,458.7 ms | 254.1 ms |
| CLS | 0.000 | 0.0607 |
| Total Blocking Time | 408.5 ms | 0 ms |
| FCP | 972.7 ms | 216.0 ms |
| Speed Index | 1,377.1 ms | 236.8 ms |

- Lighthouse workflow #44454284201 completed successfully and uploaded both JSON reports.
- Report artifact: https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44454284201/artifacts/14497012676
- Mobile Performance 90 and Best Practices 96 remain optimization opportunities; accessibility and SEO scored 100 on both profiles.

## Product boundaries

- Browser-side static app; free-first, no paid backend.
- Tax/payroll calculations are educational estimates with explicit exclusions, not filing-grade results.
- Crypto asset selectors use hypothetical user-entered baseline values, not live prices or exchange feeds.
- ROI, cash-flow, rental-yield, emergency-fund and net-worth tools perform arithmetic on user-entered assumptions; they do not make financial product recommendations.
