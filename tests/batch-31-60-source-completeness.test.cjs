const test = require("node:test");
const assert = require("node:assert/strict");
const content = require("../translations/tool-content.json");
const calculationRegistry = require("../data/calculation-registry.json");

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

test("Batch 31-60 has source-backed calculation extraction records for all 30 tools", () => {
  const ids = content.tools.slice(30, 60).map(tool => tool.id);
  const records = calculationRegistry.tools.filter(record => ids.includes(record.toolId));
  assert.equal(records.length, 30);
  for (const record of records) {
    assert.equal(record.status, "extracted", record.toolId + " remains extracted until parity evidence is separately approved");
    assert.ok(record.sourceModule && record.runtimeFunction, record.toolId + " runtime mapping");
    const calculation = record.calculation;
    for (const field of ["inputs", "constraints", "outputs", "units", "assumptions", "sourceReferences"]) {
      assert.ok(Array.isArray(calculation[field]) && calculation[field].length > 0, record.toolId + " " + field);
    }
    for (const field of ["formula", "precision", "rounding"]) {
      assert.ok(typeof calculation[field] === "string" && calculation[field].trim(), record.toolId + " " + field);
    }
    assert.ok(calculation.sourceReferences.some(reference => reference.includes(record.sourceModule)), record.toolId + " source module evidence");
  }
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

test("Batch 31-60 locale inventory preserves the draft-only activation boundary", () => {
  for (const tool of content.tools.slice(30, 60)) {
    assert.deepEqual(Object.keys(tool.locales).sort(), locales.slice().sort(), tool.id + " locale inventory");
    if (["paycheck", "payroll", "overtime", "discount", "exchange-fees", "transfer-compare", "freelance-project", "freelancer-net-income"].includes(tool.id)) {
      assert.equal(tool.sourceTranslationStatus, "draft", tool.id + " translation status");
      for (const locale of locales) {
        assert.equal(tool.locales[locale].status, "draft", tool.id + "/" + locale);
        assert.ok(Object.keys(tool.locales[locale].fields).length >= 9, tool.id + "/" + locale + " translated content groups");
      }
    } else {
      assert.equal(tool.sourceTranslationStatus, "not-started", tool.id + " translation status");
      for (const locale of locales) {
        assert.equal(tool.locales[locale].status, "not-started", tool.id + "/" + locale);
        assert.deepEqual(tool.locales[locale].fields, {}, tool.id + "/" + locale + " fields remain empty");
      }
    }
  }
});

test("Paycheck and Payroll translation drafts preserve stable keys, placeholder tokens and formula source", () => {
  const keys = group => group.map(item => item.key);
  for (const toolId of ["paycheck", "payroll", "overtime", "discount"]) {
   const tool = content.tools.find(item => item.id === toolId);
   const source = tool.source;
   for (const locale of locales) {
    const fields = tool.locales[locale].fields;
    assert.deepEqual(keys(fields.inputs), keys(source.inputs), locale + " input keys");
    assert.deepEqual(keys(fields.results.metrics), keys(source.results.metrics), locale + " metric keys");
    assert.deepEqual(keys(fields.results.breakdown), keys(source.results.breakdown), locale + " breakdown keys");
    assert.deepEqual(keys(fields.faqs), keys(source.faqs), locale + " FAQ keys");
    assert.deepEqual(keys(fields.seo.faq), keys(source.seo.faq), locale + " SEO FAQ keys");
    assert.deepEqual(keys(fields.errors), keys(source.errors), locale + " error keys");
    assert.deepEqual(keys(fields.guide.steps), keys(source.guide.steps), locale + " guide step keys");
    assert.deepEqual(keys(fields.guide.sections), keys(source.guide.sections), locale + " guide section keys");
    assert.deepEqual(keys(fields.accessibility.controlLabels), keys(source.inputs), locale + " accessibility input keys");
    assert.equal(JSON.stringify(fields).split("{field}").length - 1, source.errors.reduce((n, e) => n + e.message.split("{field}").length - 1, 0), toolId + "/" + locale + " placeholder token count");
    assert.equal(tool.locales[locale].status, "draft");
    assert.deepEqual(keys(fields.inputs), keys(source.inputs), toolId + "/" + locale + " input keys");
    assert.deepEqual(keys(fields.results.metrics), keys(source.results.metrics), toolId + "/" + locale + " metric keys");
    assert.deepEqual(keys(fields.results.breakdown), keys(source.results.breakdown), toolId + "/" + locale + " breakdown keys");
    assert.deepEqual(keys(fields.faqs), keys(source.faqs), toolId + "/" + locale + " FAQ keys");
    assert.deepEqual(keys(fields.seo.faq), keys(source.seo.faq), toolId + "/" + locale + " SEO FAQ keys");
    assert.deepEqual(keys(fields.errors), keys(source.errors), toolId + "/" + locale + " error keys");
    assert.deepEqual(keys(fields.guide.steps), keys(source.guide.steps), toolId + "/" + locale + " guide step keys");
    assert.deepEqual(keys(fields.guide.sections), keys(source.guide.sections), toolId + "/" + locale + " guide section keys");
    assert.deepEqual(keys(fields.accessibility.controlLabels), keys(source.inputs), toolId + "/" + locale + " accessibility input keys");
    assert.equal(fields.guide.sections[0].body, source.explanations.formula, toolId + "/" + locale + " exact English formula preserved");
   }
   assert.equal(tool.source.explanations.formula, source.explanations.formula, toolId + " English formula source unchanged");
  }
});

test("Batch 31-60 editorial source cannot redefine executable or numeric runtime data", () => {
  for (const tool of content.tools.slice(30, 60)) {
    assert.equal(typeof tool.id, "string");
    assert.ok(!("formulaCode" in tool.source), tool.id + " editorial source cannot carry executable formula code");
    assert.ok(!("numericDefaults" in tool.source), tool.id + " editorial source cannot carry runtime numeric defaults");
    assert.ok(!("currencyCode" in tool.source), tool.id + " editorial source cannot redefine currency codes");
    assert.ok(!("jurisdictionCode" in tool.source), tool.id + " editorial source cannot redefine jurisdiction IDs");
  }
});
