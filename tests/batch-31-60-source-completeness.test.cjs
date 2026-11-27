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
    assert.equal(record.status, ["paycheck","payroll","overtime","discount","exchange-fees","transfer-compare","freelance-project","freelancer-net-income","markup","break-even","business-roi","cash-flow","rental-yield","emergency-fund","net-worth","basic-arithmetic","fraction","mixed-number","decimal-fraction","ratio"].includes(record.toolId) ? "regression-verified" : "extracted", record.toolId + " evidence-backed calculation status");
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
    if (tool.id === "business-roi") {
      assert.equal(tool.sourceTranslationStatus, "draft", tool.id + " translation status");
      for (const locale of locales) {
        assert.equal(tool.locales[locale].status, "draft", tool.id + "/" + locale);
        assert.deepEqual(Object.keys(tool.locales[locale].fields).sort(), ["accessibility","actions","errors","explanations","faqs","guide","inputs","metadata","results","seo"].sort(), tool.id + "/" + locale + " complete translation field groups");
      }
    } else if (tool.id === "ratio") {
      assert.equal(tool.sourceTranslationStatus, "draft", tool.id + " translation status");
      for (const locale of locales) {
        assert.equal(tool.locales[locale].status, "draft", tool.id + "/" + locale);
        assert.equal(Object.keys(tool.locales[locale].fields).length, 10, tool.id + "/" + locale + " complete field groups");
      }
    } else if (tool.id === "decimal-fraction") {
      assert.equal(tool.sourceTranslationStatus, "draft", tool.id + " translation status");
      for (const locale of locales) {
        assert.equal(tool.locales[locale].status, "draft", tool.id + "/" + locale);
        assert.equal(Object.keys(tool.locales[locale].fields).length, 10, tool.id + "/" + locale + " complete field groups");
      }
    } else if (tool.id === "mixed-number") {
      assert.equal(tool.sourceTranslationStatus, "draft", tool.id + " translation status");
      for (const locale of locales) {
        assert.equal(tool.locales[locale].status, "draft", tool.id + "/" + locale);
        assert.equal(Object.keys(tool.locales[locale].fields).length, 10, tool.id + "/" + locale + " complete field groups");
      }
    } else if (tool.id === "fraction") {
      assert.equal(tool.sourceTranslationStatus, "draft", tool.id + " translation status");
      for (const locale of locales) {
        assert.equal(tool.locales[locale].status, "draft", tool.id + "/" + locale);
        assert.equal(Object.keys(tool.locales[locale].fields).length, 10, tool.id + "/" + locale + " complete field groups");
      }
    } else if (tool.id === "basic-arithmetic") {
      assert.equal(tool.sourceTranslationStatus, "draft", tool.id + " translation status");
      for (const locale of locales) {
        assert.equal(tool.locales[locale].status, "draft", tool.id + "/" + locale);
        assert.equal(Object.keys(tool.locales[locale].fields).length, 10, tool.id + "/" + locale + " complete field groups");
      }
    } else if (tool.id === "net-worth") {
      assert.equal(tool.sourceTranslationStatus, "draft", tool.id + " translation status");
      for (const locale of locales) {
        assert.equal(tool.locales[locale].status, "draft", tool.id + "/" + locale);
        assert.equal(Object.keys(tool.locales[locale].fields).length, 10, tool.id + "/" + locale + " complete field groups");
      }
    } else if (tool.id === "emergency-fund") {
      assert.equal(tool.sourceTranslationStatus, "draft", tool.id + " translation status");
      for (const locale of locales) {
        assert.equal(tool.locales[locale].status, "draft", tool.id + "/" + locale);
        assert.equal(Object.keys(tool.locales[locale].fields).length, 10, tool.id + "/" + locale + " complete field groups");
      }
    } else if (tool.id === "rental-yield") {
      assert.equal(tool.sourceTranslationStatus, "draft", tool.id + " translation status");
      for (const locale of locales) {
        assert.equal(tool.locales[locale].status, "draft", tool.id + "/" + locale);
        assert.equal(Object.keys(tool.locales[locale].fields).length, 10, tool.id + "/" + locale + " complete field groups");
      }
    } else if (tool.id === "cash-flow") {
      assert.equal(tool.sourceTranslationStatus, "draft", tool.id + " translation status");
      for (const locale of locales) {
        assert.equal(tool.locales[locale].status, "draft", tool.id + "/" + locale);
        assert.equal(Object.keys(tool.locales[locale].fields).length, 10, tool.id + "/" + locale + " complete field groups");
      }
    } else if (["paycheck", "payroll", "overtime", "discount", "exchange-fees", "transfer-compare", "freelance-project", "freelancer-net-income", "markup", "break-even"].includes(tool.id)) {
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


test("Batch 31-40 registry contracts match source input keys, runtime functions and outputs",()=>{
 const Core=require("../finance-core.js");
 const ids=["paycheck","payroll","overtime","discount","exchange-fees","transfer-compare","freelance-project","freelancer-net-income","markup","break-even"];
 const args={
  paycheck:[20,40,5,1.5,100,10,5,20,10],
  payroll:[2,3000,10,100,50],
  overtime:[20,40,5,1.5],
  discount:[100,10,10,10,5],
  "exchange-fees":[1000,1.2,2,1,5],
  "transfer-compare":[1000,1.2,5,1,2,2,1.5,1],
  "freelance-project":[10,50,100,10,20],
  "freelancer-net-income":[1000,200,20],
  markup:[100,25],
  "break-even":[1000,50,20]
 };
 for(const id of ids){
  const tool=content.tools.find(x=>x.id===id);
  const entry=calculationRegistry.tools.find(x=>x.toolId===id);
  const contract=entry.calculation.inputs;
  assert.ok(contract.every(x=>x&&typeof x==="object"&&x.key&&x.type&&Object.hasOwn(x,"defaultValue")),id+" typed input contract and defaults");
  assert.deepEqual(contract.map(x=>x.key),tool.source.inputs.map(x=>x.key),id+" registry/source input key parity");
  assert.deepEqual(contract.map(x=>x.label),tool.source.inputs.map(x=>x.label),id+" registry/source input label parity");
  assert.equal(contract.filter(x=>x.runtimeArgument!==false).length,args[id].length,id+" runtime argument count");
  const fn=entry.runtimeFunction.replace("Core.","");
  assert.equal(typeof Core[fn],"function",id+" runtime function exists");
  const result=Core[fn](...args[id]);
  for(const key of entry.calculation.outputs)assert.ok(Object.hasOwn(result,key),id+" runtime output "+key);
  assert.ok(entry.calculation.constraints.length>0,id+" constraints");
  assert.ok(entry.calculation.formula&&entry.calculation.formula.trim(),id+" formula");
 }
});


test("Business ROI six-locale drafts are field-complete and preserve source contracts",()=>{
 const tool=content.tools.find(x=>x.id==="business-roi"),source=tool.source;
 const keys=(items)=>items.map(x=>x.key);
 const count=(value,token)=>value.split(token).length-1;
 const sourceTokenCount=source.errors.reduce((n,e)=>n+count(e.message,"{field}"),0);
 for(const locale of locales){
  const record=tool.locales[locale],f=record.fields;
  assert.equal(record.status,"draft",locale+" remains inactive draft");
  assert.deepEqual(keys(f.inputs),keys(source.inputs),locale+" input stable keys");
  assert.deepEqual(keys(f.results.metrics),keys(source.results.metrics),locale+" metric stable keys");
  assert.deepEqual(keys(f.results.breakdown),keys(source.results.breakdown),locale+" breakdown stable keys");
  assert.deepEqual(keys(f.errors),keys(source.errors),locale+" error stable keys");
  assert.deepEqual(keys(f.faqs),keys(source.faqs),locale+" FAQ stable keys");
  assert.deepEqual(keys(f.seo.faq),keys(source.seo.faq),locale+" SEO FAQ stable keys");
  assert.deepEqual(keys(f.guide.steps),keys(source.guide.steps),locale+" guide step stable keys");
  assert.deepEqual(keys(f.guide.sections),keys(source.guide.sections),locale+" guide section stable keys");
  assert.deepEqual(keys(f.accessibility.controlLabels),keys(source.inputs),locale+" accessibility control keys");
  assert.equal(count(JSON.stringify(f),"{field}"),sourceTokenCount,locale+" placeholder token parity");
  assert.equal(f.explanations.formulaDescription,source.explanations.formula,locale+" canonical formula unchanged");
  assert.equal(f.guide.sections[0].body,source.explanations.formula,locale+" guide formula unchanged");
  assert.equal(f.results.metrics.length,source.results.metrics.length,locale+" metric count");
  assert.equal(f.results.breakdown.length,source.results.breakdown.length,locale+" breakdown count");
  for(const group of ["metadata","inputs","actions","results","explanations","errors","faqs","guide","seo","accessibility"]){
   const serialized=JSON.stringify(f[group]);
   assert.ok(serialized && serialized!=="{}",locale+" "+group+" populated");
  }
  assert.ok(f.metadata.title&&f.metadata.description&&f.metadata.category&&f.metadata.subcategory,locale+" metadata complete");
  assert.ok(Object.values(f.actions).every(x=>typeof x==="string"&&x.trim()),locale+" action labels complete");
  assert.ok(f.results.heading&&f.results.summary&&f.results.chart.title,locale+" result labels complete");
  for(const group of ["steps","assumptions","notes","disclaimers","limitations"])assert.ok(f.explanations[group].length&&f.explanations[group].every(x=>x.trim()),locale+" explanations "+group);
  assert.ok(f.errors.every(x=>x.message&&x.recoveryHint),locale+" error messages and recovery hints");
  assert.ok(f.faqs.every(x=>x.question&&x.answer),locale+" FAQ text");
  assert.ok(f.seo.title&&f.seo.metaDescription&&f.seo.h1&&f.seo.introduction,locale+" SEO fields");
  assert.ok(f.guide.title&&f.guide.introduction&&f.guide.steps.every(x=>x.title&&x.body)&&f.guide.sections.every(x=>x.heading&&x.body),locale+" guide content");
  assert.ok(f.accessibility.pageLabel&&f.accessibility.formLabel&&f.accessibility.resultAnnouncement&&f.accessibility.chartLabel,locale+" accessibility labels");
 }
 assert.equal(source.explanations.formula,"Gain = ending value − initial investment. Simple ROI (%) = gain ÷ initial investment × 100. Return multiple = ending value ÷ initial investment.");
});


test("Cash Flow Projection six-locale drafts preserve stable keys, formula and numeric constraints",()=>{
 const tool=content.tools.find(x=>x.id==="cash-flow"),source=tool.source;
 const keys=items=>items.map(x=>x.key);
 for(const locale of locales){
  const record=tool.locales[locale],f=record.fields;
  assert.equal(record.status,"draft",locale+" remains inactive draft");
  assert.deepEqual(keys(f.inputs),keys(source.inputs),locale+" input keys");
  assert.deepEqual(keys(f.results.metrics),keys(source.results.metrics),locale+" metric keys");
  assert.deepEqual(keys(f.results.breakdown),keys(source.results.breakdown),locale+" breakdown keys");
  assert.deepEqual(keys(f.errors),keys(source.errors),locale+" error keys");
  assert.deepEqual(keys(f.faqs),keys(source.faqs),locale+" FAQ keys");
  assert.deepEqual(keys(f.seo.faq),keys(source.seo.faq),locale+" SEO FAQ keys");
  assert.deepEqual(keys(f.guide.steps),keys(source.guide.steps),locale+" guide step keys");
  assert.deepEqual(keys(f.guide.sections),keys(source.guide.sections),locale+" guide section keys");
  assert.deepEqual(keys(f.accessibility.controlLabels),keys(source.inputs),locale+" accessibility control keys");
  assert.equal(f.explanations.formulaDescription,source.explanations.formula,locale+" canonical formula unchanged");
  assert.equal(f.guide.sections[0].body,source.explanations.formula,locale+" guide formula unchanged");
  assert.equal(f.inputs.length,6,locale+" input count");
  assert.equal(f.results.metrics.length,5,locale+" metric count");
  assert.equal(f.results.breakdown.length,5,locale+" breakdown count");
  assert.equal(f.errors.length,3,locale+" error count");
  assert.ok(Object.values(f.actions).every(x=>typeof x==="string"&&x.trim()),locale+" action labels");
  assert.ok(f.explanations.steps.length===5&&f.explanations.steps.every(x=>x.trim()),locale+" explanation steps");
  assert.ok(f.guide.steps.every(x=>x.title&&x.body)&&f.guide.sections.every(x=>x.heading&&x.body),locale+" guide fields");
  assert.ok(f.faqs.every(x=>x.question&&x.answer),locale+" FAQ fields");
  assert.ok(f.seo.title&&f.seo.metaDescription&&f.seo.h1&&f.seo.introduction,locale+" SEO fields");
  assert.ok(f.accessibility.pageLabel&&f.accessibility.formLabel&&f.accessibility.resultAnnouncement&&f.accessibility.chartLabel,locale+" accessibility fields");
 }
 assert.equal(source.explanations.formula,"For month t (starting at 1): inflowₜ = monthly inflows × (1 + inflow growth/100)^(t−1); outflowₜ = monthly outflows × (1 + outflow growth/100)^(t−1). Closing cashₜ = opening cashₜ + inflowₜ − outflowₜ; next month's opening cash is the prior closing cash.");
});


test("Rental Yield six-locale drafts preserve source keys, formula and percentage constraint",()=>{
 const tool=content.tools.find(x=>x.id==="rental-yield"),source=tool.source;
 const keys=items=>items.map(x=>x.key);
 for(const locale of locales){
  const record=tool.locales[locale],f=record.fields;
  assert.equal(record.status,"draft",locale+" remains inactive draft");
  assert.deepEqual(keys(f.inputs),keys(source.inputs),locale+" input keys");
  assert.deepEqual(keys(f.results.metrics),keys(source.results.metrics),locale+" metric keys");
  assert.deepEqual(keys(f.results.breakdown),keys(source.results.breakdown),locale+" breakdown keys");
  assert.deepEqual(keys(f.errors),keys(source.errors),locale+" error keys");
  assert.deepEqual(keys(f.faqs),keys(source.faqs),locale+" FAQ keys");
  assert.deepEqual(keys(f.seo.faq),keys(source.seo.faq),locale+" SEO FAQ keys");
  assert.deepEqual(keys(f.guide.steps),keys(source.guide.steps),locale+" guide step keys");
  assert.deepEqual(keys(f.guide.sections),keys(source.guide.sections),locale+" guide section keys");
  assert.deepEqual(keys(f.accessibility.controlLabels),keys(source.inputs),locale+" accessibility control keys");
  assert.equal(f.explanations.formulaDescription,source.explanations.formula,locale+" canonical formula unchanged");
  assert.equal(f.guide.sections[0].body,source.explanations.formula,locale+" guide formula unchanged");
  assert.ok(f.explanations.formulaTitle&&f.explanations.steps.length===5,locale+" formula explanation complete");
  assert.ok(Object.values(f.actions).every(x=>x.trim()),locale+" action labels");
  assert.ok(f.errors.every(x=>x.message&&x.recoveryHint),locale+" error recovery");
  assert.ok(f.faqs.every(x=>x.question&&x.answer),locale+" FAQ text");
  assert.ok(f.guide.steps.every(x=>x.title&&x.body)&&f.guide.sections.every(x=>x.heading&&x.body),locale+" guide text");
 }
 assert.equal(source.inputs.length,4);
 assert.equal(source.results.metrics.length,6);
 assert.equal(source.results.breakdown.length,6);
 assert.ok(source.errors.some(x=>x.key==="vacancy"));
 assert.match(source.errors.find(x=>x.key==="vacancy").message,/100%/);
});


test("Emergency Fund six-locale drafts preserve stable keys, formula and 24-month limit",()=>{
 const tool=content.tools.find(x=>x.id==="emergency-fund"),source=tool.source;
 const keys=items=>items.map(x=>x.key);
 for(const locale of locales){
  const record=tool.locales[locale],f=record.fields;
  assert.equal(record.status,"draft",locale+" remains inactive draft");
  assert.deepEqual(keys(f.inputs),keys(source.inputs),locale+" input keys");
  assert.deepEqual(keys(f.results.metrics),keys(source.results.metrics),locale+" metric keys");
  assert.deepEqual(keys(f.results.breakdown),keys(source.results.breakdown),locale+" breakdown keys");
  assert.deepEqual(keys(f.errors),keys(source.errors),locale+" error keys");
  assert.deepEqual(keys(f.faqs),keys(source.faqs),locale+" FAQ keys");
  assert.deepEqual(keys(f.seo.faq),keys(source.seo.faq),locale+" SEO FAQ keys");
  assert.deepEqual(keys(f.guide.steps),keys(source.guide.steps),locale+" guide step keys");
  assert.deepEqual(keys(f.guide.sections),keys(source.guide.sections),locale+" guide section keys");
  assert.deepEqual(keys(f.accessibility.controlLabels),keys(source.inputs),locale+" accessibility keys");
  assert.equal(f.explanations.formulaDescription,source.explanations.formula,locale+" formula unchanged");
  assert.equal(f.guide.sections[0].body,source.explanations.formula,locale+" guide formula unchanged");
  assert.ok(f.explanations.formulaTitle&&f.explanations.steps.length===5,locale+" explanations complete");
  assert.ok(Object.values(f.actions).every(x=>x.trim()),locale+" action labels");
  assert.ok(f.errors.every(x=>x.message&&x.recoveryHint),locale+" error recovery");
 }
 assert.equal(source.inputs.length,3);
 assert.equal(source.results.metrics.length,4);
 assert.equal(source.results.breakdown.length,6);
 assert.match(source.errors.find(x=>x.key==="months-limit").message,/24/);
});


test("Net Worth six-locale drafts preserve all stable keys and canonical asset-liability formula",()=>{
 const tool=content.tools.find(x=>x.id==="net-worth"),source=tool.source;
 const keys=items=>items.map(x=>x.key);
 for(const locale of locales){
  const record=tool.locales[locale],f=record.fields;
  assert.equal(record.status,"draft",locale+" remains inactive draft");
  assert.deepEqual(keys(f.inputs),keys(source.inputs),locale+" input keys");
  assert.deepEqual(keys(f.results.metrics),keys(source.results.metrics),locale+" metric keys");
  assert.deepEqual(keys(f.results.breakdown),keys(source.results.breakdown),locale+" breakdown keys");
  assert.deepEqual(keys(f.errors),keys(source.errors),locale+" error keys");
  assert.deepEqual(keys(f.faqs),keys(source.faqs),locale+" FAQ keys");
  assert.deepEqual(keys(f.seo.faq),keys(source.seo.faq),locale+" SEO FAQ keys");
  assert.deepEqual(keys(f.guide.steps),keys(source.guide.steps),locale+" guide step keys");
  assert.deepEqual(keys(f.guide.sections),keys(source.guide.sections),locale+" guide section keys");
  assert.deepEqual(keys(f.accessibility.controlLabels),keys(source.inputs),locale+" accessibility control keys");
  assert.equal(f.explanations.formulaDescription,source.explanations.formula,locale+" canonical formula unchanged");
  assert.equal(f.guide.sections[0].body,source.explanations.formula,locale+" guide formula unchanged");
  assert.equal(f.inputs.length,9,locale+" input count");
  assert.equal(f.results.metrics.length,6,locale+" metric count");
  assert.equal(f.results.breakdown.length,12,locale+" breakdown count");
  assert.ok(f.explanations.steps.length===5&&f.explanations.formulaTitle,locale+" explanation fields");
  assert.ok(Object.values(f.actions).every(x=>x.trim()),locale+" action labels");
  assert.ok(f.errors.every(x=>x.message&&x.recoveryHint),locale+" error recovery");
 }
 assert.equal(source.errors.length,2);
 assert.match(source.explanations.formula,/Total assets/);
 assert.match(source.explanations.formula,/Net worth = total assets − total liabilities/);
});


test("Basic Arithmetic six-locale drafts preserve keys, operation contract and zero-division rule",()=>{
 const tool=content.tools.find(x=>x.id==="basic-arithmetic"),source=tool.source;
 const keys=items=>items.map(x=>x.key);
 for(const locale of locales){
  const f=tool.locales[locale].fields;
  assert.equal(tool.locales[locale].status,"draft",locale+" remains inactive draft");
  assert.deepEqual(keys(f.inputs),keys(source.inputs),locale+" input keys");
  assert.deepEqual(keys(f.results.metrics),keys(source.results.metrics),locale+" metric keys");
  assert.deepEqual(keys(f.results.breakdown),keys(source.results.breakdown),locale+" breakdown keys");
  assert.deepEqual(keys(f.errors),keys(source.errors),locale+" error keys");
  assert.deepEqual(keys(f.faqs),keys(source.faqs),locale+" FAQ keys");
  assert.deepEqual(keys(f.guide.steps),keys(source.guide.steps),locale+" guide keys");
  assert.deepEqual(keys(f.accessibility.controlLabels),keys(source.inputs),locale+" accessibility keys");
  assert.equal(f.explanations.formulaDescription,source.explanations.formula,locale+" formula unchanged");
  assert.equal(f.guide.sections[0].body,source.explanations.formula,locale+" guide formula unchanged");
  assert.ok(f.explanations.formulaTitle&&f.explanations.steps.length===5,locale+" explanations");
  assert.ok(Object.values(f.actions).every(x=>x.trim()),locale+" actions");
 }
 assert.equal(source.inputs.length,3);
 assert.equal(source.errors.length,2);
 assert.match(source.explanations.formula,/addition \(\+\).*division \(÷\)/);
 assert.match(source.errors.find(x=>x.key==="zero-divisor").message,/zero/);
});


test("Fraction six-locale drafts preserve stable keys, GCD formula and denominator rules",()=>{
 const tool=content.tools.find(x=>x.id==="fraction"),source=tool.source;
 const keys=items=>items.map(x=>x.key);
 for(const locale of locales){
  const f=tool.locales[locale].fields;
  assert.equal(tool.locales[locale].status,"draft",locale+" remains inactive draft");
  assert.deepEqual(keys(f.inputs),keys(source.inputs),locale+" input keys");
  assert.deepEqual(keys(f.results.metrics),keys(source.results.metrics),locale+" metric keys");
  assert.deepEqual(keys(f.results.breakdown),keys(source.results.breakdown),locale+" breakdown keys");
  assert.deepEqual(keys(f.errors),keys(source.errors),locale+" error keys");
  assert.deepEqual(keys(f.faqs),keys(source.faqs),locale+" FAQ keys");
  assert.deepEqual(keys(f.guide.steps),keys(source.guide.steps),locale+" guide keys");
  assert.deepEqual(keys(f.accessibility.controlLabels),keys(source.inputs),locale+" accessibility keys");
  assert.equal(f.explanations.formulaDescription,source.explanations.formula,locale+" formula unchanged");
  assert.equal(f.guide.sections[0].body,source.explanations.formula,locale+" guide formula unchanged");
  assert.ok(f.explanations.steps.length===5&&f.explanations.formulaTitle,locale+" explanations");
  assert.ok(f.errors.every(x=>x.message&&x.recoveryHint),locale+" errors");
 }
 assert.equal(source.inputs.length,2);
 assert.equal(source.errors.length,3);
 assert.match(source.explanations.formula,/gcd/);
 assert.match(source.explanations.assumptions[0],/safe integers/);
 assert.match(source.explanations.assumptions[1],/zero/);
});


test("Mixed Number six-locale drafts preserve stable keys, signed formula and input ranges",()=>{
 const tool=content.tools.find(x=>x.id==="mixed-number"),source=tool.source;
 const keys=items=>items.map(x=>x.key);
 for(const locale of locales){
  const f=tool.locales[locale].fields;
  assert.equal(tool.locales[locale].status,"draft",locale+" remains inactive draft");
  assert.deepEqual(keys(f.inputs),keys(source.inputs),locale+" input keys");
  assert.deepEqual(keys(f.results.metrics),keys(source.results.metrics),locale+" metric keys");
  assert.deepEqual(keys(f.results.breakdown),keys(source.results.breakdown),locale+" breakdown keys");
  assert.deepEqual(keys(f.errors),keys(source.errors),locale+" error keys");
  assert.deepEqual(keys(f.faqs),keys(source.faqs),locale+" FAQ keys");
  assert.deepEqual(keys(f.guide.steps),keys(source.guide.steps),locale+" guide keys");
  assert.deepEqual(keys(f.accessibility.controlLabels),keys(source.inputs),locale+" accessibility keys");
  assert.equal(f.explanations.formulaDescription,source.explanations.formula,locale+" formula unchanged");
  assert.equal(f.guide.sections[0].body,source.explanations.formula,locale+" guide formula unchanged");
  assert.ok(f.explanations.steps.length===5&&f.explanations.formulaTitle,locale+" explanation fields");
  assert.ok(f.errors.every(x=>x.message&&x.recoveryHint),locale+" error recovery");
 }
 assert.equal(source.inputs.length,3);
 assert.equal(source.errors.length,3);
 assert.match(source.explanations.formula,/negative whole values apply a negative fractional part/);
 assert.match(source.explanations.assumptions[0],/safe integers/);
 assert.match(source.explanations.assumptions[1],/smaller than the denominator/);
});


test("Decimal to Fraction six-locale drafts preserve keys, search formula and denominator cap",()=>{
 const tool=content.tools.find(x=>x.id==="decimal-fraction"),source=tool.source;
 const keys=items=>items.map(x=>x.key);
 for(const locale of locales){
  const f=tool.locales[locale].fields;
  assert.equal(tool.locales[locale].status,"draft",locale+" remains inactive draft");
  assert.deepEqual(keys(f.inputs),keys(source.inputs),locale+" input keys");
  assert.deepEqual(keys(f.results.metrics),keys(source.results.metrics),locale+" metric keys");
  assert.deepEqual(keys(f.results.breakdown),keys(source.results.breakdown),locale+" breakdown keys");
  assert.deepEqual(keys(f.errors),keys(source.errors),locale+" error keys");
  assert.deepEqual(keys(f.faqs),keys(source.faqs),locale+" FAQ keys");
  assert.deepEqual(keys(f.guide.steps),keys(source.guide.steps),locale+" guide keys");
  assert.deepEqual(keys(f.accessibility.controlLabels),keys(source.inputs),locale+" accessibility keys");
  assert.equal(f.explanations.formulaDescription,source.explanations.formula,locale+" formula unchanged");
  assert.equal(f.guide.sections[0].body,source.explanations.formula,locale+" guide formula unchanged");
  assert.ok(f.explanations.formulaTitle&&f.explanations.steps.length===5,locale+" explanations");
  assert.ok(f.errors.every(x=>x.message&&x.recoveryHint),locale+" error recovery");
 }
 assert.equal(source.inputs.length,2);
 assert.equal(source.errors.length,2);
 assert.match(source.explanations.formula,/maxDen/);
 assert.match(source.explanations.formula,/Math\.round|round\(/);
 assert.match(source.explanations.assumptions[0],/1,000,000/);
});


test("Ratio six-locale drafts preserve stable keys, GCD formula and zero-zero rejection",()=>{
 const tool=content.tools.find(x=>x.id==="ratio"),source=tool.source;
 const keys=items=>items.map(x=>x.key);
 for(const locale of locales){
  const f=tool.locales[locale].fields;
  assert.equal(tool.locales[locale].status,"draft",locale+" remains inactive draft");
  assert.deepEqual(keys(f.inputs),keys(source.inputs),locale+" input keys");
  assert.deepEqual(keys(f.results.metrics),keys(source.results.metrics),locale+" metric keys");
  assert.deepEqual(keys(f.results.breakdown),keys(source.results.breakdown),locale+" breakdown keys");
  assert.deepEqual(keys(f.errors),keys(source.errors),locale+" error keys");
  assert.deepEqual(keys(f.faqs),keys(source.faqs),locale+" FAQ keys");
  assert.deepEqual(keys(f.guide.steps),keys(source.guide.steps),locale+" guide keys");
  assert.deepEqual(keys(f.accessibility.controlLabels),keys(source.inputs),locale+" accessibility keys");
  assert.equal(f.explanations.formulaDescription,source.explanations.formula,locale+" formula unchanged");
  assert.equal(f.guide.sections[0].body,source.explanations.formula,locale+" guide formula unchanged");
  assert.equal(f.guide.steps.length,4,locale+" source guide step count");
  assert.ok(f.explanations.formulaTitle&&f.explanations.steps.length===4,locale+" explanation fields");
  assert.ok(f.errors.every(x=>x.message&&x.recoveryHint),locale+" error recovery");
 }
 assert.equal(source.inputs.length,2);
 assert.equal(source.errors.length,3);
 assert.match(source.explanations.formula,/gcd\(A,B\)/);
 assert.match(source.errors.find(x=>x.key==="zero-ratio").message,/non-zero/);
});


test("Batch 41-50 six-locale records are field-complete and preserve source contracts",()=>{
 const ids=["business-roi","cash-flow","rental-yield","emergency-fund","net-worth","basic-arithmetic","fraction","mixed-number","decimal-fraction","ratio"];
 const requiredStrings=[
  "metadata.title","metadata.description","metadata.category","metadata.subcategory",
  "actions.calculate","actions.recalculate","actions.clear","actions.reset","actions.copy","actions.download","actions.print",
  "results.heading","results.summary","results.chart.title",
  "explanations.formulaTitle","explanations.formulaDescription",
  "guide.title","guide.introduction",
  "seo.title","seo.metaDescription","seo.h1","seo.introduction",
  "accessibility.pageLabel","accessibility.formLabel","accessibility.resultAnnouncement","accessibility.chartLabel"
 ];
 const get=(value,path)=>path.split(".").reduce((v,key)=>v?.[key],value);
 const nonempty=(value)=>typeof value==="string"&&value.trim().length>0;
 const keyedGroups=[
  ["inputs","inputs","label"],["results.metrics","results.metrics","label"],
  ["results.breakdown","results.breakdown","label"],["errors","errors","message"],
  ["faqs","faqs","question"],["seo.faq","seo.faq","question"],
  ["guide.steps","guide.steps","title"],["guide.sections","guide.sections","heading"],
  ["accessibility.controlLabels","inputs","label"]
 ];
 for(const id of ids){
  const tool=content.tools.find(x=>x.id===id),source=tool.source;
  assert.ok(tool,id+" source record exists");
  for(const locale of locales){
   const record=tool.locales[locale],fields=record.fields,label=id+"/"+locale;
   assert.equal(record.status,"draft",label+" remains inactive draft");
   for(const path of requiredStrings)assert.ok(nonempty(get(fields,path)),label+" "+path);
   for(const [targetPath,sourcePath,property] of keyedGroups){
    const target=get(fields,targetPath),sourceItems=get(source,sourcePath);
    assert.ok(Array.isArray(target)&&Array.isArray(sourceItems),label+" "+targetPath+" arrays");
    assert.equal(target.length,sourceItems.length,label+" "+targetPath+" count");
    target.forEach((item,index)=>{
     assert.ok(nonempty(item[property]),label+" "+targetPath+"["+index+"]."+property);
     if(sourceItems[index].key)assert.equal(item.key,sourceItems[index].key,label+" "+targetPath+" stable key "+index);
     if(targetPath==="errors")assert.ok(nonempty(item.recoveryHint),label+" error recovery "+index);
     if(targetPath==="faqs"||targetPath==="seo.faq")assert.ok(nonempty(item.answer),label+" FAQ answer "+index);
     if(targetPath==="guide.steps")assert.ok(nonempty(item.body),label+" guide step body "+index);
     if(targetPath==="guide.sections")assert.ok(nonempty(item.body),label+" guide section body "+index);
    });
   }
   for(const key of ["steps","assumptions","notes","disclaimers","limitations"]){
    const target=fields.explanations[key],sourceItems=source.explanations[key];
    assert.ok(Array.isArray(target)&&Array.isArray(sourceItems),label+" explanations."+key+" arrays");
    assert.equal(target.length,sourceItems.length,label+" explanations."+key+" count");
    target.forEach((item,index)=>assert.ok(nonempty(item),label+" explanations."+key+"["+index+"]"));
   }
   assert.equal(fields.explanations.formulaDescription,source.explanations.formula,label+" protected formula");
   assert.equal(fields.guide.sections[0].body,source.explanations.formula,label+" guide formula");
   const tokenCount=value=>(JSON.stringify(value).match(/\\{field\\}/g)||[]).length;
   assert.equal(tokenCount(fields),tokenCount(source.errors),label+" protected {field} token count");
  }
 }
});
