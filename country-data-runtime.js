(function(root,factory){const api=factory(root);if(typeof module==="object"&&module.exports)module.exports=api;else root.FinPulseCountryData=factory(root)})(typeof globalThis!=="undefined"?globalThis:this,function(root){"use strict";
const TAX_COUNTRIES=Object.freeze({BD:["BD-2026-general","BD-2026-women-senior","BD-2026-third-gender-disability","BD-2026-freedom-fighter"],CA:["CA-2026-AB","CA-2026-BC","CA-2026-MB","CA-2026-NB","CA-2026-NL","CA-2026-NT","CA-2026-NS","CA-2026-NU","CA-2026-ON","CA-2026-PE","CA-2026-SK","CA-2026-YT","CA-2026-QC"],GB:["UK-2026-eng","UK-2026-sct"],US:["US-2026-single","US-2026-joint","US-2026-separate","US-2026-hoh"]});
function resolve(countryCode,toolId){
 const context=root.FinPulseGlobalContext,taxData=root.FinPulseTaxData;
 const country=context&&context.getCountry(countryCode);
 if(!country)return{countryCode:null,toolId:toolId||null,currency:{status:"manual-required",value:null},tax:{status:"manual-required",profiles:[]},manualFallback:true};
 const currency=country.primaryCurrency?{status:"available",value:country.primaryCurrency,source:"ISO/CLDR country-currency snapshot"}:{status:"manual-required",value:null};
 const profileIds=TAX_COUNTRIES[countryCode]||[];
 const profiles=profileIds.filter(id=>taxData&&taxData.profiles&&taxData.profiles[id]).map(id=>({id,label:taxData.profiles[id].label,currency:taxData.profiles[id].currency}));
 const taxRelevant=["income-tax","salary","paycheck","payroll","tax","tax-refund"].includes(toolId);
 const tax=profiles.length?{status:taxRelevant?"selection-required":"available-for-supported-tools",profiles}:{status:"manual-required",profiles:[]};
 return{countryCode,countryName:country.name,toolId:toolId||null,currency,tax,manualFallback:currency.status!=="available"||(taxRelevant&&tax.status!=="available-for-supported-tools"),asOf:context.metadata.snapshotDate};
}
function resolveInput(field,automaticValue){
 if(automaticValue!==undefined&&automaticValue!==null&&automaticValue!=="")return{value:automaticValue,mode:"automatic",status:"available"};
 return{value:null,mode:"manual",status:"user-input-required",field:String(field||"value")};
}
function applyManualInput(field,value){
 if(typeof value==="string"&&!value.trim())throw new TypeError("Manual input cannot be empty.");
 if(value===undefined||value===null||value==="")throw new TypeError("Manual input is required.");
 return{field:String(field||"value"),value,mode:"manual",status:"user-provided"};
}
return Object.freeze({version:1,resolve,resolveInput,applyManualInput,supportedTaxCountries:Object.freeze(Object.keys(TAX_COUNTRIES))});
});
