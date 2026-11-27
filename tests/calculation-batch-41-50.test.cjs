"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const Core = require("../finance-core.js");
const MathCore = require("../math-core.js");

const app = fs.readFileSync(require.resolve("../app.js"), "utf8");
const mathTools = fs.readFileSync(require.resolve("../math-tools.js"), "utf8");
const registry = JSON.parse(fs.readFileSync(require.resolve("../data/calculation-registry.json"), "utf8"));
const catalogue = JSON.parse(fs.readFileSync(require.resolve("../translations/tool-catalogue.json"), "utf8"));

const expected = [
  ["business-roi", "Core.businessROI", "app.js", ["investment", "value"]],
  ["cash-flow", "Core.cashFlowProjection", "app.js", ["opening", "inflows", "outflows", "inflowGrowth", "outflowGrowth", "periods"]],
  ["rental-yield", "Core.rentalYieldCalculator", "app.js", ["price", "rent", "vacancy", "costs"]],
  ["emergency-fund", "Core.emergencyFundCalculator", "app.js", ["expenses", "months", "current"]],
  ["net-worth", "Core.netWorthCalculator", "app.js", ["cash", "investments", "property", "vehicles", "otherAssets", "mortgage", "loans", "cards", "otherDebt"]],
  ["basic-arithmetic", "FinPulseMath.arithmetic", "math-tools.js", ["a", "op", "b"]],
  ["fraction", "FinPulseMath.fraction", "math-tools.js", ["numerator", "denominator"]],
  ["mixed-number", "FinPulseMath.mixed", "math-tools.js", ["whole", "numerator", "denominator"]],
  ["decimal-fraction", "FinPulseMath.decimalFraction", "math-tools.js", ["value", "maxDen"]],
  ["ratio", "FinPulseMath.ratio", "math-tools.js", ["a", "b"]]
];

test("Batch 2 #41–50 catalogue order, runtime mapping and calculation registry agree", () => {
  const catalogueIds = catalogue.tools.slice(40, 50).map(x => x.id);
  assert.deepEqual(catalogueIds, expected.map(x => x[0]));
  for (const [id, fn, sourceFile, inputKeys] of expected) {
    const item = catalogue.tools.find(x => x.id === id);
    const row = registry.tools.find(x => x.toolId === id);
    assert.ok(item, id + " missing from canonical catalogue");
    assert.ok(row, id + " missing from calculation registry");
    assert.equal(item.sourceFile, sourceFile, id + " source module mismatch");
    assert.equal(row.sourceModule, sourceFile, id + " registry module mismatch");
    assert.equal(row.runtimeFunction, fn, id + " runtime function mismatch");
    assert.equal(row.status, "extracted", id + " must not be promoted before this batch's parity gate");
    assert.ok(row.calculation.formula && row.calculation.constraints && row.calculation.outputs.length, id + " calculation extraction incomplete");
    const actualInputs = Array.isArray(row.calculation.inputs)
      ? row.calculation.inputs.map(x => typeof x === "string" ? x : x.key)
      : [];
    assert.deepEqual(actualInputs, inputKeys, id + " registry input order mismatch");
    if (sourceFile === "app.js") {
      assert.ok(app.includes('id:"' + id + '"'), id + " app registration missing");
      assert.ok(app.includes(fn + "("), id + " app runtime invocation missing");
    } else {
      assert.ok(mathTools.includes('mk("' + id + '"'), id + " math tool registration missing");
      assert.ok(mathTools.includes("M." + fn.split(".")[1] + "("), id + " math runtime invocation missing");
    }
  }
});

test("Business ROI matches independent reference arithmetic and preserves losses", () => {
  const x = Core.businessROI(1000, 1275);
  assert.equal(x.gain, 275);
  assert.ok(Math.abs(x.roi - 27.5) < 1e-12);
  assert.equal(x.returnMultiple, 1.275);
  const loss = Core.businessROI(800, 0);
  assert.equal(loss.gain, -800);
  assert.equal(loss.roi, -100);
  assert.equal(loss.returnMultiple, 0);
  assert.throws(() => Core.businessROI(0, 1));
  assert.throws(() => Core.businessROI(1, -1));
  assert.throws(() => Core.businessROI(Infinity, 1));
});

test("Cash flow projection matches independently compounded monthly reference values", () => {
  const x = Core.cashFlowProjection(1000, 100, 50, 10, 20, 3);
  const reference = [];
  let balance = 1000, totalIn = 0, totalOut = 0;
  for (let month = 1; month <= 3; month++) {
    const incoming = 100 * Math.pow(1.1, month - 1);
    const outgoing = 50 * Math.pow(1.2, month - 1);
    balance += incoming - outgoing;
    totalIn += incoming;
    totalOut += outgoing;
    reference.push(balance);
  }
  assert.deepEqual(x.rows.map(r => r.cash), reference);
  assert.ok(Math.abs(x.endingCash - balance) < 1e-10);
  assert.ok(Math.abs(x.totalInflows - totalIn) < 1e-10);
  assert.ok(Math.abs(x.totalOutflows - totalOut) < 1e-10);
  assert.ok(Math.abs(x.netCashChange - (balance - 1000)) < 1e-10);
  assert.equal(x.monthlySchedule.length, 3);
  assert.equal(x.balances.length, 4);
  assert.throws(() => Core.cashFlowProjection(0, 0, 0, 100.01, 0, 3));
  assert.throws(() => Core.cashFlowProjection(0, 0, 0, 0, 0, 5));
  assert.throws(() => Core.cashFlowProjection(-1, 0, 0, 0, 0, 3));
});

test("Rental yield matches annualization, vacancy and operating-cost reference", () => {
  const x = Core.rentalYieldCalculator(250000, 1800, 5, 4500);
  assert.equal(x.potentialRent, 21600);
  assert.equal(x.effectiveRent, 20520);
  assert.equal(x.netOperatingIncome, 16020);
  assert.equal(x.grossYield, 8.64);
  assert.ok(Math.abs(x.netYield - 6.408) < 1e-12);
  const fullVacancy = Core.rentalYieldCalculator(100000, 2000, 100, 1200);
  assert.equal(fullVacancy.effectiveRent, 0);
  assert.equal(fullVacancy.netOperatingIncome, -1200);
  assert.equal(fullVacancy.netYield, -1.2);
  assert.throws(() => Core.rentalYieldCalculator(0, 100, 0, 0));
  assert.throws(() => Core.rentalYieldCalculator(100, 100, 100.01, 0));
  assert.throws(() => Core.rentalYieldCalculator(100, -1, 0, 0));
});

test("Emergency fund target, gap and progress match independent references", () => {
  const x = Core.emergencyFundCalculator(2500, 6, 5000);
  assert.equal(x.target, 15000);
  assert.equal(x.gap, 10000);
  assert.equal(x.coverageMonths, 2);
  assert.ok(Math.abs(x.progressPct - (5000 / 15000 * 100)) < 1e-12);
  const above = Core.emergencyFundCalculator(2000, 3, 9000);
  assert.equal(above.gap, 0);
  assert.equal(above.progressPct, 100);
  assert.equal(above.coverageMonths, 4.5);
  assert.equal(Core.emergencyFundCalculator(1000, 24, 0).target, 24000);
  assert.throws(() => Core.emergencyFundCalculator(0, 6, 0));
  assert.throws(() => Core.emergencyFundCalculator(1000, 24.01, 0));
  assert.throws(() => Core.emergencyFundCalculator(1000, 6, -1));
});

test("Net worth sums the five asset and four liability fields in source order", () => {
  const x = Core.netWorthCalculator(5000, 15000, 150000, 12000, 3000, 110000, 8000, 1500, 500);
  assert.equal(x.totalAssets, 185000);
  assert.equal(x.totalLiabilities, 120000);
  assert.equal(x.netWorth, 65000);
  assert.deepEqual(x.series, [185000, 120000, 65000]);
  const negative = Core.netWorthCalculator(100, 200, 0, 0, 0, 500, 100, 50, 25);
  assert.equal(negative.netWorth, -375);
  assert.throws(() => Core.netWorthCalculator(-0.01, 0, 0, 0, 0, 0, 0, 0, 0));
  assert.throws(() => Core.netWorthCalculator(0, 0, 0, 0, 0, 0, 0, 0, Infinity));
});

test("Basic arithmetic covers each supported operation and rejects invalid division", () => {
  assert.equal(MathCore.arithmetic(12, 4, "+"), 16);
  assert.equal(MathCore.arithmetic(12, 4, "-"), 8);
  assert.equal(MathCore.arithmetic(12, 4, "×"), 48);
  assert.equal(MathCore.arithmetic(12, 4, "÷"), 3);
  assert.throws(() => MathCore.arithmetic(1, 0, "÷"));
  assert.throws(() => MathCore.arithmetic(1, 2, "%"));
  assert.throws(() => MathCore.arithmetic(NaN, 2, "+"));
});

test("Fraction simplification normalizes denominator sign and handles zero numerator", () => {
  assert.deepEqual(MathCore.fraction(18, 24), { numerator: 3, denominator: 4, value: 0.75 });
  assert.deepEqual(MathCore.fraction(3, -6), { numerator: -1, denominator: 2, value: -0.5 });
  assert.deepEqual(MathCore.fraction(0, -9), { numerator: -0, denominator: 1, value: -0 });
  assert.throws(() => MathCore.fraction(1, 0));
  assert.throws(() => MathCore.fraction(1.5, 2));
  assert.throws(() => MathCore.fraction(Number.MAX_SAFE_INTEGER + 1, 2));
});

test("Mixed number conversion handles negative whole values and enforces proper fractions", () => {
  assert.deepEqual(MathCore.mixed(2, 1, 3), { numerator: 7, denominator: 3, value: 7 / 3 });
  assert.deepEqual(MathCore.mixed(-2, 1, 3), { numerator: -7, denominator: 3, value: -7 / 3 });
  assert.deepEqual(MathCore.mixed(0, 0, 7), { numerator: 0, denominator: 1, value: 0 });
  assert.throws(() => MathCore.mixed(1, 3, 3));
  assert.throws(() => MathCore.mixed(1, -1, 3));
  assert.throws(() => MathCore.mixed(1, 1, 0));
  assert.throws(() => MathCore.mixed(1.5, 1, 3));
});

test("Decimal-to-fraction uses bounded nearest-denominator search", () => {
  assert.deepEqual(MathCore.decimalFraction(0.625), { numerator: 5, denominator: 8, value: 0.625 });
  assert.deepEqual(MathCore.decimalFraction(Math.PI, 10), { numerator: 22, denominator: 7, value: 22 / 7 });
  assert.deepEqual(MathCore.decimalFraction(-0.125), { numerator: -1, denominator: 8, value: -0.125 });
  assert.throws(() => MathCore.decimalFraction(1, 0));
  assert.throws(() => MathCore.decimalFraction(1, 1.5));
  assert.throws(() => MathCore.decimalFraction(1, 1000001));
});

test("Ratio simplification handles zero terms and rejects undefined or unsafe inputs", () => {
  assert.deepEqual(MathCore.ratio(24, 36), { first: 2, second: 3 });
  assert.deepEqual(MathCore.ratio(0, 12), { first: 0, second: 1 });
  assert.deepEqual(MathCore.ratio(12, 0), { first: 1, second: 0 });
  assert.throws(() => MathCore.ratio(0, 0));
  assert.throws(() => MathCore.ratio(-1, 2));
  assert.throws(() => MathCore.ratio(1.5, 2));
  assert.throws(() => MathCore.ratio(Number.MAX_SAFE_INTEGER + 1, 1));
});
