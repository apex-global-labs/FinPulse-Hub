#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const content = JSON.parse(fs.readFileSync(path.join(root, "translations/tool-content.json"), "utf8"));
const catalogue = JSON.parse(fs.readFileSync(path.join(root, "translations/tool-catalogue.json"), "utf8"));
const schema = JSON.parse(fs.readFileSync(path.join(root, "translations/content-schema.json"), "utf8"));

const sourceLocale = "en";\nconst locales = schema.supportedLocales.filter(locale => locale !== sourceLocale);
const allowedStatuses = new Set(schema.statuses);
const errors = [];
const rows = [];
const ids = new Set();

if (!Array.isArray(content.tools)) errors.push("tool-content.json: tools must be an array");
if (!Array.isArray(catalogue.tools)) errors.push("tool-catalogue.json: tools must be an array");
if (content.tools.length !== 220) errors.push(`content tool count: expected 220, got ${content.tools.length}`);
if (catalogue.tools.length !== 220) errors.push(`catalogue tool count: expected 220, got ${catalogue.tools.length}`);

const catalogueIds = new Set(catalogue.tools.map(tool => tool.id));
const counts = Object.fromEntries(locales.map(locale => [locale, Object.fromEntries([...allowedStatuses].map(status => [status, 0]))]));
let totalRecords = 0;
let nonEmptyDraftRecords = 0;

for (const [index, tool] of content.tools.entries()) {
  const label = tool.id || `index:${index}`;
  if (!tool.id || ids.has(tool.id)) errors.push(`${label}: missing or duplicate tool ID`);
  ids.add(tool.id);
  if (!catalogueIds.has(tool.id)) errors.push(`${label}: missing from canonical catalogue`);

  const localeKeys = Object.keys(tool.locales || {}).sort();
  if (JSON.stringify(localeKeys) !== JSON.stringify([...locales].sort())) {
    errors.push(`${label}: locale keys do not match schema locales`);
  }

  for (const locale of locales) {
    totalRecords++;
    const record = tool.locales?.[locale];
    if (!record) {
      errors.push(`${label}/${locale}: locale record missing`);
      continue;
    }
    if (!allowedStatuses.has(record.status)) {
      errors.push(`${label}/${locale}: invalid status ${String(record.status)}`);
      continue;
    }
    counts[locale][record.status]++;
    if (record.status === "draft" && record.fields && Object.keys(record.fields).length) nonEmptyDraftRecords++;
    if (record.status === "not-started" && record.fields && Object.keys(record.fields).length) {
      errors.push(`${label}/${locale}: not-started record contains fields`);
    }
    if (record.status === "published" && record.fields && !Object.keys(record.fields).length) {
      errors.push(`${label}/${locale}: published record has no fields`);
    }
  }
}

for (const id of catalogueIds) if (!ids.has(id)) errors.push(`catalogue tool ${id}: missing from tool-content.json`);

const rowsOut = ["toolId," + locales.join(",")];
for (const tool of content.tools) {
  rowsOut.push([tool.id, ...locales.map(locale => tool.locales?.[locale]?.status || "MISSING")].join(","));
}

console.log("TRANSLATION STATUS MATRIX");
console.log(`tools=${content.tools.length}; locales=${locales.length}; localeRecords=${totalRecords}; nonEmptyDraftRecords=${nonEmptyDraftRecords}`);
console.log("locale,status," + "count");
for (const locale of locales) for (const status of allowedStatuses) console.log(`${locale},${status},${counts[locale][status]}`);
console.log("\nCSV_MATRIX");
console.log(rowsOut.join("\n"));

if (errors.length) {
  console.error("\nVALIDATION_ERRORS");
  for (const error of errors) console.error("- " + error);
  process.exitCode = 1;
} else {
  console.log("\nVALIDATION: PASS (inventory, locale slots and status vocabulary)");
}
