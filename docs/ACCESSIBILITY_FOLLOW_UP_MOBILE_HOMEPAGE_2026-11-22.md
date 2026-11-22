# Mobile homepage Lighthouse accessibility follow-up — 2026-11-22

## Baseline evidence

Lighthouse mobile homepage report from workflow run #45003689076 (candidate SHA `a372458db58f62d087d33e99f1abb9c4ab089700`) scored Accessibility **92**. The report identified:
- Category heading contrast: `#687b38` on `#f5f8f5` = 4.38:1 and `#27815c` on `#f5f8f5` = 4.48:1; both below 4.5:1.
- `#quick-calculator > summary` touch target was partially obscured and did not meet target-size/spacing guidance.
- Brand link and calculator clear button accessible names omitted visible text.

## Candidate changes

- Darkened the two category colors to `#5f702f` and `#267451`; calculated contrast ratios are 5.10:1 and 5.31:1 respectively on the audited background.
- Made the quick-calculator disclosure full width with a 44px minimum target and independent stacking context.
- Included the visible “F” brand mark and “AC” / backspace glyphs in accessible names, including dynamically generated keys.
- Updated the homepage browser assertion to permit the disclosure's larger touch target while keeping the calculator within the first viewport (top < 170px).

## Candidate verification

- Lighthouse run #45006087709, SHA `d3d484da5f640409f48a6edc89136a27b4436840`: all four route audits and CLS enforcement succeeded.
- Mobile homepage Accessibility: **100**; mobile tool: **100**; desktop homepage: **100**; desktop tool: **100**.
- The Lighthouse run is successful. Main browser CI for this candidate is being rerun after updating the above-fold geometry assertion; do not treat the candidate as release-ready until that CI run passes.

No production deployment is included in this PR.
