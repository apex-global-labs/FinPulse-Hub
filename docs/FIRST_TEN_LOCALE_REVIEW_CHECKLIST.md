# First-ten tool translation review checklist

**Scope:** first-ten FinPulse Hub tools, six target locales, seven-language source catalogue.
**Current state:** all translated tool records remain `draft`. No native-speaker or finance-domain review is claimed complete.
**Release rule:** do not change a locale record to `approved` or `published` until the relevant linguistic and domain reviews are recorded.

## Reviewers and sign-off

For each locale, record a native-level reviewer and, for financial terminology and calculations, a finance-domain reviewer. One person may fill both roles only if they have both qualifications.

| Locale | Native-level reviewer | Finance-domain reviewer | Date | Status |
|---|---|---|---|---|
| Hindi (`hi`) | Pending | Pending | — | Pending |
| Arabic (`ar`) | Pending | Pending | — | Pending |
| Urdu (`ur`) | Pending | Pending | — | Pending |
| Simplified Chinese (`zh-CN`) | Pending | Pending | — | Pending |
| Japanese (`ja`) | Pending | Pending | — | Pending |
| Russian (`ru`) | Pending | Pending | — | Pending |

## Tool-by-locale review matrix

Each cell requires both linguistic and finance-domain review where applicable. Keep records as `draft` until the relevant reviewers sign off.

| Tool ID | hi | ar | ur | zh-CN | ja | ru |
|---|---|---|---|---|---|---|
| `currency` | Pending | Pending | Pending | Pending | Pending | Pending |
| `mortgage` | Pending | Pending | Pending | Pending | Pending | Pending |
| `loan` | Pending | Pending | Pending | Pending | Pending | Pending |
| `emi` | Pending | Pending | Pending | Pending | Pending | Pending |
| `compound` | Pending | Pending | Pending | Pending | Pending | Pending |
| `percentage` | Pending | Pending | Pending | Pending | Pending | Pending |
| `tip` | Pending | Pending | Pending | Pending | Pending | Pending |
| `car` | Pending | Pending | Pending | Pending | Pending | Pending |
| `amortization` | Pending | Pending | Pending | Pending | Pending | Pending |
| `savings` | Pending | Pending | Pending | Pending | Pending | Pending |

## Required checks for every tool and locale

- [ ] Tool title, description, category and terminology sound natural in the target locale.
- [ ] Every input label, help text, option, placeholder and validation message is accurate.
- [ ] Result heading, summary, metric labels and breakdown labels match the actual calculation outputs.
- [ ] Formula explanation and each calculation step preserve the English source meaning and order.
- [ ] Formula notation, constants, units, rate conversions, currency codes and identifiers remain unchanged.
- [ ] Assumptions, disclaimers and limitations do not overstate certainty or imply a guaranteed return.
- [ ] FAQs and SEO copy are natural, accurate and consistent with the tool.
- [ ] Accessibility labels are understandable when read by a screen reader.
- [ ] Arabic/Urdu text direction and mixed formula/number rendering are correct.
- [ ] Reviewer confirms no accidental text from another locale is present.

## Release and runtime safeguards

- The runtime accepts only `approved` or `published` locale records.
- The runtime rejects a record if any required content field or stable key is missing.
- Missing, incomplete, draft, or otherwise unapproved content falls back to the complete English tool page.
- A reviewer must not approve a translation merely because automated tests pass.
- After review, re-run the seven-locale browser, RTL/LTR, accessibility, regression and calculation checks before considering release.

## Review evidence

For each change, record the locale, tool ID, reviewer role, reviewed field groups, issues found, correction commit, review date and explicit sign-off. Keep unresolved issues open; do not infer approval from silence.
