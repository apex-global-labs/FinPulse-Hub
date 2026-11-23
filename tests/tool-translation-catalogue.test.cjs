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

test("first ten tool titles have terminology notes and optional human feedback policy",()=>{
 const pilot=catalogue.tools.filter(t=>t.titleReviewStatus==="ai-reviewed-optional-feedback");
 assert.equal(pilot.length,10);
 assert.match(catalogue.reviewPolicy,/optional and non-blocking/);
 assert.doesNotMatch(catalogue.reviewPolicy,/required before publication/i);
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

test("every canonical tool has six locale records with correct draft or pending state",()=>{
 assert.equal(content.tools.length,220);
 assert.deepEqual(content.tools.map(t=>t.id).sort(),mapping.tools.map(t=>t.id).sort());
 const pilotIds=["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings"];
 for(const tool of content.tools){
  assert.deepEqual(Object.keys(tool.locales).sort(),locales.slice().sort());
  for(const locale of locales){
   if(pilotIds.includes(tool.id)){
    assert.equal(tool.locales[locale].status,"draft",tool.id+":"+locale);
    assert.ok(tool.locales[locale].fields.metadata.description,tool.id+":"+locale+" description");
    assert.deepEqual(tool.locales[locale].fields.inputs.map(input=>input.key),tool.source.inputs.map(input=>input.key),tool.id+":"+locale+" stable input keys");
    assert.ok(tool.locales[locale].fields.inputs.every(input=>input.label && input.label.trim()),tool.id+":"+locale+" input labels");
   }else{
    assert.equal(tool.locales[locale].status,"not-started",tool.id+":"+locale);
    assert.deepEqual(tool.locales[locale].fields,{});
   }
  }
 }
});


test("first twenty tools have source descriptions and stable input-label keys extracted",()=>{
 const firstTwenty=["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings","freelance","margin","affordability","payoff","refinance","personal-loan","student-loan","simple-interest","retirement","401k"];
 for(const id of firstTwenty){
  const tool=content.tools.find(item=>item.id===id);
  assert.ok(tool.source.description && tool.source.description.length>15,id+" description");
  assert.ok(Array.isArray(tool.source.inputs) && tool.source.inputs.length>0,id+" inputs");
  assert.equal(new Set(tool.source.inputs.map(input=>input.key)).size,tool.source.inputs.length,id+" duplicate input key");
  assert.equal(tool.sourceExtractionStatus,"source-title-description-inputs-extracted",id+" extraction status");
 }
});

test("first ten descriptions and all input labels are drafted in all six target locales",()=>{
 const firstTen=["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings"];
 for(const id of firstTen){
  const tool=content.tools.find(item=>item.id===id);
  for(const locale of locales){
   const translated=tool.locales[locale].fields;
   assert.ok(translated.metadata.description.length>5,id+":"+locale+" description");
   assert.deepEqual(translated.inputs.map(input=>input.key),tool.source.inputs.map(input=>input.key),id+":"+locale+" input key order");
   assert.equal(translated.inputs.length,tool.source.inputs.length,id+":"+locale+" input count");
  }
 }
});
test("first ten results and metrics are translated with stable source metric keys",()=>{
 const ids=["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings"];
 for(const id of ids){
  const tool=content.tools.find(item=>item.id===id);
  assert.ok(tool.source.results && tool.source.results.metrics.length>0,id+" source result metrics");
  for(const locale of locales){
   const result=tool.locales[locale].fields.results;
   assert.ok(result.heading && result.summary,id+":"+locale+" result heading/summary");
   assert.deepEqual(result.metrics.map(item=>item.key),tool.source.results.metrics.map(item=>item.key),id+":"+locale+" metric keys");
   assert.deepEqual(result.breakdown.map(item=>item.key),tool.source.results.breakdown.map(item=>item.key),id+":"+locale+" breakdown keys");
   assert.ok(result.metrics.every(item=>item.label && item.label.trim()),id+":"+locale+" metric labels");
   assert.ok(result.breakdown.every(item=>item.label && item.label.trim()),id+":"+locale+" breakdown labels");
  }
 }
});

test("first ten FAQ, formula, disclaimer, error, SEO and accessibility fields cover all locales",()=>{
 const ids=["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings"];
 for(const id of ids){
  const tool=content.tools.find(item=>item.id===id);
  assert.ok(tool.source.explanations.formula && tool.source.explanations.steps.length>0,id+" source formula");
  assert.ok(tool.source.faqs.length>=4,id+" source FAQ");
  for(const locale of locales){
   const fields=tool.locales[locale].fields;
   assert.ok(fields.explanations.formulaTitle && fields.explanations.formulaDescription,id+":"+locale+" formula explanation");
   assert.ok(fields.explanations.disclaimers.length>0,id+":"+locale+" disclaimer");
   assert.equal(fields.faqs.length,4,id+":"+locale+" FAQ count");
   assert.ok(fields.faqs.every(f=>f.key&&f.question&&f.answer),id+":"+locale+" FAQ content");
   assert.ok(fields.errors.length===tool.source.errors.length,id+":"+locale+" validation errors");
   assert.ok(fields.seo.title&&fields.seo.metaDescription&&fields.seo.h1&&fields.seo.introduction,id+":"+locale+" SEO");
   assert.ok(fields.accessibility.pageLabel&&fields.accessibility.formLabel&&fields.accessibility.resultAnnouncement,id+":"+locale+" accessibility");
   assert.deepEqual(fields.accessibility.controlLabels.map(x=>x.key),tool.source.inputs.map(x=>x.key),id+":"+locale+" accessible input keys");
  }
 }
});


test("all first-ten calculation steps are localized with source-aligned counts in all six locales",()=>{
 const ids=["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings"];
 for(const id of ids){
  const tool=content.tools.find(item=>item.id===id);
  assert.ok(tool.source.explanations.steps.length>0,id+" source steps");
  for(const locale of locales){
   const steps=tool.locales[locale].fields.explanations.steps;
   assert.equal(steps.length,tool.source.explanations.steps.length,id+":"+locale+" step count");
   assert.ok(steps.every(step=>typeof step==="string"&&step.trim().length>0),id+":"+locale+" non-empty steps");
  }
 }
});

test("first-ten translated content has no cross-locale script contamination",()=>{
 const forbidden={
  hi:[/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/u,/[\u4E00-\u9FFF]/u,/[\u0400-\u04FF]/u],
  ar:[/[\u0900-\u097F]/u,/[\u4E00-\u9FFF]/u,/[\u0400-\u04FF]/u],
  ur:[/[\u0900-\u097F]/u,/[\u4E00-\u9FFF]/u,/[\u0400-\u04FF]/u],
  "zh-CN":[/[\u0900-\u097F]/u,/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/u,/[\u0400-\u04FF]/u,/[\u3040-\u30FF]/u],
  ja:[/[\u0900-\u097F]/u,/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/u,/[\u0400-\u04FF]/u],
  ru:[/[\u0900-\u097F]/u,/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/u,/[\u4E00-\u9FFF]/u,/[\u3040-\u30FF]/u]
 };
 function visit(value,path,checks,tool,locale){
  if(path.endsWith(".key"))return;
  if(typeof value==="string"){for(const pattern of checks)assert.doesNotMatch(value,pattern,tool+":"+locale+":"+path)}
  else if(Array.isArray(value))value.forEach((item,index)=>visit(item,path+"["+index+"]",checks,tool,locale));
  else if(value&&typeof value==="object")Object.entries(value).forEach(([key,item])=>visit(item,path+"."+key,checks,tool,locale));
 }
 for(const id of ["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings"]){
  const tool=content.tools.find(item=>item.id===id);
  for(const [locale,checks] of Object.entries(forbidden))visit(tool.locales[locale].fields,"fields",checks,id,locale);
  for(const locale of locales){
   const result=tool.locales[locale].fields.results;
   assert.notEqual(result.summary,tool.source.results.summary,id+":"+locale+" result summary must be localized");
   for(let i=0;i<result.metrics.length;i++)assert.notEqual(result.metrics[i].label,tool.source.results.metrics[i].label,id+":"+locale+" metric label "+i+" must be localized");
  }
 }
});
