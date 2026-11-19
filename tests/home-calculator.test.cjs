const test=require("node:test");const assert=require("node:assert/strict");const {evaluate}=require("../home-calculator-core.js");
test("basic arithmetic and precedence",()=>{assert.equal(evaluate("2+3*4"),14);assert.equal(evaluate("(2+3)*4"),20);assert.equal(evaluate("10/2-1"),4)});
test("unary, exponent, and percent",()=>{assert.equal(evaluate("-3^2"),9);assert.equal(evaluate("2^3^2"),512);assert.equal(evaluate("50%*200"),100)});
test("scientific functions and constants",()=>{assert.ok(Math.abs(evaluate("sin(pi/2)")-1)<1e-12);assert.equal(evaluate("cos(0)"),1);assert.equal(evaluate("sqrt(81)"),9);assert.equal(evaluate("log(100)"),2);assert.ok(Math.abs(evaluate("ln(e")-1)<1e-12)});
test("rejects unsafe or invalid expressions",()=>{for(const x of ["1/0","alert(1)","2+","sqrt(-1)","log(0)","1..2"])assert.throws(()=>evaluate(x))});
