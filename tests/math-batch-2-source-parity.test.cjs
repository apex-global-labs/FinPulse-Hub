"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const M = require("../math-core.js");

const previousWindow = global.window;
global.window = { FinPulseMath: M };
require("../math-tools.js");
const runtime = global.window.FinPulseMathTools.registry;
if (previousWindow === undefined) delete global.window;
else global.window = previousWindow;

const contentRegistry = JSON.parse(fs.readFileSync(path.join(__dirname, "../translations/tool-content.json"), "utf8"));
const ids = [
  "nth-root", "factorial", "gcd", "lcm", "prime-checker",
  "prime-factorization", "modulo", "pythagorean", "circle", "triangle-area"
];

for (const id of ids) {
  test(id + ": extracted source matches executable runtime metadata exactly", () => {
    const sourceTool = contentRegistry.tools.find(x => x.id === id);
    const runtimeTool = runtime.find(x => x.id === id);
    assert.ok(sourceTool, "missing source registry record");
    assert.ok(runtimeTool, "missing runtime registry record");
    const source = sourceTool.source;
    assert.deepEqual(
      source.inputs.map(x => [x.key, x.label]),
      runtimeTool.f.map(x => [x[0], x[1]]),
      "input stable keys and labels"
    );
    assert.equal(runtimeTool.formula, source.explanations.formula, "formula text");
    assert.deepEqual(runtimeTool.steps, source.guide.steps.map(x => x.body), "guide steps");
    assert.equal(source.guide.sections[0].body, runtimeTool.formula, "calculation-method section");
    const defaults = Object.fromEntries(runtimeTool.f.map(x => [x[0], x[2]]));
    const result = runtimeTool.run(defaults);
    assert.equal(result.label, source.results.summary, "result summary");
    assert.deepEqual(result.metrics.map(x => x[0]), source.results.metrics.map(x => x.label), "result metric labels");
    assert.deepEqual(source.results.breakdown.map(x => x.label), source.results.metrics.map(x => x.label), "breakdown labels");
  });
}

test("nth-root numeric constraints: finite radicand and safe integer index 1..99", () => {
  assert.equal(M.nthRoot(-8, 3), -2);
  assert.equal(M.nthRoot(16, 1), 16);
  assert.ok(Number.isFinite(M.nthRoot(2, 99)));
  assert.throws(() => M.nthRoot(-4, 2));
  assert.throws(() => M.nthRoot(2, 0));
  assert.throws(() => M.nthRoot(2, 100));
  assert.throws(() => M.nthRoot(Infinity, 3));
  assert.throws(() => M.nthRoot(2, 1.5));
});

test("factorial numeric constraints: safe integer 0..170", () => {
  assert.equal(M.factorial(0), 1);
  assert.equal(M.factorial(1), 1);
  assert.ok(Number.isFinite(M.factorial(170)));
  assert.throws(() => M.factorial(-1));
  assert.throws(() => M.factorial(171));
  assert.throws(() => M.factorial(2.5));
  assert.throws(() => M.factorial(Number.MAX_SAFE_INTEGER + 1));
});

test("GCD numeric constraints: safe integers, negatives accepted, gcd(0,0)=0", () => {
  assert.equal(M.gcd(-48, 18), 6);
  assert.equal(M.gcd(0, 0), 0);
  assert.equal(M.gcd(Number.MAX_SAFE_INTEGER, 1), 1);
  assert.throws(() => M.gcd(1.5, 2));
  assert.throws(() => M.gcd(Number.MAX_SAFE_INTEGER + 1, 2));
});

test("LCM numeric constraints: safe integer inputs and safe integer output", () => {
  assert.equal(M.lcm(-12, 18), 36);
  assert.equal(M.lcm(0, 18), 0);
  assert.equal(M.lcm(12, 18), 36);
  assert.throws(() => M.lcm(1.5, 2));
  assert.throws(() => M.lcm(Number.MAX_SAFE_INTEGER, 2));
});

test("prime checker constraints: safe integers up to 1e12", () => {
  assert.equal(M.isPrime(2), true);
  assert.equal(M.isPrime(1), false);
  assert.equal(M.isPrime(-7), false);
  assert.equal(M.isPrime(1e12), false);
  assert.throws(() => M.isPrime(1e12 + 1));
  assert.throws(() => M.isPrime(2.5));
});

test("prime factorization constraints: integer range 2..1e12", () => {
  assert.deepEqual(M.primeFactors(360), [[2, 3], [3, 2], [5, 1]]);
  assert.deepEqual(M.primeFactors(1e12), [[2, 12], [5, 12]]);
  assert.throws(() => M.primeFactors(1));
  assert.throws(() => M.primeFactors(1e12 + 1));
  assert.throws(() => M.primeFactors(2.5));
});

test("modulo constraints: finite operands and non-zero divisor; normalized remainder", () => {
  assert.equal(M.modulo(-7, 3), 2);
  assert.equal(M.modulo(-7, -3), 2);
  assert.equal(M.modulo(7, -3), 1);
  assert.throws(() => M.modulo(2, 0));
  assert.throws(() => M.modulo(Infinity, 3));
});

test("Pythagorean constraints: finite non-negative sides and at least one positive side", () => {
  assert.equal(M.pythagorean(3, 4), 5);
  assert.equal(M.pythagorean(0, 5), 5);
  assert.throws(() => M.pythagorean(0, 0));
  assert.throws(() => M.pythagorean(-3, 4));
  assert.throws(() => M.pythagorean(Infinity, 4));
});

test("circle constraints: finite non-negative radius and finite derived measurements", () => {
  assert.deepEqual(M.circle(0), { diameter: 0, circumference: 0, area: 0 });
  assert.equal(M.circle(5).area, 25 * Math.PI);
  assert.throws(() => M.circle(-1));
  assert.throws(() => M.circle(Infinity));
  assert.throws(() => M.circle(1e308));
});

test("triangle-area constraints: finite non-negative dimensions and finite area", () => {
  assert.equal(M.triangleArea(10, 6), 30);
  assert.equal(M.triangleArea(0, 6), 0);
  assert.throws(() => M.triangleArea(-1, 6));
  assert.throws(() => M.triangleArea(10, Infinity));
  assert.throws(() => M.triangleArea(1e308, 1e308));
});
