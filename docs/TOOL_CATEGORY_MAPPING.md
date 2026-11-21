# Canonical Tool Category & Subcategory Mapping

**Purpose:** The canonical information architecture for the FinPulse Hub homepage directory and each tool page's same-group related-tools sidebar.

## Source of truth

- Data file: `/tool-category-mapping.json`
- Source inventory: the 220 live tool definitions in the JavaScript registries listed in each tool's `sourceFile`.
- Baseline: `main` commit `bb721760ad8371bcd26d8cfb18d18018aaae44e7` (2026-11-21).
- Every tool retains its existing `id` and display `name`. This mapping does not rename tools, alter formulas, or change routes.

## Data model

- **Category:** The broad directory section, such as Finance & Money or Math & Statistics.
- **Subcategory:** The meaningful list heading within a category, such as Loan Calculators or Mortgage Calculators.
- **Tool:** The exact existing tool ID and display name. Homepage lists should show the display name, never ordinal placeholders such as “Loan Calculator 1–4”.
- **Related tools:** On a tool page, use the current tool's category and subcategory membership to show the remaining tools in that same group. Do not show the current tool as its own related link.

## Inventory verification

- Expected tools: **220**
- Extracted tools: **220**
- Unique tool IDs: **220**
- Duplicate IDs: **0**
- Unassigned category/subcategory: **0**
- Category group references: **220**
- Duplicate group references: **0**

The JSON records both the canonical metadata and the ordered category/subcategory ID lists. The Node test suite verifies count, uniqueness, source-file presence, complete group coverage, and metadata consistency.

## Category design principles

1. Preserve the existing tool ID and visible tool name.
2. Group by the user's actual task and intent, not merely by the file or historical batch that introduced the tool.
3. Separate closely related but distinct intents where useful (for example, Loan Calculators and Mortgage Calculators).
4. Keep a tool in exactly one primary subcategory to avoid duplicate directory entries and ambiguous sidebar membership.
5. Avoid inventing a tool or suggesting that a tool exists when its ID is not in the live registry.
6. Keep user-entered health/activity logs informational; do not imply medical advice, diagnosis, or a prescribed target.

## Change control

When a tool is added, removed, or renamed, update this mapping in the same pull request and adjust the expected inventory assertions deliberately. Do not silently alter the expected count to make a failing test pass.
