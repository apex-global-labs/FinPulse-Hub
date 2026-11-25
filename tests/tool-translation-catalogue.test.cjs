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
 const batchThreeDraftIds=["ira","inflation","cd","apy","paycheck"];
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
    assert.ok(fields.accessibility.chartLabel&&fields.accessibility.chartLabel.trim(),tool.id+":"+locale+" translated chart accessibility label");
    assert.ok(fields.guide.title&&fields.guide.introduction&&fields.guide.steps.length>0&&fields.guide.sections.length>0,tool.id+":"+locale+" translated guide content");
    assert.ok(fields.guide.steps.every(item=>item.key&&item.title&&item.body),tool.id+":"+locale+" guide step keys and text");
    assert.ok(fields.guide.sections.every(item=>item.key&&item.heading&&item.body),tool.id+":"+locale+" guide section keys and text");
    assert.ok(fields.explanations.assumptions.every(item=>item&&item.trim())&&fields.explanations.notes.every(item=>item&&item.trim())&&fields.explanations.limitations.every(item=>item&&item.trim()),tool.id+":"+locale+" assumptions, notes and limitations");
    assert.deepEqual(fields.errors.map(item=>item.key),source.errors.map(item=>item.key),tool.id+":"+locale+" stable error keys");
    assert.ok(fields.errors.every(item=>typeof item.message==="string"&&item.message.trim()&&typeof item.recoveryHint==="string"&&item.recoveryHint.trim()),tool.id+":"+locale+" all validation errors translated");
    assert.deepEqual(fields.faqs.map(item=>item.key),source.faqs.map(item=>item.key),tool.id+":"+locale+" stable FAQ keys");
    if(["freelance","margin","affordability","payoff","refinance","personal-loan","student-loan","simple-interest","retirement","401k"].includes(tool.id)){
     assert.ok(fields.faqs.every(item=>typeof item.question==="string"&&item.question.trim()&&typeof item.answer==="string"&&item.answer.trim()),tool.id+":"+locale+" translated FAQ content");
     assert.ok(fields.explanations.steps.length===source.explanations.steps.length&&fields.explanations.steps.every(item=>typeof item==="string"&&item.trim()),tool.id+":"+locale+" translated formula steps");
    }
    assert.deepEqual(fields.seo.faq.map(item=>item.key),source.seo.faq.map(item=>item.key),tool.id+":"+locale+" stable SEO FAQ keys");
    if(["freelance","margin","affordability","payoff","refinance","personal-loan","student-loan","simple-interest","retirement","401k"].includes(tool.id)){
     assert.ok(fields.seo.faq.every(item=>typeof item.question==="string"&&item.question.trim()&&typeof item.answer==="string"&&item.answer.trim()),tool.id+":"+locale+" translated SEO FAQ content");
    }
    if(tool.id==="simple-interest"){
     const basis=fields.inputs.find(item=>item.key==="basis");
     assert.deepEqual(basis.options.map(item=>item.value),["365","360","366"],"simple-interest day-count values remain canonical");
     assert.ok(basis.options.every(item=>typeof item.label==="string"&&item.label.trim()),"simple-interest option labels translated");
    }
   }else if(batchThreeDraftIds.includes(tool.id)){
    assert.equal(tool.locales[locale].status,"draft",tool.id+":"+locale+" batch-three draft status");
    assert.equal(tool.sourceTranslationStatus,"draft",tool.id+" batch-three source draft status");
    assert.ok(tool.locales[locale].fields.metadata.title&&tool.locales[locale].fields.metadata.description,tool.id+":"+locale+" batch-three draft metadata");
    assert.ok(tool.locales[locale].fields.results.metrics.every(item=>item.label&&item.label.trim()),tool.id+":"+locale+" batch-three draft result labels");
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
  assert.deepEqual(source.accessibility.controlLabels.map(x=>x.key),[...source.inputs.map(x=>x.key),...(source.selectors||[]).map(x=>x.key)],id+" accessible input and selector keys");
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


test("batch-three source extraction captures 20 tools and 88 stable input labels without activating translations",()=>{
 const batchThreeIds=["ira","inflation","cd","apy","tax","income-tax","sales-tax","vat-gst","tax-refund","salary","paycheck","payroll","overtime","discount","exchange-fees","transfer-compare","freelance-project","freelancer-net-income","markup","break-even"];
 const manifest=require("../docs/i18n/batch-03-source-extraction.json");
 assert.equal(manifest.status,"source-complete; translation-draft-pending");
 assert.equal(manifest.tools.length,20);
 assert.deepEqual(manifest.tools.map(item=>item.id),batchThreeIds);
 assert.equal(manifest.tools.reduce((total,item)=>total+item.inputs.length,0),88);
 for(const id of batchThreeIds){
  const tool=content.tools.find(item=>item.id===id);
  const extracted=manifest.tools.find(item=>item.id===id);
  assert.ok(tool.source.description&&tool.source.description.length>15,id+" source description");
  assert.deepEqual(tool.source.inputs,extracted.inputs,id+" source input labels match extraction manifest");
  assert.equal(tool.sourceExtractionStatus,"source-record-complete",id+" complete source extraction status");
  assert.equal(tool.sourceCompletenessStatus,"complete",id+" requested source fields complete");
  const draftStarted=["ira","inflation","cd","apy","paycheck"].includes(id);
  assert.equal(tool.sourceTranslationStatus,draftStarted?"draft":"not-started",id+" source translation state");
  assert.equal(new Set(tool.source.inputs.map(input=>input.key)).size,tool.source.inputs.length,id+" unique stable input keys");
  for(const locale of locales){
   if(draftStarted){
    assert.equal(tool.locales[locale].status,"draft",id+":"+locale+" draft state");
    assert.ok(tool.locales[locale].fields.metadata.title&&tool.locales[locale].fields.results.metrics.every(item=>item.label&&item.label.trim()),id+":"+locale+" draft content present");
   }else{
    assert.equal(tool.locales[locale].status,"not-started",id+":"+locale+" locale not activated");
    assert.deepEqual(tool.locales[locale].fields,{},id+":"+locale+" no premature translation draft");
   }
  }
 }
});


test("batch-three source records contain implementation-derived content and keep all target locales inactive",()=>{
 const ids=["ira","inflation","cd","apy","tax","income-tax","sales-tax","vat-gst","tax-refund","salary","paycheck","payroll","overtime","discount","exchange-fees","transfer-compare","freelance-project","freelancer-net-income","markup","break-even"];
 const manifest=require("../docs/i18n/batch-03-source-extraction.json");
 assert.equal(manifest.status,"source-complete; translation-draft-pending");
 assert.deepEqual(manifest.tools.map(t=>t.id),ids);
 for(const id of ids){
  const tool=content.tools.find(t=>t.id===id);
  const record=manifest.tools.find(t=>t.id===id);
  const source=tool.source;
  assert.ok(record.calculationImplementation.sourceCode.length>0,id+" exact implementation source captured");
  assert.ok(record.editorialSource.formula.length>40,id+" formula explanation");
  assert.ok(record.editorialSource.steps.length>=3,id+" ordered steps");
  assert.ok(record.editorialSource.assumptions.length>=2,id+" assumptions");
  assert.equal(record.editorialSource.faqs.length,3,id+" FAQ count");
  assert.ok(source.results.summary&&source.results.metrics.length>=1,id+" runtime result labels");
  assert.ok(source.explanations.formula&&source.explanations.steps.length>=3,id+" explanation fields");
  assert.equal(source.faqs.length,3,id+" catalogue FAQs");
  assert.ok(source.errors.length>=1&&source.errors.every(e=>e.key&&e.message&&e.recoveryHint),id+" error messages and recovery");
  assert.ok(source.seo.title&&source.seo.metaDescription&&source.seo.h1&&source.seo.introduction,id+" SEO copy");
  assert.ok(source.accessibility.pageLabel&&source.accessibility.formLabel&&source.accessibility.resultAnnouncement&&source.accessibility.chartLabel,id+" accessibility labels");
  assert.deepEqual(source.accessibility.controlLabels.map(x=>x.key),[...source.inputs.map(x=>x.key),...(source.selectors||[]).map(x=>x.key)],id+" accessibility stable input and selector keys");
  assert.equal(tool.sourceCompletenessStatus,"complete",id+" requested source fields complete");
  const draftStarted=["ira","inflation","cd","apy","paycheck"].includes(id);
  assert.equal(tool.sourceTranslationStatus,draftStarted?"draft":"not-started",id+" translation state matches draft boundary");
  for(const locale of locales){
   if(draftStarted){
    assert.equal(tool.locales[locale].status,"draft",id+":"+locale+" draft remains inactive");
    assert.ok(tool.locales[locale].fields.metadata.title&&tool.locales[locale].fields.results.metrics.every(item=>item.label&&item.label.trim()),id+":"+locale+" draft content is complete enough for review");
   }else{
    assert.equal(tool.locales[locale].status,"not-started",id+":"+locale+" remains not started");
    assert.deepEqual(tool.locales[locale].fields,{},id+":"+locale+" no premature translation content");
   }
  }
 }
 const incomeTax=manifest.tools.find(t=>t.id==="income-tax").calculationImplementation;
 const salary=manifest.tools.find(t=>t.id==="salary").calculationImplementation;
 assert.ok(incomeTax.sourceCode[0].includes("function estimate("),"income tax exact estimate implementation");
 assert.ok(salary.sourceCode.some(x=>x.includes("function payroll(")),"salary exact payroll implementation");
 assert.ok(incomeTax.sharedDependencies.some(x=>x.name==="progressive"),"progressive bracket helper evidence");
});


test("batch-three finance implementations match deterministic reference examples",()=>{
 const core=require("../finance-core.js");
 const close=(actual,expected,message)=>assert.ok(Math.abs(actual-expected)<1e-7,message+" expected "+expected+" got "+actual);
 const ira=core.iraComparison(1200,1,0,0,0);
 close(ira.rothAfterTax,1200,"IRA Roth balance");close(ira.traditionalAfterTax,1200,"IRA Traditional after-tax balance");
 const inflation=core.inflationCalculator(100,10,2);
 close(inflation.futureCost,121,"inflation future cost");close(inflation.purchasingPower,100/1.21,"inflation purchasing power");
 const cd=core.certificateDeposit(1000,12,12);
 close(cd.futureValue,1120,"CD maturity value");close(cd.interestEarned,120,"CD interest");
 const apy=core.apyCalculator(1000,12,12);
 close(apy.apy,(Math.pow(1.01,12)-1)*100,"APY");close(apy.balance,1000*Math.pow(1.01,12),"APY balance");
 const tax=core.taxEstimate(1000,10,50);
 close(tax.grossTax,100,"flat gross tax");close(tax.tax,50,"flat tax after credits");close(tax.afterTax,950,"flat after-tax amount");
 const sales=core.salesTax(100,10,10,"add");
 close(sales.discount,10,"sales discount");close(sales.tax,9,"sales tax after discount");close(sales.total,99,"sales final total");
 const vat=core.vatGst(110,10,"remove");
 close(vat.base,100,"VAT net amount");close(vat.tax,10,"VAT extracted");
 const refund=core.taxRefund(100,80,10);
 close(refund.refund,0,"tax refund");close(refund.amountDue,10,"tax amount due");
 const check=core.paycheck(20,40,5,1.5,100,10,5,20,10);
 close(check.gross,1050,"paycheck gross");close(check.net,862.5,"paycheck net");
 const payroll=core.payroll(2,3000,10,100,50);
 close(payroll.totalMonthly,6850,"employer monthly payroll");close(payroll.totalAnnual,82200,"employer annual payroll");
 const overtime=core.overtimePay(20,40,5,1.5);
 close(overtime.gross,950,"overtime gross");close(overtime.blendedRate,950/45,"overtime blended rate");
 const discount=core.discountCalculator(100,10,10,10,5);
 close(discount.discountedSubtotal,81,"discounted subtotal");close(discount.total,94.1,"discount final total");
 const exchange=core.exchangeFeeMarkup(1000,1.2,2,1,5);
 close(exchange.fee,15,"exchange transfer fee");close(exchange.convertedAmount,1158.36,"exchange recipient amount");
 const compare=core.internationalTransferCompare(1000,1.2,5,1,2,10,0.5,1);
 assert.equal(compare.bestProvider,"B");close(compare.recipientDifference,11.82,"transfer comparison difference");
 const project=core.freelanceProjectPricing(10,50,100,10,20);
 close(project.totalCost,660,"project total cost");close(project.quotedPrice,825,"project quote");close(project.profit,165,"project profit");
 const freelancer=core.freelancerNetIncome(1000,200,20);
 close(freelancer.netIncome,640,"freelancer net income");
 const markup=core.markupCalculator(100,25);
 close(markup.sellingPrice,125,"markup selling price");close(markup.grossMargin,20,"markup gross margin");
 const breakeven=core.breakEvenCalculator(1000,50,20);
 assert.equal(breakeven.units,34);close(breakeven.revenue,1700,"break-even revenue");close(breakeven.totalCosts,1680,"break-even total costs");
});

test("batch-three 2026 tax engine paths match controlled profile and payroll fixtures",()=>{
 const oldWindow=globalThis.window,oldTax=globalThis.FinPulseTaxData,oldState=globalThis.FinPulseStateData;
 globalThis.window=globalThis;
 globalThis.FinPulseTaxData={profiles:{"TEST-2026":{label:"Test profile",currency:"USD",allowance:100,bands:[{upTo:1000,rate:10},{upTo:Infinity,rate:20}]}}};
 globalThis.FinPulseStateData={payroll:{US:{socialSecurityWageBase:100000,socialSecurityRate:6.2,medicareRate:1.45,additionalMedicareThreshold:{single:200000},additionalMedicareRate:0.9}}};
 delete require.cache[require.resolve("../tax-engine.js")];
 require("../tax-engine.js");
 const engine=globalThis.FinPulseTaxEngine;
 const tax=engine.estimate("TEST-2026",1000,0);
 assert.equal(tax.taxableIncome,900);assert.equal(tax.tax,90);assert.equal(tax.effectiveRate,9);
 const payroll=engine.payroll("US-2026-single",100000);
 assert.equal(payroll.items.length,3);assert.equal(payroll.total,7650);
 globalThis.window=oldWindow;globalThis.FinPulseTaxData=oldTax;globalThis.FinPulseStateData=oldState;
});


test("batch-three editorial source includes derived step-by-step guides",()=>{
 const ids=["ira","inflation","cd","apy","tax","income-tax","sales-tax","vat-gst","tax-refund","salary","paycheck","payroll","overtime","discount","exchange-fees","transfer-compare","freelance-project","freelancer-net-income","markup","break-even"];
 for(const id of ids){
  const source=content.tools.find(t=>t.id===id).source;
  assert.ok(source.guide.title&&source.guide.introduction,id+" guide metadata");
  assert.ok(source.guide.steps.length>=3&&source.guide.steps.every(s=>s.key&&s.title&&s.body),id+" guide steps");
  assert.ok(source.guide.sections.length>=2&&source.guide.sections.every(s=>s.key&&s.heading&&s.body),id+" guide sections");
 }
});


test("batch-three IRA and inflation drafts are complete across all six target locales",()=>{
 for(const id of ["ira","inflation","cd","apy"]){
  const tool=content.tools.find(t=>t.id===id);
  for(const locale of locales){
   const record=tool.locales[locale];
   const fields=record.fields;
   assert.equal(record.status,"draft",id+":"+locale+" draft status");
   assert.ok(fields.metadata.title&&fields.metadata.title!==tool.source.title,id+":"+locale+" translated title");
   assert.ok(fields.metadata.description&&fields.metadata.description!==tool.source.description,id+":"+locale+" translated description");
   assert.equal(fields.inputs.length,tool.source.inputs.length,id+":"+locale+" input count");
   assert.ok(fields.inputs.every((x,i)=>x.key===tool.source.inputs[i].key&&x.label&&x.label!==tool.source.inputs[i].label),id+":"+locale+" translated input labels");
   assert.equal(fields.results.metrics.length,tool.source.results.metrics.length,id+":"+locale+" result metric count");
   assert.ok(fields.results.metrics.every((x,i)=>x.key===tool.source.results.metrics[i].key&&x.label&&x.label!==tool.source.results.metrics[i].label),id+":"+locale+" translated result labels");
   assert.ok(fields.explanations.formulaDescription&&fields.explanations.formulaDescription!==tool.source.explanations.formula,id+":"+locale+" translated formula");
   assert.equal(fields.explanations.steps.length,tool.source.explanations.steps.length,id+":"+locale+" step count");
   assert.ok(fields.explanations.steps.every((x,i)=>x&&x!==tool.source.explanations.steps[i]),id+":"+locale+" translated steps");
   assert.equal(fields.faqs.length,tool.source.faqs.length,id+":"+locale+" FAQ count");
   assert.ok(fields.faqs.every((x,i)=>x.question!==tool.source.faqs[i].question&&x.answer!==tool.source.faqs[i].answer),id+":"+locale+" translated FAQs");
   assert.equal(fields.errors.length,tool.source.errors.length,id+":"+locale+" error count");
   assert.ok(fields.guide.title&&fields.guide.introduction&&fields.guide.steps.length>=3&&fields.guide.sections.length>=2,id+":"+locale+" guide complete");
   assert.ok(fields.seo.title&&fields.seo.metaDescription&&fields.seo.h1&&fields.seo.introduction,id+":"+locale+" SEO complete");
   assert.ok(fields.accessibility.pageLabel&&fields.accessibility.formLabel&&fields.accessibility.resultAnnouncement&&fields.accessibility.chartLabel,id+":"+locale+" accessibility complete");
  }
 }
});
