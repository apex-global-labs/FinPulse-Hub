# Translation Workstream Progress — 2026-11-26

**Repository:** apex-global-labs/FinPulse-Hub  
**Production branch:** main  
**Tracking branch:** `feat/seven-language-translation-engine-phase-1`  
**Related PR:** #73 (open, Draft, unmerged)  
**Audit basis:** main `240256f65f6cd69a154f1f81330d8f1002ef01d7`; PR head `b0b47995e1272b39fbfe683d3c92be08b53771ca`

## Scope
Seven locales: English source plus Hindi (`hi`), Arabic (`ar`), Urdu (`ur`), Simplified Chinese (`zh-CN`), Japanese (`ja`) and Russian (`ru`). Target: all translatable tool content for 220 tools. Translation remains display-only and must not alter formulas, numeric values, IDs, currency codes, jurisdiction keys, API field names or canonical units.

## Verified progress

| Area | Verified status | Evidence / qualification |
|---|---|---|
| Translation runtime foundation | Implemented on PR branch | `translation-engine.js`, `tool-content-runtime.js`; English fallback and draft/pending guard described in PR #73 |
| Locale catalogue | 7 locales defined | `translations/catalogue.json` |
| Content schema | Defined | `translations/content-schema.json`; covers metadata, inputs, actions, results, explanations, errors, FAQs, guides, SEO and accessibility |
| Tool inventory | 220 unique IDs | `translations/tool-catalogue.json` validation metadata |
| First 10 tool content | Draft work reported complete for many fields | Status report dated 2026-11-22; 60 locale records remain draft, not published |
| Detailed calculation steps | Currency Converter 6 locales complete; other pilot tools have had incremental work | Status report and PR history; inspect latest exact per-tool counts before advancing |
| Tools 31–60 source content | English source extraction reported 30/30 complete | `docs/BATCH_31_60_SOURCE_PARITY_COMPLETENESS_AUDIT_2026-11-25.md` |
| Tools 31–60 target locales | 180/180 locale records reported `not-started` | Same audit; six locales × 30 tools |
| Full 220-tool locale completeness | Not yet evidenced as complete | Do not infer completion from the 220-ID catalogue |
| Activation / production | Not activated | PR #73 remains Draft; English fallback retained |

The 2.8 MB `translations/tool-content.json` blob exists on the PR head (Git tree size confirms it), but the GitHub file-fetch response did not return its body in this audit. Exact per-tool/per-locale counts must therefore be read from repository-side validators or a downloadable artifact before changing totals.

## Current-head validation evidence
- PR #73 head: `b0b47995e1272b39fbfe683d3c92be08b53771ca`.
- Finance Calculator CI run #546, run ID `45607462307`: success; `npm run check` passed; Node tests **346/346**; live API **1/1**; browser tests **34/34**.
- Candidate Lighthouse/CLS run #546, run ID `45607462649`: success; mobile and desktop homepage/tool-route audits passed configured CLS gate.
- These are candidate-branch checks, not production release or translation activation approval.

## Batch execution plan
1. **Batch T1 — reconcile records:** use the canonical catalogue and content validator to generate an exact 220 × 6 locale status matrix; resolve any discrepancy between audit notes and actual JSON.
2. **Batch T2 — complete pilot:** finish remaining detailed steps and every schema field for tools 1–10; preserve `draft` status.
3. **Batch T3 — tools 11–30:** verify English source completeness, then draft six locales from source.
4. **Batch T4 — tools 31–60:** create six-locale drafts only after verifying the source records; current audit says 180 locale records are not-started.
5. **Batch T5 onward — tools 61–220:** process in fixed, inventory-ordered batches; never translate from missing/unverified source fields.
6. Run schema, stable-key, placeholder, protected-numeric, formula-token, completeness and fallback tests after each batch.
7. Run all seven locales in real browsers, including Arabic/Urdu RTL, other locales LTR, accessibility, mobile/desktop and latest-head Lighthouse/CLS.

## Release boundary
All new locale content stays `draft` until the explicit activation decision. No activation, PR merge or production deployment is authorized by this tracker. Merge/deployment requires the agreed Release Gate and explicit approval.
