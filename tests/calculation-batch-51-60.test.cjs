"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const MathCore = require("../math-core.js");

const mathTools = fs.readFileSync(require.resolve("../math-tools.js"), "utf8");
const registry = JSON.parse(fs.readFileSync(require.resolve("../data/calculation-registry.json"), "utf8"));
const catalogue = JSON.parse(fs.readFileSync(require.resolve("../translations/tool-catalogue.json"), "utf8"));

const expected = [
  ["proportion", "FinPulseMath.proportion", ["a", "b", "c"], "x=c*b/a."],
  ["average", "FinPulseMath.average", ["a", "b", "c"], "mean=sum(values[i]/values.length) for all supplied values."],
  ["percentage-change", "FinPulseMath.percentageChange", ["old", "new"], "percentageChange=(newValue-oldValue)/abs(oldValue)*100."],
  ["percent-error", "FinPulseMath.percentError", ["actual", "expected"], "percentError=abs(actual-expected)/abs(expected)*100."],
  ["rounding", "FinPulseMath.roundTo", ["value", "places", "mode"], "scale=10^places; up uses ceil(value*scale)/scale; down uses floor(value*scale)/scale; nearest uses Math.round(value*scale+EPSILON)/scale (the positive epsilon preserves JavaScript tie-toward-positive-infinity behavior for negative halves)."],
  ["significant-figures", "FinPulseMath.significant", ["value", "figures"], "For nonzero values, result=Number(value.toPrecision(figures)); zero returns zero."],
  ["scientific-notation", "FinPulseMath.scientific", ["value", "figures"], "result=value.toExponential(figures-1)."],
  ["exponent", "FinPulseMath.power", ["base", "exponent"], "result=base**exponent."],
  ["square-root", "FinPulseMath.nthRoot(value, 2)", ["value"], "squareRoot=sqrt(value) using the nthRoot implementation with n=2."],
  ["cube-root", "FinPulseMath.nthRoot(value, 3)", ["value"], "cubeRoot=cbrt(value) using signed Math.pow(abs(value),1/3) with n=3."]
];

test("Batch 3 #51–60 catalogue, runtime handlers and extracted calculation registry agree", () => {
  assert.deepEqual(catalogue.tools.slice(50, 60).map(x => x.id), expected.map(x => x[0]));
  for (const [id, fn, inputKeys, formula] of expected) {
    const item = catalogue.tools.find(x => x.id === id);
    const row = registry.tools.find(x => x.toolId === id);
    assert.ok(item, id + " missing from canonical catalogue");
    assert.ok(row, id + " missing from calculation registry");
    assert.equal(item.sourceFile, "math-tools.js", id + " catalogue source module mismatch");
    assert.equal(row.sourceModule, "math-tools.js", id + " registry source module mismatch");
    assert.equal(row.runtimeFunction, fn, id + " runtime function mismatch");
    assert.equal(row.status, "extracted", id + " remains unpromoted until independent regression passes");
    assert.deepEqual(row.calculation.inputs, inputKeys, id + " input order mismatch");
    assert.equal(row.calculation.formula, formula, id + " formula metadata mismatch");
    assert.ok(row.calculation.constraints?.length, id + " constraints missing");
    assert.ok(row.calculation.outputs?.length, id + " outputs missing");
    assert.ok(row.calculation.sourceReferences?.length, id + " source references missing");
    assert.ok(mathTools.includes('mk("' + id + '"'), id + " tool registration missing");
    if (id === "square-root" || id === "cube-root") {
      assert.ok(mathTools.includes("M.nthRoot("), id + " fixed-index nth-root handler missing");
    } else {
      assert.ok(mathTools.includes("M." + fn.split(".")[1] + "("), id + " runtime invocation missing");
    }
  }
});

test("Proportion matches cross-multiplication reference and rejects invalid denominator or overflow", () => {
  assert.equal(MathCore.proportion(2, 3, 8).value, 12);
  assert.equal(MathCore.proportion(4, 5, 0).value, 0);
  assert.equal(MathCore.proportion(7, 2, 14).value, 4);
  assert.throws(() => MathCore.proportion(0, 3, 8));
  assert.throws(() => MathCore.proportion(2, 0, 8));
  assert.throws(() => MathCore.proportion(2, 3, -1));
  assert.throws(() => MathCore.proportion(1, 3, Number.MAX_VALUE));
});

test("Average matches independent arithmetic mean and rejects empty or non-finite inputs", () => {
  assert.equal(MathCore.average([10, 20, 30]), 20);
  assert.equal(MathCore.average([-5, 5]), 0);
  assert.equal(MathCore.average([7]), 7);
  assert.equal(MathCore.average([1, 2, 3, 4]), 2.5);
  assert.throws(() => MathCore.average([]));
  assert.throws(() => MathCore.average("1,2,3"));
  assert.throws(() => MathCore.average([1, Infinity]));
  assert.throws(() => MathCore.average([1, NaN]));
});

test("Percentage change preserves signed direction and uses absolute original denominator", () => {
  assert.equal(MathCore.percentageChange(80, 100), 25);
  assert.equal(MathCore.percentageChange(100, 80), -20);
  assert.equal(MathCore.percentageChange(-100, -50), 50);
  assert.equal(MathCore.percentageChange(-100, 0), 100);
  assert.throws(() => MathCore.percentageChange(0, 1));
  assert.throws(() => MathCore.percentageChange(1, Infinity));
});

test("Percent error is absolute and rejects zero expected value", () => {
  assert.equal(MathCore.percentError(48, 50), 4);
  assert.equal(MathCore.percentError(52, 50), 4);
  assert.equal(MathCore.percentError(-48, -50), 4);
  assert.equal(MathCore.percentError(0, 50), 100);
  assert.throws(() => MathCore.percentError(1, 0));
  assert.throws(() => MathCore.percentError(NaN, 1));
});

test("Rounding modes, negative values and decimal-place boundaries are deterministic", () => {
  assert.equal(MathCore.roundTo(123.4567, 2, "nearest"), 123.46);
  assert.equal(MathCore.roundTo(1.231, 2, "up"), 1.24);
  assert.equal(MathCore.roundTo(1.239, 2, "down"), 1.23);
  assert.equal(MathCore.roundTo(-1.231, 2, "up"), -1.23);
  assert.equal(MathCore.roundTo(-1.231, 2, "down"), -1.24);
  assert.equal(MathCore.roundTo(1.5, 0, "nearest"), 2);
  assert.equal(MathCore.roundTo(-1.5, 0, "nearest"), -1);
  assert.equal(MathCore.roundTo(1.234567890123, 12, "nearest"), 1.234567890123);
  assert.throws(() => MathCore.roundTo(1, -1));
  assert.throws(() => MathCore.roundTo(1, 13));
  assert.throws(() => MathCore.roundTo(1, 1.5));
  assert.throws(() => MathCore.roundTo(1, 2, "ceiling"));
  assert.throws(() => MathCore.roundTo(1e308, 12));
});

test("Significant figures preserve sign, zero and the 1–15 digit boundary", () => {
  assert.equal(MathCore.significant(12345.678, 4), 12350);
  assert.equal(MathCore.significant(-0.012345, 3), -0.0123);
  assert.equal(MathCore.significant(0, 15), 0);
  assert.equal(MathCore.significant(9.99, 2), 10);
  assert.equal(MathCore.significant(1.234567890123456, 15), 1.23456789012346);
  assert.throws(() => MathCore.significant(1, 0));
  assert.throws(() => MathCore.significant(1, 16));
  assert.throws(() => MathCore.significant(1, 1.5));
  assert.throws(() => MathCore.significant(Infinity, 3));
});

test("Scientific notation preserves signed values and requested precision", () => {
  assert.equal(MathCore.scientific(1250000, 4), "1.250e+6");
  assert.equal(MathCore.scientific(-0.00125, 3), "-1.25e-3");
  assert.equal(MathCore.scientific(0, 6), "0.00000e+0");
  assert.equal(MathCore.scientific(12.345, 1), "1e+1");
  assert.throws(() => MathCore.scientific(1, 0));
  assert.throws(() => MathCore.scientific(1, 16));
  assert.throws(() => MathCore.scientific(1, 1.5));
  assert.throws(() => MathCore.scientific(NaN, 3));
});

test("Exponentiation matches reference powers and rejects non-finite results", () => {
  assert.equal(MathCore.power(2, 10), 1024);
  assert.equal(MathCore.power(-2, 3), -8);
  assert.equal(MathCore.power(9, 0.5), 3);
  assert.equal(MathCore.power(0, 3), 0);
  assert.equal(MathCore.power(0, 0), 1);
  assert.throws(() => MathCore.power(1e308, 2));
  assert.throws(() => MathCore.power(-1, 0.5));
  assert.throws(() => MathCore.power(0, -1));
  assert.throws(() => MathCore.power(Infinity, 2));
});

test("Square root enforces the real non-negative domain and exact index mapping", () => {
  assert.equal(MathCore.nthRoot(144, 2), 12);
  assert.equal(MathCore.nthRoot(0, 2), 0);
  assert.ok(Math.abs(MathCore.nthRoot(2, 2) ** 2 - 2) < 1e-12);
  assert.throws(() => MathCore.nthRoot(-4, 2));
  assert.throws(() => MathCore.nthRoot(Infinity, 2));
});

test("Cube root supports negative values and preserves sign", () => {
  assert.ok(Math.abs(MathCore.nthRoot(125, 3) - 5) < 1e-12);
  assert.equal(MathCore.nthRoot(-8, 3), -2);
  assert.equal(MathCore.nthRoot(0, 3), 0);
  assert.ok(Math.abs(MathCore.nthRoot(-2, 3) ** 3 + 2) < 1e-12);
  assert.throws(() => MathCore.nthRoot(1, 0));
  assert.throws(() => MathCore.nthRoot(1, 100));
  assert.throws(() => MathCore.nthRoot(1, 2.5));
});
