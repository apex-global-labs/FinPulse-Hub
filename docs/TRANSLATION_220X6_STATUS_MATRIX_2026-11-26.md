# 220 × 6 Translation Locale Status Matrix — 2026-11-26

**Branch:** `feat/seven-language-translation-engine-phase-1`  
**Candidate source:** `bdf6cb0d75e7bc21696ab4234f4c4eeb715a78da`  
**Inventory source:** `translations/tool-catalogue.json`  
**Locales:** `hi`, `ar`, `ur`, `zh-CN`, `ja`, `ru`

## Evidence boundary
The full `translations/tool-content.json` is approximately 2.8 MB and could not be downloaded through the repository file connector. A repository-side Node validator was therefore added and executed through `npm test` on candidate commit `ab958aba46b4fa5b941c5a7a7870df0a4fee8607`. It loads the actual JSON in GitHub Actions, cross-checks all 220 IDs against the catalogue, validates all six locale slots and status vocabulary, and emits the 1,320-cell matrix. The CI `npm test` step passed, so the full status counts below are validated by that run.

## Batch 31–60 verified status

| Tool # | Tool ID | hi | ar | ur | zh-CN | ja | ru |
|---:|---|---|---|---|---|---|---|
| 31 | `paycheck` | draft | draft | draft | draft | draft | draft |
| 32 | `payroll` | draft | draft | draft | draft | draft | draft |
| 33 | `overtime` | draft | draft | draft | draft | draft | draft |
| 34 | `discount` | draft | draft | draft | draft | draft | draft |
| 35 | `exchange-fees` | draft | draft | draft | draft | draft | draft |
| 36 | `transfer-compare` | draft | draft | draft | draft | draft | draft |
| 37 | `freelance-project` | not-started | not-started | not-started | not-started | not-started | not-started |
| 38 | `freelancer-net-income` | not-started | not-started | not-started | not-started | not-started | not-started |
| 39 | `markup` | not-started | not-started | not-started | not-started | not-started | not-started |
| 40 | `break-even` | not-started | not-started | not-started | not-started | not-started | not-started |
| 41 | `business-roi` | not-started | not-started | not-started | not-started | not-started | not-started |
| 42 | `cash-flow` | not-started | not-started | not-started | not-started | not-started | not-started |
| 43 | `rental-yield` | not-started | not-started | not-started | not-started | not-started | not-started |
| 44 | `emergency-fund` | not-started | not-started | not-started | not-started | not-started | not-started |
| 45 | `net-worth` | not-started | not-started | not-started | not-started | not-started | not-started |
| 46 | `basic-arithmetic` | not-started | not-started | not-started | not-started | not-started | not-started |
| 47 | `fraction` | not-started | not-started | not-started | not-started | not-started | not-started |
| 48 | `mixed-number` | not-started | not-started | not-started | not-started | not-started | not-started |
| 49 | `decimal-fraction` | not-started | not-started | not-started | not-started | not-started | not-started |
| 50 | `ratio` | not-started | not-started | not-started | not-started | not-started | not-started |
| 51 | `proportion` | not-started | not-started | not-started | not-started | not-started | not-started |
| 52 | `average` | not-started | not-started | not-started | not-started | not-started | not-started |
| 53 | `percentage-change` | not-started | not-started | not-started | not-started | not-started | not-started |
| 54 | `percent-error` | not-started | not-started | not-started | not-started | not-started | not-started |
| 55 | `rounding` | not-started | not-started | not-started | not-started | not-started | not-started |
| 56 | `significant-figures` | not-started | not-started | not-started | not-started | not-started | not-started |
| 57 | `scientific-notation` | not-started | not-started | not-started | not-started | not-started | not-started |
| 58 | `exponent` | not-started | not-started | not-started | not-started | not-started | not-started |
| 59 | `square-root` | not-started | not-started | not-started | not-started | not-started | not-started |
| 60 | `cube-root` | not-started | not-started | not-started | not-started | not-started | not-started |

## Full 220 × 6 status totals (repository-side validator)

| Status | Tool-locale records | Per-locale count |
|---|---:|---:|
| Draft | 180/1,320 | 30 in each of 6 locales |
| Not started | 1,140/1,320 | 190 in each of 6 locales |
| AI/native review pending, linguistic-reviewed, domain-reviewed, approved, published | 0 | 0 in each locale |

The validator confirms 220 tool records and 1,320 locale records. These are draft/not-started counts, not approved or publishable translation counts.

## Verified counts for Batch 31–60

| Status | Tool-locale records | Meaning |
|---|---:|---|
| Draft | 36/180 | Tools 31–36 × 6 locales; content fields are draft and not published |
| Not started | 144/180 | Tools 37–60 × 6 locales; locale fields are empty |
| Published/activated | 0 | No target locale activated by this batch |

## Remaining tools
The full validator covers every tool ID. The exact per-tool allocation outside Batch 31–60 should be taken from the emitted CSV matrix in CI logs; this document records the validated aggregate counts without guessing which additional tool IDs own those draft slots.

## Required automated matrix validator
The repository-side validator must:
1. Load the full `tool-content.json` and canonical catalogue.
2. Assert 220 unique tool IDs and exactly six locale records per tool.
3. Emit one row per tool and one status per locale (1,320 cells).
4. Validate status vocabulary against `translations/content-schema.json`.
5. Count non-empty translated fields and completeness by field group; do not treat empty locale shells as completed drafts.
6. Check stable key parity and protected formula/numeric/API tokens.
7. Fail on unknown IDs, duplicate IDs, missing locales, invalid statuses or accidental published state without approval.

No translation was activated, merged or deployed while generating this matrix.
