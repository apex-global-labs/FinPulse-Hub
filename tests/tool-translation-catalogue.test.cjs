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
 const batchTwoIds=["freelance","margin","affordability","payoff","refinance","personal-loan","student-loan","simple-interest","retirement","401k"];
 for(const tool of content.tools){
  assert.deepEqual(Object.keys(tool.locales).sort(),locales.slice().sort());
  for(const locale of locales){
   if(pilotIds.includes(tool.id)){
    assert.equal(tool.locales[locale].status,"draft",tool.id+":"+locale);
    assert.ok(tool.locales[locale].fields.metadata.description,tool.id+":"+locale+" description");
    assert.deepEqual(tool.locales[locale].fields.inputs.map(input=>input.key),tool.source.inputs.map(input=>input.key),tool.id+":"+locale+" stable input keys");
    assert.ok(tool.locales[locale].fields.inputs.every(input=>input.label && input.label.trim()),tool.id+":"+locale+" input labels");
   }else if(batchTwoIds.includes(tool.id)){
    const fields=tool.locales[locale].fields,source=tool.source;
    assert.equal(tool.locales[locale].status,"draft",tool.id+":"+locale+" draft status");
    assert.equal(tool.sourceTranslationStatus,"draft",tool.id+" source translation draft status");
    assert.ok(fields.metadata.title&&fields.metadata.description,tool.id+":"+locale+" translated metadata");
    assert.deepEqual(fields.inputs.map(input=>input.key),source.inputs.map(input=>input.key),tool.id+":"+locale+" stable input keys");
    assert.ok(fields.inputs.every(input=>typeof input.label==="string"&&input.label.trim()),tool.id+":"+locale+" translated input labels");
    assert.deepEqual(fields.results.metrics.map(item=>item.key),source.results.metrics.map(item=>item.key),tool.id+":"+locale+" stable result metric keys");
    assert.ok(fields.results.metrics.every(item=>typeof item.label==="string"&&item.label.trim()),tool.id+":"+locale+" translated metric labels");
    assert.deepEqual(fields.results.breakdown.map(item=>item.key),source.results.breakdown.map(item=>item.key),tool.id+":"+locale+" stable breakdown keys");
    assert.ok(fields.results.breakdown.every(item=>typeof item.label==="string"&&item.label.trim()),tool.id+":"+locale+" translated breakdown labels");
    assert.deepEqual(fields.accessibility.controlLabels.map(item=>item.key),source.inputs.map(item=>item.key),tool.id+":"+locale+" accessible control keys");
    assert.ok(fields.accessibility.controlLabels.every(item=>typeof item.label==="string"&&item.label.trim()),tool.id+":"+locale+" translated accessible labels");
    assert.deepEqual(fields.errors.map(item=>item.key),source.errors.map(item=>item.key),tool.id+":"+locale+" stable error keys");
    assert.ok(fields.errors.filter(item=>item.message&&item.recoveryHint).length>=3,tool.id+":"+locale+" translated common validation errors");
    assert.deepEqual(fields.faqs.map(item=>item.key),source.faqs.map(item=>item.key),tool.id+":"+locale+" stable FAQ keys");
    assert.ok(fields.faqs.every(item=>item.question===null&&item.answer===null),tool.id+":"+locale+" untranslated FAQs use English fallback");
    assert.ok(fields.explanations.steps.every(item=>item===null),tool.id+":"+locale+" untranslated steps use English fallback");
    assert.deepEqual(fields.seo.faq.map(item=>item.key),source.seo.faq.map(item=>item.key),tool.id+":"+locale+" stable SEO FAQ keys");
    assert.ok(fields.seo.faq.every(item=>item.question===null&&item.answer===null),tool.id+":"+locale+" untranslated SEO FAQs use English fallback");
    if(tool.id==="simple-interest"){
     const basis=fields.inputs.find(item=>item.key==="basis");
     assert.deepEqual(basis.options.map(item=>item.value),["365","360","366"],"simple-interest day-count values remain canonical");
     assert.ok(basis.options.every(item=>typeof item.label==="string"&&item.label.trim()),"simple-interest option labels translated");
    }
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


test("batch-two tools have complete extracted result, formula, FAQ, error, SEO and accessibility source fields",()=>{
 const ids=["freelance","margin","affordability","payoff","refinance","personal-loan","student-loan","simple-interest","retirement","401k"];
 for(const id of ids){
  const tool=content.tools.find(item=>item.id===id);
  const source=tool.source;
  assert.equal(tool.sourceCompletenessStatus,"complete",id+" complete source extraction");
  assert.ok(source.title&&source.category&&source.subcategory&&source.description,id+" source metadata");
  assert.ok(source.results&&source.results.heading&&source.results.summary,id+" result heading/summary");
  assert.ok(source.results.metrics.length>0,id+" result metrics");
  assert.equal(new Set(source.results.metrics.map(item=>item.key)).size,source.results.metrics.length,id+" unique metric keys");
  assert.ok(Array.isArray(source.results.breakdown),id+" breakdown array");
  assert.equal(new Set(source.results.breakdown.map(item=>item.key)).size,source.results.breakdown.length,id+" unique breakdown keys");
  assert.ok(source.explanations.formula&&source.explanations.steps.length>=3,id+" formula and steps");
  assert.ok(source.explanations.assumptions.length>0&&source.explanations.disclaimers.length>0&&source.explanations.limitations.length>0,id+" assumptions and limitations");
  assert.ok(source.faqs.length>=4&&source.faqs.every(f=>f.key&&f.question&&f.answer),id+" complete FAQs");
  assert.ok(source.errors.length>=3&&source.errors.every(e=>e.key&&e.message&&e.recoveryHint),id+" complete validation errors");
  assert.ok(source.seo.title&&source.seo.metaDescription&&source.seo.h1&&source.seo.introduction,id+" SEO source");
  assert.ok(source.accessibility.pageLabel&&source.accessibility.formLabel&&source.accessibility.resultAnnouncement,id+" accessibility source");
  assert.deepEqual(source.accessibility.controlLabels.map(x=>x.key),source.inputs.map(x=>x.key),id+" accessible input keys");
  assert.equal(tool.sourceTranslationStatus,"draft",id+" translation draft started");
  for(const locale of locales){
   assert.equal(tool.locales[locale].status,"draft",id+":"+locale+" draft status");
   const fields=tool.locales[locale].fields;
   assert.ok(fields.metadata.title&&fields.metadata.description,id+":"+locale+" translated metadata");
   assert.equal(fields.inputs.length,source.inputs.length,id+":"+locale+" stable input key count");
   assert.ok(fields.inputs.every((item,index)=>item.key===source.inputs[index].key&&typeof item.label==="string"&&item.label.trim().length>0),id+":"+locale+" untranslated inputs retain English fallback");
   assert.equal(fields.results.metrics.length,source.results.metrics.length,id+":"+locale+" stable result metric keys");
   assert.ok(fields.results.metrics.every((item,index)=>item.key===source.results.metrics[index].key&&typeof item.label==="string"&&item.label.trim().length>0),id+":"+locale+" untranslated result labels retain English fallback");
  }
 }
 const simple=content.tools.find(item=>item.id==="simple-interest").source.inputs.find(input=>input.key==="basis");
 assert.deepEqual(simple.options.map(option=>option.value),["365","360","366"]);
});
