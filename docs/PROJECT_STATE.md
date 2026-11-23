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


## Multilingual release-gate audit — 2026-11-23

- Scope: PR #73, branch `feat/seven-language-translation-engine-phase-1`; production branch `main` and GitHub Pages deployment were not modified.
- First-ten calculation-step draft coverage: 10/10 tools across six target locales; 49 English source steps × 6 locales = 294 translated step strings. Automated catalogue tests assert source-aligned step counts and non-empty strings. All locale records remain `draft`; this is not linguistic or finance-domain approval.
- Tool-page runtime: `tool-content-runtime.js` is loaded before `app.js`; tool definitions are localized only for records with status `approved` or `published` and complete required fields. Missing, incomplete, `draft`, `linguistic-reviewed` and other unapproved records preserve the complete English definition. Unit tests cover these fallback cases and simulate complete approved records without changing stored approval status.
- Browser audit finding on commit `2f6cd2dffc0606a5c7b2ce41b5c53fd36a413edf`: Finance Calculator CI run [45136325981](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/45136325981) failed in the new seven-locale tool-page browser test because its local test server did not serve the `__axe.js` route. The job log reports 17 passing and 1 failing browser test; syntax, Node tests and live API check passed. Candidate Lighthouse run [45136325950](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/45136325950) succeeded, but does not replace browser acceptance.
- Corrected the browser test server to serve the installed axe-core file and moved WCAG 2.1 A/AA auditing inside the first-ten tool × locale loop, so each actual route is audited after navigation. Fix commits: `697d64bc3df951d28f5cf343e8355974cc6856f4` and `cf1e6517e55b9b541a16a5b0125fee41c79814ef`.
- **Validation status:** no CI workflow run is currently visible for the latest head `cf1e6517e55b9b541a16a5b0125fee41c79814ef`; therefore the test fix and expanded 70 route/locale accessibility audit are not yet verified by CI. Fresh Finance CI and Lighthouse runs are required before this branch can pass the gate.
- **RTL/LTR status:** automated direction assertions cover English/Hindi/Chinese/Japanese/Russian as LTR and Arabic/Urdu as RTL. Real-device/native visual review remains outstanding; automated checks do not establish visual sign-off.
- **Human-review policy:** written native-speaker and finance-domain sign-offs are not mandatory release gates. Optional expert feedback may still be collected as a quality improvement, but absence of such reviews does not block release.
- **Translation status:** all current locale records remain `draft`; this audit does not silently promote them to `approved`/`published`. English fallback remains active for these records until a separate, explicit translation-activation decision and its validation are completed.
- **Release decision:** PR #73 remains Draft and unmerged. No merge, Pages deployment or production release is authorized until fresh latest-head Finance CI (including browser/RTL/LTR checks) and Lighthouse/CLS checks pass.


## Multilingual release-gate policy update — 2026-11-23

- User decision: remove mandatory written native-speaker and finance-domain reviewer sign-offs from the release gate.
- These human reviews are optional quality feedback, not mandatory acceptance criteria.
- Mandatory automated gates remain: latest-head Finance CI, Playwright browser coverage across seven locales and first-ten tools, RTL/LTR direction checks, per-route accessibility checks, mobile/desktop Lighthouse and CLS budgets.
- Current translations remain `draft`; this policy change does not automatically approve or publish them. English fallback continues until translation activation is explicitly authorized and validated.
- PR #73 remains Draft/unmerged; no production deployment is authorized by this policy update.


## Current multilingual candidate status — 2026-11-23

- Candidate branch: `feat/seven-language-translation-engine-phase-1`; PR #73 remains Draft and unmerged.
- Latest policy/documentation commits align the release process with the user's decision: written native-speaker and finance-domain sign-offs are optional, not mandatory.
- Mandatory release gates are latest-head Finance CI (syntax, Node tests, live reference-rate API, Playwright), seven-locale RTL/LTR assertions, first-ten tool × locale accessibility checks (70 combinations), and mobile/desktop Lighthouse with CLS budgets.
- Translation records remain `draft`; removing human sign-off does not auto-approve or publish translations. Runtime English fallback remains active for draft, missing and incomplete locale records.
- The production branch `main` and GitHub Pages deployment have not been changed by this candidate work. The production verification date and commit above refer to the last verified production release, not the current candidate branch.
- Do not merge or deploy until all mandatory automated gates pass on the exact latest PR head and the release decision is explicitly authorized.

## Translation Engine — Batch 2 source extraction — 2026-11-23

- Latest verified release-gate head: `e5e743cb3ed5235f46689fcdf0b659fb31c044c2`; Finance CI run `45145145252` and Candidate Lighthouse/CLS run `45145145355` both completed successfully on that exact head.
- Finance CI: 334/334 Node tests, 1/1 live API test, 30/30 Browser tests; the 220-tool Desktop/Mobile functional audit passed 440/440 executions with zero runtime errors.
- Candidate Lighthouse: Mobile homepage 96 Performance / 96 Accessibility / 100 SEO / CLS 0; Mobile tool 92 / 100 / 100 / CLS 0.0307; Desktop homepage 100 / 100 / 100 / CLS 0; Desktop tool 100 / 100 / 100 / CLS 0.0087. All four CLS results are within the 0.10 budget.
- First-ten translation catalogue: all 10 tools have six target-locale records, all status `draft`; full English fallback remains active. No locale was promoted to `approved` or `published`.
- Batch 2 source extraction: tools 11–20 are `freelance`, `margin`, `affordability`, `payoff`, `refinance`, `personal-loan`, `student-loan`, `simple-interest`, `retirement`, and `401k`. Source descriptions and stable input keys/labels have been extracted from `app.js` into `translations/tool-content.json`; 10/10 descriptions and 53 input labels are recorded. All six target locales remain `not-started`; translation drafting has not begun.
- Extended catalogue regression test to require source extraction for the first 20 tools and unique stable input keys.
- PR #73 remains Draft/unmerged; production `main` and GitHub Pages are unchanged. No translation activation, merge or deployment was performed.


## Batch 2 complete source extraction — 2026-11-23

- Latest-head prerequisite CI on commit `13c12604970cb9d46f7b94960d6ad0b3598416d7` completed successfully: Finance CI run [45147185955](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/45147185955) and Candidate Lighthouse/CLS run [45147186020](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/45147186020) both concluded `success`.
- Finance CI log confirms 334/334 Node tests, 1/1 live API test and 30/30 Browser tests; the 220-tool functional audit artifact was uploaded successfully. Lighthouse/CLS job concluded successfully.
- Batch 2 source fields were expanded for all 10 tools: `freelance`, `margin`, `affordability`, `payoff`, `refinance`, `personal-loan`, `student-loan`, `simple-interest`, `retirement`, and `401k`.
- Extracted source now includes metadata, input labels, result heading/summary/metrics, available breakdown and chart labels, formulas, calculation steps, assumptions, notes/disclaimers/limitations, FAQs, validation errors/recovery hints, SEO metadata/FAQ and accessibility labels. The Simple Interest day-count selector retains the canonical options 365, 360 and 366.
- Added `sourceCompletenessStatus: complete` to batch-two records while preserving the existing extraction status for compatibility. All six target locales remain `not-started`; no translation drafting or activation has occurred.
- Added catalogue regression coverage for complete batch-two source fields, stable/unique keys, formula/step coverage, FAQ/error completeness, SEO/accessibility fields, and unchanged locale statuses.
- The new source data and test commits are pending fresh Finance CI and Candidate Lighthouse/CLS validation on the latest branch head. PR #73 remains Draft/unmerged; production `main` and GitHub Pages remain unchanged.
