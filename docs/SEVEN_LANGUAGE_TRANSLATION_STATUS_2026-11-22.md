# FinPulse Hub — seven-language localization status
Date: 2026-11-22
Branch: `feat/seven-language-translation-engine-phase-1`
Pull request: #73 (Draft; no merge/deployment)

## Canonical inventory
- Canonical tool registry: 220 tools, 220 unique IDs, zero unassigned tools.
- `translations/tool-catalogue.json` stores tool titles and category provenance.
- `translations/content-schema.json` defines metadata, form inputs/options, actions, results/metrics, explanations/disclaimers, errors, FAQs, guides, SEO and accessibility text.
- `translations/tool-content.json` provides six target-locale work records for every canonical tool ID.
- Supported locales: Hindi (`hi`), Arabic (`ar`), Urdu (`ur`), Simplified Chinese (`zh-CN`), Japanese (`ja`) and Russian (`ru`), with English as source/fallback.

## First title pilot
Ten title candidates have AI terminology/meaning review notes. These AI-generated candidates are not a claim of native-speaker approval. Human linguistic and finance-domain feedback is optional and non-blocking; release acceptance is governed by the mandatory automated gates documented below.

## Translation rules
- Keep tool IDs, URLs/slugs, formulas, numeric constants, currency codes, jurisdiction keys, API field names and canonical unit symbols unchanged.
- Preserve approved interpolation tokens.
- Use stable source keys; never use translated text as an identifier.
- Use text-only DOM insertion; do not inject translated HTML.
- RTL locales set document direction; formulas, numeric values and LTR identifiers remain isolated.
- Missing or unapproved fields fall back to English.
- Do not publish incomplete or unreviewed financial, tax, health, legal or safety explanations.

## Completion status
- Runtime foundation: implemented; browser-tested.
- 220-tool inventory: complete.
- Content-field schema: complete.
- First 10 titles: AI-reviewed candidates; optional expert feedback may be collected but is not a release requirement.
- English source descriptions and keyed input labels extracted for the first 10 tools.
- First 10 descriptions translated into all six target locales: 60/60 locale descriptions drafted.
- First 10 input labels translated into all six target locales: 264/264 labels drafted across 44 stable input keys.
- All 60 locale records for the first 10 tools are marked `draft`; no human approval status is claimed or required.
- First 10 result headings/summaries: 60/60 drafted; 270 metric labels and 66 breakdown labels translated with stable keys.
- FAQ: 240 question/answer fields drafted; formula/explanation summary: 60 locale records; disclaimers: 60 records; source-derived validation errors: 198 message/recovery pairs.
- SEO title, meta description, H1 and introduction: 60 locale records; accessibility page/form/result labels and input-control labels: 60 locale records.
- Formula strings and technical identifiers remain unchanged. Currency Converter calculation steps have now been translated into all six target locales (5/5 steps per locale); the other nine pilot tools still require detailed calculation-step translations.
- Tool-page runtime rendering of these draft records is not yet enabled; records remain draft-only and fall back to English in production.
- Seven-locale browser validation on the current PR head completed successfully in the CI desktop/mobile browser job; the job passed. This is automated coverage; optional visual feedback may improve quality but is not a release gate.

## Release gate
Latest PR-head validation (commit `75a1f871fbac21be1b54ead3f8ffe95fbfe9767f`): Finance Calculator CI run `45010483024` completed Success; `npm run check`, `npm test`, live Frankfurter API verification, and desktop/mobile Playwright browser tests all passed. Test log reports 17/17 passing tests, 0 failures. Candidate Lighthouse/CLS run `45010482974` completed Success: Mobile home Performance 90, Accessibility 96, Best Practices 96, SEO 100, CLS 0.00011, LCP 2416 ms, TBT 148 ms; Mobile tool Performance 95, Accessibility 100, Best Practices 96, SEO 100, CLS 0.03039, LCP 2771 ms, TBT 148 ms; Desktop home and tool Performance 100, Accessibility 100, Best Practices 96, SEO 100. The first-10 content remains draft-only: detailed calculation steps still need translation, tool-page runtime rendering/fallback is not implemented/verified, and optional human review is not required. Automated locale tests do not constitute native-speaker approval. PR remains Draft. No merge or production deployment is authorized.


## Incremental work — 2026-11-23
- Added `explanations.steps[]` to the canonical content schema and locale template.
- Drafted all five Currency Converter calculation steps in Hindi, Arabic, Urdu, Simplified Chinese, Japanese and Russian (30 translated step strings). Mathematical formulas and technical values were not modified.
- Added an automated catalogue assertion for all six Currency Converter step arrays and source-aligned step counts.
- Human language/domain review is optional and non-blocking. This AI-generated draft remains marked draft and is not activated for runtime publication.
- Finance Calculator CI run `45131372722` and Candidate Lighthouse run `45131372864` were queued/in progress at the time of this note; no result is claimed.
- Next ordered item: translate and validate Mortgage Calculator calculation steps in all six target locales, then proceed through the remaining pilot tools in canonical order.


## Incremental work — 2026-11-23 (Mortgage Calculator)
- Added all five Mortgage Calculator calculation steps in Hindi, Arabic, Urdu, Simplified Chinese, Japanese and Russian (30 additional draft step strings).
- Extended the formula-step catalogue test to cover both Currency and Mortgage calculators, verifying each locale's step count matches its English source and contains no empty entries.
- No formula expression, rate conversion constant, amortization behavior or technical identifier was changed.
- Native-speaker and finance-domain review remains pending; these translations are draft-only.
- Latest run status observed before this change: Finance CI and Lighthouse for the preceding documentation commit were in progress; this new change will trigger fresh validation.


## Incremental work — 2026-11-23 (Loan Calculator)
- Drafted all five Loan Calculator calculation steps in Hindi, Arabic, Urdu, Simplified Chinese, Japanese and Russian (30 additional translated step strings).
- Preserved the source APR-to-monthly-rate relationship, principal/term payment calculation, monthly interest basis, principal component and annual aggregation meaning. Formula notation and technical identifiers were not changed.
- Extended the automated calculation-step test to verify Currency, Mortgage and Loan across all six target locales, including exact source-aligned step counts and non-empty step text.
- During the fresh audit, the test file was found to assert only Currency despite the earlier Mortgage progress note; this coverage gap is now corrected by the three-tool assertion.
- Progress for detailed calculation-step translation: 3 of 10 pilot tools (Currency, Mortgage, Loan); 30 translated step strings per tool across six locales, 90 total.
- Existing CI run `45131743971` was still in progress on the preceding head `50fb4065ac2ee567f5bd780e532264dfc88e0e3a` during this work; it does not validate the new Loan content/test commits. Candidate Lighthouse run `45131744029` succeeded on that preceding head. Fresh CI/Lighthouse results for the new commits must be checked before claiming validation.
- All six locale records remain `draft`. Native-speaker and finance-domain feedback is optional and non-blocking. Tool-page runtime rendering and English fallback remain release blockers.
- Next in canonical order: EMI Calculator, followed by Compound Interest, Percentage, Tip, Car Loan, Amortization and Savings. No tools 11–20 will be started before the first-10 release gates pass.


## First-ten calculation-step batch completed — 2026-11-23
- Completed the remaining seven pilot tools in canonical order: EMI, Compound Interest, Percentage, Tip, Car Loan, Amortization and Savings.
- Each tool's English source step sequence was translated into Hindi, Arabic, Urdu, Simplified Chinese, Japanese and Russian. The source step count was preserved for every locale; Tip has four source steps and the other seven tools in this batch have five each.
- Added 204 translated step strings in this continuation (34 source steps × 6 locales). Together with Currency, Mortgage and Loan, all 10 pilot tools now have 294 localized calculation-step strings (49 source steps × 6 locales).
- Expanded the automated calculation-step test to cover all 10 pilot tools and all six target locales, checking exact source-aligned step counts and non-empty step strings.
- Formula expressions, calculation logic, technical identifiers, source step order and source step counts were not changed. All translation records remain `draft`.
- Latest validation for the preceding Loan-only head `21757645b240664d3012fcf4b1dfe5d1d72bfa29`: Finance Calculator CI run `45132213125` and Candidate Lighthouse/CLS run `45132213242` both completed Success. These runs do not validate the subsequent seven-tool content and expanded test commits.
- Fresh CI and Lighthouse runs must complete successfully on the new all-ten test head before this batch can be called regression-validated.
- Native-speaker and finance-domain feedback is optional and non-blocking. Actual tool-page runtime rendering and missing/unapproved-translation English fallback are not yet implemented/verified. Seven-locale browser and RTL/LTR tests remain outstanding.
- Next work is the first-ten runtime rendering and fallback implementation, followed by integrated browser, accessibility, RTL/LTR and expert-review gates. No tools 11–20 are authorized before the first-ten gates pass.
- PR #73 remains Draft and unmerged; production deployment is not authorized.


- Cross-script test hardening: replaced an arbitrary 10-character minimum with a non-empty-string assertion. A valid concise Simplified Chinese step was shorter than 10 characters, so the previous threshold incorrectly treated natural concise CJK text as empty. The revised test checks actual presence without imposing a language-dependent length rule.


## Tool-page runtime and review-gate implementation — 2026-11-23
- Added `tool-content-runtime.js` and loaded it before `app.js`. Initial tool rendering now waits for both the shared locale catalogue and the tool-content JSON, while request failures retain the English source.
- Runtime localization is deliberately approval-gated: only `approved` and `published` locale records can render. Every other status (including current `draft` records), missing records and incomplete records use the entire English tool definition.
- The completeness contract checks metadata, stable input keys, result and breakdown keys, formula-step count, disclaimers, FAQ keys, validation-error keys, SEO fields and accessibility control-label keys before enabling a translation.
- Integrated approved tool content into page title/description, tool title/category/description, input labels, result summary/metric labels/breakdown labels, formula explanations and steps, FAQ/SEO content, schedule tables and accessible region labels. Formula notation and calculator calculation functions remain source-controlled and unchanged.
- Locale changes rerender the active tool while preserving entered field values. Arabic and Urdu retain RTL direction; English, Hindi, Simplified Chinese, Japanese and Russian retain LTR.
- Translated UI strings for the calculator workspace, actions, schedule controls and table labels were added to the shared seven-locale catalogue.
- Translated text inserted into metric HTML is escaped; translated content is otherwise rendered as text, not interpreted as HTML.
- Added unit coverage for draft/missing/incomplete fallback and the approval completeness contract. A test-only in-memory approval fixture verifies all 60 first-ten locale records satisfy the current runtime completeness contract; no repository locale status was changed from `draft`.
- Added browser coverage for the first ten tool routes across all seven locales (70 locale/tool combinations), asserting English fallback for draft records, document direction, and an axe-core WCAG 2.1 A/AA audit per locale. An additional in-memory approved Loan fixture checks end-to-end translated tool rendering for all six target locales without persisting approval.
- Added `docs/FIRST_TEN_LOCALE_REVIEW_CHECKLIST.md` with a reviewer/sign-off matrix for six native languages and ten tools. Native-speaker and finance-domain review is still pending and cannot be claimed complete from automated checks.
- Latest relevant workflow runs at this documentation update: Finance Calculator CI `45134585193` and Candidate Lighthouse/CLS `45134585066` were still in progress on code head `c3c94cad97f42aaf75ee0ff946128b173615825a`. Earlier run `45134348157` had completed syntax checks, the full Node test suite, live reference-rate API check and Playwright installation successfully; its browser test step was still running. Do not call the runtime/browser gate complete until the final head's CI and Lighthouse workflows finish successfully.
- PR #73 remains Draft and unmerged. No production deployment has been made or authorized.


## Translation QA correction — 2026-11-23
- A Unicode-script audit found that all 45 result metric labels per locale in Urdu, Simplified Chinese, Japanese and Russian had inadvertently retained Hindi text (180 affected labels total). This was not caught by the earlier non-empty/schema checks.
- Replaced all 180 labels with locale-appropriate draft translations and localized the 10 Hindi result summaries that were still English.
- Re-ran the first-ten locale-field script audit: zero cross-locale script contamination findings across 60 tool/locale records. Technical IDs and stable field keys are excluded from the script-content check.
- Added a regression test that rejects foreign-script contamination and untranslated result summaries/metric labels in the first ten tools.
- All changes remain draft and remain subject to automated release gates; optional human linguistic feedback is non-blocking.


## Authoritative policy and status correction — 2026-11-23

- The user's current decision supersedes older wording in this historical status log: written native-speaker and finance-domain sign-offs are **not required**. Optional expert feedback is non-blocking.
- Any earlier references above to reviewer sign-off being required, review being a release blocker, or human review being pending as a gate are historical notes and are superseded by this policy correction.
- Automated acceptance remains mandatory on the exact latest PR commit: Finance CI (syntax, Node tests, live reference-rate API and Playwright), seven-locale RTL/LTR assertions, first-ten route/locale accessibility checks (70 combinations), and mobile/desktop Lighthouse plus CLS budgets.
- The first-ten translations remain `draft`; removing human sign-off does not automatically promote or activate any translation. Runtime fallback to the complete English tool definition remains in force for draft, missing or incomplete records.
- Runtime localization/fallback was implemented in the later section titled “Tool-page runtime and review-gate implementation”; earlier statements that it was not implemented are historical and superseded by that implementation note.
- PR #73 remains Draft and unmerged. No production deployment has been made or authorized.
