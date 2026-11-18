# FinPulse Hub — Project State

- Last verified: 2026-11-18
- Repository: https://github.com/apex-global-labs/FinPulse-Hub
- Production branch: main
- Production commit at start of PR #21: 4cb47e8411dec059f5ec25af5a79b5509df89803
- Production website: https://apex-global-labs.github.io/FinPulse-Hub/ (36 calculators from PR #20)
- PR #21: https://github.com/apex-global-labs/FinPulse-Hub/pull/21
- PR #21 branch head: c5d7c9a53fbc455105b0c48ff5b253e009192214
- PR #21 branch CI: run #44311781048 — success
- PR #21 scope: final nine calculators, 45-tool directory/routes, 45-entry sitemap, runtime-complete Pages artifact
- PR #21 merge and Pages deployment: pending at the time of this verification
- Final Lighthouse audit: pending after PR #21 deployment

## Verified PR #21 test evidence

| Check | Result |
|---|---:|
| Syntax check | Passed |
| Formula + smoke suite | 99/99 passed |
| Frankfurter API reference check | 1/1 passed |
| Playwright desktop/mobile | 3/3 passed |
| axe WCAG 2.1 A/AA | Passed across all 45 calculator views in desktop loop |
| Unique calculator IDs | 45/45 |
| Sitemap entries | 45 |

## Production history

- PR #20 merged as 4cb47e8411dec059f5ec25af5a79b5509df89803.
- Main CI #44305761335 succeeded.
- GitHub Pages deployment #44305761259 succeeded.
- The prior deployment artifact copied only the original four files. PR #21 corrects this by publishing all runtime modules (smart UI, tax datasets/engine and asset registry) as well as the site shell and sitemap/robots files.

## Product boundaries

- Browser-side static app; free-first, no paid backend.
- Tax/payroll calculations are educational estimates with explicit exclusions, not filing-grade results.
- Crypto asset selectors use hypothetical user-entered baseline values, not live prices or exchange feeds.
- ROI, cash-flow, rental-yield, emergency-fund and net-worth tools perform arithmetic on user-entered assumptions; they do not make financial product recommendations.

## Next actions

1. Merge PR #21 only while the current head is unchanged and all branch checks remain green.
2. Verify the post-merge main commit and GitHub Pages deployment workflow.
3. Verify the live site serves all 45 calculators and the 45-entry sitemap/robots files.
4. Run the final Lighthouse audit on the deployed production commit and record actual scores and report evidence.
5. Update this file with the merge SHA, deployment run and Lighthouse result.
