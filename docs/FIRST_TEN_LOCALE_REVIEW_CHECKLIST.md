# First-ten tool translation QA checklist

**Scope:** first-ten FinPulse Hub tools, six target locales, seven-language source catalogue.
**Current state:** translated locale records remain `draft`; this checklist tracks automated quality assurance and does not grant publication approval.
**Review policy:** native-speaker and finance-domain feedback is optional and non-blocking. No written human sign-off is required for release.

## Tool-by-locale QA matrix

Each cell is accepted only after the applicable automated checks pass on the current candidate commit.

| Tool ID | hi | ar | ur | zh-CN | ja | ru |
|---|---|---|---|---|---|---|
| `currency` | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA |
| `mortgage` | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA |
| `loan` | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA |
| `emi` | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA |
| `compound` | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA |
| `percentage` | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA |
| `tip` | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA |
| `car` | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA |
| `amortization` | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA |
| `savings` | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA | Automated QA |

## Required automated checks

- [ ] Stable tool IDs, field keys, formulas, constants, units, currency codes and jurisdiction identifiers remain unchanged.
- [ ] Every required translated content field is present and non-empty.
- [ ] Formula explanation step counts and ordering match the English source.
- [ ] Automated locale/script checks detect unintended cross-locale text contamination.
- [ ] Missing, incomplete, draft or unapproved content falls back to the complete English tool definition.
- [ ] Approved/published rendering is tested with isolated in-memory fixtures; fixtures do not change stored translation statuses.
- [ ] Playwright browser coverage exercises all first-ten tool routes in all seven locales (70 route/locale combinations).
- [ ] Direction assertions verify Arabic and Urdu as RTL and English, Hindi, Simplified Chinese, Japanese and Russian as LTR.
- [ ] axe-core WCAG 2.1 A/AA accessibility audit runs after navigation for each of the 70 route/locale combinations.
- [ ] Desktop and mobile Lighthouse audits pass the configured performance and CLS budgets.
- [ ] Finance regression tests and live reference-rate API verification pass on the exact candidate commit.

## Runtime and release safeguards

- The runtime accepts only `approved` or `published` locale records with all required fields.
- Missing, incomplete, draft or otherwise unapproved content uses the complete English tool definition.
- Automated validation establishes technical consistency, not linguistic perfection; optional expert feedback can improve quality but is not a release blocker.
- Translation records must not be silently promoted from `draft` to `approved` or `published`. Any activation requires a separate explicit decision and validation.
- Merge and production deployment remain blocked until all mandatory automated release gates pass on the exact latest PR commit and the release decision is explicitly authorized.

## Optional quality feedback

If voluntarily provided, feedback may record locale, tool ID, field group, issue, suggested correction and correction commit. No reviewer identity, written sign-off or human approval status is required.
