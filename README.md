# FinPulse Hub

FinPulse Hub is a free-first, browser-based library with **220 calculators and tools** in production. Batch 11 is merged and deployed from `main`; the final 220-tool release passed main CI, GitHub Pages deployment, full 220-route browser/accessibility checks and production Lighthouse. Calculations run locally in the browser wherever possible; the site is hosted on GitHub Pages.

## Production status

- **Production release:** 220 tools; merge commit `63822f8f43e0e1eb21ca85d0969b7ecb05e52313`; main CI #44511324462, Pages #44511324424 and production Lighthouse #44511405172 all succeeded
- **Batch 10:** PR #41 merged (205 tools) · **Batch 11:** PR #42 merged; final production portfolio 220 tools
- **Inventory:** 45 Finance + 25 Basic Math + 20 Advanced Math & Statistics + 25 Date & Time + 20 Unit & Data Converters + 20 Developer/Text + 5 Developer wrap-up + 12 Education/Study + 3 Home/Construction + 15 Lifestyle/Construction + 15 Health & Wellness Part 1 + 15 Health & Wellness Part 2
- **Production branch:** `main`
- **Latest verified production commit:** `63822f8f43e0e1eb21ca85d0969b7ecb05e52313` (Batch 11 deployed)
- **Website:** https://apex-global-labs.github.io/FinPulse-Hub/
- **Hosting:** GitHub Pages (free static hosting)
- **Stack:** semantic HTML, CSS, vanilla JavaScript, Node.js built-in tests, GitHub Actions
- **Policy:** no required paid backend, database, hosting or API

## Tool families

| Family | Active tools |
|---|---:|
| Financial calculators | 45 |
| Basic mathematics | 25 |
| Advanced mathematics & statistics | 20 |
| Date & time | 25 |
| Unit & data converters | 20 |
| Developer & Text utilities | 20 |
| Education & Study | 12 |
| Home & Construction | 3 |
| Health & Wellness — Batch 10 deployed | 15 |
| Health & Wellness — Batch 11 candidate | 15 |
| **Production total** | **205** |
| **Batch 11 candidate total** | **220** |

## Shared capabilities

- Responsive calculator workspace with live calculations and input validation
- Formula and step-by-step explanation panels
- Relevant charts, diagrams, schedules, tables and breakdowns
- Copy, CSV/JSON export, print, shareable URL state and reset
- Local calculation history with restore, light/dark theme and keyboard shortcuts
- Related tools, embed-code generator and reserved ad-safe slots
- Searchable production directory with 220 unique links
- Accessible labels, semantic tables/diagrams and browser accessibility checks

Features are applied where relevant; no artificial finance charts or amortization schedules are added to unrelated tools.

## Architecture

- `finance-core.js`, `math-core.js`, `advanced-math-core.js`, `date-time-core.js`, `unit-converter-core.js`: conversion logic; `developer-tools.js`: local text and code utilities
- `math-tools.js`, `advanced-math-tools.js`, `date-time-tools.js`, `unit-converter-tools.js`, `developer-tools.js`, `education-lifestyle-tools.js`, `lifestyle-tools.js`, `health-activity-tools.js`, `health-wellness-tools.js`: tool registries and metadata
- `app.js`: finance registry, shared rendering, routing and workspace orchestration
- `smart-ui.js`, tax and asset data modules: shared controls and jurisdiction/selector data
- `tests/`: formula, smoke, API and Playwright browser/regression tests
- `.github/workflows/`: CI, Pages deployment and Lighthouse audits

## Project documents

| Document | Purpose |
|---|---|
| [Project State](docs/PROJECT_STATE.md) | Current production commit, verification evidence and release status |
| [Master Tool Registry](docs/FINANCE_TOOL_MASTER_REGISTRY.md) | Exact production inventory and stable route IDs |
| [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md) | Implemented architecture and test strategy |
| [Implementation Status](docs/IMPLEMENTATION_STATUS.md) | Completed batches and remaining work |
| [Product Requirements](docs/PRODUCT_REQUIREMENTS.md) | Product scope, boundaries and requirements |
| [220-Tool Roadmap](docs/220_TOOL_INVENTORY_AND_ROADMAP.md) | Approved expansion target and remaining roadmap |
| [Keyword Research](docs/KEYWORD_RESEARCH.md) | Finance keyword evidence and SEO research limitations |

## Accuracy and product boundaries

- Financial projections are illustrations based on user-entered assumptions, not guarantees or individualized advice.
- Frankfurter provides published reference exchange rates, not live market quotes or bank/provider transaction rates; manual rate entry remains available.
- Tax and payroll results depend on the displayed jurisdiction, tax year, source data and disclosed exclusions.
- Math and date/time tools reject unsupported or undefined input domains rather than silently returning invalid results.
- No trading execution, signals, brokerage or wallet connectivity is provided.

## Development and release checks

```bash
npm run check
npm test
npm run test:api
npm run test:browser
```

GitHub Actions runs these checks on pull requests and pushes to `main`. A successful Pages workflow is required before a change is described as deployed. Lighthouse runs after successful production deployment and records mobile/desktop reports as an artifact.


## Batch 8 — Education & Everyday Lifestyle Part 1 (PR candidate)

- 20 tools: five Developer wrap-up tools, twelve Education & Study tools, and three Home & Construction estimators.
- Dedicated module: `education-lifestyle-tools.js`.
- Each tool includes a documented formula/rule, five explanation steps, four FAQs, three presets, strict validation and shared export/history/accessibility behavior.
- Markdown preview escapes raw HTML; regex tester uses bounded inputs and conservative pattern rejection; timestamp helper only scales seconds and milliseconds.
- Construction estimators disclose nominal assumptions and are not structural design tools.
- Candidate target: 155 → 175; production count remains 155 until PR approval, merge, main CI and Pages deployment.


## Batch 11 — final 220-tool release candidate

- 15 unique user-entered activity, timing, route-statistics and log-summary tools are added in `health-wellness-tools.js`.
- The activity goal is blank until the user enters their own goal; no recommended target is prefilled. Hydration is a record summary only; no intake target is suggested.
- Interval and breathing pages calculate user-entered timing values only; no live countdown, activity prescription, breath-holding pattern or medical guidance is provided.
- Candidate homepage and sitemap target 220 unique routes. Formula, smoke, regression, API, browser, accessibility and Lighthouse/CLS verification are required before release.


### Batch 10 production verification

- Main CI: [#44504320519](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44504320519) — 261/261 tests, API 1/1 and Browser 11/11 passed.
- GitHub Pages deployment: [#44504320744](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44504320744) — success; deployed artifact contains 205 homepage entries and 205 sitemap URLs.
- Production Lighthouse: [#44504380240](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44504380240) — mobile Performance 83, desktop 100; Accessibility 100, SEO 100; CLS 0.000 mobile / 0.0089 desktop.


## Final Batch 11 production release — 2026-11-19

- PR #42 merged by squash as production commit `63822f8f43e0e1eb21ca85d0969b7ecb05e52313`.
- Candidate Finance CI [#44510604397](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44510604397) and Candidate Lighthouse [#44510604392](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44510604392) both succeeded.
- Main CI [#44511324462](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44511324462) succeeded: syntax checks passed; 275/275 formula, smoke and regression tests; Frankfurter API 1/1; Playwright browser suite 13/13. The final browser audit rendered all 220 unique routes and passed axe WCAG 2.1 A/AA checks.
- GitHub Pages deployment [#44511324424](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44511324424) succeeded. Published artifact `github-pages` (artifact ID `14522372777`) was inspected: it contains 220 sitemap tool URLs, a homepage with the 220-tool counter, and `health-wellness-tools.js`.
- Production Lighthouse [#44511405172](https://github.com/apex-global-labs/FinPulse-Hub/actions/runs/44511405172) succeeded. Mobile: Performance 95, Accessibility 100, Best Practices 96, SEO 100, CLS 0.000, LCP 1,539.8 ms, TBT 253 ms. Desktop: Performance 100, Accessibility 100, Best Practices 96, SEO 100, CLS 0.0094, LCP 384.3 ms, TBT 0 ms.
- Verified portfolio: 220/220 unique tools; homepage counter, registry and canonical sitemap all align. Latest verified production commit: `63822f8f43e0e1eb21ca85d0969b7ecb05e52313`.
