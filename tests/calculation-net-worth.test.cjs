"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const Core=require("../finance-core.js");
const app=fs.readFileSync(require.resolve("../app.js"),"utf8");

test("Net worth: app runtime maps the nine form fields to the shared calculation function in order",()=>{
 assert.match(app,/\{id:"net-worth",n:"Net Worth Calculator"/);
 assert.match(app,/Core\.netWorthCalculator\(v\.cash,v\.investments,v\.property,v\.vehicles,v\.otherAssets,v\.mortgage,v\.loans,v\.cards,v\.otherDebt\)/);
});

test("Net worth: calculates assets, liabilities and net worth from the app's default inputs",()=>{
 const x=Core.netWorthCalculator(5000,15000,150000,12000,3000,110000,8000,1500,500);
 assert.equal(x.totalAssets,185000);
 assert.equal(x.totalLiabilities,120000);
 assert.equal(x.netWorth,65000);
 assert.deepEqual(x.series,[185000,120000,65000]);
 assert.match(x.note,/Point-in-time/);
});

test("Net worth: preserves a negative net worth when liabilities exceed assets",()=>{
 const x=Core.netWorthCalculator(100,200,0,0,0,500,100,50,25);
 assert.equal(x.totalAssets,300);
 assert.equal(x.totalLiabilities,675);
 assert.equal(x.netWorth,-375);
 assert.deepEqual(x.series,[300,675,-375]);
});

test("Net worth: accepts zero balances and fractional monetary amounts",()=>{
 const zero=Core.netWorthCalculator(0,0,0,0,0,0,0,0,0);
 assert.deepEqual([zero.totalAssets,zero.totalLiabilities,zero.netWorth],[0,0,0]);
 const x=Core.netWorthCalculator(10.25,20.5,30.75,40.125,50.875,5.5,6.25,7.75,8.125);
 assert.equal(x.totalAssets,152.5);
 assert.equal(x.totalLiabilities,27.625);
 assert.equal(x.netWorth,124.875);
});

test("Net worth: rejects negative balances in every input position",()=>{
 for(let i=0;i<9;i++){
  const args=Array(9).fill(0);args[i]=-0.01;
  assert.throws(()=>Core.netWorthCalculator(...args),/must not be negative/);
 }
});

test("Net worth: rejects NaN and infinite values in every input position",()=>{
 for(let i=0;i<9;i++){
  for(const invalid of [Number.NaN,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY]){
   const args=Array(9).fill(0);args[i]=invalid;
   assert.throws(()=>Core.netWorthCalculator(...args),/must be a finite number/);
  }
 }
});
