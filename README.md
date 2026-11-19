# FinPulse Hub

FinPulse Hub is a free-first, browser-based library targeting **220 calculators and tools**; the current production baseline is 115 and Batch 6 proposes 20 more converters for finance, mathematics, statistics, dates and time. Calculations run locally in the browser wherever possible; the site is hosted on GitHub Pages.

## Production status

- **Production baseline:** 115 tools (main)
- **Batch 6 release candidate:** 135 tools (115 existing + 20 converter tools; awaiting PR checks and merge approval)
- **Inventory:** 45 Finance + 25 Basic Math + 20 Advanced Math & Statistics + 25 Date & Time + 20 Unit & Data Converters (Batch 6 candidate)
- **Production branch:** `main`
- **Runtime release commit:** `da94f90328c80f557a98b08fa889d4c429046348`
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
| **Total** | **115** |

## Shared capabilities

- Responsive calculator workspace with live calculations and input validation
- Formula and step-by-step explanation panels
- Relevant charts, diagrams, schedules, tables and breakdowns
- Copy, CSV/JSON export, print, shareable URL state and reset
- Local calculation history with restore, light/dark theme and keyboard shortcuts
- Related tools, embed-code generator and reserved ad-safe slots
- Searchable directory with 135 unique tool links in the Batch 6 branch (main remains at 115 until merge)
- Accessible labels, semantic tables/diagrams and browser accessibility checks

Features are applied where relevant; no artificial finance charts or amortization schedules are added to unrelated tools.

## Architecture

- `finance-core.js`, `math-core.js`, `advanced-math-core.js`, `date-time-core.js`, `unit-converter-core.js`: calculation logic
- `math-tools.js`, `advanced-math-tools.js`, `date-time-tools.js`, `unit-converter-tools.js`: tool registries and metadata
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
