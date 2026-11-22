# Mobile Homepage Accessibility Follow-up

**Created:** 2026-11-22  
**Latest baseline:** Lighthouse run #45002913442, candidate SHA a605ed3022f45a1853e85550bef1b8eb87d2beb1  
**Mobile homepage scores:** Performance 96, Accessibility 92, Best Practices 96, SEO 100, CLS 0.0000  
**Status:** Investigation pending; no remediation claimed.

## Scope
This is a separate UI/accessibility follow-up. It must not change tax-engine calculations, tax source contracts, or state activation decisions.

## Required next actions
1. Retrieve and inspect Lighthouse artifact 14745908818, focusing on the mobile homepage Accessibility audit details.
2. List every failed audit, affected element/selector, impact, and recommended fix. Distinguish errors from non-blocking manual review warnings.
3. Reproduce each issue on the mobile homepage and inspect keyboard/screen-reader behavior where applicable.
4. Implement the smallest targeted HTML/CSS/JS fix without altering the approved homepage layout or calculator behavior.
5. Run the full browser/WCAG route suite and Lighthouse again; compare score and CLS against the baseline.
6. Record exact changed files, evidence, and final scores. Do not claim improvement until the new Lighthouse artifact confirms it.

## Release guard
The 92 score is a follow-up opportunity, not a current Lighthouse workflow failure. Keep it separate from the tax-jurisdiction release gate.