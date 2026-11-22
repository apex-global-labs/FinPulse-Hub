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
