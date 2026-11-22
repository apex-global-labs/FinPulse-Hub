# 2026 US State Tax Calculation Contracts — Group 2

**Audit date:** 2026-11-22  
**States:** Illinois (IL), Indiana (IN), Michigan (MI), Colorado (CO)  
**Status:** Research incomplete; all four remain `manual-only`.  
**Engine changes:** None. No automatic tax schedule has been enabled.

## Release decision

A flat tax rate or withholding table is not a complete individual income tax calculation contract. Each state requires its tax-year 2026 final individual return instructions, taxable-income reconciliation, filing-status treatment, exemptions/deductions, credits, residency and sourcing rules, local taxes, effective dates, rounding and authoritative regression examples. Where the official 2026 final return instructions are not published or a required tax component is not yet verified, the state remains manual-only.

The machine-readable contract is `tax-state-contracts-2026-group2.json`. The regression guard is added to `tests/formula.test.cjs`.

## 1. Illinois (IL)

### Official evidence available
- Illinois Department of Revenue's 2026 individual draft forms page lists the 2026 IL-1040 as Draft and explicitly says its instructions are “coming soon”. Supporting schedules are in draft; the IL-E/EITC instructions were updated November 9, 2026.
- 2026 personal exemption: **$2,925** per eligible exemption.
- Additional exemption for age 65+ and/or legally blind: **$1,000 per applicable person**.
- Exemption is disallowed when federal AGI exceeds **$250,000** for single/head-of-household/married-filing-separately/widowed, or **$500,000** for married filing jointly.
- State rate: **4.95%**.
- Base structure from the official instructions: federal AGI plus Illinois additions minus Illinois subtractions gives Illinois base income; applicable exemption allowance is then subtracted.
- Rounding: whole dollars, 0.50 rounds up.
- Reciprocal wage states: Iowa, Kentucky, Michigan and Wisconsin. Non-wage Illinois-source income does not automatically receive the same reciprocal treatment.

### Calculation contract (provisional)
1. Start with federal AGI and apply all 2026 Illinois additions and subtractions.
2. Determine resident / part-year / nonresident treatment; Schedule NR is mandatory where required.
3. Compute base exemption by the applicable federal filing status and eligible spouse/dependent count; apply dependent-income and AGI limits, age/blind additions.
4. Calculate the flat 4.95% tax on the statutory base after exemption.
5. Apply only separately modeled state credits, including EITC/Child Tax Credit and Schedule ICR/CR credits.
6. Round at the form line level exactly as the final 2026 IL-1040 instructions require.

### Blockers
The complete 2026 IL-1040 instructions are not yet posted. Final return line order, full Schedule M adjustments, dependent exemptions and EITC/child credit worksheet, Schedule ICR, Schedule CR and Schedule NR interactions need final verification. No golden tax result should be inferred from a draft withholding table.

## 2. Indiana (IN)

### Official evidence available
- Indiana DOR's 2026 Tax Chapter (revised October 2026) confirms a **2.95%** individual income-tax rate for tax year 2026.
- The same guide confirms 2026-only deductions for qualified tips, overtime compensation and qualified passenger-vehicle loan interest; the deductions are capped by the corresponding federal deduction and have eligibility restrictions. Married filing separately is not eligible for the overtime deduction.
- Indiana's federal conformity date is January 1, 2026, subject to Indiana modifications. Specified foreign research expenditures and qualified production property are important decoupling/add-back cases.
- 2026 county rates are published in Departmental Notice #1 effective October 1, 2026. County income tax is a material additional calculation, not optional metadata.
- The current-year individual forms page still lists the 2025 IT-40 and IT-40PNR instruction booklets at this audit point.

### Calculation contract (provisional)
1. Reconcile federal AGI to Indiana AGI using state add-backs and deductions.
2. Apply the 2.95% state rate.
3. Determine county income tax independently using the correct county, residency/working location, and effective date; apply the published county rate schedule and statutory sourcing/limitations.
4. Apply eligible exemptions and credits, including dependent, elderly, adoption, EITC and other state credits only where fully specified.
5. Apply 2026-only tips, overtime and qualified passenger-vehicle loan-interest deductions with statutory definitions, limits, filing-status restrictions and part-year proration.
6. Handle full-year resident, part-year, nonresident and reciprocal-state return pathways separately.
7. Apply tax-year-specific rounding and county-rate change dates.

### Blockers
Full 2026 IT-40 / IT-40PNR instructions and all final schedules were not available on the current-year forms page. County sourcing, local rate changes, resident/nonresident allocation, all credits and new 2026 deductions must be implemented from the final forms and official bulletins before automation.

## 3. Michigan (MI)

### Official evidence available
- Michigan Treasury determined the 2026 individual income-tax rate is **4.25%**.
- Michigan's official calendar-year withholding information lists a 2026 personal exemption of **$5,900**. This is withholding evidence and must be checked against the final return instructions before being used as the complete final-liability exemption rule.
- The currently indexed MI-1040 booklet is labeled **Michigan 2025** and describes 2025 rate and rules, despite including 2026 estimated-payment dates. It is not a 2026 final-return instruction set.
- Michigan's individual income base generally starts with federal AGI, adjusted by Michigan additions and subtractions, then applies exemptions.
- Michigan city income taxes are separate; Detroit returns are administered by Treasury.
- Reciprocal wage states include Illinois, Indiana, Kentucky, Minnesota, Ohio and Wisconsin.

### Calculation contract (provisional)
1. Start from federal AGI and apply Michigan Schedule 1 additions/subtractions.
2. Apply the verified 2026 4.25% rate.
3. Apply the final 2026 personal exemption and any age/blind/dependent provisions once the MI-1040 instructions confirm them.
4. Model retirement/pension subtractions, Social Security and birth-year transition rules only from 2026-effective official instructions.
5. Apply other-state tax credit and resident/part-year/nonresident sourcing.
6. City income taxes (including Detroit) require a city-specific input and separate city schedule; do not hide them inside the state rate.
7. Apply refundable/nonrefundable credits and form-specific rounding.

### Blockers
The complete 2026 MI-1040 instructions and final schedules were not located. Retirement/pension transitions, Social Security treatment, exemptions, city tax and credits cannot be safely inferred from the 2025 booklet or employer withholding guide.

## 4. Colorado (CO)

### Official evidence available
- Colorado's January 2026 Individual Income Tax Guide confirms the base is federal taxable income modified by Colorado additions and subtractions.
- The guide lists the 2025 rate as 4.4%, but its published rate table does not yet list a 2026 rate. Do **not** carry the 2025 rate forward as a verified 2026 rate.
- Colorado AMT exists and is calculated separately using DR 0104AMT.
- For 2026 and later, Colorado requires an add-back of the full federal overtime deduction. No add-back is required for the federal qualified tips deduction.
- For AGI above $300,000, the 2026-and-later federal standard/itemized deduction add-back limits are $1,000 single and $2,000 joint.
- The guide also identifies new 2026 subtractions for included death benefits and Segal AmeriCorps Education Awards.
- The current DR 0104 forms page still links the 2025 and 2024 return forms; the 2026 estimated payment form alone does not constitute complete 2026 final-return instructions.
- Filing status follows federal status. Part-year and nonresident income requires apportionment.

### Calculation contract (provisional)
1. Start with federal taxable income, not federal AGI.
2. Apply Colorado additions, including the 2026 overtime deduction add-back, state-income-tax deduction add-back and other applicable federal conformity adjustments.
3. Apply Colorado subtractions, including 2026 death-benefit and Segal AmeriCorps Education Award treatment, plus all other supported statutory subtractions.
4. Apply the official 2026 rate once published.
5. Compute AMT using the final 2026 DR 0104AMT instructions and compare with regular tax.
6. Apply refundable and nonrefundable credits, withholding and estimated payments.
7. Apportion part-year/nonresident income using DR 0104PN and official sourcing rules; apply rounding and tax-table rules.

### Blockers
The official 2026 rate and final DR 0104, DR 0104PN and DR 0104AMT instructions were not located. Without these, no accurate 2026 Colorado result can be produced.

## Regression-test readiness

The first regression guard now checks:
- IL, IN, MI and CO remain `calculationMode: "manual"`.
- Selecting any of the four states does not silently calculate an unverified automatic state tax.
- A user-entered manual amount is the only state tax amount included, and is marked manual.
- The machine-readable contracts identify each state as not automation-ready.

**Golden numeric regression vectors are intentionally blocked** until the complete official 2026 return instructions and schedules are available. After that, add low/mid/high income, threshold-boundary, filing-status, county/city, credit, residency/reciprocity, rounding and invalid-input vectors per state, compared against official examples/worksheets. Only then may a State be considered for automatic mode.

## Separate follow-up: Mobile homepage Accessibility

This is tracked independently from tax jurisdiction work. Latest successful Lighthouse run #45002913442 reported mobile homepage Accessibility **92** (Performance 96, Best Practices 96, SEO 100, CLS 0). Do not change tax calculations to address this score. Next accessibility task: inspect the Lighthouse artifact's failing/flagged audit details, identify affected homepage elements, fix the actual causes, then rerun mobile browser/WCAG and Lighthouse regression. No remediation is claimed yet.

## Official primary sources

- Illinois 2026 individual draft forms and instruction availability: https://tax.illinois.gov/taxprofessionals/draft-forms/individual-income-tax-draft-forms.html
- Illinois 2026 personal exemption: https://tax.illinois.gov/questionsandanswers/answer.851.html
- Illinois 2026 Schedule IL-E/EITC instructions: https://tax.illinois.gov/content/dam/soi/en/web/tax/taxprofessionals/draft-forms/documents/iit-draft-forms/2026-iit-vendor-forms-and-instructions/2026-sch-il-e-eitc-instr-vendor.pdf
- Indiana 2026 Tax Chapter: https://www.in.gov/dor/files/tax-chapter.pdf
- Indiana 2026 county rates (Oct. 1 schedule): https://www.in.gov/dor/files/dn01.pdf
- Indiana Bulletin #128 (2026 tips/overtime/vehicle-interest deductions): https://www.in.gov/dA/9bd4adadb4/ib128.pdf?language_id=1
- Michigan 2026 rate notice: https://www.michigan.gov/treasury/reference/taxpayer-notices/2026/04/15/425-income-tax-rate-for-individuals-and-fiduciaries-in-2026-tax-year
- Michigan 2026 withholding rate/exemption: https://www.michigan.gov/taxes/business-taxes/withholding/calendar-year-tax-information
- Michigan 2025 MI-1040 booklet (reference only; not 2026 final instructions): https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/IIT/TY2025/MI-1040-Book.pdf
- Colorado January 2026 Individual Income Tax Guide: https://tax.colorado.gov/sites/tax/files/documents/Individual_Income_Tax_Guide_January_2026.pdf
- Colorado DR 0104 form availability: https://tax.colorado.gov/DR0104
