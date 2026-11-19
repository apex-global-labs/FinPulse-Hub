# FinPulse Hub

A free-first, browser-based finance calculator website combining the former Financial Intelligence Hub and Business & Professional Suite concepts. The generic online-tools division is out of scope.

## Current release status

- Active portfolio: 45 calculators registered in the PR #21 branch.
- Production main: 36 calculators at commit 4cb47e8411dec059f5ec25af5a79b5509df89803 (PR #20).
- PR #21: https://github.com/apex-global-labs/FinPulse-Hub/pull/21 — implementation and initial branch QA passed; additional navigation/sitemap regression assertions are being verified. Merge and production deployment remain pending.
- Website: https://apex-global-labs.github.io/FinPulse-Hub/
- Hosting: GitHub Pages (free static hosting).
- Stack: HTML, CSS and vanilla JavaScript; browser-side calculations; Chart.js with accessible SVG fallback.

## Calculator scope

Loans, mortgages, EMI, amortization, savings, interest, retirement scenarios, tax and payroll estimates, currency conversion, freelance pricing/income, business ROI and break-even, cash flow, rental yield, emergency reserves, net worth and property-related arithmetic.

This is an educational calculator site, not a broker, exchange, wallet, investment advisory or trading platform. Forex and crypto features do not execute trades, provide signals, leverage or position sizing, or issue buy/sell prompts. Crypto asset selectors use hypothetical user-entered baseline values only; they do not provide live prices.

## Project documents

| Document | Purpose |
|---|---|
| Product Requirements (docs/PRODUCT_REQUIREMENTS.md) | Audience, scope, features and release acceptance criteria |
| Production Calculator Registry (docs/FINANCE_TOOL_MASTER_REGISTRY.md) | Exact 45-tool inventory, formula scope and boundaries |
| Keyword Research Plan (docs/KEYWORD_RESEARCH.md) | Search-demand validation and SEO research method |
| Technical Architecture (docs/TECHNICAL_ARCHITECTURE.md) | Free-first architecture, calculation engine, testing and deployment |
| Project State (docs/PROJECT_STATE.md) | Verified current status, commit and next actions |
| Implementation Status (docs/IMPLEMENTATION_STATUS.md) | Completed work, test evidence and remaining QA |

## Operating principles

1. Formula correctness and transparent assumptions come before feature count.
2. Each calculator solves a distinct task; duplicate search-intent pages are avoided.
3. Tax/legal estimates require dated sources and clearly disclosed exclusions.
4. User-entered calculations run locally in the browser wherever possible.
5. No paid API, paid hosting or backend is required for the initial product.
6. Features are called complete or live only after tests and deployment evidence exist.

## Development

The shared architecture provides display-currency selection, synchronized range and numeric inputs, and instant calculations. The final nine calculators include explanatory SEO text and FAQs. sitemap.xml lists 45 calculator routes; the deployment workflow publishes all runtime modules and discovery files.
