const test=require("node:test");
const assert=require("node:assert/strict");
const catalogue=require("../translations/tool-catalogue.json");
const mapping=require("../tool-category-mapping.json");

test("tool translation inventory covers all 220 canonical IDs exactly once",()=>{
 assert.equal(catalogue.validation.expectedToolCount,220);
 assert.equal(catalogue.tools.length,220);
 assert.equal(new Set(catalogue.tools.map(t=>t.id)).size,220);
 assert.deepEqual(catalogue.tools.map(t=>t.id).sort(),mapping.tools.map(t=>t.id).sort());
});

test("tool translation pilot has six locale title slots and preserves source metadata",()=>{
 assert.deepEqual(catalogue.supportedLocales,["en","hi","ar","ur","zh-CN","ja","ru"]);
 for(const tool of catalogue.tools){
  const source=mapping.tools.find(item=>item.id===tool.id);
  assert.equal(tool.sourceTitle,source.name);
  assert.equal(tool.category,source.category);
  assert.equal(tool.subcategory,source.subcategory);
  assert.equal(tool.sourceFile,source.sourceFile);
  for(const locale of ["hi","ar","ur","zh-CN","ja","ru"]){
   if(tool.title[locale]!==undefined)assert.ok(tool.title[locale].trim().length>0);
  }
 }
 assert.equal(catalogue.validation.translatedTitlePilotCount,10);
});
