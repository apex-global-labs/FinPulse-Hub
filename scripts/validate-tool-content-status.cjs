const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const content = JSON.parse(fs.readFileSync(path.join(root, "translations", "tool-content.json"), "utf8"));
const status = JSON.parse(fs.readFileSync(path.join(root, "translations", "tool-content-status.json"), "utf8"));
const expected = {};

for (const tool of content.tools || []) {
  const locales = Object.entries(tool.locales || {})
    .filter(([, record]) => ["approved", "published"].includes(record.status))
    .map(([locale]) => locale)
    .sort();

  if (locales.length) expected[tool.id] = locales;
}

assert.equal(status.schemaVersion, 1, "unsupported tool-content status manifest version");
assert.deepEqual(status.approved, expected, "tool-content-status.json is stale; run npm run sync:tool-content-status");
console.log("Tool-content status manifest is synchronized:", Object.keys(expected).length, "approved tools.");
