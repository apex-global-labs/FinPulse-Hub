# Localization Batch 2 — Tools #61–70 Source Extraction Audit

**Audit date:** 2026-11-28  
**Repository:** apex-global-labs/FinPulse-Hub  
**PR:** #73 (Draft; unmerged)  
**Range:** #61–70 (10 Math & Statistics tools)

## Result

**Source extraction complete: 10/10; translation drafting not started.** Records were extracted from the active definitions in `math-tools.js`, calculation implementations in `math-core.js`, and the verified formula/step guide map in `math-tools.js`. No formula or runtime code was changed.

## Inventory and evidence

| # | Tool ID | Runtime function | Protected behavior |
|---:|---|---|---|
| 61 | nth-root | `M.nthRoot(value,index)` | Safe integer index 1–99; negative radicands require odd index; finite result required |
| 62 | factorial | `M.factorial(n)` | Safe integer 0–170; 0! and 1! return 1 |
| 63 | gcd | `M.gcd(a,b)` | Safe integers; absolute values; Euclidean algorithm; runtime returns 0 for (0,0) |
| 64 | lcm | `M.lcm(a,b)` | Safe integers; zero input returns 0; result must remain a safe integer |
| 65 | prime-checker | `M.isPrime(n)` | Safe integer; values below 2 are not prime; maximum supported input 10^12 |
| 66 | prime-factorization | `M.primeFactors(n)` | Safe integer 2–10^12; factor/exponent pairs |
| 67 | modulo | `M.modulo(a,b)` | Finite inputs; non-zero divisor; non-negative remainder normalization |
| 68 | pythagorean | `M.pythagorean(a,b)` | Finite non-negative sides; at least one positive; uses `Math.hypot` |
| 69 | circle | `M.circle(radius)` | Finite non-negative radius; diameter, circumference and area must remain finite |
| 70 | triangle-area | `M.triangleArea(base,height)` | Finite non-negative base/height; perpendicular height; area must remain finite |

## Structural checks

- 10/10 source records include metadata, description, input keys/labels, result heading/summary/metrics/breakdown, formula, ordered steps, assumptions, notes, disclaimers, limitations, FAQs, SEO, validation errors, accessibility labels and guide steps/sections.
- Stable input, metric/breakdown, FAQ, error and guide keys are deterministic and source-English-based.
- Six locale slots per tool remain `not-started` with empty fields: **60/60 not started**.
- Formula statements and calculation steps were transcribed from the existing guide map and cross-checked against `math-core.js`.
- No calculation source, default input value, input type, signed-domain metadata, numeric constraint, ID or route was modified.

## Required next gate

1. Independently compare the 10 extracted source records with runtime input definitions and result metrics.
2. Run source-schema, stable-key, formula/step and numeric-constraint checks.
3. Only after those checks pass, create six-locale Draft records (60 total), preserving formula strings, tokens and numeric semantics.
4. Run seven-locale browser/RTL/LTR, accessibility and numerical-parity tests.
5. Keep all locale records in `draft`; no approval, publication, merge or deployment.
