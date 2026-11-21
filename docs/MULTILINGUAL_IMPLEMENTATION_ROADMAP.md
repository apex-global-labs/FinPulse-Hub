# FinPulse Hub — Seven-Language Multilingual Implementation Roadmap

**Status:** Planning baseline (no production/runtime changes)  
**Baseline branch:** `main`  
**Baseline commit:** `a4983bf8b84e8a2777bbed137ecedb70d74d6011`  
**Target languages:** English (default), Arabic, Hindi, Urdu, Chinese (Simplified), Japanese, Russian  
**Operating constraints:** zero-cost, static hosting, client-side-first, preserve all 220 tools and their calculations, no new runtime dependency unless a measured need is demonstrated.

## 1. Product decision

FinPulse Hub will support seven selectable interface/content languages. English remains the canonical default and fallback. A compact language selector will appear in the top-right header area on desktop and remain accessible in the mobile header/navigation.

The selector will show each language's native name:
- English — English (`en`)
- Arabic — العربية (`ar`, RTL)
- Hindi — हिन्दी (`hi`)
- Urdu — اردو (`ur`, RTL)
- Chinese (Simplified) — 简体中文 (`zh-CN`)
- Japanese — 日本語 (`ja`)
- Russian — Русский (`ru`)

The user's explicit selection will be persisted locally. If no preference exists, the site will load English. Browser language may be offered as a non-blocking suggestion later, but must not silently override the English default or an explicit saved choice.

## 2. Scope (full option A)

The finished system is expected to translate and localize:
- Global navigation, header, footer, homepage calculator labels, status text, buttons, dialogs and accessibility labels.
- Homepage category names, subcategory names, tool names, search/filter empty states and directory content.
- All 220 tool interfaces: headings, field labels, placeholders, help text, validation messages, result labels, tables, chart labels, export/print text and related-tool labels.
- Tool descriptions, instructions, FAQs, methodology/assumptions and relevant educational/SEO guide content.
- Metadata and structured data for each language-specific indexable page, where the page is fully translated and has a valid localized URL.

Calculation formulas, internal tool IDs, input data models, API contracts and canonical English source strings must remain separate from translated presentation strings. Translation must never change calculation logic.

## 3. Localization architecture principles

1. **Stable message keys:** use stable semantic keys, not translated text as identifiers.
2. **English source of truth:** English dictionary is complete and is the fallback for missing keys.
3. **Separate content from logic:** do not translate formulas, numeric values, machine-readable units, internal IDs or API payloads.
4. **Safe rendering:** translated strings must use the existing escaping/sanitization conventions; never inject untrusted translation strings as raw HTML.
5. **No runtime translation service:** do not depend on Google Translate, a paid API, remote translation widget or external backend.
6. **Locale-aware presentation:** use browser-native `Intl.NumberFormat`, `Intl.DateTimeFormat` and `Intl.ListFormat` where appropriate. Keep parsing and internal arithmetic independent of display formatting. Do not silently change currency or measurement units when changing language.
7. **RTL correctness:** Arabic and Urdu need document-level `dir="rtl"`, logical CSS properties, mirrored navigation/layout where appropriate, and explicit LTR isolation for code, formulas, numeric identifiers, URLs and calculator expressions.
8. **Persistence and accessibility:** selector must be keyboard-operable, screen-reader labelled, have visible focus, expose the current selection, and persist the selected locale without requiring an account.
9. **Graceful fallback:** a missing translation must display the English source string and must not break tool rendering.
10. **No machine-translation claims:** translations of financial, tax, health, legal/disclaimer and methodology text require terminology review and QA before being marked complete.

## 4. URL and SEO strategy — decision gate

Do not add `hreflang`, localized canonical tags or localized sitemap entries until distinct language URLs return the correct fully localized content.

Preferred direction for investigation: language-prefixed static routes (for example `/ar/`, `/hi/`, `/ur/`, `/zh-cn/`, `/ja/`, `/ru/`) with localized tool/guide routes generated consistently. The existing site uses GitHub Pages and query-based tool selection; the static SEO prerender work in PR #50 may affect the final routing design. Therefore:
- Inspect and reconcile the static-prerender pilot before choosing route generation.
- Do not ship duplicate pages with only a language label changed.
- Add reciprocal `hreflang` only among equivalent, complete translations, including `en` and `x-default` where valid.
- Keep each localized page's canonical URL self-referential.
- Update sitemap generation and robots references from one source of truth.
- Preserve all current English URLs and existing SEO signals.

## 5. Phased delivery and release gates

### Phase 0 — Baseline and architecture audit
- Reconfirm current `main`, open PRs, workflow state, 220-tool inventory, route model, current SEO/prerender approach and existing test budgets.
- Inventory every user-visible string source and identify dynamic strings in tool definitions/renderers.
- Produce a translation-key coverage registry and identify content that requires specialist terminology review.
- No production changes.

**Exit gate:** approved architecture and complete source-string inventory; no duplicate work against active SEO PRs.

### Phase 1 — Localization foundation
- Add locale registry and English source dictionary.
- Add translation lookup with safe English fallback and deterministic missing-key diagnostics for tests.
- Add locale preference persistence and a keyboard/screen-reader accessible top-right language selector.
- Add document `lang` and direction handling, with RTL-safe CSS foundations.
- Add unit tests for fallback, unknown locales, persistence, escaping, selector keyboard behavior and direction switching.

**Exit gate:** English behavior unchanged; selector works; no calculation or route regressions.

### Phase 2 — Shared interface and homepage
- Translate global shell, navigation, homepage calculator UI, search, categories, subcategories, directory and shared dialogs/status messages.
- Translate all global accessibility labels and responsive/mobile selector behavior.
- Add visual regression checks for LTR and RTL.

**Exit gate:** complete shared UI coverage in all six additional languages; no clipped/overlapping header or homepage content.

### Phase 3 — All 220 tool interfaces
- Translate every tool's visible interface, field/help/validation/result labels, tables, charts, related-tool panel and export/print controls.
- Preserve formulas, input semantics, tool IDs, numeric precision and API behavior.
- Maintain a per-tool/per-locale coverage matrix; no tool may be labelled complete while any visible interface string remains untranslated.

**Exit gate:** 220/220 tools render in all seven locales; existing formula tests unchanged and passing; localized functional smoke coverage.

### Phase 4 — Guides, FAQ and SEO content
- Translate all tool guides, FAQs, methodology, assumptions, disclaimers and metadata.
- Apply expert terminology review to high-impact finance, tax and health content.
- Generate language-specific static routes, canonical/hreflang metadata and sitemap entries only after route parity and translation completeness are proven.

**Exit gate:** every indexed localized page is genuinely localized, crawlable, canonicalized and connected to its equivalent language pages.

### Phase 5 — Release verification
- Run syntax checks, all existing unit/formula tests, API tests, browser tests and 220-tool functional audits.
- Add locale coverage, RTL/LTR, keyboard navigation, accessibility and localized-route tests.
- Run desktop/mobile Lighthouse for homepage and representative tool routes in every locale, including RTL.
- Check performance budgets, CLS, console/network errors, CSP compatibility, sitemap validity, canonical/hreflang reciprocity and GitHub Pages deployment.
- Merge only after all release gates pass; verify the deployed commit and production routes afterward.

## 6. Required acceptance criteria

- Seven languages selectable from the top-right header control.
- English remains the default and fallback; saved user selection persists.
- Arabic and Urdu correctly use RTL without reversing formulas, code, URLs or numeric fields.
- All shared UI and all 220 tool interfaces are translated in all seven locales.
- All guide/FAQ/SEO content included in option A is translated and reviewed.
- No change to calculation formulas, precision, tool IDs or existing tool count.
- No paid service, backend or unnecessary dependency.
- No false `hreflang`/canonical/sitemap claims for incomplete or duplicate localized pages.
- Existing CI, browser, accessibility, functional and Lighthouse budgets remain satisfied.
- Production deployment is not considered complete until GitHub Pages serves the merged commit and locale routes are verified.

## 7. Current baseline observations (2026-11-21)

- Latest `main` commit at audit: `a4983bf8b84e8a2777bbed137ecedb70d74d6011`.
- Repository is a static JavaScript/CSS/HTML GitHub Pages application; `index.html` currently declares `lang="en"` and has a single English canonical URL.
- The homepage and tool directory are currently English-first; tool selection uses query-based routes.
- `package.json` defines syntax, unit/formula, API and browser test scripts; current test coverage includes a full functional audit.
- No dedicated locale dictionary/selector infrastructure was found in the root file inventory at this baseline.
- Active PRs at audit include global SEO roadmap (#58), static SEO prerender pilot (#50), SEO keyword map (#49), above-the-fold guide work (#46) and calculator embed dialog (#45). The final localized route/SEO design must reconcile with these open changes rather than overwrite or duplicate them.
- Main-branch Finance Calculator CI, Lighthouse Performance Audit and GitHub Pages deployment associated with the baseline commit were reported completed successfully by GitHub Actions at the time of this audit.

## 8. Delivery policy

This document is a plan only. It does not authorize direct edits to `main`, merging, or production deployment. Implementation should proceed in small reviewable PRs, with one phase or tightly related sub-phase per PR. Keep the default English experience stable throughout the rollout.


## 9. Phase 0 — architecture reconciliation findings (2026-11-21)

### Existing SEO/prerender work inspected

- **PR #50 — static SEO prerender pilot** changes `app.js`, `index.html`, `styles.css`, `package.json`, adds `scripts/prerender-seo-pilot.cjs` and `seo-prerender-bootstrap.js`, and uploads generated HTML as a CI artifact. It currently targets five English routes: Mortgage, Percentage, Age, Length and Word Counter.
- The pilot generates static HTML by opening the existing app with Playwright, waiting for the tool's client-rendered content/FAQ/JSON-LD, then writing a route snapshot. It preserves the existing `?tool=` runtime route through a bootstrap script, but changes the pilot page's canonical to a `/tools/<slug>/` URL.
- The PR #50 workflow uploads pilot pages for inspection; the inspected change does not yet establish a production Pages deployment of all generated routes or a seven-locale route generator. Do not assume that its generated paths are already live.
- **PR #58 — Global SEO Master Audit** explicitly recommends static generation only after pilot parity, retaining legacy query routes during migration, and not adding `hreflang` until real translated pages exist at separate stable URLs.
- **PR #46** changes tool-page layout/content and its performance audit; **PR #45** changes the calculator embed dialog. Both touch shared application/rendering behavior and must be preserved in route hydration tests.
- PR #50's base commit is older than the current production baseline inspected for this roadmap, so its branch must be rebased/reconciled and its current CI/artifact evidence rechecked before it can become the foundation for localized routes.

### Architecture decision for multilingual work

1. Keep the existing English homepage and all current `?tool=<id>` URLs fully functional and canonical until a separate route migration is proven safe.
2. Do not implement localized canonical tags, `hreflang`, or sitemap entries in the language-selector phase.
3. Treat language selection as a presentation preference initially. The locale dictionary/renderer must be independent of calculation registries and formulas.
4. For indexable localized content, prefer a distinct language-prefixed static route family only after the English static route pilot is accepted—for example `/ar/tools/mortgage-calculator/`, `/hi/tools/mortgage-calculator/`, `/ur/tools/mortgage-calculator/`, `/zh-cn/tools/mortgage-calculator/`, `/ja/tools/mortgage-calculator/`, and `/ru/tools/mortgage-calculator/`. These are proposed patterns, not live routes.
5. A localized route must be generated from the same stable tool ID and source registry as English, with locale-specific visible text, `lang`, `dir`, title, description, canonical and structured data. It must not be a duplicate English page with only the language label changed.
6. Keep formulas, numeric input parsing, internal units, tool IDs, query/share parameters and API payloads locale-neutral. Locale formatting is display-only and must not alter arithmetic or persisted input semantics.
7. Do not duplicate the full 220-tool app into seven unrelated codebases. Use one renderer and locale dictionaries; static generation should emit locale-specific HTML from that shared renderer.
8. Do not silently infer a user's currency, tax jurisdiction, unit system or calculation assumptions from their selected language. Language and jurisdiction are separate preferences.

### Phase 0 exit status

- Static SEO architecture and current PR overlap have been inspected at source/diff level.
- Final route architecture is constrained as above but remains conditional on PR #50's full pilot validation and coordination with PRs #45/#46.
- Complete user-visible string inventory and per-tool dynamic-message coverage have **not yet** been completed; this remains required before Phase 1 implementation.
- No runtime, calculation, SEO metadata, sitemap, production branch or live site was changed by this audit.
