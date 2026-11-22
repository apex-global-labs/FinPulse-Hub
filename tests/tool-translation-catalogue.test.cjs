const test=require("node:test");
const assert=require("node:assert/strict");
const catalogue=require("../translations/tool-catalogue.json");
const content=require("../translations/tool-content.json");
const schema=require("../translations/content-schema.json");
const mapping=require("../tool-category-mapping.json");
const locales=["hi","ar","ur","zh-CN","ja","ru"];

test("tool translation inventory covers all 220 canonical IDs exactly once",()=>{
 assert.equal(catalogue.validation.expectedToolCount,220);
 assert.equal(catalogue.tools.length,220);
 assert.equal(new Set(catalogue.tools.map(t=>t.id)).size,220);
 assert.deepEqual(catalogue.tools.map(t=>t.id).sort(),mapping.tools.map(t=>t.id).sort());
});

test("first ten tool titles have terminology review notes and native-review gate",()=>{
 const pilot=catalogue.tools.filter(t=>t.titleReviewStatus==="ai-reviewed-native-review-pending");
 assert.equal(pilot.length,10);
 for(const tool of pilot){
  assert.ok(tool.titleReviewNote && tool.titleReviewNote.length>20);
  for(const locale of locales)assert.ok(tool.title[locale] && tool.title[locale].trim().length>0,tool.id+":"+locale);
 }
});

test("content schema covers all tool page content fields and seven locales",()=>{
 assert.deepEqual(schema.supportedLocales,["en","hi","ar","ur","zh-CN","ja","ru"]);
 for(const group of ["metadata","inputs","actions","results","explanations","errors","faq","guide","seo","accessibility"])assert.ok(schema.fieldGroups[group],group);
 for(const rule of ["stableKeys","preserveTokens","preserveTechnicalValues","htmlPolicy","direction","fallback","approval"])assert.ok(schema.fieldRules[rule],rule);
});

test("every canonical tool has six locale content records with explicit pending state",()=>{
 assert.equal(content.tools.length,220);
 assert.deepEqual(content.tools.map(t=>t.id).sort(),mapping.tools.map(t=>t.id).sort());
 for(const tool of content.tools){
  assert.deepEqual(Object.keys(tool.locales).sort(),locales.slice().sort());
  for(const locale of locales){assert.equal(tool.locales[locale].status,"not-started");assert.deepEqual(tool.locales[locale].fields,{});}
 }
});


test("first ten tools have source descriptions and stable input-label keys extracted",()=>{
 const firstTen=["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings"];
 for(const id of firstTen){
  const tool=content.tools.find(item=>item.id===id);
  assert.ok(tool.source.description && tool.source.description.length>15,id+" description");
  assert.ok(Array.isArray(tool.source.inputs) && tool.source.inputs.length>0,id+" inputs");
  assert.equal(new Set(tool.source.inputs.map(input=>input.key)).size,tool.source.inputs.length,id+" duplicate input key");
 }
});
