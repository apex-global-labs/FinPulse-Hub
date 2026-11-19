# FinPulse Hub — Project State

- Last verified: 2026-11-19
- Repository: https://github.com/apex-global-labs/FinPulse-Hub
- Production branch: main
- Production commit before PR #21: 4cb47e8411dec059f5ec25af5a79b5509df89803 (36 calculators)
- Production website: https://apex-global-labs.github.io/FinPulse-Hub/
- PR #21: https://github.com/apex-global-labs/FinPulse-Hub/pull/21
- PR #21 branch: `feat/45-calculators-pr21`
- PR #21 latest changes include the final nine calculators, homepage directory, 45-route sitemap, runtime-complete Pages artifact and stronger navigation/sitemap/direct-route regression tests.
- PR #21 remains open; merge and production deployment are not yet verified.
- Lighthouse audit is configured to run after a successful GitHub Pages deployment; final mobile/desktop results are pending.

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

## QA evidence before the latest regression-test additions

| Check | Verified result |
|---|---:|
| Syntax check | Passed |
| Formula + smoke suite | 99/99 passed |
| Frankfurter API reference check | 1/1 passed |
| Playwright desktop/mobile | 3/3 passed |
| axe WCAG 2.1 A/AA | Passed across all 45 calculator views |
| Registered calculator IDs | 45 unique |
| Sitemap routes | 45 unique |
| Homepage directory | Generated from the 45-item registry |
| Final nine SEO FAQ blocks | Three FAQs per tool |
| Final nine charts | Chart.js datasets with SVG fallback |

A new branch CI run is required after the additional sitemap-parity, homepage-link and direct query-route assertions.

## Production history

- PR #20 merged as 4cb47e8411dec059f5ec25af5a79b5509df89803.
- Main CI #44305761335 succeeded.
- GitHub Pages deployment #44305761259 succeeded.
- PR #21 fixes the prior Pages artifact omission by publishing all runtime modules and sitemap/robots discovery files.

## Product boundaries

- Browser-side static app; free-first, no paid backend.
- Tax/payroll calculations are educational estimates with explicit exclusions, not filing-grade results.
- Crypto asset selectors use hypothetical user-entered baseline values, not live prices or exchange feeds.
- ROI, cash-flow, rental-yield, emergency-fund and net-worth tools perform arithmetic on user-entered assumptions; they do not make financial product recommendations.

## Next actions

1. Verify the newest PR #21 head and require all branch checks to pass.
2. Merge only the verified head.
3. Verify the resulting main commit and GitHub Pages deployment workflow.
4. Verify the live site and production sitemap/robots files.
5. Run mobile and desktop Lighthouse audits against the deployed production site and record the actual scores and report artifact.
