# Shared UI and Dynamic Message String Catalogue

- Audit date: 2026-11-21
- Total extracted occurrences: **2,212**.
- Sources: shared `app.js` renderer, `home-calculator.js`, and static `index.html` text nodes.

## Per-source catalogues

| Source | Occurrences | Catalogue |
|---|---:|---|
| Shared `app.js` after tool registry | 1,232 | [shared-app.json](./multilingual-string-catalogue/shared-app.json) |
| Homepage calculator | 171 | [shared-home-calculator.json](./multilingual-string-catalogue/shared-home-calculator.json) |
| Homepage HTML text nodes | 809 | [shared-index-html.json](./multilingual-string-catalogue/shared-index-html.json) |

Each entry records exact text/literal, source file, absolute line, token type, heuristic role, static/dynamic hint, nearby source context, parameter candidates where concatenation is apparent, and manual-review status.

## Review limitations

The extractor captures quoted/template literals and HTML text nodes, not every string generated from runtime variables, imported constants, core-module exceptions, CSS pseudo-content or browser-generated UI. Some captured values are markup, selectors, machine tokens or non-visible implementation strings. The list is a review catalogue, not an approved translation allowlist. Dynamic message parameters need manual typed definitions before translation.
