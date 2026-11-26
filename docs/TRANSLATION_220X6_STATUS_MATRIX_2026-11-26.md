# 220 × 6 Translation Locale Status Matrix — 2026-11-26

**Branch:** `feat/seven-language-translation-engine-phase-1`  
**Candidate source:** `bdf6cb0d75e7bc21696ab4234f4c4eeb715a78da`  
**Inventory source:** `translations/tool-catalogue.json`  
**Locales:** `hi`, `ar`, `ur`, `zh-CN`, `ja`, `ru`

## Evidence boundary
The full `translations/tool-content.json` is approximately 2.8 MB and the repository file connector refused to return the complete blob in this audit. Therefore this matrix is a conservative evidence matrix, not a claim that all 1,320 records have been read. The Batch 31–60 test file directly asserts the locale states below. For tools 1–30 and 61–220, exact content-record statuses remain unverified here and are intentionally not guessed.

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

## Verified counts for Batch 31–60

| Status | Tool-locale records | Meaning |
|---|---:|---|
| Draft | 36/180 | Tools 31–36 × 6 locales; content fields are draft and not published |
| Not started | 144/180 | Tools 37–60 × 6 locales; locale fields are empty |
| Published/activated | 0 | No target locale activated by this batch |

## Remaining 190 tools
Tools 1–30 and 61–220: `not independently audited in this matrix`. Their records must be read and counted by a repository-side script/validator against the full JSON before assigning draft/not-started/reviewed/approved/published statuses.

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
