const test=require("node:test");
const axePath=require.resolve("axe-core");
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
const {createServer}=require("node:http");
const {readFile}=require("node:fs/promises");
const {join}=require("node:path");

test("language selector changes shared UI, RTL direction and persists without changing currency",async()=>{
 const server=createServer(async(req,res)=>{
  const path=decodeURIComponent(req.url.split("?")[0]).replace(/^\//,"")||"index.html";
  try{
   const data=await readFile(join(process.cwd(),path));
   const type=path.endsWith(".css")?"text/css":path.endsWith(".js")?"text/javascript":path.endsWith(".json")?"application/json":"text/html";
   res.writeHead(200,{"content-type":type});res.end(data);
  }catch{res.writeHead(404);res.end("not found")}
 });
 await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:800}});
  await page.goto("http://127.0.0.1:"+server.address().port);
  await page.waitForFunction(()=>window.FinPulseI18n?.supportedLocales.length===7&&window.FinPulseI18n.translate("nav.calculators")==="Calculators");
  const currency=await page.evaluate(()=>window.FinPulseGlobalContext.get().currencyCode);
  await page.locator("#language-switcher").selectOption("ar");
  await page.waitForFunction(()=>document.documentElement.lang==="ar"&&document.documentElement.dir==="rtl");
  assert.equal(await page.locator('a[data-i18n="nav.calculators"]').innerText(),"الحاسبات");
  assert.equal(await page.evaluate(()=>window.FinPulseGlobalContext.get().currencyCode),currency);
  await page.locator("#language-switcher").selectOption("ur");
  await page.waitForFunction(()=>document.documentElement.lang==="ur"&&document.documentElement.dir==="rtl");
  assert.equal(await page.locator('a[data-i18n="nav.calculators"]').innerText(),"کیلکولیٹرز");
  await page.locator("#language-switcher").selectOption("zh-CN");
  await page.waitForFunction(()=>document.documentElement.lang==="zh-CN"&&document.documentElement.dir==="ltr");
  assert.equal(await page.locator('a[data-i18n="nav.calculators"]').innerText(),"计算器");
  await page.reload();
  await page.waitForFunction(()=>document.documentElement.lang==="zh-CN"&&document.documentElement.dir==="ltr"&&window.FinPulseI18n.translate("nav.calculators")==="计算器");
  assert.equal(await page.evaluate(()=>window.FinPulseGlobalContext.get().currencyCode),currency);
  await page.close();
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
});

test("all seven locales preserve direction rules and expose complete first-batch translation records",async()=>{
 const server=createServer(async(req,res)=>{
  const path=decodeURIComponent(req.url.split("?")[0]).replace(/^\//,"")||"index.html";
  try{const data=await readFile(path==="__axe.js"?axePath:join(process.cwd(),path));const type=path.endsWith(".css")?"text/css":path.endsWith(".js")?"text/javascript":path.endsWith(".json")?"application/json":"text/html";res.writeHead(200,{"content-type":type});res.end(data)}
  catch{res.writeHead(404);res.end("not found")}
 });
 await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:800}});
  await page.goto("http://127.0.0.1:"+server.address().port);
  await page.waitForFunction(()=>window.FinPulseI18n?.supportedLocales.length===7);
  const result=await page.evaluate(async()=>{
   const content=await (await fetch("/translations/tool-content.json")).json();
   const shell=await (await fetch("/translations/catalogue.json")).json();
   const ids=["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings"];
   const locales=["en","hi","ar","ur","zh-CN","ja","ru"];
   const checks=[];
   for(const locale of locales){
    window.FinPulseI18n.setLocale(locale);
    const expectedDir=["ar","ur"].includes(locale)?"rtl":"ltr";
    const nav=window.FinPulseI18n.translate("nav.calculators");
    const complete=ids.every(id=>{
     const tool=content.tools.find(item=>item.id===id);
     return locale==="en"?!!tool.source.description:!!tool.locales[locale]?.fields?.metadata?.description;
    });
    checks.push({locale,dir:document.documentElement.dir,expectedDir,nav,complete});
   }
   return {checks,toolCount:content.tools.length,localeCount:content.supportedLocales.length};
  });
  assert.equal(result.toolCount,220);
  assert.equal(result.localeCount,7);
  assert.equal(result.checks.length,7);
  for(const check of result.checks){
   assert.equal(check.dir,check.expectedDir,check.locale+" direction");
   assert.ok(check.nav&&check.nav.length>0,check.locale+" navigation");
   assert.equal(check.complete,true,check.locale+" first batch descriptions");
  }
  await page.close();
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
});

test("Batch 2 approved translations render in all seven locales and pass 70 axe WCAG audits",async()=>{
 const server=createServer(async(req,res)=>{
  const rawPath=decodeURIComponent(req.url.split("?")[0]);
  const path=(rawPath.startsWith("/")?rawPath.slice(1):rawPath)||"index.html";
  try{const data=await readFile(path==="__axe.js"?axePath:join(process.cwd(),path));const type=path.endsWith(".css")?"text/css":path.endsWith(".js")?"text/javascript":path.endsWith(".json")?"application/json":"text/html";res.writeHead(200,{"content-type":type});res.end(data)}
  catch{res.writeHead(404);res.end("not found")}
 });
 await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:800}});
  const base="http://127.0.0.1:"+server.address().port;
  await page.goto(base+"/?tool=freelance");
  await page.waitForSelector("#form");
  await page.waitForFunction(()=>window.FinPulseToolRuntime?.loaded&&window.FinPulseI18nReady);
  const registry=await page.evaluate(async()=>{
   const content=await (await fetch("/translations/tool-content.json")).json();
   const ids=["freelance","margin","affordability","payoff","refinance","personal-loan","student-loan","simple-interest","retirement","401k"];
   return ids.map(id=>{const tool=content.tools.find(item=>item.id===id);return{id,source:tool.source,locales:tool.locales}})
  });
  const locales=["en","hi","ar","ur","zh-CN","ja","ru"];
  let auditCount=0;
  for(const locale of locales){
   const expectedDir=["ar","ur"].includes(locale)?"rtl":"ltr";
   for(const tool of registry){
    await page.goto(base+"/?tool="+tool.id);
    await page.waitForSelector("#form");
    await page.waitForFunction(()=>window.FinPulseToolRuntime?.loaded&&window.FinPulseI18n?.supportedLocales.length===7);
    await page.evaluate(async({id,locale})=>{
     const data=await (await fetch("/translations/tool-content.json")).json();
     const tool=data.tools.find(item=>item.id===id);
     for(const targetLocale of ["hi","ar","ur","zh-CN","ja","ru"])tool.locales[targetLocale].status="approved";
     window.FinPulseToolRuntime.setContent(data);
     window.FinPulseI18n.setLocale(locale);
    },{id:tool.id,locale});
    const fields=locale==="en"?tool.source:tool.locales[locale].fields;
    const expectedTitle=locale==="en"?tool.source.title:fields.metadata.title;
    await page.waitForFunction(({locale,title,dir})=>document.documentElement.lang===locale&&document.documentElement.dir===dir&&document.querySelector("#app .heading h2")?.textContent.trim()===title,{locale,title:expectedTitle,dir:expectedDir});
    await page.addScriptTag({url:base+"/__axe.js"});
    const accessibility=await page.evaluate(async()=>await axe.run(document.querySelector("#app"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21a","wcag21aa"]}}));
    assert.deepEqual(accessibility.violations.map(item=>item.id),[],locale+":"+tool.id+" translated tool-page WCAG accessibility");
    const firstInput=tool.source.inputs[0];
    const state=await page.evaluate(({id,inputKey})=>{
     const input=document.querySelector("#f-"+inputKey);
     return {
      title:document.querySelector("#app .heading h2")?.textContent.trim(),
      description:document.querySelector("#app .heading p")?.textContent.trim(),
      label:input?document.querySelector('label[for="f-'+inputKey+'"]')?.textContent.trim():"",
      formula:document.querySelector("#formula-panel ol li")?.textContent.trim()||"",
      appLabel:document.querySelector("#app")?.getAttribute("aria-label"),
      formLabel:document.querySelector("#form")?.getAttribute("aria-label"),
      resultAnnouncement:document.querySelector(".result")?.getAttribute("aria-label"),
      status:window.FinPulseToolRuntime.statusFor(id,window.FinPulseI18n.locale),
      dir:document.documentElement.dir,
      locale:document.documentElement.lang,
      seoTitle:document.title
     };
    },{id:tool.id,inputKey:firstInput.key});
    assert.equal(state.title,expectedTitle,locale+":"+tool.id+" title rendering");
    assert.equal(state.description,locale==="en"?tool.source.description:fields.metadata.description,locale+":"+tool.id+" description rendering");
    assert.equal(state.label,locale==="en"?firstInput.label:fields.inputs.find(item=>item.key===firstInput.key).label,locale+":"+tool.id+" input label rendering");
    assert.equal(state.formula,locale==="en"?tool.source.explanations.steps[0]:fields.explanations.steps[0],locale+":"+tool.id+" translated calculation step");
    assert.equal(state.appLabel,fields.accessibility.pageLabel,locale+":"+tool.id+" page accessibility label");
    assert.equal(state.formLabel,fields.accessibility.formLabel,locale+":"+tool.id+" form accessibility label");
    assert.equal(state.resultAnnouncement,fields.accessibility.resultAnnouncement,locale+":"+tool.id+" result announcement");
    assert.equal(state.status,locale==="en"?"source":"approved",locale+":"+tool.id+" simulated approval state");
    assert.equal(state.dir,expectedDir,locale+":"+tool.id+" direction");
    assert.equal(state.locale,locale,locale+":"+tool.id+" document language");
    assert.equal(state.seoTitle,locale==="en"?tool.source.seo.title:fields.seo.title,locale+":"+tool.id+" SEO title");
    auditCount++;
   }
  }
  assert.equal(auditCount,70,"exactly 70 tool-locale axe WCAG audits");
  await page.close();
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
});