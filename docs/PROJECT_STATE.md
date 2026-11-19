# FinPulse Hub — Project State

- **Last verified:** 2026-11-19
- **Repository:** https://github.com/apex-global-labs/FinPulse-Hub
- **Production branch:** `main`
- **Production website:** https://apex-global-labs.github.io/FinPulse-Hub/
- **Production release commit:** `ee06c524c7f4ce77109881d6fa877991c5d7851a` (Batch 8)
- **Production inventory:** 175 unique tools (45 Finance + 25 Basic Math + 20 Advanced Math & Statistics + 25 Date & Time + 20 Unit & Data Converters + 20 Developer/Text + 20 Batch 8)
- **Batch 8 PR #39:** merged as `ee06c524c7f4ce77109881d6fa877991c5d7851a`; main CI #44497401581 and Pages deployment #44497401612 succeeded; homepage and sitemap each show 175 unique routes.\n- **Batch 6 PR #34:** merged; [main CI #44492089059](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44492089059) success; [Pages deployment #44492088958](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44492088958) success
- **Batch 6 feature CI:** [Run #44491456053](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44491456053) — 214/214 formula/smoke/regression, 1/1 API, 7/7 browser; all 20 converter views passed axe WCAG 2.1 A/AA
- **Production Lighthouse:** [Run #44492151775](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44492151775) — success; reports attached as artifact

## Latest release update — Batch 7 and performance optimization

- PR #35 merged as `82d8e4b8b5e30bb33bd97aeb5ea0c089c2f57953`; GitHub Pages deployment #44494813995 succeeded.
- Main CI #44494813886 succeeded after Batch 7.
- PR #36 mobile performance optimization merged as `f32466ba801dd993a1d1efbe4c8bd513f2421326`; feature CI #44495042246 succeeded. It removes eager SEO calculations for nine finance tools and defers Chart.js until a bar/scatter chart is requested.
- A new production Lighthouse run is required to quantify post-optimization TBT; 951.5 ms remains the pre-fix baseline.
- Batch 8 feature branch `feat/batch-8-education-everyday-lifestyle-release` targets 175 tools; PR and full CI pending.

## Production verification

- Main homepage directory count: 155.
- Sitemap: 155 unique tool routes.
- Main CI: syntax checks passed; Formula + Smoke + Regression 214/214; API 1/1; Playwright Browser 7/7; all 20 converter views passed WCAG 2.1 A/AA.
- Pages deployment completed successfully for production commit `54539bb522743a627f154708d496c87233619334`.
- Direct live site navigation was not separately inspected by the browser tool in this session; Pages workflow and main source/route inventory provide deployment evidence.

## Lighthouse — production commit 54539bb

| Category | Mobile | Desktop |
|---|---:|---:|
| Performance | 79 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |

| Metric | Mobile | Desktop |
|---|---:|---:|
| LCP | 1,311.5 ms | 334.8 ms |
| CLS | **0.000** | **0.0111** |
| TBT | **951.5 ms** | 0 ms |
| FCP | 979.5 ms | 260.8 ms |
| Speed Index | 1,677.5 ms | 317.7 ms |

Mobile Performance/TBT is materially worse than the prior baseline and should be investigated before final performance sign-off. The Lighthouse workflow succeeded and uploaded artifact `finpulse-lighthouse-reports` (artifact ID 14512892531).

## Batch 7 — Developer & Text Utilities (PR candidate)

- Branch: `feat/batch-7-developer-text-utilities`
- Base: production commit `54539bb522743a627f154708d496c87233619334`
- Target: 135 → 155; 20 unique developer/text tools added to `developer-tools.js`.
- Candidate homepage and sitemap contain 155 unique tool routes. PR #35 is open and mergeable; final CI [#44493842731](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44493842731) succeeded: 226/226 formula/smoke/regression, API 1/1, Browser 8/8, including all 20 new views passing WCAG 2.1 A/AA. Production remains 135 until merge and Pages deployment.
- New tools process text locally. Formatting/minification is intentionally conservative and is not represented as a complete language compiler or security sanitizer.

## Remaining approved roadmap

| Batch | New tools | Target total |
|---|---:|---:|
| 7 — Developer & Text Utilities | 20 | 155 |
| 8 — Education & Everyday Lifestyle Part 1 | 20 | 175 |
| 9 — Lifestyle, Construction, Energy & Misc Part 2 | 15 | 190 |
| 10 — Health & Wellness Part 1 | 15 | 205 |
| 11 — Health & Wellness Part 2 + final verification | 15 | 220 |

Remaining after Batch 6: 85 planned tools. The approved detailed names and duplicate-intent guard remain in `docs/220_TOOL_INVENTORY_AND_ROADMAP.md`.

## Architecture and privacy

- Static HTML/CSS/Vanilla JS on GitHub Pages; no required backend, paid runtime service or account system.
- Finance, math, date/time, unit conversion and developer utilities are registered through local browser modules.
- Text/code inputs are processed locally; no pasted developer content is sent to a third-party service.
- User calculation history remains in browser-local storage.
- Financial outputs remain educational estimates; no trading execution, brokerage, wallet or investment recommendation.


## Batch 8 candidate — 155 → 175

The dedicated branch adds five Developer wrap-up tools, twelve Education & Study tools and three Home & Construction estimators. Each has a five-step guide, formula/rule disclosure, four FAQs, three presets, validation and shared copy/CSV/JSON/print/share/history/Escape-reset controls. Markdown output is escaped; regex matching is bounded and conservative; the Unix helper only converts seconds and milliseconds. Construction quantities are approximate and do not replace engineering specifications. PR and CI evidence will be appended after checks complete.


## Batch 9 production and Batch 10 candidate — 2026-11-19

- Batch 9 PR #40 merged as `4f7909018f04b8ae9a994b21827fd48acdb80a79`; Pages deployment #44501066258 succeeded.
- Post-merge main CI #44501066316 completed successfully, including desktop/mobile Playwright browser tests.
- Production portfolio: 190 tools; homepage, registry and sitemap aligned at 190 routes.
- Batch 10 branch: `feat/batch-10-health-wellness-part-1`; adds the first 15 approved sleep and activity/pace tools and targets 205 tools. Candidate only until CI, PR review, merge and deployment.
- Batch 10 tools are informational time/distance/pace/speed/schedule calculations only. Every tool carries a medical disclaimer and disclosed model limitations; no diagnosis, weight/calorie goals or treatment advice.


## Batch 10 merge and Batch 11 final candidate — 2026-11-19

- PR #41 (Batch 10, 15 tools) merged by squash as `f7eaf356971523f8e6dda2d30278cdc972ef4836`.
- Before merge, PR commit `6a4996492ddd482544d67665127f87b46744e470` CI #44503379859 succeeded: 261/261 Node formula/smoke/regression tests, API 1/1, Browser 11/11, and all 15 Batch 10 views passed WCAG 2.1 A/AA.
- Main source now contains 205 tools; homepage counter and sitemap each show 205. The post-merge main CI and Pages deployment have not yet been independently confirmed; do not claim the public site is at 205 until both succeed and live routes are checked.
- Batch 11 branch: `feat/batch-11-health-wellness-final-220`; candidate target 220 tools, adding the remaining 15 unique Health & Wellness items from the approved roadmap.
- Batch 11 keeps calculations informational and user-entered only. No recommended activity, breathing or hydration target; no medical diagnosis, treatment, or exercise prescription. Goal tracking requires a user-entered goal; hydration logs summarize records only.
- Final acceptance requires 220 unique registry IDs, 220 sitemap routes, all 115 legacy + 105 expansion tools in formula/smoke/regression/browser/accessibility checks, API 1/1, and production Lighthouse/CLS evidence.
