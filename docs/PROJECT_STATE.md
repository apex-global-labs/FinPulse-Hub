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


## Batch 2 source validation and six-locale draft start — 2026-11-23

- Latest batch-two validation commit `71def693aecd4c7a17e7e5947baf9fb26fc4cd1d` passed Finance CI run [45149697274](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/45149697274) and Lighthouse/CLS run [45149696689](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/45149696689).
- Finance CI log confirms `npm run check` success, `npm test` success with 335/335 Node tests, live reference API 1/1, Browser tests 30/30, and final 220-tool audit 440/440 executions (220 desktop + 220 mobile), zero failures and zero runtime errors. Audit artifact uploaded as ID `14805263531`.
- Batch-two source extraction is marked structurally validated by this CI gate. The extracted source records cover metadata, input labels, result metrics/breakdown, formula and calculation steps, assumptions, notes/disclaimers/limitations, FAQs, validation errors, SEO and accessibility.
- Started draft metadata translations for all six target locales (`hi`, `ar`, `ur`, `zh-CN`, `ja`, `ru`) across all 10 batch-two tools. All records remain `draft`; no locale has been approved or activated.
- This is a **partial translation draft**, not a completed translation: currently localized fields are metadata title/description/category, SEO title/description/H1/introduction, and accessibility page label. Untranslated input/result labels and all remaining fields are null so the runtime must use the English source fallback. Follow-up work must translate and validate every remaining schema field, including inputs, results, formulas/steps, assumptions, notes, disclaimers, limitations, errors, FAQs, guides, SEO FAQs and accessibility labels.
- Added regression assertions for all 10 tools × 6 locales to confirm draft status, translated metadata, stable input/result keys, and null English-fallback values for fields not yet translated.
- Fresh Finance CI and Lighthouse/CLS runs are required for the new draft/test/docs commits. PR #73 remains Draft/unmerged; production `main` and GitHub Pages remain unchanged.


## Batch 2 six-locale translation draft expansion — 2026-11-23

- Confirmed corrected commit `4c3dc2e0e9873b75fc6ddd1b5f928488b2321205` Finance CI [45150958993](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/45150958993) and Lighthouse/CLS [45150958960](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/45150958960) both completed successfully.
- Finance CI: 335/335 Node tests, 1/1 live API test, 30/30 Browser tests, 440/440 desktop/mobile executions across 220 tools, zero runtime errors. Functional audit artifact ID `14805579111`.
- Lighthouse: Mobile homepage Performance 95 / Accessibility 96 / SEO 100 / CLS 0; Mobile tool 91 / 100 / 100 / CLS 0.0307; Desktop homepage 100 / 100 / 100 / CLS 0; Desktop tool 100 / 100 / 100 / CLS 0.0087.
- Expanded batch-two draft records for all 10 tools × six locales. Localized fields currently include metadata, all input labels, all result metric and breakdown labels, action labels, common validation messages, chart labels where mapped, SEO title/meta/H1/introduction, and accessibility page/control labels.
- Remaining fields deliberately retain null/English fallback until translated: formula descriptions, calculation steps, assumptions, notes, disclaimers, limitations, tool-specific validation messages, FAQs/SEO FAQs, guide copy, and unmapped chart text. This is **not yet a complete translation batch** and none of the locale records are approved or activated.
- Simple Interest day-count option values remain unchanged and in source order `[365, 360, 366]`; only their display labels are localized.
- Added regression assertions for batch-two stable input/result/breakdown/error/FAQ keys, translated label coverage, accessibility control-label parity, English fallback for untranslated FAQs/steps, and unchanged Simple Interest day-count values.
- Fresh Finance CI and Lighthouse/CLS runs are required for the expanded translation content and updated tests. PR #73 remains Draft/unmerged; production `main` and GitHub Pages remain unchanged.


## Multilingual candidate CI and Lighthouse verification — 2026-11-24

- Exact tested candidate head: `fa96a01e5865e60c965bc956a6e5a422f64ee513` on `feat/seven-language-translation-engine-phase-1`, PR #73.
- Finance Calculator CI [run #45174997930](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/45174997930) completed successfully. Job log confirms `npm run check` passed, `npm test` passed with 335/335 tests and 0 failures, live Frankfurter API check passed (1/1), and Playwright browser suite passed 30/30 with 0 failures.
- Batch 2 browser test explicitly completed: all 10 tools × 7 locales = 70 route/locale axe-core WCAG 2.1 A/AA audits passed. The test verifies localized page title, description, first input label, translated calculation step, accessibility labels, SEO title and LTR/RTL direction. The test fixture temporarily simulates approved records in memory; persisted translation records remain `draft`.
- Full 220-tool functional audit passed 440/440 executions: Desktop 220/220 and Mobile 220/220, with no failures and zero runtime errors. Artifact `220-tool-functional-audit` uploaded successfully (artifact ID `14819256288`).
- Candidate Lighthouse and CLS [run #45174997999](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/45174997999) completed successfully. Four fresh audits:
  - Mobile homepage: Performance 98, Accessibility 96, Best Practices 96, SEO 100; CLS 0.0001133.
  - Mobile tool route (`hydration-log-tracker`): Performance 88, Accessibility 100, Best Practices 96, SEO 100; CLS 0.0303892.
  - Desktop homepage: Performance 100, Accessibility 100, Best Practices 96, SEO 100; CLS 0.
  - Desktop tool route: Performance 99, Accessibility 100, Best Practices 96, SEO 100; CLS 0.0086751.
  All four CLS values satisfy the workflow's 0.10 budget. Lighthouse reports uploaded as artifact ID `14818039864`.
- The Browser Test timeout seen on prior head `2f798baaab965463c8a7fc5ce944eea62ca468b0` was addressed by forcing a locale transition after injecting in-memory test fixtures. The resulting 30/30 and 70/70 outcomes above are from the exact newer tested head `fa96a01...`.
- Translation content remains `draft`; this validation does not approve or activate any locale. No formula, calculation data or numeric option values were changed by this test correction.
- PR #73 remains Draft/unmerged. Production `main` and GitHub Pages were not modified or deployed. These results validate the candidate CI gates only; no production-release claim is made.


## Batch 2 translation completeness audit and Batch 3 kickoff — 2026-11-24

- Re-audited the exact Batch 2 catalogue records for `freelance`, `margin`, `affordability`, `payoff`, `refinance`, `personal-loan`, `student-loan`, `simple-interest`, `retirement` and `401k`.
- All 10 tools have six target-locale records (60/60), all correctly remain `draft`. Each locale has the full metadata, inputs, actions, results, explanations/formula/steps/assumptions/notes/disclaimers/limitations, errors, FAQs, guide, SEO and accessibility groups. Required text coverage audit: 501 required source-aligned strings per locale; no required string was empty and no required string was an exact English copy. Guide coverage: 162 non-empty translated strings per locale. The only null text fields found were chart titles for Student Loan and Simple Interest, where the source does not define a chart title; these are optional and do not block completeness.
- No translation status was promoted; runtime English fallback remains active because all records remain `draft`. Formula implementations and numeric option values were not modified by this audit.
- Batch 3 is now scoped to the next 20 canonical tools (tools 21–40): `ira`, `inflation`, `cd`, `apy`, `tax`, `income-tax`, `sales-tax`, `vat-gst`, `tax-refund`, `salary`, `paycheck`, `payroll`, `overtime`, `discount`, `exchange-fees`, `transfer-compare`, `freelance-project`, `freelancer-net-income`, `markup` and `break-even`.
- Initial authoritative extraction is recorded in `docs/i18n/batch-03-source-extraction.json`: 20/20 titles/descriptions and 88 stable input key/label pairs captured from `app.js`. The same 20 descriptions and input records are now present in `translations/tool-content.json`; all source records explicitly remain `partial` until results, calculation explanations/steps, assumptions, error copy, FAQs, SEO and accessibility evidence are extracted and checked.
- Income Tax and Salary use `FinPulseTaxEngine`; their jurisdiction/rate/source data is a protected calculation dataset and must not be translated or altered. Other calculation functions are traced by name in the Batch 3 extraction manifest for verbatim evidence capture from `finance-core.js`.
- Batch 3 six-locale translations have deliberately not started yet: all 120 locale slots remain `not-started` with empty fields until the authoritative source extraction is complete. No placeholder or invented financial/tax guidance is being introduced.
- Added a catalogue regression test to assert the exact 20-tool batch order, all 88 input labels, unique stable keys, partial extraction state, and no premature translation activation. New test commit: `4358fe7e03887673350af808fe8206d2011f580a`; Batch 3 source/catalogue commits: `c68410b`, `b1add4d`, `001fb18`, `a0acb1d`.
- This is candidate-branch work only. PR #73 remains Draft/unmerged; production `main` and GitHub Pages are unchanged. Fresh Finance CI and Lighthouse/CLS validation are required for the new candidate head.


## Batch 3 source evidence capture — 2026-11-24

- Captured the exact runtime definition from `app.js` for all 20 Batch 3 tools, including result headings, metric/breakdown labels, chart configuration, notes and inline SEO/FAQ blocks where present.
- Captured the exact calculation implementation for all 20 tools: 18 functions from `finance-core.js`, plus `FinPulseTaxEngine.estimate` for Income Tax and `estimate` + `payroll` for Salary. Source blob SHAs are recorded in `docs/i18n/batch-03-source-extraction.json`.
- Tool-specific inline SEO/FAQ exists in the runtime definitions for only four Batch 3 tools: Freelance Project Pricing, Freelancer Net Income, Markup and Break-even. The other 16 do not provide inline FAQ/SEO copy. Shared accessibility labels are provided by the app template; per-tool page/form/result/chart labels need a clearly marked derived editorial record. Do not describe these missing fields as verbatim source extraction.
- Ordered steps, formula explanations, assumptions, FAQs for the remaining tools, SEO copy, error recovery hints and accessibility labels are still pending source authoring/verification. Batch 3 remains `in-progress`; all 120 target-locale slots remain `not-started`. No Batch 3 translations have started and no translation has been activated.
- Validation: Finance CI run #45350333245 failed at the existing Batch 3 manifest-status assertion (335/336 Node tests passed; one test expected manifest.status=`in-progress`). The manifest status was restored to `in-progress` in corrective commit `4eb7cfaa58d077548054462be5c46519a2a97a14`. Fresh CI for that corrective head has not yet been confirmed. Candidate Lighthouse run #45350333144 is still in progress on the preceding source-evidence commit `49a1b4074808ef6621e78b2c31b3ec18c240cda9`.
- PR #73 remains Draft/unmerged. Production `main` and GitHub Pages remain unchanged.


## Batch 31–60 source extraction and parity update — 2026-11-25

- Source extraction commit: `1ecf5d633b64a3c62a14beb8f0e7fd4097a72ca8`. Added complete English source fields for tools 41–60 in `translations/tool-content.json`; tools 31–40 retained their previously extracted source records.
- Structural completeness check: 30/30 expected tool records contain metadata, description, inputs, results, explanations, FAQs, SEO, errors, accessibility and guide content. All 180 target-locale slots across these 30 tools remain `not-started`; no translation was activated.
- Runtime parity review for tools 31–40 is recorded in `docs/BATCH_31_60_SOURCE_PARITY_COMPLETENESS_AUDIT_2026-11-25.md`. It traces each tool to its app runtime definition and Finance Core function, including relevant validation boundaries.
- The parity/completeness audit document was added in commit `b8fdb9341850a54678caed52d4e032905b4d46c3`.
- Finance CI run #848 (ID `45576550639`) and Candidate Lighthouse/CLS run #493 (ID `45576550328`) were triggered for the source-data commit and were in progress at the time of this update. Do not claim pass until both finish and are checked against the tested commit.
- Six-locale translation drafts, schema-validator execution, protected-data regression on the updated catalogue, seven-locale browser/RTL/LTR/accessibility validation and current-head Lighthouse/CLS remain pending.
- PR #73 remains Draft/unmerged. No merge or production deployment was performed; production `main` and GitHub Pages remain unchanged.


## Batch 31–60 CI and regression-gate update — 2026-11-25

- Finance CI #849 on source extraction/audit commit `b8fdb9341850a54678caed52d4e032905b4d46c3`: Node tests 341/341 passed; Frankfurter API check 1/1 passed; Playwright functional audit 30/30 passed. The functional audit exercised 220 tools on desktop and mobile; Batch 2 seven-locale accessibility checks included 70 axe audits. Artifact ID `15004293603`.
- Candidate Lighthouse/CLS #494 passed on the same commit; report artifact ID `15005225532`.
- Added dedicated Batch 31–60 source completeness/protected-boundary regression tests and added the test file to the npm test script. Commit `2328f1416eb50a918c18274a215d4b5f91aa26fa` adds the tests; commit `6118b05dbbe3864856b027ef1662ad78bfb9702c` wires them into CI.
- Current Finance CI #853 and Lighthouse/CLS #498 are in progress on `6118b05dbbe3864856b027ef1662ad78bfb9702c`; the newly added tests are not yet claimed as passing.
- Batch 31–60 translation records remain untouched/not-started. No merge, activation or deployment.


## Multilingual candidate — Batch 31–60 browser gate correction — 2026-11-25

- On candidate commit `6118b05dbbe3864856b027ef1662ad78bfb9702c`, Finance CI #853: syntax/check passed; Node tests 345/345 passed; Frankfurter API 1/1 passed; browser suite failed 28/30 because Probability Calculator had no local bar-chart fallback when Chart.js CDN was unavailable.
- Runtime fix `c04c748e5c78126f00d0133122310223841c7e06` adds an accessible native SVG bar chart as progressive enhancement. Test commit `f437aa2bc8a1a00a4c193500a00a94d1d5230481` blocks the CDN and asserts the fallback renders.
- Lighthouse/CLS #498 passed on the pre-fix head only; new candidate-head CI and Lighthouse results are pending. No current release gate pass is claimed.
- Batch 31–60 translation records remain untouched; all 180 target locale slots remain not-started. PR #73 remains Draft/unmerged; production main and GitHub Pages are unchanged.
