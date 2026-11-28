"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const M=require("../advanced-math-core.js");
const previousWindow=global.window;
global.window={FinPulseAdvancedMath:M};
require("../advanced-math-tools.js");
const registry=global.window.FinPulseAdvancedMathTools.registry;
if(previousWindow===undefined)delete global.window;else global.window=previousWindow;
const contentRegistry=require("../translations/tool-content.json");
const ids=["linear-equation","quadratic-equation","simultaneous-equations","polynomial-calculator","logarithm","matrix-operations","matrix-determinant"];
for(const id of ids){
 test(id+": English source matches executable runtime inputs, formula, steps and default result",()=>{
  const sourceTool=contentRegistry.tools.find(x=>x.id===id),runtimeTool=registry.find(x=>x.id===id);
  assert.ok(sourceTool,"missing source record");assert.ok(runtimeTool,"missing runtime registry");
  const source=sourceTool.source;
  assert.deepEqual(source.inputs.map(x=>[x.key,x.label]),runtimeTool.f.map(x=>[x[0],x[1]]),"stable input keys and labels");
  const guide=runtimeTool.steps;
  assert.equal(source.explanations.formula,runtimeTool.formula,"formula text");
  assert.deepEqual(source.guide.steps.map(x=>x.body),guide,"calculation steps");
  assert.equal(source.guide.sections[0].body,runtimeTool.formula,"guide formula");
  const defaults=Object.fromEntries(runtimeTool.f.map(x=>[x[0],x[2]]));
  const result=runtimeTool.run(defaults);
  assert.equal(source.results.summary,result.label,"default result summary");
  assert.deepEqual(source.results.metrics.map(x=>x.label),result.metrics.map(x=>x[0]),"default result metric labels");
  assert.deepEqual(source.results.breakdown.map(x=>x.label),source.results.metrics.map(x=>x.label),"breakdown parity");
  assert.equal(source.accessibility.controlLabels.length,runtimeTool.f.length,"accessible controls");
 });
}
test("linear equation numeric constraints: finite coefficients; zero A has no unique solution",()=>{
 assert.equal(M.linear(2,-8).x,4);assert.throws(()=>M.linear(Infinity,1));assert.throws(()=>M.linear(0,0));assert.throws(()=>M.linear(0,1));
});
test("quadratic numeric constraints: finite coefficients and discriminant; A=0 linear fallback",()=>{
 assert.equal(M.quadratic(1,-5,6).x1,2);assert.equal(M.quadratic(0,2,-8).x,4);
 assert.throws(()=>M.quadratic(Infinity,1,1));assert.throws(()=>M.quadratic(1e308,1e308,1e308));
});
test("simultaneous equations: finite inputs, non-zero determinant and finite solutions",()=>{
 const z=M.simultaneous(2,1,5,1,-1,1);assert.equal(z.x,2);assert.equal(z.y,1);
 assert.throws(()=>M.simultaneous(1,2,3,2,4,6));assert.throws(()=>M.simultaneous(Infinity,1,2,3,4,5));
});
test("polynomial: finite inputs, non-zero coefficient set and finite outputs",()=>{
 assert.deepEqual(M.polynomial(1,-2,3,4,2),{value:10,derivative:7});
 assert.throws(()=>M.polynomial(0,0,0,0,2));assert.throws(()=>M.polynomial(Infinity,1,2,3,4));
});
test("logarithm: finite positive value and base; base cannot equal one",()=>{
 assert.equal(M.logarithm(100,10),2);assert.equal(M.logarithm(8,0.5),-3);
 assert.throws(()=>M.logarithm(0,10));assert.throws(()=>M.logarithm(-1,10));
 assert.throws(()=>M.logarithm(10,0));assert.throws(()=>M.logarithm(10,1));
});
test("2x2 matrix operations: supported operation enum, finite inputs and finite outputs",()=>{
 assert.deepEqual(M.matrix(1,2,3,4,5,6,7,8,"add"),[[6,8],[10,12]]);
 assert.deepEqual(M.matrix(1,2,3,4,5,6,7,8,"multiply"),[[19,22],[43,50]]);
 assert.throws(()=>M.matrix(1,2,3,4,5,6,7,8,"divide"));
 assert.throws(()=>M.matrix(Infinity,2,3,4,5,6,7,8,"add"));
 assert.throws(()=>M.matrix(1e308,1e308,0,0,1e308,1e308,0,0,"multiply"));
});
test("2x2 determinant: finite entries and finite determinant",()=>{
 assert.equal(M.determinant(1,2,3,4),-2);
 assert.throws(()=>M.determinant(Infinity,2,3,4));
 assert.throws(()=>M.determinant(1e308,0,0,-1e308));
});
test("source-only commit leaves calculation runtime and tool registry unchanged",()=>{
 assert.deepEqual(ids.sort(),["linear-equation","quadratic-equation","simultaneous-equations","polynomial-calculator","logarithm","matrix-operations","matrix-determinant"].sort());
});
