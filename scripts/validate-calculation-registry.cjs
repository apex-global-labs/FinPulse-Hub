#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const catalogue = read("translations/tool-catalogue.json");
const registry = read("data/calculation-registry.json");
const allowed = new Set(registry.statusVocabulary);
const errors = [];
const sourceById = new Map(catalogue.tools.map(tool => [tool.id, tool.sourceFile]));
const seen = new Set();

if (catalogue.tools.length !== 220) errors.push(`catalogue expected 220 tools; got ${catalogue.tools.length}`);
if (registry.tools.length !== 220) errors.push(`registry expected 220 tools; got ${registry.tools.length}`);

for (const item of registry.tools) {
  const id = item.toolId;
  if (!id || seen.has(id)) errors.push(`missing or duplicate registry toolId: ${id}`);
  seen.add(id);
  if (!sourceById.has(id)) errors.push(`${id}: absent from canonical catalogue`);
  if (sourceById.has(id) && item.sourceModule !== sourceById.get(id)) errors.push(`${id}: source module mismatch`);
  if (!allowed.has(item.status)) errors.push(`${id}: invalid status ${item.status}`);
  if (item.status === "module-mapped" && item.runtimeFunction !== null) errors.push(`${id}: module-mapped record must not claim a runtime function`);
  if (["function-mapped", "extracted", "parity-verified", "regression-verified"].includes(item.status) && !item.runtimeFunction) errors.push(`${id}: status requires a runtime function`);
  if (!item.calculation || typeof item.calculation !== "object") errors.push(`${id}: calculation metadata object missing`);
  if (item.calculation && !Array.isArray(item.calculation.dependencies)) errors.push(`${id}: dependencies must be an array (empty is valid)`);
  if (["extracted", "parity-verified", "regression-verified"].includes(item.status)) {
    for (const field of ["inputs", "constraints", "formula", "outputs", "sourceReferences"]) {
      const value = item.calculation?.[field];
      if (value === null || value === undefined || (Array.isArray(value) && value.length === 0)) errors.push(`${id}: ${field} required for ${item.status}`);
    }
  }
}
for (const id of sourceById.keys()) if (!seen.has(id)) errors.push(`${id}: missing from calculation registry`);

const counts = Object.fromEntries([...allowed].map(status => [status, registry.tools.filter(t => t.status === status).length]));
console.log("CALCULATION REGISTRY AUDIT");
console.log(`catalogueTools=${catalogue.tools.length}; registryTools=${registry.tools.length}; uniqueRegistryIds=${seen.size}`);
for (const [status, count] of Object.entries(counts)) console.log(`${status}=${count}`);
if (errors.length) {
  console.error("\nVALIDATION_ERRORS");
  for (const error of errors) console.error("- " + error);
  process.exitCode = 1;
} else {
  console.log("\nVALIDATION: PASS (inventory, source-module parity, unique IDs and evidence status rules)");
}
