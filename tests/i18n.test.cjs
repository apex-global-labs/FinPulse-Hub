const test=require("node:test");
const assert=require("node:assert/strict");
const catalogue=require("../translations/catalogue.json");
const {create}=require("../translation-engine.js");

test("translation catalogue declares the seven supported locales and English source",()=>{
 assert.deepEqual(catalogue.supportedLocales,["en","hi","ar","ur","zh-CN","ja","ru"]);
 assert.equal(catalogue.sourceLocale,"en");
 assert.equal(catalogue.translationStatus,"shared-shell-approved-candidate");
});

test("shared shell messages exist in every supported locale",()=>{
 const keys=Object.keys(catalogue.messages.en).sort();
 for(const locale of catalogue.supportedLocales){
  assert.deepEqual(Object.keys(catalogue.messages[locale]).sort(),keys,locale+" message coverage");
 }
});

test("translation engine returns locale messages and safely falls back to English",()=>{
 const engine=create({});
 engine.setCatalogue(catalogue);
 assert.equal(engine.translate("nav.calculators"),"Calculators");
 assert.equal(engine.setLocale("hi"),true);
 assert.equal(engine.translate("nav.calculators"),"कैलकुलेटर");
 assert.equal(engine.setLocale("ar"),true);
 assert.equal(engine.translate("nav.calculators"),"الحاسبات");
 assert.equal(engine.translate("not.in.catalogue","English fallback"),"English fallback");
 assert.equal(engine.setLocale("xx"),false);
});

test("translation catalogue includes correct RTL locales",()=>{
 assert.ok(["ar","ur"].every(locale=>catalogue.supportedLocales.includes(locale)));
});

test("homepage exposes the accessible locale selector and loads the local engine",()=>{
 const fs=require("node:fs"),path=require("node:path");
 const root=path.join(__dirname,"..");
 const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
 const css=fs.readFileSync(path.join(root,"redesign.css"),"utf8");
 const deploy=fs.readFileSync(path.join(root,".github/workflows/deploy.yml"),"utf8");
 assert.match(html,/<select id="language-switcher" aria-label="Select language"><\/select>/);
 assert.match(html,/<script src="translation-engine\.js" defer><\/script>/);
 assert.match(css,/html\[dir="rtl"\] header/);
 assert.match(deploy,/cp translations\/\*\.json _site\/translations\//);
});

test("homepage category headings have stable locale keys without changing tool IDs",()=>{
 const fs=require("node:fs"),path=require("node:path");
 const app=fs.readFileSync(path.join(__dirname,"..","app.js"),"utf8");
 assert.match(app,/categoryKeys=\{"Finance & Money":"category\.finance"/);
 assert.match(app,/data-i18n=.*categoryKeys\\[group\\.name\\]/);
});
