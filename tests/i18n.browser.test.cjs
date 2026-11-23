const test=require("node:test");
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
  try{const data=await readFile(join(process.cwd(),path));const type=path.endsWith(".css")?"text/css":path.endsWith(".js")?"text/javascript":path.endsWith(".json")?"application/json":"text/html";res.writeHead(200,{"content-type":type});res.end(data)}
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

test("first-ten tool pages render in all seven locales and keep draft or incomplete translations on English fallback",async()=>{
 const server=createServer(async(req,res)=>{
  const path=decodeURIComponent(req.url.split("?")[0]).replace(/^\//,"")||"index.html";
  try{const data=await readFile(join(process.cwd(),path));const type=path.endsWith(".css")?"text/css":path.endsWith(".js")?"text/javascript":path.endsWith(".json")?"application/json":"text/html";res.writeHead(200,{"content-type":type});res.end(data)}
  catch{res.writeHead(404);res.end("not found")}
 });
 await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:800}});
  const base="http://127.0.0.1:"+server.address().port;
  await page.goto(base+"/?tool=loan");
  await page.waitForSelector("#form");
  await page.waitForFunction(()=>window.FinPulseToolRuntime?.loaded&&window.FinPulseI18nReady);
  const registry=await page.evaluate(async()=>{
   const content=await (await fetch("/translations/tool-content.json")).json();
   const ids=["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings"];
   return ids.map(id=>{const tool=content.tools.find(item=>item.id===id);return{id,title:tool.source.title,description:tool.source.description,firstInput:tool.source.inputs[0],firstStep:tool.source.explanations.steps[0],translatedHiStep:tool.locales.hi.fields.explanations.steps[0]}})
  });
  const locales=["en","hi","ar","ur","zh-CN","ja","ru"];
  for(const locale of locales){
   await page.locator("#language-switcher").selectOption(locale);
   const expectedDir=["ar","ur"].includes(locale)?"rtl":"ltr";
   await page.waitForFunction(({locale,dir})=>document.documentElement.lang===locale&&document.documentElement.dir===dir,{locale,dir:expectedDir});
   for(const tool of registry){
    await page.goto(base+"/?tool="+tool.id);
    await page.waitForSelector("#form");
    await page.waitForFunction(()=>window.FinPulseToolRuntime?.loaded&&window.FinPulseI18n?.supportedLocales.length===7);
    const state=await page.evaluate(({id,firstInput})=>{
     const title=document.querySelector("#app .heading h2")?.textContent?.trim();
     const description=document.querySelector("#app .heading p")?.textContent?.trim();
     const input=document.querySelector("#f-"+firstInput.key);
     const label=input?document.querySelector('label[for="f-'+firstInput.key+'"]')?.textContent?.trim():"";
     const formula=document.querySelector("#formula-panel ol li")?.textContent?.trim()||"";
     return {title,description,label,formula,status:window.FinPulseToolRuntime.statusFor(id,window.FinPulseI18n.locale),dir:document.documentElement.dir,locale:document.documentElement.lang};
    },{id:tool.id,firstInput:tool.firstInput});
    assert.equal(state.title,tool.title,locale+":"+tool.id+" English title fallback");
    assert.equal(state.description,tool.description,locale+":"+tool.id+" English description fallback");
    assert.equal(state.label,tool.firstInput.label,locale+":"+tool.id+" English input fallback");
    assert.ok(state.formula.length>0,locale+":"+tool.id+" formula steps rendered");
    assert.equal(state.status,locale==="en"?"source":"draft",locale+":"+tool.id+" approval status");
    assert.equal(state.dir,expectedDir,locale+":"+tool.id+" direction");
    assert.equal(state.locale,locale,locale+":"+tool.id+" document locale");
   }
  }
  await page.close();
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
});
