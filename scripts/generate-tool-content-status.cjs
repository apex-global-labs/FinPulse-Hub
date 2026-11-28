const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const sourcePath = path.join(root, "translations", "tool-content.json");
const outputPath = path.join(root, "translations", "tool-content-status.json");
const content = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const approved = {};

for (const tool of content.tools || []) {
  const locales = Object.entries(tool.locales || {})
    .filter(([, record]) => ["approved", "published"].includes(record.status))
    .map(([locale]) => locale)
    .sort();

  if (locales.length) approved[tool.id] = locales;
}

const status = { schemaVersion: 1, approved };
fs.writeFileSync(outputPath, JSON.stringify(status, null, 2) + "\n");
console.log("Updated tool-content status manifest:", Object.keys(approved).length, "tools with approved locale content.");
