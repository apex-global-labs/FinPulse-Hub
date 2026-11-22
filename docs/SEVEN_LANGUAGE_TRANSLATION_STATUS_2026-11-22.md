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
- Formula strings and technical identifiers remain unchanged. Detailed calculation steps are still source-English in the source registry and require per-locale translation before publication; no claim of full formula-step translation is made.
- Tool-page runtime rendering of these draft records is not yet enabled; records remain draft-only and fall back to English in production.
- Seven-locale browser validation on the current PR head completed successfully in the CI desktop/mobile browser job; the job passed. This is automated coverage, not a substitute for visual native-speaker review on real devices.

## Release gate
Latest PR-head validation (commit `75a1f871fbac21be1b54ead3f8ffe95fbfe9767f`): Finance Calculator CI run `45010483024` completed Success; `npm run check`, `npm test`, live Frankfurter API verification, and desktop/mobile Playwright browser tests all passed. Test log reports 17/17 passing tests, 0 failures. Candidate Lighthouse/CLS run `45010482974` completed Success: Mobile home Performance 90, Accessibility 96, Best Practices 96, SEO 100, CLS 0.00011, LCP 2416 ms, TBT 148 ms; Mobile tool Performance 95, Accessibility 100, Best Practices 96, SEO 100, CLS 0.03039, LCP 2771 ms, TBT 148 ms; Desktop home and tool Performance 100, Accessibility 100, Best Practices 96, SEO 100. The first-10 content remains draft-only: detailed calculation steps still need translation, tool-page runtime rendering/fallback is not implemented/verified, and native-speaker/domain review is pending. Automated locale tests do not constitute native-speaker approval. PR remains Draft. No merge or production deployment is authorized.
