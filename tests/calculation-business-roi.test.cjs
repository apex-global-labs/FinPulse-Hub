"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const Core = require("../finance-core.js");

test("Business ROI: positive return and return multiple", () => {
  const x = Core.businessROI(1000, 1250);
  assert.equal(x.initialInvestment, 1000);
  assert.equal(x.endingValue, 1250);
  assert.equal(x.gain, 250);
  assert.equal(x.roi, 25);
  assert.equal(x.returnMultiple, 1.25);
});

test("Business ROI: loss remains negative and is not annualized", () => {
  const x = Core.businessROI(2000, 1500);
  assert.equal(x.gain, -500);
  assert.equal(x.roi, -25);
  assert.equal(x.returnMultiple, 0.75);
});

test("Business ROI: zero ending value is valid", () => {
  const x = Core.businessROI(500, 0);
  assert.equal(x.gain, -500);
  assert.equal(x.roi, -100);
  assert.equal(x.returnMultiple, 0);
});

test("Business ROI: invalid investment and ending values are rejected", () => {
  assert.throws(() => Core.businessROI(0, 100));
  assert.throws(() => Core.businessROI(-1, 100));
  assert.throws(() => Core.businessROI(100, -1));
  assert.throws(() => Core.businessROI(Number.NaN, 100));
  assert.throws(() => Core.businessROI(100, Number.POSITIVE_INFINITY));
});
