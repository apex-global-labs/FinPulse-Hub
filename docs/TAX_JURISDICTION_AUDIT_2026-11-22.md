# Tax Jurisdiction Audit — 2026-11-22

## Executive summary

**Status: Audit in progress; not release-ready for tax accuracy claims.** The current candidate contains 23 individual income-tax profiles: 4 US federal filing-status profiles, 2 UK profiles, 13 Canadian province/territory profiles (including Québec), and 4 Bangladesh taxpayer-category profiles. It also contains 50 US state entries and manual/preset consumption-tax rates for selected jurisdictions.

The 2026 headline brackets for US federal, UK, Canada and Bangladesh were compared with current official sources. Several bracket datasets are aligned with those sources, but the calculator is not a complete tax-residency or tax-return engine. Important credits, state-level source verification and special taxpayer cases remain incomplete.

No merge or production deployment is authorized by this audit. PR #66 remains Draft.

## Scope reviewed

- `tax-data.js`: federal/national profiles, tax bands, allowances, source URLs.
- `tax-state-data.js`: 50 US state income-tax entries and employee payroll parameters.
- `tax-engine.js`: progressive tax calculation, state tax addition, payroll estimates and disclaimers.
- `app.js`: Income Tax and Salary Take-Home Calculator inputs, selected profile and output presentation.
- `smart-ui.js`: Sales Tax and VAT/GST presets.
- Existing regression tests in `tests/formula.test.cjs` and `tests/smoke.test.cjs`.

## Verified coverage and data

| Area | Candidate coverage | Audit result |
|---|---|---|
| US federal | 2026; single, married joint, married separate, head of household | Bracket thresholds and standard deductions align with IRS 2026 Revenue Procedure |
| UK income tax | 2026–27; England/Wales/Northern Ireland and Scotland | Personal allowance and core bands align with HMRC |
| UK employee NI | Class 1 simplified annual estimate | Primary/upper thresholds and 8%/2% rates align with HMRC |
| Canada income tax | 2026 federal + 10 provinces + 3 territories, with Québec separately modeled | Rate bands align with CRA/Revenu Québec; tax credits are incomplete (see P1) |
| Canada employee payroll | CPP, CPP2, EI; Québec QPP, QPP2, EI, QPIP | Main 2026 ceilings and employee rates reviewed against CRA/Revenu Québec |
| Bangladesh income tax | AY 2026–27; general, women/senior, third-gender/disability, gazetted freedom fighter/July fighter | Base thresholds and slabs align with NBR 2026–27 budget material; special cases remain |
| US state income tax | 50 states | Coverage count exists; source quality and completeness are not release-grade |
| Sales tax / VAT / GST | Manual rate plus selected presets: US manual/local, UK 20%, Bangladesh 15%, Canadian province/territory starting rates | Not an automated jurisdiction or product-tax engine |

## Findings

### P1 — Canada income-tax estimates omit major basic personal amount credits

**Files:** `tax-data.js`, `tax-engine.js`

The Canadian federal and provincial bracket rates are progressive, but the engine calculates tax for each component without applying the federal basic personal amount non-refundable tax credit. Most provincial/territorial basic personal amount credits are also absent. Québec has a provincial credit entry, but the federal credit is still absent.

CRA 2026 payroll guidance lists a federal basic personal amount range of $16,452 maximum and $14,829 minimum. These are tax-credit amounts, not simply additional bracket thresholds. The current engine's Canadian results can therefore materially overstate liability.

**Action:** Treat Canadian income-tax outputs as provisional. Implement the federal and province/territory non-refundable credits, income phase-outs and relevant provincial surtaxes/health premiums from official 2026 sources; add official worked-example and boundary tests before marking Canada profiles release-ready.

### P1 — US state data is not backed by official sources for most states

**File:** `tax-state-data.js`

The 50 state entries use `statewisenews.com/state-income-tax-rates/` as their shared source, except for Arkansas, South Carolina and West Virginia, which have separate source URLs. A secondary generic source is insufficient evidence for 2026 legal rates and deductions across 47 states.

State rules may include different filing-status brackets, standard deductions, personal exemptions, credits, local income taxes, surtaxes and special schedules. The current UI offers only Single and Married Filing Jointly state filing statuses. Washington DC and US territories are not included.

**Action:** Verify every state against its official Department of Revenue / Taxation source, record the source URL and effective date per state, add status/credit/local-tax scope metadata, and keep unsupported cases explicitly excluded. Until then, do not describe the 50-state estimates as comprehensive or authoritative.

### P1 — UK personal allowance taper used gross income instead of adjusted net income

**File:** `tax-engine.js`

HMRC reduces the personal allowance by £1 for every £2 of adjusted net income above £100,000. The earlier implementation used gross income before user-entered eligible deductions. The candidate now calculates the taper from `gross - deductions`, and a regression test has been added.

**Action:** Keep this fix; CI must pass on the final PR head. Clarify in the UI that only deductions which qualify in the adjusted-net-income calculation should be entered.

### P2 — Bangladesh minimum-tax exception and additional tax rules are not represented

**Files:** `tax-data.js`, `tax-engine.js`

The general and category thresholds/slabs in the candidate match the NBR's published 2026–27 framework. The flat Tk 5,000 minimum tax is consistent with the 2026–27 budget material when income exceeds the tax-free threshold. However, the NBR material also identifies a Tk 1,000 minimum-tax treatment for new taxpayers. The current profiles do not ask whether the taxpayer qualifies as a new taxpayer.

Investment tax rebates, surcharge, wealth-based surcharge, income-source-specific treatment, non-resident treatment and other eligibility conditions are not modeled.

**Action:** Add explicit eligibility inputs only after checking the operative Finance Act/Ordinance, NBR paripatra and applicable SROs. Otherwise disclose these exclusions and do not imply a final tax payable amount.

### P2 — Tax residency and filing jurisdiction are user-selected presets, not automatically determined

**Files:** `app.js`, `tax-data.js`, `tax-engine.js`

The user selects a country/region profile. The Global Country setting does not determine tax residency, domicile, residence days, source-of-income rules, treaty position, part-year residence or the correct filing jurisdiction. A country selection must not be presented as proof of tax residency.

**Action:** Keep tax jurisdiction separate from locale/currency. Before attempting automation, define explicit residency and source-income inputs and a supported-jurisdiction contract. For now, describe profile selection as a manual jurisdiction assumption.

### P2 — Income-tax scope excludes important tax categories and individual circumstances

The current model is a simplified progressive employment/ordinary-income estimate. It does not comprehensively model capital gains, dividends, savings income, property income, self-employment schedules, tax treaties, alternative minimum taxes, credits, deductions, dependants, disability/age-specific benefits, foreign income or all local taxes.

The UK profiles do not calculate the separate dividend/savings/property regimes. US federal profiles do not model the full set of credits, AMT, NIIT, QBI or age/blind additional deductions. Canada credits and provincial add-ons are addressed in P1. Bangladesh special regimes are addressed above.

**Action:** Keep the educational-estimate disclaimer visible and list unsupported income types and adjustments close to the result.

### P2 — Payroll is an annualized employee-only estimate

**Files:** `tax-state-data.js`, `tax-engine.js`, `app.js`

The configured US FICA, UK Class 1 NI, Canada CPP/CPP2/EI and Québec QPP/QPP2/EI/QPIP headline parameters align with the reviewed official 2026 references. The engine does not model all pay-period rounding, year-to-date earnings, multiple employers, director rules, NI category letters, self-employed contributions, employee-specific exemptions or employer-side contributions. The US Additional Medicare employer withholding threshold is not identical to an employee's final filing-status liability threshold.

**Action:** Label the result as an annualized simplified employee contribution estimate; add separate payroll-period logic only with official tables and worked examples.

### P2 — Consumption-tax presets are not a complete place-of-supply engine

**File:** `smart-ui.js`

The current preset set is intentionally limited. US is a manual/local-rate placeholder because there is no single nationwide general sales-tax rate. UK, Bangladesh and selected Canadian province/territory presets provide standard-rate starting points. The tools do not determine product/service classification, registration thresholds, place of supply, cross-border destination rules, exemptions, zero-rating, reduced rates or local/state tax stacking for every transaction.

**Action:** Retain manual overrides and clear jurisdiction notes. Do not describe these presets as a complete VAT/GST/sales-tax compliance calculator.

### P3 — Source freshness metadata is shared and needs per-dataset governance

The tax datasets currently use a shared `checkedOn: 2026-11-18` marker. Tax law changes at different times and sources have different publication/effective dates. Source URLs should be maintained per dataset and per jurisdiction, with an effective tax year and last-verified date. The Bangladesh source reference has been changed from the previous-year PDF to the current NBR income-tax paripatra listing. The US federal source now points to IRS Revenue Procedure 2025-32 / IRB 2025-45; UK NI points to HMRC's 2026–27 NI rates page.

**Action:** Replace shared freshness metadata with per-profile/per-state source metadata and add a review cadence.

## Immediate candidate changes made during this audit

1. UK personal allowance taper now uses adjusted net income after entered eligible deductions.
2. Added a regression test for the UK taper when eligible deductions reduce adjusted net income below £100,000.
3. Updated US federal source reference to IRS Internal Revenue Bulletin 2025-45 (Rev. Proc. 2025-32).
4. Updated Bangladesh source reference to the current NBR Income Tax Paripatra listing.
5. Updated UK Scotland and National Insurance source references to current HMRC guidance.
6. Added an explicit result disclaimer for Canadian basic personal amount / non-refundable credits not fully modeled and for US state source verification/local tax limitations.

These are candidate-branch changes only. They have not been merged or deployed.

## Official reference set reviewed

- IRS, Internal Revenue Bulletin 2025-45 / Rev. Proc. 2025-32 (2026 brackets and standard deductions): https://www.irs.gov/irb/2025-45_IRB
- IRS Publication 15 (2026), FICA and Social Security wage base: https://www.irs.gov/publications/p15
- HMRC, Income Tax rates and allowances 2026–27: https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past
- HMRC, National Insurance rates and allowances 2026–27: https://www.gov.uk/government/publications/rates-and-allowances-national-insurance-contributions/rates-and-allowances-national-insurance-contributions
- HMRC, Employer rates and thresholds 2026–27: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
- CRA, 2026 federal and provincial/territorial income-tax brackets: https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html
- CRA, 2026 federal basic personal amounts: https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4032-payroll-deductions-tables/t4032oc-jan/t4032oc-january-general-information.html
- CRA, CPP 2026 limits: https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/canada-pension-plan-cpp/cpp-contribution-rates-maximums.html
- CRA, CPP2 2026 limits: https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/calculating-deductions/making-deductions/second-additional-cpp-contribution-rates-maximums.html
- CRA, EI 2026 limits: https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/employment-insurance-ei/ei-premium-rates-maximums.html
- Revenu Québec, 2026 income-tax brackets: https://www.revenuquebec.ca/en/citizens/income-tax-return/completing-your-income-tax-return/income-tax-rates/
- Revenu Québec, 2026 QPP limits: https://www.revenuquebec.ca/en/businesses/source-deductions-and-employer-contributions/calculating-source-deductions-and-contributions/qpp-contributions/maximum-pensionable-earnings-and-contribution-rate/
- Revenu Québec, 2026 QPIP limits: https://www.revenuquebec.ca/en/businesses/source-deductions-and-employer-contributions/calculating-source-deductions-and-contributions/qpip-premiums/maximum-insurable-earnings-and-premium-rate/
- NBR, current Income Tax Paripatra listing: https://nbr.gov.bd/taxtypes/income-tax/income-tax-paripatra/eservices/taxefiling/eng
- NBR, 2026–27 tax-free thresholds and slabs (Budget Appendix B): https://nbr.gov.bd/uploads/budget/English.pdf

## Release gate

- [x] Review current profile coverage and calculation code.
- [x] Compare major 2026 headline brackets/parameters with official sources.
- [x] Correct UK adjusted-net-income taper and add regression coverage.
- [x] Improve US, UK NI and Bangladesh source references.
- [ ] Complete CI on the latest PR #66 head after these audit changes.
- [ ] Implement and test Canadian basic personal amount / provincial non-refundable credits.
- [ ] Validate all 50 US state datasets against official state sources; resolve filing-status and local-tax scope.
- [ ] Complete Bangladesh new-taxpayer/minimum-tax and additional-rule review.
- [ ] Decide whether unsupported tax categories should remain excluded or receive separate profiles.
- [ ] Complete tax-specific browser/accessibility and boundary-case audit.
- [ ] Update `docs/PROJECT_STATE.md` after the audit and final acceptance.

**Release recommendation:** Keep PR #66 Draft. Do not merge or deploy until all P1 items are either corrected and tested or the affected estimates are clearly restricted/disabled. A successful CI run alone does not establish tax-law completeness.
