# FinPulse Hub — Project State

- **Last verified:** 2026-11-18
- **Repository:** https://github.com/apex-global-labs/FinPulse-Hub
- **Production branch:** `main`
- **Current commit before blueprint write:** `013efac44d6a11f06960ece00e730a79efd88921` (initial commit)
- **Project stage:** Product blueprint / setup
- **Live website:** Not verified; do not claim deployed
- **GitHub Pages:** Repository metadata reported `has_pages=false` at the initial audit
- **CI:** No workflow runs found at initial audit
- **Pull requests:** None found at initial audit

## Verified initial repository condition

- Repository is public and belongs to `apex-global-labs`.
- Default branch is `main`.
- The initial root contained only `README.md` with the heading `# FinPulse-Hub`.
- No application source code, calculator pages, tests, workflow files or deployment configuration were present in the initial root listing.
- The repository size was reported as 0 KB by GitHub repository metadata during the initial check.
- No existing pull requests or GitHub Actions runs were found during the initial check.

The checks above describe the repository before the blueprint files in this commit are added.

## Approved product direction recorded

- Combine Financial Intelligence Hub and Business & Professional Suite.
- Remove Universal Online Tools / generic utilities completely from this project's scope.
- Focus on useful, high-demand finance calculators.
- Target free-first implementation and GitHub Pages deployment.
- Use the repository name as the product identity: **FinPulse Hub**.
- Keep Forex and cryptocurrency features educational and limited to ordinary conversion/fee arithmetic; no trading, leverage, execution, investment recommendations or exchange/wallet connections.

## Documents

- `docs/PRODUCT_REQUIREMENTS.md`
- `docs/FINANCE_TOOL_MASTER_REGISTRY.md`
- `docs/KEYWORD_RESEARCH.md`
- `docs/TECHNICAL_ARCHITECTURE.md`

## Not yet completed

- Full keyword and competitor audit with dated, country-specific evidence.
- Final approval of the first-build calculator shortlist.
- Formula specifications and independently checked test vectors.
- Website design and implementation.
- Calculator pages and shared calculation engine.
- Unit, browser, accessibility, security and regression tests.
- GitHub Actions CI and deployment workflow.
- GitHub Pages configuration and live URL verification.
- Privacy, disclaimer, about/contact and sitemap/robots pages.

## Next actions

1. Perform a dated keyword/competitor audit for the target countries.
2. Freeze the first-release calculator shortlist based on demand, formula confidence and implementation effort.
3. Write formula specifications and reference test vectors before building each calculator.
4. Implement the shared responsive site shell and calculation core.
5. Add calculator modules in priority order and tests with each module.
6. Add CI, SEO files and launch policy pages.
7. Configure GitHub Pages, deploy, and verify the exact production commit and public URL.
8. Update this file with commit SHAs, test counts, workflow results and deployment evidence.

## Accuracy rule

Do not mark a calculator, test, SEO task or deployment as complete unless the corresponding files, successful test output, workflow run or live-site check has been verified.
