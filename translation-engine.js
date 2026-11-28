(function(root,factory){
 const api=factory();
 if(typeof module==="object"&&module.exports)module.exports=api;
 else root.FinPulseI18n=api.create(root);
})(typeof globalThis!=="undefined"?globalThis:this,function(){
 "use strict";
 function create(host){
  let catalogue=null,locale="en",missing=new Set();
  const RTL=new Set(["ar","ur"]);
  function supported(){return catalogue?.supportedLocales||["en","hi","ar","ur","zh-CN","ja","ru"]}
  function translate(key,fallback){
   const messages=catalogue?.messages||{};
   const value=messages[locale]?.[key]??messages.en?.[key]??fallback??key;
   if(!messages[locale]?.[key]&&!messages.en?.[key])missing.add(locale+":"+key);
   return String(value);
  }
  function apply(){
   const doc=host.document;if(!doc)return;
   doc.documentElement.lang=locale;doc.documentElement.dir=RTL.has(locale)?"rtl":"ltr";
   doc.documentElement.dataset.locale=locale;
   doc.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=translate(el.getAttribute("data-i18n"),el.textContent)});
   doc.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{el.setAttribute("placeholder",translate(el.getAttribute("data-i18n-placeholder"),el.getAttribute("placeholder")||""))});
   doc.querySelectorAll("[data-i18n-aria-label]").forEach(el=>{el.setAttribute("aria-label",translate(el.getAttribute("data-i18n-aria-label"),el.getAttribute("aria-label")||""))});
   const picker=doc.getElementById("language-switcher");if(picker&&picker.value!==locale)picker.value=locale;
   const settingsPicker=doc.getElementById("global-locale");if(settingsPicker&&settingsPicker.value!==locale)settingsPicker.value=locale;
  }
  function setCatalogue(value){if(!value||value.schemaVersion!==1||!value.messages||!value.messages.en)throw new TypeError("Invalid translation catalogue");catalogue=value;if(!supported().includes(locale))locale="en";apply();return true}
  function setLocale(value){
   if(!supported().includes(value))return false;
   locale=value;
   const context=host.FinPulseGlobalContext;if(context&&context.get().locale!==value)context.setLocale(value);
   apply();return true;
  }
  function init(){
   const context=host.FinPulseGlobalContext;
   if(context){locale=context.get().locale||"en";host.addEventListener("finpulse:global-context-change",event=>{const next=event.detail?.locale;if(next&&next!==locale){locale=next;apply()}})}
   const picker=host.document?.getElementById("language-switcher");
   if(picker&&context){
    picker.innerHTML=context.locales.map(item=>'<option value="'+item.code+'">'+item.name+'</option>').join("");
    picker.value=locale;picker.addEventListener("change",()=>setLocale(picker.value));
   }
   apply();
   const settings=context&&host.document?.getElementById("global-locale");
   if(settings&&context)settings.addEventListener("change",()=>setLocale(settings.value));
   return api;
  }
  const api={init,apply,setLocale,setCatalogue,translate,get locale(){return locale},get supportedLocales(){return supported().slice()},get missingKeys(){return [...missing]}};
  return api;
 }
 return {create};
});

(function(root){
 "use strict";
 const engine=root.FinPulseI18n;if(!engine||!root.document)return;
 engine.init();
 const script=[...root.document.scripts].find(item=>item.src.includes("translation-engine.js"));
 if(!script||typeof root.fetch!=="function")return;
 const url=new URL("translations/catalogue.json",script.src);
 root.FinPulseI18nReady=root.fetch(url.href,{credentials:"same-origin"}).then(response=>{if(!response.ok)throw Error("Translation catalogue request failed: "+response.status);return response.json()}).then(data=>engine.setCatalogue(data)).catch(error=>{root.console?.warn("FinPulse translations unavailable; English remains active.",error);return false});
})(typeof window!=="undefined"?window:globalThis);
