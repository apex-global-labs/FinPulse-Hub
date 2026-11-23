const test=require("node:test");
const assert=require("node:assert/strict");
const content=require("../translations/tool-content.json");
const {create}=require("../tool-content-runtime.js");
const pilot=["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings"];
const locales=["hi","ar","ur","zh-CN","ja","ru"];
function definition(tool){
 return {id:tool.id,n:tool.source.title,c:tool.source.category,desc:tool.source.description,f:tool.source.inputs.map(input=>[input.key,input.label,0]),run:()=>({})};
}
test("runtime loads canonical tool translation content and identifies all six target locales",async()=>{
 const runtime=create({fetch:async()=>({ok:true,json:async()=>content}),document:{baseURI:"https://example.test/FinPulse-Hub/"}});
 assert.equal(await runtime.load(),true);
 assert.equal(runtime.loaded,true);
 assert.deepEqual(runtime.supportedLocales,["en",...locales]);
});
test("unapproved draft records always preserve the complete English tool definition",async()=>{
 const runtime=create({});
 runtime.setContent(content);
 for(const id of pilot){
  const tool=content.tools.find(item=>item.id===id),source=definition(tool);
  for(const locale of locales){
   assert.equal(runtime.statusFor(id,locale),"draft");
   assert.strictEqual(runtime.localizeDefinition(source,locale),source,id+":"+locale+" draft fallback");
  }
 }
});
test("approved complete locale records localize tool metadata and input labels without changing IDs or input values",()=>{
 const runtime=create({});
 runtime.setContent(content);
 const tool=content.tools.find(item=>item.id==="loan"),source=definition(tool);
 const approved=structuredClone(tool.locales.hi);approved.status="approved";
 const localized=runtime.localizeDefinition(source,"hi",approved);
 assert.notStrictEqual(localized,source);
 assert.equal(localized.n,approved.fields.metadata.title);
 assert.equal(localized.desc,approved.fields.metadata.description);
 assert.deepEqual(localized.f.map(field=>field[0]),source.f.map(field=>field[0]));
 assert.deepEqual(localized.f.map(field=>field[2]),source.f.map(field=>field[2]));
 assert.deepEqual(localized.f.map(field=>field[1]),approved.fields.inputs.map(field=>field.label));
 assert.equal(localized._translation.explanations.steps.length,source.f.length+1);
 assert.equal(localized._translationLocale,"hi");
});
test("missing or incomplete approved records fall back to the entire English tool definition",()=>{
 const runtime=create({});
 runtime.setContent(content);
 const tool=content.tools.find(item=>item.id==="loan"),source=definition(tool);
 const incomplete=structuredClone(tool.locales.hi);incomplete.status="approved";incomplete.fields.inputs.pop();
 assert.strictEqual(runtime.localizeDefinition(source,"hi",incomplete),source);
 const missing=structuredClone(tool.locales.hi);missing.status="approved";missing.fields.seo.metaDescription="";
 assert.strictEqual(runtime.localizeDefinition(source,"hi",missing),source);
 const pending=structuredClone(tool.locales.hi);pending.status="linguistic-reviewed";
 assert.strictEqual(runtime.localizeDefinition(source,"hi",pending),source);
});
test("unsupported locale and English source always use canonical English definition",()=>{
 const runtime=create({});runtime.setContent(content);
 const tool=content.tools.find(item=>item.id==="loan"),source=definition(tool);
 assert.strictEqual(runtime.localizeDefinition(source,"en"),source);
 assert.strictEqual(runtime.localizeDefinition(source,"fr"),source);
});
