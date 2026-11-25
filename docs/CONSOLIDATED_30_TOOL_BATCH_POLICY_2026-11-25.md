# Consolidated 30-tool Work Batch Policy — 2026-11-25

## User-directed scope
From 2026-11-25 onward, consolidate all work for a 30-tool batch into one end-to-end work unit rather than stopping after smaller sub-batches. This policy does not authorize tax-data release, translation approval, merging, or deployment.

## Required work per 30-tool batch
1. Inspect current main, PR head, open PRs, workflow results, and project state before changes.
2. Confirm source extraction and calculation implementation; record discrepancies and provenance.
3. Verify source references, formulas, assumptions, inputs, outputs, steps, error handling, FAQs, SEO and accessibility content.
4. Prepare drafts for all six target locales (hi, ar, ur, zh-CN, ja, ru); English remains the fallback.
5. Validate translation schema, completeness, protected numeric/formula data, and editorial-source metadata.
6. Run automated checks and browser tests in seven languages, including RTL/LTR, mobile/desktop, accessibility and Lighthouse/CLS where applicable.
7. Record exact evidence, failures, fixes, and status in audit notes; do not mark drafts approved or published until release gates pass.

## Tax-data prerequisite
The tax-data provenance gate remains BLOCKED. Translation drafts may be prepared only as drafts and must not be approved or published. Tax data requires official-source verification, jurisdiction-specific boundary tests, and documented limitations.

## Work boundaries
- Do not change formulas or tax values without official-source evidence and regression tests.
- Do not merge PR #73 or deploy without explicit user approval.
- Do not claim a test passed until the exact run reports success.
