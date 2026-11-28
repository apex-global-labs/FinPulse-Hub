"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const Core=require("../finance-core.js");

test("Emergency fund: calculates target, gap, coverage and progress",()=>{
 const x=Core.emergencyFundCalculator(2500,6,5000);
 assert.equal(x.target,15000);
 assert.equal(x.currentSavings,5000);
 assert.equal(x.gap,10000);
 assert.equal(x.coverageMonths,2);
 assert.ok(Math.abs(x.progressPct-(100/3))<1e-12);
 assert.deepEqual(x.series,[5000,15000]);
});

test("Emergency fund: savings at or above target produce zero gap and capped progress",()=>{
 const at=Core.emergencyFundCalculator(2000,3,6000);
 assert.equal(at.gap,0);
 assert.equal(at.progressPct,100);
 const above=Core.emergencyFundCalculator(2000,3,9000);
 assert.equal(above.gap,0);
 assert.equal(above.progressPct,100);
 assert.equal(above.coverageMonths,4.5);
});

test("Emergency fund: accepts the 24-month maximum and fractional months",()=>{
 assert.equal(Core.emergencyFundCalculator(1000,24,0).target,24000);
 assert.equal(Core.emergencyFundCalculator(1000,1.5,0).target,1500);
});

test("Emergency fund: zero current savings is valid",()=>{
 const x=Core.emergencyFundCalculator(1800,3,0);
 assert.equal(x.target,5400);
 assert.equal(x.gap,5400);
 assert.equal(x.coverageMonths,0);
 assert.equal(x.progressPct,0);
});

test("Emergency fund: rejects invalid expenses, months, savings and non-finite inputs",()=>{
 for(const args of [
  [0,6,100],[ -1,6,100],[2500,0,100],[2500,-1,100],[2500,24.01,100],
  [2500,6,-1],[Number.NaN,6,100],[2500,Number.POSITIVE_INFINITY,100],[2500,6,Number.NaN]
 ]) assert.throws(()=>Core.emergencyFundCalculator(...args));
});
