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
