const test=require("node:test");
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
const {createServer}=require("node:http");
const {readFile}=require("node:fs/promises");
const axe=require("axe-core");
const {join}=require("node:path");

const TOOL_IDS=["freelance","margin","affordability","payoff","refinance","personal-loan","student-loan","simple-interest","retirement","401k","overtime","discount","exchange-fees","transfer-compare","business-roi","cash-flow","rental-yield","emergency-fund","net-worth","basic-arithmetic","fraction","mixed-number","decimal-fraction","ratio","percentage-change","percent-error","rounding","significant-figures","scientific-notation","exponent","square-root","cube-root","lcm","prime-checker","prime-factorization","modulo","pythagorean","circle","triangle-area"];
const LOCALES=["hi","ar","ur","zh-CN","ja","ru"];
const MATH_BATCH_SEVEN=new Set(["lcm","prime-checker","prime-factorization","modulo","pythagorean","circle","triangle-area"]);
const DIRECTIONS={hi:"ltr",ar:"rtl",ur:"rtl","zh-CN":"ltr",ja:"ltr",ru:"ltr"};
const SCRIPT={hi:/[\u0900-\u097F]/,ar:/[\u0600-\u06FF]/,ur:/[\u0600-\u06FF]/,"zh-CN":/[\u4E00-\u9FFF]/,ja:/[\u3040-\u30FF\u4E00-\u9FFF]/,ru:/[\u0400-\u04FF]/};
const FOREIGN={hi:/[\u0600-\u06FF\u4E00-\u9FFF\u3040-\u30FF\u0400-\u04FF]/,ar:/[\u0900-\u097F\u4E00-\u9FFF\u3040-\u30FF\u0400-\u04FF]/,ur:/[\u0900-\u097F\u4E00-\u9FFF\u3040-\u30FF\u0400-\u04FF]/,"zh-CN":/[\u0900-\u097F\u0600-\u06FF\u0400-\u04FF]/,ja:/[\u0900-\u097F\u0600-\u06FF\u0400-\u04FF]/,ru:/[\u0900-\u097F\u0600-\u06FF\u4E00-\u9FFF\u3040-\u30FF]/};
let server,browser,base,content,sourceById;

function normalizeRendered(value){return String(value??"").replace(/\s+/g," ").trim();}
function translatedStrings(fields){
 const out=[fields.metadata?.title,fields.metadata?.description,fields.metadata?.category,
 ...fields.inputs?.map(x=>x.label),fields.results?.heading,fields.results?.summary,
 ...fields.results?.metrics?.map(x=>x.label),...fields.results?.breakdown?.map(x=>x.label),
 fields.explanations?.formulaTitle,fields.explanations?.formulaDescription,
 ...fields.explanations?.assumptions,...fields.explanations?.notes,
 ...fields.explanations?.steps,...fields.explanations?.disclaimers,...fields.explanations?.limitations,
 ...fields.faqs?.flatMap(x=>[x.question,x.answer]),
 ...fields.errors?.flatMap(x=>[x.message,x.recoveryHint]),
 fields.seo?.title,fields.seo?.metaDescription,fields.seo?.h1,fields.seo?.introduction,
 ...fields.seo?.faq?.flatMap(x=>[x.question,x.answer]),
 fields.accessibility?.pageLabel,fields.accessibility?.formLabel,
 fields.accessibility?.resultAnnouncement,fields.accessibility?.chartLabel,
 ...fields.accessibility?.controlLabels?.map(x=>x.label),
 fields.guide?.title,fields.guide?.introduction,
 ...fields.guide?.steps?.flatMap(x=>[x.title,x.body]),
 ...fields.guide?.sections?.flatMap(x=>[x.heading,x.body])];
 return out.filter(x=>typeof x==="string"&&x.trim());
}
function assertComplete(source,fields,id,locale){
 const fail=message=>assert.fail(id+" / "+locale+": "+message);
 const same=(a,b)=>Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((x,i)=>x.key===b[i].key);
 if(!fields?.metadata?.title?.trim()||!fields.metadata.description?.trim())fail("missing metadata");
 if(!same(fields.inputs,source.inputs)||!fields.inputs.every(x=>x.label?.trim()))fail("input key/label mismatch");
 if(!fields.results?.heading?.trim()||!fields.results.summary?.trim())fail("missing result heading/summary");
 if(!same(fields.results.metrics,source.results.metrics)||!fields.results.metrics.every(x=>x.label?.trim()))fail("metric key/label mismatch");
 if(!same(fields.results.breakdown,source.results.breakdown)||!fields.results.breakdown.every(x=>x.label?.trim()))fail("breakdown key/label mismatch");
 if(!fields.explanations?.formulaTitle?.trim()||!fields.explanations.formulaDescription?.trim())fail("missing formula explanation");
 if(!Array.isArray(fields.explanations.steps)||fields.explanations.steps.length!==source.explanations.steps.length||!fields.explanations.steps.every(x=>typeof x==="string"&&x.trim()))fail("formula step count/content mismatch");
 if(!Array.isArray(fields.explanations.assumptions)||!fields.explanations.assumptions.length||!fields.explanations.assumptions.every(x=>typeof x==="string"&&x.trim()))fail("missing assumptions");
 if(!Array.isArray(fields.explanations.notes)||!fields.explanations.notes.length||!fields.explanations.notes.every(x=>typeof x==="string"&&x.trim()))fail("missing notes");
 if(!Array.isArray(fields.explanations.limitations)||!fields.explanations.limitations.length||!fields.explanations.limitations.every(x=>typeof x==="string"&&x.trim()))fail("missing limitations");
 if(!fields.guide?.title?.trim()||!fields.guide.introduction?.trim()||!fields.guide.steps?.length||!fields.guide.sections?.length)fail("missing guide content");
 if(!fields.guide.steps.every(x=>x.key&&x.title?.trim()&&x.body?.trim())||!fields.guide.sections.every(x=>x.key&&x.heading?.trim()&&x.body?.trim()))fail("guide key/content mismatch");
 if(!Array.isArray(fields.explanations.disclaimers)||!fields.explanations.disclaimers.length||!fields.explanations.disclaimers.every(x=>x.trim()))fail("missing disclaimers");
 if(!same(fields.faqs,source.faqs)||!fields.faqs.every(x=>x.question?.trim()&&x.answer?.trim()))fail("FAQ key/content mismatch");
 if(!same(fields.errors,source.errors)||!fields.errors.every(x=>x.message?.trim()&&x.recoveryHint?.trim()))fail("validation-error key/content mismatch");
 if(!fields.seo?.title?.trim()||!fields.seo.metaDescription?.trim()||!fields.seo.h1?.trim()||!fields.seo.introduction?.trim())fail("missing SEO content");
 if(!fields.accessibility?.pageLabel?.trim()||!fields.accessibility.formLabel?.trim()||!fields.accessibility.resultAnnouncement?.trim()||!fields.accessibility.chartLabel?.trim())fail("missing accessibility metadata");
 if(!same(fields.accessibility.controlLabels,source.inputs)||!fields.accessibility.controlLabels.every(x=>x.label?.trim()))fail("accessibility control key/label mismatch");
 const strings=translatedStrings(fields),joined=strings.join(" ");
 if(!SCRIPT[locale].test(joined))fail("expected locale script missing");
 if(FOREIGN[locale].test(joined))fail("foreign locale script contamination detected");
}
async function accessibilityAudit(page,id,locale){
 const findings=await page.evaluate(()=>{
  const issues=[];
  const visible=el=>!!(el.offsetWidth||el.offsetHeight||el.getClientRects().length);
  const controls=Array.from(document.querySelectorAll("#form input:not([type=hidden]),#form select,#form textarea")).filter(visible);
  for(const control of controls){
   const label=control.id&&document.querySelector('label[for="'+CSS.escape(control.id)+'"]');
   if(!(label?.textContent.trim()||control.getAttribute("aria-label")||control.getAttribute("aria-labelledby")))issues.push("form control has no accessible name: "+(control.id||control.tagName));
  }
  for(const button of Array.from(document.querySelectorAll("button,[role=button]")).filter(visible)){
   const name=(button.getAttribute("aria-label")||button.getAttribute("title")||button.innerText||"").trim();
   if(!name)issues.push("button has no accessible name");
  }
  const ids=Array.from(document.querySelectorAll("[id]"),el=>el.id);
  for(const id of new Set(ids))if(ids.filter(x=>x===id).length>1)issues.push("duplicate id: "+id);
  for(const el of document.querySelectorAll("[aria-labelledby],[aria-describedby]")){
   for(const attr of ["aria-labelledby","aria-describedby"]){
    const refs=(el.getAttribute(attr)||"").split(/\s+/).filter(Boolean);
    for(const ref of refs)if(!document.getElementById(ref))issues.push(attr+" references missing id: "+ref);
   }
  }
  for(const img of document.querySelectorAll("img"))if(!img.hasAttribute("alt"))issues.push("image missing alt text");
  if(!document.documentElement.lang)issues.push("document language missing");
  if(!document.documentElement.dir)issues.push("document direction missing");
  if(!document.querySelector(".result[aria-label]"))issues.push("result region has no accessible label");
  const heading=Array.from(document.querySelectorAll("h1,h2,h3")).filter(visible);
  if(!heading.length)issues.push("no visible heading");
  return issues;
 });
 assert.deepEqual(findings,[],id+" / "+locale+" accessibility audit");
 if(MATH_BATCH_SEVEN.has(id)){
  const violations=await page.evaluate(async()=>{
   const result=await window.axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21a","wcag21aa"]}});
   return result.violations.map(item=>({id:item.id,impact:item.impact,nodes:item.nodes.map(node=>node.target.join(" "))}));
  });
  assert.deepEqual(violations,[],id+" / "+locale+" axe WCAG 2.1 AA audit");
 }
}
function numberSnapshot(text,locale){
 const formatLocale=locale==="ar"?"ar-u-nu-arab":locale==="ur"?"ur-u-nu-arabext":locale;
 const digitFormatter=new Intl.NumberFormat(formatLocale,{useGrouping:false});
 const digits=Array.from({length:10},(_,n)=>digitFormatter.format(n));
 let value=Array.from(String(text||"")).map(char=>{
  const index=digits.indexOf(char);
  return index<0?char:String(index);
 }).join("");
 const parts=new Intl.NumberFormat(formatLocale).formatToParts(12345.6);
 const group=parts.find(x=>x.type==="group")?.value;
 const decimal=parts.find(x=>x.type==="decimal")?.value;
 if(group)value=value.split(group).join("");
 if(decimal&&decimal!==".")value=value.split(decimal).join(".");
 const match=value.replace(/[^\d.+-]/g,"").match(/[-+]?\d+(?:\.\d+)?/);
 return match?Number(match[0]):null;
}
const DEFAULT_NUMBER_FORMAT_TOOL_IDS=new Set(["basic-arithmetic","fraction","mixed-number","decimal-fraction","ratio","proportion","average","percentage-change","percent-error","rounding","significant-figures","scientific-notation","exponent","square-root","cube-root"]);
async function snapshot(page,locale,toolId){
 const captured=await page.evaluate(()=>{
  const numeric=[document.querySelector(".result .value")?.textContent||"",...Array.from(document.querySelectorAll("#metrics .metric strong"),x=>x.textContent)];
  const formula=(Array.from(document.querySelectorAll("#formula-panel p")).map(x=>x.textContent.trim()).find(x=>x.includes("="))||"").replace(/^[^:：]+[:：]\s*/,"");
  return {numericRaw:numeric,numberLocale:new Intl.NumberFormat().resolvedOptions().locale,currencyCode:window.FinPulseGlobalContext?.get().currencyCode||null,values:Array.from(document.querySelectorAll("#form [name]"),x=>[x.name,x.value]),formula};
 });
 const numericLocale=DEFAULT_NUMBER_FORMAT_TOOL_IDS.has(toolId)?captured.numberLocale:locale;
 return {...captured,numeric:captured.numericRaw.map(value=>numberSnapshot(value,numericLocale))};
}
test("Batch 1, Batch 2 and Overtime pilot persisted tool records are complete and locale-consistent",async()=>{
 content=JSON.parse(await readFile(join(process.cwd(),"translations/tool-content.json"),"utf8"));
 assert.equal(content.tools.length,220);
 sourceById=new Map(content.tools.map(x=>[x.id,x]));
 for(const id of TOOL_IDS){
  const tool=sourceById.get(id);assert.ok(tool,id+" source record exists");
  for(const locale of LOCALES){
   const record=tool.locales?.[locale];assert.equal(record?.status,"draft",id+" / "+locale+" must remain draft before browser gate");
   assertComplete(tool.source,record?.fields,id,locale);
  }
 }
});

test("Batch 1, Batch 2 and Overtime pilot tools × 6 locales render persisted translations without changing calculations",async t=>{
 const testContent=JSON.parse(JSON.stringify(content));
 for(const id of TOOL_IDS)for(const locale of LOCALES)testContent.tools.find(x=>x.id===id).locales[locale].status="approved";
 server=createServer(async(req,res)=>{
  const path=req.url.split("?")[0].replace(/^\/+/,"")||"index.html";
  if(path==="translations/tool-content-status.json"){const approved={};for(const tool of testContent.tools){const locales=Object.entries(tool.locales||{}).filter(([,record])=>["approved","published"].includes(record.status)).map(([locale])=>locale).sort();if(locales.length)approved[tool.id]=locales}res.writeHead(200,{"content-type":"application/json; charset=utf-8"});res.end(JSON.stringify({schemaVersion:1,approved}));return;}if(path==="translations/tool-content.json"){res.writeHead(200,{"content-type":"application/json; charset=utf-8"});res.end(JSON.stringify(testContent));return;}
  try{const data=await readFile(join(process.cwd(),path));res.writeHead(200,{"content-type":path.endsWith(".css")?"text/css":path.endsWith(".js")?"text/javascript":path.endsWith(".json")?"application/json":"text/html"});res.end(data)}
  catch{res.writeHead(404);res.end("not found")}
 });
 await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
 base="http://127.0.0.1:"+server.address().port;
 browser=await chromium.launch({headless:true});
 for(const id of TOOL_IDS){
  await t.test(id,async()=>{
   const page=await browser.newPage({viewport:{width:1365,height:900}});
   try{
    const tool=sourceById.get(id);
    await page.goto(base+"?tool="+id);
    await page.locator("#app .heading h2").waitFor();
    if(MATH_BATCH_SEVEN.has(id))await page.addScriptTag({url:base+"/node_modules/axe-core/axe.min.js"});
    if(id==="currency"){
     await page.locator("#f-amount").fill("100");
     await page.locator("#f-fee").fill("2");
     await page.locator("#f-from").selectOption("USD");
     await page.locator("#f-to").selectOption("EUR");
     await page.locator("#f-rate").fill("1.25");
     await page.locator("#manual-rate").click();
    }else{
     await page.locator("#form").evaluate(form=>form.requestSubmit());
    }
    await page.waitForFunction(()=>{const value=document.querySelector(".result .value")?.textContent?.trim();return value&&value!=="—"});
    const english=await snapshot(page,"en",id);
    const englishLabel=await page.locator(".result .label").innerText();
    assert.ok(english.numeric.length>0,id+" baseline calculation output");
    await accessibilityAudit(page,id,"en");
    for(const locale of LOCALES){
     const fields=tool.locales[locale].fields;
     await page.evaluate(locale=>window.FinPulseGlobalContext.setLocale(locale),locale);
     await page.waitForFunction(()=>window.FinPulseToolRuntime?.loaded===true,{timeout:10000});
     await page.waitForFunction(({locale,title})=>document.documentElement.lang===locale&&document.querySelector("#app .heading h2")?.textContent===title,{locale,title:fields.metadata.title},{timeout:10000});
     assert.equal(await page.locator("#app .heading h2").innerText(),fields.metadata.title,id+" / "+locale+" translated title");
     assert.equal(normalizeRendered(await page.locator("#app .heading p").innerText()),normalizeRendered(fields.metadata.description),id+" / "+locale+" translated description");
     assert.equal(await page.locator("#app").getAttribute("aria-label"),fields.accessibility.pageLabel,id+" / "+locale+" page accessibility label");
     assert.equal(await page.locator("#form").getAttribute("aria-label"),fields.accessibility.formLabel,id+" / "+locale+" form accessibility label");
     assert.equal(await page.locator(".result").getAttribute("aria-label"),fields.accessibility.resultAnnouncement,id+" / "+locale+" result accessibility label");
     const winner=englishLabel.includes("PROVIDER A")?"A":"B";
     assert.equal(normalizeRendered(await page.locator(".result .label").innerText()),normalizeRendered(fields.results.summary.replaceAll("{provider}",winner)),id+" / "+locale+" result summary and winner");
     assert.equal(normalizeRendered(await page.locator("#formula-panel h3").innerText()),normalizeRendered(fields.explanations.formulaTitle),id+" / "+locale+" formula title");
     const renderedFormula=await page.locator("#formula-panel p").first().innerText();
     assert.ok(normalizeRendered(renderedFormula).includes(normalizeRendered(fields.explanations.formulaDescription)),id+" / "+locale+" localized formula description");
     assert.ok(!renderedFormula.includes("Provider recipient amount"),id+" / "+locale+" no English-only formula text");
     assert.equal(await page.locator("#form").evaluate(el=>getComputedStyle(el).direction),DIRECTIONS[locale],id+" / "+locale+" rendered form direction");
     const actualInputs=await page.locator("#form label[for^='f-']").evaluateAll(labels=>labels.map(x=>[x.htmlFor,x.textContent.trim()]));
     for(const input of fields.inputs){const label=actualInputs.find(x=>x[0]==="f-"+input.key);assert.equal(normalizeRendered(label?.[1]),normalizeRendered(input.label),id+" / "+locale+" input label "+input.key)}
     const metricLabels=await page.locator("#metrics .metric span").allInnerTexts();
     assert.deepEqual(metricLabels.map(normalizeRendered),fields.results.metrics.slice(0,metricLabels.length).map(x=>normalizeRendered(x.label)),id+" / "+locale+" result metric labels");
     const formulaSteps=await page.locator("#formula-panel ol li").allInnerTexts();
     assert.deepEqual(formulaSteps.map(normalizeRendered),fields.explanations.steps.map(normalizeRendered),id+" / "+locale+" formula steps");
     const faqRows=await page.locator(".seo-content details").evaluateAll(nodes=>nodes.map(x=>[x.querySelector("summary")?.textContent.trim(),x.querySelector("p")?.textContent.trim()]));
     assert.deepEqual(faqRows.map(row=>row.map(normalizeRendered)),fields.seo.faq.map(x=>[normalizeRendered(x.question),normalizeRendered(x.answer)]),id+" / "+locale+" translated FAQ");
     assert.equal(await page.title(),fields.seo.title,id+" / "+locale+" SEO title");
     assert.equal(await page.locator('meta[name="description"]').getAttribute("content"),fields.seo.metaDescription,id+" / "+locale+" SEO description");
     assert.equal(await page.locator("html").getAttribute("dir"),DIRECTIONS[locale],id+" / "+locale+" text direction");
     await accessibilityAudit(page,id,locale);
     const localized=await snapshot(page,locale,id);
     assert.deepEqual(localized.values,english.values,id+" / "+locale+" numeric/currency input preservation");
     assert.equal(localized.currencyCode,english.currencyCode,id+" / "+locale+" display currency unchanged");
     assert.equal(localized.numericRaw.length,english.numericRaw.length,id+" / "+locale+" calculation output field count unchanged");
     assert.deepEqual(localized.numeric,english.numeric,id+" / "+locale+" calculation output unchanged");
     if(id==="transfer-compare"){
     const feeError=fields.errors.find(item=>item.key==="fee");
     await page.locator("#f-aFixed").fill("1000");
     await page.locator("#form").evaluate(form=>form.requestSubmit());
     await page.waitForFunction(expected=>document.querySelector(".result .sub")?.textContent===expected,feeError.message+" "+feeError.recoveryHint);
     assert.equal(await page.locator(".result .sub").innerText(),feeError.message+" "+feeError.recoveryHint,id+" / "+locale+" localized combined-fee error and recovery");
     const percentageError=fields.errors.find(item=>item.key==="percentage-limit");
     await page.locator("#f-aFixed").fill("5");
     await page.locator("#f-aMarkup").fill("101");
     await page.locator("#form").evaluate(form=>form.requestSubmit());
     await page.waitForFunction(expected=>document.querySelector(".result .sub")?.textContent===expected,percentageError.message+" "+percentageError.recoveryHint);
     assert.equal(await page.locator(".result .sub").innerText(),percentageError.message+" "+percentageError.recoveryHint,id+" / "+locale+" localized percentage-limit error and recovery");
     await page.locator("#f-aMarkup").fill("2");
     await page.locator("#f-aFee").fill("101");
     await page.locator("#form").evaluate(form=>form.requestSubmit());
     await page.waitForFunction(expected=>document.querySelector(".result .sub")?.textContent===expected,percentageError.message+" "+percentageError.recoveryHint);
     assert.equal(await page.locator(".result .sub").innerText(),percentageError.message+" "+percentageError.recoveryHint,id+" / "+locale+" percentage-fee upper bound recovery");
     await page.locator("#f-aFee").fill("1");
     const rateError=fields.errors.find(item=>item.key==="rate");
     await page.locator("#f-aMarkup").fill("2");
     await page.locator("#f-rate").fill("0");
     await page.locator("#form").evaluate(form=>form.requestSubmit());
     await page.waitForFunction(expected=>document.querySelector(".result .sub")?.textContent===expected,rateError.message+" "+rateError.recoveryHint);
     assert.equal(await page.locator(".result .sub").innerText(),rateError.message+" "+rateError.recoveryHint,id+" / "+locale+" localized rate error and recovery");
     await page.locator("#f-rate").fill("1.08");
     const amountLabel=fields.inputs.find(item=>item.key==="amount").label;
     await page.locator("#f-amount").evaluate(el=>{el.removeAttribute("min");el.removeAttribute("required")});
     const negativeError=fields.errors.find(item=>item.key==="negative");
     await page.locator("#f-amount").fill("-1");
     await page.locator("#form").evaluate(form=>form.requestSubmit());
     const expectedNegative=negativeError.message.replaceAll("{field}",amountLabel)+" "+negativeError.recoveryHint;
     await page.waitForFunction(expected=>document.querySelector(".result .sub")?.textContent===expected,expectedNegative);
     assert.equal(await page.locator(".result .sub").innerText(),expectedNegative,id+" / "+locale+" localized negative input and field name");
     const invalidError=fields.errors.find(item=>item.key==="invalid-number");
     await page.locator("#f-amount").fill("");
     await page.locator("#form").evaluate(form=>form.requestSubmit());
     const expectedInvalid=invalidError.message.replaceAll("{field}",amountLabel)+" "+invalidError.recoveryHint;
     await page.waitForFunction(expected=>document.querySelector(".result .sub")?.textContent===expected,expectedInvalid);
     assert.equal(await page.locator(".result .sub").innerText(),expectedInvalid,id+" / "+locale+" localized invalid-number input and field name");
     await page.locator("#f-amount").fill("1000");
     await page.locator("#form").evaluate(form=>form.requestSubmit());
     await page.waitForFunction(()=>{const value=document.querySelector(".result .value")?.textContent?.trim();return value&&value!=="—"});
     if(locale==="hi"){
      await page.locator("#f-aFixed").fill("0");
      await page.locator("#f-aFee").fill("0");
      await page.locator("#f-aMarkup").fill("0");
      await page.locator("#form").evaluate(form=>form.requestSubmit());
      await page.waitForFunction(expected=>document.querySelector(".result .label")?.textContent===expected,fields.results.summary.replaceAll("{provider}","A"));
      assert.equal(await page.locator(".result .label").innerText(),fields.results.summary.replaceAll("{provider}","A"),id+" / "+locale+" translated Provider A winner");
      await page.locator("#f-aFixed").fill("5");
      await page.locator("#f-aFee").fill("1");
      await page.locator("#f-aMarkup").fill("2");
      await page.locator("#form").evaluate(form=>form.requestSubmit());
     }
     }

    }
   }finally{await page.close()}
  });
 }
});


test.after(async()=>{if(browser)await browser.close();if(server)await new Promise(resolve=>server.close(resolve))});
