# Shared UI and Dynamic Message String Catalogue

- Audit date: 2026-11-21
- Sources: `app.js` shared renderer (after tool registry), `home-calculator.js`, and `index.html`.
- Extracted occurrences: **2212**.
- Full literal/context records: `MULTILINGUAL_SHARED_UI_STRING_CATALOGUE.json`.

This supplements the 220-tool registry catalogue. It includes shared form/result rendering, validation and error feedback, currency-rate status, history/copy/share controls, guide/FAQ rendering, chart/diagram accessible labels, homepage calculator UI, and HTML text nodes. The extractor preserves exact text and source line/context. HTML text nodes are extracted separately from JS literals.

**Review limitation:** Literal occurrences are not all user-visible at runtime; some are internal values, selectors, markup fragments, or machine tokens. Dynamic text assembled from variables and exceptions whose messages originate in imported/core modules must be traced and parameterized before translation. `protectedParameters` is deliberately blank pending manual identification of typed interpolation values. This is a candidate catalogue, not an approved translation allowlist.
