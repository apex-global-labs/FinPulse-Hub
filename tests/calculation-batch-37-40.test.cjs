"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const Core = require("../finance-core.js");

test("Batch 37-40: freelance project pricing formula and margin", () => {
  const x = Core.freelanceProjectPricing(40, 60, 500, 10, 20);
  assert.equal(x.labor, 2400);
  assert.equal(x.baseCost, 2900);
  assert.equal(x.contingency, 290);
  assert.equal(x.totalCost, 3190);
  assert.equal(x.quotedPrice, 3987.5);
  assert.equal(x.profit, 797.5);
  assert.equal(x.targetMarginPct, 20);
});

test("Batch 37-40: freelancer net income applies reserve to post-expense profit", () => {
  const x = Core.freelancerNetIncome(60000, 12000, 20);
  assert.equal(x.profit, 48000);
  assert.equal(x.taxReserve, 9600);
  assert.equal(x.netIncome, 38400);
  assert.equal(x.effectiveNetRate, 64);
});

test("Batch 37-40: markup distinguishes markup rate from gross margin", () => {
  const x = Core.markupCalculator(80, 25);
  assert.equal(x.markupAmount, 20);
  assert.equal(x.sellingPrice, 100);
  assert.equal(x.grossMargin, 20);
});

test("Batch 37-40: break-even rounds sellable units upward", () => {
  const x = Core.breakEvenCalculator(1000, 50, 30);
  assert.equal(x.contribution, 20);
  assert.equal(x.unitsExact, 50);
  assert.equal(x.units, 50);
  assert.equal(x.revenue, 2500);
  assert.equal(x.variableCosts, 1500);
  assert.equal(x.totalCosts, 2500);
});

test("Batch 37-40: invalid financial inputs are rejected", () => {
  assert.throws(() => Core.freelanceProjectPricing(40, 0, 500, 10, 20));
  assert.throws(() => Core.freelancerNetIncome(100, 120, 20));
  assert.throws(() => Core.markupCalculator(80, 10001));
  assert.throws(() => Core.breakEvenCalculator(1000, 30, 30));
});
