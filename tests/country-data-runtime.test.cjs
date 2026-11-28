const test=require("node:test");
const assert=require("node:assert/strict");
global.window=global;
const Global=require("../global-context.js");
require("../tax-data.js");
const Tax=global.FinPulseTaxData;
const Country=require("../country-data-runtime.js");
global.FinPulseGlobalContext=Global;
global.FinPulseTaxData=Tax;
test("country selection resolves a known currency without inventing an exchange rate",()=>{
 const result=Country.resolve("BD","mortgage");
 assert.equal(result.currency.status,"available");
 assert.equal(result.currency.value,"BDT");
 assert.equal(result.tax.status,"available-for-supported-tools");
 assert.equal(result.exchangeRate,undefined);
});
test("supported tax countries expose only profiles present in the active tax registry",()=>{
 for(const code of ["BD","CA","GB","US"]){
  const result=Country.resolve(code,"income-tax");
  assert.equal(result.tax.status,"selection-required");
  assert.ok(result.tax.profiles.length>0);
 }
});
test("unsupported country tax data explicitly requires manual input",()=>{
 const result=Country.resolve("JP","income-tax");
 assert.equal(result.currency.value,"JPY");
 assert.equal(result.tax.status,"manual-required");
 assert.equal(result.manualFallback,true);
});
test("countries without an unambiguous currency require manual currency input",()=>{
 const result=Country.resolve("AQ","mortgage");
 assert.equal(result.currency.status,"manual-required");
 assert.equal(result.currency.value,null);
});
test("missing automatic field produces a manual-entry state",()=>{
 assert.deepEqual(Country.resolveInput("interestRate",null),{value:null,mode:"manual",status:"user-input-required",field:"interestRate"});
});
test("manual input is preserved and never mislabeled automatic",()=>{
 assert.deepEqual(Country.applyManualInput("interestRate","7.25"),{field:"interestRate",value:"7.25",mode:"manual",status:"user-provided"});
 assert.throws(()=>Country.applyManualInput("interestRate","  "),/cannot be empty/);
});
