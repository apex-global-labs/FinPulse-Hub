const test=require("node:test");
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
const {createServer}=require("node:http");
const {readFile}=require("node:fs/promises");
const {join}=require("node:path");

const TOOL_IDS=["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings"];
const LOCALES=["hi","ar","ur","zh-CN","ja","ru"];
const DIRECTIONS={hi:"ltr",ar:"rtl",ur:"rtl","zh-CN":"ltr",ja:"ltr",ru:"ltr"};
const SCRIPT={hi:/[\u0900-\u097F]/,ar:/[\u0600-\u06FF]/,ur:/[\u0600-\u06FF]/,"zh-CN":/[\u4E00-\u9FFF]/,ja:/[\u3040-\u30FF\u4E00-\u9FFF]/,ru:/[\u0400-\u04FF]/};
const FOREIGN={hi:/[\u0600-\u06FF\u4E00-\u9FFF\u3040-\u30FF\u0400-\u04FF]/,ar:/[\u0900-\u097F\u4E00-\u9FFF\u3040-\u30FF\u0400-\u04FF]/,ur:/[\u0900-\u097F\u4E00-\u9FFF\u3040-\u30FF\u0400-\u04FF]/,"zh-CN":/[\u0900-\u097F\u0600-\u06FF\u0400-\u04FF]/,ja:/[\u0900-\u097F\u0600-\u06FF\u0400-\u04FF]/,ru:/[\u0900-\u097F\u0600-\u06FF\u4E00-\u9FFF\u3040-\u30FF]/};
let server,browser,base,content,sourceById;

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
 ...fields.accessibility?.controlLabels?.map(x=>x.label)];
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
async function snapshot(page,locale){
 const captured=await page.evaluate(()=>{
  const numeric=[document.querySelector(".result .value")?.textContent||"",...Array.from(document.querySelectorAll("#metrics .metric strong"),x=>x.textContent)];
  const formula=(Array.from(document.querySelectorAll("#formula-panel p")).map(x=>x.textContent.trim()).find(x=>x.includes("="))||"").replace(/^[^:：]+[:：]\s*/,"");
  return {numericRaw:numeric,currencyCode:window.FinPulseGlobalContext?.get().currencyCode||null,values:Array.from(document.querySelectorAll("#form [name]"),x=>[x.name,x.value]),formula};
 });
 return {...captured,numeric:captured.numericRaw.map(value=>numberSnapshot(value,locale))};
}
test("first 10 persisted tool records are complete and locale-consistent",async()=>{
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

test("10 tools × 6 locales render persisted translations without changing calculations",async t=>{
 const testContent=JSON.parse(JSON.stringify(content));
 for(const id of TOOL_IDS)for(const locale of LOCALES)testContent.tools.find(x=>x.id===id).locales[locale].status="approved";
 server=createServer(async(req,res)=>{
  const path=req.url.split("?")[0].replace(/^\/+/,"")||"index.html";
  if(path==="translations/tool-content.json"){res.writeHead(200,{"content-type":"application/json; charset=utf-8"});res.end(JSON.stringify(testContent));return;}
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
    await page.waitForFunction(()=>window.FinPulseToolRuntime?.loaded===true);
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
    const english=await snapshot(page,"en");
    assert.ok(english.numeric.length>0,id+" baseline calculation output");
    for(const locale of LOCALES){
     const fields=tool.locales[locale].fields;
     await page.evaluate(locale=>window.FinPulseGlobalContext.setLocale(locale),locale);
     await page.waitForFunction(({locale,title})=>document.documentElement.lang===locale&&document.querySelector("#app .heading h2")?.textContent===title,{locale,title:fields.metadata.title},{timeout:10000});
     assert.equal(await page.locator("#app .heading h2").innerText(),fields.metadata.title,id+" / "+locale+" translated title");
     assert.equal(await page.locator("#app .heading p").innerText(),fields.metadata.description,id+" / "+locale+" translated description");
     assert.equal(await page.locator("#app").getAttribute("aria-label"),fields.accessibility.pageLabel,id+" / "+locale+" page accessibility label");
     assert.equal(await page.locator("#form").getAttribute("aria-label"),fields.accessibility.formLabel,id+" / "+locale+" form accessibility label");
     assert.equal(await page.locator(".result").getAttribute("aria-label"),fields.accessibility.resultAnnouncement,id+" / "+locale+" result accessibility label");
     assert.equal(await page.locator(".result .label").innerText(),fields.results.summary,id+" / "+locale+" result summary");
     assert.equal(await page.locator("#formula-panel h3").innerText(),fields.explanations.formulaTitle,id+" / "+locale+" formula title");
     const actualInputs=await page.locator("#form label[for^='f-']").evaluateAll(labels=>labels.map(x=>[x.htmlFor,x.textContent.trim()]));
     for(const input of fields.inputs){const label=actualInputs.find(x=>x[0]==="f-"+input.key);assert.equal(label?.[1],input.label,id+" / "+locale+" input label "+input.key)}
     const metricLabels=await page.locator("#metrics .metric span").allInnerTexts();
     assert.deepEqual(metricLabels,fields.results.metrics.slice(0,metricLabels.length).map(x=>x.label),id+" / "+locale+" result metric labels");
     const formulaSteps=await page.locator("#formula-panel ol li").allInnerTexts();
     assert.deepEqual(formulaSteps,fields.explanations.steps,id+" / "+locale+" formula steps");
     const faqRows=await page.locator(".seo-content details").evaluateAll(nodes=>nodes.map(x=>[x.querySelector("summary")?.textContent.trim(),x.querySelector("p")?.textContent.trim()]));
     assert.deepEqual(faqRows,fields.seo.faq.map(x=>[x.question,x.answer]),id+" / "+locale+" translated FAQ");
     assert.equal(await page.title(),fields.seo.title,id+" / "+locale+" SEO title");
     assert.equal(await page.locator('meta[name="description"]').getAttribute("content"),fields.seo.metaDescription,id+" / "+locale+" SEO description");
     assert.equal(await page.locator("html").getAttribute("dir"),DIRECTIONS[locale],id+" / "+locale+" text direction");
     const localized=await snapshot(page,locale);
     assert.deepEqual(localized.values,english.values,id+" / "+locale+" numeric/currency input preservation");
     assert.equal(localized.currencyCode,english.currencyCode,id+" / "+locale+" display currency unchanged");
     assert.equal(localized.formula,english.formula,id+" / "+locale+" source formula unchanged");
     assert.deepEqual(localized.numeric,english.numeric,id+" / "+locale+" calculation output unchanged");
    }
   }finally{await page.close()}
  });
 }
});

test.after(async()=>{if(browser)await browser.close();if(server)await new Promise(resolve=>server.close(resolve))});
