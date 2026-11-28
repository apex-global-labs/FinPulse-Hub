(function(root,factory){
 const api=factory();
 if(typeof module==="object"&&module.exports)module.exports=api;
 else root.FinPulseToolRuntime=api.create(root);
})(typeof globalThis!=="undefined"?globalThis:this,function(){
 "use strict";
 const TARGET_LOCALES=["hi","ar","ur","zh-CN","ja","ru"];
 const APPROVED=new Set(["approved","published"]);
 function create(host){
  let content=null,loadPromise=null;
  function setContent(value){
   if(!value||value.schemaVersion!==1||!Array.isArray(value.tools))throw new TypeError("Invalid tool translation content");
   content=value;return true;
  }
  async function load(){
   if(content)return true;if(loadPromise)return loadPromise;if(typeof host.fetch!=="function")return false;
   loadPromise=(async()=>{
    try{
     const url=new URL("translations/tool-content.json",host.document?.baseURI||host.location?.href||"http://localhost/");
     const response=await host.fetch(url.href,{cache:"no-cache",credentials:"same-origin"});
     if(!response.ok)throw new Error("Tool translation content request failed: "+response.status);
     setContent(await response.json());return true;
    }catch(error){host.console?.warn?.("Tool translations unavailable; English source remains active.",error);return false}
   })();return loadPromise;
  }
  function complete(source,fields){
   if(!fields||!fields.metadata||!fields.metadata.title?.trim()||!fields.metadata.description?.trim())return false;
   const sameKeys=(a,b)=>Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((x,i)=>x?.key===b[i]?.key);
   if(!sameKeys(fields.inputs,source.inputs)||!fields.inputs.every(x=>typeof x.label==="string"&&x.label.trim()))return false;
   const result=fields.results,base=source.results;
   if(!result?.heading?.trim()||!result?.summary?.trim()||!sameKeys(result.metrics,base.metrics)||!result.metrics.every(x=>x.label?.trim()))return false;
   if(!sameKeys(result.breakdown,base.breakdown)||!result.breakdown.every(x=>x.label?.trim()))return false;
   const exp=fields.explanations,baseExp=source.explanations;
   if(!exp?.formulaTitle?.trim()||!exp.formulaDescription?.trim()||!Array.isArray(exp.steps)||exp.steps.length!==baseExp.steps.length||!exp.steps.every(x=>typeof x==="string"&&x.trim())||!Array.isArray(exp.disclaimers)||!exp.disclaimers.length||!exp.disclaimers.every(x=>typeof x==="string"&&x.trim()))return false;
   if(!sameKeys(fields.faqs,source.faqs)||!fields.faqs.every(x=>x.question?.trim()&&x.answer?.trim()))return false;
   if(!sameKeys(fields.errors,source.errors)||!fields.errors.every(x=>x.message?.trim()&&x.recoveryHint?.trim()))return false;
   const seo=fields.seo;
   if(!seo?.title?.trim()||!seo.metaDescription?.trim()||!seo.h1?.trim()||!seo.introduction?.trim())return false;
   const access=fields.accessibility,labels=access?.controlLabels;
   if(!access?.pageLabel?.trim()||!access?.formLabel?.trim()||!access?.resultAnnouncement?.trim()||!access?.chartLabel?.trim()||!sameKeys(labels,source.inputs)||!labels.every(x=>x.label?.trim()))return false;
   return true;
  }
  function localizeDefinition(source,locale,recordOverride){
   if(!source||locale==="en"||!TARGET_LOCALES.includes(locale))return source;
   const toolRecord=(content?.tools||[]).find(item=>item.id===source.id);
   const record=recordOverride||toolRecord?.locales?.[locale];
   if(!record||!APPROVED.has(record.status)||!toolRecord?.source||!complete(toolRecord.source,record.fields))return source;
   const fields=record.fields,meta=fields.metadata,inputLabels=new Map(fields.inputs.map(item=>[item.key,item.label]));
   return {
    ...source,n:meta.title,c:meta.category?.trim()||source.c,desc:meta.description,
    f:source.f.map(field=>[field[0],inputLabels.get(field[0])||field[1],...field.slice(2)]),
    seo:{intro:fields.seo.introduction,title:fields.seo.title,metaDescription:fields.seo.metaDescription,h1:fields.seo.h1,faqs:fields.faqs.map(item=>[item.question,item.answer])},
    _translation:fields,_translationLocale:locale
   };
  }
  function statusFor(id,locale){
   if(locale==="en")return "source";
   const record=(content?.tools||[]).find(item=>item.id===id)?.locales?.[locale];
   return record?.status||"missing";
  }
  return {load,setContent,localizeDefinition,statusFor,get loaded(){return !!content},get supportedLocales(){return ["en",...TARGET_LOCALES]}};
 }
 return {create};
});
