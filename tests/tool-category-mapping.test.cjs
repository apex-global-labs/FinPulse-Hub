const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const mapping = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "tool-category-mapping.json"), "utf8"));

test("canonical tool mapping contains exactly 220 unique live tools", () => {
  assert.equal(mapping.validation.expectedToolCount, 220);
  assert.equal(mapping.tools.length, 220);
  assert.equal(new Set(mapping.tools.map((tool) => tool.id)).size, 220);
  assert.equal(mapping.validation.unassignedToolCount, 0);
  for (const tool of mapping.tools) {
    assert.ok(tool.id && tool.name && tool.category && tool.subcategory && tool.sourceFile);
    assert.ok(fs.existsSync(path.join(__dirname, "..", tool.sourceFile)), `Missing source file for ${tool.id}`);
  }
});

test("category groups reference every tool exactly once and match canonical metadata", () => {
  const grouped = mapping.categories.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.toolIds.map((id) => ({
        id,
        category: category.name,
        subcategory: subcategory.name
      }))
    )
  );
  assert.equal(grouped.length, 220);
  assert.equal(new Set(grouped.map((tool) => tool.id)).size, 220);

  const canonicalById = new Map(mapping.tools.map((tool) => [tool.id, tool]));
  for (const item of grouped) {
    const canonical = canonicalById.get(item.id);
    assert.ok(canonical, `Unknown tool ID in group: ${item.id}`);
    assert.equal(item.category, canonical.category, `Category mismatch: ${item.id}`);
    assert.equal(item.subcategory, canonical.subcategory, `Subcategory mismatch: ${item.id}`);
  }
});

test("category and subcategory names are unique and non-empty", () => {
  const categoryNames = mapping.categories.map((category) => category.name);
  assert.equal(new Set(categoryNames).size, categoryNames.length);
  for (const category of mapping.categories) {
    assert.ok(category.name.trim());
    const names = category.subcategories.map((subcategory) => subcategory.name);
    assert.equal(new Set(names).size, names.length);
    for (const subcategory of category.subcategories) {
      assert.ok(subcategory.name.trim());
      assert.ok(subcategory.toolIds.length > 0);
    }
  }
});
