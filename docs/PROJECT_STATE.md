# FinPulse Hub — Project State

- **Last verified:** 2026-11-19
- **Repository:** https://github.com/apex-global-labs/FinPulse-Hub
- **Production branch:** `main`
- **Production website:** https://apex-global-labs.github.io/FinPulse-Hub/
- **Latest production commit:** `63822f8f43e0e1eb21ca85d0969b7ecb05e52313` (Batch 11 merged and deployed)
- **Verified production inventory:** 220 unique tools (45 Finance + 25 Basic Math + 20 Advanced Math & Statistics + 25 Date & Time + 20 Unit & Data Converters + 20 Developer/Text + 5 Developer wrap-up + 12 Education/Study + 3 Home/Construction + 15 Lifestyle/Construction + 15 Health & Wellness Part 1 + 15 Health & Wellness Part 2)
- Historical verification notes below describe earlier releases; the final Batch 11 release record at the end of this document supersedes older counts.
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


## Batch 10 merge and Batch 11 release — 2026-11-19

- PR #41 (Batch 10, 15 tools) merged by squash as `f7eaf356971523f8e6dda2d30278cdc972ef4836`.
- Before merge, PR commit `6a4996492ddd482544d67665127f87b46744e470` CI #44503379859 succeeded: 261/261 Node formula/smoke/regression tests, API 1/1, Browser 11/11, and all 15 Batch 10 views passed WCAG 2.1 A/AA.
- Main CI #44504320519 succeeded: 261/261 tests, API 1/1, Browser 11/11. Pages deployment #44504320744 succeeded; its published artifact contains 205 homepage entries and 205 sitemap URLs. Production Lighthouse #44504380240 succeeded: mobile Performance 83, desktop 100, Accessibility 100, SEO 100, CLS 0.000 / 0.0089.
- Direct external HTTP probing of the Pages URL was unavailable from the current execution environment due DNS resolution; deployment status and the published Pages artifact were verified instead.
- Batch 11 branch `feat/batch-11-health-wellness-final-220`; PR #42 merged as `63822f8f43e0e1eb21ca85d0969b7ecb05e52313`; production target achieved: 220 tools.
- Batch 11 keeps calculations informational and user-entered only. No recommended activity, breathing or hydration target; no medical diagnosis, treatment, or exercise prescription. Goal tracking requires a user-entered goal; hydration logs summarize records only.
- Final acceptance requires 220 unique registry IDs, 220 sitemap routes, all 115 legacy + 105 expansion tools in formula/smoke/regression/browser/accessibility checks, API 1/1, and production Lighthouse/CLS evidence.


## Final Batch 11 production release — 2026-11-19

- PR #42 merged by squash as production commit `63822f8f43e0e1eb21ca85d0969b7ecb05e52313`.
- Candidate Finance CI [#44510604397](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44510604397) and Candidate Lighthouse [#44510604392](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44510604392) both succeeded.
- Main CI [#44511324462](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44511324462) succeeded: syntax checks passed; 275/275 formula, smoke and regression tests; Frankfurter API 1/1; Playwright browser suite 13/13. The final browser audit rendered all 220 unique routes and passed axe WCAG 2.1 A/AA checks.
- GitHub Pages deployment [#44511324424](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44511324424) succeeded. Published artifact `github-pages` (artifact ID `14522372777`) was inspected: it contains 220 sitemap tool URLs, a homepage with the 220-tool counter, and `health-wellness-tools.js`.
- Production Lighthouse [#44511405172](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44511405172) succeeded. Mobile: Performance 95, Accessibility 100, Best Practices 96, SEO 100, CLS 0.000, LCP 1,539.8 ms, TBT 253 ms. Desktop: Performance 100, Accessibility 100, Best Practices 96, SEO 100, CLS 0.0094, LCP 384.3 ms, TBT 0 ms.
- Verified portfolio: 220/220 unique tools; homepage counter, registry and canonical sitemap all align. Latest verified production commit: `63822f8f43e0e1eb21ca85d0969b7ecb05e52313`.

## Phase 2D tax jurisdiction audit candidate — 2026-11-22

- Production main baseline at audit start: a4983bf8b84e8a2777bbed137ecedb70d74d6011. Production inventory remains 220 tools; no merge or deployment was performed by this Phase 2D candidate.
- Existing PR #66 remains Draft for Phase 2A–2C. Phase 2D work is isolated on feat/tax-jurisdiction-audit-phase-2d, based on PR #66 candidate head 8b2e83186025bb2c5214b2194fc0752bc9bcd7c0.
- Canada: candidate now applies 2026 federal BPA, province/territory BPA credits, Manitoba/Yukon phase-outs and Québec federal abatement. Other personal credits and provincial surtaxes remain excluded.
- Bangladesh: candidate adds Tk 50,000 per eligible disabled dependent child and corrects Tk 5,000 minimum-tax boundary logic. Bangladesh payroll statutory withholding is explicitly marked not configured; Salary Take-Home is not a statutory net-pay estimate.
- US states: all 50 state tax authority portal links replace the previous shared secondary source. 0/50 2026 rate schedules are marked fully verified; data remains provisional until each official schedule, deduction, credit and local-tax scope is reconciled.
- New tax regression tests and Bangladesh mobile browser/axe checks have been added. Final CI, browser, accessibility and Lighthouse evidence is pending.
- Audit details: docs/TAX_JURISDICTION_AUDIT_2026-11-22.md. State source register: tax-state-data.js.
- Release gate: do not merge PR #66 or Phase 2D work and do not deploy until all tax-specific validation succeeds and the 50-state verification blocker is resolved. User approval is required before merge/deployment.

## Phase 2D validation checkpoint — 2026-11-22 07:52 UTC

- Candidate code SHA tested: 297abbea4619ec4ce479ae5284e59cdbdd4e161b.
- Finance Calculator CI #45000081990: syntax check passed; 322/322 Node tests passed; Frankfurter API 1/1 passed. Desktop/mobile Playwright browser step was still running at the checkpoint; no browser pass claim is made yet.
- Candidate Lighthouse #45000081967 completed successfully:
  - Mobile homepage: Performance 93, Accessibility 92, Best Practices 96, SEO 100; CLS 0.000; LCP 2,428.7 ms; TBT 245 ms.
  - Mobile tool route: Performance 93, Accessibility 100, Best Practices 96, SEO 100; CLS 0.0303; LCP 2,801.7 ms; TBT 176 ms.
  - Desktop homepage: Performance 100, Accessibility 100, Best Practices 96, SEO 100; CLS 0.000; LCP 632.8 ms; TBT 0 ms.
  - Desktop tool route: Performance 100, Accessibility 100, Best Practices 96, SEO 100; CLS 0.0087; LCP 642.8 ms; TBT 0 ms.
- Lighthouse CLS budget (<= 0.10) passed on all four routes. Mobile homepage accessibility remains 92 and needs review before final accessibility sign-off.
- 50-state official schedule verification remains 0/50. All 50 official authority portal links are present, but 2026 brackets, deductions, credits, local taxes and special schedules are not yet individually verified.
- PR #66 remains Draft. PR #67 is the Phase 2D Draft candidate. No merge or deployment was performed. The temporary validation-only PR #68 was closed without merge.


## Phase 2D release-gate recheck — 2026-11-22 08:00 UTC

- Finance CI run #45000081990 has now completed. Syntax, 322/322 Node tests and Frankfurter API 1/1 passed. The browser job failed: TAP reported 13 passing and 3 failing results (including a parent suite failure). Root causes were two outdated Bangladesh disclosure text assertions, not failures in the 220-route axe audit.
- The final browser release audit in that same run passed all 220 unique tool routes against WCAG 2.1 A/AA. All 220 routes rendered; this does not convert the overall browser suite to Pass while the separate Bangladesh interaction assertions fail.
- Updated the payroll/disability-disclosure browser assertions in commit `4cc26717240179125f3f613ba85011ae477c9283`.
- Official US state audit: **0/50 fully verified**. New York is recorded as partial only: 2026 NYS single and married-joint rate schedules plus standard deductions checked against official NY tax publications. Credits, NYC/Yonkers local tax, other filing statuses, surtaxes and special cases remain incomplete. New York does not count toward the fully verified total. All state estimates remain provisional.
- Added NY partial provenance and a matching regression assertion in commits `a577327ee1e9e6739e52d4cfdafa82046d8bc0f1` and `c05c1812cce859a16308bc60103c17953fe96087`.
- Updated `docs/TAX_JURISDICTION_AUDIT_2026-11-22.md` with the current 0/50 full-verification status, NY partial scope, and browser failure diagnosis (commit `314b173fe1c168a58b17e8eda0ca350824e1ab1c`).
- Temporary validation-only PR #69 targets `main` so the repository CI workflow can run (the implementation PR #67 is stacked on a non-main base and does not trigger this workflow). PR #69 is not for merge and will be closed after evidence capture. The fresh CI/browser result is pending.
- PR #66 and PR #67 remain Draft. No merge or production deployment was performed. User approval remains required before any merge/deployment.


## Phase 2D final browser/Lighthouse checkpoint — 2026-11-22 08:07 UTC

- Finance Calculator CI #45000740126: syntax check passed; Node tests **322/322 passed**; Frankfurter API **1/1 passed**; Playwright desktop/mobile browser suite **16/16 passed**.
- Browser functional audit: **220/220 tools passed desktop and 220/220 passed mobile Chromium** (440 representative executions); zero reported functional failures/runtime errors. Browser test batches report WCAG 2.1 A/AA checks passed across the 220 registered routes, including Bangladesh tax/payroll routes.
- Candidate Lighthouse #45000740468 passed; all four routes met CLS <= 0.10. Mobile homepage Performance 97 / Accessibility 92 / Best Practices 96 / SEO 100 / CLS 0.000; mobile tool 96 / 100 / 96 / 100 / CLS 0.0303; desktop homepage 100 / 100 / 96 / 100 / CLS 0.000; desktop tool 100 / 100 / 96 / 100 / CLS 0.0087. Mobile homepage Lighthouse Accessibility 92 remains a review item, distinct from the passing route-level WCAG browser checks.
- Artifacts: [220-tool browser functional audit](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/45000740126/artifacts/14745073902); [Lighthouse reports](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/45000740468/artifacts/14745324368).
- US official 2026 tax schedule audit remains **0/50 fully verified**; New York is partial only. All state estimates remain provisional.
- PR #66 and PR #67 remain Draft. Temporary validation PR #70 is closed after evidence capture. No merge or production deployment occurred. User approval is still required.
- Full audit details: `docs/TAX_JURISDICTION_AUDIT_2026-11-22.md`.


## US 50-state tax audit — manual fallback checkpoint (2026-11-22)

- Official 2026 schedule verification remains **0/50 fully verified**; New York remains partial only.
- Adopted an automation-first, manual-fallback rule. No unverified state bracket/deduction table may be used automatically.
- All 50 state records declare `calculationMode: "manual"`; registry declares `calculationMode: "manual-only"`.
- Income Tax Calculator accepts an optional annual manual state tax amount in USD. Only a user-entered amount is added; zero/blank leaves state tax uncalculated. No state schedule, local tax, credit or special case is inferred.
- Manual input is not independently validated; the user must obtain the amount from an official state source or verified tax record. Results remain incomplete educational estimates.
- State-by-state official automation remains possible later, but only after primary-source verification and regression tests. No forced or estimated schedule activation.
- PR #67 remains Draft. No merge or production deployment. Updated branch requires fresh CI, Playwright and Lighthouse validation.

## Phase 2D — first-group US state evidence checkpoint (candidate only) — 2026-11-22

- Candidate branch: feat/tax-jurisdiction-audit-phase-2d; PR #67 remains Draft.
- Eight states (AK, FL, NV, NH, SD, TN, TX, WY) now have official-source evidence that no state individual income tax applies for tax year 2026 and use automatic-zero in the Income Tax Calculator.
- Washington remains manual-only because the calculator does not model its separate capital-gains tax and must preserve the effective date of its new high-income individual income tax (2028-01-01). New York remains partial. Other states remain manual-only.
- Audit metrics: 8/50 no-individual-income-tax statuses verified; 0/50 positive-rate state schedules fully verified. These metrics are deliberately separate.
- Salary Take-Home continues to exclude US state/local withholding; automatic-zero state selection applies only to the Income Tax Calculator.
- Candidate CI #45002175312: npm run check passed, Node tests 322/322 passed, Frankfurter 1/1 passed; browser suite failed 12/16 due to stale California disclosure expectation and a Salary Take-Home missing-selector bug. Candidate fixes committed; fresh CI required.
- Lighthouse #45002175310 succeeded; artifact 14746721249 uploaded. Score values not yet extracted.
- No merge, production deployment, or production claim. See docs/TAX_JURISDICTION_AUDIT_2026-11-22.md for official source links, effective-date scope and details.

## Phase 2D validation follow-up — 2026-11-22 08:28 UTC

- Latest test-contract correction: CI #45002813258 failed 1/324 Node tests (323 passed) because a registry test still expected manual-only for all 50 states. Updated the assertion for eight verified-zero states and remaining manual-only records; commit 5a8c6ed397b00ba633c830c079a0211025ce4fa5.
- Fresh validation CI #45002913438: syntax, npm test and Frankfurter API passed; browser tests still in progress at this checkpoint.
- Fresh candidate Lighthouse #45002913442 still in progress; no scores or browser pass claimed.
- No merge or production deployment.
