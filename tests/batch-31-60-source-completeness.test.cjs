const test = require("node:test");
const assert = require("node:assert/strict");
const content = require("../translations/tool-content.json");

const expectedIds = [
  "paycheck", "payroll", "overtime", "discount", "exchange-fees",
  "transfer-compare", "freelance-project", "freelancer-net-income",
  "markup", "break-even", "business-roi", "cash-flow", "rental-yield",
  "emergency-fund", "net-worth", "basic-arithmetic", "fraction",
  "mixed-number", "decimal-fraction", "ratio", "proportion", "average",
  "percentage-change", "percent-error", "rounding", "significant-figures",
  "scientific-notation", "exponent", "square-root", "cube-root"
];
const locales = ["hi", "ar", "ur", "zh-CN", "ja", "ru"];

test("Batch 31-60 contains the exact 30 canonical tools in catalogue order", () => {
  assert.equal(content.tools.length, 220);
  assert.deepEqual(content.tools.slice(30, 60).map(tool => tool.id), expectedIds);
  assert.equal(new Set(expectedIds).size, 30);
});

test("Batch 31-60 source records include every required editorial content group", () => {
  for (const tool of content.tools.slice(30, 60)) {
    const source = tool.source;
    assert.equal(tool.sourceExtractionStatus, "source-record-complete", tool.id);
    assert.equal(tool.sourceCompletenessStatus, "complete", tool.id);
    assert.ok(source.title && source.category && source.subcategory && source.file, tool.id + " metadata");
    assert.ok(source.description && source.description.trim(), tool.id + " description");
    assert.ok(Array.isArray(source.inputs) && source.inputs.length > 0, tool.id + " inputs");
    assert.equal(new Set(source.inputs.map(item => item.key)).size, source.inputs.length, tool.id + " unique input keys");
    assert.ok(source.inputs.every(item => item.key && item.label && item.label.trim()), tool.id + " input labels");
    assert.ok(source.results?.heading && source.results.summary, tool.id + " result heading and summary");
    assert.ok(source.results.metrics.length > 0, tool.id + " result metrics");
    assert.equal(new Set(source.results.metrics.map(item => item.key)).size, source.results.metrics.length, tool.id + " metric keys");
    assert.ok(source.results.breakdown.length > 0, tool.id + " result breakdown");
    assert.equal(new Set(source.results.breakdown.map(item => item.key)).size, source.results.breakdown.length, tool.id + " breakdown keys");
    assert.ok(source.explanations?.formula?.trim(), tool.id + " formula explanation");
    for (const group of ["steps", "assumptions", "notes", "disclaimers", "limitations"]) {
      assert.ok(Array.isArray(source.explanations[group]) && source.explanations[group].length > 0, tool.id + " " + group);
      assert.ok(source.explanations[group].every(value => typeof value === "string" && value.trim()), tool.id + " non-empty " + group);
    }
    assert.ok(source.faqs.length >= 2 && source.faqs.every(item => item.key && item.question && item.answer), tool.id + " FAQ");
    assert.ok(source.seo?.title && source.seo.metaDescription && source.seo.h1 && source.seo.introduction, tool.id + " SEO");
    assert.deepEqual(source.seo.faq.map(item => item.key), source.faqs.map(item => item.key), tool.id + " SEO FAQ key parity");
    assert.ok(source.errors.length > 0 && source.errors.every(item => item.key && item.message && item.recoveryHint), tool.id + " error recovery");
    assert.ok(source.accessibility?.pageLabel && source.accessibility.formLabel && source.accessibility.resultAnnouncement && source.accessibility.chartLabel, tool.id + " accessibility");
    assert.deepEqual(source.accessibility.controlLabels.map(item => item.key), source.inputs.map(item => item.key), tool.id + " accessible input keys");
    assert.ok(source.guide?.title && source.guide.introduction && source.guide.steps.length && source.guide.sections.length, tool.id + " guide");
    assert.ok(source.guide.steps.every(item => item.key && item.title && item.body), tool.id + " guide step keys");
    assert.ok(source.guide.sections.every(item => item.key && item.heading && item.body), tool.id + " guide section keys");
  }
});

test("Batch 31-60 keeps all six locale records as unactivated empty drafts", () => {
  for (const tool of content.tools.slice(30, 60)) {
    assert.deepEqual(Object.keys(tool.locales).sort(), locales.slice().sort(), tool.id + " locale inventory");
    assert.equal(tool.sourceTranslationStatus, "not-started", tool.id + " translation status");
    for (const locale of locales) {
      assert.equal(tool.locales[locale].status, "not-started", tool.id + "/" + locale);
      assert.deepEqual(tool.locales[locale].fields, {}, tool.id + "/" + locale + " fields remain empty");
    }
  }
});

test("Batch 31-60 source records do not redefine stable tool IDs or numeric runtime data", () => {
  for (const tool of content.tools.slice(30, 60)) {
    assert.equal(typeof tool.id, "string");
    assert.ok(!("formulaCode" in tool.source), tool.id + " editorial source cannot carry executable formula code");
    assert.ok(!("numericDefaults" in tool.source), tool.id + " editorial source cannot carry runtime numeric defaults");
    assert.ok(!("currencyCode" in tool.source), tool.id + " editorial source cannot redefine currency codes");
    assert.ok(!("jurisdictionCode" in tool.source), tool.id + " editorial source cannot redefine jurisdiction IDs");
  }
});
