# Mobile homepage Lighthouse accessibility follow-up — 2026-11-22

## Baseline evidence

Lighthouse mobile homepage report from run #45003689076 (candidate SHA `a372458db58f62d087d33e99f1abb9c4ab089700`) scored Accessibility **92**. The report identified:
- Two category heading contrast failures: `#687b38` on `#f5f8f5` = 4.38:1 and `#27815c` on `#f5f8f5` = 4.48:1.
- The `#quick-calculator > summary` disclosure target was partially obscured / undersized.
- Brand link and calculator clear-key accessible names did not include visible text.

## Candidate remediation

- Updated the two category colors to `#5f702f` and `#267451` (both exceed 4.5:1 on the audited background).
- Gave the quick-calculator disclosure a full-width 44px minimum target and an independent stacking context.
- Included the visible brand mark, AC label and backspace glyph in accessible names, including dynamic calculator key labels.
- Updated the browser geometry assertion to preserve first-viewport visibility while accommodating the larger disclosure target.

## Evidence

- Accessibility candidate Lighthouse run #45006087709, SHA `d3d484da5f640409f48a6edc89136a27b4436840`: all four route audits and CLS checks passed.
  - Mobile homepage Accessibility **100**, Performance 98, Best Practices 96, SEO 100, CLS 0.
  - Mobile tool Accessibility **100**, Performance 96, Best Practices 96, SEO 100, CLS 0.0303.
  - Desktop homepage Accessibility **100**, Performance 100, Best Practices 96, SEO 100, CLS 0.
  - Desktop tool Accessibility **100**, Performance 100, Best Practices 96, SEO 100, CLS 0.0087.
- Candidate CI for the final remediation commit is still running. Do not treat this candidate as release-ready until the complete browser CI passes.

No production deployment is included in this PR.
