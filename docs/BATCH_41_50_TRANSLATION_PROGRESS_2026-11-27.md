# Translation Batch #41–50 Progress — 2026-11-27

**Repository:** `apex-global-labs/FinPulse-Hub`  
**Branch:** `feat/seven-language-translation-engine-phase-1`  
**PR:** #73 — Open / Draft / Unmerged  
**Latest translation commit:** `f7d722c0d42a48c02dd6dfdf037a2801b2503bdd`

## Release Gate

On the parent candidate head `0c9273271815c31998033ccd7a15ef12fb64a906`, Finance CI and Candidate Lighthouse/CLS completed successfully, including Node tests, Frankfurter API, Desktop/Mobile Playwright, Mobile/Desktop Lighthouse, and CLS budget.

The translation work below changes the candidate head. Fresh Finance CI and Lighthouse/CLS are required on the resulting head; the parent-head result must not be treated as validation of this new commit.

## Translation progress

- Batch scope: tools #41–50, six target locales (`hi`, `ar`, `ur`, `zh-CN`, `ja`, `ru`), 60 locale records.
- Completed draft records: **18/60** — #41 Business ROI, #42 Cash Flow Projection and #43 Rental Yield / all six target locales each.
- Remaining: **42/60** — tools #44–50, all six locales each, not started.
- No locale is marked linguistically reviewed, domain reviewed, approved, or published.

## #41 Business ROI / Hindi field coverage

The Hindi record is saved as `draft` and contains all schema groups:
- Metadata: title, description, category, subcategory (4/4)
- Inputs: labels with original stable keys (2/2)
- Actions: calculate, recalculate, clear, reset, copy, download, print (7/7)
- Results: heading, summary, four metrics, five breakdown labels
- Explanations: formula title, unchanged canonical formula text, five steps, assumptions, note, disclaimer and limitations
- Errors: messages and recovery hints with original error keys (3/3)
- FAQs and SEO FAQs: original keys and translated question/answer text (3/3 each)
- Guide: original step and section keys (5/5 steps; 2/2 sections)
- SEO: title, meta description, H1 and introduction
- Accessibility: page, form, result, chart and control labels (2/2 control keys)

## Integrity checks

- Input keys remain `investment`, `value` in source order.
- Metric, breakdown, FAQ, error and guide keys are preserved.
- The `{field}` placeholder token appears twice in the Hindi validation text, matching the two source occurrences.
- Canonical formula text is unchanged.
- Numeric constants and calculation/runtime files were not modified in this translation step.
- Hindi locale script is present; all translated text fields are non-empty.
- The locale remains `draft`; the runtime English fallback remains in force until review/approval.

## Important limitation

The current source record does not define per-tool action strings, but the localization schema defines seven standard action labels. The Hindi draft therefore uses the standard localized action labels from the schema. The source's calculation formula, input values, stable identifiers, and engine behavior were not changed.

## Next actions

1. Complete the remaining five locales for #41 using the same source/schema contract.
2. Validate each locale's stable keys, tokens, formula/numeric preservation, field completeness and script/direction.
3. Continue #42–50 in sequence, without marking a locale complete until every required field is populated.
4. Run seven-locale browser, RTL/LTR, accessibility, numerical-parity and Lighthouse/CLS checks on the exact final candidate head.


## #41 Business ROI / Arabic field coverage (added 2026-11-27)

The Arabic locale is now saved as `draft` with all 10 field groups, including the seven shared action labels. Automated parity checks confirm:
- Input keys and order: 2/2
- Result metric keys: 4/4
- Breakdown keys: 5/5
- Error keys: 3/3, with `{field}` token count 2/2
- FAQ keys and SEO FAQ keys: 3/3 each
- Guide step keys: 5/5; guide section keys: 2/2
- Accessibility control keys: 2/2
- Canonical formula text unchanged

The locale remains inactive as a draft; no publication or activation occurred.


## #41 Business ROI / Urdu field coverage (added 2026-11-27)

The Urdu locale is saved as `draft` with all 10 field groups, including all seven shared action labels. Automated parity checks confirm the input, metric, breakdown, error, FAQ, guide-step, guide-section and accessibility-control keys match the English source in order; `{field}` placeholder count matches (2/2); and canonical formula text is unchanged. The locale remains draft-only.


## #41 Business ROI / Chinese, Japanese and Russian drafts completed (2026-11-27)

- Added complete draft records for Simplified Chinese (`zh-CN`), Japanese (`ja`) and Russian (`ru`).
- All six target locale records now have the ten schema groups: metadata, inputs, actions, results, explanations, errors, FAQs, guide, SEO and accessibility.
- Preserved the source input keys (`investment`, `value`), result metric keys, breakdown keys, FAQ/error keys, guide keys and accessibility control keys.
- Preserved the canonical English formula verbatim in formula description and guide calculation section; no executable calculation, defaults, numeric data or currency/jurisdiction values were changed.
- Preserved both `{field}` placeholders in each locale's validation text and kept every locale status at `draft`.
- Added automated completeness assertions for all six locale records, stable-key parity, formula parity and placeholder-token parity in `tests/batch-31-60-source-completeness.test.cjs`.
- Translation records complete: **6/60**. Remaining: **54/60**.
- No locale has been linguistically approved or activated; English runtime fallback remains in force.
- Fresh Finance CI and Candidate Lighthouse/CLS are required on the final updated candidate head before release-gate claims.


## #42 Cash Flow Projection / six locale drafts completed (2026-11-27)

- Completed Hindi, Arabic, Urdu, Simplified Chinese, Japanese and Russian drafts.
- Populated all ten translation groups for each locale: metadata, inputs, actions, results, explanations, errors, FAQs, guide, SEO and accessibility.
- Preserved all six input keys, five metric keys, five breakdown keys, three error keys, three FAQ keys, guide keys and accessibility control keys in source order.
- Preserved the canonical monthly compounding and closing-cash formula verbatim in the formula description and guide calculation section.
- Kept the source's numeric constraints unchanged: growth 0–100%; supported projection periods 3, 6, 12 or 24 months; no numeric defaults or executable calculation changes.
- All six locale records remain `draft`; no activation or publication.
- Added automated tests for six-locale completeness, stable keys, formula integrity, field counts and source numeric constraints.
- Completed draft records: **12/60**. Remaining: **48/60**.


## #43 Rental Yield / six locale drafts completed (2026-11-27)

- Completed Hindi, Arabic, Urdu, Simplified Chinese, Japanese and Russian drafts.
- Populated all ten translation groups for each locale, including the seven shared actions and all four input labels, six result metrics, six breakdown labels, four validation errors, three FAQs, five guide steps, SEO and accessibility labels.
- Preserved input, metric, breakdown, error, FAQ, guide and accessibility stable keys and their source order.
- Preserved the canonical gross/net yield formula verbatim in the formula description and guide calculation section.
- Kept the source constraints unchanged: purchase price positive; rent and annual costs non-negative; vacancy allowance no greater than 100%. No runtime formula or numeric defaults changed.
- All six locale records remain `draft`; English fallback remains active.
- Added automated tests for locale completeness, stable-key parity, formula integrity and the 100% vacancy constraint.
- Completed draft records: **18/60**. Remaining: **42/60**.
