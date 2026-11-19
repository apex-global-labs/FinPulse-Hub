const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const M=require("../math-core.js");
const A=require("../advanced-math-core.js");
global.window=global;
global.FinPulseMath=M;
global.FinPulseAdvancedMath=A;
require("../math-tools.js");
require("../advanced-math-tools.js");
const basic=global.FinPulseMathTools.registry,advanced=global.FinPulseAdvancedMathTools.registry;
const near=(x,y,t=1e-8)=>assert.ok(Math.abs(x-y)<=t,String(x)+" != "+String(y));

test("all 25 basic math tools have verified formula and step-by-step guides",()=>{
 assert.equal(basic.length,25);
 for(const tool of basic){assert.ok(tool.formula,tool.id+" formula");assert.ok(Array.isArray(tool.steps)&&tool.steps.length>=3,tool.id+" steps");assert.ok(tool.steps.every(s=>typeof s==="string"&&s.length>10),tool.id+" step text");}
});
test("all 20 advanced math tools have verified formula and step-by-step guides",()=>{
 assert.equal(advanced.length,20);
 for(const tool of advanced){assert.ok(tool.formula,tool.id+" formula");assert.ok(Array.isArray(tool.steps)&&tool.steps.length>=3,tool.id+" steps");assert.ok(tool.steps.every(s=>typeof s==="string"&&s.length>10),tool.id+" step text");}
});
test("basic math rejects invalid fraction, ratio and rounding domains",()=>{
 assert.deepEqual(M.fraction(-18,-24),{numerator:3,denominator:4,value:.75});
 assert.throws(()=>M.fraction(1,0));
 assert.throws(()=>M.mixed(2,-1,3));
 assert.deepEqual(M.mixed(-2,1,3),{numerator:-7,denominator:3,value:-7/3});
 assert.throws(()=>M.ratio(1.5,2));
 assert.throws(()=>M.ratio(0,0));
 assert.throws(()=>M.roundTo(1e308,12));
});
test("basic math handles numeric limits without silently returning Infinity",()=>{
 near(M.average([1e308,1e308]),1e308,1e292);
 assert.throws(()=>M.percentageChange(-1e308,1e308));
 assert.throws(()=>M.circle(1e308));
 assert.throws(()=>M.triangleArea(1e308,1e308));
 assert.throws(()=>M.power(1e308,2));
 near(M.nthRoot(-8,3),-2);
});
test("advanced equation and matrix solvers distinguish exact singularity from small determinants",()=>{
 near(A.linear(2,-8).x,4);
 assert.throws(()=>A.linear(0,0));
 const s=A.simultaneous(1,1,2,1,1+1e-15,3);
 assert.ok(Number.isFinite(s.x)&&Number.isFinite(s.y));
 const inv=A.inverse(1,1,1,1+1e-15);
 assert.ok(inv.flat().every(Number.isFinite));
 assert.throws(()=>A.inverse(1,2,2,4));
});
test("advanced complex, probability, statistics and confidence domains",()=>{
 const z=A.complex(3,2,1,-4,"divide");near(z.real,-5/17);near(z.imag,14/17);
 assert.throws(()=>A.complex(1,2,0,0,"divide"));
 near(A.probability(0,1,"or"),1);
 assert.throws(()=>A.probability(.2,.3,"unknown"));
 assert.throws(()=>A.variance([1],"sample"));
 assert.throws(()=>A.zScore(1,1,0));
 assert.throws(()=>A.correlation([1,1],[2,3]));
 assert.throws(()=>A.regression([1,1],[2,3]));
 assert.throws(()=>A.confidence(1,2,1,95));
});
test("paired statistics remain stable for large finite inputs",()=>{
 near(A.stats([1e308,1e308]).mean,1e308,1e292);
 near(A.correlation([1e150,2e150,3e150],[2e150,4e150,6e150]),1);
 const r=A.regression([1e150,2e150,3e150],[3e150,5e150,7e150]);
 assert.ok(Number.isFinite(r.slope)&&Number.isFinite(r.intercept));
 near(r.rSquared,1,1e-8);
});
test("sequence, series, correlation and regression tools expose appropriate charts",()=>{
 const sequence=advanced.find(x=>x.id==="sequence-calculator").run({kind:"arithmetic",a:3,r:2,n:10});
 assert.equal(sequence.chartType,"line");assert.equal(sequence.series.length,10);
 const series=advanced.find(x=>x.id==="series-sum").run({kind:"geometric",a:2,r:2,n:4});
 assert.equal(series.chartType,"line");assert.deepEqual(series.series,[2,6,14,30]);
 const pairs={x1:1,x2:2,x3:3,x4:4,x5:5,y1:3,y2:5,y3:7,y4:9,y5:11};
 const corr=advanced.find(x=>x.id==="correlation").run(pairs);
 assert.equal(corr.chartType,"scatter");assert.deepEqual(corr.chartLabels,[1,2,3,4,5]);
 const reg=advanced.find(x=>x.id==="linear-regression").run(pairs);
 assert.equal(reg.chartType,"scatter");assert.deepEqual(reg.fitSeries,[3,5,7,9,11]);
});
test("shared renderer supports math formula guides and accessible scatter plots",()=>{
 const app=fs.readFileSync("app.js","utf8");
 assert.match(app,/d\\.formula&&Array\\.isArray\\(d\\.steps\\)/);
 assert.match(app,/function scatterGraph/);
 assert.match(app,/role="img" aria-label="Scatter plot of paired observations and fitted line"/);
 assert.match(app,/graph\\(r\\.series,chartUnit,r\\.chartLabels,r\\.chartType,r\\.fitSeries\\)/);
});
