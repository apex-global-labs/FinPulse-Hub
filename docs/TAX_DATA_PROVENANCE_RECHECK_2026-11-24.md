# Tax Data Provenance Recheck — 2026-11-24

## Status

**Not release-ready for tax-accuracy claims.** This recheck is a source-provenance and spot-consistency audit only. It does not authorize changing tax values, calculation formulas, or production data.

## State-data source coverage

`tax-state-data.js` currently assigns the same source URL, `https://statewisenews.com/state-income-tax-rates/`, to 47 of the 50 state records. Only Arkansas, South Carolina, and West Virginia override that shared URL. The shared source is not an official state tax authority and is insufficient evidence for a 2026 legal-rate dataset.

## Official-source spot checks

| State | Official 2026 evidence | Candidate comparison | Finding |
|---|---|---|---|
| California | [FTB 2026 tax rate schedules](https://www.ftb.ca.gov/forms/2026/2026-540-tax-rate-schedules.pdf) | Candidate thresholds include $11,079, $26,264, $41,452, $57,542, and $72,724; the 2026 FTB schedule starts at $11,456, $27,157, $42,861, $59,498, and $75,197 for the single schedule. | **Mismatch:** candidate thresholds are stale for 2026. Filing-status schedules also require exact mapping. |
| Georgia | [Georgia DOR — Important Tax Updates](https://dor.georgia.gov/taxes/important-tax-updates) | Candidate rate is 4.99%, but candidate standard deductions are $12,000 single / $24,000 joint. DOR reports $15,000 / $30,000 for 2026. | **Mismatch:** standard deductions are stale/incorrect for 2026. The 4.99% flat rate is consistent. |
| Oklahoma | [Oklahoma Tax Commission 2026 Revenue & Apportionment Report](https://oklahoma.gov/content/dam/ok/en/tax/documents/resources/reports/annual-reports/otc/AR-2026.pdf) | Candidate bands are 2.5% from $0, 3.5% above $3,750, and 4.5% above $4,900. The official 2026 report describes 0% on the first $3,750 and 4.5% above $7,200, with the intermediate graduated calculation. | **Mismatch:** candidate brackets do not match the official 2026 description and need a complete table-level reconciliation. |
| Iowa | [Iowa DOR — 2026 individual income tax rate](https://revenue.iowa.gov/press-release/2025-10-21/idr-announces-2026-individual-income-tax-and-interest-rates) | Candidate uses a flat 3.8%. | Spot check consistent. |
| Ohio | [Ohio DOR — 2026 brackets](https://tax.ohio.gov/individual/who-must-file/whats-new) | Candidate uses 0% through $26,050 and 2.75% above. | Spot check consistent for the simplified nonbusiness-income schedule. |
| Wisconsin | [Wisconsin DOR — 2026 tax rates](https://www.revenue.wi.gov/Pages/FAQS/pcs-taxrates.aspx) | Candidate single and joint thresholds/rates match the 2026 DOR schedules. Candidate does not model the separate-filer schedule and uses a simplified status set. | Rates spot check consistent; filing-status coverage is incomplete. |

## Other jurisdictional findings retained

- The existing 2026 jurisdiction audit identifies missing Canadian federal and most provincial/territorial basic personal amount credits. Canadian results remain provisional.
- US federal, UK, Canada, and Bangladesh source URLs exist in `tax-data.js`, but source links alone do not establish that every data field and special case is fully modeled.
- Bangladesh minimum-tax exceptions and additional tax adjustments remain outside the current model.
- The current tax tool remains a simplified educational estimate, not a tax-return or residency determination engine.

## Required next actions

1. Replace the shared 47-state source attribution with a per-state official-source registry, including source URL, tax year, effective date, filing status, rate thresholds, deductions/exemptions, and last-verified date.
2. Reconcile every state dataset against its official Department of Revenue / Taxation source. Do not infer that a state is verified from a third-party summary.
3. Correct California 2026 thresholds, Georgia 2026 standard deductions, and Oklahoma 2026 brackets only after source-level transcription and independent boundary-test review.
4. Keep unsupported filing statuses, local taxes, credits, and special schedules explicitly disclosed.
5. Keep Canadian and Bangladesh profiles provisional until the already-recorded P1/P2 gaps are resolved.
6. Add official worked-example and bracket-boundary regression tests for each jurisdiction before removing provisional disclaimers.

## Change boundary

- No tax rates, brackets, deductions, jurisdiction IDs, formulas, or calculation code were changed by this recheck.
- Translation records remain drafts; English fallback remains active.
- This is a candidate-branch audit note only. It does not authorize merge, activation, or deployment.
