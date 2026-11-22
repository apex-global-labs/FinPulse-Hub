const test=require("node:test");
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
const {createServer}=require("node:http");
const {readFile}=require("node:fs/promises");
const {join}=require("node:path");

test("language selector changes shared UI, RTL direction and persists without changing currency",async()=>{
 const server=createServer(async(req,res)=>{
  const path=decodeURIComponent(req.url.split("?")[0]).replace(/^\\//,"")||"index.html";
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
