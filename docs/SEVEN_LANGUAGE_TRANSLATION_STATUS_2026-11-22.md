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
- Output/result labels, metrics, FAQs, guides, disclaimers, errors, accessibility copy and localized SEO remain pending.
- Browser validation for the newly translated tool-page content remains pending; current browser coverage validates the shared language selector, RTL/LTR switching, persistence and currency independence.

## Release gate
CI and Lighthouse must pass against the latest PR head after the new translation-content assertions. The first-10 content remains draft-only until linguistic/domain review and tool-page browser coverage pass. PR remains Draft. No production deployment is authorized by this work.
