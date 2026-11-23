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
Ten title candidates have AI terminology/meaning review notes. This is not native-speaker approval. Before publication, a qualified native-language reviewer must confirm idiom, regional terminology and finance-specific meaning. Country-sensitive finance/tax copy additionally requires domain review.

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
- First 10 titles: AI-reviewed candidate; native review pending.
- English source descriptions and keyed input labels extracted for the first 10 tools.
- First 10 descriptions translated into all six target locales: 60/60 locale descriptions drafted.
- First 10 input labels translated into all six target locales: 264/264 labels drafted across 44 stable input keys.
- All 60 locale records for the first 10 tools are marked `draft`; no native-speaker or domain approval is claimed.
- First 10 result headings/summaries: 60/60 drafted; 270 metric labels and 66 breakdown labels translated with stable keys.
- FAQ: 240 question/answer fields drafted; formula/explanation summary: 60 locale records; disclaimers: 60 records; source-derived validation errors: 198 message/recovery pairs.
- SEO title, meta description, H1 and introduction: 60 locale records; accessibility page/form/result labels and input-control labels: 60 locale records.
- Formula strings and technical identifiers remain unchanged. Currency Converter calculation steps have now been translated into all six target locales (5/5 steps per locale); the other nine pilot tools still require detailed calculation-step translations.
- Tool-page runtime rendering of these draft records is not yet enabled; records remain draft-only and fall back to English in production.
- Seven-locale browser validation on the current PR head completed successfully in the CI desktop/mobile browser job; the job passed. This is automated coverage, not a substitute for visual native-speaker review on real devices.

## Release gate
Latest PR-head validation (commit `75a1f871fbac21be1b54ead3f8ffe95fbfe9767f`): Finance Calculator CI run `45010483024` completed Success; `npm run check`, `npm test`, live Frankfurter API verification, and desktop/mobile Playwright browser tests all passed. Test log reports 17/17 passing tests, 0 failures. Candidate Lighthouse/CLS run `45010482974` completed Success: Mobile home Performance 90, Accessibility 96, Best Practices 96, SEO 100, CLS 0.00011, LCP 2416 ms, TBT 148 ms; Mobile tool Performance 95, Accessibility 100, Best Practices 96, SEO 100, CLS 0.03039, LCP 2771 ms, TBT 148 ms; Desktop home and tool Performance 100, Accessibility 100, Best Practices 96, SEO 100. The first-10 content remains draft-only: detailed calculation steps still need translation, tool-page runtime rendering/fallback is not implemented/verified, and native-speaker/domain review is pending. Automated locale tests do not constitute native-speaker approval. PR remains Draft. No merge or production deployment is authorized.


## Incremental work — 2026-11-23
- Added `explanations.steps[]` to the canonical content schema and locale template.
- Drafted all five Currency Converter calculation steps in Hindi, Arabic, Urdu, Simplified Chinese, Japanese and Russian (30 translated step strings). Mathematical formulas and technical values were not modified.
- Added an automated catalogue assertion for all six Currency Converter step arrays and source-aligned step counts.
- Native-language and finance-domain review is still pending. This AI-generated draft is not approved for publication.
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
- All six locale records remain `draft`. Native-speaker and finance-domain review is pending. Tool-page runtime rendering and English fallback remain release blockers.
- Next in canonical order: EMI Calculator, followed by Compound Interest, Percentage, Tip, Car Loan, Amortization and Savings. No tools 11–20 will be started before the first-10 release gates pass.


## First-ten calculation-step batch completed — 2026-11-23
- Completed the remaining seven pilot tools in canonical order: EMI, Compound Interest, Percentage, Tip, Car Loan, Amortization and Savings.
- Each tool's English source step sequence was translated into Hindi, Arabic, Urdu, Simplified Chinese, Japanese and Russian. The source step count was preserved for every locale; Tip has four source steps and the other seven tools in this batch have five each.
- Added 204 translated step strings in this continuation (34 source steps × 6 locales). Together with Currency, Mortgage and Loan, all 10 pilot tools now have 294 localized calculation-step strings (49 source steps × 6 locales).
- Expanded the automated calculation-step test to cover all 10 pilot tools and all six target locales, checking exact source-aligned step counts and non-empty step strings.
- Formula expressions, calculation logic, technical identifiers, source step order and source step counts were not changed. All translation records remain `draft`.
- Latest validation for the preceding Loan-only head `21757645b240664d3012fcf4b1dfe5d1d72bfa29`: Finance Calculator CI run `45132213125` and Candidate Lighthouse/CLS run `45132213242` both completed Success. These runs do not validate the subsequent seven-tool content and expanded test commits.
- Fresh CI and Lighthouse runs must complete successfully on the new all-ten test head before this batch can be called regression-validated.
- Native-speaker and finance-domain review remains pending. Actual tool-page runtime rendering and missing/unapproved-translation English fallback are not yet implemented/verified. Seven-locale browser and RTL/LTR tests remain outstanding.
- Next work is the first-ten runtime rendering and fallback implementation, followed by integrated browser, accessibility, RTL/LTR and expert-review gates. No tools 11–20 are authorized before the first-ten gates pass.
- PR #73 remains Draft and unmerged; production deployment is not authorized.


- Cross-script test hardening: replaced an arbitrary 10-character minimum with a non-empty-string assertion. A valid concise Simplified Chinese step was shorter than 10 characters, so the previous threshold incorrectly treated natural concise CJK text as empty. The revised test checks actual presence without imposing a language-dependent length rule.
